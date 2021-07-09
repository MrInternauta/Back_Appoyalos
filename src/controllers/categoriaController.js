/*jshint esversion: 6 */
import Categorias from "../model/categorias";

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAll
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
export async function getAll(req, res) {
  try {
    const respuesta = await Categorias.findAll();

    const RESPONSE = { status: true, data: respuesta };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);
    const RESPONSE = { status: false, data: error, message: "Error: No se pudo obtener la información." };
    return res.status(500).json(RESPONSE);
  }
}
