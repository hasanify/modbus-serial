var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
var express = require('express');
var app = express();
var path = require('path');
var serialport = require('serialport');

client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600, parity: 'none' });
client.setID(1);

function connect() {
    client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600, parity: 'none' });
    client.setID(1);
}
app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/read', function(req, res) {
    client.readHoldingRegisters(4, 9, function(err, data) {
        if (data == null) { connect() } else { res.json(data.data) }
    });
});

app.listen(3000, function() {
    console.log('listening on localhost:3000');
});