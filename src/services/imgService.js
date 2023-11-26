import uploadImgs from "../utils/uploadImgs.js";

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
