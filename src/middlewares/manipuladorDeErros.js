import mongoose from 'mongoose'

function manipuladorDeErros (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Um ou mais dados informados são inválidos.' })
  } else if (erro instanceof mongoose.Error.ValidationError) {
    const mensagensDeErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join('; ')
    res.status(400).json({ message: `Os seguintes erros foram encontrados: ${mensagensDeErro}` })
  } else {
    res.status(500).json({ message: 'Erro interno de servidor.' })
  }
}

export default manipuladorDeErros
