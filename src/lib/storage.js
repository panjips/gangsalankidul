import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadFile = async (file, folder) => {
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${folder}${filename}.${file.name.split(".").pop()}`
    );
    const res = await uploadBytes(storageRef, file);

    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (path) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (path) => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
  } catch (error) {
    throw error;
  }
};
