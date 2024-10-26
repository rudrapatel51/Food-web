import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, ChevronDown, Eye, Package } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [updateStatusOpen, setUpdateStatusOpen] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/admin/orders?page=${page}&status=${status}`
      );
      const data = await response.json();
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdateLoading(orderId);
      await fetch(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          note: `Status updated to ${newStatus} by admin`
        })
      });
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdateLoading(null);
      setUpdateStatusOpen(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (orderStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[orderStatus] || '';
  };

  const OrderItems = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {item.img ? (
                    <img 
                      src="/api/placeholder/100/100"
                      alt={item.name || 'Order item'} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">
                        {item.name || `Order Item ${index + 1}`}
                      </h4>
                      {item.price && (
                        <p className="text-gray-600">
                          Unit Price: ₹{item.price}
                        </p>
                      )}
                      {item.quantity && (
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      )}
                    </div>
                    {item.totalPrice && (
                      <div className="text-right">
                        <p className="font-medium text-lg">₹{item.totalPrice}</p>
                      </div>
                    )}
                  </div>
                  {item._id && (
                    <p className="text-sm text-gray-500 mt-2">
                      Item ID: {item._id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end border-t pt-4">
          <div className="text-right">
            <p className="text-gray-600">Total Items: {items.length}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-row items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Order Management</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex items-center justify-between w-40 px-3 py-2 text-sm bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{statusOptions.find(opt => opt.value === status)?.label || 'Filter by status'}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {isStatusOpen && (
                <div className="absolute z-10 w-40 mt-1 bg-white border rounded-md shadow-lg">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                      onClick={() => {
                        setStatus(option.value);
                        setPage(1);
                        setIsStatusOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={fetchOrders}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{order._id}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{order.customerName}</span>
                          <span className="text-sm text-gray-500">{order.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">{formatDate(order.orderDate)}</td>
                      <td className="p-4">₹{order.totalAmount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() => setUpdateStatusOpen(updateStatusOpen === order._id ? null : order._id)}
                              disabled={updateLoading === order._id}
                              className="flex items-center justify-between w-32 px-3 py-2 text-sm bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                              <span>Update status</span>
                              <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                            {updateStatusOpen === order._id && (
                              <div className="absolute z-10 w-32 mt-1 bg-white border rounded-md shadow-lg">
                                {statusOptions.filter(opt => opt.value).map((option) => (
                                  <button
                                    key={option.value}
                                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                    onClick={() => updateOrderStatus(order._id, option.value)}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Delivery Address</h3>
                              <p className="text-gray-600">{order.address}</p>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Order Items</h3>
                              <OrderItems items={order.items} />
                            </div>
                            {order.updateHistory && order.updateHistory.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Status History</h3>
                                <div className="space-y-2">
                                  {order.updateHistory.map((update, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                                      <div>
                                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(update.status)}`}>
                                          {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-1">{update.note}</p>
                                      </div>
                                      <p className="text-sm text-gray-500">
                                        {formatDate(update.date)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;