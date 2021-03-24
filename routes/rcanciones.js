module.exports = function (app) {
    app.get("/canciones", function (req, res) {

        let respuesta = "";
        if (req.query.nombre != null) {
            respuesta = 'Nombre: ' + req.query.nombre + '<br>'
        }

        if (typeof (req.query.autor) != "undefined") {
            respuesta += '<br>' + 'Autor: ' + req.query.autor;
        }

        res.send(respuesta);
    });
};