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
                res.json({mensaje:"Esta pelicula no esta registrada"});
            }
            else{
                res.json(results);
            }
        }
    );
});

//? Consulta de una sola pelicula
app.get('/pelicula',(req,res)=>{//consulta en el diagonal el nombre de la tabla
    console.log(req.query.ID);
    let consulta=''

    if(typeof(req.query.ID)=='undefined'){
        consulta = `SELECT * FROM PELICULA`;
    }
    else{
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
                res.json({status: 1,
                        mensaje : "Pelicula encontrada exitosamente",
                        datos: results[0]});
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
app.post('/', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a post"});
});

app.delete('/', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a delete"});
});
*/