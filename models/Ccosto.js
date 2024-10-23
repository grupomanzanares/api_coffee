import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ccosto = db.define('Ccosto', {
    ccosto: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    estado:{
        type: DataTypes.STRING(1), 
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

export default Ccosto;

//mirar si se puede quitar el Id, sino dejarlo