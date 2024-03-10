import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/config.js";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

initializeApp(firebaseConfig.firebase);
const storage = getStorage();

export const uploadImgs = async (file) => {
  try {
    const storageRef = ref(
      storage,
      `files/${file.originalname + "       " + Date.now()}`
    );
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteImage = async (url) => {
  try {
    const urlWithoutSpace = url.replace(/\s/g, "%20");
    const storageRef = ref(storage, urlWithoutSpace);
    await deleteObject(storageRef);
  } catch (err) {
    throw new Error(err);
  }
};
