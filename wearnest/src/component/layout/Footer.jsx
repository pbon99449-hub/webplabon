import { useState } from "react";
import { Link } from "react-router-dom";
import flogo from '../../assets/flogo.png'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaPhoneAlt,
  FaCheck,
  FaFacebookMessenger,
} from "react-icons/fa";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "8801608574559";
  const messengerUrl = "https://www.messenger.com/";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleMessengerClick = () => {
    window.open(messengerUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <footer>

      {/* Main Footer */}
      <section className="bg-[#5b5b5b] text-white">

        <div className="max-w-[1400px] mx-auto px-15 py-8">

          <div className="grid grid-cols-3 gap-20">

            {/* Left */}
            <div>

              <div className="mb-6">
                <img
                  src={flogo}
                  alt="logo"
                  className="w-16"
                />
              </div>

              <ul className="space-y-2 text-[15px] text-gray-100">

                <li>
                  <Link
                    to="/about"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    About Wearnest
                  </Link>
                </li>

                <li>
                  <Link
                    to="/condition"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    Terms & Conditions
                  </Link>
                </li>

                <li className="hover:text-orange-400 cursor-pointer">
                  <Link
                    to="/privacy-policy"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li className="hover:text-orange-400 cursor-pointer">
                  <Link
                    to="/return"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    Cancellation & Return Policy
                  </Link>
                </li>

                <li className="hover:text-orange-400 cursor-pointer">
                  <Link
                    to="/faqdetail"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    FAQs
                  </Link>
                </li>

                <li className="hover:text-orange-400 cursor-pointer">
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 cursor-pointer"
                  >
                    Contact Us
                  </Link>
                </li>

              </ul>

            </div>

            {/* Middle */}
            <div>

              <div>

                <h3 className="uppercase flex items-center gap-3 text-[15px] font-semibold">

                  <FaEnvelope className="text-orange-400" />

                  GET SPECIAL DISCOUNTS IN YOUR INBOX

                </h3>

                <div className="flex mt-4">

                  <input
                    type="email"
                    placeholder="Enter email to get offers."
                    className="flex-1 bg-transparent border-b border-gray-300 pb-3 outline-none placeholder:text-gray-300 text-lg"
                  />

                  <button className="bg-[#F5B041] px-5 py-2 text-[17px] ml-3 hover:bg-orange-500 transition">

                    Subscribe

                  </button>

                </div>

              </div>

              <div className="mt-7">

                <h3 className="uppercase flex items-center gap-3 text-[15px] font-semibold">

                  <FaPhoneAlt className="text-orange-400" />

                  FOR ANY HELP YOU MAY CALL US AT

                </h3>

                <div className="mt-3 ml-8 text-gray-300 space-y-2">

                  <p className="text-[15px]">
                    +8809677666888
                  </p>

                  <p className="text-[15px]">
                    Customer Service
                  </p>

                  <p className="text-[15px]">
                    Track your order or get help returning an order
                  </p>

                </div>

              </div>

            </div>

            {/* Right */}
            <div>

              <h3 className="uppercase flex items-center gap-3 text-[15px] font-semibold">

                <FaCheck className="text-orange-400" />

                FOLLOW US

              </h3>

              <p className="mt-3 text-gray-200 text-[15px] leading-6">

                Stay updated on our latest arrivals,
                exclusive promotions and events.

              </p>

              {/* Icons */}

              <div className="flex gap-7 mt-8 text-[25px]">

                <FaInstagram className="cursor-pointer hover:text-orange-400" />

                <FaFacebookF className="cursor-pointer hover:text-orange-400" />

                <FaTwitter className="cursor-pointer hover:text-orange-400" />

                <FaTiktok className="cursor-pointer hover:text-orange-400" />

                <FaYoutube className="cursor-pointer hover:text-orange-400" />

              </div>

              {/* Facebook Card */}

              

            </div>

          </div>

        </div>

      </section>

      {/* Bottom */}

      <section className="bg-white">

        <div className="max-w-[1500px] mx-auto py-2 text-center">

          <p className="text-[20px]">

            Your order is handled daily with a lot of ❤️ and delivered worldwide!

          </p>

          <p className="text-gray-400 text-[15px] mt-2">

            Copyright © 2018 WearNest Limited. All Right Reserved

          </p>

        </div>

      </section>

      {/* Contact Menu */}

      <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end gap-3">
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
          }`}
        >
          <button
            type="button"
            onClick={handleWhatsAppClick}
            aria-label="Open WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white text-2xl shadow-xl transition hover:scale-110"
          >
            <FaWhatsapp />
          </button>

          <button
            type="button"
            onClick={handleMessengerClick}
            aria-label="Open Messenger"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0084FF] text-white text-2xl shadow-xl transition hover:scale-110"
          >
            <FaFacebookMessenger />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E88E5] text-white text-3xl shadow-2xl transition hover:scale-110"
        >
          <IoChatbubbleEllipsesOutline className={isOpen ? "rotate-45 transition-transform duration-300" : "transition-transform duration-300"} />
        </button>
      </div>

    </footer>
  );
};

export default Footer;