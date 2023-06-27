import { getDataFromJson, getDataFromHtml } from "./scripts/getData.js";
import { populateSelect } from "./scripts/populateElement.js";
import createPdf from "./scripts/handlePdf.js";

/* --------------- */
/* INSTANCES START */
/* --------------- */

/* model = {
    data: [...str],
    current: str || undefined,
    select: <select />,
    submit: <button />,
    title: <h1 />,
} */
/* contain data with all pdf model created and html elements to choice wich one to work with */
const model = {};

/* pdf = {
    wrapper: <section />,
    show: <button />,
    save: <button />,
} */
/* contain html element allowing to watch or download pdf */
const pdf = {};

/* categories = [
    category :{
        name: str,
        data: [...str],
        body: modale: <section />,
        select: <select />,
        create: <button />,
        modale: <section />,
        form: <form />,
        reset: <button />,
        submit: <button />,
    },
] */
/* contain all categories (data and html elements) needed to select or create dynamiques data allowing to build pdf model selected */
const categories = [];

/* ------------- */
/* INSTANCES END */
/* ------------- */

/* ----------- */
/* MODEL START */
/* ----------- */

/* model init + model listen submit */
/* on submit => categories reset if needed, pdf init if needed, categories init */
await initModel();
model.submit.addEventListener("click", handleModelSubmit);

/* */
/* */
/* */
async function initModel() {
  /* populate model object */
  await createModel();

  /* populate model.select according to model.data */
  populateSelect(model.select, model.data);

  /* */
  /* */
  /* */
  async function createModel() {
    /* get data from json models.json */
    model.data = await getDataFromJson("model");

    /* get elements */
    model.select = document.querySelector("#modelForm select");
    model.submit = document.querySelector("#modelForm button[type=submit]");
  }
}

/* */
/* */
/* */
async function handleModelSubmit(event) {
  event.preventDefault();

  /* default value handle when submit */
  // if (event.target.value) return console.log("Please select a model"); /// break

  /* nothing to do when select again model.current */
  if (model.current && model.current.id === model.select.value) return;

  /* if already categories displayed => remove html then void categories array */
  if (categories.length > 0) {
    resetCategories();
  }

  /* get model.current */
  model.current = model.data.find((el) => el.id === model.select.value);

  /* get pdf wrapper / show button / save button if needed */
  initPdf();
  /* create / update title */
  initModelTitle();

  /* init then display all categories needed according to model */
  await initCategories();

  /* */
  /* */
  /* */
  function initModelTitle() {
    if (!model.title) {
      model.title = document.createElement("h1");
      model.title.className = "model__title";
      document.body.insertBefore(model.title, pdf.wrapper);
    }

    model.title.innerHTML = `Création du PDF ${model.current.name}`;
  }
}

/* --------- */
/* MODEL END */
/* --------- */

/* ---------------- */
/* CATEGORIES START */
/* ---------------- */

async function initCategories() {
  for (const category of model.current.categories) {
    /* get category from /src/categories/category/index.html */
    const htmlElement = await getDataFromHtml(category);

    /* init category object */
    const categoryInstance = await initCategory(htmlElement, category);
    categories.push(categoryInstance);

    /* get data from /public/json/category+s.json */
    categoryInstance.data = await getDataFromJson(category);

    /* populate select according to data */
    populateSelect(categoryInstance.select, categoryInstance.data);

    /* display category.body */
    document.body.insertBefore(categoryInstance.body, pdf.wrapper);

    /* handle all listeners */
    handleEventOnCategory(categoryInstance);
  }

  /* */
  /* */
  /* */
  async function initCategory(htmlElement, categoryId) {
    const element = htmlElement.querySelector(`#${categoryId}`);

    /* init category object */
    const categoryElement = {
      name: element.id,
      body: element,
      select: element.querySelector("select"),
      create: element.querySelector("button[type=button]"),
      modal: element.querySelector(`#${element.id}Modal`),
      form: element.querySelector(`#${element.id}Form`),
      reset: element.querySelector("button[type=reset]"),
      submit: element.querySelector("button[type=submit]"),
    };

    return categoryElement;
  }
}

/* */
/* */
/* */
function resetCategories() {
  categories.forEach((category) => {
    /* remove category from html */
    category.body.remove();
  });

  /* remove categories from categories object */
  categories.length = 0;
}

/* */
/* */
/* */
function handleEventOnCategory(category) {
  /* open modal */
  /* close modal */
  /* reset form */
  /* submit form */

  /* */
  /* */
  /* */
  category.create.addEventListener("click", openCategoryModal);

  function openCategoryModal() {
    category.modal.classList.toggle("hidden");
  }

  /* */
  /* */
  /* */
  category.modal.addEventListener("click", closeCategoryModal);

  function closeCategoryModal(event) {
    if ([...event.target.classList].includes("category__modal__wrapper"))
      category.modal.classList.toggle("hidden");
  }

  /* */
  /* */
  /* */
  category.reset.addEventListener("click", resetCategoryForm);

  function resetCategoryForm() {
    category.form.reset();
  }

  /* */
  /* */
  /* */
  category.submit.addEventListener("click", submitCategoryForm);

  function submitCategoryForm(event) {
    event.preventDefault();

    console.log("need firebase --- under construction");
  }
}

/* */
/* */
/* */
function getCategoriesSelectedData() {
  const values = categories.map((category) => category.select.value);
  if (values.includes("null"))
    return { success: false, message: "All categories must be selected" };

  const data = values.map((value, ind) => {
    return {
      name: model.current.categories[ind],
      data: categories[ind].data.find((el) => el.id === value),
    };
  });

  return { success: true, data };
}

/* -------------- */
/* CATEGORIES END */
/* -------------- */

/* --------- */
/* PDF START */
/* --------- */

function initPdf() {
  if (!pdf.wrapper) {
    pdf.wrapper = document.querySelector("#pdfWrapper");
    pdf.wrapper.classList.toggle("hidden");
    pdf.show = pdf.wrapper.querySelector("button[data-type=show]");
    pdf.save = pdf.wrapper.querySelector("button[data-type=save]");
  }

  handleEvventOnPdf();
}

/* */
/* */
/* */
function handleEvventOnPdf() {
  /* show pdf */
  /* save pdf */

  /* */
  /* */
  /* */
  pdf.show.addEventListener("click", showPdf);

  function showPdf(event) {
    const resp = getCategoriesSelectedData();
    if (!resp.success) return console.log(resp.message);
    createPdf(resp.data, model.current.id, event.target.dataset.type);
  }

  /* */
  /* */
  /* */
  pdf.save.addEventListener("click", savePdf);

  function savePdf() {
    const resp = getCategoriesSelectedData();
    if (!resp.success) return console.log(resp.message);
    createPdf(resp.data, model.current.id, event.target.dataset.type);
  }
}

/* ------- */
/* PDF END */
/* ------- */
