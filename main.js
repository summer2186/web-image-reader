


// 获取所有的图片信息
function getImagesInfo(callback) {
  var host = window.location.host;
  var path = window.location.pathname;
  var imagesInfo = null
  // we need async...
  var find = false;
  imagesInfoProcessorTable.forEach(function(p) {
      p[0]( host, path, function(result) {
        if ( result == true ) {
          find = true;
          p[1](host, path, function(error, images) {
            callback(error, images);
          });
        }
      });
  });

  // ??? real to do?
  if ( find == false ) {
    callback(new Error('no processor to process current paga'), null);
  }
}

function renderImages(images) {
  console.log("render images for: " + window.wir.name + " URL:" + document.URL);
  console.info(images);

  var testdiv = document.createElement("div");
  testdiv.innerHTML="<p>I inserted <em>this</em> content.</p>";
  testdiv.id = 'wirImagesDiv';
  // testdiv.style.background = '#0C0';
  document.body.appendChild(testdiv);
}

getImagesInfoProvider()(function(error, images) {
  if ( error == null  ) {
    renderImages(images);
  } else {
    console.info(error);
  }
});
