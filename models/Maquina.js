import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Finca from './Finca.js';

const Maquina = db.define('Maquina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1  // 1 = activo, 0 = inactivo
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioMod: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: true
});

Maquina.belongsTo(Finca, { foreignKey: 'finca' });


export default Maquina;

