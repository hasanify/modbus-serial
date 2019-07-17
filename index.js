var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
var app = require('express')();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// open connection to a serial port
client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600, parity: 'none' });
client.setID(1);
app.get('/read', function(req, res) {
    client.readHoldingRegisters(4, 9, function(err, data) {
        res.json(data.data);
    });
});

app.get('/', function(req, res) {
    res.render('index', {
        title: 'E&E Solution'
    })
});

app.listen(3000, function() {
    console.log('listening on localhost:3000');
});