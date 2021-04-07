module.exports = function (app, swig, gestorBD) {

    app.post("/comentarios/:cancion_id", function (req, res) {
        if (req.session.usuario == null) {
            res.send("Error, no hay usuario identificado")
        }

        var comentario = {

            autor: req.session.usuario,
            cancion_id: gestorBD.mongo.ObjectID(req.params.cancion_id),
            texto: req.body.texto
        };

        gestorBD.insertarComentario(comentario, function (id) {
            if (id == null) {
                res.send("Error al enviar el comentario")
            } else {
                res.send("Comentario añadido: " + id + "texto:" + comentario.texto);
            }
        })
    });

    app.get("/comentarios/borrar/:id", function (req, res) {

        if(req.session.usuario==null){
            res.send("No hay usuario con sesion iniciada");
        }
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};

        gestorBD.obtenerComentarios(criterio, function (comentarios) {
            if (comentarios == null) {
                res.send("Error al borrar el comentario");
            } else {
                let comentario = comentarios[0];

                if (comentario.autor != req.session.usuario) {
                    res.send("No es el autor del comentario")
                } else {

                    gestorBD.borrarComentario(criterio, function (deleted) {
                        if (deleted == null) {
                            res.send("Error al borrar");
                        } else {
                            res.send("Comentario borrado")
                        }
                    })
                }
            }
        })


    });
}