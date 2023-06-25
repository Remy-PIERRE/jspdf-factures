import getDataAndElements from "./getDataAndElements.js";
import populateSelects from "../libs/populateSelects.js";
import handlePdf from "../libs/handlePdf.js";
import { handleFormPdf, handleForm } from "../libs/handleForm.js";
import { formatData } from "../libs/formatData.js";
import { postData } from "../libs/handleData.js";

/* -------------- */
/* INIT APP START */
/* -------------- */

/* get data from json, all 3 <form> and corresponding <select>, submit / reset buttons, pdf buttons */
const { issuer, client, invoice, pdfShow, pdfSave } =
  await getDataAndElements();

/* populate selects with data  */
populateSelects(
  [issuer.data, client.data, invoice.data],
  [issuer.select, client.select, invoice.select]
);

/* ------------ */
/* INIT APP END */
/* ------------ */

/* ------------------- */
/* SUBMIT HANDLE START */
/* ------------------- */

/* listen showPdf and SavePdf */
const handlePdfListener = (event) => {
  /* check all select got value - return true / false */
  const isFormValid = handleFormPdf([
    issuer.select,
    client.select,
    invoice.select,
  ]);

  if (!isFormValid) return;

  /* get selected data */
  const currentIssuer = issuer.data.find((el) => el.id === issuer.select.value);
  const currentClient = client.data.find((el) => el.id === client.select.value);
  const currentInvoice = invoice.data.find(
    (el) => el.id === invoice.select.value
  );

  handlePdf(event.target.dataset.action, [
    currentIssuer,
    currentClient,
    currentInvoice,
  ]);
};

/* listen for reset form */
const resetForm = (event) => {
  event.preventDefault();

  event.target.form.reset();
};

/* listen for submit */
const submitForm = (event) => {
  event.preventDefault();

  const form = document.querySelector(`#${event.target.form.id}`);
  const inputs = [
    ...document.querySelectorAll(`#${event.target.form.id} input`),
  ];
  const values = [...inputs].map((input) => input.value);

  const isFormValid = handleForm(values);
  if (!isFormValid) return;

  const data = formatData(inputs, form.id);
  postData(data, form.id);
};

pdfSave.addEventListener("click", handlePdfListener);
pdfShow.addEventListener("click", handlePdfListener);

Array(issuer.reset, client.reset, invoice.reset).forEach((el) => {
  el.addEventListener("click", resetForm);
});

Array(issuer.submit, client.submit, invoice.submit).forEach((el) => {
  el.addEventListener("click", submitForm);
});
/* ----------------- */
/* SUBMIT HANDLE END */
/* ----------------- */
