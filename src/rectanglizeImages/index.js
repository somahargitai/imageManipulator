const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const sizeOf = require("image-size");

const inputPath = "./sampleData/input";
const outputPath = "./sampleData/output";

const desiredWidth = 1500;
const desiredHeight = 2000;

async function resizeImage(imageFileName) {
  const files = await fs.readdirSync(inputPath);

  const targetFiles = files.filter((file) => {
    return (
      path.extname(file).toLowerCase() === ".jpg" ||
      path.extname(file).toLowerCase() === ".png" ||
      path.extname(file).toLowerCase() === ".jpeg"
    );
  });

  // filter out images that are already resized
  const resizedFiles = await fs.readdirSync(outputPath);
  const newResizesToDo = targetFiles.filter((file) => {
    return !resizedFiles.includes(file);
  });

  console.log('---------------------------------')
  console.log('Will resize these files:')
  console.log(newResizesToDo)
  console.log('---------------------------------')


  // ?

  // https://github.com/jimp-dev/jimp/issues/915

  let data = {};
  let count = 0;

  for (imageFileName of newResizesToDo) {
    console.log(imageFileName);
    let inputImagePath = inputPath + "/" + imageFileName;
    let outputImagePath = outputPath + "/" + imageFileName;

    const image = await Jimp.read(inputImagePath);

    // Resize the image while preserving the aspect ratio
    await image
      .contain(
        desiredWidth,
        desiredHeight,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .background(0xdcdcdcff); // Set the background color to white

    // Save the resulting image
    await image.write(outputImagePath);
    console.log(`Image resized: ${imageFileName}`);
  }
}
resizeImage();
