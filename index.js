import express from "express";
import cors from "cors";
import db from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import storageRoutes from './routes/storageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tipoContratoRoutes from './routes/tipoContratoRoutes.js'
import tipoIdentificacionRoutes from './routes/tipoIdentificacionRoutes.js'
import tipoRecoleccionRoutes from './routes/tipoRecoleccionRoutes.js'
import bancoRoutes from './routes/bancoRoutes.js'
import cosechaRoutes from './routes/cosechaRoutes.js'
const app = express();

app.use(cors());

// Habilitar express.json para parsear JSON
app.use(express.json());

// Conexión a la base de datos y eliminación de índices duplicados
async function syncDatabase() {
  try {
    const [results] = await db.query("SHOW INDEX FROM users WHERE Key_name LIKE 'email%'");
    
    const duplicateIndexes = results.filter(index => index.Key_name !== 'email');
    
    const dropIndexPromises = duplicateIndexes.map(index =>
      db.query(`ALTER TABLE users DROP INDEX ${index.Key_name}`)
    );
    
    await Promise.all(dropIndexPromises);
    await db.sync({ alter: true });  // Asegúrate de tener las tablas actualizadas
    console.log('Tablas sincronizadas sin índices duplicados');
  } catch (e) {
    console.error('Error al sincronizar tablas:', e);
  }
}

syncDatabase();

// Rutas
app.use('/users', userRoutes);
app.use('/storage', storageRoutes);
app.use('/auth', authRoutes);
app.use('/tiposcontrato', tipoContratoRoutes);
app.use('/tiposidentificacion', tipoIdentificacionRoutes);
app.use('/tiposrecoleccion', tipoRecoleccionRoutes);
app.use('/bancos', bancoRoutes);
app.use('/cosechas', cosechaRoutes);

// Configurar puerto y levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

// Ruta principal
app.get('/', (req, res) => {
  res.send("Hola mundo desde Express");
});
