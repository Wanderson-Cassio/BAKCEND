const yup = require('yup')

const schema = yup.object().shape({
    nome: yup
        .string('campo precisa ser uma texto')
        .required('campo obrigatório'),
    descricao: yup
        .string('campo precisa ser uma texto'),
    turno: yup
        .string('campo precisa ser uma texto'),
    curso: yup
        .string('campo precisa ser uma texto'),
    disciplina: yup
        .string('campo precisa ser um texto'),
    professor: yup
        .string('campo precisa ser um texto'),

})

function turmaValidador(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            console.log(err)
            const errors = err.inner.map(e => {
                const erro = {
                    campo: e.path,
                    erros: e.errors
                }
                return erro
            })
            res.status(400).json(
                {
                    mensagem: "Falha na validação dos campos",
                    erros: errors
                }
            )
        })
}

module.exports = {
    turmaValidador
}