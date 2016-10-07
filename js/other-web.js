function otherGetAllImages() {

}

if ( window.hasOwnProperty("wir") && !window.wir.hasOwnProperty(getImagesInfo) ) {
  window.wir.getImagesInfo = otherGetAllImages;
} else {
  window.wir = { getImagesInfo: otherGetAllImages }
}
