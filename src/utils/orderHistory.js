// Utility functions for order history and analytics

// Get all completed orders from history
export const getAllOrders = () => {
  const completedOrders = localStorage.getItem('completed_orders');
  return completedOrders ? JSON.parse(completedOrders) : [];
};

// Get orders for a specific date
export const getOrdersByDate = (date) => {
  const orders = getAllOrders();
  return orders.filter(order => {
    const orderDate = new Date(order.completedAt);
    return orderDate.toDateString() === date.toDateString();
  });
};

// Get orders for a date range
export const getOrdersByDateRange = (startDate, endDate) => {
  const orders = getAllOrders();
  return orders.filter(order => {
    const orderDate = new Date(order.completedAt);
    return orderDate >= startDate && orderDate <= endDate;
  });
};

// Get total sales for a date range
export const getTotalSales = (orders) => {
  return orders.reduce((total, order) => total + order.total, 0);
};

// Get item sales for a date range
export const getItemSales = (orders) => {
  const itemSales = {};
  
  orders.forEach(order => {
    Object.entries(order.items).forEach(([key, item]) => {
      const [name, size] = key.split('-');
      const itemKey = `${name} (${size})`;
      if (!itemSales[itemKey]) {
        itemSales[itemKey] = {
          quantity: 0,
          revenue: 0
        };
      }
      itemSales[itemKey].quantity += item.quantity;
      itemSales[itemKey].revenue += item.price * item.quantity;
    });
  });

  return itemSales;
};

// Get sales by hour for a date range
export const getSalesByHour = (orders) => {
  const salesByHour = Array(24).fill(0);
  
  orders.forEach(order => {
    const hour = new Date(order.completedAt).getHours();
    salesByHour[hour] += order.total;
  });

  return salesByHour;
};

// Get sales by day for a date range
export const getSalesByDay = (orders) => {
  const salesByDay = {};
  
  orders.forEach(order => {
    const date = new Date(order.completedAt).toDateString();
    if (!salesByDay[date]) {
      salesByDay[date] = 0;
    }
    salesByDay[date] += order.total;
  });

  return salesByDay;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  }).format(amount);
}; 