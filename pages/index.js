import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Image from '../components/ui/image';
import { useRouter } from 'next/router';
import { generateKOTNumber } from '../utils/kotGenerator';
import { addOrder } from '../utils/orderStatus';
import { formatCurrency } from '../src/utils/formatCurrency';
import { getKitchenCode, validateKitchenCode } from '../src/utils/kitchenCode';

const menuItems = [
  { 
    id: 1, 
    name: 'Pork Fried Rice', 
    category: 'Fried Rice', 
    price: { full: 800, half: 450 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    name: 'Egg Fried Rice', 
    category: 'Fried Rice', 
    price: { full: 700, half: 400 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    name: 'Chicken Fried Rice', 
    category: 'Fried Rice', 
    price: { full: 800, half: 450 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    name: 'Beef Fried Rice', 
    category: 'Fried Rice', 
    price: { full: 850, half: 500 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 5, 
    name: 'Seafood Rice', 
    category: 'Fried Rice', 
    price: { full: 900, half: 500 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 6, 
    name: 'Egg Kottu', 
    category: 'Kottu', 
    price: { full: 700, half: 400 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 7, 
    name: 'Chicken Kottu', 
    category: 'Kottu', 
    price: { full: 800, half: 450 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 8, 
    name: 'Beef Kottu', 
    category: 'Kottu', 
    price: { full: 850, half: 500 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 9, 
    name: 'Pork Kottu', 
    category: 'Kottu', 
    price: { full: 800, half: 450 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 10, 
    name: 'Cheese Kottu', 
    category: 'Kottu', 
    price: { full: 750, half: 400 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  }
];

export default function WeerasiriHotel() {
  const [cart, setCart] = useState({});
  const router = useRouter();
  const [kitchenCode, setKitchenCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);

  useEffect(() => {
    getKitchenCode();
  }, []);

  const addToCart = (itemName, size, quantity) => {
    const key = `${itemName}-${size}`;
    setCart((prevCart) => ({
      ...prevCart,
      [key]: {
        quantity: (prevCart[key]?.quantity || 0) + quantity,
        size: size,
        price: menuItems.find(item => item.name === itemName).price[size]
      }
    }));
  };

  const removeFromCart = (key) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[key];
      return newCart;
    });
  };

  const cartItems = Object.entries(cart);

  const calculateTotal = () => {
    return cartItems.reduce((total, [_, item]) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleCodeChange = (e) => {
    const enteredCode = e.target.value;
    setKitchenCode(enteredCode);
    setIsCodeValid(validateKitchenCode(enteredCode));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart,
      total: calculateTotal(),
      kotNumber: generateKOTNumber(),
      timestamp: new Date().toISOString()
    };
    
    // Add order to the system
    const newOrder = addOrder(orderData);
    
    // Redirect to invoice page
    const queryString = encodeURIComponent(JSON.stringify(newOrder));
    router.push(`/invoice?orderData=${queryString}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Weerasiri Hotel and Bakery</h1>
            <button
              onClick={() => router.push('/staff-login')}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Staff Login
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Menu Items Section */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardContent>
                    <div className="relative w-full h-40 sm:h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                      />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
                    <div className="space-y-2 mt-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <label className="text-sm font-medium whitespace-nowrap">Size:</label>
                        <select 
                          id={`size-${item.id}`}
                          className="w-full sm:w-auto border rounded-md px-2 py-1 text-sm"
                          defaultValue="full"
                        >
                          <option value="full">Full (Rs. {item.price.full})</option>
                          <option value="half">Half (Rs. {item.price.half})</option>
                        </select>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <label className="text-sm font-medium whitespace-nowrap">Quantity:</label>
                        <select 
                          id={`quantity-${item.id}`}
                          className="w-full sm:w-auto border rounded-md px-2 py-1 text-sm"
                          defaultValue="1"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        const size = document.getElementById(`size-${item.id}`).value;
                        const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value);
                        addToCart(item.name, size, quantity);
                      }}
                      className="mt-4 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors py-2 sm:py-3 text-sm sm:text-base min-h-[44px]"
                    >
                      Add to Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Order</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
                    {cartItems.map(([key, item]) => {
                      const [name, size] = key.split('-');
                      return (
                        <div key={key} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-gray-500">{size} - {item.quantity}x</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                            <button
                              onClick={() => removeFromCart(key)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kitchen Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={kitchenCode}
                          onChange={handleCodeChange}
                          placeholder="Enter 5-digit code"
                          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={5}
                        />
                        <div className="flex items-center">
                          {isCodeValid ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-red-500">✗</span>
                          )}
                        </div>
                      </div>
                      {!isCodeValid && (
                        <p className="mt-1 text-sm text-red-500">
                          Please enter the correct kitchen code to place order
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold">{formatCurrency(calculateTotal())}</span>
                    </div>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={!isCodeValid || cart.length === 0}
                      className={`inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors py-3 text-base min-h-[44px] ${
                        (!isCodeValid || cart.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 