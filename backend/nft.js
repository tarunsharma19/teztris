
// const { PDFDocument, rgb, degrees } = PDFLib;

const PDFLib = require("pdf-lib");
const pinata = require("./pinata");
var fs = require('fs');
var PDFImage = require("./convertor").PDFImage;

const { exec } = require("child_process"); 

// const pdfToImg = require("pdf-to-img");
// pdfToImg.setOptions({
//   type: "png",       // Output image type
//   size: "800x800", // Output image size
//   quality: 100,      // Output image quality
// });



const nftFlow = async (player1, player2, amount, token) => {

  try {
    console.log('inside nft flow');

    generatePDF(player1, player2, amount, token);

    // get file
    // let img = fs.createReadStream('./trial.pdf');

    var pdfImage = new PDFImage("./trial.pdf");

    const img = await pdfImage.convertPage(0);
    // console.log(img);

    // pdfToImg.convert("./trial.pdf", (err, info) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     if (info.length > 0) {
    //       // Save the first page of the PDF as a PNG image
    //       const firstPageImage = info[0];
    //       fs.writeFile('./trial-0.png', firstPageImage.buffer, (writeErr) => {
    //         if (writeErr) {
    //           console.error(writeErr);
    //         } else {
    //           console.log(`PDF page saved as ${outputImagePath}`);
    //         }
    //       });
    //     } else {
    //       console.log("No pages found in the PDF.");
    //     }
    //   }
    // });


    // Only error is upload file to ipfs

    const res = await pinata.sendFileToIPFS();
    console.log(res);

    const res2 = await pinata.pinataWrapper(player1, player2, amount + " " + token, res.Ipfs);
    console.log(res2);

    return {
      success: true,
      Ipfs: res2.Ipfs
    };



  } catch (error) {
    console.log(error);
    return{
      success : false,
      Ipfs: ""
    };
  }
};


const generatePDF = async (player1, player2, amount, token) => {

  try {
    console.log('inside generate pdf');
    let existingPdfBytes;
    var text = fs.readFileSync('./template.pdf');
    // console.log(text);
    existingPdfBytes = text;
    // console.log(existingPdfBytes);

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    // console.log("pdfDoc", pdfDoc);

    const Poppins = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    // console.log("Poppins", Poppins);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    // console.log("pages", pages);

    const firstPage = pages[0];
    // console.log("firstPage", firstPage);

    // Draw a string of text diagonally across the first page

    let top = player1.substring(0, 4) + "...." + player1.substring(player1.length - 4, player1.length);

    let bottom = player2.substring(0, 4) + "...." + player2.substring(player2.length - 4, player2.length);

    firstPage.drawText(top, {
      x: 310,
      y: 470,
      size: 22,
      font: Poppins,
      color: PDFLib.rgb(1, 1, 1),
    });

    firstPage.drawText(bottom, {
      x: 310,
      y: 415,
      size: 22,
      font: Poppins,
      color: PDFLib.rgb(1, 1, 1),
    });

    firstPage.drawText(token + " " + amount*2, {
      x: 350,
      y: 337,
      size: 15,
      font: Poppins,
      color: PDFLib.rgb(1, 1, 1),
    });

    //   firstPage.drawText(token, {
    //     x: 400,
    //     y: 340,
    //     size: 12,
    //     // font: Poppins,
    //     color: PDFLib.rgb(1, 1, 1),
    //   });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    // console.log("pdfBytes", pdfBytes);


    // this was for creating uri and showing in iframe

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // console.log("pdfDataUri", pdfDataUri);

    // document.getElementById("pdf").src = pdfDataUri;

    fs.writeFileSync('./trial.pdf', pdfBytes);
    console.log("Done creating");

    return {
      success: true
    };


  } catch (error) {
    console.log(error);
    return { success: false };
  }



};

module.exports = { nftFlow };
