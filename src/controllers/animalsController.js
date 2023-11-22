import uploadImgs from "../utils/uploadImgs.js";
import { createAnimalDTO } from "../DTOS/animals/createAnimalDTO.js";
import { createAnimal } from "../services/animalsService.js";

export const registerAnimal = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No se ha enviado ninguna imagen" });
  const imgUrl = await uploadImgs(req.file);
  req.body.img = imgUrl;
  const animal = createAnimalDTO.fromRequest(req);
  try {
    await createAnimal(animal);
    return res.status(201).json({ message: "Animal registrado" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
