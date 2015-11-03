var transform = {
  // Transform methods
  brighten: function(pixel) {
    if (pixel + 100 > 255) return 255;
    else return pixel + 100;
  },

  darken: function(pixel) {
    if(pixel - 100 < 0) return 0;
    else return pixel - 100;
  },

  whiten: function(pixel) {
    return 255;
  },

  blacken: function(pixel) {
    return 0;
  },

  invert: function(pixel) {
    return  255 - pixel;
  },

  randomize: function(pixel) {
    return Math.floor(Math.random() * 255);
  }
};


exports.transform = transform;