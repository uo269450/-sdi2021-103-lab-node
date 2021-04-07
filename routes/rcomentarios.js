module.exports = function (app, swig,gestorBD) {

    app.post("/comentarios/:cancion_id", function (req,res){
        if(req.session.usuario==null){
            res.send("Error, no hay usuario identificado")
        }

        var comentario={

            autor:req.session.usuario,
            cancion_id: gestorBD.mongo.ObjectID(req.params.cancion_id),
            texto:req.body.texto
        };

        gestorBD.insertarComentario(comentario,function (id){
            if(id==null){
                res.send("Error al enviar el comentario")
            }else{
                res.send("Comentario añadido: "+id +"texto:"+comentario.texto);
            }
        })
    });
}