import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Recolector from "./Recolector.js";
import Finca from "./Finca.js";
import FincaLote from "./FincaLote.js";
import Variedad from "./Variedad.js";
import TiposRecoleccion from "./TiposRecoleccion.js";
import Cosecha from "./Cosecha.js";


const Recoleccion = db.define('Recoleccion', {
    prefijo: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true, // Este campo es parte de la clave primaria
    },

    id: {
        type: DataTypes.DECIMAL(16, 0),   
        allowNull: false,
        primaryKey: true, // Este campo es parte de la clave primaria
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    lote: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },


    jornal: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false,  
    },

    kg: {
        type: DataTypes.DECIMAL(16, 2), 
        allowNull: false,
    },

    precio: {
        type: DataTypes.DECIMAL(17, 2),  
        allowNull: false,  
    },

    total: {
        type: DataTypes.DECIMAL(17, 2), 
        allowNull: false,  
    },

    observacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    
    habilitado:{
        type: DataTypes.BOOLEAN, 
        defaultValue: 1  
    },

    sincronizado:{
        type: DataTypes.BOOLEAN, 
        defaultValue: 0  
    },

    fechasincronizacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    ordenPago:{
        type: DataTypes.BOOLEAN, 
        allowNull: true,
        defaultValue: 0
    },

    orden: {
        type: DataTypes.DECIMAL(16, 0), 
        allowNull: true
    },

    maquina: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usuarioMod: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    timestamps: true
});

Recoleccion.belongsTo(Cosecha, { foreignKey: 'cosecha' })
Recoleccion.belongsTo(Recolector, { foreignKey: 'nit' })
Recoleccion.belongsTo(Finca, { foreignKey: 'finca' })


Recoleccion.belongsTo(FincaLote, {
    foreignKey: {
        name: 'finca', // Usamos 'finca' como clave foránea
        allowNull: false,
    },
    targetKey: 'finca', // Especificamos la clave primaria de FincaLote para la finca
    constraints: false // Indicamos que la clave es compuesta
});


Recoleccion.belongsTo(Variedad, { foreignKey: 'variedad' })
Recoleccion.belongsTo(TiposRecoleccion, { foreignKey: 'tipoRecoleccion' })

export default Recoleccion;


