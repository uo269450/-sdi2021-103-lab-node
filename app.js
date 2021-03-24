let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('public'));

// Variables
app.set('port', 8081)


require("./routes/rusuarios.js")(app);  // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app);  // (app, param1, param2, etc.)

app.get('/suma', function (req, res) {
    let respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
    res.send(String(respuesta));
});

app.get('/canciones/:id', function (req, res) {
    let respuesta = 'id: ' + req.params.id;
    res.send(respuesta);
});
app.get('/canciones/:genero/:id', function (req, res) {
    let respuesta = 'id: ' + req.params.id + '<br>' + 'Género: ' + req.params.genero;
    res.send(respuesta);
});

app.listen(app.get("port"), function () {
    console.log("Servidor activo")
});