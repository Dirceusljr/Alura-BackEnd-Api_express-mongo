import NaoEncontrada from '../erros/NaoEncontrada.js'
import { autor } from '../models/Autor.js'

class AutorController {
  static async ListarAutores (req, res, next) {
    try {
      const listaAutores = await autor.find({})
      res.status(200).json(listaAutores)
    } catch (error) {
      next(error)
    }
  }

  static async ListarAutor (req, res, next) {
    try {
      const id = req.params.id
      const autorEncontrado = await autor.findById(id)
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado)
      } else {
        next(new NaoEncontrada('Id do Autor não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async CadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body)
      res.status(201).json({
        message: 'Autor cadastrado com sucesso!',
        autor: novoAutor
      })
    } catch (error) {
      next(error)
    }
  }

  static async AtualizarAutor (req, res, next) {
    try {
      const id = req.params.id
      const autorLocalizado = await autor.findByIdAndUpdate(id, req.body)
      if (autorLocalizado !== null) {
        res.status(200).json({ message: 'Autor atualizado com sucesso!' })
      } else {
        next(new NaoEncontrada('Id do autor não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async DeletarAutor (req, res, next) {
    try {
      const id = req.params.id
      const autorLocalizado = await autor.findByIdAndDelete(id)
      if (autorLocalizado !== null) {
        res.status(200).json({ message: 'Autor deletado com sucesso!' })
      } else {
        next(new NaoEncontrada('Id do autor não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }
}

export default AutorController
