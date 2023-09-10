import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_DATA } from '../configs/Config';
import { StatusCodes } from '../helpers/StatusCodes';

export const VerifyToken = (req: Request, res: Response, next: () => void) => {
  const TOKEN: string = req.get('token') || '';

  jwt.verify(TOKEN, JWT_DATA.JWB_SEED, (error, decoded) => {
    if (error || !decoded || (decoded && typeof decoded === 'string')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: 'Token no valido.',
      });
    }
    if (!instanceOfJwtPayload(decoded)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ok: false,
        message: 'Token no valido.',
      });
    }
    req.params.usuario = decoded?.usuario ? decoded?.usuario : null;
    next();
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfJwtPayload(object: any): object is JwtPayload {
  return 'usuario' in object;
}
