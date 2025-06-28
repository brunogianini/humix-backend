import { prisma } from "../utils/prisma";

export async function criarBanda(nome: string){
    const banda = await prisma.banda.create({data: {nome}})

    return banda
}

export async function buscarBandaPorId(id: string){
    const banda = await prisma.banda.findUnique({where: {id}})

    return banda
}

export async function buscarBandaPorUsuario(userId: string){
    const albums = await prisma.user.findMany({where: {id: userId}, include: {banda: true}})

    return albums
}