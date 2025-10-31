import React from "react";
import { Undo2, RefreshCw, ShieldCheck, Clock3 } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-custom-color2 font-poppins py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Return & Refund Policy</h1>
          <p className="text-gray-300 text-lg">
            Hassle-free returns to make your shopping experience smoother.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex items-start gap-4">
            <Undo2 className="w-10 h-10 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Easy Returns</h3>
              <p className="text-gray-600 mt-2">
                You can return most items within <strong>7 days</strong> of delivery. Items must be unused and in original packaging.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex items-start gap-4">
            <RefreshCw className="w-10 h-10 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Quick Exchange</h3>
              <p className="text-gray-600 mt-2">
                Want to exchange? Initiate a request and we’ll replace the item within a few days, depending on availability.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Refund Guarantee</h3>
              <p className="text-gray-600 mt-2">
                Eligible returns will be refunded within <strong>5–7 business days</strong> once the product is received and verified.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex items-start gap-4">
            <Clock3 className="w-10 h-10 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Fast Process</h3>
              <p className="text-gray-600 mt-2">
                Our return process is simple and takes less than 2 minutes to complete online.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md text-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Important Guidelines</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Return request must be initiated within 7 days of delivery.</li>
            <li>Products must be unused, unwashed, and with all tags intact.</li>
            <li>Some items like innerwear, beauty products, and perishables are non-returnable.</li>
            <li>Return pickup will be scheduled by our logistics partner.</li>
            <li>Refunds will be processed to your original payment method.</li>
          </ul>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          Need help? Email us at <span className="text-purple-700 font-medium">returns@MsTechHive.com</span>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
