import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const ProgramacionTrabajador = db.define('programacion_trabajadores', {
    programacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Programaciones',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    trabajadorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    usuarioMod: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sincronizado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    fecSincronizacion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    freezeTableName: true
});

export default ProgramacionTrabajador;
