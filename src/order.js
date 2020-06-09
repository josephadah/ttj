import { log } from "./logger.js";

class Order {
  constructor(orderId, customer, amount) {
    this.orderId = orderId;
    this.customer = customer;
    this.amount = amount;
    this.initialAmount = amount;
  }

  adjustOrder() {
    if (this.customer.type === "private") {
      this.amount *= 1.2;
      log("order " + this.orderId + " is private");
      log("order " + this.orderId + " is private, 20% added");
    } else if (this.customer.type === "organization") {
      log("order " + this.orderId + " is organization");
    } else if (this.customer.type === "educational") {
      log("order " + this.orderId + " is educational");
    } else if (this.customer.type === "test") {
      log("order " + this.orderId + " is test");
    } else if (this.customer.type === "government") {
      log("order " + this.orderId + " is government");
    }
  }

  saveData() {
    const message = this.orderId + " " + this.customer.name + " " + this.amount;
    log(message, "order");
    log("order " + this.orderId + " was saved");
  }

  logTaxAmount() {
    if (this.customer.type === "private") {
      log("order " + this.orderId + " tax amount: " + this.initialAmount * 0.2);
    }
  }
}

export default Order;
