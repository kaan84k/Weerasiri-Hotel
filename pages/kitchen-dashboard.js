import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOrders, updateOrderStatus } from '../utils/orderStatus';
import { getKitchenCode } from '../src/utils/kitchenCode';

export default function KitchenDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [todayCode, setTodayCode] = useState('');

  useEffect(() => {
    // Load orders from localStorage
    const loadedOrders = getOrders();
    setOrders(loadedOrders);

    // Get today's kitchen code
    setTodayCode(getKitchenCode());

    // Set up interval to check for new orders
    const interval = setInterval(() => {
      const currentOrders = getOrders();
      setOrders(currentOrders);
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = (kotNumber, newStatus) => {
    const updatedOrders = updateOrderStatus(kotNumber, newStatus);
    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-yellow-100 text-yellow-800';
      case 'cooking': return 'bg-blue-100 text-blue-800';
      case 'finished': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white';
    }
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' ? true : order.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Kitchen Dashboard</h1>
              <div className="bg-blue-50 p-3 rounded-lg inline-block">
                <p className="text-sm text-gray-600">Today's Kitchen Code:</p>
                <p className="text-xl font-mono font-bold text-blue-600">{todayCode}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-0">
              <button
                onClick={() => router.push('/history')}
                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View History
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full sm:w-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {['received', 'cooking', 'finished', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-lg capitalize text-sm sm:text-base ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredOrders.map((order) => (
            <div key={order.kotNumber} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{order.kotNumber}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {Object.entries(order.items).map(([key, item]) => {
                  const [name, size] = key.split('-');
                  return (
                    <div key={key} className="flex justify-between text-xs sm:text-sm">
                      <span>{item.quantity}x {name} ({size})</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {order.status === 'received' && (
                  <button
                    onClick={() => handleStatusUpdate(order.kotNumber, 'cooking')}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    Start Cooking
                  </button>
                )}
                {order.status === 'cooking' && (
                  <button
                    onClick={() => handleStatusUpdate(order.kotNumber, 'finished')}
                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                  >
                    Mark as Finished
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 