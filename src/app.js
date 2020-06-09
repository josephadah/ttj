import { log } from "./logger.js";
import validCustomers from "./valid-customers.js";
import Customer from "./customer.js";
import Order from "./order.js";

function runApp(order) {
  try {
    log("order " + order.orderId + " processing started");

    if (!validCustomers.includes(order.customer.name)) {
      log("order " + order.orderId + " is not valid");
      return;
    }

    order.adjustOrder();
    order.saveData();
    order.logTaxAmount();
  } catch (error) {
    throw `Unexpected error. Error: ${error.message}`;
  }
}

const orderId = process.argv[2];
const customerName = process.argv[3];
const customerType = process.argv[4];
const amount = process.argv[5];

const customer = new Customer(customerName, customerType);
const order = new Order(orderId, customer, amount);

runApp(order);
