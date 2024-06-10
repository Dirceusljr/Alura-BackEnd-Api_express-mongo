import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const LivroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, 'O campo título é obrigatório.']
  },
  editora: {
    type: String,
    required: [true, 'O campo editora é obrigatório.'],
    enum: {
      values: ['Clássicos', 'Fantasia'],
      message: 'A editora {VALUE} não é permitida.'
    }
  },
  preco: { type: Number },
  paginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000
      },
      message: 'O número de páginas deve ser entre 10 e 5000. Valor fornecido: {VALUE}.'
    }
    // min: [10, 'O número de páginas deve ser entre 10 e 5000. Valor fornecido: {VALUE}.'],
    // max: [5000, 'O número de páginas deve ser entre 10 e 5000. Valor fornecido: {VALUE}.'],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'O autor é obrigatório.'],
    autopopulate: { select: 'nome' }
  }
}, { versionKey: false })

LivroSchema.plugin(autopopulate)
const Livro = mongoose.model('livros', LivroSchema)

export default Livro
