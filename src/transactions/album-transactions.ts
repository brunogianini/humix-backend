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

export async function buscarAlbumsNaoAvaliados(userId: string) {
    // Busca os álbuns do usuário que NÃO possuem avaliação dele
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            albums: {
                include: { 
                    banda: true,
                    avaliacoes: true
                }
            }
        }
    });

    if (!user) return [];

    // Filtra os álbuns que não têm avaliação do usuário
    const naoAvaliados = user.albums.filter(album =>
        !album.avaliacoes.some(avaliacao => avaliacao.userId === userId)
    );

    return naoAvaliados;
}

export async function removerAlbumDoUsuario(userId: string, albumId: string) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            albums: {
                disconnect: { id: albumId }
            }
        }
    });
    return { message: "Álbum removido do usuário com sucesso." };
}