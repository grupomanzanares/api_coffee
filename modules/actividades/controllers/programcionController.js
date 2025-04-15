import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import Programacion from "../models/Programacion.js";
import { sequelize, Actividad, Sucursal } from "../models/ActRelations.js";
import User from "../../../auth/models/User.js";
import Prioridad from "../../administracion/models/Prioridad.js";
import Estado from "../../administracion/models/Estado.js";
import Finca from "../../../models/Finca.js";


const entity = "Programacion"

const getProgramaciones = async (req, res) =>{
    try {
        const registros = await Programacion.findAll({
            where: {habilitado: true},
            include: [
                {
                    model: Sucursal, as: 'sucursal',
                    attributes: ["nombre"]
                },
                {
                    model: User, as: 'responsable',
                    attributes: ["name"]
                },
                {
                    model: Prioridad, as: 'prioridad',
                    attributes: ["nombre"]
                },

                {
                    model: Estado, as: 'estado',
                    attributes: ["nombre"]
                },
                {
                    model: Finca, as: 'finca',
                    attributes: ["nombre"]
                },
                {
                    model: Actividad, as: 'actividad',
                    attributes: ["nombre"]
                },
            ],


        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getProgramacion = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await Programacion.findOne({
            where: {
                id: id,
                habilitado: true
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

const createProgramacion_ = async (req, res) => {
    
    try {
        const body = matchedData(req);

        console.log(body)

        const registro = await Programacion.create(body);
        res.status(201).send(registro); // 201 indica creación exitosa
    } catch (error) {
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        console.error( `Error al crear ${entity}: `, error);
        handleHttpError(res,  `No se pudo crear ${entity}, intenta nuevamente`, statusCode);
    }
};


const createProgramacion = async (req, res) => {
    let transaction;
    try {
        const { trabajadores, ...programacionData } = matchedData(req);
        transaction = await sequelize.transaction();

        // Crear la programación
        const nuevaProgramacion = await Programacion.create(programacionData, { transaction });

        // Crear trabajadores si vienen
        if (Array.isArray(trabajadores) && trabajadores.length > 0) {
            const registrosTrabajadores = trabajadores.map(t => ({
                programacionId: nuevaProgramacion.id,
                trabajadorId: t.trabajadorId,
                usuario: programacionData.usuario,
                usuarioMod: programacionData.usuarioMod
            }));

            await ProgramacionTrabajador.bulkCreate(registrosTrabajadores, { transaction });
        }

        await transaction.commit();
        res.status(201).json(nuevaProgramacion);

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en createProgramacion:", error);
        handleHttpError(res, `No se pudo crear ${entity}`);
    }
};




const updateProgramacion = async (req, res) => {
    let transaction;
    try {
        const { id } = req.params;
        const { trabajadores, ...programacionData } = req.body;

        transaction = await sequelize.transaction();

        const updateResult = await Programacion.update(programacionData, {
            where: { id },
            transaction
        });

        if (updateResult[0] === 0) {
            await transaction.rollback();
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios `
            });
        }

        // Si vienen trabajadores, borrar y volver a insertar
        if (Array.isArray(trabajadores)) {
            await ProgramacionTrabajador.destroy({
                where: { programacionId: id },
                transaction
            });

            if (trabajadores.length > 0) {
                const nuevos = trabajadores.map(t => ({
                    programacionId: id,
                    trabajadorId: t.trabajadorId,
                    usuario: programacionData.usuario,
                    usuarioMod: programacionData.usuarioMod
                }));
                await ProgramacionTrabajador.bulkCreate(nuevos, { transaction });
            }
        }

        await transaction.commit();

        const actualizada = await Programacion.findByPk(id);
        res.status(200).json({
            message: `${entity} actualizada correctamente`,
            data: actualizada
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en updateProgramacion:", error);
        handleHttpError(res, `No se pudo actualizar ${entity}`);
    }
};

const updateProgramacion_ = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await Programacion.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await Programacion.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actuaizar ${entity} `)
        console.error(error)
    }
}



const deleteProgramacion = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await Programacion.update({habilitado: false}, {
            where: {id, habilitado: true}
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


export{
    getProgramaciones,
    getProgramacion,
    createProgramacion,
    deleteProgramacion,
    updateProgramacion
}