/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from "sequelize";
import { SEQUELIZE_CONFIG } from "../config/database";

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define('direccion', {
    iddireccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    pais: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    entidadfed: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    colonia: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    calle: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    numeroext: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    numeroint: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    referencia: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    latitud: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    longitud: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    idusuarios: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'usuarios',
        },
        key: 'idusuarios'
      }
    }
  }, {
    sequelize,
    tableName: 'direccion'
  });
};

const MODELO =  modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;