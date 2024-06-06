import express from 'express';
import LivroController from "../controllers/livroController.js";

const router = express.Router();

router.get('/livros', LivroController.ListarLivros)
router.get('/livros/:id', LivroController.ListarLivro)
router.post('/livros', LivroController.CadastrarLivro)
router.put('/livros/:id', LivroController.atualizarLivro)

export default router;