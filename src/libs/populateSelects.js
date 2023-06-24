const populateSelects = async (data, elements) => {
  const [issuersData, clientsData, invoicesData] = data;
  const [issuerSelect, clientSelect, invoiceSelect] = elements;

  /* populate select => option with data */
  issuerSelect.innerHTML += `<option value="null">- - - </option>${issuersData.map(
    (el) => `<option value=${el.id}>${el.name}</option>`
  )}`;

  clientSelect.innerHTML += `<option value="null">- - - </option>${clientsData.map(
    (el) => `<option value=${el.id}>${el.name}</option>`
  )}`;

  invoiceSelect.innerHTML += `<option value="null">- - - </option>${invoicesData.map(
    (el) => `<option value=${el.id}>${el.date} ,  ${el.total} €</option>`
  )}`;
};

export default populateSelects;
