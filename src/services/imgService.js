import { uploadImgs, deleteImage } from "../utils/functionImgs.js";

export const uploadSingleImage = async (file) => {
  try {
    const imgUrl = await uploadImgs(file);
    return imgUrl;
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleImages = async (files) => {
  try {
    const imgUrls = await Promise.all(files.map((file) => uploadImgs(file)));

    return imgUrls;
  } catch (error) {
    throw error;
  }
};

export const deleteImages = async (urls) => {
  try {
    const deletePromises = await Promise.all(
      urls.map(({ dataValues }) => deleteImage(dataValues.img_url))
    );
    return deletePromises;
  } catch (error) {
    throw error;
  }
};
