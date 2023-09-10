/*jshint esversion: 6 */
import Request from 'request';
import {} from '../config/config';
import fs from 'fs';
import ejs from 'ejs';

export async function enviarEmail(opcionesEmail) {
  try {
    const urlToSend = `${process.env.SendEmailURL}`;
    Request.post(
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: urlToSend,
        form: opcionesEmail,
      },
      error => {
        if (error) {
          return console.log(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function Htmlrender
 * @description PRUEBA Mostrar un detalle de pedido ( enviado por email)
 * compila el archivo y lo trasforma a html configura los datos para envio de email 
 * @param {any} req REQuest con el params con idPedido
 * @param {any} res response

 */
export async function Htmlrender(req, res) {
  try {
    let idPedido = req.body.idPedido ? req.body.idPedido : req.params.idPedido;
    let html = await CreateHtmlpedido(idPedido);
    res.end(html);
  } catch (error) {
    console.log(error);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function CreateHtmlpedido
 * @description Crea el HTML para enviar el mensaje de detalle de pedido 
 * compila el archivo y lo trasforma a html configura los datos para envio de email 
 * @param {string} idPedido id de pedido
 * @param {boolean} test test o no si es test no envia el email y retorna un html (true no envia)

 */
export async function CreateHtmlpedido(idPedido) {
  try {
    const req = {
      params: {
        idPedido,
      },
      body: {
        idPedido,
      },
    };
    console.log('IDPEDIDOOO', req);
    // getOneOrderDetail(req, true).then( async function (RESPONSE) {
    //   let pedido = RESPONSE.data[0];
    //   console.log("PEDIDOOO",pedido);
    //   console.log("DETALLEPEDIDOOO",pedido.dataValues.detallepedidos);

    //   let opciones = {
    //       archivo: 'pedido',
    //       subject: 'Nuevo Pedido No. '+ pedido.folio,
    //       usuario: pedido.dataValues.usuario[0]
    //   };

    //   //Leer archivo email
    //   const archivo = __dirname +  `/../views/email/${opciones.archivo}.ejs`;
    //   //compilarlo
    //   const compilado =  ejs.compile(fs.readFileSync(archivo, 'utf8'));
    //   //crear HTML
    //   const html =  compilado({
    //       pedido
    //   });
    //       //configurar opciones
    //   const opcionesEmail = {
    //     from: "Abastos del rio <noreply@geniuscode.mx>",
    //     email: opciones.usuario.correoele,
    //     asunto: opciones.subject,
    //     html,
    //   };
    //   if (!test) {
    //     let sendEmailRes = await enviarEmail(opcionesEmail);
    //     console.log('Mensaje enviado', sendEmailRes);
    //   }
    //   return html;
    // }).catch(function(error) {
    //   console.log(error);
    // })
  } catch (error) {
    console.log(error);
  }
}

/**
 * @author Felipe De Jesus 
 * @version 0.0.1
 * @function CreateHtmlSignIn
 * @description Despues de crear el usuario se llama a este metodo ek cual lee un archivo de configuración
 * compila el archivo y lo trasforma a html configura los datos para envio de email 
 * @param {any} opciones opciones
 {
        usuario: newUser,
        url, 
        subject: 'Confirma tu cuenta Abastos del rio',
        archivo: 'confirmar-cuenta'
      }
 */
export async function CreateHtmlSignIn(opciones) {
  try {
    //Leer archivo email
    const archivo = __dirname + `/../views/email/${opciones.archivo}.ejs`;
    //compilarlo
    const compilado = ejs.compile(fs.readFileSync(archivo, 'utf8'));
    //crear HTML
    const html = compilado({
      url: opciones.url,
    });
    //configurar opciones
    const opcionesEmail = {
      from: 'Abastos del rio <noreply@geniuscode.mx>',
      email: opciones.usuario.correoele,
      asunto: opciones.subject,
      html,
    };
    let sendEmailRes = await enviarEmail(opcionesEmail);
    console.log('Mensaje enviado', sendEmailRes);
  } catch (error) {
    console.log(error);
  }
}
