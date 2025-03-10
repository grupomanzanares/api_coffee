import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import Programacion from "../models/Programacion.js";
import { Sucursal } from "../models/ActRelations.js";
import User from "../../../auth/models/User.js";


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
                } 
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

const createProgramacion = async (req, res) => {
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

const updateProgramacion = async (req, res) => {
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

export{
    getProgramaciones,
    getProgramacion,
    createProgramacion,
    deleteProgramacion,
    updateProgramacion
}