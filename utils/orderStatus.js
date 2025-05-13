// Get all orders from localStorage
export const getOrders = () => {
  const orders = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('order_')) {
      const order = JSON.parse(localStorage.getItem(key));
      orders.push(order);
    }
  }
  return orders;
};

// Get completed orders history
export const getCompletedOrders = () => {
  const completedOrders = localStorage.getItem('completed_orders');
  return completedOrders ? JSON.parse(completedOrders) : [];
};

// Save orders to localStorage
const saveOrders = (orders) => {
  orders.forEach(order => {
    localStorage.setItem(`order_${order.kotNumber}`, JSON.stringify(order));
  });
};

// Save completed orders to history
const saveCompletedOrders = (orders) => {
  localStorage.setItem('completed_orders', JSON.stringify(orders));
};

// Add new order
export const addOrder = (orderData) => {
  const order = {
    ...orderData,
    status: 'received',
    statusHistory: [
      {
        status: 'received',
        timestamp: new Date().toISOString()
      }
    ]
  };
  localStorage.setItem(`order_${order.kotNumber}`, JSON.stringify(order));
  return order;
};

// Update order status
export const updateOrderStatus = (kotNumber, newStatus) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order => {
    if (order.kotNumber === kotNumber) {
      const updatedOrder = {
        ...order,
        status: newStatus,
        statusHistory: [
          ...(order.statusHistory || []),
          {
            status: newStatus,
            timestamp: new Date().toISOString()
          }
        ]
      };

      // If order is finished, add it to completed orders history
      if (newStatus === 'finished') {
        const completedOrders = getCompletedOrders();
        completedOrders.push({
          ...updatedOrder,
          completedAt: new Date().toISOString()
        });
        saveCompletedOrders(completedOrders);
      }

      return updatedOrder;
    }
    return order;
  });
  saveOrders(updatedOrders);
  return updatedOrders;
};

// Get order by KOT number
export const getOrderByKOT = (kotNumber) => {
  const orders = getOrders();
  return orders.find(order => order.kotNumber === kotNumber);
}; 