export function getOrdersForUser(email) {
  const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
  return allOrders.filter(order => order.userId === email);
}

export function deleteOrder(orderId) {
  let allOrders = JSON.parse(localStorage.getItem('orders')) || [];

  const updatedOrders = allOrders.filter(order => order.id !== orderId);

  localStorage.setItem('orders', JSON.stringify(updatedOrders));
}