import express from 'express'
import LivroController from '../controllers/livroController.js'
import paginar from '../middlewares/paginar.js'

const router = express.Router()

router.get('/livros', LivroController.ListarLivros, paginar)
router.get('/livros/busca', LivroController.ListarLivrosPorFiltro, paginar)
router.get('/livros/:id', LivroController.ListarLivro)
router.post('/livros', LivroController.CadastrarLivro)
router.put('/livros/:id', LivroController.AtualizarLivro)
router.delete('/livros/:id', LivroController.DeletarLivro)

export default router
