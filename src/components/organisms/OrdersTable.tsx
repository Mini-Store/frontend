import { IOrderResponseContract } from '@models/delivery/contracts/IOrderContract'
import { Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'

interface IOrdersTable {
  data?: IOrderResponseContract[]
}

export default function OrdersTable({ data }: IOrdersTable) {
  const renderStatus = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: 'orange',
      processing: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
    }
    return <Tag color={statusColors[status] || 'default'}>{status}</Tag>
  }

  const renderItems = (items: any[]) => {
    return (
      <div>
        {items?.map((item, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>
            {item.product?.name} x{item.quantity} ({item.price}₽)
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false} scroll={{ x: 1200 }}>
        <Column
          key="createdAt"
          title="Дата создания"
          dataIndex="createdAt"
          align="center"
          width={120}
          render={(date) => new Date(date).toLocaleDateString('ru-RU')}
        />
        <Column
          key="user"
          title="Клиент"
          dataIndex="user"
          align="center"
          width={150}
          render={(user) => (
            <div>
              <div>{user?.username}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{user?.email}</div>
            </div>
          )}
        />
        <Column
          key="status"
          title="Статус"
          dataIndex="status"
          align="center"
          width={100}
          render={renderStatus}
        />
        <Column
          key="method"
          title="Способ доставки"
          dataIndex="method"
          align="center"
          width={120}
        />
        <Column
          key="payment"
          title="Способ оплаты"
          dataIndex="payment"
          align="center"
          width={120}
        />
        <Column key="address" title="Адрес" dataIndex="address" align="center" width={200} />
        <Column key="comment" title="Комментарий" dataIndex="comment" align="center" width={150} />
        <Column
          key="totalAmount"
          title="Сумма"
          dataIndex="totalAmount"
          align="center"
          width={100}
          render={(amount) => `${amount}₽`}
        />
        <Column
          key="items"
          title="Товары"
          dataIndex="items"
          align="left"
          width={250}
          render={renderItems}
        />
      </Table>
    </div>
  )
}
