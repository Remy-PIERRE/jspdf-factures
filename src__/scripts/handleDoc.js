const { jsPDF } = window.jspdf;
import { getElementByParentId } from "./getElement.js";
import { getDataFromCategories } from "./handleCategories.js";
import { model } from "./handleModel.js";
import generateInvoicePdf from "../models/invoice/model.js";

/* */
/* */
/* */
const initDoc = () => {
  const wrapperElement = document.querySelector("#docWrapper");
  if (![...wrapperElement.classList].includes("hidden")) return;

  wrapperElement.classList.toggle("hidden");

  const showElement = getElementByParentId(
    "button[data-type=show]",
    wrapperElement.id
  );
  showElement.addEventListener("click", handleShowDoc);

  const saveElement = getElementByParentId(
    "button[data-type=save]",
    wrapperElement.id
  );
  saveElement.addEventListener("click", handleSaveDoc);
};

/* */
/* */
/* */
const handleShowDoc = (event) => {
  event.preventDefault();
  const doc = generatePdfWithModel();
  showPdf(doc);
};

/* */
/* */
/* */
const handleSaveDoc = (event) => {
  event.preventDefault();
  const doc = generatePdfWithModel();
  savePdf(doc);
};

/* */
/* */
/* */
const generatePdfWithModel = () => {
  const doc = jsPDF();
  const data = getDataFromCategories();
  if (data.message) return console.log(data.message);

  switch (model.current.id) {
    case "invoice":
      generateInvoicePdf(doc, data);
  }

  return doc;
};

/* */
/* */
/* */
const showPdf = (doc) => {
  const string = doc.output("datauristring");
  const iframe =
    "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
  const x = window.open();
  x.document.open();
  x.document.write(iframe);
  x.document.close();
};

/* */
/* */
/* */
const savePdf = (doc) => {
  doc.save(`${model.current.id}.pdf`);
};

/* */
/* */
/* */
export { initDoc };
