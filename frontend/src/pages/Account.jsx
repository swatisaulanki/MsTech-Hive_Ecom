import React, { useState, useEffect } from 'react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-custom-color2 flex flex-col md:flex-row font-poppins">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-lg mb-8 md:mb-0 md:h-full">
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-200"
          />
          <h3 className="mt-4 text-xl font-bold">My Account</h3>
          <p className="text-sm text-gray-500">user@example.com</p>
        </div>
        <nav>
          <ul className="space-y-4 text-lg font-medium">
            {['profile', 'orders', 'logout'].map(tab => (
              <li key={tab}>
                <button
                  onClick={() => tab !== 'logout' ? setActiveTab(tab) : alert('Logout functionality')}
                  className={`w-full text-left capitalize px-2 py-1 rounded transition 
                    ${activeTab === tab ? 'text-blue-600 bg-blue-50 font-semibold' : 'hover:text-blue-500'}`}
                >
                  {tab === 'profile' ? 'Dashboard' : tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-8 p-6">
        {activeTab === 'profile' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard label="Orders" count={orders.length} color="blue" />
              <StatCard label="Wishlist" count={0} color="pink" />
              <StatCard label="Reviews" count={0} color="green" />
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 text-sm text-gray-600">
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Total:</strong> ₹{order.total.toLocaleString()}</p>
                      <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Processing</span></p>
                      <p><strong>Est. Delivery:</strong> {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                      <p><strong>Address:</strong> {`${order.address.name}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                          <div className="flex-grow">
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right text-green-600 font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-${color}-400`}>
    <h4 className="text-xl font-medium text-gray-600">{label}</h4>
    <p className={`text-3xl font-bold text-${color}-500`}>{count}</p>
  </div>
);

export default Account;
