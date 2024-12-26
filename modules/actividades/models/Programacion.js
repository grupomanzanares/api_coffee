import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const Programacion = db.define('Programaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lote: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    jornal: {
        type: DataTypes.NUMERIC(16, 2),
        allowNull: true
    },
    cantidad: {
        type: DataTypes.NUMERIC(18, 4),
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
    maquina: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    usuario: {
        type: DataTypes.STRING(15),
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

export default Programacion;