//? Modulos para el servidor
const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
const { jsPDF } = require("jspdf");
const fs = require('fs');
const path = require('path');
app.use(cors()); //*Para evitar error de cors

//? Conexion a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'XXXX',
    database: 'WEB'
});

//? Consulta de todos las peliculas de la base de datos
app.get('/', (req, res) => {
    console.log(req.query.ID_PELICULA);
    let consulta = ''
    if (typeof (req.query.ID_PELICULA) == 'undefined') {
        consulta = `select * from PELICULA`
    } else {
        consulta = `select * from PELICULA where ID_PELICULA=${req.query.ID_PELICULA}`
    }
    console.log(consulta);

    connection.query(
        consulta,
        function (err, results, fields) {
            if (results.length == 0) {
                res.json({ mensaje: "Esta pelicula no esta registrada" });
            }
            else {
                res.json(results);
            }
        }
    );
});

//? Consulta de una pelicula
app.get('/pelicula', (req, res) => {
    console.log(req.query.ID);
    let consulta = ''
    if (typeof (req.query.ID) == 'undefined') {
        consulta = `SELECT * FROM PELICULA`;
    }
    else {
        consulta = `SELECT * FROM PELICULA WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(consulta)
    connection.query(
        consulta,
        function (err, results, fields) {
            if (results.length == 0) {
                res.json({
                    status: 0,
                    mensaje: "Este ID no esta registrado, intente con otro ID por favor",
                    datos: {}
                });
            }
            else {
                res.json({
                    status: 1,
                    mensaje: "Pelicula encontrada exitosamente",
                    datos: (results.length == 1) ? results[0] : results
                });
            }
        }
    )
});

//? Agregacion de una pelicula
app.post('/pelicula', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof (req.query.TITULO) == 'undefined' || typeof (req.query.FECHA_LANZAMIENTO) == 'undefined' || typeof (req.query.CAST) == 'undefined' || typeof (req.query.DIRECTOR) == 'undefined' || typeof (req.query.PRODUCTORA) == 'undefined') {
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
            function (err, results, fields) {
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

//? Modificacion de la pelicula consultada
app.put('/pelicula', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof (req.query.ID) == 'undefined' || typeof (req.query.TITULO) == 'undefined' || typeof (req.query.FECHA_LANZAMIENTO) == 'undefined' || typeof (req.query.CAST) == 'undefined' || typeof (req.query.DIRECTOR) == 'undefined' || typeof (req.query.PRODUCTORA) == 'undefined') {
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
            function (err, results, fields) {
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

//? Eliminacion de una pelicula
app.delete('/pelicula', (req, res) => {
    console.log(req.query.ID);
    let sentenciaSQL = ''
    if (typeof (req.query.ID) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Ingresa el ID de la pelicula que deseas eliminar por favor",
            datos: {}
        });
    }
    else {
        sentenciaSQL = `DELETE FROM PELICULA WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(sentenciaSQL);
    connection.query(
        sentenciaSQL,
        function (err, results, fields) {
            console.log(results);
            if (results.affectedRows == 1) {
                res.json({
                    status: 1,
                    mensaje: "Pelicula eliminada exitosamente",
                    datos: {}
                });
            }
            else {
                res.json({
                    status: 0,
                    mensaje: "Este ID no esta registrado, intente con otro ID por favor",
                    datos: {}
                });
            }
        }
    )
});

//? Crear PDF de la consulta
app.get('/pelicula/formato', (req, res) => {
    let doc = new jsPDF();
    doc.setFontSize(12);
    const titulo = req.query.titulo;
    const fecha = req.query.fecha;
    const cast = req.query.cast;
    const director = req.query.director;
    const productora = req.query.productora;
    doc.text('Título de la película:', 10, 10);
    doc.text(titulo, 10, 20);
    doc.text('Fecha de lanzamiento:', 10, 40);
    doc.text(fecha, 10, 50);
    doc.text('Cast:', 10, 70);
    doc.text(cast, 10, 80);
    doc.text('Director:', 10, 100);
    doc.text(director, 10, 110);
    doc.text('Productora:', 10, 130);
    doc.text(productora, 10, 140);
    let archivoPDF = path.join('C:\\wamp64\\www\\RepositoriosGithub\\CRUD\\documents', 'consulta.pdf');
    doc.save(archivoPDF, function (err) {
        if (err) {
            return res.sendStatus(500);
        }
        res.download(archivoPDF);
    });
});

//? Mensaje de confirmacion de arranque de servidor
app.listen(8082, (req, res) => {
    console.log("Servidor Express en puerto 8082");
});