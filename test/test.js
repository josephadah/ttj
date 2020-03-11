import fs from 'fs';
import assert from 'assert';
import { execSync } from 'child_process';

if (fs.existsSync('log/main.log')) {
    fs.unlinkSync('log/main.log');
}

if (fs.existsSync('order-log/order.log')) {
    fs.unlinkSync('order-log/order.log');
}

const command = 'node src/app.js 35 customer-one private 1180';
execSync(command, { uid: 1000 });

try {
    assert.equal(fs.readFileSync('log/main.log').toString(), fs.readFileSync('test/test-data/test-main.log').toString());
    assert.equal(fs.readFileSync('order-log/order.log').toString(), fs.readFileSync('test/test-data/test-order.log').toString());
    console.log('✅', 'test passed');
} catch (e) {
    console.log('❌', 'test failed');
}
