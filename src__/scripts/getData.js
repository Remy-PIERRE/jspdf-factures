import { db } from "../utils/firebase-config.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/* */
/* */
/* */
const getDataFromJson = async (fileName) => {
  try {
    const resp = await fetch(`/public/json/${fileName}.json`);
    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(`Error fetching data ${fileName}`, error.message);
  }
};

/* */
/* */
/* */
const getDataFromHTML = async (fileName) => {
  const parser = new DOMParser();

  try {
    /* TODO - replace src__ by scr when refocto finished */
    const resp = await fetch(`/src__/categories/${fileName}/index.html`);
    const textResp = await resp.text();
    const htmlResp = parser.parseFromString(textResp, "text/html");

    return htmlResp;
  } catch (error) {
    return console.log(`Error fetching category ${category}`, error.message);
  }
};

const getDataFromDB = async (collectionName) => {
  const resp = await getDocs(collection(db, collectionName));

  const data = [];
  resp.forEach((element) => {
    data.push(element.data());
  });

  return data;
};

export { getDataFromJson, getDataFromHTML, getDataFromDB };
