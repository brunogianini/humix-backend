import { darNota } from "../transactions/usuario-dar-nota";

export async function avaliarAlbum(userId: string, albumId: string, nota: number){
    const avaliacao = await darNota(userId, albumId, nota)

    return avaliacao
}