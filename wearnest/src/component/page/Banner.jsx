import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import banner from '../../assets/wearnest-banner.png'
import newArrivalTshirt from '../../assets/new-arrival-tshirt.jpg'
import banner1 from '../../assets/banner1.jpg'
import tshirt1 from '../../assets/tshirt1.jpg'
import polo from '../../assets/polo.jpg'
import kidspolo from '../../assets/kidspolo.jpg'
import shorts1 from '../../assets/shorts1.jpg'
import shorts2 from '../../assets/shorts2.jpg'
import shorts3 from '../../assets/shorts3.jpg'
import shorts4 from '../../assets/shorts4.jpg'
import shorts5 from '../../assets/shorts5.jpg'
import denim from '../../assets/denim.jpg'
import cap from '../../assets/cap.jpg'
import belt from '../../assets/belt.jpg'
import wallet from '../../assets/wallet.jpg'
import sports from '../../assets/sports.jpg'
import little from '../../assets/little.jpg'
import womens from '../../assets/womens.jpg'
import mask from '../../assets/mask.jpg'
import muja from '../../assets/muja.jpg'
import kurti from '../../assets/kurti.png'
import p1 from '../../assets/p1.jpg'
import ms from '../../assets/ms.jpg'
import s1 from '../../assets/s1.jpg'
import w1 from '../../assets/w1.jpg'
import k1 from '../../assets/k1.jpg'
import d1 from '../../assets/d1.png'
import l1 from '../../assets/l1.jpg'
import m1 from '../../assets/m1.jpg'
import wearnest from '../../assets/wearnest.png'

const products = [
  {
    image: shorts1,
    price: "590.00",
    oldPrice: "800.00",
  },
  {
    image: shorts2,
    price: "550.00",
    oldPrice: "720.00",
  },
  {
    image: shorts3,
    price: "550.00",
    oldPrice: "720.00",
  },
  {
    image: shorts4,
    price: "435.00",
    oldPrice: "720.00",
  },
  {
    image: shorts5,
    price: "590.00",
    oldPrice: "800.00",
  },
  {
    image: shorts5,
    price: "590.00",
    oldPrice: "800.00",
  },
];

const categoryLinks = [
  { label: 'SHOP NOW', to: '/allitem' },
  { label: 'MEN', to: '/allitem?category=men' },
  { label: 'WOMEN', to: '/allitem?category=women' },
  { label: 'KIDS', to: '/allitem?category=kids' },
]

const newArrivalItems = Array.from({ length: 30 }, (_, index) => index + 1)

const Banner = () => {
  const navigate = useNavigate()
  const goToAllitem = () => navigate('/allitem')

  return (
    <section className="relative left-1/2 -mt-10 w-screen -translate-x-1/2">
      <img
        src={banner}
        alt="WearNest custom clothing and apparel banner"
        className="block h-auto w-full"
      />

      <nav className="mt-1 grid grid-cols-2 bg-[#eeeeee] text-[#222] shadow-sm sm:grid-cols-4">
        {categoryLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="flex min-h-14 items-center justify-center border-white px-4 text-sm font-semibold tracking-wide transition-colors hover:bg-[#e2e2e2] sm:min-h-16 sm:text-base [&:not(:last-child)]:border-r"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <section className="mt-2 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-center bg-[#fbf2e8] sm:h-28">
            <h2 className="font-['Roboto_Condensed',sans-serif] text-[10px] font-semibold uppercase text-[#c27d13] sm:text-4xl">
              New Arrival
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 rounded-[5px]">
            {newArrivalItems.slice(0, 10).map((item) => (
              <div
                key={item}
                onClick={goToAllitem}
                className="aspect-square overflow-hidden rounded-[3px] bg-[#edf1f2] cursor-pointer"
              >
                <img
                  src={newArrivalTshirt}
                  alt={`New arrival t-shirt ${item}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <section className="max-w-[1400px] mx-auto mt-5 px-4">

  {/* Top Banner */}
  <div className="grid grid-cols-2 gap-5">

    <div onClick={goToAllitem} className="h-[260px] rounded-xl bg-gradient-to-r from-slate-900 to-blue-500 shadow-lg overflow-hidden cursor-pointer">
      <img
        src={banner1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[260px] rounded-xl bg-gradient-to-r from-slate-900 to-cyan-500 shadow-lg overflow-hidden cursor-pointer">
      <img
        src={banner1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

  </div>

  {/* Product Grid */}
  <div className="grid grid-cols-3 gap-5 mt-5">

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
        src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
        src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
       src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
        src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
       src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

    <div onClick={goToAllitem} className="h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <img
      src={tshirt1}
        alt=""
        className="w-full h-full object-cover hover:scale-105 duration-300"
      />
    </div>

  </div>

</section>

<section className="max-w-[1400px] mx-auto px-6 py-16">
  <div className="flex items-center justify-between gap-10">

    {/* Left Content */}
    <div className="w-[60%]">
      <h2 className="text-[40px] font-light text-gray-800">
        WearNest
        <span className="text-green-500 ml-2">›</span>
      </h2>

      <h3 className="text-[23px] font-normal text-gray-800 mt-1 leading-tight">
        Because comfort and confidence go hand in hand.
      </h3>

      <p className="mt-2 text-[20px] leading-7 text-gray-600">
        We focus on carefully selecting the best clothing that is
        comfortable, looks great, and makes you confident. Apart from the
        fabric, design and fit, we go through strict quality control
        parameters to give you what you truly deserve. The power of a good
        outfit is how it can influence your perception of yourself.
      </p>
    </div>

    {/* Right Image */}
    <div className="w-[40%] flex justify-end">
      <img
        src={wearnest}
        alt="WearNest"
        className="w-[520px] object-contain"
      />
    </div>

  </div>
</section>

<section className="max-w-[1400px] mx-auto py-8">
  <div className="grid grid-cols-12 gap-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={polo}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

    {/* Bottom Title */}
    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
        Designer Polo
      </h2>
    </div>

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={p1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
  <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={kurti}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

    {/* Bottom Title */}
    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
       Kurti, Tunic & Tops
      </h2>
    </div>

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={k1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>

  <div className="flex gap-5 mt-4">

    {/* Classic Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Classic Polo
      </h2>
    </div>

    {/* Designer Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Designer Polo
      </h2>
    </div>

    {/* Kids Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Kids Polo
      </h2>
    </div>

  </div>

   <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={polo}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

    {/* Bottom Title */}
    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
        Panjabi
      </h2>
    </div>

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={p1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}

    </div>

  </div>

  <div className="flex gap-5 mt-4">

    {/* Classic Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Pajamas
      </h2>
    </div>

    {/* Designer Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Sports Trousers
      </h2>
    </div>

    {/* Kids Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Comfy Trousers
      </h2>
    </div>

  </div>
  <div className="flex gap-5 mt-4">

    {/* Classic Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Chino Shorts
      </h2>
    </div>

    {/* Designer Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Cargo Pants 
      </h2>
    </div>

    {/* Kids Polo */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={kidspolo}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Chino Pants
      </h2>
    </div>

  </div>

   <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={denim}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

    {/* Bottom Title */}
    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
        Denim jeans
      </h2>
    </div>

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={d1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>
</section>

<section className="max-w-[1400px] mx-auto mt-4">
  <div className="grid grid-cols-6 gap-4">

    {products.map((product, index) => (
      <div
        key={index}
        onClick={goToAllitem} className="relative h-[250px] rounded-md overflow-hidden group cursor-pointer"
      >
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 duration-300"
        />

        {product.viewMore && (
          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
            <h2 className="text-white text-[22px] font-semibold text-center">
              VIEW <br /> MORE
            </h2>
          </div>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-md shadow-md px-3 py-1">
          <div className="flex gap-2 whitespace-nowrap">
            <span className="font-bold">
              ৳ {product.price}
            </span>

            <span className="line-through text-gray-400">
              ৳ {product.oldPrice}
            </span>
          </div>
        </div>
      </div>
    ))}

  </div>

  <div className="flex gap-5 mt-4">

    {/* Cap */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={cap}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Cap
      </h2>
    </div>

    {/* Belt */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={belt}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
       Belt
      </h2>
    </div>

    {/* wallet */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={wallet}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Wallet
      </h2>
    </div>

  </div>

  <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={little}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

    {/* Bottom Title */}
    <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
        Little ones tees
      </h2>
    </div>

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={l1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>

</section>

<section className="w-full py-3 px-4">
  <div className="max-w-[1600px] mx-auto bg-[#d6f3ef] h-[130px] rounded-sm flex flex-col items-center justify-center text-center">

    <p className="text-[13px] md:text-[16px] font-semibold uppercase tracking-wide text-[#007b80]">
      THE BEST QUALITY SOCKS YOU CAN FIND IN BANGLADESH
    </p>

    <h2
      className="text-[32px] md:text-[56px] font-bold text-[#007b80] leading-none"
      style={{ fontFamily: "Bebas Neue, sans-serif" }}
    >
      Premium Antibacterial Socks
    </h2>

    <button className="mt-2 flex items-center gap-2 text-[#007b80] text-[18px] font-semibold hover:gap-3 transition-all duration-300">
      Visit Store
      <span className="text-xl">›</span>
    </button>

  </div>
    <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={muja}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
    {/* <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div> */}

    {/* Bottom Title */}
    {/* <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
        Little ones tees
      </h2>
    </div> */}

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={m1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>
   <div className="flex gap-5 mt-4">

    {/* Cap */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={cap}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        frock
      </h2>
    </div>

    {/* Belt */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={belt}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
       T-shirts and Shorts
      </h2>
    </div>

    {/* wallet */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={wallet}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Panjabi
      </h2>
    </div>

  </div>
    <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={womens}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
     <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div> *

    {/* Bottom Title */}
     <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
       Womens Designer T-shirts
      </h2>
    </div> 

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={w1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>
    <div className="flex gap-5 mt-4">

    {/* Cap */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={cap}
        alt="Classic Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
        Pants
      </h2>
    </div>

    {/* Belt */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={belt}
        alt="Designer Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
      Designer Pajamas
      </h2>
    </div>

    {/* wallet */}
    <div onClick={goToAllitem} className="relative w-1/3 h-[510px] overflow-hidden rounded-md group cursor-pointer">
      <img
        src={wallet}
        alt="Kids Polo"
        className="w-full h-full object-cover group-hover:scale-105 duration-300"
      />

      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <h2 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[20px] font-semibold">
       Comfy Trousers
      </h2>
    </div>

  </div>
   <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={sports}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
     <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div> *

    {/* Bottom Title */}
     <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
       Sports T-shirt
      </h2>
    </div> 

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={s1}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>
   <div className="grid grid-cols-12 gap-4 mt-4">

    {/* Left Big Card */}
   <div className="col-span-4">
  <div className="relative overflow-hidden rounded-md group h-[510px]">

    <img
      src={mask}
      alt="Designer Polo"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />

    {/* Black Gradient Layer */}
     <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div> *

    {/* Bottom Title */}
     <div className="absolute bottom-5 left-0 right-0 flex justify-center">
      <h2 className="text-white text-[24px] font-bold drop-shadow-lg">
       Certified Face Masks
      </h2>
    </div> 

  </div>
</div>

    {/* Right Products */}
    <div className="col-span-8 grid grid-cols-4 gap-4">

      {[1,2,3,4,5,6,7,8].map((item)=>(
        <div key={item} className="relative rounded-md overflow-hidden group">

          <img
            src={ms}
            className="w-full h-[247px] object-cover group-hover:scale-105 duration-300"
            alt=""
          />

          {/* Price Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 py-1 shadow-lg">

            <div className="flex items-center gap-2 whitespace-nowrap">

              <span className="font-bold text-[18px] text-black">
                ৳ 890.00
              </span>

              <span className="text-gray-400 line-through text-[16px]">
                ৳ 1490.00
              </span>

            </div>

          </div>

        </div>
      ))}
    </div>
  </div>
</section>




        </div>
      </section>
    </section>
  )
}

export default Banner