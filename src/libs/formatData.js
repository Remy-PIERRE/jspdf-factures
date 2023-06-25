import Issuer from "../classes/Issuer.js";
import Client from "../classes/Client.js";
import Invoice from "../classes/Invoice.js";

const formatData = (inputs, formName) => {
  const data = {};
  [...inputs].forEach((input) => {
    data[input.name] = input.value;
  });

  let formatedData;
  if (formName === "issuerForm") formatedData = new Issuer(data);
  if (formName === "clientForm") formatedData = new Client(data);
  if (formName === "invoiceForm") formatedData = new Invoice(data);

  return formatedData;
};

export { formatData };
