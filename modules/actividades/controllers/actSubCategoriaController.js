    import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { ActCategoria, ActSubCategoria } from '../models/ActRelations.js';
const entity = "ActSubCategoria"

const getActSubCategorias = async (req, res) =>{
    try {
        const registros = await ActSubCategoria.findAll({
            where: {habilitado: true},
            include: [
                {
                    model: ActCategoria, as: 'categoria',
                    attributes: ["nombre"]
                } 
            ]
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getActSubCategoria = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await ActSubCategoria.findOne({
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

const createActSubCategoria = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await ActSubCategoria.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}

const deleteActSubCategoria = async(req, res) =>{
    try {
        const { id } = req.params
        //console.log(id)

        const response = await ActSubCategoria.update({habilitado: false}, {
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

const updateActSubCategoria = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await ActSubCategoria.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await ActSubCategoria.findByPk(id);

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
    getActSubCategorias,
    getActSubCategoria,
    createActSubCategoria,
    deleteActSubCategoria,
    updateActSubCategoria
}