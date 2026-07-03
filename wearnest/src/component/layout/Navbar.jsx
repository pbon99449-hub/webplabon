import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import logo from '../../assets/wearnest-logo.png'

const icons = {
  search: (
    <path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
  ),
  mapPin: (
    <>
      <path d="M12 21s7-4.7 7-11a7 7 0 1 0-14 0c0 6.3 7 11 7 11Z" />
      <path d="M12 10.5h.01" />
    </>
  ),
  user: (
    <>
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 13H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
}

const Icon = ({ name, size = 24, className = "" }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={size}
  >
    {icons[name]}
  </svg>
)

const Navbar = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center items-center text-center bg-white shadow-sm">
      <div className="w-[1400px] h-[80px] flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center shrink-0">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            className="inline-flex"
          >
            <img
              src={logo}
              alt="WearNest"
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            />
          </Link>
        </div>

        {/* Menu */}

        <ul className="flex items-center gap-8 ml-10 font-semibold tracking-wide text-[14px] text-[#111827]">
          <li>
            <Link to="/allitem?category=men" className="cursor-pointer hover:text-orange-500 duration-200">
              MEN
            </Link>
          </li>

          <li>
            <Link to="/allitem?category=women" className="cursor-pointer hover:text-orange-500 duration-200">
              WOMEN
            </Link>
          </li>

          <li>
            <Link to="/allitem?category=teens" className="cursor-pointer hover:text-orange-500 duration-200">
              TEENS
            </Link>
          </li>

          <li>
            <Link to="/allitem?category=kids" className="cursor-pointer hover:text-orange-500 duration-200">
              KIDS
            </Link>
          </li>

          <li>
            <Link to="/allitem?category=sports" className="cursor-pointer hover:text-orange-500 duration-200">
              SPORTS
            </Link>
          </li>
        </ul>

        {/* Search */}

        <div className="ml-auto mr-10 flex items-center w-[400px] h-[46px] bg-gray-100 rounded-sm px-4">

          <Icon name="search" className="text-gray-500" size={22} />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none px-3 text-sm"
          />
        </div>

        {/* Icons */}

        <div className="flex items-center gap-8">

          <div className="flex flex-col items-center cursor-pointer">
            <Icon name="mapPin" size={24} />
            <span className="text-[13px] font-semibold mt-2">
              Stores
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <Icon name="user" size={24} />
            <span className="text-[13px] font-semibold mt-2">
              Profile
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <Icon name="heart" size={24} />
            <span className="text-[13px] font-semibold mt-2">
              Wishlist
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <Icon name="bag" size={24} />
            <span className="text-[13px] font-semibold mt-2">
              Bag
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
