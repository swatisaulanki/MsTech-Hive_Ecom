import React, { useState } from 'react';

const Faq= () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is MsTechHive?',
      answer: 'MsTechHive is an online shopping platform that offers a wide variety of products, from electronics to fashion, home decor, and more.',
    },
    {
      question: 'How do I place an order?',
      answer: 'To place an order, browse through our categories, add your desired items to the cart, and proceed to checkout.',
    },
    {
      question: 'Are there any ongoing offers?',
      answer: 'Yes! Check our Offers page for discounts, coupons, and the latest deals on various products.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Once your order is dispatched, you will receive a tracking link via email. You can also track it from the "My Orders" page.',
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of purchase. Please visit our Return & Refund page for more details.',
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close if clicked on the same question
    } else {
      setActiveIndex(index); // Open new FAQ
    }
  };

  return (
    <div className="bg-custom-color2 py-16  md:h-[680px] px-6 sm:px-12 font-poppins">
      <h2 className="text-2xl md:text-4xl font-semibold text-white text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-l hover:from-indigo-600 hover:to-purple-600 focus:outline-none transition duration-300"
            >
              {faq.question}
            </button>

            {activeIndex === index && (
              <div className="px-6 py-4 text-gray-600 font-poppins bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
