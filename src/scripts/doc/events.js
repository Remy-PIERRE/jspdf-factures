import { generatePdfWithModel } from "./generateDoc.js";
import { model } from "../model/init.js";

const handleShowDoc = (event) => {
  event.preventDefault();
  const doc = generatePdfWithModel();
  if (!doc) return;
  showPdf(doc);
};

const showPdf = (doc) => {
  const string = doc.output("datauristring");
  const iframe =
    "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
  const x = window.open();
  x.document.open();
  x.document.write(iframe);
  x.document.close();
};

/* */
/* */
/* */
const handleSaveDoc = (event) => {
  event.preventDefault();
  const doc = generatePdfWithModel();
  if (!doc) return;
  savePdf(doc);
};

const savePdf = (doc) => {
  doc.save(`${model.current.id}.pdf`);
};

export { handleShowDoc, handleSaveDoc };
