import NaoEncontrada from '../erros/NaoEncontrada.js'
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js'
import { Autor, Livro } from '../models/index.js'

class LivroController {
  static async ListarLivros(req, res, next) {
    try {
      let { limite = 5, pagina = 1, ordenacao="_id:1" } = req.query;

      let [campoOrdenacao, ordem] = ordenacao.split(":");

      limite = parseInt(limite)
      pagina = parseInt(pagina)
      ordem = parseInt(ordem)

      if(limite > 0 && pagina > 0) {
        const listaLivros = await Livro.find({})
        .sort({[campoOrdenacao]: ordem})
        .skip((pagina -1) * limite)
        .limit(limite)
          .populate('autor')
          .exec()
        res.status(200).json(listaLivros)
      } else {
        next(new RequisicaoIncorreta() )
      }

    } catch (error) {
      next(error)
    }
  }

  static async ListarLivro(req, res, next) {
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

  static async CadastrarLivro(req, res, next) {
    try {
      const novoLivro = new Livro(req.body)
      const livroResultado = await novoLivro.save()
      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static async AtualizarLivro(req, res, next) {
    try {
      const id = req.params.id
      const livroLocalizado = await Livro.findByIdAndUpdate(id, req.body)
      if (livroLocalizado !== null) {
        res.status(200).json({ message: 'Livro atualizado com sucesso!' })
      } else {
        next(new NaoEncontrada('Id do livro não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async DeletarLivro(req, res, next) {
    try {
      const id = req.params.id
      const livroLocalizado = await Livro.findByIdAndDelete(id)
      if (livroLocalizado !== null) {
        res.status(200).json({ message: 'Livro deletado com sucesso!' })
      } else {
        next(new NaoEncontrada('Id do livro não localizado.'))
      }
    } catch (error) {
      next(error)
    }
  }

  static async ListarLivrosPorFiltro(req, res, next) {

    try {
      const busca = await processaBusca(req.query)

      if (busca !== null) {
        const livrosFiltrados = await Livro
        .find(busca)
        .populate('autor')
  
        res.status(200).json(livrosFiltrados)
      } else {
        res.status(200).send([])
      }

    } catch (error) {
      next(error)
    }
  }
}

async function  processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros

    //Solução com java para pesquisa de termos
    // const regex = new RegExp(titulo, 'i')

    let busca = {};

    if (editora) busca.editora = editora
    // if (titulo) busca.titulo = regex
    if (titulo) busca.titulo = {$regex: titulo, $options: 'i'}

    // Para habilitar os métodos de busca com gte e lte, cria-se um objeto vazio
    if (minPaginas || maxPaginas) busca.paginas = {}
    if (minPaginas) busca.paginas.$gte = parseInt(minPaginas)
    if (maxPaginas) busca.paginas.$lte = parseInt(maxPaginas)

    if(nomeAutor) {
      const autor = await Autor.findOne({ nome: nomeAutor})

      if (autor !== null) {
        busca.autor = autor._id
      } else {
        busca = null;
      }
    }

    return busca
}

export default LivroController
