import React from "react";

const Return = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-5 py-12 text-[#444]">
      {/* Title */}
      <h1 className="text-5xl font-light text-center mb-5">
        Return & Replacement Policy
      </h1>

      <hr className="border-gray-300 mb-8" />

      {/* Paragraph */}
      <div className="space-y-6 text-[18px] leading-9">
        <p>
          It's a rare case for Fabrilife where customers didn't get their products unharmed. But sometimes we may fail to fulfill your expectations, sometimes situations aren't by our side. But there is now a bond of trust between customers and Fabrilife, So, for further ensuring and encouraging this bond of trust Fabrilife.com brings you option to return the products you got (If the product is damaged or designed mistakenly.). In that case Fabrilife will give you fresh products in return.
        </p>

        <p>
         If for any reason you are unsatisfied with your order, you may return it as long as your item meets the following criteria:
        </p>

        {/* List */}
        <ul className="list-disc pl-8 space-y-2">
          <li>It is within 07 Days from the delivery date.</li>
          <li>All items to be returned or exchanged must be unused and in their original condition with all original tags and packaging intact and should not be broken or tampered with.</li>
          <li>If the item came with a free promotional item, the free item must also be returned.</li>
          <li>Refund/ replacement for products are subject to inspection and checking by Fabrilife team.</li>
          <li>Replacement is subject to availability of stock with the Supplier. If the product is out of stock, you will receive a full refund, no questions asked.</li>
          <li>Please note that the Cash on Delivery convenience charge and the shipping charge would not be included in the refund value of your order as these are non-refundable charges.</li>
        </ul>
      </div>

      {/* Section 2 */}
      <div className="mt-16">
        <h2 className="text-5xl font-light text-center mb-5">
          Reasons for returns & replacement
        </h2>

        <hr className="border-gray-300 mb-8" />

        <ul className="list-disc pl-8 text-[18px] leading-9 space-y-2">
          <li>Product is damaged, defective or not as described.</li>
          <li>Size Mismatch for clothing.(Please be noted that, this policy will only be activated if we send you the clothings which mismatch the size mentioned in the invoice. If invoice and delivered item's size matches, we will not reconsider refund at any cost.)</li>
          <li>Color Mismatch for clothing.</li>
          <li>Wrongly Printed clothing.(Front/Back desgin mismatch, wrong design, wrong placement of design)</li>
          <li>Wrong product sent.</li>
        </ul>

        <div className="mt-10 space-y-6 text-[18px] leading-9">
          <p className="font-medium">How to return:</p>

          <p>
            Call our hotline +8809677666888, email support@fabrilife.com, or message us on our Facebook page within 07 days after receiving your order.
          </p>

          <p>
           Once we pick up or receive your return, we will do a quality check of the product at our end and if the reason for return is valid, we will replace the product with a new one or we will proceed with the refund.
          </p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-16">
        <h2 className="text-5xl font-light text-center mb-5">
          Refund Policy
        </h2>

        <hr className="border-gray-300 mb-8" />

        <ul className="list-disc pl-8 text-[18px] leading-9 space-y-2">
          <li>The refund will be processed after we have completed evaluating your return.</li>
          <li>Replacement is subject to availability of stock with the Supplier. If the product is out of stock, you will receive a full refund, no questions asked.</li>
          <li>Please note that the Cash on Delivery convenience charge and the shipping charge would not be included in the refund value of your order as these are non-refundable charges.</li>
          <li>If you have selected Cash on Delivery (COD), there is no amount to refund because you haven't paid for your order.</li>
          <li>For payments made using a Credit Card, Debit Card, Mobile Banking or Bank Transfer, you will receive a refund in your respective.</li>
          <li>If online payment is made once more due to technical error, payment refund will be made.</li>
          <li>You will receive a refund anytime between 7-10 working days. If you don't receive refund within this time, please write to us at support@fabrilife.com and we shall investigate.</li>
        </ul>
      </div>
    </section>
  );
};

export default Return;