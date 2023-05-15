const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const sizeOf = require("image-size");

const inputPath = "./sampleData/input";
const outputPath = "./sampleData/output";

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

  let dimensions = sizeOf(inputImagePath);
  let filesize = fs.statSync(inputImagePath);

  Jimp.read(inputImagePath, (err, image) => {
    if (err) {
      throw err;
    }

    const width = image.getWidth();
    const height = image.getHeight();

    // Determine the larger dimension
    const maxDimension = Math.max(width, height);

    // Calculate the offset for centering the image
    const xOffset = (maxDimension - width) / 2;
    const yOffset = (maxDimension - height) / 2;

    // Create a new image with a white background
    const squareImage = new Jimp(maxDimension, maxDimension, 0xdcdcdcff);

    // Paste the original image onto the square canvas
    squareImage.composite(image, xOffset, yOffset);

    // Save the resulting image
    squareImage.write(outputImagePath);
  });
});
