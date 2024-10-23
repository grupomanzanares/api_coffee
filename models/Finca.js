import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Ccosto from './Ccosto.js';

const Finca = db.define('Finca', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sigla: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    ccosto: {
        type: DataTypes.STRING(15),
        allowNull: false,
        references: {
            model: Ccosto,
            key: 'ccosto'
        }
    },
    municipio: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    habilitado:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 0   // 1 = activo, 0 = inactivo
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

Finca.belongsTo(Ccosto, { foreignKey: 'ccosto' });

export default Finca;


//ccosto llave forane con Ccostos