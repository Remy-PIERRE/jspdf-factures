const { jsPDF } = window.jspdf;
import generateInvoicePdf from "../models/invoice/model.js";

const createPdf = (data, model, action) => {
  const doc = jsPDF();

  switch (model) {
    case "invoice":
      generateInvoicePdf(doc, data);
  }

  if (action === "show") {
    var string = doc.output("datauristring");
    var iframe =
      "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  } else if (action === "save") {
    doc.save(`${model}.pdf`);
  }
};

export default createPdf;
