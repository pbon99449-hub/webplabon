import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiChevronRight,
} from "react-icons/fi";

import arg from "../../assets/arg.jpg";
import { addToCart, toggleCartItem } from "../../utils/cartStorage";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../../utils/wishlistStorage";

const productData = [
  {
    slug: "football-jersey",
    title: "Cristiano Ronaldo CR7 Portugal Home Jersey",
    price: 799,
    oldPrice: 999,
    discount: "20% OFF",
    image: arg,
    images: [arg],
    description:
      "Fabrilife Men's Premium Quality Football Jersey is made with breathable polyester fabric. It is lightweight, comfortable, and suitable for casual wear, sports, and outdoor activities.",
    specs: [
      "Premium Quality Polyester Fabric",
      "Regular Fit",
      "145 GSM Fabric",
      "Soft & Comfortable",
      "High Quality Sublimation Print",
      "Machine Washable",
      "Long Lasting Color",
    ],
    sizeChart: [
      { size: "M", length: 28, chest: 40, sleeve: 8 },
      { size: "L", length: 29, chest: 42, sleeve: 8.5 },
      { size: "XL", length: 30, chest: 44, sleeve: 9 },
      { size: "2XL", length: 31, chest: 46, sleeve: 9.5 },
    ],
  },
  {
    slug: "argentina-jersey",
    title: "Lionel Messi Argentina Home Jersey",
    price: 850,
    oldPrice: 1099,
    discount: "22% OFF",
    image: arg,
    images: [arg],
    description:
      "Official-inspired Argentina football jersey with a soft fit and premium print quality for match-day and everyday comfort.",
    specs: [
      "Premium Polyester Fabric",
      "Regular Fit",
      "140 GSM Fabric",
      "Breathable Material",
      "High Quality Sublimation Print",
      "Machine Washable",
    ],
    sizeChart: [
      { size: "M", length: 27, chest: 39, sleeve: 7.8 },
      { size: "L", length: 28, chest: 41, sleeve: 8.2 },
      { size: "XL", length: 29, chest: 43, sleeve: 8.6 },
      { size: "2XL", length: 30, chest: 45, sleeve: 9 },
    ],
  },
  {
    slug: "brazil-jersey",
    title: "Brazil 2026 Home Jersey",
    price: 780,
    oldPrice: 950,
    discount: "18% OFF",
    image: arg,
    images: [arg],
    description:
      "A lightweight and stylish Brazil jersey built for comfort, movement, and a premium sports look.",
    specs: [
      "Breathable Polyester",
      "Regular Fit",
      "145 GSM Fabric",
      "Soft & Comfortable",
      "Fade Resistant Print",
      "Machine Washable",
    ],
    sizeChart: [
      { size: "M", length: 28, chest: 40, sleeve: 8.1 },
      { size: "L", length: 29, chest: 42, sleeve: 8.4 },
      { size: "XL", length: 30, chest: 44, sleeve: 8.8 },
      { size: "2XL", length: 31, chest: 46, sleeve: 9.2 },
    ],
  },
];



const ProductDetails = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();

  const selectedProduct =
    productData.find((item) => item.slug === productSlug) || productData[0];
  const images = selectedProduct.images;

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(() => isInWishlist(selectedProduct.slug));

  useEffect(() => {
    setSelectedImage(images[0]);
    setSize("M");
    setQuantity(1);
    setLiked(isInWishlist(selectedProduct.slug));
  }, [images, selectedProduct.slug]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        id: selectedProduct.slug,
        title: selectedProduct.title,
        price: `৳${selectedProduct.price}`,
        image: selectedProduct.image,
        size,
        quantity: 1,
      });
    }

    navigate("/cart");
  };

  const handleWishlistToggle = () => {
    if (liked) {
      removeFromWishlist(selectedProduct.slug);
      setLiked(false);
      return;
    }

    addToWishlist({
      id: selectedProduct.slug,
      title: selectedProduct.title,
      image: selectedProduct.image,
    });
    setLiked(true);
  };

  return (
    <section className="max-w-[1400px] mx-auto py-10 px-5">

      <div className="grid grid-cols-2 gap-14">

        {/* LEFT */}

        <div>

          <div className="border rounded-xl overflow-hidden">

            <img
              src={selectedImage}
              alt=""
              className="w-full h-[650px] object-cover"
            />

          </div>

          <div className="flex gap-4 mt-5">

            {images.map((arg, index) => (

              <button
                key={index}
                onClick={() => setSelectedImage(arg)}
                className={`border rounded-lg overflow-hidden transition

                ${
                  selectedImage === arg
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >

                <img
                  src={arg}
                  alt=""
                  className="w-[100px] h-[120px] object-cover"
                />

              </button>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <h2 className="text-4xl font-bold leading-[55px]">

            {selectedProduct.title}

          </h2>

          <div className="flex items-center gap-4 mt-6">

            <h1 className="text-5xl font-bold text-[#111]">

              ৳{selectedProduct.price}

            </h1>

            <del className="text-2xl text-gray-500">

              ৳{selectedProduct.oldPrice}

            </del>

            <span className="bg-red-500 text-white px-3 py-1 rounded">

              {selectedProduct.discount}

            </span>

          </div>

          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`flex items-center gap-2 mt-6 text-lg ${liked ? "text-rose-600" : "text-gray-700"}`}
          >
            <FiHeart className={liked ? "fill-current" : ""} />
            {liked ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          <div className="mt-10">

            <h3 className="font-semibold text-lg mb-4">

              Select Size

            </h3>

            <div className="flex gap-4">

              {["M", "L", "XL", "2XL"].map((item) => (

                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`w-16 h-16 border rounded-lg font-semibold

                  ${
                    size === item
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >

                  {item}

                </button>

              ))}

            </div>

          </div>

          <div className="mt-10">

            <h3 className="font-semibold text-lg mb-4">

              Quantity

            </h3>

            <div className="flex items-center gap-6">

              <button
                onClick={decrease}
                className="w-12 h-12 rounded-lg border flex justify-center items-center"
              >

                <FiMinus />

              </button>

              <span className="text-2xl font-bold">

                {quantity}

              </span>

              <button
                onClick={increase}
                className="w-12 h-12 rounded-lg border flex justify-center items-center"
              >

                <FiPlus />

              </button>

            </div>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-5 rounded-lg text-lg font-semibold hover:bg-gray-900"
            >
              Add To Cart
            </button>

            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`w-16 rounded-lg border flex justify-center items-center ${liked ? "bg-rose-50 text-rose-600" : "text-gray-700"}`}
            >
              <FiHeart size={22} className={liked ? "fill-current" : ""} />
            </button>

          </div>

          <div className="border rounded-xl p-6 mt-10">

            <div className="flex items-center justify-between">

              <h2 className="font-bold text-xl">

                Easy Returns & Exchange

              </h2>

              <FiChevronRight />

            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">

              <div>

                <h4 className="font-semibold">

                  Tell us within 7 days

                </h4>

              </div>

              <div>

                <h4 className="font-semibold">

                  Free return shipping

                </h4>

              </div>

              <div>

                <h4 className="font-semibold">

                  Instant refund

                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Product Description */}
<div className="mt-10 border rounded-xl p-6">

  <h2 className="text-2xl font-bold mb-6">
    Product Description
  </h2>

  <p className="text-gray-600 leading-8">
    {selectedProduct.description}
  </p>

  <h3 className="text-xl font-bold mt-8 mb-4">
    Detailed Specification
  </h3>

  <ul className="list-disc pl-6 space-y-3 text-gray-700">

    {selectedProduct.specs.map((spec) => (
      <li key={spec}>{spec}</li>
    ))}

  </ul>

</div>

{/* Size Chart */}

<div className="mt-10 border rounded-xl overflow-hidden">

  <div className="flex">

    <button className="w-32 h-14 bg-black text-white font-semibold">
      INCH
    </button>

    

  </div>

  <table className="w-full text-center">

    <thead className="bg-gray-100">

      <tr>

        <th className="py-4 border">Size</th>

        <th className="border">Length</th>

        <th className="border">Chest</th>

        <th className="border">Sleeve</th>

      </tr>

    </thead>

    <tbody>

      {selectedProduct.sizeChart.map((row) => (
        <tr key={row.size}>
          <td className="border py-4">{row.size}</td>
          <td className="border">{row.length}</td>
          <td className="border">{row.chest}</td>
          <td className="border">{row.sleeve}</td>
        </tr>
      ))}

    </tbody>

  </table>

</div>

{/* Frequently Bought Together */}

<div className="mt-16">

  <h2 className="text-3xl font-bold mb-8">
    Frequently Bought Together
  </h2>

  <div className="grid grid-cols-4 gap-6">

    {[1,2,3,4].map((item)=>(
      <div
        key={item}
        className="border rounded-xl overflow-hidden hover:shadow-xl duration-300 cursor-pointer"
      >

        <img
          src={arg}
          alt=""
          className="w-full h-[300px] object-cover"
        />

        <div className="p-5">

          <h3 className="font-semibold text-lg leading-7">
            Cristiano Ronaldo Portugal Jersey
          </h3>

          <div className="flex items-center gap-3 mt-3">

            <span className="text-2xl font-bold">
              ৳799
            </span>

            <del className="text-gray-400">
              ৳999
            </del>

          </div>

          <button
            className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 duration-300"
          >
            Add To Cart
          </button>

        </div>

      </div>
    ))}

  </div>

</div>

{/* Customer Reviews */}

<div className="mt-20 border rounded-xl p-8">

  <h2 className="text-3xl font-bold">
    Customer Reviews
  </h2>

  <div className="mt-6">

    <div className="flex items-center justify-between border-b pb-5">

      <div>

        <h3 className="font-semibold text-lg">
          John Doe
        </h3>

        <p className="text-yellow-500 text-xl">
          ★★★★★
        </p>

      </div>

      <span className="text-gray-500">
        2 Days Ago
      </span>

    </div>

    <p className="mt-5 text-gray-600 leading-8">
      Very good quality jersey. Fabric is soft and the print
      quality is excellent. Highly recommended.
    </p>

  </div>

</div>

{/* Related Products */}

<div className="mt-20 mb-16">

  <h2 className="text-3xl font-bold mb-8">
    Related Products
  </h2>

  <div className="grid grid-cols-4 gap-6">

    {productData
      .filter((item) => item.slug !== selectedProduct.slug)
      .slice(0, 4)
      .map((item) => (
        <div
          key={item.slug}
          className="border rounded-xl overflow-hidden hover:shadow-lg duration-300 cursor-pointer"
          onClick={() => navigate(`/chackout/${item.slug}`)}
        >

          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[300px] object-cover"
          />

          <div className="p-5">

            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-2xl font-bold mt-2">
              ৳{item.price}
            </p>

            <button
              className="w-full bg-black text-white py-3 rounded-lg mt-5 hover:bg-gray-800"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/chackout/${item.slug}`);
              }}
            >
              View Details
            </button>

          </div>

        </div>
      ))}

  </div>

</div>

    </section>
    
  );
};

export default ProductDetails;