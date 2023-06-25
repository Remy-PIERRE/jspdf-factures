const handleFormPdf = (elements) => {
  const [issuerSelect, clientSelect, invoiceSelect] = elements;

  if (
    issuerSelect.value === "null" ||
    clientSelect.value === "null" ||
    invoiceSelect.value === "null"
  )
    return handleFormError();

  return true;
};

const handleForm = (values) => {
  if (values.find((value) => value === "") !== undefined)
    return handleFormError();

  return true;
};

const handleFormError = () => {
  return false;
};

export { handleFormPdf, handleForm };
