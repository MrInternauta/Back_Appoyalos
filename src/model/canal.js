/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../config/database";

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define('canal', {
    idcanal: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    usuario_remitente: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'usuarios',
        },
        key: 'idusuarios'
      }
    },
    usuario_receptor: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'usuarios',
        },
        key: 'idusuarios'
      }
    },
    iddonacion: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'donacion',
        },
        key: 'iddonacion'
      }
    }
  }, {
    sequelize,
    tableName: 'canal'
  });
};

const MODELO =  modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;