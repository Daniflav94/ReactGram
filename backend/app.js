require("dotenv").config() //dá acesso ao .env onde fcam as variáveis de ambiente

const express = require("express") 
const path = require("path") //determinar o diretório das imagens
const cors = require("cors") //vamos utilizar para acessar pelo front

const port = process.env.PORT

const app = express() //inicializa a aplicação

//config JSON and from data response
app.use(express.json())
app.use(express.urlencoded({extended: false})) //para aceitar form-data

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})

//Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//DB connection
require("./config/db.js")

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//routes
const router = require("./routes/Router.js")

app.use(router)