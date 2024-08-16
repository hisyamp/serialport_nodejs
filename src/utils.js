const Readline = require('@serialport/parser-readline');

function sendToArduino(port, data) {
    port.write(data, (err) => {
        if (err) {
            return console.log('Error on write:', err.message);
        }
        console.log(`Sent: ${data}`);
    });
}

function setupParser(port) {
    return port.pipe(new Readline({ delimiter: '\r\n' }));
}

module.exports = { sendToArduino, setupParser };
