import { DataTypes } from "sequelize";
import db from "../../../config/db.js";



const ActCategoria = db.define('ActCategorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1  
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    usuarioMod: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});

export default ActCategoria;

