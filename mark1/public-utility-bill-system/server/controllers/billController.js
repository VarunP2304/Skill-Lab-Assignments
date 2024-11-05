const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const billQueue = require("../queues/billQueue");
const priorityQueue = require("../queues/priorityQueue");
const { logTransaction } = require("../utils/fileHandler");
const transactionStack = require("../queues/transactionStack");

const PDF_DIR = path.join(__dirname, '../storage/bills');

// Ensure PDF storage directory exists
fs.ensureDirSync(PDF_DIR);

const Bill = mongoose.model('Bill', new mongoose.Schema({
  userId: String,
  amount: Number,
  type: String,
  priority: Boolean,
  timestamp: Date,
  pdfFile: String
}));

const generateBillPDF = async (billData) => {
  const fileName = `${billData.userId}-${Date.now()}.pdf`;
  const filePath = path.join(PDF_DIR, fileName);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      // Handle stream events
      stream.on('error', reject);
      stream.on('finish', () => resolve(fileName));

      doc.pipe(stream);

      // Add company logo/header
      doc.fontSize(20).text('Utility Bill Payment System', { align: 'center' });
      doc.moveDown();

      // Add bill details
      doc.fontSize(12);
      doc.text(`Bill ID: ${billData.userId}-${Date.now()}`);
      doc.text(`User ID: ${billData.userId}`);
      doc.text(`Amount: $${billData.amount}`);
      doc.text(`Bill Type: ${billData.type}`);
      doc.text(`Priority: ${billData.priority ? 'Yes' : 'No'}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);

      // Add footer
      doc.moveDown();
      doc.fontSize(10).text('Thank you for your payment!', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const addBillRequest = async (req, res) => {
  try {
    const { userId, amount, type, priority } = req.body;

    // Validate incoming data
    if (!userId || !amount || !type) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create new bill document
    const newBill = new Bill({
      userId,
      amount,
      type,
      priority,
      timestamp: Date.now()
    });

    // Save to MongoDB
    await newBill.save();

    // Add to queue
    const request = { userId, amount, type, priority, timestamp: Date.now() };
    if (priority) {
      priorityQueue.enqueue(request);
    } else {
      billQueue.addRequest(request);
    }
    transactionStack.push(request);

    res.status(200).json({ message: "Bill request added successfully" });
  } catch (error) {
    console.error("Error adding bill request:", error);
    res.status(500).json({ message: "Failed to add bill request" });
  }
};
const processBillRequest = async (req, res) => {
  try {
    let request = priorityQueue.isEmpty()
      ? billQueue.processNext()
      : priorityQueue.dequeue();

    if (!request) {
      return res.status(200).json({ message: "No requests in queue" });
    }

    const pdfFileName = await generateBillPDF(request);
    request.pdfFile = pdfFileName;
    await logTransaction(request);

    res.status(200).json({ 
      message: "Processed and generated invoice",
      pdfFile: pdfFileName
    });
  } catch (error) {
    console.error("Error processing bill request:", error);
    res.status(500).json({ message: "Failed to process bill request" });
  }
};



const getBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({ bills });
  } catch (error) {
    console.error("Error retrieving bills:", error);
    res.status(500).json({ message: "Failed to retrieve bills" });
  }
};  


module.exports = { addBillRequest, processBillRequest, getBills };