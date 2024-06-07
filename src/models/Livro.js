import mongoose from 'mongoose'

const LivroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, 'O campo título é obrigatório.']
  },
  editora: {
    type: String,
    required: [true, 'O campo editora é obrigatório.']
  },
  preco: { type: Number },
  paginas: { type: Number },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'O autor é obrigatório.']
  }
}, { versionKey: false })

const Livro = mongoose.model('livros', LivroSchema)

export default Livro
