import { IProductResponseContract } from '@models/delivery/contracts/IProductContract.ts'
import { Descriptions, Modal } from 'antd'
import { FC } from 'react'

interface IViewProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  product: IProductResponseContract | null
}

export const ViewProductModal: FC<IViewProductModal> = ({ isOpen, setIsOpen, product }) => {
  if (!product) return null
  return (
    <Modal
      title="Просмотр товара"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      style={{ marginTop: '7rem' }}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Дата создания">{product.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Название">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Описание товара">{product.description}</Descriptions.Item>
        <Descriptions.Item label="Цена">{product.price} ₽</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
