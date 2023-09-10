/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModelOptions, Sequelize, ModelCtor, Model, ModelAttributes } from 'sequelize';
import { SEQUELIZE_CONFIG } from '../configs/Database';
const TABLE_NAME = 'usuarios';

const modelo = function Modelo(sequelize: Sequelize, DataTypes: any): ModelCtor<Model> {
  const modelOption: ModelOptions = {
    tableName: TABLE_NAME,
  };

  const atributesTable: ModelAttributes<Model, any> = {
    idusuarios: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    fechanac: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    imagenurl: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    genero: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    apellidomat: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    apellidopat: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    curp: {
      type: DataTypes.STRING(18),
      allowNull: true,
    },
    idtipouser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'tiposusuarios',
        },
        key: 'idtipouser',
      },
    },
    idsocket: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
  };
  return sequelize.define(TABLE_NAME, atributesTable, modelOption);
};

const MODELO = modelo(SEQUELIZE_CONFIG, Sequelize);
export default MODELO;
