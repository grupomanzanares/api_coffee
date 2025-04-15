import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const Programacion = db.define('Programaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    programacion: {  
        type: DataTypes.INTEGER, 
        allowNull: true
    },
    
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lote: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    trabajador: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    jornal: {
        type: DataTypes.NUMERIC(16, 2),
        allowNull: true
    },
    cantidad: {
        type: DataTypes.NUMERIC(16, 2),
        allowNull: false
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    sincronizado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    fecSincronizacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    observacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    signo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
    maquina: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    usuarioMod: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});

// Hook afterCreate para actualizar el campo programacion con el id generado
// Programacion.afterCreate(async (instance) => {
//     if (instance.signo === 1) {
//         instance.programacion = instance.id;
//         await instance.save();  // Guarda la actualización en la base de datos
//     }
// });


export default Programacion;