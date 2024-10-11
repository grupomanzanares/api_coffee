

const apiAuth = (req, res, next) =>{
    try {
        const { token } =  req.headers
        if (token === 'apikey-valido-1234') {
            next()
        }else{
            res.status('401')
            res.send({error: 'No estas autorizado...'})
        }
    } catch (error) {
        res.status('401')
        res.send({error: 'Ocurrio un error en el header...'})
    }
}

export{
    apiAuth
}