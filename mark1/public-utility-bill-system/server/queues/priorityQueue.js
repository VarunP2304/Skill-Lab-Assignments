class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(request) {
    this.queue.push(request);
    this.queue.sort((a, b) => b.priority - a.priority);
  }
  dequeue() {
    return this.queue.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = new PriorityQueue();
