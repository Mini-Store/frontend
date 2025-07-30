import { SITE_ROUTES } from '@constants/routing'
import { IAuthLoginContract } from '@models/delivery/contracts/IAuthContract'
import { Button, Form, Input, message, Typography } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const { Link } = Typography

export const Login: FC = () => {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const onFinish = async (values: IAuthLoginContract) => {
    const result = await authStore.login(values)
    if (result.meta.requestStatus === 'fulfilled') {
      message.success('Вход выполнен успешно')
      navigate(SITE_ROUTES.INDEX)
    } else {
      message.error('Ошибка при входе')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center px-10 py-12 bg-white border border-black rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-black">Вход</h1>
        <Form name="login" onFinish={onFinish} layout="vertical" className="w-full">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
          >
            <Input placeholder="Введите email" className="h-10" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password placeholder="Введите пароль" className="h-10" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={authStore.loading}
              block
              className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
            >
              Войти
            </Button>
          </Form.Item>

          <Form.Item className="text-center mb-0">
            Нет аккаунта?{' '}
            <Link
              onClick={() => navigate(SITE_ROUTES.REGISTER)}
              className="text-blue-600 hover:underline"
            >
              Зарегистрироваться
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
