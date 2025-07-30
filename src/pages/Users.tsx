import UsersTable from '@components/organisms/UsersTable'
import { useUsers } from '@hooks/API/Users/useUsers'
import { Spin } from 'antd'
import { FC } from 'react'

export const Users: FC = () => {
  const { users, isLoading, getUsers } = useUsers()

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
          <h1 className="text-2xl font-bold text-gray-700">Список пользователей</h1>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <UsersTable onDeleteSuccess={() => getUsers()} data={users} />
        </div>
      </div>
    </section>
  )
}
