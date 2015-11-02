var transformer = require('./transformer');

function readBitmap(data) {
  // save head information from bitmap file
  var headerField1 = data.readUInt8(0);
  var headerField2 = data.readUInt8(1);
  var headerFieldParsed = String.fromCharCode(headerField1) +
                          String.fromCharCode(headerField2);

  var size = data.readUInt32LE(2);
  var headerSize = data.readUInt32LE(14) +14;
  var pixelDataStart = data.readUInt32LE(10);
  var numberOfColors = data.readUInt32LE(46);
  console.log("number of colors: " + numberOfColors);
  var bitsPerPixel = data.readUInt16LE(28);

  var palleteSize = pixelDataStart - headerSize;

  // Split head and pixel data into separate new Buffers
  var headBuffer = new Buffer(headerSize);
  var palleteBuffer = new Buffer(pixelDataStart - headerSize);
  var pixelBuffer = new Buffer(size - pixelDataStart);

  // Loop through the head of the original file to populate headBuffer
  for (i = 0; i < headerSize; i+=2) {
    var storage = data.readUInt16LE(i);
    headBuffer.writeUInt16LE(storage, i);
  }

  var transformMethod;

  // Loop through and populate palleteBuffer, transforming in the process
  for (i = headerSize; i < palleteSize; i++) {
    var temp = data.readUInt8(i);
    switch(transformMethod) {
      case ("brighten"): 
        temp = transformer.transform.brighten(temp);
        break;
      case ("darken"):
        temp = transformer.transform.darken(temp);
        break;
      case ("invert"):
        temp = transformer.transform.invert(temp);
        break;
      case ("randomize"):
        temp = transformer.transform.randomize(temp);
        break;
      default: 
        return;
    }
    palleteBuffer.writeUInt8(temp, i - headerSize);
  }

  // Loop through body of the original file to populate pixelBuffer with 
  // transformed pixels
  for (i = pixelDataStart; i < size; i++) {
    var tmp = data.readUInt8(i);
    pixelBuffer.writeUInt8(tmp, i - pixelDataStart);
  }

  // Since the .concat method takes a list of buffers, assign an array with a list
  // of the buffers and then join them with .concat
  var buffers = [headBuffer, palleteBuffer, pixelBuffer];
  

  return buffers;
}

exports.readBitmap = readBitmap;