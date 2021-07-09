import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { JWT_DATA } from '../configs/Config';
import {StatusCodes} from '../helpers/StatusCodes'

export let VerifyToken = (req: Request, res: Response, next: Function) => {
  const TOKEN: string = req.get("token") || '';
  
  jwt.verify(TOKEN, JWT_DATA.JWB_SEED, (error, decoded) => {
    if (error) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        ok: false,
        message: 'Token no valido.'
      });
    }
      req.params.usuario = decoded && decoded.usuario ? decoded.usuario : null;
      next();
  });
};
