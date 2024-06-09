import NaoEncontrada from '../erros/NaoEncontrada.js'
import Livro from '../models/Livro.js'

class LivroController {
  static async ListarLivros (req, res, next) {
    try {
      const listaLivros = await Livro.find({})
        .populate('autor')
        .exec()
      res.status(200).json(listaLivros)
    } catch (error) {
      next(error)
    }
  }

  static async ListarLivro (req, res, next) {
    try {
      const id = req.params.id
      const livroEncontrado = await Livro.findById(id)
        .populate('autor', 'nome')
        .exec()
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado)
      } else {
        next(new NaoEncontrada('Livro não encontrado!'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async CadastrarLivro (req, res, next) {
    try {
      const novoLivro = new Livro(req.body)
      const livroResultado = await novoLivro.save()
      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static async AtualizarLivro (req, res, next) {
    try {
      const id = req.params.id
      const livroLocalizado = await Livro.findByIdAndUpdate(id, req.body)
      if (livroLocalizado !== null) {
        res.status(200).json({ message: 'Livro atualizado com sucesso!' })
      } else {
        next (new NaoEncontrada('Id do livro não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async DeletarLivro (req, res, next) {
    try {
      const id = req.params.id
      const livroLocalizado = await Livro.findByIdAndDelete(id)
      if ( livroLocalizado !== null) {
        res.status(200).json({ message: 'Livro deletado com sucesso!' })
      } else {
        next(new NaoEncontrada('Id do livro não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async ListarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora
    try {
      const livrosPorEditora = await Livro.find({ editora })
      res.status(200).json(livrosPorEditora)
    } catch (error) {
      next(error)
    }
  }
}

export default LivroController
