import React from 'react';

const Orders = () => {
  const orders = [
    {
      orderId: 'ORD12345',
      date: '2025-04-18',
      status: 'Shipped',
      total: '$120.00',
      items: 3,
    },
    {
      orderId: 'ORD12346',
      date: '2025-04-16',
      status: 'Delivered',
      total: '$250.00',
      items: 5,
    },
    {
      orderId: 'ORD12347',
      date: '2025-04-10',
      status: 'Pending',
      total: '$80.00',
      items: 2,
    },
    {
      orderId: 'ORD12348',
      date: '2025-04-05',
      status: 'Shipped',
      total: '$150.00',
      items: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-custom-color2 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Your Orders</h2>

      {/* Order Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">{order.orderId}</h3>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full 
                ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-500' : 
                  order.status === 'Delivered' ? 'bg-green-100 text-green-500' : 
                  'bg-yellow-100 text-yellow-500'}`}
              >
                {order.status}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <p className="text-sm text-gray-600">Total: <span className="font-semibold text-gray-800">{order.total}</span></p>
              <p className="text-sm text-gray-600">Items: {order.items}</p>
            </div>
            <div className="mt-6 text-right">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
