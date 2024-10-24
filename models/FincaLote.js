import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Ccosto from './Ccosto.js';
import Finca from "./Finca.js";


const FincaLote = db.define('FincaLote', {

	finca: {
		type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Finca,
            key: 'id'
        }
    },
    lote: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true
    },
	ccosto: {
        type: DataTypes.STRING(15),
        allowNull: false,
        references: {
            model: Ccosto,
            key: 'ccosto'
        }
    },

    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    area: {
		type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
	plantas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100),
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
    timestamps: true,
    indexes:[
        {
            unique: true,
            fields: ['finca', 'lote']
        }
    ]
});

FincaLote.belongsTo(Ccosto, { foreignKey: 'ccosto' });
// FincaLote.belongsTo(Finca, {foreignKey: 'id'})

export default FincaLote;


//LLave foranea con fincas
//llave foranea con ccosto

//Primarikey:  finca-lote


