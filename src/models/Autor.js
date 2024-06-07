import mongoose from 'mongoose'

const AutorSchema = new mongoose.Schema({
  id: { type: String },
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório.']
  },
  nacionalidade: { type: String }
}, { versionKey: false })

const autor = mongoose.model('autores', AutorSchema)

export { autor, AutorSchema }
