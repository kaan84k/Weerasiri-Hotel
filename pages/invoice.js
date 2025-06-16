import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from '../components/ui/image';
import html2canvas from 'html2canvas';
import { getOrderByKOT } from '../utils/orderStatus';
import { formatCurrency } from '../src/utils/formatCurrency';

const OrderStatus = ({ currentStatus }) => {
  const statuses = [
    { id: 'received', label: 'Received', icon: '📝' },
    { id: 'cooking', label: 'Cooking', icon: '👨‍🍳' },
    { id: 'finished', label: 'Finished', icon: '✅' }
  ];

  return (
    <div className="flex justify-between items-center max-w-2xl mx-auto my-8">
      {statuses.map((status, index) => {
        const isActive = status.id === currentStatus;
        const isPast = statuses.findIndex(s => s.id === currentStatus) >= index;

        return (
          <div key={status.id} className="flex flex-col items-center">
            <div
              className={
                `w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 ${
                  isActive
                    ? 'bg-green-500 text-white ring-4 ring-green-200'
                    : isPast
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                }`
              }
            >
              {status.icon}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function Invoice() {
  const router = useRouter();
  const { orderData } = router.query;
  const invoiceRef = useRef(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderData) {
      const parsedOrder = JSON.parse(decodeURIComponent(orderData));
      setOrder(parsedOrder);
    }
  }, [orderData]);

  useEffect(() => {
    if (order?.kotNumber) {
      const interval = setInterval(() => {
        const updatedOrder = getOrderByKOT(order.kotNumber);
        if (updatedOrder && updatedOrder.status !== order.status) {
          setOrder(updatedOrder);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [order?.kotNumber, order?.status]);

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${order.kotNumber}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const calculateTotal = () => {
    if (!order?.items) return 0;
    return Object.entries(order.items).reduce((total, [_, item]) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-4">Please place an order first.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div ref={invoiceRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Weerasiri Hotel and Bakery</h1>
            <p className="text-gray-600 mt-2">Order Invoice</p>
          </div>

          <OrderStatus currentStatus={order.status} />

          <div className="mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
              <div>
                <p className="text-sm sm:text-base text-gray-600">KOT Number</p>
                <p className="text-lg sm:text-xl font-semibold">{order.kotNumber}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-sm sm:text-base text-gray-600">Order Time</p>
                <p className="text-lg sm:text-xl font-semibold">
                  {new Date(order.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="border-t border-b py-4 sm:py-6">
              <div className="space-y-3">
                {Object.entries(order.items).map(([key, item]) => {
                  const [name, size] = key.split('-');
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm sm:text-base font-medium">{name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm sm:text-base font-medium">
                          {item.quantity} x {formatCurrency(item.price)}
                        </p>
                        <p className="text-sm sm:text-base font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="flex justify-between items-center">
                <p className="text-lg sm:text-xl font-semibold">Total</p>
                <p className="text-lg sm:text-xl font-bold">
                  {formatCurrency(calculateTotal())}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadInvoice}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              Download Invoice
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
