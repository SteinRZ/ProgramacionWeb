window.onload=function(){
    let pagina = 1;
    document.getElementById('btnAnterior').addEventListener("click",()=>{
        if(pagina > 1){
            pagina -= 1;
            cargarPeliculasAsync();
        }
    });
    
    document.getElementById('btnSiguiente').addEventListener("click",()=>{
        if(pagina < 1000){
            pagina += 1;
            cargarPeliculasAsync();
        }
    });

    /* Peticion mediante XML Http Request */
    document.getElementById("btnXML").addEventListener("click",()=>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=${pagina}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var datos = JSON.parse(xhr.responseText);
                let peliculas = '';
                datos.results.forEach(pelicula => {
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });
                document.getElementById('content').innerHTML = peliculas;
            }
        }
        xhr.send();
        alert("Se realizo la peticion mediante XMLHttpRequest");
    })

    /* Peticion mediante Fetch */
    document.getElementById("btnFetch").addEventListener("click",()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=${pagina}`)
            .then(respuesta => {
                if(respuesta.status === 200){
                    return respuesta.json();
                } else {
                    throw new Error('Error: ' + respuesta.status);
                }
            })
            .then(datos => {
                let peliculas = '';
                datos.results.forEach(pelicula => {
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });
            document.getElementById('content').innerHTML = peliculas;
        })
        alert("Se realizo la peticion mediante Fetch");
    })

    /* Peticion con Async Await */
    const cargarPeliculasAsync = async() => {
        try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=${pagina}`);
            if(respuesta.status === 200){
                const datos = await respuesta.json();
                let peliculas = '';
                datos.results.forEach(pelicula => {
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });
                document.getElementById('content').innerHTML = peliculas;
            }
        } catch(error) {
            console.log(error);
        }
    }
    document.getElementById("btnAsync").addEventListener("click",()=>{
        cargarPeliculasAsync();
        alert("Se realizo la peticion mediante Async Await");
    })

    /* Peticion mediante JQuery */
    document.getElementById("btnJQ").addEventListener("click",()=>{
        $.ajax({
            url: 'https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=1',
            type: 'GET',
            success: function(datos) {
                let peliculas = '';
                datos.results.forEach(pelicula => {
                    peliculas += `
                        <div class="pelicula">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <h3 class="titulo">${pelicula.title}</h3>
                        </div>
                    `;
                });
    
                $('#content').html(peliculas);
            },
        });
        alert("Se realizo la peticion mediante JQuery");
    })

    /* Peticion mediante Axios */
    document.getElementById("btnAxios").addEventListener("click",()=>{
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=1')
        .then(function (respuesta) {
            let datos = respuesta.data;
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });   
            document.getElementById('content').innerHTML = peliculas;
        })
        alert("Se realizo la peticion mediante Axios");
    });
}