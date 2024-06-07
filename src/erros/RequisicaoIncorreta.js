import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
    constructor(mensagem = 'Um ou mais dados informados são inválidos.') {
        super(mensagem, 400)
    }
}

export default RequisicaoIncorreta;