import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getCartItems, removeFromCart } from '../../utils/cartStorage'

const Cart = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState(() => getCartItems())

  useEffect(() => {
    const onStorageUpdate = () => setItems(getCartItems())
    window.addEventListener('wearnest-storage-updated', onStorageUpdate)
    return () => window.removeEventListener('wearnest-storage-updated', onStorageUpdate)
  }, [])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => {
      const priceStr = String(item.price || '৳690').replace(/[^\d.]/g, '')
      const priceVal = Number(priceStr)
      return sum + (isNaN(priceVal) ? 690 : priceVal) * (item.quantity || 1)
    }, 0),
    [items]
  )


  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Link
          to="/allitem"
          className="text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4">
            <p className="text-sm font-semibold text-slate-700">Items</p>
            <p className="text-sm text-slate-500">{items.length} products</p>
          </div>

          {items.length === 0 ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                🛒
              </div>
              <p className="text-base font-semibold">Cart is empty</p>
              <p className="mt-1 text-sm text-slate-500">
                Add your favorite products to see them here.
              </p>
              <Link
                to="/allitem?category=women"
                className="mt-5 inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Shop Women
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-14 w-14 rounded-md object-cover" />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title || 'Product'}</p>
                      <p className="text-sm text-slate-500">{item.price || '৳690'}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100"
                  >
                    <span className="text-xl leading-none">×</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-5 shadow-sm h-fit">
          <p className="text-sm font-semibold text-slate-700 border-b pb-4">Summary</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">৳ {subtotal.toFixed(0)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Shipping</span>
              <span className="font-semibold">৳ 0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Discount</span>
              <span className="font-semibold">৳ 0</span>
            </div>

            <div className="border-t pt-4 flex items-center justify-between">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold">৳ {subtotal.toFixed(0)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/chackout')}
            className="mt-5 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            disabled={items.length === 0}
          >
            Checkout
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            {items.length === 0 ? 'Add products first to enable checkout.' : 'Proceed to checkout.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cart

