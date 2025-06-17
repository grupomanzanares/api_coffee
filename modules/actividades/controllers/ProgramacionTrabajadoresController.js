import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { sequelize, Actividad, Sucursal, ProgramacionTrabajador } from "../models/ActRelations.js";




const entity = "ProgramacionTrabajador"

const getProgramacionTrabajadores = async (req, res) =>{
    try {
        const registros = await ProgramacionTrabajador.findAll({
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getProgramacionTrabajador = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await ProgramacionTrabajador.findOne({
            where: {
                id: id
            }
        })
        if (!data){
            return res.status(404).json({
                message:  `${entity} no encontrado(a) ó inactivo (a) ` 
            })
        }
        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, `Error al traer ${entity}  ` )
        console.error(error)
    }
}



const deleteProgramacionTrabajador = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await ProgramacionTrabajador.update({habilitado: false}, {
            where: {id}
        })

        if(response === 0) {
            return res.status(404).json({
                message: `${entity} , no encontrado(a) y/o inactivo(a)` 
            })
        }

        res.status(200).json({
            message: `${entity} , eliminada con exito` 
        })
    } catch (error) {
        handleHttpError(res, `No se pudo eliminar ${entity} `   )
        console.error(error)
    }
}



const setProgramacionTrabajadores = async (req, res) => {
    console.log("ingresando a setProgramacionTrabajadores", req.body)
    let transaction;
    try {
        const { trabajadores } = req.body;
        const fechaActual = new Date();

        // Obtener todos los programacionId únicos del array de trabajadores
        const programacionIds = [...new Set(trabajadores.map(t => t.programacionId))];

        transaction = await sequelize.transaction();

        // Eliminar asociaciones existentes para todos los programacionId involucrados
        console.log("Eliminando registros de ProgramacionTrabajador con programacionIds:", programacionIds)
        const cantidadEliminada = await ProgramacionTrabajador.destroy({
            where: { programacionId: programacionIds },
            transaction
        });
        console.log(`Registros eliminados: ${cantidadEliminada}`);

        // Agregar nuevas asociaciones
        if (Array.isArray(trabajadores) && trabajadores.length > 0) {
            const nuevosTrabajadores = trabajadores.map(t => ({
                programacionId: t.programacionId, // Usar el programacionId de cada trabajador
                trabajadorId: t.trabajadorId,
                usuario: t.usuario,
                usuarioMod: t.usuarioMod,
                sincronizado: true,
                fecSincronizacion: fechaActual
            }));
            await ProgramacionTrabajador.bulkCreate(nuevosTrabajadores, { transaction });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Asociaciones de trabajadores actualizadas correctamente.' });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en updateProgramacionTrabajadores:", error);
        res.status(500).json({ message: 'Error al actualizar asociaciones de trabajadores.' });
    }
};

export{
    getProgramacionTrabajadores,
    getProgramacionTrabajador,
    deleteProgramacionTrabajador,
    setProgramacionTrabajadores
}