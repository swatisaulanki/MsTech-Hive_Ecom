import React from "react";
import { ScrollText, Lock, ShieldAlert, ShoppingCart, Users } from "lucide-react";

const terms = [
  {
    icon: <ScrollText className="w-8 h-8 text-purple-600" />,
    title: "Acceptance of Terms",
    description:
      "By accessing or using MsTechHive , you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using the platform.",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    title: "Eligibility",
    description:
      "To use MsTechHive  services, you must be at least 18 years old or have parental consent. You also agree to provide accurate information during registration.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-purple-600" />,
    title: "Product & Pricing",
    description:
      "All products listed are subject to availability and pricing may change without notice. MsTechHive reserves the right to cancel any order in case of pricing errors.",
  },
  {
    icon: <Lock className="w-8 h-8 text-purple-600" />,
    title: "User Accounts & Security",
    description:
      "You are responsible for maintaining the confidentiality of your account details. Any activity under your account will be considered your responsibility.",
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-purple-600" />,
    title: "Prohibited Activities",
    description:
      "Users are not allowed to misuse the platform, post misleading information, or violate any applicable laws while using MsTechHive .",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen  bg-custom-color2 font-poppins py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto  bg-custom-color1 rounded-2xl shadow-xl p-6 sm:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Terms & Conditions</h1>
          <p className="text-gray-200 text-lg">
            Please review the terms carefully before using our platform.
          </p>
        </div>

        <div className="space-y-6">
          {terms.map((term, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <div>{term.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{term.title}</h3>
                <p className="text-gray-600 mt-1">{term.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-gray-700 bg-purple-50 border-l-4 border-purple-600 p-5 rounded-xl">
          <p className="font-medium mb-1">Note:</p>
          <p className="text-sm">
            By continuing to use MsTechHive, you are agreeing to all the terms outlined above.
            We recommend checking this page regularly as updates may occur.
          </p>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          Last updated: April 2025 | For queries, email us at{" "}
          <span className="text-purple-700 font-medium">legal@MsTechHive.com</span>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
