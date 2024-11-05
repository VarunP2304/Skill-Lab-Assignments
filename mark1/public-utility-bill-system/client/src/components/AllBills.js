import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("/api/bills");
        setBills(response.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const handleDownload = async (pdfFile) => {
    try {
      const response = await axios.get(`/api/bills/download/${pdfFile}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", pdfFile);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div>
      <h2>All Bills</h2>
      <ul>
        {bills.map((bill, index) => (
          <li key={index}>
            {bill.userId} - {bill.amount} - {bill.type} - {bill.priority ? "Priority" : "Normal"}
            <button onClick={() => handleDownload(bill.pdfFile)}>Download as PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBills;