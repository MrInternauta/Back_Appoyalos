/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../config/database";

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define('donacion', {
    iddonacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idproductos: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'productos',
        },
        key: 'idproductos'
      }
    },
    id_usuario_beneficiario: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'usuarios',
        },
        key: 'idusuarios'
      }
    },
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'donacion'
  });
};
const MODELO =  modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;