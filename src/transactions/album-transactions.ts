import { prisma } from "../utils/prisma"

export async function criarAlbum(nome: string, bandaId: string, capa: string){
    const album = await prisma.album.create({data: {nome, bandaId, capa}, include: {banda: true}})

    return album
}

export async function buscarAlbumPorUsuário(userId: string){
    const albums = await prisma.user.findUnique({where: {id: userId}, include: {albums: {include: {banda: true}}}})

    return albums
}