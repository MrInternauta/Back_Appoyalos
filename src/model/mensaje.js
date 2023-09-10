/* jshint indent: 2 */
/* jshint indent: 2 */
import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIG } from '../config/database';

const modelo = function Modelo(sequelize, DataTypes) {
  return sequelize.define(
    'mensaje',
    {
      idmensaje: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      idcanal: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: 'canal',
          },
          key: 'idcanal',
        },
      },
      mensaje: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'mensaje',
    }
  );
};
const MODELO = modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;
