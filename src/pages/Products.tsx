import { SearchOutlined } from '@ant-design/icons'
import { CreateProductModal } from '@components/molecules/CreateProductModal'
import ProductsTable from '@components/organisms/ProductsTable'
import { useCatalog } from '@hooks/API/Products/useCatalog.tsx'
import { Button, Input, Spin } from 'antd'
import { FC, useState } from 'react'

export const Products: FC = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const { products, isLoading, getProducts } = useCatalog()

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
          <h1 className="text-2xl font-bold text-gray-700">Список товаров</h1>
          <div className="flex items-center gap-4">
            <Input placeholder="Поиск товаров" style={{ width: 250 }} prefix={<SearchOutlined />} />
            <Button type="primary" onClick={() => setCreateModalOpen(true)}>
              Создать товар
            </Button>
          </div>
        </div>

        <CreateProductModal
          isOpen={createModalOpen}
          setIsOpen={setCreateModalOpen}
          onCreateSuccess={() => getProducts(true)}
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ProductsTable onDeleteSuccess={() => getProducts()} data={products} />
        </div>
      </div>
    </section>
  )
}
