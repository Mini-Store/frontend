import { EyeOutlined } from '@ant-design/icons'
import { UpdateCategoryModal } from '@components/molecules/UpdateCategoryModal'
import { ViewCategoryModal } from '@components/molecules/ViewCategoryModal'
import { useDeleteCategory } from '@hooks/API/Category/useDeleteCategory'
import { useMessage } from '@hooks/useMessages'
import { ICategoryResponseContract } from '@models/delivery/contracts/ICategoryConctract'
import { Button, Space, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useState } from 'react'

interface ICategoryTable {
  data?: ICategoryResponseContract[]
  onDeleteSuccess?: () => void
  onUpdateSuccess?: () => void
}

export default function CategoriesTable({
  data,
  onDeleteSuccess,
  onUpdateSuccess,
}: ICategoryTable) {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [updatingCategory, setUpdatingCategory] = useState<ICategoryResponseContract | null>(null)
  const [viewCategory, setViewCategory] = useState<ICategoryResponseContract | null>(null)
  const { error: showError, success: showSuccess } = useMessage()
  const { loading: isLoading, execute: deleteCategory } = useDeleteCategory({
    onSuccess: () => {
      showSuccess('Категория успешно удалена')
      onDeleteSuccess?.()
    },
    onError: () => showError('Ошибка при удалении категории'),
  })

  const handleDelete = (id: string) => {
    deleteCategory(id)
  }

  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column key="createdAt" title="Дата создания" dataIndex="createdAt" align="center" />
        <Column key="name" title="Название категории" dataIndex="name" align="center" />
        <Column
          key="actions"
          title="Действия"
          align="center"
          render={(record: ICategoryResponseContract) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  setUpdateModalOpen(true)
                  setUpdatingCategory(record)
                }}
              >
                Изменить
              </Button>
              <Button
                style={{ backgroundColor: '#F2c550', color: 'black' }}
                onClick={() => handleDelete(record.id)}
                loading={isLoading}
              >
                Удалить
              </Button>
            </Space>
          )}
        />
        <Column
          key="view"
          title="Просмотр"
          align="center"
          render={(record: ICategoryResponseContract) => (
            <EyeOutlined
              style={{ fontSize: '18px', cursor: 'pointer', color: '#1890ff' }}
              onClick={() => setViewCategory(record)}
            />
          )}
        />
      </Table>

      <UpdateCategoryModal
        isOpen={updateModalOpen}
        setIsOpen={setUpdateModalOpen}
        category={updatingCategory}
        onUpdateSuccess={onUpdateSuccess}
      />
      <ViewCategoryModal
        isOpen={!!viewCategory}
        setIsOpen={() => setViewCategory(null)}
        category={viewCategory}
      />
    </div>
  )
}
