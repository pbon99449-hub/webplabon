import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account details (demo UI)
          </p>
        </div>

        <Link
          to="/allitem"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="text-lg font-semibold">Guest User</p>
              <p className="text-sm text-slate-500">wearnest-demo@example.com</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full name</span>
              <input
                className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                value="Guest User"
                readOnly
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Phone</span>
              <input
                className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                value="+880 01*********"
                readOnly
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
                value="wearnest-demo@example.com"
                readOnly
              />
            </label>
          </div>

          <div className="mt-6 border-t pt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              disabled
            >
              Save changes
            </button>
            <button
              type="button"
              className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
              disabled
            >
              Change password
            </button>
            <p className="text-xs text-slate-500">This is a placeholder profile page.</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm h-fit">
          <p className="text-sm font-semibold text-slate-700">Account</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-md border border-slate-200 p-4">
              <p className="text-sm font-semibold">Orders</p>
              <p className="mt-1 text-sm text-slate-500">View purchase history</p>
              <Link
                to="/order"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Go to Orders
              </Link>
            </div>

            <div className="rounded-md border border-slate-200 p-4">
              <p className="text-sm font-semibold">Wishlist</p>
              <p className="mt-1 text-sm text-slate-500">Saved products</p>
              <Link
                to="/wishlist"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                View Wishlist
              </Link>
            </div>

            <button
              type="button"
              className="w-full rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

