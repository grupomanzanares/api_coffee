import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Banco from "./Banco.js";
import TiposContrato from "./TiposContrato.js";
import TiposIdentificacion from "./TiposIdentificacion.js";

const Recolector = db.define('Recolector', {
    nit: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    nombre1: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    nombre2: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    apellido1: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    apellido2: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    rut:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1   // 1 = activo, 0 = inactivo
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1 // 1 = activo, 0 = inactivo
    },
    observacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    cuentaBancaria: {
        type: DataTypes.STRING(45),
        allowNull: true
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

Recolector.belongsTo(Banco, { foreignKey: 'banco' })
Recolector.belongsTo(TiposContrato, { foreignKey: 'tipoContrato' })
Recolector.belongsTo(TiposIdentificacion, { foreignKey: 'tipoIdentificacion' })

export default Recolector;

