const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const uploadImgs = async (file) => {
  try {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error("El tamaño del archivo es demasiado grande.");
    }

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
export default uploadImgs;
