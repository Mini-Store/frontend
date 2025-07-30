import { ICategoryResponseContract } from '@models/delivery/contracts/ICategoryCategory'
import { Descriptions, Modal } from 'antd'
import { FC } from 'react'

interface IViewCategoryModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  category: ICategoryResponseContract | null
}

export const ViewCategoryModal: FC<IViewCategoryModal> = ({ isOpen, setIsOpen, category }) => {
  if (!category) return null
  return (
    <Modal
      title="Просмотр категории"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      style={{ marginTop: '7rem' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{category.id}</Descriptions.Item>
        <Descriptions.Item label="Дата создания">{category.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Название">{category.name}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
