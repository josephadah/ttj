import fs from 'fs';

const validCustomers = [
    'customer-one',
    'customer-two',
    'customer-three',
    'customer-four',
    'customer-five'
];

function log(message) {
    let data = '';
    if (fs.existsSync('log/main.log')) {
        data = fs.readFileSync('log/main.log');
    }

    fs.writeFileSync('log/main.log', data + message + '\n')
}

function saveData(orderId, customer, amount) {
    let data = '';
    if (fs.existsSync('order-log/order.log')) {
        data = fs.readFileSync('order-log/order.log');
    }

    fs.writeFileSync('order-log/order.log', data + orderId + ' ' + customer + ' ' + amount + '\n')
}

function runApp(order) {
    log('order ' + order.orderId + ' processing started');
    if (validCustomers.includes(order.customer.name)) {
        const amount = order.amount;
        orderCalculation.adjustOrder(order);
        saveData(order.orderId, order.customer.name, order.amount);
        log('order ' + order.orderId + ' was saved');
        if (order.customer.type === 'private') {
            log('order ' + order.orderId + ' tax amount: ' + amount * 0.2);
        }
    } else {
        log('order ' + order.orderId + ' is not valid');
    }
}

const orderCalculation = {
    adjustOrder: function (order) {
        if (order.customer.type === 'private') {
            order.amount *= 1.2;
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is private' + '\n');
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is private, 20% added' + '\n');
        } else if (order.customer.type === 'organization') {
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is organization' + '\n');
        } else if (order.customer.type === 'educational') {
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is educational' + '\n');
        } else if (order.customer.type === 'test') {
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is test' + '\n');
        } else if (order.customer.type === 'government') {
            fs.appendFileSync('log/main.log', 'order ' + order.orderId + ' is government' + '\n');
        }
    }
};

const order = {
    orderId: process.argv[2],
    customer: {
        name: process.argv[3],
        type: process.argv[4]
    },
    amount: process.argv[5]
};

runApp(order);
