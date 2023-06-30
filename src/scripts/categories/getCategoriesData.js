import { categories } from "./init.js";

const getDataFromCategories = () => {
  const data = {};

  categories.forEach(async (category) => {
    const selectedData = category.getSelectedData();
    if (!selectedData) return;

    data[category.id] = selectedData;
  });

  console.log("data", data);

  if (Object.entries(data).length !== categories.length) {
    console.log("Please select all categories");
    return false;
  }
  return data;
};

export { getDataFromCategories };
