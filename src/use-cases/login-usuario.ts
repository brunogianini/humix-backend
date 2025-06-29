import { Request, Response } from "express";
import { loginUsuario } from "../transactions/user-transactions";
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv')

export async function login(req: Request, res: Response){
    const { email, senha } = req.body
    const privateToken = "humix123"

    try{
        const usuario = await loginUsuario(email, senha)
        if(!usuario) throw new Error("Email ou senha incorretos")

        const token = jwt.sign({id: usuario.id, email: usuario.email}, privateToken)

        res.status(200).json({token})
    }catch(err){
        res.status(500).json({message: "Email ou senha incorretos"})
    }


}