import React from "react";
import { FiUser, FiMapPin } from "react-icons/fi";

const Order = () => {
  return (
    <div className="max-w-4xl flex gap-8 bg-white border border-gray-200 rounded-md p-8">
      {/* Contact Information */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <FiUser className="text-xl text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact Information
          </h2>
        </div>

        <hr className="mb-6" />

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-[15px] font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-[15px] font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-[15px] font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="01XXXXXXXXX"
              className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <FiMapPin className="text-xl text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Shipping Address
          </h2>
        </div>

        <hr className="mb-6" />

        {/* Address */}
        <div className="mb-6">
          <label className="block text-[15px] font-medium mb-2">
            Detailed Address <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="House, Road, Area"
            className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black"
          />
        </div>

        {/* City + Alt Phone */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[15px] font-medium mb-2">
              City / District <span className="text-red-500">*</span>
            </label>

            <select className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black bg-white">
              <option>Select City</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
              <option>Sylhet</option>
              <option>Barishal</option>
              <option>Rangpur</option>
              <option>Mymensingh</option>
            </select>
          </div>

          <div>
            <label className="block text-[15px] font-medium mb-2">
              Alt. Phone
            </label>

            <input
              type="text"
              placeholder="01XXXXXXXXX (optional)"
              className="w-full border border-gray-300 px-4 h-[52px] outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Delivery Note */}
        <div>
          <label className="block text-[15px] font-medium mb-2">
            Note for Delivery
          </label>

          <textarea
            rows="4"
            placeholder="Special instructions (optional)"
            className="w-full border border-gray-300 p-4 outline-none resize-none focus:border-black"
          ></textarea>
        </div>
      </div>

      <div className="w-[430px] border border-gray-200 bg-white">

      {/* Order Summary */}
      <div className="border-b p-6">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl">Order Summary</h2>

          <button className="underline text-sm">Modify</button>
        </div>

        <div className="flex gap-4">
          <img
            src="https://via.placeholder.com/70"
            alt=""
            className="w-16 h-16 border"
          />

          <div className="flex-1">
            <h3 className="text-[15px] font-medium">
              Brazil 2026 World Cup Home Jersey
            </h3>

            <p className="text-gray-500 text-sm">
              Size: L &nbsp; Qty: 1
            </p>
          </div>

          <div className="text-right">
            <p className="line-through text-gray-400 text-sm">
              ৳1600
            </p>

            <p className="font-semibold text-lg">
              ৳1290
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="p-6 border-b space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳1290</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping (Dhaka)</span>
          <span>৳60</span>
        </div>

        <div className="flex justify-between text-2xl font-bold border-t pt-4">
          <span>Total</span>
          <span>৳1350</span>
        </div>

        <div className="bg-green-50 text-green-700 p-3 rounded mt-4 flex items-center gap-2">
          <FiTruck />
          Delivery within 2-3 Days after confirmation
        </div>
      </div>

      {/* Coupon */}
      <div className="border-b p-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 h-12 border px-3 outline-none"
        />

        <button className="bg-black text-white px-7 font-semibold">
          Apply
        </button>
      </div>

      {/* Payment */}
      <div className="p-6 border-b">
        <h2 className="font-semibold text-lg mb-4">
          Payment Method
        </h2>

        {/* COD */}
        <label
          className={`border p-4 flex items-center gap-4 cursor-pointer mb-4 ${
            payment === "cod"
              ? "border-black"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />

          <BsCashStack
            className="text-yellow-600"
            size={28}
          />

          <div>
            <h3 className="font-semibold">
              Cash on Delivery
            </h3>

            <p className="text-sm text-gray-500">
              Pay when you receive your order
            </p>
          </div>
        </label>

        {/* Card */}
        <label
          className={`border p-4 flex items-center gap-4 cursor-pointer mb-4 ${
            payment === "card"
              ? "border-black"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            checked={payment === "card"}
            onChange={() => setPayment("card")}
          />

          <FiCreditCard
            className="text-blue-600"
            size={28}
          />

          <div>
            <h3 className="font-semibold">
              Card Payment
            </h3>

            <p className="text-sm text-gray-500">
              Visa, Mastercard, Amex
            </p>
          </div>
        </label>

        {/* bKash */}
        <label
          className={`border p-4 flex items-center gap-4 cursor-pointer ${
            payment === "bkash"
              ? "border-black"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            checked={payment === "bkash"}
            onChange={() => setPayment("bkash")}
          />

          <SiBkash
            className="text-pink-600"
            size={28}
          />

          <div>
            <h3 className="font-semibold">
              bKash
            </h3>

            <p className="text-sm text-gray-500">
              Pay with bKash mobile wallet
            </p>
          </div>
        </label>
      </div>

      {/* Terms */}
      <div className="p-6 border-b">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" />

          <span>
            I agree to the
            <span className="underline cursor-pointer">
              {" "}Terms & Conditions
            </span>,
            <span className="underline cursor-pointer">
              {" "}Refund Policy
            </span>{" "}
            and
            <span className="underline cursor-pointer">
              {" "}Privacy Policy
            </span>
          </span>
        </label>

        <button className="bg-[#333] hover:bg-black text-white w-full h-16 rounded mt-6 flex justify-center items-center gap-3 text-xl font-semibold">
          <FiLock />
          Confirm Order &nbsp; ৳1350
        </button>
      </div>

      {/* Bottom */}
      <div className="flex justify-around py-5 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiShield />
          Secure Payment
        </div>

        <div className="flex items-center gap-2">
          <FiRefreshCw />
          Easy Returns
        </div>

        <div className="flex items-center gap-2">
          <FiTruck />
          Fast Delivery
        </div>
      </div>
    </div>

    </div>
  );
};

export default Order;