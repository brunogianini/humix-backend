import { Request, Response } from "express";
import { buscarBandas } from "../use-cases/buscar-bandas-usuario";

export async function buscarBandaUsuario(req: Request, res: Response){
    const { userId } = req.params

    try{
        const bandas = await buscarBandas(userId)
        res.status(200).json({bandas: bandas})
    }catch(err){
        res.status(500).json({message: err})
    }
    
}