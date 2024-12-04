import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;
//No entiendo esto..
const tokenSign = async (user) => {
    const sign = await jwt.sign({
        _id : user._id,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    }
)
return sign;
}

//mirar si esto lo podemos quitar
const verifyToken = async (jwtToken) => {
    try {
        await jwt.verify(jwtToken, JWT_SECRET)
    } catch (error) {
        return null
    }
}

export {
    tokenSign,
    verifyToken
}