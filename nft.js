
// const { PDFDocument, rgb, degrees } = PDFLib;

const PDFLib = require("pdf-lib");
const pinata = require("./pinata");
var fs = require('fs');
var PDFImage = require("pdf-image").PDFImage;
const pdfConverter = require('pdf-poppler');
const path = require('path');


const nftFlow = async(player1 , player2 , amount , token) =>{

    try {
        console.log('inside nft flow');

        generatePDF(player1 , player2 , amount , token);

        // get file
        // let img = fs.createReadStream('./trial.pdf');

        // var pdfImage = new PDFImage("./trial.pdf");
        // console.log(fs.existsSync("./trial-0.png"));

        // const img = await pdfImage.convertPage(0);
        // console.log(img);

        // console.log(fs.existsSync("./trial-0.png"));

        const dirname = path.resolve();
        
        console.log(dirname);
        console.log(path.join(dirname,'trial.pdf'));

        convertImage(path.join(dirname,'trial.pdf'));

        // pdfImage.convertPage(0).then(function (imagePath) {
        //   // 0-th page (first page) of the slide.pdf is available as slide-0.png
        //   fs.existsSync("./trial-0.png") // => true
        // });


        // Only error is upload file to ipfs

        // const res = await pinata.sendFileToIPFS();
        // console.log(res);

        // const res2 = await pinata.pinataWrapper(player1 , player2 , amount+" "+token , res.Ipfs);
        // console.log(res2);

        return{
            success : true,
            Ipfs : ""
        };


        
    } catch (error) {
        console.log(error);
    }
};


function convertImage(pdfPath) {

  let option = {
      format : 'png',
      out_dir : path.resolve(),
      out_prefix : 'check',
      page : 1
  }
// option.out_dir value is the path where the image will be saved

  pdfConverter.convert(pdfPath, option)
  .then(() => {
      console.log('file converted')
  })
  .catch(err => {
      console.log('an error has occurred in the pdf converter ' + err)
  })

}


const generatePDF = async (player1 , player2 , amount , token) => {

    try {
        console.log('inside generate pdf');
        let existingPdfBytes;
        var text = fs.readFileSync('./template.pdf');
        // console.log(text);
        existingPdfBytes = text;
        console.log(existingPdfBytes);
    
      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    
      const Poppins = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    
      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
    
      // Draw a string of text diagonally across the first page

        let top = player1.substring(0,4) + "...." + player1.substring(player1.length-4,player1.length);

        let bottom = player2.substring(0,4)+"...."+player2.substring(player2.length-4,player2.length);

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
    
      firstPage.drawText(token +" "+ amount, {
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
      
    
      // this was for creating uri and showing in iframe
    
      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    
      // document.getElementById("pdf").src = pdfDataUri;
    
      fs.writeFileSync('./trial.pdf', pdfBytes);
      console.log("Done creating");
    
      return{
          success : true
      };
    
        
    } catch (error) {
        console.log(error);
        return{success : false};
    }
    
   

};

// remove after testing
nftFlow("skm" , "skkkmmm" , "" ,"" );

module.exports = {nftFlow};