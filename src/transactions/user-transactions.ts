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
    const seguir = await prisma.user.update({where: {id: userId}, data: {seguindo: {connect: {id: alvoId}}}})
    return seguir
}

export async function listarTodosUsuarios(){
    const usuarios = await prisma.user.findMany({
        select: {
            id: true,
            nome: true,
            email: true
            // Não inclui o campo senha
        }
    });

    return usuarios;
}