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
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Grupo Manzanares S.A.S.</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h1>Grupo Manzanares S.A.S.</h1>
        <p>Vereda Río Frío, Anillo Vial Girón–Floridablanca, Km 2, Finca El Cerro</p>
        <p>Floridablanca, Santander, Colombia</p>
        <p>Tel: +57 320 4494890</p>
        <p>Email: tics@gmanzanares.com</p>
        <p>NIT: 8001685338</p>
        <p>Empresa dedicada al beneficio animal, producción ganadera y comercialización de productos agroindustriales.</p>
      </body>
    </html>
  `);
});