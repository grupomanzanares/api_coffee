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
        allowNull: false
    },
    nombre2: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    apellido1: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING(60),
        allowNull: false
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
        allowNull: false
    },
    cuentaBancaria: {
        type: DataTypes.STRING(45),
        allowNull: false
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

Recolector.belongsTo(Banco, { foreignKey: 'banco' })
Recolector.belongsTo(TiposContrato, { foreignKey: 'tipoContrato' })
Recolector.belongsTo(TiposIdentificacion, { foreignKey: 'tipoIdentificacion' })

export default Recolector;

//llaves foraneas
//[TipoIdentificacionId] [int] NOT NULL,  (llave con tiposIdentificacion)
//[TipoContratoId] [int] NOT NULL,  (llave con tiposContrato)
//[BancoId] [int] NOT NULL,   (llave con bancos)


// CREATE TABLE [dbo].[Recolectores](
// 	[Nit] [varchar](15) NOT NULL,
// 	[TipoIdentificacionId] [int] NOT NULL,  (llave con tiposIdentificacion)
// 	[Nombre] [varchar](60) NULL,
// 	[Nombre1] [varchar](45) NULL,
// 	[Nombre2] [varchar](45) NULL,
// 	[Apellido1] [varchar](45) NULL,
// 	[Apellido2] [varchar](45) NULL,
// 	[Rut] [bit] NULL,
// 	[Habilitado] [bit] NULL,
// 	[TipoContratoId] [int] NOT NULL,  (llave con tiposContrato)
// 	[Observacion] [varchar](100) NULL,
// 	[BancoId] [int] NOT NULL,   (llave con bancos)
// 	[CuentaBancaria] [varchar](45) NULL,
// 	[Usuario] [varchar](15) NULL,
// 	[FecRegistro] [datetime] NULL,
// 	[UsuarioMod] [varchar](15) NULL,
// 	[FecRegistroMod] [datetime] NULL,
// PRIMARY KEY CLUSTERED 
// (
// 	[Nit] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
// ) ON [PRIMARY]

// GO

// SET ANSI_PADDING OFF
// GO

// ALTER TABLE [dbo].[Recolectores]  WITH CHECK ADD FOREIGN KEY([BancoId])
// REFERENCES [dbo].[Bancos] ([Id])
// GO

// ALTER TABLE [dbo].[Recolectores]  WITH CHECK ADD FOREIGN KEY([TipoContratoId])
// REFERENCES [dbo].[TiposContrato] ([Id])
// GO

// ALTER TABLE [dbo].[Recolectores]  WITH CHECK ADD FOREIGN KEY([TipoIdentificacionId])
// REFERENCES [dbo].[TiposIdentificacion] ([Id])
// GO

