/*jshint esversion: 6 */
import {} from '../config/config';

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getCurrentVersion
 * @description Obtiene todas las categorias con el atributo {activo: true}
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
 */
export async function getCurrentVersion(req, res) {
  try {
    const RESPONSE = { status: true, version: process.env.APPVERSION };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: No se pudo obtener la información.',
    };
    return res.status(500).json(RESPONSE);
  }
}
