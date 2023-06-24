import { getAllData } from "../libs/getData.js";
import {
  getAllForms,
  getAllSelects,
  getAllSubmit,
  getAllReset,
  getAllPdfButtons,
} from "../libs/getElements.js";

const getDataAndElements = async () => {
  /* get data from json */
  const { issuersData, clientsData, invoicesData } = await getAllData();

  /* get form elements */
  const { issuerForm, clientForm, invoiceForm } = getAllForms();

  /* get select elements */
  const { issuerSelect, clientSelect, invoiceSelect } = getAllSelects();

  /* get submit elements */
  const { issuerSubmit, clientSubmit, invoiceSubmit } = getAllSubmit();

  /* get reset elements */
  const { issuerReset, clientReset, invoiceReset } = getAllReset();

  /* get pdf buttons */
  const { pdfShow, pdfSave } = getAllPdfButtons();

  return {
    issuer: {
      data: issuersData,
      form: issuerForm,
      select: issuerSelect,
      submit: issuerSubmit,
      reset: issuerReset,
    },
    client: {
      data: clientsData,
      form: clientForm,
      select: clientSelect,
      submit: clientSubmit,
      reset: clientReset,
    },
    invoice: {
      data: invoicesData,
      form: invoiceForm,
      select: invoiceSelect,
      submit: invoiceSubmit,
      reset: invoiceReset,
    },
    pdfShow,
    pdfSave,
  };
};

export default getDataAndElements;
