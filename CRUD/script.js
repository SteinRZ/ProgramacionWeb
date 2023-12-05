window.onload = function () {
    //? Traer los ID y titulos de las peliculas
    new gridjs.Grid({
        search: true,
        pagination: true,
        fixedHeader: true,
        sort: true,
        height: '200px',
        width: '1200px',
        pagination: {
            limit: 50
        },
        columns: ['ID', 'Titulo'],
        server: {
            url: 'http://localhost:8082',
            then: data => data.map(pelicula =>
                [pelicula.ID_PELICULA, pelicula.TITULO]
            )
        }
    }).render(document.getElementById("tabla"));

    //? Boton para consultar un elemento especifico
    document.getElementById("btnConsultar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        let response = await fetch(`http://localhost:8082/pelicula?ID=${id}`, { method: "GET" });
        let data = await response.json();
        console.log(data)
        if (data.status == 0) {
            alert(data.mensaje);
            console.log(data.status);
        }
        else {
            alert(data.mensaje);
            console.log(data.datos);
            console.log(data.status);
            document.getElementById("titulo").value = data.datos.TITULO;
            document.getElementById("fecha").value = data.datos.FECHA_LANZAMIENTO;
            document.getElementById("cast").value = data.datos.CAST;
            document.getElementById("director").value = data.datos.DIRECTOR;
            document.getElementById("productora").value = data.datos.PRODUCTORA;
        }
    });

    //? Boton para agregar un nuevo elemento
    document.getElementById("btnAgregar").addEventListener("click", async () => {
        let vTitulo = document.getElementById("titulo").value;
        let vFecha = document.getElementById("fecha").value;
        let vCast = document.getElementById("cast").value;
        let vDirector = document.getElementById("director").value;
        let vProductora = document.getElementById("productora").value;
        await fetch(`http://localhost:8082/pelicula?TITULO=${vTitulo}&FECHA_LANZAMIENTO=${vFecha}&CAST=${vCast}&DIRECTOR=${vDirector}&PRODUCTORA=${vProductora}`, { method: "POST" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
        location.reload();
    });

    //? Boton para modificar un elemento
    document.getElementById("btnModificar").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vTitulo = document.getElementById("titulo").value;
        let vFecha = document.getElementById("fecha").value;
        let vCast = document.getElementById("cast").value;
        let vDirector = document.getElementById("director").value;
        let vProductora = document.getElementById("productora").value;
        await fetch(`http://localhost:8082/pelicula?ID=${vID}&TITULO=${vTitulo}&FECHA_LANZAMIENTO=${vFecha}&CAST=${vCast}&DIRECTOR=${vDirector}&PRODUCTORA=${vProductora}`, { method: "PUT" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
        location.reload();
    });

    //? Boton para eliminar un elemento especifico
    document.getElementById("btnEliminar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        await fetch(`http://localhost:8082/pelicula?ID=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
        location.reload();
    });

    //? Boton para generar un PDF de la consulta
    document.getElementById("btnPDFConsulta").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vTitulo = document.getElementById("titulo").value;
        let vFecha = document.getElementById("fecha").value;
        let vCast = document.getElementById("cast").value;
        let vDirector = document.getElementById("director").value;
        let vProductora = document.getElementById("productora").value;
        let response = await fetch(`http://localhost:8082/pelicula/formato?id=` + vID + `&titulo=` + vTitulo + `&fecha=` + vFecha + `&cast=` + vCast + `&director=` + vDirector + `&productora=` + vProductora, { method: "GET" });
        let blob = await response.blob();
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'a4.pdf';
        a.click();
    });
};