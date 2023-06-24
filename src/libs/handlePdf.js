const { jsPDF } = window.jspdf;

/* handle pdf cycle --- after "click" on pdfShow or pdfSave */
const handlePdf = (action, data) => {
  const [issuerSelected, clientSelected, invoiceSelected] = data;

  const doc = createPdfDoc();
  generatePdf(doc, data);

  if (action === "save")
    savePdf(doc, `facture-${invoiceSelected.id}-${invoiceSelected.date}`);
  if (action === "show") showPdf(doc);
};

/* create doc */
const createPdfDoc = () => {
  const doc = jsPDF();
  return doc;
};

function generatePdf(doc, [issuer, client, invoice]) {
  /* get custom font */
  doc.addFont("/public/font/AlegreyaSans-Medium.ttf", "AlegreyaSans", "normal");
  doc.addFont("/public/font/AlegreyaSans-Bold.ttf", "AlegreyaSans", "bold");

  /* HEADER */
  const header_x_l = 16;
  const header_y_l = 16;
  const header_x_r = 196;
  const header_y_r = 12;

  /* left part */
  const logo_sigle = new Image();
  logo_sigle.src = `/public/assets/images/${issuer.images.logo}`;
  doc.addImage(logo_sigle, "png", header_x_l, header_y_l, 30, 15);
  const logo_nom = new Image();
  logo_nom.src = `/public/assets/images/${issuer.images.name}`;
  doc.addImage(logo_nom, "png", header_x_l + 30, header_y_l + 10, 30, 5);

  /* right part */
  doc.setFont("AlegreyaSans", "normal");
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text(issuer.adress.street, header_x_r, header_y_r, {
    align: "right",
    baseline: "top",
  });
  doc.text(
    `${issuer.adress.cp}, ${issuer.adress.city}`,
    header_x_r,
    header_y_r + 4,
    {
      align: "right",
      baseline: "top",
    }
  );

  doc.setTextColor(100);
  doc.text(issuer.tel, header_x_r - 7, header_y_r + 10, {
    align: "right",
    baseline: "top",
  });
  doc.text(issuer.email, header_x_r - 7, header_y_r + 15, {
    align: "right",
    baseline: "top",
  });
  doc.text(issuer.url, header_x_r - 7, header_y_r + 20, {
    align: "right",
    baseline: "top",
  });

  const icon_tel = new Image();
  icon_tel.src = "/public/assets/images/icon_tel.png";
  doc.addImage(icon_tel, "png", header_x_r - 4, header_y_r + 10.5, 3, 3);
  const icon_email = new Image();
  icon_email.src = "/public/assets/images/icon_email.png";
  doc.addImage(icon_email, "png", header_x_r - 4, header_y_r + 15.5, 3, 3);
  const icon_web = new Image();
  icon_web.src = "/public/assets/images/icon_web.png";
  doc.addImage(icon_web, "png", header_x_r - 4, header_y_r + 20.5, 3, 3);

  /* bottom lines */
  doc.setFillColor(180);
  doc.rect(0, 45, 90, 2, "F");
  doc.setFillColor(80);
  doc.rect(90, 45, 120, 2, "F");

  /* INVOICE */

  /* INVOICE HEADER */
  const invoice_header_x_l = 16;
  const invoice_header_y_l = 55;
  const invoice_header_x_r = 90;
  const invoice_header_y_r = 55;

  /* left part */
  doc.setFont("AlegreyaSans", "bold");
  doc.setTextColor(0);
  doc.setFontSize(15);
  doc.text(client.name, invoice_header_x_l, invoice_header_y_l + 4.5, {
    baseline: "top",
  });

  doc.setFont("AlegreyaSans", "normal");
  doc.setTextColor(50);
  doc.setFontSize(12);
  doc.text("\xC0 l'atention de :", invoice_header_x_l, invoice_header_y_l, {
    baseline: "top",
  });
  doc.text(
    client.adresse.street,
    invoice_header_x_l,
    invoice_header_y_l + 10.5,
    { baseline: "top" }
  );
  doc.text(
    `${client.adresse.cp}, ${client.adresse.city}`,
    invoice_header_x_l,
    invoice_header_y_l + 14.5,
    {
      baseline: "top",
    }
  );

  doc.setTextColor(100);
  doc.text(`tel:  ${client.tel}`, invoice_header_x_l, invoice_header_y_l + 20, {
    baseline: "top",
  });
  doc.text(
    `e-mail:  ${client.email}`,
    invoice_header_x_l,
    invoice_header_y_l + 24.5,
    { baseline: "top" }
  );

  /* right part */
  doc.setFont("AlegreyaSans", "bold");
  doc.setTextColor(0);
  doc.setFontSize(50);
  doc.text("Facture", invoice_header_x_r, invoice_header_y_r - 4, {
    baseline: "top",
  });

  doc.autoTable({
    didDrawCell: (data) => {},
    theme: "plain",
    margin: {
      left: invoice_header_x_r,
    },
    startY: invoice_header_y_r + 17.5,
    styles: {
      font: "AlegreyaSans",
      valign: "middle",
      halign: "left",
      cellPadding: {
        top: 0,
        bottom: 0,
      },
      cellWidth: 45,
    },
    headStyles: {
      fontStyle: "normal",
      fontSize: 12,
      textColor: 100,
    },
    bodyStyles: {
      fontStyle: "bold",
      fontSize: 18,
      textColor: 1,
    },
    head: [["Total dû :", "Date :", "Facture :"]],
    body: [[`\$${invoice.total}`, invoice.date, `#${invoice.id}`]],
  });

  /* INVOICE TABLE */
  const invoice_table_x = 0;
  const invoice_table_y = 95;
  let invoice_total_price = 0;
  let invoice_table_y_end = 0;

  doc.autoTable({
    /* add invoice detail price to total */
    willDrawCell: (data) => {
      if (data.section === "body" && data.column.index === 3) {
        invoice_total_price +=
          invoice.details[data.row.index].unitPrice *
          invoice.details[data.row.index].quantity;
      }
    },
    /* add invoice detail name in column[0] after drawing description */
    didDrawCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        doc.setFontSize(15);
        doc.setTextColor(0, 0, 0, 1);
        doc.text(
          invoice.details[data.row.index].name,
          data.cell.x + 16,
          data.cell.y + 6
        );

        if (data.row.index === invoice.details.length - 1) {
          invoice_table_y_end = Math.round(data.row.height + data.cell.y);
          console.log(invoice_table_y_end);
        }
      }
    },
    theme: "plain",
    tableWidth: 210,
    startY: invoice_table_y,
    margin: {
      left: invoice_table_x,
    },
    styles: {
      font: "AlegreyaSans",
      fontSize: 12,
      valign: "middle",
      halign: "center",
    },
    headStyles: {
      fontStyle: "bold",
      fontSize: 13,
      textColor: 255,
      fillColor: 50,
    },
    bodyStyles: {
      lineColor: 130,
      lineWidth: {
        bottom: 0.2,
      },
      fillColor: 250,
    },
    columnStyles: {
      0: {
        fillColor: 220,
        halign: "left",
        cellPadding: {
          left: 16,
          top: 8,
          bottom: 4,
          right: 6,
        },
        cellWidth: 90,
        textColor: 80,
        fontSize: 10,
      },
      1: {
        cellWidth: 40,
      },
    },
    head: [
      [
        {
          content: "DESCRIPTION",
          styles: {
            halign: "left",
            cellPadding: {
              left: 16,
            },
          },
        },
        "PRIX UNITAIRE",
        "QUANTITE",
        "TOTAL",
      ],
    ],
    body: invoice.details.map((e) => [
      e.description,
      `\$${e.unitPrice}`,
      e.quantity,
      `\$${+e.unitPrice * +e.quantity}`,
    ]),
  });

  /* INVOICE FOOTER */
  let invoice_footer_y_l;
  let invoice_footer_y_r;
  if (297 - invoice_table_y_end < 90) {
    doc.addPage();
    invoice_footer_y_l = 26;
    invoice_footer_y_r = 16;
  } else {
    invoice_footer_y_l = invoice_table_y_end + 20;
    invoice_footer_y_r = invoice_table_y_end + 10;
  }
  /* left part */
  const xLeft = 16;

  doc.setFillColor(150);
  doc.rect(xLeft, invoice_footer_y_l, 75, 0.2, "F");

  doc.setFont("AlegreyaSans", "bold");
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.text("Méthodes de paiement", xLeft, invoice_footer_y_l - 2, {
    baseline: "bottom",
  });

  doc.setFontSize(8);
  doc.text("Papypal : ", xLeft, invoice_footer_y_l + 3, { baseline: "top" });
  doc.text("Autres : ", xLeft, invoice_footer_y_l + 8, { baseline: "top" });

  doc.setFont("AlegreyaSans", "normal");
  doc.setTextColor(100);
  doc.text("paypal@company.com", xLeft + 12, invoice_footer_y_l + 3, {
    baseline: "top",
  });
  doc.text("Visa, Master Card, Chèque", xLeft + 10, invoice_footer_y_l + 8, {
    baseline: "top",
  });

  /* right part */
  const invoice_footer_x_r = 140;

  doc.autoTable({
    willDrawCell: (data) => {
      if (data.column.index === 1) {
        data.cell.width = 40;
        data.cell.styles.cellPadding = { right: 7 };
      }
    },
    theme: "plain",
    margin: {
      right: 0,
      left: invoice_footer_x_r,
    },
    startY: invoice_footer_y_r,
    styles: {
      font: "AlegreyaSans",
      fontSize: 12,
      valign: "middle",
      halign: "right",
    },
    headStyles: {
      fontStyle: "bold",
      textColor: 0,
    },
    bodyStyles: {
      fontStyle: "normal",
      textColor: 100,
    },
    footStyles: {
      fontStyle: "bold",
      textColor: 255,
      fillColor: 50,
    },
    columnStyles: {
      0: {
        cellWidth: 30,
      },
      1: {
        cellWidth: 40,
        cellPadding: {
          right: 20,
        },
      },
    },
    head: [["Sous-total", `\$${invoice_total_price}`]],
    body: [
      ["TVA 20%", `\$${invoice_total_price * 0.2}`],
      ["Remise 15%", `\$${invoice_total_price * 0.15}`],
    ],
    foot: [
      [
        "TTC",
        `\$${
          invoice_total_price -
          invoice_total_price * 0.2 +
          invoice_total_price * 0.15
        }`,
      ],
    ],
  });

  /* FOOTER */
  const footer_x_l = 16;
  const footer_y_l = 250;

  /* left part */
  doc.setFillColor(220);
  doc.rect(footer_x_l, footer_y_l, 2, 21, "F");

  doc.setFont("AlegreyaSans", "bold");
  doc.setTextColor(0);
  doc.setFontSize(16);
  doc.text("Merci d'avoir fait appel à nous !", footer_x_l + 5, footer_y_l, {
    baseline: "top",
  });

  doc.setFontSize(10);
  doc.text("Termes & conditions :", footer_x_l + 5, footer_y_l + 8, {
    baseline: "top",
  });

  doc.setTextColor(80);
  doc.text(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, itaque?",
    footer_x_l + 5,
    footer_y_l + 12,
    { baseline: "top", maxWidth: "76" }
  );

  /* right part */
  const footer_x_r = 170;
  const footer_y_r = 250;

  doc.setFont("AlegreyaSans", "normal");
  doc.setTextColor(80);
  doc.setFontSize(10);
  doc.text("Gestionnaire :", footer_x_r, footer_y_r, {
    baseline: "top",
    align: "center",
  });

  doc.setFont("AlegreyaSans", "bold");
  doc.setTextColor(0);
  doc.setFontSize(15);
  doc.text(issuer.name, footer_x_r, footer_y_r + 5, {
    baseline: "top",
    align: "center",
  });

  const image = new Image();
  // image.src = "/public/assets/images/signature.png";
  image.src = `/public/assets/images/${issuer.images.signature}`;
  doc.addImage(image, "PNG", footer_x_r - 50 / 2, footer_y_r + 15, 50, 10);

  /* PAGE COUNT */
  const pageCount = doc.internal.getNumberOfPages();

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      "Page " + String(i) + " of " + String(pageCount),
      doc.internal.pageSize.width / 2,
      287,
      {
        align: "center",
      }
    );
  }
}

/* show pdf on new tab */
const showPdf = (doc) => {
  console.log("enter showPdf function");
  var string = doc.output("datauristring");
  var iframe =
    "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
  var x = window.open();
  x.document.open();
  x.document.write(iframe);
  x.document.close();
};

/* save doc with given name */
const savePdf = (doc, name) => {
  doc.save(`${name}.pdf`);
};

export default handlePdf;
