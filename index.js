// Import filesystem module
var fs = require('fs');
var reader = require('./lib/readBitmap');
var transformer = require('./lib/transformer');
var buffs;
var finalBuffer;

// Read bitmap1.bmp to Buffer "bitmap"
var bitmap = fs.readFile('bitmap1.bmp', function(error, data){
  if (error) console.log(error);
  buffs = reader.readBitmap(data);

  // Run a transform
  

  finalBuffer = Buffer.concat(buffs);

  // Finally, save the output to an external file
  fs.writeFile('bitmap2.bmp', finalBuffer, function(err) {
    if (err) console.log(err);
    console.log("Saved");
  });
});


