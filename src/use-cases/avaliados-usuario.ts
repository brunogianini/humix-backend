import { buscarAlbumaAvaliado } from "../transactions/album-transactions";

export async function avaliacoesUsuario(userId: string){
    const avaliacoes = await buscarAlbumaAvaliado(userId)

    return avaliacoes
}