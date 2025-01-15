import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import SucursalUsuario from "../models/SucursalUsuario.js";



const entity = "Estado"

const getSucursalUsuarios = async (req, res) =>{
    try {
        const registros = await SucursalUsuario.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getSucursalUsuario = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await Estado.findOne({
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

const createSucursalUsuario = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await SucursalUsuario.create(body)
        res.send(response)
    } catch (error) {
        handleHttpError(res, `No se pudo crear ${entity}`);
        console.error(error)
    }
}

const deleteSucursalUsuario = async(req, res) =>{
    try {
        const { id } = req.params


        const response = await SucursalUsuario.update({habilitado: false}, {
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

const updateSucursalUsuario = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await SucursalUsuario.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await Estado.findByPk(id);

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
    getSucursalUsuarios,
    getSucursalUsuario,
    createSucursalUsuario,
    deleteSucursalUsuario,
    updateSucursalUsuario
}