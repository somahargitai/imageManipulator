const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const sizeOf = require("image-size");

const inputPath = "./sampleData/input";
const outputPath = "./sampleData/output";

const desiredWidth = 1500;
const desiredHeight = 2000;

const files = fs.readdirSync(inputPath);

const targetFiles = files.filter((file) => {
  return (
    path.extname(file).toLowerCase() === ".jpg" ||
    path.extname(file).toLowerCase() === ".png" ||
    path.extname(file).toLowerCase() === ".jpeg"
  );
});

let data = {};
let count = 0;

targetFiles.forEach((imageFileName) => {
  let inputImagePath = inputPath + "/" + imageFileName;
  let outputImagePath = outputPath + "/" + imageFileName;

  Jimp.read(inputImagePath, (err, image) => {
    // Resize the image while preserving the aspect ratio
    image
      .contain(
        desiredWidth,
        desiredHeight,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .background(0xdcdcdcff); // Set the background color to white

    // Save the resulting image
    image.write(outputImagePath);
  });
});
