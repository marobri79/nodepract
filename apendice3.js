var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (peticion, respuesta) {
    var q = url.parse(peticion.url, true);
  
    var nombreFichero = "./instrucciones.html";
    if (q.pathname == "/dni") {
        fs.readFile(nombreFichero, function (err, dato) {
            if (err) {
                respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                return respuesta.end("404 Not Found");
            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            var cadena = url.parse(peticion.url, true).query;
    var calcula=letraDNI(cadena.a) ;
    var txt = "El dni "+cadena.a +"-"+ calcula;
    respuesta.write(txt);
    respuesta.end();
         
        });
    } else {
        respuesta.end()
    }
}).listen(8083,"127.0.0.3");
console.log('Servidor ejecutándose en http://127.0.0.3:8083/');   
function letraDNI(dni)
    {
        var cadena="TRWAGMYFPDXBNJZSQVHLCKET";
        var posicion = dni%23;
        var letra = cadena.substring(posicion,posicion+1);
        return letra;
    }