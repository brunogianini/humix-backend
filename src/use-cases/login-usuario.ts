import { Request, Response } from "express";
import { loginUsuario } from "../transactions/user-transactions";

export async function login(req: Request, res: Response){
    const { email, senha } = req.body

    try{
        const usuario = await loginUsuario(email, senha)
        if(!usuario) throw new Error("Email ou senha incorretos")

        res.status(200).json({usuario})
    }catch(err){
        res.status(500).json({message: "Email ou senha incorretos"})
    }


}