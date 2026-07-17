import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";

import logo from '../../assets/wearnest-logo.png'
import { getWishlistItems } from '../../utils/wishlistStorage'
import { getCartItems } from '../../utils/cartStorage'


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
  cart: (
    <IoCartOutline size={24} />
  ),
}

const Icon = ({ name, size = 24, className = "" }) => (
  <span className={className}>
    {name === 'cart' ? <IoCartOutline size={size} /> : (
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
    )}
  </span>
)

// ---------- Dropdown Data ----------
const dropdownItems = {
  men: [
    { label: "T-Shirts", category: "men&subcategory=t-shirt" },
    { label: "Polo T-Shirt", category: "men&subcategory=polo-t-shirt" },
    { label: "Hoodie", category: "men&subcategory=hoodie" },
    { label: "Jeans", category: "men&subcategory=jeans" },
    { label: "Shorts", category: "men&subcategory=shorts" },
    { label: "Panjabi", category: "men&subcategory=panjabi" },
  ],
  women: [
    { label: "Dresses", category: "women&subcategory=dresses" },
    { label: "Tops", category: "women&subcategory=tops" },
    { label: "Sports Trouser", category: "women&subcategory=sports-trouser" },
    { label: "Shorts", category: "women&subcategory=shorts" },
    { label: "Underwear", category: "women&subcategory=underwear" },
  ],
  teens: [
    { label: "T-Shirts", category: "teens&subcategory=t-shirt" },
    { label: "Sports Trouser", category: "teens&subcategory=sports-trouser" },
    { label: "Shorts", category: "teens&subcategory=shorts" },
    { label: "Hoodie", category: "teens&subcategory=hoodie" },
    { label: "Underwear", category: "teens&subcategory=underwear" },
  ],
  kids: [
    { label: "T-Shirts", category: "kids&subcategory=t-shirt" },
    { label: "Shorts", category: "kids&subcategory=shorts" },
    { label: "Sports Trouser", category: "kids&subcategory=sports-trouser" },
    { label: "Hoodie", category: "kids&subcategory=hoodie" },
  ],
  sports: [
    { label: "Football Jersey", category: "sports&subcategory=football-jersey" },
    { label: "Sports Shoes", category: "sports&subcategory=sports-shoes" },
    { label: "Tracksuit", category: "sports&subcategory=tracksuit" },
    { label: "Shorts", category: "sports&subcategory=shorts" },
    { label: "Sports Trouser", category: "sports&subcategory=sports-trouser" },
  ],
}

// ---------- NavItem Component (handles hover + dropdown) ----------
const NavItem = ({ label, categoryKey }) => {
  const items = dropdownItems[categoryKey]
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main link */}
      <Link
        to={`/allitem?category=${categoryKey}`}
        className="cursor-pointer hover:text-orange-500 duration-200"
      >
        {label}
      </Link>

      {/* Dropdown */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-300 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-3 px-2 min-w-[200px]">
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.label}
                to={`/allitem?category=${item.category}`}
                className="block px-4 py-2.5 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 hover:text-orange-600 hover:shadow-sm transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}


const Navbar = () => {
  const location = useLocation()
  const [wishlistCount, setWishlistCount] = useState(() => getWishlistItems().length)
  const [cartCount, setCartCount] = useState(() => getCartItems().length)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    const syncCounts = () => {
      setWishlistCount(getWishlistItems().length)
      setCartCount(getCartItems().length)
    }

    syncCounts()
    window.addEventListener('wearnest-storage-updated', syncCounts)
    window.addEventListener('storage', syncCounts)

    return () => {
      window.removeEventListener('wearnest-storage-updated', syncCounts)
      window.removeEventListener('storage', syncCounts)
    }
  }, [])

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

        {/* Menu with Dropdowns */}

        <ul className="flex items-center gap-8 ml-10 font-semibold tracking-wide text-[14px] text-[#111827]">
          <NavItem label="MEN" categoryKey="men" />
          <NavItem label="WOMEN" categoryKey="women" />
          <NavItem label="TEENS" categoryKey="teens" />
          <NavItem label="KIDS" categoryKey="kids" />
          <NavItem label="SPORTS" categoryKey="sports" />
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

          {/* <Link
            to="/profile"
            className={`flex flex-col items-center cursor-pointer ${location.pathname === '/profile' ? 'text-orange-500' : ''}`}
          >
            <Icon name="user" size={24} />
            <span className="text-[13px] font-semibold mt-2">Profile</span>
          </Link> */}


          <Link
            to="/wishlist"
            className={`flex flex-col items-center cursor-pointer ${location.pathname === '/wishlist' ? 'text-orange-500' : ''}`}
          >
            <div className="relative">
              <Icon name="heart" size={24} />
              {wishlistCount > 0 ? (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              ) : null}
            </div>
            <span className="text-[13px] font-semibold mt-2">Wishlist</span>
          </Link>


          <Link
            to="/cart"
            className={`flex flex-col items-center cursor-pointer ${location.pathname === '/cart' ? 'text-orange-500' : ''}`}
          >
            <div className="relative">
              <Icon name="cart" size={25} />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center px-1">
                  {cartCount}
                </span>
              ) : null}
            </div>
            <span className="text-[13px] font-semibold mt-2">Cart</span>
          </Link>


        </div>
      </div>
    </header>
  );
};

export default Navbar;