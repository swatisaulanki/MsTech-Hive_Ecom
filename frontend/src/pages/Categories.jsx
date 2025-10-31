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
    <div className=" font-poppins bg-custom-color2 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-white mb-12">Browse Our Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link to={`/category/${category.name.toLowerCase()}`} key={category.name}>
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
                  <span className="text-4xl mb-4">{category.icon}</span>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
