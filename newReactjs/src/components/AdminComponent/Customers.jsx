import React, { useEffect, useState } from "react";
import RightSideNavigation from "./RightSideNavigation";
import axios from "axios";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/product/getSellersBuyers", {
          withCredentials: true,
        });
        console.log(res.data.data);
        setCustomerData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch customer data:", err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="w-full mt-5 h-[90vh] flex justify-between items-start gap-4">
      <RightSideNavigation />
      <div className="mt-2 border h-full w-full p-4 overflow-auto shadow-md rounded overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Customer Details</h2>

        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-2 border flex items-center gap-2">
                  <img
                    src={order.buyer.profilePhoto}
                    alt={order.buyer.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{order.buyer.fullname}</span>
                </td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {order.products.length} item{order.products.length > 1 ? "s" : ""}
                </td>
                <td className="p-2 border">₹{order.totalprice}</td>
                <td className="p-2 border">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="p-2 border">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                    Processing
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
