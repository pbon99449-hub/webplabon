import React, { useEffect, useMemo, useState } from "react";
import {
  FiUser,
  FiMapPin,
  FiX,
  FiCheckCircle,
  FiPackage,
  FiClock,
  FiPhone,
  FiMail,
  FiHome,
  FiEdit3,
  FiArrowLeft,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiCheck,
} from "react-icons/fi";
import {
  HiOutlineShieldCheck,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import { getCartItems, removeFromCart, setCartItems } from "../../utils/cartStorage";
import wearnestLogo from "../../assets/wearnest-logo.png";

const formatPrice = (value) => {
  const numericValue = Number(String(value ?? "").replace(/[^\d.]/g, ""));

  if (!Number.isFinite(numericValue)) {
    return "৳0";
  }

  return `৳${numericValue.toLocaleString("en-BD")}`;
};

const generateOrderReference = () => {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `F${datePart}-${randomPart}`;
};

const chackoutpage = () => {
  const [items, setItems] = useState(() => getCartItems());
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Select City",
    altPhone: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [confirmedItems, setConfirmedItems] = useState([]);

  useEffect(() => {
    const onStorageUpdate = () => setItems(getCartItems());
    window.addEventListener("wearnest-storage-updated", onStorageUpdate);

    return () => window.removeEventListener("wearnest-storage-updated", onStorageUpdate);
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = Number(String(item?.price ?? "").replace(/[^\d.]/g, ""));
        const quantity = Number(item?.quantity || 1);

        return sum + (Number.isFinite(price) ? price * quantity : 0);
      }, 0),
    [items]
  );

  const shipping = 0;
  const total = subtotal + shipping;
  const shippingAddress = [formData.address, formData.city !== "Select City" ? formData.city : null, formData.altPhone, formData.note]
    .filter(Boolean)
    .join(", ");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const getFieldError = (name, value) => {
    if (name === "fullName" && !value.trim()) return "Full name is required";
    if (name === "phone" && !value.trim()) return "Phone number is required";
    if (name === "phone" && value.trim() && !/^01\d{9}$/.test(value.trim())) return "Enter a valid 11-digit phone number (01XXXXXXXXX)";
    if (name === "address" && !value.trim()) return "Address is required";
    if (name === "city" && (value === "Select City" || !value)) return "Please select a city";
    return "";
  };

  const validateField = (name, value) => {
    const error = getFieldError(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    const fields = ["fullName", "phone", "address", "city"];
    let isValid = true;
    const newErrors = {};
    const newTouched = {};

    fields.forEach((field) => {
      newTouched[field] = true;
      const error = getFieldError(field, formData[field]);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setFormErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmOrder = async () => {
    if (items.length === 0) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    const reference = generateOrderReference();
    const nextTotal = subtotal + shipping;

    try {
      // Send order to backend - this is REQUIRED for email & SMS to be sent
      const payload = {
        orderReference: reference,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          fullAddress: formData.address,
          city: formData.city,
          altPhone: formData.altPhone,
          note: formData.note,
        },
        items: items.map((it) => ({
          id: it.id,
          title: it.title,
          image: it.image,
          price: it.price,
          quantity: it.quantity || 1,
        })),
        subtotal,
        shippingCost: shipping,
        discount: 0,
        totalPrice: nextTotal,
        paymentMethod,
      };

      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Backend order creation failed');
      }

      // Only proceed with confirmation after successful backend response
      setConfirmedItems([...items]);
      setOrderReference(reference);
      setConfirmedTotal(nextTotal);
      setCartItems([]);
      setItems([]);
      setIsConfirmed(true);
    } catch (err) {
      console.error('Order failed:', err.message);
      alert('দুঃখিত, আপনার অর্ডারটি সম্পন্ন হয়নি। ব্যাকএন্ড সার্ভার চালু আছে কিনা নিশ্চিত হয়ে আবার চেষ্টা করুন।\n\nSorry, your order could not be completed. Please ensure the backend server is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    const now = new Date();
    const estimatedDate = new Date(now);
    estimatedDate.setDate(estimatedDate.getDate() + 3);
    const estimatedDelivery = estimatedDate.toLocaleDateString("en-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
        {/* Main Container */}
        <div className="mx-auto max-w-3xl">
          {/* Success Header Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 mb-6">
            {/* Decorative gradient bar */}
            <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"></div>

            <div className="px-8 pt-8 pb-6 text-center">
              {/* Wearnest Logo */}
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <img
                    src={wearnestLogo}
                    alt="Wearnest"
                    className="h-14 object-contain"
                  />
                </div>
              </div>

              {/* Animated Check Circle */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200">
                <FiCheckCircle className="text-4xl text-white" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Order Placed Successfully!
              </h1>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                Thank you for shopping with <span className="font-semibold text-gray-700">Wearnest</span>. Your order has been confirmed and is being processed.
              </p>
            </div>

            {/* Order Reference Badge */}
            <div className="mx-8 mb-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <FiPackage className="text-lg text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-medium uppercase tracking-wider">Order Reference</p>
                    <p className="text-lg font-bold text-gray-900 tracking-wide">{orderReference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(confirmedTotal)}</p>
                </ div>
              </div>
            </div>
          </div>

          {/* Order Details Cards */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {/* Delivery Info */}
            <div className="rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <FiTruck className="text-sm text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Delivery Info</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5">
                  <FiClock className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    Estimated delivery: <span className="font-medium text-gray-800">{estimatedDelivery}</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiHome className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    Shipping to: <span className="font-medium text-gray-800">{formData.fullName}</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiMapPin className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{shippingAddress || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <FiCreditCard className="text-sm text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Payment Details</h3>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2.5">
                  <FiCheck className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    Method: <span className="font-medium text-gray-800">{paymentMethod}</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiShoppingBag className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    Items: <span className="font-medium text-gray-800">{confirmedItems.length} product(s)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <FiPackage className="mt-0.5 text-gray-400 shrink-0" />
                  <span className="text-gray-600">
                    Status:{" "}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Confirmed
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] border border-gray-100 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <FiUser className="text-sm text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Customer Information</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2.5 text-sm">
                <FiUser className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Name</p>
                  <p className="font-medium text-gray-800">{formData.fullName || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <FiPhone className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  <p className="font-medium text-gray-800">{formData.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <FiMail className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="font-medium text-gray-800">{formData.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <FiEdit3 className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Delivery Note</p>
                  <p className="font-medium text-gray-800">{formData.note || "No note provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {confirmedItems.length > 0 && (
            <div className="rounded-2xl bg-white shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <FiShoppingBag className="text-sm text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Ordered Items</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {confirmedItems.map((item) => (
                  <div key={item.id || `${item.title}-${item.size}`} className="flex gap-4 py-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || "Product"}
                        className="w-16 h-16 rounded-xl border object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl border bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm font-medium text-gray-800">{item.title || "Product"}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>Qty: {item.quantity || 1}</span>
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-gray-800">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information Note */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 shrink-0">
                <HiOutlineShieldCheck className="text-lg text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">Please save this information</p>
                <p className="text-xs text-amber-700/80 mt-1">
                  Keep your order reference number for any future inquiries regarding your order. 
                  You will receive an SMS notification once your order is dispatched.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-gray-900/10"
            >
              <FiArrowLeft className="text-base" />
              Continue Shopping
            </a>
            <a
              href="/profile"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-sm transition-all duration-200"
            >
              <FiUser className="text-base" />
              View My Orders
            </a>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Wearnest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-8 bg-white border border-gray-200 rounded-md p-8">
            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FiUser className="text-gray-500 text-lg" />
                <h2 className="text-[22px] font-semibold">Contact Information</h2>
              </div>

              <hr className="mb-6" />

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full border rounded px-4 py-3 outline-none ${touched.fullName && formErrors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"}`}
                />
                {touched.fullName && formErrors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="01XXXXXXXXX"
                    className={`w-full border rounded px-4 py-3 outline-none ${touched.phone && formErrors.phone ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"}`}
                  />
                  {touched.phone && formErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FiMapPin className="text-gray-500 text-lg" />
                <h2 className="text-[22px] font-semibold">Shipping Address</h2>
              </div>

              <hr className="mb-6" />

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Detailed Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="House, Road, Area"
                  className={`w-full border rounded px-4 py-3 outline-none ${touched.address && formErrors.address ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"}`}
                />
                {touched.address && formErrors.address && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City / District <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-4 py-3 outline-none ${touched.city && formErrors.city ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"}`}
                  >
                    <option>Select City</option>
                    <option>Dhaka</option>
                    <option>Chattogram</option>
                    <option>Khulna</option>
                    <option>Rajshahi</option>
                    <option>Barishal</option>
                    <option>Sylhet</option>
                    <option>Rangpur</option>
                    <option>Mymensingh</option>
                  </select>
                  {touched.city && formErrors.city && (
                    <p className="mt-1 text-xs text-red-500">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Alt. Phone</label>

                  <input
                    type="text"
                    name="altPhone"
                    value={formData.altPhone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX (optional)"
                    className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Note for Delivery</label>

                <textarea
                  rows="4"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Special instructions (optional)"
                  className="w-full border border-gray-300 rounded px-4 py-3 resize-none outline-none focus:border-black"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                {/* <button className="text-sm text-black underline">Modify</button> */}
              </div>

              {items.length === 0 ? (
                <p className="py-3 text-sm text-gray-500">No products in cart yet.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id || `${item.title}-${item.size}`} className="flex gap-4 py-4 border-b last:border-b-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || "Product"}
                        className="w-20 h-20 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-md border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                        Image
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold">{item.title || "Product"}</h3>
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.id);
                            setItems(getCartItems());
                          }}
                          className="mt-0.5 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
                          aria-label="Remove item"
                        >
                          <FiX size={19} />
                        </button>
                      </div>
                      {item.size ? <p className="text-xs text-gray-500 mt-1">Size : {item.size}</p> : null}
                      <p className="text-xs text-gray-500">Qty : {item.quantity || 1}</p>
                      <p className="font-semibold mt-2">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))
              )}

              <div className="space-y-3 mt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="font-medium block mb-2">Coupon Code</label>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-3 outline-none"
                  />

                  <button className="bg-black text-white px-5 rounded-r-md">Apply</button>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

                <label className="flex items-center gap-3 border rounded-md p-4 cursor-pointer mb-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash On Delivery"
                    checked={paymentMethod === "Cash On Delivery"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  <span className="font-medium">Cash On Delivery</span>
                </label>

                {/* <label className="flex items-center gap-3 border rounded-md p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="bKash Payment"
                    checked={paymentMethod === "bKash Payment"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  <span className="font-medium">bKash Payment</span>
                </label> */}
              </div>

              <div className="flex gap-2 mt-6 items-start">
                <input type="checkbox" />

                <p className="text-sm text-gray-600">
                  I agree to the Terms & Conditions, Refund Policy and Privacy Policy.
                </p>
              </div>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-md mt-6 font-semibold text-lg disabled:opacity-50"
                disabled={items.length === 0 || isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : `Confirm Order • ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chackoutpage;