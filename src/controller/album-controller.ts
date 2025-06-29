import { Request, Response } from "express";
import { adicionarAlbumAoUsuario } from "../use-cases/adicinar-album";
import { avaliarAlbum } from "../use-cases/avaliar-album";
import { avaliacoesUsuario } from "../use-cases/avaliados-usuario";
import { removerAlbumDoUsuario } from "../transactions/album-transactions";

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

export async function buscarAvaliacoesUsuario(req: Request, res: Response){
    const { userId } = req.params

    try{
        const avaliacoes = await avaliacoesUsuario(userId)
        res.status(200).json({avaliacoes})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Não foi carregar os álbums avaliados"})
    }
}

export async function removerAlbumUsuario(req: Request, res: Response){
    const { userId, albumId } = req.body

    try{
        const album = await removerAlbumDoUsuario(userId, albumId)
        res.status(201).json({message: "O album foi excluído com sucesso"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Não foi possível deletar o álbum"})
    }
}