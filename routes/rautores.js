module.exports = function (app, swig) {

    app.get("/autores",function (req,res){
        let autores=[{
            "nombre" :"Javer",
            "grupo":"Metalica",
            "rol": "bateria"
        },{
            "nombre" :"Carlos",
            "grupo":"DaftPunk",
            "rol": "cantante"
        },{
            "nombre" :"Pedro",
            "grupo":"Nirvana",
            "rol": "guitarrista"
        }]

        let respuesta= swig.renderFile("views/autores.html",
            {  autores:autores});

        res.send(respuesta);
    });

    app.get("/autores/agregar", function (req,res){
       let respuesta=swig.renderFile("views/autores-agregar.html",{});

       res.send(respuesta);
    });

    app.post("/autores/agregar", function (req, res) {
        let name = req.body.nombre;
        let group = req.body.grupo;
        let rol = req.body.rol;

        if (name === "undefined") {
            res.send("Nombre no enviado en la petición.");
        } else if (group === "undefined") {
            res.send("Grupo no enviado en la petición.");
        } else if (rol === "undefined") {
            res.send("Rol no enviado en la petición.");
        } else {
            res.send("Nombre autor:" + name + "<br>"
                + "Grupo: " + group + "<br>"
                + "rol: " + rol);


        }


    });

    app.get('/autores/:id', function (req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.redirect("/autores");
    });
    app.get('/autores/:grupo', function (req, res) {
        let respuesta = 'grupo: ' + req.params.grupo;
        res.redirect("/autores");
    });
    app.get('/canciones/:grupo/:id', function (req, res) {
        let respuesta = 'id: ' + req.params.id + '<br>' + 'Grupo: ' + req.params.grupo;
        res.redirect("/autores");
    });
}