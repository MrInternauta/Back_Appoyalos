/*jshint esversion: 6 */

import Usuarios from '../model/usuarios';
import { md5 } from '../helpers/helpers';
import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIG } from '../config/database';
import { CreateHtmlSignIn } from './emailController';
import ejs from 'ejs';
import fs from 'fs';

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAll
 * @description Obtiene todos los usuarios
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
    const respuesta = await Usuarios.findAll();
    const RESPONSE = {
      status: true,
      data: respuesta,
    };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      status: false,
      message: 'Error: No se pudieron obtener los usuarios',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getOne
 * @description Obtiene un usuario por el id o correo electronico o por usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function getOne(req, res) {
  let response = await getUserByIdOrEmail(req);
  if (response.status) res.json(response);
  else res.status(500).json(response);
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function create
 * @description Permite crear un usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function create(req, res) {
  let { curp, contrasena, apellidopat, apellidomat, nombre, imagenurl, correo, telefono, fechanac, genero, idtipouser, idsocket } = req.body;
  let activo = true;
  imagenurl = 'default.png'; // Imagen por defecto
  idtipouser = 1;
  try {
    contrasena = md5(contrasena);
    let request = { body: { curp, correo } };
    let responseUser = await getUserByIdOrEmail(request);
    if (responseUser.status) {
      if (responseUser.data != null)
        return res.status(500).json({
          ok: false,
          message: 'Error: La curp o el correo ya existe.',
        });
    }
    let newUser = await Usuarios.create({
      curp,
      contrasena,
      apellidopat,
      apellidomat,
      nombre,
      correo,
      genero,
      idtipouser,
      idsocket,
      imagenurl: !imagenurl ? '' : imagenurl,
      telefono: !telefono ? '' : telefono,
      fechanac: !fechanac ? '' : fechanac,
      activo,
    });
    if (newUser) {
      const RESPONSE = {
        status: true,
        message: 'Usuario creado correctamente',
        data: newUser,
      };
      // Envio de correo de confirmación
      const url = `http://${req.headers.host}/api/usuarios/confirmar-cuenta/${newUser.correo}`;
      await CreateHtmlSignIn(
        {
          usuario: newUser,
          url,
          subject: "Confirma tu cuenta 'Appoyalos'",
          archivo: 'confirmar-cuenta',
        },
        req
      );
      return res.json(RESPONSE);
    }
  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: 'Error: El usuario no pudo ser creado',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function remove
 * @description Elimina un usuario por idUsuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function remove(req, res) {
  try {
    const { id } = req.params;
    const usuario = await Usuarios.destroy({ where: { idusuarios: id } });
    const RESPONSE = {
      status: true,
      message: usuario <= 0 ? 'No existe usuario' : 'Usuario eliminado correctamente',
    };

    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      status: false,
      message: 'Error: No pudo ser eleminados',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function update
 * @description Actualiza la información de un usuario por idUsuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function update(req, res) {
  let response = await updateUser(req);
  if (response.status) res.json(response);
  else res.status(500).json(response);
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function update
 * @description Actualiza la información de un usuario por idUsuario
 * @param {Request} req Request de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function updateUser(req) {
  try {
    let id = req.body.id ? req.body.id : req.params.id;
    const { curp, contrasena, apellidopat, apellidomat, nombre, imagenurl, correo, telefono, fechanac, genero, idtipouser, idsocket, activo } =
      req.body;
    let idusuarios = id;

    const usuarios = await Usuarios.findAll({
      where: {
        idusuarios,
      },
    });
    usuarios.forEach(async usuario => {
      await usuario.update({
        idusuarios,
        curp,
        contrasena,
        apellidopat,
        apellidomat,
        nombre,
        imagenurl,
        correo,
        telefono,
        fechanac,
        genero,
        idtipouser,
        idsocket,
        activo,
      });
    });
    let RESPONSE;
    if (usuarios.length > 0) {
      RESPONSE = {
        status: true,
        data: usuarios[0],
        message: 'Usuario actualizado correctamente',
      };
    } else {
      RESPONSE = {
        status: false,
        message: 'No existe el usuario',
      };
    }

    return RESPONSE;
  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: 'Error: No se pudo actualizar el usuario',
      data: error,
    };
    return RESPONSE;
  }
}

/**
 * @author Felipe De Jesus
 * @version 0.0.1
 * @function getUserByIdOrEmail
 * @description Obtiene un usuario por id, correoele, usuario
 * @param {Request} req Request de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON
 */
export async function getUserByIdOrEmail(req) {
  try {
    console.log(req);
    const id = req.params ? req.params.id : '';
    const correo = req.body ? req.body.correo : '';
    const curp = req.body ? req.body.curp : '';
    let respuesta;
    let usuarios = await SEQUELIZE_CONFIG.query(
      'SELECT * FROM usuarios WHERE idusuarios = :id OR correo = :correo OR  correo = :curp OR curp = :correo OR  curp = :curp',
      {
        replacements: {
          id: id ? id : '',
          correo: correo ? correo.toLowerCase() : '',
          curp: curp ? curp.toLowerCase() : '',
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    usuarios.map(data => {
      respuesta = data;
    });
    let RESPONSE;
    if (usuarios.length > 0) {
      RESPONSE = {
        status: true,
        data: respuesta,
        message: 'Usuario obtenido correctamente',
      };
    } else {
      RESPONSE = {
        status: false,
        message: 'No existe el usuario',
      };
    }

    return RESPONSE;
  } catch (error) {
    const RESPONSE = {
      status: false,
      message: 'No se pudo obtener el usuario',
      data: error,
    };
    return RESPONSE;
  }
}

/**
 * @author Felipe De Jesus
 * @version 0.0.1
 * @function confirmarEmail
 * @description Verificar que el usuario existe, (si no existe redireccionar)
 * Si existe redireccionar y mostrar mensaje de confirmación y cambiar el estado del usuario a activo
 * @param {Request} req Request de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON
 */
export async function confirmarEmail(req, res) {
  try {
    const correo = req.params ? req.params.email : '';

    let respuesta;
    let usuario = await SEQUELIZE_CONFIG.query('SELECT * FROM usuarios WHERE correo = :correo OR  curp = :correo', {
      replacements: {
        correo: correo ? correo.toLowerCase() : '',
      },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (usuario.length < 1) {
      //Leer archivo email
      const archivo = __dirname + `/../views/email/correo-noexiste.ejs`;
      //compilarlo
      const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
      //crear HTML
      const html = compilado();
      return res.send(html);
    }
    usuario.map(data => {
      respuesta = data;
    });
    // Cambia el estado a activo
    respuesta.activo = true;
    await updateUser({
      body: respuesta,
    });

    const archivo = __dirname + `/../views/email/correo-confirmado.ejs`;
    //compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
    //crear HTML
    const html = compilado();
    return res.send(html);
  } catch (error) {
    const RESPONSE = {
      status: false,
      message: 'Error: No se pudo obtener enviar el correo',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}
