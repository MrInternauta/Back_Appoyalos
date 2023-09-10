// ============================
//  PORT
// ============================
export const SERVER_PORT: string = '5000';

// ============================
//  JWT (JSON WEB TOKEN)
// ============================
export const JWT_DATA = {
  //duration (segundo * mitutos * horas * dias || HR)
  CADUCIDAD_TOKEN: '48hr',
  // SEED de autenticacion(Clave secreta)
  JWB_SEED: 'ClaveSecreta',
  //Vueltas de la encriptacion
  SALTROUNDS: 10,
};

// ============================
//  BASE DE DATOS
// ============================
export const DB_DATA = {
  database: 'appoyalos',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
};
