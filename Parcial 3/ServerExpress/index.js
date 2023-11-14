const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/clientes', (req,res)=>{
    console.log(res.query)
    res.json({mensaje:"Server Express respondiendo a get"});
})

app.post('/clientes', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a post"});
})

app.delete('/clientes', (req,res)=>{
    res.json({mensaje:"Server Express respondiendo a delete"});
})

app.listen(8082, ()=>{
    console.log("Servidor Express en puerto 8082");
})