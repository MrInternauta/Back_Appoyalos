/*jshint esversion: 6 */
import jwt from 'jsonwebtoken';
import { getUserByIdOrEmail } from './usuariosController';
import {} from '../config/config';
import { md5 } from '../helpers/helpers';
/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function loginNormal
 * @description Verifica el inicio de sesión del usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: { usuario, token},
      message: ""
    }
    */
export async function loginNormal(req, res) {
  let body = req.body;
  try {
    let response = await getUserByIdOrEmail(req); // Obtiene el usuario
    console.log(response);
    if (response.status) {
      let usuariodb = response.data;
      if (!usuariodb) {
        return res.status(500).json({
          ok: false,
          message: 'Error: No existe el usuario.',
        });
      }
      if (md5(body.contrasena) != usuariodb.contrasena) {
        return res.status(500).json({
          ok: false,
          message: 'Error: Contraseña incorrecta.',
        });
      }
      if (!usuariodb.activo) {
        return res.status(500).json({
          ok: false,
          message: 'Error: Debe confirmar su dirección de correo electrónico, para iniciar sesión.',
        });
      }
      req.body = usuariodb;
      let token = jwt.sign(
        {
          usuario: usuariodb,
        },
        process.env.SEED,
        {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        }
      );
      if (response.status && response.data) {
        return res.json({
          status: true,
          data: {
            usuario: response.data,
            token,
          },
          message: 'Inicio de sesión correcto',
        });
      }
      return res.status(500).json({
        status: false,
        message: 'Error: Usuario o contraseña incorrectos',
      });
    } else
      res.status(500).json({
        status: false,
        message: 'Error: No existe el usuario.',
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: error,
      message: 'Error: No se pudo iniciar sesión',
    });
  }
}
