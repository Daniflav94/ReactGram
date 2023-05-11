const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

//Insert photo, with an user
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //Create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    //verificar se não está vazia
    res
      .status(422)
      .json({ errors: ["Houve um problema, tente novamente mais tarde."] });
    return;
  }

  res.status(200).json(newPhoto);
};

//Remove photo
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    //Check photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      //vai comparar id do usuário que postou a foto com o id do usuário logado
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde"],
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
  }
};

//Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec(); // obj vazio para buscar todas, ordenadas pelos mais novos
  return res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params; //pegar id da url e não da requisição para conseguir visualizar fotos de qualquer usuário

  const photos = await Photo.find({ userId: id }) //filtro
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async(req, res) => {

    const {id} = req.params

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    //Check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada"]})
        return
    }

    res.status(200).json(photo)
}

//Update photo
const updatePhoto = async(req, res) => {

    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //Check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    //Check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ocorreu um erro, tente novamente mais tarde"]})
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: "Foto atualizada com sucesso!"})
}

//Like
const likePhoto = async(req, res) => {

    const {id} = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

     //Check if photo exists
     if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    //Check if user already liked the photo
    if(photo.likes.includes(reqUser._id)){
        /* res.status(422).json({errors: ["Você já curtiu a foto"]})
        return */
        const index = photo.likes.indexOf(reqUser._id)
        photo.likes.slice(index, 1)
    }

    // Put user id in likes array
    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida."})
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto
};
