import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import { Typewriter } from "react-simple-typewriter";
import Faq from "../components/Faq";
import HappyUsersChart from "../components/HappyUsersChart";
import { motion } from "framer-motion";
import ProductDetails from "../components/ProductDetails";
import ShopNow from "./ShopNow";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="w-full bg-gray-900 font-poppins">
      {/* Offer Marquee */}
      <div className="bg-yellow-100 py-2">
        <marquee
          className="text-sm md:text-base font-semibold text-purple-800"
          behavior="scroll"
          direction="left"
          scrollamount="6"
        >
          🚨 Mega Sale! Up to 70% off on Electronics | 🛍️ Free Delivery on orders above ₹499 | 🎉 New Year Offer: Use code NEW50 to get ₹50 off!
        </marquee>
      </div>

      {/* Hero Banner */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-[#20002c] via-[#3929e9] to-[#8e2de2] overflow-hidden">
        {/* Glowing Circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl animate-ping z-0" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 opacity-20 rounded-full blur-2xl animate-pulse z-0" />

        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <motion.h1
            className="text-3xl md:text-7xl font-extrabold text-center leading-tight bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#fad0c4] text-transparent bg-clip-text drop-shadow-lg animate-bounce"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome To MsTechHive
          </motion.h1>

          <motion.h2
            className="text-xl md:text-3xl font-medium text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Typewriter
              words={["Shop Smart", "Deals You Love", "Fashion That Speaks"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <Link to="/shop">
              <button className=" bg-yellow-5 text-purple-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-purple-100 transition-all w-40 text-center">
                🛒 Shop Now
              </button>
            </Link>
            <a
              href="#categories"
              className=" bg-yellow-5 text-purple-900 font-bold px-6 py-3 rounded-lg shadow-md hover:bg-purple-100 transition-all w-40 text-center"
            >
              Explore More ↓
            </a>
          </motion.div>
        </div>
      </section>

  

      {/* Featured Products */}
      {/* <FeaturedProducts /> */}
        <ShopNow/>
      <section className=" bg-custom-color3 py-10 px-4 md:px-20">
  <h2 className="md:text-4xl  text-2xl font-bold text-center  text-white mb-8">Why Choose MsTechHive?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    <div>
      <div className="text-4xl text-blue-500 mb-2">🚚</div>
      <h3 className="font-semibold text-white text-xl">Fast & Free Shipping</h3>
      <p className="text-gray-300">Get your orders delivered quickly with no shipping charges.</p>
    </div>
    <div>
      <div className="text-4xl text-blue-500 mb-2">💳</div>
      <h3 className="font-semibold text-xl text-white">Secure Payments</h3>
      <p className="text-gray-300">Your transactions are encrypted and 100% secure.</p>
    </div>
    <div>
      <div className="text-4xl text-blue-500 mb-2">🔄</div>
      <h3 className="font-semibold  text-white text-xl">Easy Returns</h3>
      <p className="text-gray-300">Hassle-free returns within 7 days of delivery.</p>
    </div>
  </div>
</section>
    {/* Categories */}
      <section id="categories" className="py-12 px-4 bg-white">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8">
          Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Electronics", "Fashion", "Grocery", "Accessories"].map((cat, idx) => (
            <Link
              to={`/category/${cat.toLowerCase()}`}
              key={idx}
              className=" bg-slate-500 text-white rounded-lg p-6 text-center hover:shadow-xl transition duration-300 block"
            >
              <div className="text-3xl mb-2">📦</div>
              <p className="font-medium">{cat}</p>
            </Link>
          ))}
        </div>
      </section>
      {/* Happy Users Chart */}
      <HappyUsersChart />
      {/* // Testimonials Section */}
    

     <Testimonials/>

      {/* Newsletter */}
      <section className="py-12 px-4 bg-white font-poppins">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl text-black font-bold mb-4">
            Stay Updated
          </h2>
          <p className="mb-6 text-black">
            Get the latest offers in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded border border-gray-300 w-full sm:w-auto"
            />
            <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq />
    </div>
  );
};

export default Home;
