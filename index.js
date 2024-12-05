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
import ActCategoriaRoutes from './modules/actividades/routes/ActCategoriaRoutes.js';
import ActSubCategoriaRoutes from './modules/actividades/routes/ActSubCategoriaRoutes.js';
import ActividadRoutes from './modules/actividades/routes/ActSubCategoriaRoutes.js';

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

/*** Crear app   */
const app = express();

/*** Habilitar CORS para todas las rutas   */
app.use(cors());  

// Habilitar express.json para parsear JSON
/*** Conexión a la base de datos y eliminación de índices duplicados  */
app.use(express.json());


/*** Conexión a la base de datos y eliminación de índices duplicados  */
async function syncDatabase() {
  try {
    const [results] = await db.query("SHOW INDEX FROM users WHERE Key_name LIKE 'email%'");
    
    const duplicateIndexes = results.filter(index => index.Key_name !== 'email');
    
    const dropIndexPromises = duplicateIndexes.map(index =>
      db.query(`ALTER TABLE users DROP INDEX ${index.Key_name}`)
    );
    
    await Promise.all(dropIndexPromises);
    await db.sync({ alter: true });  // Asegúrate de tener las tablas actualizadas
    //console.log('Tablas sincronizadas sin índices duplicados');
  } catch (e) {
    console.error('Error al sincronizar tablas:', e);
  }
}
syncDatabase();

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
app.use('/act-categoria', ActCategoriaRoutes)
app.use('/act-subcategoria', ActSubCategoriaRoutes)

/***
 * Configurar puerto y levantar servidor
 */  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

/***
 * Ruta principal
 */
app.get('/', (req, res) => {
  res.send("Hola mundo desde Silicon Valey");
});
