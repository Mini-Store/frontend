import { SearchOutlined } from '@ant-design/icons'
import { CreateCategoryModal } from '@components/molecules/CreateCategoryModal'
import CategoriesTable from '@components/organisms/CategoriesTable'
import { useCategory } from '@hooks/API/Category/useCategory'
import { Button, Input, Spin } from 'antd'
import { FC, useState } from 'react'

export const Categories: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const { categories, isLoading, getCategories } = useCategory()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <section className="bg-white-alt py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center mb-5 p-4 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-700">Список категорий</h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Поиск категорий"
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Создать категорию
            </Button>
          </div>
        </div>

        <CreateCategoryModal
          isOpen={createModalOpen}
          setIsOpen={setCreateModalOpen}
          onCreateSuccess={() => getCategories(true)}
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <CategoriesTable onDeleteSuccess={() => getCategories()} data={categories} />
        </div>
      </div>
    </section>
  )
}
