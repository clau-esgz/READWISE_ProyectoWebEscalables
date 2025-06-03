const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
 
const login = async (req = request, res = response) => {
    const { email, password } = req.body ?? "";
 
    if (!email || !password) {
        return res.status(400).json({
            msg: "Datos inválidos"
        });
    }
 
    try {
        const usuario = await Usuario.findOne({ correo: email });
 
        if (!usuario) {
            return res.status(401).json({
                msg: "Usuario no encontrado"
            });
        }
 
        const validPassword = await bcrypt.compare(password, usuario.contrasena);
 
        if (!validPassword) {
            return res.status(401).json({
                msg: "Contraseña incorrecta"
            });
        }
 
        const token = jwt.sign(
            {
                _id: usuario._id,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.SECRET_KEY || 'default_secret_key_for_development',
            { expiresIn: "1h" }
        );
 
        return res.status(200).json({
            msg: "Login exitoso",
            rol: usuario.rol,
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}
 
const register = async (req = request, res = response) => {
    const { email, password } = req.body ?? "";
 
    if (!email || !password) {
        res.status(400).json({
            msg: "Datos inválidos"
        });
        return;
    }
 
    try {
        const user = await Usuario.findOne({ correo: email });

        if (user) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este correo"
            });
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const newUser = new Usuario({
            correo: email,
            contrasena: hashedPassword,
            rol: "registrado"
        });
        
        console.log(newUser);
        await newUser.save();
 
        res.status(201).json({
            msg: "Usuario creado exitosamente"
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Datos inválidos"
        });
        return;
    }
}
 
module.exports = {
    login,
    register
}