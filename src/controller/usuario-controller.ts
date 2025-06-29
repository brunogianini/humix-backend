import { Request, Response } from "express";
import { seguirUsuarioAlvo } from "../use-cases/seguir-usuario";
import { listarTodosUsuarios } from "../transactions/user-transactions";

export async function usuarioSeguirAlvo(req: Request, res: Response){
    const { userId, alvoId } = req.body

    try{
        const seguir = seguirUsuarioAlvo(userId, alvoId)
        res.status(200).json({message: "O usuário foi seguido"})
    }catch(err){
        res.status(500).json({message: "Não foi possivel seguir o usuário"})
    }
}

export async function listarUsuarios(req: Request, res: Response){
    const { userId } = req.params

    try{
        const usuarios = await listarTodosUsuarios(userId)
        res.status(200).json({usuarios})
    }catch(err){
        res.status(500).json({message: "Não foi possivel buscar os usuários"})
    }
}