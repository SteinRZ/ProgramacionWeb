//? Modulos para la creacion del servidor
const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
app.use(cors()); //*Para evitar error de cors

//? Conexion a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Happy20022003!',
    database: 'WEB'
});

//? Consulta de todos las peliculas de la base de datos
app.get('/', (req, res)=>{
    console.log(req.query.ID_PELICULA);
    let consulta = ''
    if(typeof(req.query.ID_PELICULA)=='undefined'){
        consulta = `select * from PELICULA`
    } else {
        consulta = `select * from PELICULA where ID_PELICULA=${req.query.ID_ALUMNO}`
    }
    console.log(consulta);

    connection.query(
        consulta,
        function(err, results, fields) {
            if(results.length==0){
                res.json({ mensaje:"Esta pelicula no esta registrada" });
            }
            else{
                res.json(results);
            }
        }
    );
});

//? Consulta de una sola pelicula
app.get('/pelicula',(req,res)=>{
    console.log(req.query.ID);
    let consulta=''
    if(typeof(req.query.ID)=='undefined'){
        consulta = `SELECT * FROM PELICULA`;
    }
    else {
        consulta = `SELECT * FROM PELICULA WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(consulta)
    connection.query(
        consulta,
        function(err, results, fields) {
            if(results.length==0){
                res.json({ status:0,
                    mensaje:"Este ID no esta registrado, intente con otro ID por favor",
                    datos: {} });
            } 
            else {
                res.json({ status:1,
                        mensaje :"Pelicula encontrada exitosamente",
                        datos: (results.length==1) ? results[0] : results });
            }
        }
    )
});

//? Agregacion de una pelicula
app.post('/pelicula', (req,res)=>{
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof(req.query.TITULO) == 'undefined' || typeof(req.query.FECHA_LANZAMIENTO) == 'undefined' || typeof(req.query.CAST) == 'undefined' || typeof(req.query.DIRECTOR) == 'undefined' || typeof(req.query.PRODUCTORA) == 'undefined') {
        res.json({ 
            status: 0,
            mensaje: "Completa todos los campos por favor",
            datos: {} 
        });
    } 
    else {
        sentenciaSQL = `INSERT INTO PELICULA (TITULO, FECHA_LANZAMIENTO, CAST, DIRECTOR, PRODUCTORA) VALUES ('${req.query.TITULO}', '${req.query.FECHA_LANZAMIENTO}', '${req.query.CAST}', '${req.query.DIRECTOR}', '${req.query.PRODUCTORA}')`;
        console.log(sentenciaSQL);
        connection.query(
            sentenciaSQL,
            function(err, results, fields) {
                console.log(results);
                if (results && results.affectedRows == 1) {
                    res.json({ 
                        status: 1,
                        mensaje: "Pelicula agregada exitosamente",
                        datos: {} 
                    });
                } else {
                    res.json({ 
                        status: 0,
                        mensaje: "Hubo un error al agregar la pelicula, por favor intenta de nuevo",
                        datos: {} 
                    });
                }
            }
        )
    }
});

//? Modificacion de una sola pelicula
app.put('/pelicula', (req,res)=>{
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof(req.query.ID) == 'undefined' || typeof(req.query.TITULO) == 'undefined' || typeof(req.query.FECHA_LANZAMIENTO) == 'undefined' || typeof(req.query.CAST) == 'undefined' || typeof(req.query.DIRECTOR) == 'undefined' || typeof(req.query.PRODUCTORA) == 'undefined') {
        res.json({ 
            status: 0,
            mensaje: "Completa todos los campos por favor",
            datos: {} 
        });
    } 
    else {
        sentenciaSQL = `UPDATE PELICULA SET TITULO = '${req.query.TITULO}', FECHA_LANZAMIENTO = '${req.query.FECHA_LANZAMIENTO}', CAST = '${req.query.CAST}', DIRECTOR = '${req.query.DIRECTOR}', PRODUCTORA = '${req.query.PRODUCTORA}' WHERE ID_PELICULA = ${req.query.ID}`;
        console.log(sentenciaSQL);
        connection.query(
            sentenciaSQL,
            function(err, results, fields) {
                console.log(results);
                if (results && results.affectedRows == 1) {
                    res.json({ 
                        status: 1,
                        mensaje: "Pelicula modificada exitosamente",
                        datos: {} 
                    });
                } else {
                    res.json({ 
                        status: 0,
                        mensaje: "Hubo un error al modificar la pelicula, por favor intenta de nuevo",
                        datos: {} 
                    });
                }
            }
        )
    }
});

//? Eliminacion de una sola pelicula
app.delete('/pelicula', (req,res)=>{
    console.log(req.query.ID);
    let sentenciaSQL=''
    if(typeof(req.query.ID)=='undefined'){
        res.json({ status:0,
            mensaje:"Ingresa el ID de la pelicula que deseas eliminar por favor",
            datos: {} });
    }
    else {
        sentenciaSQL = `DELETE FROM PELICULA WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(sentenciaSQL);
    connection.query(
        sentenciaSQL,
        function(err, results, fields) {
            console.log(results);
            if (results.affectedRows==1) {
                res.json({ status:1,
                    mensaje:"Pelicula eliminada exitosamente",
                    datos: {} });
            } 
            else {
                res.json({ status:0,
                    mensaje:"Este ID no esta registrado, intente con otro ID por favor",
                    datos: {} });
            }
        }
    )
});

//? Mensaje de confirmacion de arranque de servidor
app.listen(8082, (req,res)=>{
    console.log("Servidor Express en puerto 8082");
});


///! CODIGO SIN UTILIZAR ///
/*

*/