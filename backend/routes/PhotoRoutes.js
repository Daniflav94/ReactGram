const express = require("express")
const router = express.Router()

//Controllers
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto} = require("../controllers/PhotoController")

//Middlewares
const {photoInsertValidation, photoUpdateValidation} = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const {imageUpload}= require("../middlewares/imageUpload")

//Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
//authGuard = precisa estar autenticado, vai buscar o usuário pelo id e inserir na req.user
//validate = imprimir os erros
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto)
router.put("/like/:id", authGuard, likePhoto)


module.exports = router