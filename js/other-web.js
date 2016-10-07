var wir = wir || {};

wir.name = "Other Web Page";

wir.IMG_MIN_HEIGHT = 40;
wir.IMG_MIN_WIDTH = 40;

wir.otherGetAllImages = function(callback) {
  var imagesInfo = { type: "matrix", title: document.title, images: [] }
  for(var i=0; i<document.images.length; ++i) {
    var img = document.images[i];
    if ( img.naturalWidth >= wir.IMG_MIN_WIDTH && img.naturalHeight >= wir.IMG_MIN_HEIGHT ) {
      imagesInfo.images.push( { url: img.src, title: "", desc: "" });
    }
  }
  /*document.images.forEach(function(img) {

  });*/
  callback(null, imagesInfo);
}
