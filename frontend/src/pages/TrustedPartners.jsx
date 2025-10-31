import { motion } from "framer-motion";

const partners = [
  { name: "Partner 1", logo: "https://via.placeholder.com/120x60?text=Logo+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/120x60?text=Logo+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/120x60?text=Logo+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/120x60?text=Logo+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/120x60?text=Logo+5" },
  { name: "Partner 6", logo: "https://via.placeholder.com/120x60?text=Logo+6" },
];

export default function TrustedPartners() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Our Trusted Partners
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-10">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="p-4 bg-gray-50 rounded-2xl shadow hover:shadow-md transition duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-16 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
