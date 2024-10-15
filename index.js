import express from "express";
import cors from "cors";
import db from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import storageRoutes from './routes/storageRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Crear la app
const app = express();

// Habilitar cors
app.use(cors());

// Habilitar express.json para parsear JSON
app.use(express.json());

// Conexión a la base de datos y eliminación de índices duplicados
db.query("SHOW INDEX FROM users WHERE Key_name LIKE 'email%'")
.then(([results]) => {
  const duplicateIndexes = results.filter(index => index.Key_name !== 'email');  // Filtra los índices duplicados
  const dropIndexPromises = duplicateIndexes.map(index =>
    db.query(`ALTER TABLE users DROP INDEX ${index.Key_name}`)  // Elimina cada índice duplicado
  );
  return Promise.all(dropIndexPromises);  // Espera a que se eliminen todos los índices
  })
  .then(() => {
    return db.sync();  // Sincroniza la base de datos sin duplicar índices
    })
    .then(() => {
      console.log('Tablas sincronizadas sin índices duplicados');
    })
    .catch((e) => {
      console.error('Error al sincronizar tablas', e);
    });

// Rutas
app.use('/users', userRoutes);
app.use('/storage', storageRoutes);
app.use('/auth', authRoutes);

// Configurar puerto y levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

// Ruta principal
app.get('/', function(req, res) {
  res.send("Hola mundo desde Express");
});
