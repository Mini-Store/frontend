import { PlusOutlined } from '@ant-design/icons'
import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { IProductCreateContract } from '@models/delivery/contracts/IProductContract.ts'
import { Form, Input, Modal, Upload, UploadFile } from 'antd'
import { FC, useState } from 'react'

interface ICreateProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onCreateSuccess?: (id: string) => void
}

export const CreateProductModal: FC<ICreateProductModal> = ({
  isOpen,
  setIsOpen,
  onCreateSuccess,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<IProductCreateContract>()
  const { error: showError, success: showSuccess } = useMessage()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { execute: createProduct, loading: isProductLoading } = useFetch({
    asyncFunction: delivery.CS.productActions.create,
    onSuccess: (response) => {
      showSuccess('Товар успешно создан')
      form.resetFields()
      setIsOpen(false)
      response.value?.id && onCreateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при создании товара'),
  })

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        createProduct({ ...values })
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Создать товар"
      okText="Создать"
      centered
      open={isOpen}
      okButtonProps={{ loading: isProductLoading }}
      onOk={() => submitForm}
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
