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
    return window.wir.otherGetImagesInfo;
  }
}
