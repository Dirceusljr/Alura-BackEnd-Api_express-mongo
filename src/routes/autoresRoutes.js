import express from 'express'
import AutorController from '../controllers/autorController.js'
import paginar from '../middlewares/paginar.js'

const router = express.Router()

router.get('/autores', AutorController.ListarAutores, paginar)
router.get('/autores/:id', AutorController.ListarAutor)
router.post('/autores', AutorController.CadastrarAutor)
router.put('/autores/:id', AutorController.AtualizarAutor)
router.delete('/autores/:id', AutorController.DeletarAutor)

export default router
