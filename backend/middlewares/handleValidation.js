const {validationResult} = require("express-validator")

const validate = (req, res, next) => {
    //next possibilita prosseguir ou parar a execução
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extractedErrors = []

    //vai transformar os erros em array e mapear, adicionando a msg de cada um em extractedErrors
    errors.array().map((err) => extractedErrors.push(err.msg)) 
    
    //Status 422 = operação não foi bem sucedida
    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate