import React from "react";
import { motion } from "framer-motion";
import { BsStarFill } from "react-icons/bs";


const testimonials = [
  {
    id: 1,
    name: "Swetha",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
    quote:
      "MsTechHive provided an excellent experience. The checkout was easy, and the product was amazing!",
    rating: 5,
    accent: "from-teal-400 to-teal-900",
  },
  {
    id: 2,
    name: "Krush",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1545996124-1b5f9a1d6f39?w=400&q=80&auto=format&fit=crop",
    quote:
      "Fantastic service! Everything arrived as promised, and the customer support is second to none.",
    rating: 5,
    accent: "from-purple-600 to-purple-800",
  },
  {
    id: 3,
    name: "shiva",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80&auto=format&fit=crop",
    quote:
      "Quick delivery, amazing quality. MsTechHive made online shopping so easy and fun!",
    rating: 5,
    accent: "from-yellow-400 to-yellow-600",
  },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex items-center justify-center mt-3">
    {Array.from({ length: count }).map((_, i) => (
      <BsStarFill key={i} className="w-5 h-5 text-yellow-400 mx-0.5" aria-hidden="true" />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section className="testimonials bg-gradient-to-r from-blue-800 to-blue-600 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-blue-100/90 max-w-2xl mx-auto mt-4">
            Real feedback from real shoppers — we ship fast, support great products, and love making
            customers happy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              aria-label={`Testimonial from ${t.name}`}>

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${t.accent} opacity-30 blur-sm transform -skew-y-2`}
                aria-hidden="true"
              ></div>

              {/* Card content */}
              <div className="relative bg-white/95 p-8 md:p-10 rounded-2xl z-10 min-h-[320px] flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="-mt-20 w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl">
                  <img
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 text-lg md:text-xl italic mt-6 mb-4">
                  “{t.quote}”
                </blockquote>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>

                <StarRow count={t.rating} />

                {/* Accent badge */}
                <div className="mt-4">
                  <span className="inline-block bg-gradient-to-r from-white/40 to-white/10 px-3 py-1 rounded-full text-sm font-medium text-gray-800/90 backdrop-blur-sm">
                    Top Rated
                  </span>
                </div>

                {/* Decorative bottom wave */}
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  viewBox="0 0 1440 120"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true">
                  <path
                    d="M0,40 C120,80 360,0 720,40 C1080,80 1320,0 1440,40 L1440 120 L0 120 Z"
                    fill="rgba(59,130,246,0.04)"
                  />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-xl mx-auto mt-12 text-center">
          <p className="text-blue-50/90">Love what you see? Join thousands of happy customers.</p>
          <button className="mt-6 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
