import Server from "./classes/Server";
import router  from "./routes/Index";
import bodyParser from "body-parser";
import cors from 'cors';
//Obteniendo instancia del servidor
const _Server: Server =  Server.instance;

//BodyParse (Los valors obtenidos los convierte a JSON)
_Server.app.use(bodyParser.urlencoded({ extended: true }))
_Server.app.use( bodyParser.json())

//Rutas
_Server.app.use('/api', router);

//Habilitar los origenes (CORS)
_Server.app.use(cors({origin: true, credentials: true}) )

_Server.start(()=> console.log(`Servidor corriendo en el puerto ${_Server.port}`))