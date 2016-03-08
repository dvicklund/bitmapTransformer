// Import filesystem module
var fs = require('fs');
var reader = require('./lib/readBitmap');
var buffs;
var finalBuffer;

// Read bitmap1.bmp
fs.readFile('bitmap1.bmp', function(error, data){
  if (error) console.log(error);
  buffs = reader.readBitmap(data);

  // Concatenate list of buffers back into a single one
  finalBuffer = Buffer.concat(buffs);

  // Finally, save the output to an external file
  fs.writeFile('bitmap2.bmp', finalBuffer, function(err) {
    if (err) console.log(err);
    console.log("Saved");
  });
});
