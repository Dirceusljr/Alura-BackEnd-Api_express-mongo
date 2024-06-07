import mongoose from 'mongoose'
import { AutorSchema } from './Autor.js'

const LivroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: true },
  editora: { type: String },
  preco: { type: Number },
  paginas: { type: Number },
  autor: AutorSchema
}, { versionKey: false })

const livro = mongoose.model('livros', LivroSchema)

export default livro
