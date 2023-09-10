import { SERVER_PORT } from '../configs/Config';
import http from 'http';
import express from 'express';

export default class Server {
  //Atributos de la clase
  private static _instance: Server;
  public app: express.Application;
  public port: string;
  private httpserver: http.Server;

  private constructor() {
    //Inicia los valores
    this.app = express();
    this.port = SERVER_PORT;
    //Creando un nuevo servidor express
    this.httpserver = new http.Server(this.app);
  }

  //Getter: Obtener la instancia del servidor
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  //Iniciar servidor
  //Se le pasa por parametro una función () => void
  start(callback: () => void) {
    this.httpserver.listen(this.port, callback);
  }
}
