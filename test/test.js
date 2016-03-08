var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
process.argv = ['node', 'index', 'invert'];
var reader = require("../lib/readBitmap");
var transformer = require("../lib/transformer");
var buffs;


describe("readBitmap", function() {
  before(function(done) {
    fs.readFile(__dirname + '/../bitmap1.bmp', function(err, data) {
      if(err) console.log(err);
      buffs = reader.readBitmap(data);
      done();
    })
  })

  it("should read a bitmap file into three buffers", function() {
    expect(buffs).to.have.length(3);
    expect(buffs[0]).to.be.an.instanceof(Buffer);
    expect(buffs[1]).to.be.an.instanceof(Buffer);
    expect(buffs[2]).to.be.an.instanceof(Buffer);
  });
});

describe("transformer", function() {
  it('should brighten pixels', function() {
    expect(transformer.transform.brighten(100)).to.eql(200);
  })

  it('should whiten pixels', function() {
    expect(transformer.transform.whiten(100)).to.eql(255);
  })

  it('should blacken pixels', function() {
    expect(transformer.transform.darken(100)).to.eql(0);
  })

  it('should invert pixels', function() {
    expect(transformer.transform.invert(100)).to.eql(155);
  })

  it('should randomize pixels', function() {
    expect(transformer.transform.randomize(100)).to.be.a('number')
    expect(transformer.transform.randomize(100) < 256).to.be.true;
    expect(transformer.transform.randomize(100) > -1).to.be.true;
  })
});
