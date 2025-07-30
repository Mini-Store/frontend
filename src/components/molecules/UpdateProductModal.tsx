import { PlusOutlined } from '@ant-design/icons'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import {
  IProductResponseContract,
  IProductUpdateContract,
} from '@models/delivery/contracts/IProductContract.ts'
import { Form, Input, Modal, Select, Upload, UploadFile } from 'antd'
import { FC, useEffect, useState } from 'react'

interface IUpdateProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onUpdateSuccess?: (id: string) => void
  product: IProductResponseContract | null
}

export const UpdateProductModal: FC<IUpdateProductModal> = ({
  isOpen,
  setIsOpen,
  onUpdateSuccess,
  product,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<IProductUpdateContract>()
  const { error: showError, success: showSuccess } = useMessage()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (isOpen && product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category.id,
      })

      if (product.image) {
        setFileList([
          {
            uid: '-1',
            name: 'image.jpg',
            status: 'done',
            url: product.image,
          } as UploadFile,
        ])
      } else {
        setFileList([])
      }
    }
  }, [isOpen, product, form])

  const { execute: updateProduct, loading: isProductLoading } = useFetch({
    asyncFunction: (formData: FormData) =>
      delivery.CS.productActions.update(product!.id, formData),
    onSuccess: (response) => {
      showSuccess('Товар успешно обновлён')
      form.resetFields()
      setFileList([])
      setIsOpen(false)
      response.value?.id && onUpdateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при обновлении товара'),
  })
  const { result: categories, execute: fetchCategories } = useFetch({
    asyncFunction: () => delivery.CS.categoryActions.getList(),
  })

  useEffect(() => {
    if (isOpen) fetchCategories()
  }, [isOpen])

  const submitForm = () => {
    if (!product) return
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData()
        formData.append('id', product.id)
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('price', String(values.price))
        formData.append('categoryId', values.categoryId)

        if (fileList.length > 0 && fileList[0].originFileObj) {
          formData.append('image', fileList[0].originFileObj)
        }

        updateProduct(formData)
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Обновить товар"
      okText="Обновить"
      centered
      open={isOpen}
      okButtonProps={{ loading: isProductLoading }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Название товара"
          name="name"
          rules={[{ required: true, message: 'Введите название товара' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание товара"
          name="description"
          rules={[{ required: true, message: 'Введите описание товара' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="price"
          rules={[
            { required: true, message: 'Введите цену' },
            {
              type: 'number',
              min: 0,
              transform: (value) => Number(value),
              message: 'Цена должна быть числом и больше или равна 0',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Категория"
          name="categoryId"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select placeholder="Выберите категорию">
            {categories?.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Изображение товара">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
