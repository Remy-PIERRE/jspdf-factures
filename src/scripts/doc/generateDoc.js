const { jsPDF } = window.jspdf;
import { getDataFromCategories } from "../categories/getCategoriesData.js";
import { model } from "../model/init.js";
import generateInvoicePdf from "../../models/invoice/model.js";

const generatePdfWithModel = () => {
  const doc = jsPDF();
  const data = getDataFromCategories();
  if (!data) return false;

  console.log("model", model);

  switch (model.current.id) {
    case "invoice":
      generateInvoicePdf(doc, data);
  }

  return doc;
};

export { generatePdfWithModel };
