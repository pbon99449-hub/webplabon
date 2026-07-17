import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getWishlistItems,
  removeFromWishlist,
  getLastAddedId,
} from '../../utils/wishlistStorage'

import { addToCart } from '../../utils/cartStorage'


const Wishlist = () => {
  const [items, setItems] = useState(() => getWishlistItems())
  const lastAddedId = getLastAddedId()

  useEffect(() => {
    const onStorageUpdate = () => setItems(getWishlistItems())
    window.addEventListener('wearnest-storage-updated', onStorageUpdate)
    return () => window.removeEventListener('wearnest-storage-updated', onStorageUpdate)
  }, [])

  const totalText = useMemo(() => {
    const total = items.reduce((sum, item) => {
      const priceVal = Number(String(item?.price || '৳690').replace(/[^\d.]/g, ''))
      return sum + (isNaN(priceVal) ? 690 : priceVal)
    }, 0)
    return '৳ ' + total
  }, [items])


  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <Link
          to="/allitem"
          className="text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
          Browse more
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-sm font-semibold text-slate-700">Saved items</p>
            <p className="text-sm text-slate-500">{items.length} products</p>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
                <span className="text-2xl">❤️</span>
              </div>

              <p className="text-base font-semibold">Your wishlist is empty</p>
              <p className="mt-1 text-sm text-slate-500">
                Tap the heart icon on products to save them for later.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/allitem?category=men"
                  className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                >
                  Shop Men
                </Link>
                <Link
                  to="/allitem?category=women"
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Shop Women
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item) => {
                  const isLast = item?.id === lastAddedId
                  return (
                    <div
                      key={item.id}
                      className={`rounded-lg border p-3 ${isLast ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200'}`}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-28 w-full rounded-md object-cover"
                        />
                      ) : null}

                      <p className="mt-3 text-sm font-semibold text-slate-800 line-clamp-2">
                        {item.title || 'Saved item'}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">
                          {item.price || '৳690'}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          aria-label="Remove item from wishlist"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >
                          <span className="text-xl leading-none">×</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm h-fit">
          <p className="text-sm font-semibold text-slate-700 border-b pb-4">Quick summary</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Wishlist total</span>
              <span className="font-semibold">{items.length ? totalText : '৳ 0'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Availability</span>
              <span className="font-semibold">—</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={items.length === 0}
            onClick={() => {
              // wishlist-এ থাকা items cart-এ add হবে (price না থাকলে ডিফল্ট 690)
              items.forEach((it) => {
                const itemWithPrice = {
                  ...it,
                  price: it.price || '৳690'
                }
                addToCart(itemWithPrice)
              })
              // cart page-এ গিয়ে দেখানোর জন্য (navigate)
              window.location.href = '/cart'
            }}
          >
            Move to cart
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            {items.length === 0 ? 'Add items first to enable checkout.' : 'Click to add wishlist items to cart.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Wishlist


