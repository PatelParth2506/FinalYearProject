import React, { useEffect, useState } from "react";
import RightSideNavigation from "./RightSideNavigation";
import axios from "axios";

const STATUS_OPTIONS = ["Pending", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/product/getOrder", {
          withCredentials: true,
        });
        console.log(res.data.data);
        setOrders(res.data.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
      <RightSideNavigation />
      <div className="w-full px-4 py-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Order Management
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xl font-medium text-gray-700">
                      {order.products[0]?.productid?.description?.substring(0, 20) || "No description"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Buyer: {order.buyer.username}
                    </p>
                    <img
                      src={order.buyer.profilePhoto}
                      alt={order.buyer.username}
                      className="w-10 h-10 rounded-full mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-gray-700 font-semibold">
                      ₹{order.products[0]?.productid?.price || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {order.products[0]?.quantity || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mr-2">
                      Status:
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-400 rounded px-3 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {order.status === "Delivered" ? (
                      <span className="text-green-600 font-semibold">
                        ✓ Delivered
                      </span>
                    ) : order.status === "Cancelled" ? (
                      <span className="text-red-600 font-semibold">
                        ✗ Cancelled
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        ⏳ {order.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
