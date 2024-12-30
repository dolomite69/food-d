import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./List.css";
import { StoreContext } from "../../context/StoreContext";

const List = ({ url = process.env.REACT_APP_API_URL }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch the food list.");
      }
    } catch (error) {
      toast.error("Error fetching the food list.");
    }
  }, [url]);

  const removeFood = useCallback(
    async (foodId) => {
      if (!token) {
        return toast.error("Unauthorized! Please login first.");
      }

      try {
        const response = await axios.post(
          `${url}/api/food/remove`,
          { id: foodId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          fetchList(); // Refresh list after deletion
        } else {
          toast.error(response.data.message || "Failed to remove food item.");
        }
      } catch (error) {
        toast.error("Error removing food item.");
      }
    },
    [token, url, fetchList]
  );

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchList();
    }
  }, [admin, token, navigate, fetchList]);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={`${url}/images/${item.image || "placeholder.jpg"}`}
                alt={item.name || "Food Item"}
                onError={(e) => (e.target.src = "/path/to/placeholder.jpg")}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p
                onClick={() => removeFood(item._id)}
                className="cursor"
                title="Remove Food Item"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
