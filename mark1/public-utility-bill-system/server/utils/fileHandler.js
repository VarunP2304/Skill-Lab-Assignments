const fs = require("fs");
const path = require("path");

const logTransaction = async (transaction) => {
  const transactionsPath = path.join(__dirname, "../transactions.json");
  const overduePath = path.join(__dirname, "../overdue.json");
  let transactions = [];
  let overdueTransactions = [];

  if (fs.existsSync(transactionsPath)) {
    transactions = JSON.parse(fs.readFileSync(transactionsPath, "utf8"));
  }

  if (fs.existsSync(overduePath)) {
    overdueTransactions = JSON.parse(fs.readFileSync(overduePath, "utf8"));
  }

  transactions.push(transaction);

  // Check if the transaction is overdue
  if (transaction.priority) {
    overdueTransactions.push(transaction);
    fs.writeFileSync(overduePath, JSON.stringify(overdueTransactions, null, 2));
  }

  fs.writeFileSync(transactionsPath, JSON.stringify(transactions, null, 2));
};

module.exports = { logTransaction };
