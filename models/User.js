import { DataTypes } from "sequelize";
import db from "../config/db.js";

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    estado: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 0  // 0 = activo, 1 = eliminado
    }
}, {
    timestamps: true
});

export default User;
