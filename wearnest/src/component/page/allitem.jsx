import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaMale, FaFemale, FaChild, FaUser } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import arg from "../../assets/arg.jpg";

import {
  getWishlistItems,
  toggleWishlistItem,
  setLastAddedId,
} from "../../utils/wishlistStorage";
import { toggleCartItem } from "../../utils/cartStorage";

const AllItem = () => {
  const navigate = useNavigate();
  const [likedIds, setLikedIds] = useState(() => getWishlistItems().map((item) => item.id));

  const products = [
    { id: 'arg-1', slug: 'football-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-2', slug: 'argentina-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-3', slug: 'brazil-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-4', slug: 'football-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-5', slug: 'argentina-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-6', slug: 'brazil-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-7', slug: 'football-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
    { id: 'arg-8', slug: 'argentina-jersey', title: 'Argentina 2026 World Cup Home Jersey - Fan Edition', price: '৳690', image: arg },
  ];

  const handleWishlistToggle = (product) => {
    toggleWishlistItem({ id: product.id, title: product.title, image: product.image, price: product.price });
    setLastAddedId(product.id);
    setLikedIds(getWishlistItems().map((item) => item.id));
  };

  const handleCartToggle = (product) => {
    toggleCartItem({ id: product.id, title: product.title, image: product.image, price: product.price });
  };

  return (
    <section className="max-w-[1400px] mx-auto py-6">
      <div className="flex gap-6 items-start">
        {/* Left Sidebar */}
        <div className="w-[250px] rounded-lg p-5 ml-[-131px] sticky top-[80px] mt-[-45px] max-h-[calc(100vh-80px)] overflow-y-auto">
          <h2 className="text-xl font-bold mb-5 text-red-600">Special Offers</h2>

          <div className="space-y-4 text-gray-700">
            <Link to="/allitem?offer=mega-deal" className="block hover:text-blue-600 transition-colors">⚡ Mega Deal</Link>
            <Link to="/allitem?offer=new-arrival" className="block hover:text-blue-600 transition-colors">⚡ New Arrival</Link>
            <Link to="/allitem?offer=top-selling" className="block hover:text-blue-600 transition-colors">⚡ Top Selling</Link>
            <Link to="/allitem?offer=free-delivery" className="block hover:text-blue-600 transition-colors">⚡ Free Delivery</Link>
            <Link to="/allitem?offer=merchandise" className="block hover:text-blue-600 transition-colors">⚡ Merchandise</Link>
          </div>

          <div className="border-t my-6"></div>

          <h2 className="text-lg font-semibold mb-4">Categories</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=mens" className="text-[#00aeef] hover:text-blue-600 transition-colors">Mens</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">1260</span>
            </div>

            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=mens&subcategory=polo-t-shirt" className="hover:text-blue-600 transition-colors">Polo T-Shirt</Link>
                <span className="bg-gray-100 px-2 rounded-full">144</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=mens&subcategory=hoodie" className="hover:text-blue-600 transition-colors">Hoodie</Link>
                <span className="bg-gray-100 px-2 rounded-full">30</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=womens" className="text-[#00aeef] hover:text-blue-600 transition-colors">Womens</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">100</span>
            </div>
            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=womens&subcategory=sports-trouser" className="hover:text-blue-600 transition-colors">Sports Trouser</Link>
                <span className="bg-gray-100 px-2 rounded-full">22</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=womens&subcategory=shorts" className="hover:text-blue-600 transition-colors">Shorts</Link>
                <span className="bg-gray-100 px-2 rounded-full">37</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=womens&subcategory=underwear" className="hover:text-blue-600 transition-colors">Underwear54</Link>
                <span className="bg-gray-100 px-2 rounded-full">54</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=teens" className="text-[#00aeef] hover:text-blue-600 transition-colors">Teens</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">100</span>
            </div>
            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=teens&subcategory=sports-trouser" className="hover:text-blue-600 transition-colors">Sports Trouser</Link>
                <span className="bg-gray-100 px-2 rounded-full">22</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=teens&subcategory=shorts" className="hover:text-blue-600 transition-colors">Shorts</Link>
                <span className="bg-gray-100 px-2 rounded-full">37</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=teens&subcategory=underwear" className="hover:text-blue-600 transition-colors">Underwear54</Link>
                <span className="bg-gray-100 px-2 rounded-full">54</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=kids" className="text-[#00aeef] hover:text-blue-600 transition-colors">Kids</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">100</span>
            </div>
            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=kids&subcategory=sports-trouser" className="hover:text-blue-600 transition-colors">Sports Trouser</Link>
                <span className="bg-gray-100 px-2 rounded-full">22</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=kids&subcategory=shorts" className="hover:text-blue-600 transition-colors">Shorts</Link>
                <span className="bg-gray-100 px-2 rounded-full">37</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=sports" className="text-[#00aeef] hover:text-blue-600 transition-colors">Sports</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">100</span>
            </div>
            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=sports&subcategory=sports-trouser" className="hover:text-blue-600 transition-colors">Sports Trouser</Link>
                <span className="bg-gray-100 px-2 rounded-full">22</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=sports&subcategory=panjabi" className="hover:text-blue-600 transition-colors">Panjabi</Link>
                <span className="bg-gray-100 px-2 rounded-full">143</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex justify-between items-center">
              <Link to="/allitem?category=face-mask" className="text-[#00aeef] hover:text-blue-600 transition-colors">Face Mask</Link>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">100</span>
            </div>
            <div className="pl-5 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <Link to="/allitem?category=face-mask&subcategory=underwear" className="hover:text-blue-600 transition-colors">Underwear54</Link>
                <span className="bg-gray-100 px-2 rounded-full">54</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=face-mask&subcategory=jeans" className="hover:text-blue-600 transition-colors">Jeans</Link>
                <span className="bg-gray-100 px-2 rounded-full">20</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=face-mask&subcategory=pajama" className="hover:text-blue-600 transition-colors">Pajama</Link>
                <span className="bg-gray-100 px-2 rounded-full">5</span>
              </div>
              <div className="flex justify-between">
                <Link to="/allitem?category=face-mask&subcategory=accessories" className="hover:text-blue-600 transition-colors">Accesorries</Link>
                <span className="bg-gray-100 px-2 rounded-full">36</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1px] bg-gray-300"></div>

        <div className="flex-1 rounded-lg mr-[-160px] mt-[-54px]">
          <div className="relative mb-8">
            <FiSearch size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search a product"
              className="w-full h-[58px] rounded-xl border border-gray-300 pl-14 pr-5 text-[17px] outline-none focus:border-blue-500"
            />
          </div>

          <h2 className="text-2xl font-bold mb-4">Product Section</h2>

          <div className="flex flex-wrap gap-4 mb-10">
            <button className="flex items-center gap-2 px-6 h-[50px] rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 duration-300">
              <FaMale className="text-[16px]" />
              <span>Men</span>
            </button>
            <button className="flex items-center gap-2 px-6 h-[50px] rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium hover:bg-pink-100 duration-300">
              <FaFemale className="text-[16px]" />
              <span>Women</span>
            </button>
            <button className="flex items-center gap-2 px-6 h-[50px] rounded-full border border-green-200 bg-green-50 text-green-600 font-medium hover:bg-green-100 duration-300">
              <FaChild className="text-[16px]" />
              <span>Kids</span>
            </button>
            <button className="flex items-center gap-2 px-6 h-[50px] rounded-full border border-purple-200 bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 duration-300">
              <FaUser className="text-[15px]" />
              <span>Teens</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/chackout/${p.slug}`)}
                role="button"
                className="w-[300px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer transition-shadow duration-200 hover:shadow-lg"
              >
                {/* image */}
                <div className="relative mb-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />

                  {/* top-right heart */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(p);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur text-rose-600 hover:bg-white transition-all"
                    aria-label="Add to wishlist"
                  >
                    {likedIds.includes(p.id) ? (
                      <IoIosHeart size={20} className="text-rose-500" />
                    ) : (
                      <IoIosHeartEmpty size={20} className="text-rose-500" />
                    )}
                  </button>
                </div>

                {/* title */}
                <div className="mb-4">
                  <h3 className="text-gray-800 text-lg leading-tight mb-2">{p.title}</h3>

                  {/* price + cart */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-gray-900">{p.price}</p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCartToggle(p);
                      }}
                      className="bg-gray-900 p-3 rounded-full text-white cursor-pointer hover:bg-gray-700 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllItem;

