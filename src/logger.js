import fs from "fs";

const mainLogFile = "log/main.log";
const orderLogFile = "order-log/order.log";

const log = (message, type = "main") => {
  try {
    let data = "";
    const file =
      type === "main" ? mainLogFile : type === "order" ? orderLogFile : null;

    if (!file) return;

    if (fs.existsSync(file)) {
      data = fs.readFileSync(file);
    }

    const newLineChar = process.platform === "win32" ? "\r\n" : "\n";
    fs.writeFileSync(file, data + message + newLineChar);
  } catch (error) {
    console.log(`Unable to log. Error: ${error.message}`);
  }
};

export { log };
