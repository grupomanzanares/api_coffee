import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import Programacion from "../models/Programacion.js";
import { sequelize, Actividad, Sucursal, ProgramacionTrabajador,Trabajador } from "../models/ActRelations.js";
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
                {
                    model: ProgramacionTrabajador,
                    as: 'trabajadores',
                    attributes: [],
                    include: [
                        {
                            model: Trabajador,
                            as: 'trabajador',
                            attributes: ['id', 'nit', 'nombre']
                        }
                    ]
                }
            ],


        });


          // Transformar la estructura para que 'trabajadores' sea un arreglo de objetos con id, nit y nombre
        const resultado = registros.map(programacion => {
            const trabajadores = programacion.trabajadores.map(pt => pt.trabajador);
            return {
            ...programacion.toJSON(),
            trabajadores
            };
        });
        res.json(resultado)
    }catch (error){
        console.error('Error al obtener programaciones:', error);
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

        const nuevaProgramacion = await Programacion.create(programacionData, { transaction });

        console.log  ("idprogramacion", nuevaProgramacion.id)
        // Asigna el mismo ID si signo === 1
        if (nuevaProgramacion.signo === 1) {
            await Programacion.update(
                { programacion: nuevaProgramacion.id },
                { where: { id: nuevaProgramacion.id }, transaction }
            );
        }

        // Agregar trabajadores si se reciben
        if (Array.isArray(trabajadores) && trabajadores.length > 0) {
            const datosTrabajadores = trabajadores.map(t => ({
                programacionId: nuevaProgramacion.id,
                trabajadorId: t.trabajadorId,
                usuario: programacionData.usuario,
                usuarioMod: programacionData.usuarioMod
            }));
            await ProgramacionTrabajador.bulkCreate(datosTrabajadores, { transaction });
        }

        await transaction.commit();
        res.status(201).json(nuevaProgramacion);

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en createProgramacion:", error);
        handleHttpError(res, `No se pudo crear Programación`);
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
                message: `Programación no encontrada o sin cambios`
            });
        }

        // Si signo = 1 y programacion está en null, actualizamos programacion = id
        if (programacionData.signo === 1) {
            await Programacion.update(
                { programacion: id },
                { where: { id }, transaction }
            );
        }

        

        // Actualizar trabajadores si se reciben
        if (Array.isArray(trabajadores)) {
            await ProgramacionTrabajador.destroy({
                where: { programacionId: id },
                transaction
            });

            if (trabajadores.length > 0) {
                const nuevosTrabajadores = trabajadores.map(t => ({
                    programacionId: id,
                    trabajadorId: t.trabajadorId,
                    usuario: programacionData.usuario,
                    usuarioMod: programacionData.usuarioMod
                }));
                await ProgramacionTrabajador.bulkCreate(nuevosTrabajadores, { transaction });
            }
        }

        await transaction.commit();

        const actualizada = await Programacion.findByPk(id);
        res.status(200).json({
            message: `Programación actualizada correctamente`,
            data: actualizada
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en updateProgramacion:", error);
        handleHttpError(res, `No se pudo actualizar Programación`);
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



const setProgramacionTrabajadores = async (req, res) => {
    let transaction;
    try {
        const { programacionId, trabajadores } = req.body;

        transaction = await sequelize.transaction();

        // Eliminar asociaciones existentes
        await ProgramacionTrabajador.destroy({
            where: { programacionId },
            transaction
        });

        // Agregar nuevas asociaciones
        if (Array.isArray(trabajadores) && trabajadores.length > 0) {
            const nuevosTrabajadores = trabajadores.map(t => ({
                programacionId,
                trabajadorId: t.trabajadorId,
                usuario: t.usuario,
                usuarioMod: t.usuarioMod
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
    getProgramaciones,
    getProgramacion,
    createProgramacion,
    deleteProgramacion,
    updateProgramacion,
    setProgramacionTrabajadores
}