import { prisma } from "../utils/prisma"

export async function criarUsuario(nome: string, email: string, senha: string){
    const usuario = await prisma.user.create({data: {nome, email, senha}})

    return usuario
}

export async function loginUsuario(email: string, senha: string) {
    const usuario = await prisma.user.findUnique({ where: { email } })

    if (!usuario) return false
    if (usuario.senha !== senha) return false
    
    return usuario
}

export async function buscarUsuarioPorNome(nome: string){
    const usuario = await prisma.user.findFirst({where: {nome}})
    return usuario
}

export async function seguirUsuario(userId: string, alvoId: string){
    // Checa se ambos os usuários existem
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const alvo = await prisma.user.findUnique({ where: { id: alvoId } });

    if (!user || !alvo) {
        throw new Error("Usuário ou alvo não encontrado");
    }

    const seguir = await prisma.user.update({
        where: { id: userId },
        data: { seguindo: { connect: { id: alvoId } } }
    });
    return seguir;
}

export async function listarTodosUsuarios(userId: string) {
    // Busca os usuários que o userId já segue
    const usuario = await prisma.user.findUnique({
        where: { id: userId },
        select: { seguindo: { select: { id: true } }, seguidores: { select: { id: true } } }
    });

    const idsSeguindo = usuario?.seguindo.map(u => u.id) ?? [];
    const idsSeguidores = usuario?.seguidores.map(u => u.id) ?? [];
    // Inclui o próprio userId para não retornar ele mesmo
    idsSeguindo.push(userId);

    // Busca todos os usuários que NÃO estão na lista acima
    const usuarios = await prisma.user.findMany({
        where: {
            id: { notIn: idsSeguindo }
        },
        select: {
            id: true,
            nome: true,
            email: true
        }
    });

    // Adiciona o campo isFollower
    const usuariosComIsFollower = usuarios.map(u => ({
        ...u,
        isFollower: idsSeguidores.includes(u.id)
    }));

    return usuariosComIsFollower;
}

export async function listarUsuariosSeguidos(userId: string) {
    const usuario = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            seguindo: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            }
        }
    });

    // Retorna apenas a lista de usuários seguidos
    return usuario?.seguindo ?? [];
}

export async function listarUsuariosQueMeSeguem(userId: string) {
    // Busca quem me segue e quem eu sigo
    const usuario = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            seguidores: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            },
            seguindo: {
                select: { id: true }
            }
        }
    });

    const idsSeguindo = usuario?.seguindo.map(u => u.id) ?? [];

    // Adiciona o campo isFollower (true se eu sigo de volta)
    const seguidoresComIsFollower = usuario?.seguidores.map(u => ({
        ...u,
        isFollower: idsSeguindo.includes(u.id)
    })) ?? [];

    return seguidoresComIsFollower;
}