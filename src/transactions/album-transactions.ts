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
    // Descobre a banda do álbum a ser removido
    const album = await prisma.album.findUnique({
        where: { id: albumId },
        select: { bandaId: true }
    });
    if (!album) return { message: "Álbum não encontrado." };

    // Remove avaliações do usuário para o álbum
    await prisma.avaliacaoAlbum.deleteMany({
        where: { userId, albumId }
    });

    // Remove o álbum da lista do usuário
    await prisma.user.update({
        where: { id: userId },
        data: {
            albums: {
                disconnect: { id: albumId }
            }
        }
    });

    // Verifica se o usuário ainda tem algum álbum dessa banda
    const albunsRestantes = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            albums: {
                where: { bandaId: album.bandaId }
            }
        }
    });

    if (albunsRestantes && albunsRestantes.albums.length === 0) {
        // Remove a banda do usuário
        await prisma.user.update({
            where: { id: userId },
            data: {
                banda: {
                    disconnect: { id: album.bandaId }
                }
            }
        });
    }

    return { message: "Álbum removido do usuário com sucesso." };
}