import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BillForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "regular", 
    priority: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/bills/add", formData);
      alert(response.data.message);
    } catch (error) {
      alert("Error submitting bill");
    }
  };

  const handleViewBills = () => {
    navigate("/all-bills");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <option value="regular">Regular</option>
        <option value="overdue">Overdue</option>
        <option value="disconnection">Disconnection</option>
        <option value="reconnection">Reconnection</option>
      </select>
      <label style={{ marginLeft: "10px", marginRight: "10px" }}>
        Priority:
        <input
          type="checkbox"
          name="priority"
          checked={formData.priority}
          onChange={handleChange}
          style={{ marginLeft: "4px" }}
        />
      </label>
      <button type="submit" style={{ marginLeft: "10px", marginRight: "10px" }}>
        Add Bill Request
      </button>
      <button type="button" onClick={handleViewBills} style={{ marginLeft: "10px" }}>
        All Bills
      </button>
    </form>
  );
};

export default BillForm;