/*jshint esversion: 6 */
import DIRECCIONES from './direccion';

import USUARIOS from './usuarios';
import CATEGORIAS from './categorias';
import PRODUCTOS from './productos';
import TIPOUSUARIOS from './tiposusuarios';
import Sequelize from 'sequelize';

// USUARIOS - DIRECCIONES
USUARIOS.hasMany(DIRECCIONES, {
  foreignKey: {
    name: 'idusuarios',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sourceKey: 'idusuarios',
});
DIRECCIONES.belongsTo(USUARIOS, {
  foreignKey: {
    name: 'idusuarios',
    type: Sequelize.INTEGER,
  },
});

// USUARIOS - tiposusuarios
TIPOUSUARIOS.hasOne(USUARIOS, {
  foreignKey: {
    name: 'idusuarios',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sourceKey: 'idtipouser',
});
USUARIOS.belongsTo(TIPOUSUARIOS, {
  foreignKey: {
    name: 'idtipouser',
    type: Sequelize.INTEGER,
  },
});

// CATEGORIA - PRODUCTO
CATEGORIAS.hasOne(PRODUCTOS, {
  foreignKey: {
    name: 'idcategoria',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sourceKey: 'idcategorias',
});
PRODUCTOS.belongsTo(CATEGORIAS, {
  foreignKey: {
    name: 'idcategorias',
    type: Sequelize.INTEGER,
  },
});
