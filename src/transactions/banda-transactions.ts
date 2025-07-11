import { prisma } from "../utils/prisma";

export async function criarBanda(nome: string, foto: string){
    const banda = await prisma.banda.create({data: {nome, foto}})

    return banda
}

export async function buscarBandaPorId(id: string){
    const banda = await prisma.banda.findUnique({where: {id}})

    return banda
}

export async function buscarBandaPorUsuario(userId: string){
    const usuario = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            banda: {
                include: {
                    albums: {
                        include: {
                            avaliacoes: {
                                where: { userId }
                            }
                        }
                    }
                }
            }
        }
    });

    const bandas = (usuario?.banda ?? []).map(banda => ({
        ...banda,
        albums: banda.albums.map(album => ({
            ...album,
            nota: album.avaliacoes[0]?.nota ?? null
        }))
    }));

    return bandas;
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