import { DataTypes } from "sequelize";
import db from "../config/db.js";
import TiposIdentificacion from "./TiposIdentificacion.js";

const Trabajador = db.define('Trabajadores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nit: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
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
    timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});


Trabajador.belongsTo(TiposIdentificacion, { foreignKey: 'tipoIdentificacion' })

export default Trabajador;

