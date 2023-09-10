/*jshint esversion: 6 */
import Direcciones from '../model/direccion';

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAllByUserId
 * @description Obtiene todos las direcciones apartir de el id del usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta ,
      message: ""
    }
*/
export async function getAllByUserId(req, res) {
  try {
    let UserId = req.body.UserId ? req.body.UserId : req.params.UserId;
    let respuesta;
    console.log(UserId);

    if (UserId == '-1') {
      respuesta = await Direcciones.findAll({ where: { idusuario: null } });
    } else {
      respuesta = await Direcciones.findAll({ where: { idusuario: UserId } });
    }

    console.log(respuesta);

    const RESPONSE = { status: true, data: respuesta };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);

    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: No se pudo obtener la información',
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getById
 * @description Obtiene una dirreción a partir del id
 * @param {string} idDireccion Id de la dirección
 * @param {boolean} defaultDirecction dirección por defecto?
 * @param {string} UserId Id del usuario


 * @returns {object} Retorna de respuesta una direccion
*/
export async function getById(idDireccion, defaultDirecction, UserId) {
  try {
    if (defaultDirecction == true) {
      return await Direcciones.findOne({
        where: { default: defaultDirecction, idusuario: UserId },
      });
    } else {
      return await Direcciones.findOne({ where: { id: idDireccion } });
    }
  } catch (error) {
    return error;
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getDetails
 * @description Obtiene el detalle de una dirección de un usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function getDetails(req, res) {
  try {
    let idDireccion = req.body.idDireccion ? req.body.idDireccion : req.params.idDireccion;
    let direccion = await getById(idDireccion);
    const RESPONSE = { status: true, data: { direccion } };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: No se pudo obtener la información',
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getDefaultDireccionDetails
 * @description Obtiene el detalle de una dirección de un usuario (por defecto)
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function getDefaultDireccionDetails(req, res) {
  let UserId = req.body.UserId ? req.body.UserId : req.params.UserId;
  try {
    let direccion = await getById('', true, UserId);
    const RESPONSE = { status: true, data: { direccion } };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: No se pudo obtener la información',
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function create
 * @description Permite crear una dirección
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
  let { idusuario, descripcion, latitud, longitud, defaultDireccion, calle, numero, colonia, municipio, entidadfed, pais, referencia } = req.body;

  try {
    //Si actualiza la direccion como predeterminada (cambia todas las otras a default: false)
    if (defaultDireccion) {
      await setNotDefaultByUserId(idusuario);
    }

    let newDireccion = await Direcciones.create({
      idusuario: idusuario ? idusuario : '',
      descripcion: descripcion ? descripcion : '',
      latitud: latitud ? latitud : '',
      longitud: longitud ? longitud : '',
      default: defaultDireccion,
      calle: calle ? calle : '',
      numero: numero ? numero : '',
      colonia: colonia ? colonia : '',
      municipio: municipio ? municipio : '',
      entidadfed: entidadfed ? entidadfed : '',
      pais: pais ? pais : '',
      referencia: referencia ? referencia : '',
    });
    if (newDireccion) {
      const RESPONSE = {
        status: true,
        message: 'Dirección creada correctamente',
        data: newDireccion,
      };
      return res.json(RESPONSE);
    }
  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: 'Error: La dirección no pudo ser creada',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function update
 * @description Actualiza la información de una dirección
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
  let response = await updateDireccion(req);
  if (response.status) res.json(response);
  else res.status(500).json(response);
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function updateDireccion
 * @description Actualiza la información de una dirección
 * @param {Request} req Request de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function updateDireccion(req) {
  try {
    let id = req.body.id ? req.body.id : req.params.id;
    const { idusuario, descripcion, latitud, longitud, defaultDireccion, calle, numero, colonia, municipio, entidadfed, pais, referencia } = req.body;
    //Si actualiza la direccion como predeterminada (cambia todas las otras a default: false)
    if (defaultDireccion) {
      await setNotDefaultByUserId(idusuario);
    }
    const direcciones = await Direcciones.findAll({
      attributes: [
        'id',
        'idusuario',
        'descripcion',
        'latitud',
        'longitud',
        'default',
        'calle',
        'numero',
        'colonia',
        'municipio',
        'entidadfed',
        'pais',
        'referencia',
      ],
      where: {
        id,
      },
    });
    if (direcciones.length > 0) {
      console.log({
        id,
        idusuario,
        descripcion,
        latitud,
        longitud,
        default: defaultDireccion,
        calle,
        numero,
        colonia,
        municipio,
        entidadfed,
        pais,
        referencia,
      });

      direcciones.forEach(async direccionRow => {
        await direccionRow.update({
          id,
          idusuario,
          descripcion,
          latitud,
          longitud,
          default: defaultDireccion,
          calle,
          numero,
          colonia,
          municipio,
          entidadfed,
          pais,
          referencia,
        });
      });
    }
    const RESPONSE = {
      status: true,
      data: direcciones,
    };
    return RESPONSE;
  } catch (error) {
    console.log(error);

    const RESPONSE = {
      status: false,
      message: 'Error: Could not update',
      data: error,
    };
    return RESPONSE;
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function setNotDefaultByUserId
 * @description Actualiza todas las direcciones de un usuario a default: false
 * @param {string} UserId id del usuario
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function setNotDefaultByUserId(UserId) {
  try {
    const direcciones = await Direcciones.findAll({
      attributes: ['id', 'idusuario', 'default'],
      where: {
        idusuario: UserId,
      },
    });
    if (direcciones.length > 0) {
      direcciones.forEach(async direccionRow => {
        await direccionRow.update({
          default: false, //Establece todas las direcciones del usuario como false
        });
      });
    }
    const RESPONSE = {
      status: true,
      data: direcciones,
    };
    console.log(direcciones);

    return RESPONSE;
  } catch (error) {
    console.log(error);

    const RESPONSE = {
      status: false,
      message: 'Error: No se pudo actualizar',
      data: error,
    };
    return RESPONSE;
  }
}

export async function deleteDirection(req, res) {
  let id = req.body.id ? req.body.id : req.params.id;

  console.log(id);

  try {
    let default_direccion = await getById(id, false, '');
    if (default_direccion == null) {
      return res.json({
        status: false,
        message: 'No existe la dirección',
      });
    }
    if (default_direccion.default) {
      return res.json({
        status: false,
        message: 'No puede eliminar la dirección predeterminada',
      });
    }
    const direccion = await Direcciones.destroy({ where: { id } });
    res.json({
      status: true,
      message: direccion >= 1 ? 'Se eliminó la dirección correctamente' : 'La dirección no existe',
    });
  } catch (error) {
    return res.json({
      status: false,
      message: 'No puede eliminar la dirección',
    });
  }
}
