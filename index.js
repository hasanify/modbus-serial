var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
var app = require('express')();
var path = require('path');
var serialport = require('serialport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

client.connectRTUBuffered("COM10", { baudRate: 9600, parity: 'none' });
client.setID(1);

function connect(){
	client.connectRTUBuffered("COM10", { baudRate: 9600, parity: 'none' });
	client.setID(1);
}

app.get('/read', function(req, res) {
    client.readHoldingRegisters(4, 9, function(err, data) {
        if(data == null){connect()}
       	else{res.json(data.data)}
    });
});

app.get('/', function(req, res) {
    res.render('index', {
        title: 'E&E Solutions'
    })
});

app.listen(3000, function() {
    console.log('listening on localhost:3000');
});