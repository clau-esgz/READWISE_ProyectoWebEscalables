const { request, response } = require("express");
 
const verifyAdminRole = (req = request, res = response, next) => {
    if(!req.activeUser) {
        return res.status(401).json({
            msg: "Permiso denegado"
        });
    }
 
    if(req.activeUser.rol !== "administrador") {
        return res.status(402).json({
            msg: "Permiso denegado"
        });
    }
 
    next();
}
 
module.exports = {
    verifyAdminRole
}