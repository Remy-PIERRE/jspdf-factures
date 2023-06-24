const handleForm = (elements) => {
  const [issuerSelect, clientSelect, invoiceSelect] = elements;

  if (
    issuerSelect.value === "null" ||
    clientSelect.value === "null" ||
    invoiceSelect.value === "null"
  )
    return handleFormError(elements);

  return true;
};

const handleFormError = (elements) => {
  const [issuerSelect, clientSelect, invoiceSelect] = elements;

  return false;
};

export default handleForm;
