import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="px-4 py-12 bg-custom-color2  text-white font-poppins">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Privacy Policy</h1>

        <div className=" bg-custom-color1 shadow-lg rounded-lg p-6 md:p-10 space-y-6">
          <p>
            At <span className="font-semibold">MsTechHive </span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make a purchase from our website.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>We may collect personal information such as your name, email address, shipping address, phone number, and payment information when you place an order or subscribe to our newsletter.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders or inquiries</li>
              <li>To send promotional emails (only if you opt-in)</li>
              <li>To improve our website and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who help us operate our site, conduct our business, or serve you — as long as they agree to keep it confidential.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Security</h2>
            <p>We take security seriously and use industry-standard measures to protect your data. However, no method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Your Choices</h2>
            <p>You may choose to opt out of marketing emails or update your personal information at any time by contacting us at support@kartzilla.com.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with a new effective date.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p>If you have any questions or concerns regarding this policy, you can contact us at <a href="mailto:support@kartzilla.com" className="text-purple-600 hover:underline">support@kartzilla.com</a>.</p>
          </div>

          <p className="text-sm text-gray-500 text-right mt-4">Last updated: April 2025</p>
        </div>
      </div>
    </section>
  );
}
