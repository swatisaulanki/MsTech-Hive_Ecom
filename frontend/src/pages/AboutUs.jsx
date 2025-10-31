import React from "react";

const AboutUs = () => {
  return (
    <section className="px-4 py-12  bg-custom-color2 text-gray-100 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About MsTechHive </h1>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
              alt="Our Team"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              MsTechHive  is a modern e-commerce platform designed to deliver the best online shopping experience. From fashion to electronics, we provide a wide range of high-quality products at unbeatable prices.
            </p>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Built with a passion for technology and customer satisfaction, MsTechHive  is more than just a store — it’s a community. We value trust, quality, and convenience.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our mission is simple: to bring joy to your doorstep through seamless shopping and reliable service.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-gray-700">We prioritize your happiness and satisfaction above all.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-gray-700">Only top-quality products make it to our catalog.</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-700">We ensure quick and secure delivery, every time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
