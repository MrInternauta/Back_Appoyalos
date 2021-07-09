import { JWT_DATA } from '../configs/Config'
import bcrypt from 'bcrypt';
import {SEQUELIZE_CONFIG} from '../configs/Database'
import { QueryTypes } from 'sequelize';

/**
 * @author Felipe De Jesus
 * @version 1.0.0
 * @function generateContrasena
 * @description Encripta la contraseña
 * @param {string} contrasena contraseña sin encriptar
 * @returns {string} Retorna la contraseña encriptada
 */
export const generateContrasena = (contrasena: string) => bcrypt.hashSync(contrasena, Number(JWT_DATA.SALTROUNDS));

/**
 * @author Felipe De Jesus
 * @version 1.0.0
 * @function executeSelect
 * @description Ejectuta una sentencia SELECT de SQL
 * @param {string} sql Consulta
 * @param {any} remplace objeto con parametros de busqueda si aplica
 * @returns {Promise<any>} Retorna la promesa de la consulta
 */
export async function executeSelect(sql: string, remplace: any) {
    return SEQUELIZE_CONFIG.query(sql, {
        replacements: remplace,
        type: QueryTypes.SELECT
    });
}