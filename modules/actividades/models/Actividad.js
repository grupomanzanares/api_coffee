import { DataTypes } from "sequelize";
import db from "../../../config/db.js";



const Actividad = db.define('Actividades', {
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
    controlPorLote: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    controlPorTrabajador: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1  
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    usuarioMod: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    unidadId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subCategoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});


export default Actividad;