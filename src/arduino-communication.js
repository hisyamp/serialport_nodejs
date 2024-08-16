const SerialPort = require('serialport');
const { portPath, baudRate } = require('./config');
const { sendToArduino, setupParser } = require('./utils');

const port = new SerialPort(portPath, { baudRate });

const parser = setupParser(port);

port.on('open', () => {
    console.log(`Serial port ${portPath} opened`);
    sendToArduino(port, 'Hello, Arduino!');
});

parser.on('data', (data) => {
    console.log(`Received from Arduino: ${data}`);
});

port.on('error', (err) => {
    console.error(`Error: ${err.message}`);
});
