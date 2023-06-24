import getDataAndElements from "./getDataAndElements.js";
import populateSelects from "../libs/populateSelects.js";
import handlePdf from "../libs/handlePdf.js";
import handleForm from "../libs/handleForm.js";

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
  const isFormValid = handleForm([
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

pdfSave.addEventListener("click", handlePdfListener);
pdfShow.addEventListener("click", handlePdfListener);

/* ----------------- */
/* SUBMIT HANDLE END */
/* ----------------- */
