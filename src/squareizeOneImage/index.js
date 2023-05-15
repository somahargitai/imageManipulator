const Jimp = require("jimp");

const inputPath = "./sampleData/input/exampleImage.jpg";
const outputPath = "./sampleData/output/exampleImage.jpg";

Jimp.read(inputPath, (err, image) => {
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
  const squareImage = new Jimp(maxDimension, maxDimension, 0xffffffff);

  // Paste the original image onto the square canvas
  squareImage.composite(image, xOffset, yOffset);

  // Save the resulting image
  squareImage.write(outputPath);
});
