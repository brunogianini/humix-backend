import { Router } from "express"
import { adicionarAlbum, avaliarAlbumUsuario, buscarAvaliacoesUsuario, removerAlbumUsuario } from "../controller/album-controller"
import { buscarAlbums } from "../use-cases/buscar-albums"
import { login } from "../use-cases/login-usuario"
import { registroUsuario } from "../use-cases/registro-usuario"
import { buscarBandaUsuario } from "../controller/banda-controller"

const router = Router()

//Album
router.post("/adicionar", adicionarAlbum)
router.get("/albums/:userId", buscarAlbums)
router.post("/avaliar", avaliarAlbumUsuario)
router.get("/avaliacoes/:userId", buscarAvaliacoesUsuario)
router.post("/remover", removerAlbumUsuario)

//Usuário
router.post("/login", login)
router.post("/registrar", registroUsuario)
router.get("/bandas/:userId", buscarBandaUsuario)

export default router