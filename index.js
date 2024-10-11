import express from "express"
import cors from "cors"
import db from "./config/db.js"
import userRoutes from './routes/userRoutes.js'
import storageRoutes from './routes/storageRoutes.js'

// crear la app
const app = express();

// habilitar cors
app.use(cors())

//
app.use(express.json())

// coneccion a db
db.sync({alter: true})
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((e) => {
    console.error('Error al sincronizar tablas', e)
  })

// rutas
app.use('/users', userRoutes)
app.use('/storage', storageRoutes)

// configurar puerto y levantar servidor
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
    });


app.get('/', function(req,res){
        res.send("hola mundo desde express");
        })
