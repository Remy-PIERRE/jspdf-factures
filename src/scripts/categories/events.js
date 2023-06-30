import { SRC_CATEGORIES } from "../../utils/app-config.js";

const handleCategoryEvents = (category) => {
  category.create.addEventListener(
    "click",
    category.handleOpenModal.bind(category)
  );

  category.modal.addEventListener(
    "click",
    category.handleCloseModal.bind(category)
  );

  category.reset.addEventListener(
    "click",
    category.handleResetForm.bind(category)
  );

  category.post.addEventListener(
    "click",
    category.handlePostData.bind(category)
  );
};

export { handleCategoryEvents };
