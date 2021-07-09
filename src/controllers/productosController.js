/*jshint esversion: 6 */
import Productos from '../model/productos';
// import { getAllByProductId } from '../controllers/unidadesMedidaController';
// import { getAllClasiByProductId } from '../controllers/clasificacionController';
// import { getAllOptionClasiByClasiId } from '../controllers/opcionesclasificacionController';
import { comprobar } from './favoritosController';

import {
  Sequelize
} from 'sequelize';

import {
  SEQUELIZE_CONFIG
} from '../config/database';

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAll
 * @description Obtiene todos los productos con {activo: true} sin importar el id de categoria
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta ,
      message: ""
    }
*/
export async function getAll(req, res) {
  try {
    let productos = await SEQUELIZE_CONFIG.query('SELECT P.* FROM productos as P', {
      replacements: {
      },
      type: Sequelize.QueryTypes.SELECT
    });
    if (productos.length) {
      const RESPONSE = { status: true, data: productos, message: 'Productos obtenidos correctamente' };
      return res.json(RESPONSE);
    }
    const RESPONSE = { status: false, message: 'No existen productos' };
    return res.json(RESPONSE);
  } catch (error) {
    console.log(error);
    const RESPONSE = { status: false, data: error, message: 'Error: No se pudieron obtener los productos' };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getAllByCategoria
 * @description Obtiene todos los productos con {activo: true} y apartir de el id de categoria
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
 * {
      status: true | false,
      data: respuesta ,
      message: ""
    }
*/
export async function getAllByCategoria(req, res) {
  try {
    let categoriaId = req.body.categoriaId ? req.body.categoriaId : req.params.categoriaId;
    let productos = await SEQUELIZE_CONFIG.query('SELECT P.* FROM productos as P LEFT JOIN categorias as C on P.idcategorias = C.idcategorias WHERE c.idcategorias =  :parameter', {
      replacements: {
        parameter: categoriaId.toString()
      },
      type: Sequelize.QueryTypes.SELECT
    });
    if (productos.length) {
      const RESPONSE = { status: true, data: productos, message: 'Productos obtenidos correctamente' };
      return res.json(RESPONSE);
    }
    const RESPONSE = { status: false, message: 'No existen productos' };
    return res.json(RESPONSE);
  } catch (error) {
    const RESPONSE = { status: false, data: error, message: 'Error: No se pudieron obtener los productos' };
    return res.status(500).json(RESPONSE);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getById
 * @description Obtiene un producto con {activo: true} y apartir de el id del producto
 * @param {string} idProducto Id del producto
 * @returns {object} Retorna de respuesta un producto attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagenurl']
*/
export async function getById(idProducto) {
  try {
    return await Productos.findOne(
      { where: { idproductos: idProducto } }
    );
  } catch (error) {
    return error;
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getDetailsProduct
 * @description Obtiene el detalle { unidadesMedida, clasificacion }  apartir del idProducto
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato JSON 
*/
export async function getDetailsProduct(idProducto) {
  try {
    let producto = await getById(idProducto);
    if (producto) {
      const RESPONSE = { status: true, data: producto, message: 'Producto obtenido correctamente' };
      return RESPONSE;
    }
    const RESPONSE = { status: false, message: 'No existe el producto' };
    return RESPONSE;
  } catch (error) {
    const RESPONSE = { status: false, data: error, message: 'Error: No se pudo obtener el producto' };
    return (RESPONSE);
  }
}


/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function getDetails
 * @description Obtiene el detalle { unidadesMedida, clasificacion }  apartir del idProducto
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
    let idProducto = req.body.idProducto ? req.body.idProducto : req.params.idProducto;
    // let isFavorit = await comprobar(req, res);
    const RESPONSE = await getDetailsProduct(idProducto);
    // if (RESPONSE.data.producto != undefined) {
    //   RESPONSE.data.producto.dataValues.isFavorit = isFavorit.data[0] == undefined ? false : true;
    // }
    return res.json(RESPONSE);

  } catch (error) {
    console.log(error);
    const RESPONSE = { status: false, data: error, message: 'Error: No se pudo obtener el producto' };
    return res.status(500).json(RESPONSE);
  }
}

export async function findProducts(req, res) {
  try {
    let parameter = req.body.parameter ? req.body.parameter : req.params.parameter;
    parameter = '%' + parameter + '%';
    let productos = await SEQUELIZE_CONFIG.query('SELECT P.* FROM productos as P inner join categorias as C on P.idcategorias = C.idcategorias WHERE  P.nombre LIKE :parameter  OR P.descripcion LIKE :parameter  OR C.nombre LIKE :parameter ', {
      replacements: {
        parameter: parameter.toString()
      },
      type: Sequelize.QueryTypes.SELECT
    });
    if (productos.length) {
      const RESPONSE = { status: true, data: productos, message: 'Productos obtenidos correctamente' };
      return res.json(RESPONSE);
    }
    const RESPONSE = { status: false, message: 'No existen productos' };
    return res.json(RESPONSE);


  } catch (error) {
    console.log(error);

    const RESPONSE = { status: false, data: error, message: 'Error: No se pudieron obtener los productos' };
    return res.status(500).json(RESPONSE);
  }
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
  let {
    nombre,
    descripcion,
    imagenurl,
    existencia,
    idcategorias,
    id_usuario
  } = req.body;

  imagenurl = 'default.png'; // Imagen por defecto
  try {
    let newProduct = await Productos.create({
      nombre,
      descripcion,
      imagenurl,
      existencia,
      idcategorias,
      id_usuario
    });

    if (newProduct) {
      const RESPONSE = {
        status: true,
        message: "Producto creado correctamente",
        data: newProduct,
      };
      return res.json(RESPONSE);
    }

  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: "Error: El producto no pudo ser creado",
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}


/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function update
 * @description Permite actualizar un producto
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
  let {
    idproductos,
    nombre,
    descripcion,
    imagenurl,
    existencia,
    idcategorias,
    id_usuario,
    activo
  } = req.body;

  try {
    let productos = await Productos.findOne({
      where: { idproductos }
    });
    let productupdated;
    console.log(productos);
    // productos.forEach(async producto => {
      productupdated = await productos.update({
        idproductos,
        nombre,
        descripcion,
        imagenurl,
        existencia,
        idcategorias,
        id_usuario,
        activo
      });
    // });
    if (!productos) {
      const RESPONSE = {
        status: false,
        message: "No se encontro el producto",
      };
      return res.json(RESPONSE);
    }

    const RESPONSE = {
      status: true,
      message: "Producto actualizado correctamente",
      data: productupdated,
    };
    return res.json(RESPONSE);


  } catch (error) {
    console.log(error);
    const RESPONSE = {
      status: false,
      message: "Error: El producto no pudo ser actualizado",
      data: error,
    };
    return res.status(500).json(RESPONSE);
  }
}

