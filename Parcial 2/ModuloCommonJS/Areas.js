/*
function areaCuadrado(lado){
    return lado*lado;
}

function areaTriangulo(base,altura){
    return (base*altura)/2;
}

module.exports.areaCuadrado=areaCuadrado;
module.exports.areaTriangulo=areaTriangulo;
*/

function areaCirculo(radio){
    return ((radio*radio)* 3.1416);
}

function mensaje(msg){
    return msg="Hola mundo";
}

module.exports.areaCirculo=areaCirculo;
module.exports.mensaje=mensaje;