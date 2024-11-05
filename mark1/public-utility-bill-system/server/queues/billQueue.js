const Queue = require("queue-fifo");

const billQueue = new Queue();

module.exports = {
  addRequest: (request) => billQueue.enqueue(request),
  processNext: () => billQueue.dequeue(),
  isEmpty: () => billQueue.isEmpty(),
};
