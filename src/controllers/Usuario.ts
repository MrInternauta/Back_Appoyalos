import { Request, Response } from 'express';
import { StatusCodes } from '../helpers/StatusCodes';
import { JWT_DATA } from '../configs/Config';
import UsuarioModel from '../model/usuarios';
import bcrypt from 'bcrypt';
import { SEQUELIZE_CONFIG } from '../configs/Database';
import { QueryTypes } from 'sequelize';
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
export async function getAll(req: Request, res: Response) {
  try {
    const respuesta = await UsuarioModel.findAll();
    const RESPONSE = {
      ok: true,
      data: respuesta,
    };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      ok: false,
      message: 'No se pudieron obtener los usuarios',
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getOne
 * @description Obtiene un usuario por el id o correo electronico
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
    status: true | false,
    data: respuesta,
    message: ""
    }
*/
export async function getOne(req: Request, res: Response) {
  const response = await getUserByIdOrEmail(req);
  if (response.ok) res.json(response);
  else res.status(StatusCodes.BAD_REQUEST).json(response);
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
export async function create(req: Request, res: Response) {
  const { curp, apellidopat, apellidomat, nombre, correo, telefono, fechanac, genero, idsocket } = req.body;
  let { imagenurl, idtipouser, contrasena } = req.body;
  const activo = true;
  imagenurl = 'default.png'; // Imagen por defecto
  idtipouser = 1;
  try {
    contrasena = bcrypt.hashSync(contrasena, JWT_DATA.SALTROUNDS);
    const request = { body: { curp, correo } };
    const responseUser = await getUserByIdOrEmail(request);
    if (responseUser.ok) {
      if (responseUser.data != null) return res.status(StatusCodes.BAD_REQUEST).json({ ok: false, message: 'La curp o el correo ya existe.' });
    }
    const newUser = await UsuarioModel.create({
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
        ok: true,
        message: 'Usuario creado correctamente',
        data: newUser,
      };
      return res.json(RESPONSE);
    }
  } catch (error) {
    console.log(error);
    const RESPONSE = {
      ok: false,
      message: 'El usuario no pudo ser creado',
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RESPONSE);
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
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const usuario = await UsuarioModel.destroy({ where: { idusuarios: id } });
    let RESPONSE;
    if (usuario <= 0) {
      RESPONSE = {
        ok: false,
        message: 'No existe usuario',
      };
      return res.status(StatusCodes.BAD_REQUEST).json(RESPONSE);
    }
    RESPONSE = {
      ok: true,
      message: 'Usuario eliminado correctamente',
    };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      ok: false,
      message: 'No pudo ser eliminado',
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RESPONSE);
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
export async function update(req: Request, res: Response) {
  const response = await updateUser(req);
  if (response.ok) res.json(response);
  else res.status(StatusCodes.BAD_REQUEST).json(response);
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
export async function updateUser(req: Request) {
  try {
    const id = req.body.id ? req.body.id : req.params.id;
    const { curp, contrasena, apellidopat, apellidomat, nombre, imagenurl, correo, telefono, fechanac, genero, idtipouser, idsocket, activo } =
      req.body;
    const idusuarios = id;
    const usuarios = await UsuarioModel.findAll({
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
        ok: true,
        data: usuarios[0],
        message: 'Usuario actualizado correctamente',
      };
    } else {
      RESPONSE = {
        ok: false,
        message: 'No existe el usuario',
      };
    }

    return RESPONSE;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el usuario',
    };
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUserByIdOrEmail(req: Request | any) {
  try {
    const id = req.params ? req.params.id : '';
    const correo = req.body ? req.body.correo : '';
    const curp = req.body ? req.body.curp : '';
    let respuesta;
    const usuarios = await SEQUELIZE_CONFIG.query(
      'SELECT * FROM usuarios WHERE idusuarios = :id OR correo = :correo OR  correo = :curp OR curp = :correo OR  curp = :curp',
      {
        replacements: {
          id: id ? id : '',
          correo: correo ? correo.toLowerCase() : '',
          curp: curp ? curp.toLowerCase() : '',
        },
        type: QueryTypes.SELECT,
      }
    );

    usuarios.forEach(data => {
      respuesta = data;
    });
    let RESPONSE;
    if (usuarios.length > 0) {
      RESPONSE = {
        ok: true,
        data: respuesta,
      };
    } else {
      RESPONSE = {
        ok: false,
        message: 'No existe el usuario',
      };
    }
    return RESPONSE;
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo obtener el usuario',
    };
  }
}
