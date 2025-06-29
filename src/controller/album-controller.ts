import { Request, Response } from "express";
import { adicionarAlbumAoUsuario } from "../use-cases/adicinar-album";
import { avaliarAlbum } from "../use-cases/avaliar-album";

export async function adicionarAlbum(req: Request, res: Response){
    const { userId, nome, banda } = req.body

    try{
        

        const album = await adicionarAlbumAoUsuario(userId, nome, banda)

        res.status(201).json({album})
    }
    
    catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
    
}

export async function avaliarAlbumUsuario(req: Request, res: Response){
    const { userId, albumId, nota } = req.body

    try{
        const avaliacao = await avaliarAlbum(userId, albumId, nota)
        res.status(201).json({avaliacao})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Não foi possível avaliar o álbum"})
    }
}