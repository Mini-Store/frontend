import { SITE_ROUTES } from '@constants/routing'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export const SiteNavbar = () => {
  const headerNavItems = [
    { label: 'Главная', route: SITE_ROUTES.INDEX, end: true },
    { label: 'Блог', route: SITE_ROUTES.BLOG },
    { label: 'Каталог', route: SITE_ROUTES.CATALOG },
    { label: 'Корзина', route: SITE_ROUTES.CART },
  ]

  return (
    <nav className="flex justify-center gap-6 font-semibold select-none mt-[0.1rem]">
      {headerNavItems.map(({ label, route, end }) => (
        <NavLink
          key={label}
          to={route}
          end={end}
          className={({ isActive }) =>
            clsx('relative pb-1 text-black transition-colors duration-300 hover:text-blue-600', {
              'text-blue-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
                isActive,
              'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300':
                !isActive,
            })
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
