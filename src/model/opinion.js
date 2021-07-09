/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../config/database";

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define('opinion', {
    idopinion: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idproductos: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'productos',
        },
        key: 'idproductos'
      }
    },
    id_usuarios: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'usuarios',
        },
        key: 'idusuarios'
      }
    },
    comentario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    calificacion: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'opinion'
  });
};
const MODELO =  modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;