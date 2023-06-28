import Model from "../classe/Model.js";
import { getDataFromDB, getDataFromJson } from "./getData.js";
import { getElementByParentId } from "./getElement.js";
import { initCategories } from "./handleCategories.js";
import { initDoc } from "./handleDoc.js";
import { initTitle } from "./handleTitle.js";
import { postModel } from "./postData.js";

const model = new Model();

/* */
/* */
/* */
const getDataModels = async () => {
  model.data = await getDataFromJson("models");
  // model.data = await getDataFromDB("model");
};

/* */
/* */
/* */
const populateModel = () => {
  model.select = getElementByParentId("select", "model");
  model.populateSelect();
};

/* */
/* */
/* */
const handleModelEvents = () => {
  model.modal = document.querySelector("#modelModal");
  model.form = document.querySelector("#modelForm");
  model.modalForm = document.querySelector("#modelForm_2");

  model.submit = getElementByParentId("button[type=submit]", "model");
  model.submit.addEventListener("click", handleModelSubmit);

  model.create = getElementByParentId("button[data-type=create]", "model");
  model.create.addEventListener("click", model.openModal.bind(model));

  model.modal.addEventListener("click", model.closeModal.bind(model));

  model.reset = getElementByParentId("button[type=reset]", model.modal.id);
  model.reset.addEventListener("click", model.resetForm.bind(model));

  model.post = getElementByParentId("button[type=submit]", model.modal.id);
  model.post.addEventListener("click", async (event) => {
    event.preventDefault();
    const values = model.getFormValues();
    if (values.message) return console.log(values.message);

    await postModel(values);
    model.closeModal();

    resetModelSelect();
  });
};

const resetModelSelect = async () => {
  await getDataModels();
  populateModel();
};

/* */
/* */
/* */
const handleModelSubmit = (event) => {
  event.preventDefault();

  const selectValue = model.getSelectValue();
  if (!selectValue) return;
  if (selectValue.message) return console.log(selectValue.message);

  initDoc();
  initTitle(model.current.name);
  initCategories();
};

/* */
/* */
/* */
export { getDataModels, populateModel, handleModelEvents, model };
