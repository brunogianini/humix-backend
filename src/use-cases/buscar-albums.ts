import { Request, Response } from "express";
import { buscarAlbumPorUsuário } from "../transactions/album-transactions";

export async function buscarAlbums(req: Request, res: Response){
    const { userId } = req.params

    const albums = await buscarAlbumPorUsuário(userId)
    res.status(200).json({albums: albums?.albums})
}