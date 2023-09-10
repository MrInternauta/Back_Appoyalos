/* jshint indent: 2 */

/* jshint indent: 2 */
import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIG } from '../config/database';

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define(
    'productos',
    {
      idproductos: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      imagenurl: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      existencia: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      idcategorias: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'categorias',
          },
          key: 'idcategorias',
        },
      },
      id_usuario: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'usuarios',
          },
          key: 'idusuarios',
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      tableName: 'productos',
    }
  );
};

const MODELO = modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;
