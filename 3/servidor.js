var servidor = require('http');
var url = require('url');
var fs = require('fs');

function iniciar(enrutar, manejador){
	function arrancaServidor(requiere, respuesta){

		var ruta = url.parse(requiere.url).pathname;

		console.log("Alguien se ha conectado");

		var contenido = enrutar(manejador, ruta);

		var registro = fs.createWriteStream('registro.txt', {'flags':'a'});
		registro.write(ruta + '\n');

		respuesta.writeHead(200, {"Content-Type":"text/html"});
		respuesta.write(contenido);
		respuesta.end();
	}
	servidor.createServer(arrancaServidor).listen(8888);
}

exports.iniciar = iniciar;
