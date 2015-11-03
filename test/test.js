var mocha = require('mocha');
var chai = require('chai');
var fs = require('fs');
var reader = require("../lib/readBitmap");

describe("readBitmap", function() {
  it("should read a bitmap file into three buffers", function() {
    expect(reader.readBitmap(fs.readFileSync('bitmap1.bmp'))).to.have.length(3);
  });
}); 

// Blerg this does not work at all :(