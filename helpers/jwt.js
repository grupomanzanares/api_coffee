import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

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