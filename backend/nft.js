
// const { PDFDocument, rgb, degrees } = PDFLib;

const PDFLib = require("pdf-lib");
var fs = require('fs');



const generatePDF = async (player1 , player2 , amount , token) => {
    
    let existingPdfBytes;
    var text = fs.readFileSync('./template.pdf');
    // console.log(text);
    existingPdfBytes = text;
    console.log(existingPdfBytes);

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

//   const Poppins = await pdfDoc.embedFont(PDFLib.StandardFonts.Poppins)

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(player1, {
    x: 350,
    y: 470,
    size: 22,
    // font: Poppins,
    color: PDFLib.rgb(1, 1, 1),
  });

  firstPage.drawText(player2, {
    x: 340,
    y: 420,
    size: 22,
    // font: Poppins,
    color: PDFLib.rgb(1, 1, 1),
  });

  firstPage.drawText(amount, {
    x: 350,
    y: 340,
    size: 12,
    // font: Poppins,
    color: PDFLib.rgb(1, 1, 1),
  });

  firstPage.drawText(token, {
    x: 400,
    y: 340,
    size: 12,
    // font: Poppins,
    color: PDFLib.rgb(1, 1, 1),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  // document.getElementById("pdf").src = pdfDataUri;

  fs.writeFileSync('./trial.pdf', pdfBytes);


};



generatePDF("udit" , "tarun" , "50" , "XTZ");