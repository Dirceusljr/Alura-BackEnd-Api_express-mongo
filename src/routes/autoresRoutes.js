import express from 'express'
import AutorController from '../controllers/autorController.js'

const router = express.Router()

router.get('/autores', AutorController.ListarAutores)
router.get('/autores/:id', AutorController.ListarAutor)
router.post('/autores', AutorController.CadastrarAutor)
router.put('/autores/:id', AutorController.AtualizarAutor)
router.delete('/autores/:id', AutorController.DeletarAutor)

export default router
