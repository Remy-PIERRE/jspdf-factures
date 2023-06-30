import { initDoc } from "../doc/init.js";
import { initCategories } from "../categories/init.js";

const handleModelEvents = (model) => {
  model.submit.addEventListener("click", (event) => {
    event.preventDefault();
    handleModelSubmit(model);
  });

  model.create.addEventListener("click", model.handleOpenModal.bind(model));

  model.modal.addEventListener("click", model.handleCloseModal.bind(model));

  model.reset.addEventListener("click", model.handleResetForm.bind(model));

  model.post.addEventListener("click", model.handlePostData.bind(model));
};

const handleModelSubmit = (model) => {
  const selectedCategories = model.getSelectedCategories();
  if (!selectedCategories) return;

  model.initTitle();
  initDoc();
  initCategories(selectedCategories);
};

export { handleModelEvents };
