import { DataTypes } from 'sequelize';
import db from '../../config/db.js'; // Ajusta la ruta si tu configuración de db es diferente

const coffeTrace = db.define('coffe_trace', {
    batche: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    cosecha: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    finca: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nFinca: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    op: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    producto: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    nproducto: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    variedad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nvariedad: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    remision: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    destino: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    ndestino: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    bultos_entrada: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    },
    kilos_entrada: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    },
    entrada: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    bultos_venta: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    },
    kilos_venta: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    },
    bultos_saldo: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    },
    kilos_saldo: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: true,
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

export default coffeTrace;
