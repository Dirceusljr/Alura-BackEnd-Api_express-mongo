import livro from "../models/Livro.js";

class LivroController {

    static async ListarLivros(req, res) {
        const listaLivros = await livro.find({})
        res.status(200).json(listaLivros)
    }

    static async CadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body)
            res.status(201).json({
                message: 'Livro cadastrado com sucesso!',
                livro: novoLivro
            })
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar livro` })
        }
    }
}

export default LivroController;