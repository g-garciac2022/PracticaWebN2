/* TO DO:



Arreglar Vuelta a la pagina principal   
Añadir pagina nuevo elemento
Añadir pagina nuevo subelemento
Aprender Moustache
Paginas de error personalizadas
Aprender formularios
¿Estructura de datos correcta?


*/

/* Apuntes:

Codifgos de estado HTTP:
1XX = respuestas informativas
2XX = respuestas satisfactorias
3XX = redirecciones
4XX = errores del cliente
5XX = errores del servidor

web de desarrollo: https://developer.mozilla.org/es/docs/Web/HTTP/Status

Mas comunes:
200 = OK !!
201 = Created
202 = Accepted
400 = Bad Request !!
401 = Unauthorized
403 = Forbidden
404 = Not Found !!!
500 = Internal Server Error !!!
501 = Not Implemented
502 = Bad Gateway
503 = Service Unavailable
504 = Gateway Timeout





*/


import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import zarmaRouter from './zarmaRouter.js';
import { __dirname } from './dirname.js';
const app = express();








// Configuración de Mustache
app.engine('html', mustacheExpress(), '.html');

// Indicar el directorio de las vistas
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');

app.use(bodyParser.urlencoded({ extended: true })); 
//para que pueda leer los datos del formulario y los convierta en un objeto javascript



// Configuración para servir archivos estáticos
app.use(express.static(__dirname + '/../public'));


app.use('/', zarmaRouter); //para que use el router de zarma


// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});