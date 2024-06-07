import { autor } from '../models/Autor.js'

class AutorController {
  static async ListarAutores (req, res) {
    try {
      const listaAutores = await autor.find({})
      res.status(200).json(listaAutores)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição` })
    }
  }

  static async ListarAutor (req, res) {
    try {
      const id = req.params.id
      const autorEncontrado = await autor.findById(id)
      res.status(200).json(autorEncontrado)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição do autor` })
    }
  }

  static async CadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body)
      res.status(201).json({
        message: 'Autor cadastrado com sucesso!',
        autor: novoAutor
      })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar autor` })
    }
  }

  static async AtualizarAutor (req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: 'Autor atualizado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualização do autor` })
    }
  }

  static async DeletarAutor (req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndDelete(id)
      res.status(200).json({ message: 'Autor deletado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao deletar autor!` })
    }
  }
}

export default AutorController
