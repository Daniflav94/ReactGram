const User = require("../models/User")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const authGuard = async(req, res, next) => {

    const authHeader = req.headers["authorization"]
    //verifica se tem "authorization", vai pegar o código após o Bearer
    const token = authHeader && authHeader.split(" ")[1] 

    //Check if header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

    //Check if token is valid
    try {
        //verifica se o token combina com o nosso secret
        const verified = jwt.verify(token, jwtSecret)

        //tenta achar o usuário pelo id retornado
        req.user = await User.findById(verified.id).select("-password") //-password vai tirar a senha do retorno
        
        next()//prossegue a requisição

    } catch (error) {
        res.status(401).json({errors: ["Token inválido"]})
    }
}

module.exports = authGuard