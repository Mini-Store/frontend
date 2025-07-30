import { SITE_ROUTES } from '@constants/routing.tsx'
import { IAuthRegisterContract } from '@models/delivery/contracts/IAuthContract'
import { useAuthStore } from '../store/useAuthStore'
import { Button, Form, Input, message, Typography } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const { Link } = Typography

export const Register: FC = () => {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const onFinish = async (values: IAuthRegisterContract) => {
    const result = await authStore.register(values)
    const payload = (result as any).payload
    if (payload && payload.success) {
      message.success(payload.message)
      navigate(SITE_ROUTES.INDEX)
    } else if (payload) {
      message.error(payload.message)
    } else {
      message.error('Произошла ошибка при регистрации')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center px-10 py-12 bg-white border border-black rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-black">Регистрация</h1>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email!', type: 'email' }]}
          >
            <Input placeholder="Введите email" />
          </Form.Item>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя!', type: 'string' }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phoneNumber"
            rules={[
              {
                pattern: /^\+?[0-9]{10,15}$/,
                message: 'Некорректный формат номера телефона!',
              },
            ]}
          >
            <Input placeholder="+992#########" className="h-10" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={authStore.loading} block>
              Войти
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            У вас уже есть аккаунт <Link onClick={() => navigate(SITE_ROUTES.LOGIN)}>Войти</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
