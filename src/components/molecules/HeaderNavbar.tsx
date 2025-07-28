import { ROUTES } from '@constants/routing.tsx'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export const HeaderNavbar = () => {
  return (
    <nav className="flex justify-center gap-6 font-semibold select-none mt-[0.1rem]">
      <NavLink
        to={ROUTES.INDEX}
        className={({ isActive }) =>
          clsx('relative pb-1 text-black transition-colors duration-300 hover:text-blue-600', {
            'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              isActive,
            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              !isActive,
          })
        }
      >
        Главная
      </NavLink>
      <NavLink
        to={ROUTES.BLOG}
        className={({ isActive }) =>
          clsx('relative pb-1 text-black transition-colors duration-300 hover:text-blue-600', {
            'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              isActive,
            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              !isActive,
          })
        }
      >
        Блог
      </NavLink>
      <NavLink
        to={ROUTES.CATALOG}
        className={({ isActive }) =>
          clsx('relative pb-1 text-black transition-colors duration-300 hover:text-blue-600', {
            'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              isActive,
            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              !isActive,
          })
        }
      >
        Каталог
      </NavLink>
      <NavLink
        to={ROUTES.CART}
        className={({ isActive }) =>
          clsx('relative pb-1 text-black transition-colors duration-300 hover:text-blue-600', {
            'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              isActive,
            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
              !isActive,
          })
        }
      >
        Корзина
      </NavLink>
    </nav>
  )
}
