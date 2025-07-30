import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import { ICategoryCreateContract } from '@models/delivery/contracts/ICategoryConctract'
import { Form, Input, Modal } from 'antd'
import { FC } from 'react'

interface ICreateCategoryModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onCreateSuccess?: (id: string) => void
}

export const CreateCategoryModal: FC<ICreateCategoryModal> = ({
  isOpen,
  setIsOpen,
  onCreateSuccess,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<ICategoryCreateContract>()
  const { error: showError, success: showSuccess } = useMessage()

  const { execute: createCategory, loading: isCategoryLoading } = useFetch({
    asyncFunction: delivery.CS.categoryActions.create,
    onSuccess: (response) => {
      showSuccess('Категория успешно создана')
      form.resetFields()
      setIsOpen(false)
      response.value?.id && onCreateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при создании категории'),
  })

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        createCategory(values)
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Создать категорию"
      okText="Создать"
      centered
      open={isOpen}
      okButtonProps={{ loading: isCategoryLoading }}
      onOk={submitForm}
      onCancel={() => setIsOpen(false)}
    >
      <Form form={form} layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Название категории"
          name="name"
          rules={[{ required: true, message: 'Введите название категории' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
