import { db } from "../utils/firebase-config.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const postModel = async ({ id, name, categories }) => {
  await setDoc(doc(db, "model", id), {
    id,
    name,
    categories,
  });
};

const postData = async (collectionName, data) => {
  await setDoc(doc(db, collectionName, data.name || data.id), {
    ...data,
  });
};

export { postModel, postData };
