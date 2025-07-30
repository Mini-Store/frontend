import { IUserResponseContract } from '@models/delivery/contracts/IUserContract'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

interface IUsersTable {
  data?: IUserResponseContract[]
}

export default function UsersTable({ data }: IUsersTable) {
  return (
    <div>
      <Table dataSource={data} rowKey="id" pagination={false}>
        <Column key="createdAt" title="Дата создания" dataIndex="createdAt" align="center" />
        <Column key="email" title="Email" dataIndex="email" align="center" />
        <Column key="name" title="Название" dataIndex="name" align="center" />
        <Column key="phone" title="Номер телефонв" dataIndex="phone" align="center" />
        <Column key="role" title="Роль" dataIndex="role" align="center" />
      </Table>
    </div>
  )
}
