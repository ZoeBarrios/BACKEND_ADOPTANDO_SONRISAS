import { uploadMultipleImages } from "./imgService.js";
import Case_img from "../models/cases_imgs.js";
export const createImgCases = async (imgs, case_id) => {
  try {
    const imgsUrls = await uploadMultipleImages(imgs);
    const createdImgPromises = imgsUrls.map(async (img_url) => {
      return Case_img.create({ case_id, img_url });
    });

    const createdImages = await Promise.all(createdImgPromises);
    return createdImages;
  } catch (error) {
    throw error;
  }
};
