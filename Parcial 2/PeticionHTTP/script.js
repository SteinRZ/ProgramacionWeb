window.onload=function(){
    let pagina = 1;

    /* Peticion mediante XML Http Request */
    const cargarPeliculasXML = () => {
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
    }
    document.getElementById("btnXML").addEventListener("click",()=>{
        cargarPeliculasXML();
        alert("Se realizo la peticion mediante XMLHttpRequest");
    })

    /* Peticion mediante Fetch */
    const cargarPeliculasFetch = () => {
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
        .catch(error => {
            console.log(error);
        });
    }
    document.getElementById("btnFetch").addEventListener("click",()=>{
        cargarPeliculasFetch();
        alert("Se realizo la peticion mediante Fetch");
    })

    /* Peticion con Async Await */
    const cargarPeliculasAsync = async() => {
        try {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ddc7740b9f6971bffb0cced6cb639525&language=es-MX&page=${pagina}`);
        
            console.log(respuesta);
    
            // Si la respuesta es correcta
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
    const cargarPeliculasJQ = () => {
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
            error: function(error) {
                console.log(error);
            }
        });
    }
    document.getElementById("btnJQ").addEventListener("click",()=>{
        cargarPeliculasJQ();
        alert("Se realizo la peticion mediante JQuery");
    })

    /* Peticion mediante Axios */
    const cargarPeliculasAxios = () => {
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
        .catch(function (error) {
            console.log(error);
        });
    }
    document.getElementById("btnAxios").addEventListener("click",()=>{
        cargarPeliculasAxios();
        alert("Se realizo la peticion mediante Axios");
    });
}