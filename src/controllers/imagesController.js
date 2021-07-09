/*jshint esversion: 6 */
import fs from "fs";
import path from "path";
import gm from 'gm';
import {
  getUserByIdOrEmail,
  updateUser,
} from "../controllers/usuariosController";


/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function existImage
 * @description Verifica que la imagen exista o retorna una imagen por defecto
 * @param {Request} [req] Request de la petición HTTP
 * @param {Response} res Response de la petición HTTP
 * @returns {object} Retorna de respuesta al cliente en formato FILE
 */
export async function existImage(req, res) {
  let img = req.params.img;
  let tipo = req.params.tipo;
  let pathImagen = path.resolve(__dirname, `${process.env.IMAGES_PATH}/${tipo}/${img}`);

  if (
    fs.existsSync(pathImagen)
  ) {
    res.sendFile(pathImagen);
  } else {
    let noimagepath = path.resolve(__dirname, process.env.IMAGES_PATH + `/${tipo}/` + "no-image.jpg");
    res.sendFile(noimagepath);
  }
}

export async function updateImgeUser(req, res) {
  let id = req.params.id;
  let tipo = req.params.tipo;
  tipo = tipo ? tipo : 'usuario';

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se ha seleccionado ningún archivo",
      },
    });
  }

  let archivo = req.files.archivo;
  let nombreCortado = archivo.name.split(".");
  let extension = nombreCortado[nombreCortado.length - 1];

  // Extensiones permitidas
  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message:
          "Las extensiones permitidas son " + extensionesValidas.join(", "),
        ext: extension,
      },
    });
  }

  let nombreArchivo = `${id}.${extension}`;
  let pathImagen = path.resolve(__dirname, `${process.env.IMAGES_PATH}/${tipo}/${nombreArchivo}`);
  borraArchivo(pathImagen, 'usuario');
  gm(archivo.data)
  .resize(200, 200, '@')
  .thumb(250, 250, pathImagen, 40, 'center', function(err, data) {
      if (err) {
        return res.status(500).json({
                ok: false,
                err: {
                  message: "Error al actualizar",
                  err: err,
                },
              });
      }
    
  })
  .write(pathImagen, function(err) {
    if (err) {
      return res.status(500).json({
              ok: false,
              err: {
                message: "Error al actualizar",
                err: err,
              },
            });
    }
    return imagenUsuario(id, res, nombreArchivo);
  
})

}

export async function imagenUsuario(id, res, nombreArchivo) {
  let req = {
    body: {
      id,
    },
    params: {
      id
    },
  };
  let usuario = await getUserByIdOrEmail(req);
  if (!usuario.data) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Usuario no existe",
      },
    });
  }

  req = {
    body: {
      id,
      imagenurl: nombreArchivo
    },
    params: {
      id
    },
  };
  return res.json(await updateUser(req));
}

export async function borraArchivo(nombreImagen, tipo = 'usuario') {
  let pathImagen = path.resolve(
    __dirname,
    `${process.env.IMAGES_PATH}/${tipo}/${nombreImagen}`
  );
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen);
  }
}
