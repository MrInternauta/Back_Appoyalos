/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../config/database";

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define('tiposusuarios', {
    idtipouser: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tiposusuarios'
  });
};
const MODELO =  modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;