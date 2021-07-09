import { Sequelize } from 'sequelize';
import {DB_DATA} from './Config'

/**
 * @author Felipe De Jesus
 * @version 1.0.0
 * @description Conection at the DB with Sequelize
 */
const CONECTION_DB: Sequelize = new Sequelize(
        DB_DATA.database,
        DB_DATA.username,
        DB_DATA.password,
        {
            host: DB_DATA.host,
            port: DB_DATA.port,
            dialect: 'mysql',
            define: {
                timestamps: false
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: false
        }
);
export const SEQUELIZE_CONFIG = CONECTION_DB;
