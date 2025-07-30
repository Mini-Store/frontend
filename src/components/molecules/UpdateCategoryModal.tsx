import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useMessage } from '@hooks/useMessages.tsx'
import {
  ICategoryResponseContract,
  ICategoryUpdateContract,
} from '@models/delivery/contracts/ICategoryConctract'
import { Form, Input, Modal } from 'antd'
import { FC, useEffect } from 'react'

interface IUpdateCategoryModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  onUpdateSuccess?: (id: string) => void
  category: ICategoryResponseContract | null
}

export const UpdateCategoryModal: FC<IUpdateCategoryModal> = ({
  isOpen,
  setIsOpen,
  onUpdateSuccess,
  category,
}) => {
  const delivery = useDelivery()
  const [form] = Form.useForm<ICategoryUpdateContract>()
  const { error: showError, success: showSuccess } = useMessage()

  const { execute: updateCategory, loading: isCategoryLoading } = useFetch({
    asyncFunction: (data: ICategoryUpdateContract) =>
      delivery.CS.categoryActions.update(category!.id, data),
    onSuccess: (response) => {
      showSuccess('Категория успешно обновлена')
      form.resetFields()
      setIsOpen(false)
      response.value?.id && onUpdateSuccess?.(response.value.id)
    },
    onError: () => showError('Произошла ошибка при обновлении категории'),
  })

  useEffect(() => {
    if (isOpen && category) {
      form.setFieldsValue({
        name: category.name,
      })
    }
  }, [isOpen, category, form])

  const submitForm = () => {
    if (!category) return
    form
      .validateFields()
      .then((values) => {
        updateCategory(values)
      })
      .catch(() => {
        showError('Заполните все поля')
      })
  }

  return (
    <Modal
      title="Обновить категорию"
      okText="Обновить"
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
