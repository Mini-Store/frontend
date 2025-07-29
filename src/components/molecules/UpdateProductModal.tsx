import { PlusOutlined } from '@ant-design/icons'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { IProductUpdateContract } from '@models/delivery/contracts/IProductContract.ts'
import { Form, Input, Modal, Upload, UploadFile } from 'antd'
import { FC, useEffect, useState } from 'react'

interface IUpdateProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onUpdateSuccess?: (id: string) => void
  product: any
}

export const UpdateProductModal: FC<IUpdateProductModal> = ({ isOpen, setIsOpen, product }) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<IProductUpdateContract>()
  const { error: showError, success: showSuccess } = useMessage()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product)
    }
  }, [product, form])

  const { execute: updateProduct, loading: isUpdating } = useFetch({
    asyncFunction: delivery.CS.productActions.update,
    onSuccess: () => {
      showSuccess('Товар успешно обновлен')
      form.resetFields()
      setIsOpen(false)
    },
    onError: () => showError('Произошла ошибка при обновлении товара'),
  })

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        updateProduct(product.id, values)
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Редактировать товар"
      okText="Сохранить"
      centered
      open={isOpen}
      okButtonProps={{ loading: isUpdating }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item label="Название товара" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Описание товара" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Изображение товара">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
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
