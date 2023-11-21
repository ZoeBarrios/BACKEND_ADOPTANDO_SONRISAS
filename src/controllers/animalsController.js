import uploadImgs from "../utils/uploadImgs.js";

export const createAnimal = async (req, res) => {
  uploadImgs(req.file)
    .then((url) => {
      res.status(200).json({
        message: "Imagen subida correctamente",
        url: url,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error al subir la imagen",
        error: err,
      });
    });
};
