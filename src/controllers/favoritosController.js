/*jshint esversion: 6 */
import Favoritos from '../model/favorito';

import { Sequelize } from 'sequelize';

import { SEQUELIZE_CONFIG } from '../config/database';
/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAllByUserId
 * @description Obtiene todos los favoritos apartir de el id del usuario
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta ,
      message: ""
    }
*/

export async function comprobar(req) {
  let idProducto = req.body.idProducto ? req.body.idProducto : req.params.idProducto;
  let UserId = req.usuario.id;

  try {
    let favoritosRows = await SEQUELIZE_CONFIG.query(
      'SELECT P.id = F.idproducto as isFavorit from productos as P left join  favoritos as F on P.id = F.idproducto  where F.idusuario = :idusuario AND F.idproducto = :idproducto ',
      {
        replacements: {
          idusuario: UserId,
          idproducto: idProducto,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    console.log('Fav', favoritosRows);

    const RESPONSE = {
      status: true,
      data: favoritosRows,
    };
    return RESPONSE;
  } catch (error) {
    console.log(error);

    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: error al traer la información del usuario',
    };
    return RESPONSE;
  }
}

export async function getAllByUserId(req, res) {
  try {
    let UserId = req.body.UserId ? req.body.UserId : req.params.UserId;

    let favoritosRows = await SEQUELIZE_CONFIG.query(
      'SELECT P.* from productos as P inner join  favoritos as F on P.id = F.idproducto  where F.idusuario = :idusuario ',
      {
        replacements: {
          idusuario: UserId,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const RESPONSE = {
      status: true,
      data: favoritosRows,
    };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);

    const RESPONSE = {
      status: false,
      data: error,
      message: 'Error: error al traer la información del usuario',
    };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function create
 * @description Permite agregar un producto a favoritos
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
  let { idusuario, idproducto } = req.body;
  try {
    let newFavorito = await Favoritos.create({
      idusuario,
      idproducto,
    });
    const RESPONSE = {
      status: true,
      message: 'Producto agregado a favoritos.',
      data: newFavorito,
    };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);
    let RESPONSE = {
      status: false,
      message: 'El producto no pudo ser agregado a favoritos.',
      data: error,
    };
    if (error.name == 'SequelizeUniqueConstraintError') {
      RESPONSE.message = 'El producto ya fue agregado a favoritos.';
    }
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function delete
 * @description Elimina la un producto de favoritos
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta,
      message: ""
    }
*/
export async function destroy(req, res) {
  let { idusuario, idproducto } = req.body;
  console.log({ idusuario, idproducto });

  try {
    let favoritos = await Favoritos.findAll({
      where: {
        idusuario,
        idproducto,
      },
    });
    if (favoritos.lengh <= 0) {
      const RESPONSE = {
        status: false,
        message: 'Este producto no forma parte de sus  favoritos',
      };
      return res.status(500).json(RESPONSE);
    }
    let favoritoBorrado = await Favoritos.destroy({
      where: {
        idusuario,
        idproducto,
      },
    });
    const RESPONSE = {
      status: true,
      message: 'Eliminado correctamente de favoritos',
      data: favoritoBorrado,
    };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: 'No pudo ser borrado de favoritos correctamente',
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}
