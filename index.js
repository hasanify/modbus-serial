var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
var express = require('express');
var app = express();
var path = require('path');

client.connectRTUBuffered("COM3", { baudRate: 9600, parity: 'none' });
// client.setID(1);

function connect() {
    client.connectRTUBuffered("COM3", { baudRate: 9600, parity: 'none' });
}

app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/read/:id', function(req, res) {
	client.setID(parseInt(req.params.id));
    client.readHoldingRegisters(4, 9, function(err, data) {
        if (data == null) { connect() } else { res.json(data.data) }
    });
});
// process.on('unhandledRejection', up => { throw up })
app.listen(3000, function() {
    console.log('listening on localhost:3000');
});