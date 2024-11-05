const express = require("express");
const router = express.Router();
const {
  addBillRequest,
  processBillRequest,
  getBills
} = require("./../controllers/billController");

router.post("/add", addBillRequest);
router.get("/process", processBillRequest);
router.get("/", getBills); // Route to get all bills

module.exports = router;