import { prisma } from "../utils/prisma";

export async function darNota(userId: string, albumId: string, nota: number) {
    // Cria ou atualiza a nota do usuário para o álbum
    return await prisma.avaliacaoAlbum.upsert({
        where: {
            userId_albumId: {
                userId,
                albumId
            }
        },
        update: {
            nota
        },
        create: {
            userId,
            albumId,
            nota
        }
    });
}