import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

import Sucursal from "./Sucursal.js";
import User from "../../../auth/models/User.js";

const SucursalUsuario = db.define('SucursalUsuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    sucursalId: {
        type: DataTypes.INTEGER,
        references: {
            model: Sucursal,
            key: 'id'
        },
        allowNull: false
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    freezeTableName: true
});

// Relaciones
User.belongsToMany(Sucursal, { through: SucursalUsuario, foreignKey: 'userId', as: 'sucursales' });
Sucursal.belongsToMany(User, { through: SucursalUsuario, foreignKey: 'sucursalId', as: 'usuarios' });

export default SucursalUsuario;
