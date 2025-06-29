import { prisma } from "../utils/prisma"

export async function criarAlbum(nome: string, bandaId: string, capa: string){
    const album = await prisma.album.create({data: {nome, bandaId, capa}, include: {banda: true}})

    return album
}

export async function buscarAlbumPorUsuário(userId: string){
    const albums = await prisma.user.findUnique({where: {id: userId}, include: {albums: {include: {banda: true}}}})

    return albums
}

export async function buscarAlbumaAvaliado(userId: string){
    const avaliacoes = await prisma.avaliacaoAlbum.findMany({where: {userId}, include: {album: {include: {banda: true}}}})

    return avaliacoes.map(avaliacao => ({album: avaliacao.album, nota: avaliacao.nota}))
}

export async function buscarAlbumsNaoAvaliados(userId: string){
    const albums = await prisma.album.findMany({where: {avaliacoes: {none: {userId}}}, include: {banda: true}})

    return albums
}