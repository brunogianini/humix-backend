import { criarAlbum } from "../transactions/album-transactions";
import { criarBanda, usuarioSeguirBanda } from "../transactions/banda-transactions";
import { prisma } from "../utils/prisma";
import { searchAlbum } from "../utils/spotify";

export async function adicionarAlbumAoUsuario(userId: string, nome_input: string, banda_input: string){
    
    const album_data = await searchAlbum(nome_input, banda_input)

    const nome = album_data.name
    const banda = album_data.artists[0].name
    const capa = album_data.images[0].url

    let banda_db = await prisma.banda.findFirst({where: {nome: banda}})
    let album_db = await prisma.album.findFirst({where: {nome}, include: {banda: true}})

    if(!banda_db){
        banda_db = await criarBanda(banda)
    }

    if(!album_db){
        album_db = await criarAlbum(nome, banda_db.id, capa)
    }

    const usuarioAtualizado = await prisma.user.update({where: {id: userId}, data: {albums: {connect: {id: album_db.id}}}, include: {albums: true}})
    usuarioSeguirBanda(userId, banda_db.id)
    return album_db
}