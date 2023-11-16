const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();

app.use(cors());

//Conexion a base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Happy20022003!',
    database: 'TALLERBD'
});

app.get('/usuarios', (req, res)=>{
    console.log(req.query.ID_MAESTRO);
    let consulta = ''
    if(typeof(req.query.ID_MAESTRO)=='undefined'){
        consulta = `select * from usuarios`
    } else {
        consulta = `select * from usuarios where ID_CLIENTE=${req.query.ID_MAESTRO}`
    }
    console.log(consulta);

    connection.query(
        'SELECT * FROM MAESTRO',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
    
            console.log(results);
            res.json(results);
        }
    );
    //console.log(res.query)
    //res.json({mensaje:"Server Express respondiendo a get"});
});

app.post('/', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a post"});
});

app.delete('/', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a delete"});
});

app.listen(8082, (req,res)=>{
    console.log("Servidor Express en puerto 8082");
});