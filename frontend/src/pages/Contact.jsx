import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen font-poppins  bg-custom-color2 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Form */}
          <div className="p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions, feedback, or concerns? We’d love to hear from you!
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message here..."
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-purple-600 text-white p-8 sm:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <div className="flex items-start gap-4 mb-4">
              <Mail className="w-6 h-6" />
              <div>
                <p className="font-medium">Email</p>
                <p>support@MsTechHive.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <Phone className="w-6 h-6" />
              <div>
                <p className="font-medium">Phone</p>
                <p>+91 98765 4321</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6" />
              <div>
                <p className="font-medium">Address</p>
                <p>Gondia Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
