import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, ChevronDown, Eye, Package, Calendar, User, DollarSign, Clock, Filter } from 'lucide-react';
import API from '../../api/api';

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
    { value: '', label: 'All Status', icon: Filter },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'processing', label: 'Processing', icon: RefreshCw },
    { value: 'shipped', label: 'Shipped', icon: Package },
    { value: 'delivered', label: 'Delivered', icon: ChevronRight },
    { value: 'cancelled', label: 'Cancelled', icon: ChevronDown }
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/admin/orders`, {
        params: { page, status },
      });
      const { orders, totalPages } = response.data;
      setOrders(orders);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdateLoading(orderId);
      await API.put(`/admin/orders/${orderId}/status`, {
        status: newStatus,
        note: `Status updated to ${newStatus} by admin`,
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
      pending: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
      processing: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
      shipped: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
      delivered: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
      cancelled: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
    };
    return styles[orderStatus] || '';
  };

  const OrderItems = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  {item.img ? (
                    <img 
                      src={item.img}
                      alt={item.name || 'Order item'} 
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        {item.name || `Order Item ${index + 1}`}
                      </h4>
                      <div className="mt-2 space-y-1">
                        {item.price && (
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>₹{item.price}</span>
                          </div>
                        )}
                        {item.quantity && (
                          <div className="flex items-center text-gray-600">
                            <Package className="w-4 h-4 mr-1" />
                            <span>Qty: {item.quantity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {item.totalPrice && (
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">₹{item.totalPrice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pt-20">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order Management</h1>
              <p className="text-blue-100 mt-1">Track and manage all your orders in one place</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="flex items-center justify-between w-44 px-4 py-2 text-sm bg-white text-blue-900 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                >
                 <div className="flex items-center gap-2">
  {(() => {
    const selectedStatus = statusOptions.find(opt => opt.value === status);
    if (selectedStatus) {
      return (
        <>
          {selectedStatus.icon && <selectedStatus.icon className="w-4 h-4" />}
          <span>{selectedStatus.label}</span>
        </>
      );
    }
    return <span>Filter by status</span>;
  })()}
</div>

                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {isStatusOpen && (
                  <div className="absolute z-10 w-44 mt-2 bg-white rounded-lg shadow-xl border border-gray-100">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => {
                          setStatus(option.value);
                          setPage(1);
                          setIsStatusOpen(false);
                        }}
                      >
                        <option.icon className="w-4 h-4 mr-2" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={fetchOrders}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-gray-600 font-semibold">Order ID</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Customer</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Date</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Amount</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Status</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-4 font-medium text-gray-900">{order._id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{order.customerName}</span>
                            <span className="text-sm text-gray-500">{order.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.orderDate)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 font-medium text-gray-900">
                          <DollarSign className="w-4 h-4" />
                          {order.totalAmount}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() => setUpdateStatusOpen(updateStatusOpen === order._id ? null : order._id)}
                              disabled={updateLoading === order._id}
                              className="flex items-center justify-between min-w-[140px] px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                            >
                              <span>Update status</span>
                              <ChevronDown className="w-4 h-4 ml-2" />
                            </button>
                            {updateStatusOpen === order._id && (
                              <div className="absolute z-10 w-[140px] mt-2 bg-white rounded-lg shadow-xl border border-gray-100">
                                {statusOptions.filter(opt => opt.value).map((option) => (
                                  <button
                                    key={option.value}
                                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                    onClick={() => updateOrderStatus(order._id, option.value)}
                                  >
                                    <option.icon className="w-4 h-4 mr-2" />
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="6" className="p-6 bg-gray-50">
                          <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                              <h3 className="text-lg font-semibold mb-4 text-gray-900">Delivery Address</h3>
                              <p className="text-gray-600">{order.address}</p>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Items</h3>
                              <OrderItems items={order.items} />
                            </div>
                            {order.updateHistory && order.updateHistory.length > 0 && (
                              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">Status History</h3>
                                <div className="space-y-4">
                                  {order.updateHistory.map((update, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="space-y-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(update.status)}`}>
                                          {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                                        </span>
                                        <p className="text-sm text-gray-600">{update.note}</p>
                                      </div>
                                      <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {formatDate(update.date)}
                                      </div>
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
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <Package className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No orders found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or refresh the page</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="px-3 py-1 bg-white rounded-lg border border-gray-200">
                Page {page} of {totalPages}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;