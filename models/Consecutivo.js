import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Consecutivo = db.define('Consecutivo', {
    prefijo: {
        type: DataTypes.STRING(2), 
        allowNull: false,
        primaryKey: true, // Hacemos que `prefijo` sea la clave primaria
    },
    descripcion: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    numero: {
        type: DataTypes.DECIMAL(16, 0),
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1,   // 1 = activo, 0 = inactivo
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuarioMod: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: true
});

export default Consecutivo;