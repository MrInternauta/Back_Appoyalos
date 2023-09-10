import { Request, Response } from 'express';
import { StatusCodes } from '../helpers/StatusCodes';
import { JWT_DATA } from '../configs/Config';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../model/usuarios';
import bcrypt from 'bcrypt';

export const Home = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    ok: false,
    message: 'Recurso no encontrado',
  });
};

export const Hello = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    ok: true,
    message: 'Hello World',
  });
};

export const Bye = (req: Request, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    ok: false,
    message: 'Bye World',
  });
};

export const loginNormal = async (req: Request, res: Response) => {
  //Obtener los valores enviados por el usuario
  const body: { email: string; password: string } = req.body;
  try {
    if (!body.email || !body.password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        message: 'Debe ingresar todos los datos',
      });
    }
    //Obtener usuario
    const usuariodb = await UsuarioModel.findOne({
      where: {
        correo: body.email,
      },
    });
    const isValid = usuariodb instanceof UsuarioModel;
    if (!usuariodb && isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }
    const valid_password = bcrypt.compareSync(body.password, usuariodb?.getDataValue('contrasena'));
    if (!valid_password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }
    const TOKEN = jwt.sign({ usuario: usuariodb }, JWT_DATA.JWB_SEED, {
      expiresIn: JWT_DATA.CADUCIDAD_TOKEN,
    });
    return res.json({
      ok: true,
      data: TOKEN,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      message: 'No se pudo iniciar sesión',
    });
  }
};
