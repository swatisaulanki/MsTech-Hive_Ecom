import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-g8Wh6XyXqoPb710U7j2vcyH-2RdtKgOeQ&s", icon: "🔌" },
  { name: "Clothing", image: "https://cdn.pixabay.com/photo/2014/08/26/21/49/shirts-428627_640.jpg", icon: "👗" },
  { name: "Home Appliances", image: "https://media.istockphoto.com/id/1393448300/photo/close-up-view-of-a-man-adjusting-his-home-air-conditioner-with-a-smart-phone-app.jpg?s=612x612&w=0&k=20&c=cHYYW5UcRIt-ogRp6iBMMxUPzWM-5vprlsFar2IixCY=", icon: "🧑‍🍳" },
  { name: "Books", image: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop", icon: "📚" },
  { name: "Toys", image: "https://i.ytimg.com/vi/nYFK4YJMNx0/maxresdefault.jpg", icon: "🧸" },
  { name: "Beauty", image: "https://d1iuscsovtvj4y.cloudfront.net/__sized__/uicomponents/mobile/Love-Beauty-and-planet-mobile-homepage-March-20250312-thumbnail-900x530-70.jpg", icon: "💄" },
];

const Categories = () => {
  return (
    <div className="font-poppins relative bg-gradient-to-br from-[#0e001f] via-[#1a002f] to-[#0b0018] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.15),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-purple-300 via-pink-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(236,72,153,0.4)]">
          Explore by Category
        </h2>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {categories.map((category, i) => (
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(236,72,153,0.3)] transition-all duration-700"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-72 object-cover rounded-3xl transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Glass Info Box */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/10 backdrop-blur-lg rounded-2xl py-5 px-4 text-center border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-white/15 transition-all duration-500">
                <span className="text-5xl block mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  {category.icon}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-wide group-hover:text-pink-400 transition-colors duration-500">
                  {category.name}
                </h3>
              </div>

              {/* Border Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-pink-500/60 transition-all duration-700"></div>

              {/* Subtle Light Reflection */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/20 to-transparent rounded-3xl transition-all duration-700 mix-blend-overlay"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
