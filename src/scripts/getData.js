import { db } from "../libs/firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const getDataFromJson = async (path) => {
  try {
    const resp = await fetch(`/public/json/${path}s.json`);
    const parsedResp = await resp.json();
    return parsedResp;
  } catch (error) {
    console.log(`Error fetchind ${path} data`, error.message);
  }
};

const getDataFromHtml = async (path) => {
  // if (!path) return;

  const parser = new DOMParser();

  try {
    const resp = await fetch(`/src/categories/${path}/index.html`);
    const parsedResp = await resp.text();
    const htmlResp = parser.parseFromString(parsedResp, "text/html");

    return htmlResp;
  } catch (error) {
    return console.log(`Error fetching category ${category}`, error.message);
  }
};

const getDataFromDB = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const data = [];
  querySnapshot.forEach((element) => {
    data.push(element.data());
  });

  return data;
};

export { getDataFromJson, getDataFromHtml, getDataFromDB };
