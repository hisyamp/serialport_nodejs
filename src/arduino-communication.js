const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const { portPath, baudRate } = require('./config');
const { sendToArduino } = require('./utils');

const port = new SerialPort({ path: portPath, baudRate });

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

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
