const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/photos", require("./PhotoRoutes"))

//ROTAS DA APLICAÇÃO

router.get("/", (req, res) => {
    res.send("API Working!") //usuário vai receber essa msg 
})

module.exports = router