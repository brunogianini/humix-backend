import { buscarBandaPorUsuario } from "../transactions/banda-transactions";

export async function buscarBandas(userId: string){
    const bandas = await buscarBandaPorUsuario(userId)
    return bandas
}