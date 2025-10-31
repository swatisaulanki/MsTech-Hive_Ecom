import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is MsTechHive ?",
    answer:
      "MsTechHive  is a leading e-commerce platform offering a wide variety of products across multiple categories with fast delivery and secure payment options.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply browse products, add them to your cart, and proceed to checkout. Choose your delivery address and preferred payment method to complete the order.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you will receive a tracking ID via email and SMS. You can use it on our 'Track Order' page to check delivery status.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, UPI, net banking, COD (Cash on Delivery), and digital wallets like Paytm, PhonePe, and Google Pay.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, COD is available on selected products and for certain pin codes. You can check availability during checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for most items. Returned items must be unused and in original packaging. Check product pages for specific return eligibility.",
  },
  {
    question: "When will I get my refund?",
    answer:
      "Refunds are processed within 5-7 business days after we receive and verify the returned product.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before it is shipped. Once shipped, you can initiate a return after delivery.",
  },
  {
    question: "What if I receive a damaged product?",
    answer:
      "If your product is damaged or defective, please raise a return request within 48 hours of delivery along with a photo for quick resolution.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, Kartzilla only delivers within India. We are working on expanding our delivery reach soon.",
  },
  {
    question: "How can I change my delivery address?",
    answer:
      "You can change the delivery address during checkout. If you've already placed the order, contact our support team immediately.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via the 'Contact Us' page or email us at support@kartzilla.com. Our support team is available 9 AM to 9 PM IST.",
  },
  {
    question: "Are my payment details safe on Kartzilla?",
    answer:
      "Absolutely. Kartzilla uses industry-standard encryption and PCI-DSS compliant payment gateways to ensure your data is 100% secure.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Yes! Download the Kartzilla app from the Google Play Store or Apple App Store for the best shopping experience on the go.",
  },
  {
    question: "Can I create a wishlist?",
    answer:
      "Yes, you can add products to your wishlist by clicking the heart icon. You’ll need to be logged in to save your wishlist.",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  bg-custom-color2 p-4 sm:p-10">
      <div className="max-w-4xl mx-auto  bg-custom-color1 rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-purple-700">
          Frequently Asked Questions
        </h1>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-none">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <span className="text-lg font-medium  text-white font-poppins ">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform text-white duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4   text-gray-400 text-sm sm:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
