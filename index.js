import express from "express";
import cors from "cors";
import db from "./config/db.js";

/***
 * Rutas 
 */
import userRoutes from './auth/routes/userRoutes.js';
import authRoutes from './auth/routes/authRoutes.js';

import storageRoutes from './routes/storageRoutes.js';



import sucursalRoutes from './modules/administracion/routes/sucursalRoutes.js';
import sucursalUsuarioRoutes from './modules/administracion/routes/sucursalUsuarioRoutes.js';

import estadoRoutes from './modules/administracion/routes/estadoRoutes.js';
import prioridadRoutes from './modules/administracion/routes/prioridadRoutes.js';
import unidadRoutes from './modules/administracion/routes/unidadRoutes.js';
import ActCategoriaRoutes from './modules/actividades/routes/ActCategoriaRoutes.js';
import ActSubCategoriaRoutes from './modules/actividades/routes/ActSubCategoriaRoutes.js';
import ActividadRoutes from './modules/actividades/routes/ActividadRoutes.js';


import ProgramacionRoutes from './modules/actividades/routes/ProgramacionRoutes.js';

import ProgramacionTrabajadoresRoutes from './modules/actividades/routes/ProgramacionTrabajadoresRoutes.js';

import tipoContratoRoutes from './routes/tipoContratoRoutes.js'
import tipoIdentificacionRoutes from './routes/tipoIdentificacionRoutes.js'
import tipoRecoleccionRoutes from './routes/tipoRecoleccionRoutes.js'
import bancoRoutes from './routes/bancoRoutes.js'
import cosechaRoutes from './routes/cosechaRoutes.js'
import ccostosRoutes from './routes/ccostosRoutes.js';
import fincaRourter from './routes/fincaRoutes.js'
import fincaloteRourter from './routes/fincalotesRoutes.js'
import variedadRoutes from './routes/variedadRoutes.js'
import recolectorRoutes from './routes/recolectorRoutes.js'
import recoleccionRoutes from './routes/recoleccionRoutes.js'
import consecutivoRoutes from './routes/consecutivoRoutes.js'
import maquinaRoutes from './routes/maquinaRoutes.js'
import trabajadorRoutes from './routes/trabajadorRoutes.js'
import rolRoutes from './auth/routes/rolRoutes.js'
import coffeeTraceRoutes from './modules/coffee/coffeeTraceRoutes.js'

/*** Crear app   */
const app = express();

/*** Habilitar CORS para todas las rutas   */
app.use(cors());

// Habilitar express.json para parsear JSON
/*** Conexión a la base de datos y eliminación de índices duplicados  */
app.use(express.json());


/*** Conexión a la base de datos y eliminación de índices duplicados  */
//Conexion a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.info('Conexion exitosa a la base de datos')
} catch (error) {
  console.log(error)
}

/*** Rutas  */
app.use('/users', userRoutes);
app.use('/storage', storageRoutes);
app.use('/auth', authRoutes);
app.use('/tiposcontrato', tipoContratoRoutes);
app.use('/tiposidentificacion', tipoIdentificacionRoutes);
app.use('/tiposrecoleccion', tipoRecoleccionRoutes);
app.use('/bancos', bancoRoutes);
app.use('/cosechas', cosechaRoutes);
app.use('/ccosto', ccostosRoutes)
app.use('/finca', fincaRourter)
app.use('/fincalote', fincaloteRourter)
app.use('/recolector', recolectorRoutes)
app.use('/variedad', variedadRoutes)
app.use('/recoleccion', recoleccionRoutes)
app.use('/consecutivo', consecutivoRoutes)
app.use('/maquina', maquinaRoutes)
app.use('/sucursal', sucursalRoutes)
app.use('/sucursalUsuario', sucursalUsuarioRoutes)
app.use('/act-categoria', ActCategoriaRoutes)
app.use('/act-subcategoria', ActSubCategoriaRoutes)
app.use('/actividad', ActividadRoutes)
app.use('/estado', estadoRoutes)
app.use('/prioridad', prioridadRoutes)
app.use('/programacion', ProgramacionRoutes)
app.use('/trabajador', trabajadorRoutes)
app.use('/programacion_trabajadores', ProgramacionTrabajadoresRoutes)

// kk
app.use('/unidad', unidadRoutes)
app.use('/rol', rolRoutes)


/**  Rutas de coffee Trace */
app.use('/coffeetrace', coffeeTraceRoutes)


/***
 * Configurar puerto y levantar servidor....
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

/***
 * Ruta principal....
 */


app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-Agent: FacebookBot\nCrawl-delay: 5');
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Meta básica -->
        <title>Grupo Manzanares S.A.S.</title>
        <meta name="description" content="Grupo Manzanares S.A.S. es una empresa dedicada al beneficio animal, producción ganadera y comercialización de productos agroindustriales en Santander, Colombia.">
        <meta name="author" content="Grupo Manzanares S.A.S.">

        <!-- Open Graph para Facebook / Meta -->
        <meta property="og:title" content="Grupo Manzanares S.A.S." />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content="https://gmanzanares.com.co" />
        <meta property="og:description" content="Empresa dedicada al beneficio animal, producción ganadera y comercialización de productos agroindustriales." />
        <meta property="og:locale" content="es_CO" />

        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 40px;
            color: #333;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2a5d84;
          }
          p {
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Grupo Manzanares S.A.S.</h1>
          <p><strong>Dirección:</strong> Vereda Río Frío, Anillo Vial Girón–Floridablanca, Km 2, Finca El Cerro</p>
          <p><strong>Ciudad:</strong> Floridablanca, Santander, Colombia</p>
          <p><strong>Teléfono:</strong> +57 320 4494890</p>
          <p><strong>Email:</strong> tics@gmanzanares.com</p>
          <p><strong>NIT:</strong> 8001685338</p>
          <p><strong>Actividad económica:</strong> Empresa dedicada al beneficio animal, producción ganadera y comercialización de productos agroindustriales.</p>
        </div>
      </body>
    </html>
  `);
});