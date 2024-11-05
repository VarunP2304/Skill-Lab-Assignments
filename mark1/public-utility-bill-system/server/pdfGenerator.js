const fs = require('fs-extra');
const path = require('path');
const PDFDocument = require('pdfkit');

const PDF_DIR = path.join(__dirname, '../storage/bills');

// Ensure PDF storage directory exists
fs.ensureDirSync(PDF_DIR);

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

const getPDFPath = (fileName) => path.join(PDF_DIR, fileName);

module.exports = { generateBillPDF, getPDFPath };