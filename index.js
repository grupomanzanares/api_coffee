import express from "express"

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
    });


app.get('/', function(req,res){
        res.send("hola mundo desde express");
        })
