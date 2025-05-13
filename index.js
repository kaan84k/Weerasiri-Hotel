import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const menuItems = [
  { id: 1, name: 'Pork Fried Rice', category: 'Fried Rice' },
  { id: 2, name: 'Egg Fried Rice', category: 'Fried Rice' },
  { id: 3, name: 'Chicken Fried Rice', category: 'Fried Rice' },
  { id: 4, name: 'Beef Fried Rice', category: 'Fried Rice' },
  { id: 5, name: 'Seafood Rice', category: 'Fried Rice' },
  { id: 6, name: 'Egg Kottu', category: 'Kottu' },
  { id: 7, name: 'Chicken Kottu', category: 'Kottu' },
  { id: 8, name: 'Beef Kottu', category: 'Kottu' },
  { id: 9, name: 'Pork Kottu', category: 'Kottu' },
  { id: 10, name: 'Cheese Kottu', category: 'Kottu' }
];

export default function WerraririHotel() {
  const [cart, setCart] = useState({});

  const addToCart = (itemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: (prevCart[itemName] || 0) + 1
    }));
  };

  const cartItems = Object.entries(cart); // [ [name, qty], ... ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Werrariri Hotel and Bakery</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <Button
                onClick={() => addToCart(item.name)}
                className="mt-4 w-full bg-blue-500 text-white rounded-lg"
              >
                Add to Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {cartItems.map(([name, qty]) => (
              <li key={name}>
                {name} x {qty}
              </li>
            ))}
          </ul>
        )}
        <Button className="mt-4 w-full bg-green-500 text-white rounded-lg">
          Place Your Order
        </Button>
      </div>
    </div>
  );
}
