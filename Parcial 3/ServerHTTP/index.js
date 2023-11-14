const http = require ('http');

const servidor = http.createServer((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.write("Sevidor HTTP de Node contestando a peticion get");
    res.end();
});

servidor.listen(8082, () => {
    console.log("Servidor Node HTTP corriendo con puerto 8082")
})