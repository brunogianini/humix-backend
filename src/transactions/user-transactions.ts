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