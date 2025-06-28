import { Request, Response } from "express";
import { criarUsuario } from "../transactions/user-transactions";

export async function registroUsuario(req: Request, res: Response){
    const { nome, email, senha } = req.body

    try{
        const usuario = await criarUsuario(nome, email, senha)

        res.status(201).json({message: "Usuário criado com sucesso"})
    }catch(err){
        res.status(500).json({message: "O email está indisponível"})
    }


}