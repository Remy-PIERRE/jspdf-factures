import Category from "../classe/Category.js";
import { model } from "./handleModel.js";
import { getDataFromJson, getDataFromDB, getDataFromHTML } from "./getData.js";
import { getElementByParentId } from "./getElement.js";
import { postData } from "./postData.js";

const categories = [];

/* */
/* */
/* */
const initCategories = () => {
  resetCategories();
  model.current.categories.forEach((categoryName) => {
    initCategory(categoryName);
  });
};

/* */
/* */
/* */
const resetCategories = () => {
  if (categories.length === 0) return;

  categories.forEach((category) => {
    category.remove();
  });

  categories.length = 0;
};

/* */
/* */
/* */
const initCategory = async (categoryName) => {
  const category = new Category(categoryName);
  category.data = await getDataCategory(categoryName);
  category.body = await getBodyCategory(categoryName);

  insertCategoryBody(category);
  getCategoryElements(category);
  populateCategory(category);
  handleCategoryEvents(category);

  categories.push(category);
};

/* */
/* */
/* */
const getDataCategory = async (categoryName) => {
  // const data = await getDataFromJson(`${categoryName}s`);
  const data = await getDataFromDB(categoryName);
  return data;
};

/* */
/* */
/* */
const getBodyCategory = async (categoryName) => {
  const html = await getDataFromHTML(categoryName);
  const body = html.querySelector(`#${categoryName}`);
  return body;
};

/* */
/* */
/* */
const insertCategoryBody = (category) => {
  document.body.insertBefore(
    category.body,
    document.querySelector("#docWrapper")
  );
};

/* */
/* */
/* */
const getCategoryElements = (category) => {
  category.modal = document.querySelector(`#${category.body.id}Modal`);
  category.form = document.querySelector(`#${category.body.id}Form`);
  category.create = getElementByParentId(
    "button[data-type=create]",
    category.body.id
  );
  category.reset = getElementByParentId("button[type=reset]", category.body.id);
  category.post = getElementByParentId("button[type=submit]", category.body.id);
};

/* */
/* */
/* */
const populateCategory = (category) => {
  category.select = getElementByParentId("select", category.body.id);
  category.populateSelect();
};

/* */
/* */
/* */
const handleCategoryEvents = (category) => {
  category.create.addEventListener("click", category.openModal.bind(category));
  category.modal.addEventListener("click", category.closeModal.bind(category));
  category.reset.addEventListener("click", category.resetForm.bind(category));
  // category.post.addEventListener("click", category.postForm.bind(category));

  /* UNDER CONSTRUCTION */
  category.post.addEventListener("click", async (event) => {
    event.preventDefault();
    const values = category.getFormValues();
    console.log("values", values);
    if (values.message) return console.log(values.message);

    await postData(category.name, values);
    category.closeModal();

    resetCategorySelect(category);
  });
};

/* UNDER CONSTRUCTION */
const resetCategorySelect = async (category) => {
  // await getDataModels();
  // populateModel();
  category.data = await getDataCategory(category.name);
  populateCategory(category);
};

/* */
/* */
/* */
const getDataFromCategories = () => {
  const data = {};

  categories.forEach(async (category) => {
    const selectedData = category.getSelectedData();
    if (!selectedData) return;

    data[category.name] = selectedData;
  });

  console.log("data", data);

  if (Object.entries(data).length !== categories.length)
    return { message: "Please select all categories" };
  return data;
};

/* */
/* */
/* */
export { initCategories, getDataFromCategories, categories };
