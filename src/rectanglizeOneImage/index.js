const Jimp = require("jimp");

const inputPath = "./sampleData/input/exampleImage.jpg";
const outputPath = "./sampleData/output/exampleImage.jpg";

// Read the image
Jimp.read(inputPath, (err, image) => {
  if (err) throw err;

  const desiredWidth = 1500;
  const desiredHeight = 2000;

  // Resize the image while preserving the aspect ratio
  image
    .contain(
      desiredWidth,
      desiredHeight,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    )
    .background(0xffffffff); // Set the background color to white

  // Save the resulting image
  image.write(outputPath);
});
