import OrdersTable from '@components/organisms/OrdersTable'
import { useOrders } from '@hooks/API/Orders/useOrders'
import { Spin } from 'antd'
import { FC } from 'react'

export const Orders: FC = () => {
  const { orders, isLoading } = useOrders()

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
          <h1 className="text-2xl font-bold text-gray-700">Список заказов</h1>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <OrdersTable data={orders} />
        </div>
      </div>
    </section>
  )
}
