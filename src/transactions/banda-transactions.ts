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

export async function usuarioSeguirBanda(userId: string, bandaId: string){
    const segue = await prisma.banda.findFirst({
        where: {
            id: bandaId,
            segudores: { some: { id: userId } }
        }
    })

    if (!segue) {
        await prisma.banda.update({
            where: { id: bandaId },
            data: { segudores: { connect: { id: userId } } }
        });
    }
}