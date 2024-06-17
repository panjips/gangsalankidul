import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

export const addBerita = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "berita"), data);

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getAllBerita = async (name) => {
  try {
    const snapshot = await getDocs(collection(db, name));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export const deleteBerita = async (id) => {
  try {
    await deleteDoc(doc(db, "berita", id));
  } catch (error) {
    throw error;
  }
};

export const getBerita = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "berita", id));

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
      return {};
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return {};
  }
};

export const updateBerita = async (id, data) => {
  try {
    await setDoc(doc(db, "berita", id), data);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (username) => {
  try {
    let data = null;
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!doc.id) return;
      data = { id: doc.id, ...doc.data() };
    });

    if (!data) throw Error;

    return data;
  } catch (error) {
    return [];
  }
};

export const getBeritaByJudul = async (judul) => {
  try {
    let data = null;
    const q = query(collection(db, "berita"), where("judul", "==", judul));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!doc.id) return;
      data = { id: doc.id, ...doc.data() };
    });

    if (!data) throw Error;

    return data;
  } catch (error) {
    return [];
  }
};
