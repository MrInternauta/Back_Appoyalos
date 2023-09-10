/*jshint esversion: 6 */
import express from 'express';
import LoginRouter from './Login';
import UsuarioRouter from './Usuarios';

//Obteniendo instancia del servidor
const app = express();

app.use(LoginRouter);
app.use(UsuarioRouter);

export default app;
