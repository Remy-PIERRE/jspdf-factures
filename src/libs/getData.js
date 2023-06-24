const getData = async (dataName) => {
  try {
    const resp = await fetch(`/public/json/${dataName}.json`);
    const data = resp.json();
    return data;
  } catch (error) {
    console.log(`Failed getting ${dataName} (/libs/getData.js)`);
  }
};

const getAllData = async () => {
  /* get data --- "issuers", "clients", "invoices" */
  const issuersData = await getData("issuers");
  const clientsData = await getData("clients");
  const invoicesData = await getData("invoices");

  return { issuersData, clientsData, invoicesData };
};

export { getData, getAllData };
