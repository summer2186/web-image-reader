function getElementsByClassName(clsName, tagName) {
    var ClassElements = [];
    selElements = document.getElementsByTagName(tagName);

    for (var i = 0; i < selElements.length; i++) {
        if (selElements[i].className == clsName) {
            ClassElements[ClassElements.length] = selElements[i];
        }
    }
    return ClassElements;
}


function getImagesInfoProvider() {
  if ( window.wir.hasOwnProperty('getImagesInfo') ) {
    return window.wir.getImagesInfo;
  }
  else {
    return window.wir.otherGetAllImages;
  }
}

function getImgNaturalDimensions(img, callback) {
    var nWidth, nHeight
    if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
    } else { // IE6/7/8
        var imgae = new Image()
        image.src = img.src
        image.onload = function() {
            callback(image.width, image.height)
        }
    }
    return [nWidth, nHeight]
}
