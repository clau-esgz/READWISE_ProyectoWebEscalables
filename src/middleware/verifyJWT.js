const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/usuario");
 
const validateJWT = async (req = request, res = response, next) => {
    console.log("Entrando a validateJWT");
    let token = req.header("Authorization");
 
    if(!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
 
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
 
    console.log('Token received in validateJWT (after stripping Bearer):', token);
 
    try {
        const payload  = jwt.verify(token, process.env.SECRET_KEY);
        const userId = payload._id;
 
        if (!userId) {
             return res.status(401).json({
                msg: "Token inválido - User ID not found in token"
            });
        }
 
        const user = await User.findById(userId);
 
        if(!user) {
            return res.status(401).json({
                msg: "Token inválido - Usuario no encontrado en DB"
            });
        }
 
        req.activeUser = user;
        next();
    }
    catch(error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json({
            msg: "Token inválido o expirado"
        });
    }
    
}
 
module.exports = {
    validateJWT
}