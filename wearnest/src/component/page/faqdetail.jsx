import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "What is Wearnest?",
    answer:
      "Wearnest is the largest print-on-demand online platform in Bangladesh for fabrics. It is also a massive crowdsourcing platform which facilitates creative people turn their ideas into products and profits. We allow you to design custom products and buy it on the fly; or open a store in minutes with products (aka campaigns) as much as you wish, promote the store and its campaigns and generate sale without any cost or risk. As you ensure sales, we take care of the manufacturing, shipping, customer service, and everything else that goes into making sure your customers are happy.",
  },
  {
    question: "How do I create a new design in Wearnest?",
    answer:
      "Go the the “Create” page on the top menu bar of the website or follow (Wearnest.com/design). There you will find your preferred type of Tee ready to be designed with various designing options. You can write texts with various fonts and colors and outlines, or you can attach image from your own machine, or use our custom emojis. You can even search for various custom artworks and use them. Besides, there is a drawing tool by which you can draw any pattern or shape you prefer on your Tee",
  },
  {
    question: "What is a Campaign?",
    answer:
      "A campaign is a designed product you have created using our design tool in order to sell. Every item you create for selling purpose is named as “campaign”.",
  },
  {
    question: "How do I create a campaign?",
    answer:
      "When you have completed a design in our design page, click on the “Sell This” button in the bottom right corner of the page. There you will find the page where the campaign pricing needs to be set. This is the actual price buyers will be paying when they will purchase the product from your campaign. Remember, you will have to set the pricing between the lower and the higher limit set by Wearnest. You can also check your profit estimation simulation on the fly while setting your price. Once you have set your price, you proceed and give the campaign its title, description, category, primary tags and optional tags. All these information are very important for your campaign and will be very helpful later on when it comes to the searchability and visibility of your campaign among the buyers.",
  },
  {
    question:
      "I do not find any category or tags that goes with my design. What should I do?",
    answer:
      "We have provided a large variety of categories and primary tags for our designers to choose from while they decide to start on a campaign or publishing one. If it occurs that your campaign does not match any of the options provided in the system, you simply select the nearest match and proceed. You can also add your custom tags to make you campaign more descriptive and searchable. You can let us know about your desired categories (support@wearnest.com) and we will consider about adding your choice of categories later in the system.",
  },
  {
    question:
      "I do not want my design being saved by browser. What should I do?",
    answer:
      "Your work on the design page is being saved by the browser every 20 seconds to prevent you from any possible loss of data. If you do not wish this to happen, simply select the “Clear All” button at the floating toolbar above the design Tee frame. All your work will be cleared from the page permanently.",
  },
  {
    question:
      "My campaign price I set initially was too high. Can I change it later?",
    answer:
      "No. Once you set your campaign price, you cannot change it later. Although you can always assign promo codes to your campaigns which will deduct upto a certain percentage of its price if your customers apply the code. If you really think that the price of your product should be re-considered, then send an email to support@wearnest.com with referece to your product and new price.",
  },
];

const FaqDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-12">
      {/* Heading */}
      <h1 className="text-center text-[30px] font-light text-[#333]">
        Frequently Asked Questions
      </h1>

      <hr className="my-6 border-gray-300" />

      {/* FAQ */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center bg-[#f7f7f7] hover:bg-[#f1f1f1] px-4 py-3 text-left transition-all"
            >
              <span className="text-[16px] text-[#444]">
                {item.question}
              </span>

              {openIndex === index ? (
                <FiMinus className="text-2xl text-gray-600" />
              ) : (
                <FiPlus className="text-2xl text-gray-600" />
              )}
            </button>

            {/* Answer */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "max-h-96"
                  : "max-h-0"
              }`}
            >
              <div className="bg-white px-6 py-5 border-t text-[15px] leading-7 text-gray-600">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqDetail;