import { Request, Response } from "express";
import { adicionarAlbumAoUsuario } from "../use-cases/adicinar-album";

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