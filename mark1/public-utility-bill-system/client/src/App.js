import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BillForm from "./components/BillForm"; // Ensure the path is correct
import AllBills from "./components/AllBills";
function App() {

  return (
    <Router>
      <div>
        <h1>Utility Bill Payment System</h1>
        <Routes>
          <Route path="/" element={<BillForm />} />
          <Route path="/all-bills" element={<AllBills />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;