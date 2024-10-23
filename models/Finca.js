import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Finca = db.define('Finca', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sigla: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    ccosto: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 0   // 1 = activo, 0 = inactivo
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioMod: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
});

export default Finca;


//ccosto llave forane con Ccostos