let express = require('express');
let app = express();
let swig = require('swig');
let bodyParser = require('body-parser');
let mongo = require('mongodb');
let expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

let crypto = require('crypto');

let fileUpload = require('express-fileupload');
app.use(fileUpload());
let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);



// routerUsuarioSession
var routerUsuarioSession = express.Router();
routerUsuarioSession.use(function(req, res, next) {
    console.log("routerUsuarioSession");
    if ( req.session.usuario ) {// dejamos correr la petición
        next();
    } else {
        console.log("va a : "+req.session.destino)
        res.redirect("/identificarse");
    }
});

//Aplicar routerUsuarioSession
app.use("/canciones/agregar",routerUsuarioSession);
app.use("/publicaciones",routerUsuarioSession);

//routerAudios
let routerAudios = express.Router();
routerAudios.use(function(req, res, next) {
    console.log("routerAudios");
    let path = require('path');
    let idCancion = path.basename(req.originalUrl, '.mp3');
    gestorBD.obtenerCanciones(
        {"_id": mongo.ObjectID(idCancion) }, function (canciones) {
            if(req.session.usuario && canciones[0].autor == req.session.usuario ){
                next();
            } else {
                res.redirect("/tienda");
            }
        })
});
//Aplicar routerAudios
app.use("/audios/",routerAudios);



app.use(express.static('public'));


// Variables
app.set('port', 8081)

app.set('clave','abcdefg');
app.set('crypto',crypto);
app.set('db','mongodb://admin:sdi@' +
    'cluster0-shard-00-00.syqsl.mongodb.net:27017,cluster0-shard-00-01.syqsl.mongodb.net:27017,' +
    'cluster0-shard-00-02.syqsl.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-nvacm1-shard-0&authSource=admin&retryWrites=true&w=majority');



require("./routes/rusuarios.js")(app, swig,gestorBD);  // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app,swig,gestorBD);  // (app, param1, param2, etc.)
require("./routes/rautores.js")(app,swig,gestorBD);

app.get('/suma', function (req, res) {
    let respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);
    res.send(String(respuesta));
});



app.listen(app.get("port"), function () {
    console.log("Servidor activo")
});