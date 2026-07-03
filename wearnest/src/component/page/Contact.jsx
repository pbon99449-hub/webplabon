import React from "react";

const Contact = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-5 py-12">
      <div className="grid lg:grid-cols-12 gap-12">

        {/* Left Side */}
        <div className="lg:col-span-7">

          {/* Name */}
          <div className="mb-6">
            <label className="block text-[16px] text-[#333] mb-2">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[50px] border border-gray-300 rounded-md px-5 text-[20px] outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-[16px] text-[#333] mb-2">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] border border-gray-300 rounded-md px-5 text-[20px] outline-none focus:border-blue-500"
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-[16px] text-[#333] mb-2">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full h-[50px] border border-gray-300 rounded-md px-5 text-[20px] outline-none focus:border-blue-500"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-[16px] text-[#333] mb-2">
              Message:
            </label>

            <textarea
              rows={8}
              placeholder="Message"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-[20px] resize-none outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {/* Fake Recaptcha */}
         

          {/* Button */}
          <button className="bg-[#0d6efd] hover:bg-[#0b5ed7] transition text-white text-[22px] px-10 py-3 rounded">
            Send
          </button>

        </div>

        {/* Right Side */}
        <div className="lg:col-span-5">

          <h2 className="text-[25px] font-normal text-[#333] mb-4">
            Contact Information
          </h2>

          <div className="space-y-8 text-[20px] leading-10 text-[#444]">

            <div>
              <h3 className="font-bold text-[18px]">Address:</h3>

              <p className="text-[16px] leading-7" >
                Wearnest,
                <br />
                Level 9, Rupayan Latifa Shamsuddin Square
                <br />
                (Opposite of Sony Square)
                <br />
                Plot 3, Road 1, Section 1,
                <br />
                Mirpur, Dhaka-1216,
                <br />
                Bangladesh
              </p>
            </div>

            <div>
              <span className="font-bold text-[18px]">Hotline:</span>{" "}
              +8801XXXXXXXXX
            </div>

            <div>
              <span className="font-bold text-[18px]">Email:</span>{" "}
              info@wearnest.com
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;