import Category from "../../classes/Category.js";
import { handleCategoryEvents } from "./events.js";

const categories = [];

const initCategories = (selectedCategories) => {
  resetCategories();

  selectedCategories.forEach((categoryID) => {
    initCategory(categoryID);
  });
};

const resetCategories = () => {
  if (categories.length === 0) return;

  categories.forEach((category) => {
    category.remove();
  });

  categories.length = 0;
};

const initCategory = async (categoryID) => {
  const category = new Category(categoryID);
  await category.getHTMLElements();
  await category.getData();

  insertCategoryBody(category);
  handleCategoryEvents(category);

  categories.push(category);
};

const insertCategoryBody = (category) => {
  document.body.insertBefore(
    category.body,
    document.querySelector("#docWrapper")
  );
};

export { initCategories, categories };
