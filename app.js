let express = require('express');
let app = express();
let swig = require('swig');
let bodyParser = require('body-parser');
let mongo = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



app.use(express.static('public'));

app.set('db','mongodb://admin:sdi@' +
    'cluster0-shard-00-00.syqsl.mongodb.net:27017,cluster0-shard-00-01.syqsl.mongodb.net:27017,' +
    'cluster0-shard-00-02.syqsl.mongodb.net:27017/canciones?ssl=true&replicaSet=atlas-nvacm1-shard-0&authSource=admin&retryWrites=true&w=majority');

// Variables
app.set('port', 8081)


require("./routes/rusuarios.js")(app, swig);  // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app,swig,mongo);  // (app, param1, param2, etc.)
require("./routes/rautores.js")(app,swig);

app.get('/suma', function (req, res) {
    let respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
    res.send(String(respuesta));
});



app.listen(app.get("port"), function () {
    console.log("Servidor activo")
});