const express = require('express');
//const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();

//app.use(cors());

//Conexion a base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Happy20022003!',
    database: 'WEB'
});

app.get('/', (req, res)=>{
    console.log(req.query.ID_ALUMNO);
    let consulta = ''
    if(typeof(req.query.ID_ALUMNO)=='undefined'){
        consulta = `select * from ALUMNO`
    } else {
        consulta = `select * from ALUMNO where ID_ALUMNO=${req.query.ID_ALUMNO}`
    }
    console.log(consulta);

    connection.query(
        consulta,
        function(err, results, fields) {
            if(results.length==0){
                res.json({mensaje:"Este alumno no existe"});
            }
            else{
                res.json(results);
            }
        }
    );
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