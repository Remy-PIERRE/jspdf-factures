/* FORM */
const getForm = (name) => {
  const form = document.querySelector(`#${name}Form`);
  return form;
};

const getAllForms = () => {
  const issuerForm = getForm("issuer");
  const clientForm = getForm("client");
  const invoiceForm = getForm("invoice");

  return { issuerForm, clientForm, invoiceForm };
};

/* SELECT according forms */
const getSelect = (name) => {
  const element = document.querySelector(`#${name}Form select`);
  return element;
};

const getAllSelects = () => {
  const issuerSelect = getSelect("issuer");
  const clientSelect = getSelect("client");
  const invoiceSelect = getSelect("invoice");

  return { issuerSelect, clientSelect, invoiceSelect };
};

/* SUBMIT according form */
const getSubmit = (name) => {
  const element = document.querySelector(`#${name}Form button[type='submit']`);
  return element;
};

const getAllSubmit = () => {
  const issuerSubmit = getSubmit("issuer");
  const clientSubmit = getSubmit("client");
  const invoiceSubmit = getSubmit("invoice");

  return { issuerSubmit, clientSubmit, invoiceSubmit };
};

/* RESET according form */
const getReset = (name) => {
  const element = document.querySelector(`#${name}Form button[type='reset']`);
  return element;
};

const getAllReset = () => {
  const issuerReset = getReset("issuer");
  const clientReset = getReset("client");
  const invoiceReset = getReset("invoice");

  return { issuerReset, clientReset, invoiceReset };
};

/* pdf show and save buttons */
const getAllPdfButtons = () => {
  const pdfShow = document.querySelector("#pdfShow");
  const pdfSave = document.querySelector("#pdfSave");

  return { pdfShow, pdfSave };
};

export {
  getAllForms,
  getAllSelects,
  getAllSubmit,
  getAllReset,
  getAllPdfButtons,
};
