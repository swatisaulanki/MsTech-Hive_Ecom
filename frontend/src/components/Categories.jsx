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
    <div className="font-poppins bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400 mb-14">
          Browse Our Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((category) => (
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              key={category.name}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Glass Card Content */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <span className="text-4xl mb-2 block">{category.icon}</span>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-wide">
                  {category.name}
                </h3>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-pink-500/60 rounded-2xl transition-all duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
