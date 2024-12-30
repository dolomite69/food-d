import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Orders = ({ url = process.env.REACT_APP_API_URL }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = useCallback(async () => {
    if (!token) {
      toast.error("Unauthorized! Please login first.");
      return;
    }

    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Error fetching orders.");
    }
  }, [token, url]);

  const statusHandler = useCallback(
    async (event, orderId) => {
      if (!token) {
        toast.error("Unauthorized! Please login first.");
        return;
      }

      try {
        const response = await axios.post(
          `${url}/api/order/status`,
          {
            orderId,
            status: event.target.value,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          fetchAllOrder();
        } else {
          toast.error(response.data.message || "Failed to update status.");
        }
      } catch (error) {
        toast.error("Error updating order status.");
      }
    },
    [token, url, fetchAllOrder]
  );

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchAllOrder();
    }
  }, [admin, token, navigate, fetchAllOrder]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p className="order-item-name">
                  {`${order.address.firstName || ""} ${order.address.lastName || ""}`}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street && `${order.address.street},`}</p>
                  <p>
                    {[order.address.city, order.address.state, order.address.country]
                      .filter(Boolean)
                      .join(", ")},{" "}
                    {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
