import { seguirUsuario } from "../transactions/user-transactions";

export async function seguirUsuarioAlvo(userId: string, alvoId: string){
    const seguir = seguirUsuario(userId, alvoId)

    return seguir
}