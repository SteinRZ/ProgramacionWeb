window.onload=function(){
    new gridjs.Grid({
        search: true,
        pagination: true,
        fixedHeader: true,
        sort: true,
        height: '200px',
        width: '1200px',
        pagination: {
            limit: 10
        },
        columns: ['ID', 'Titulo'],
        server: {
            url: 'http://localhost:8082',
            then: data => data.map(pelicula => 
                [pelicula.ID_PELICULA, pelicula.TITULO]
            )
            } 
    }).render(document.getElementById("tabla"));

    document.getElementById("btnConsultar").addEventListener("click", async () => {
            let id = document.getElementById("inputID").value;
            let response = await fetch(`http://localhost:8082/pelicula?ID=${id}`, {method:"GET"});
            let data = await response.json();
            console.log(data)
            if(data.status==0) {
                alert(data.mensaje);
                console.log(data.status);
            }
            else {
                alert(data.mensaje);
                console.log(data.datos);
                console.log(data.status);
                document.getElementById("titulo").value=data.datos.TITULO;
                document.getElementById("fecha").value=data.datos.FECHA_LANZAMIENTO;
                document.getElementById("cast").value=data.datos.CAST;
                document.getElementById("director").value=data.datos.DIRECTOR;
                document.getElementById("productora").value=data.datos.PRODUCTORA;
            }

            })
}