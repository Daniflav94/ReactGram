const multer = require("multer") //upload de arquivos
const path = require("path")

//Destination to store image
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) { //cb: callback
        let folder = ""

        if(req.baseUrl.includes("user")){
            folder = "users"
        }else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`)
    },
    //mudar nome do arquivo
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // 87dsbd48476846.jpeg
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            //upload only png and jpg forms
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

module.exports = {imageUpload}