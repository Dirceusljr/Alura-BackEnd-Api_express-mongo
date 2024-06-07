import express from 'express'
import conectaNaDatabase from './config/dbConnect.js'
import router from './routes/index.js'
import manipuladorDeErros from './middlewares/manipuladorDeErros.js'
import manipulador404 from './middlewares/manipulador404.js'

const conexao = await conectaNaDatabase()

conexao.on('error', (erro) => {
  console.error('Erro na conexão com o banco de dados: ', erro)
})

conexao.once('open', () => {
  console.log('Conexão com o banco de dados realizada com sucesso!')
})

const app = express()
router(app)

app.use(manipulador404)

app.use(manipuladorDeErros)

export default app
