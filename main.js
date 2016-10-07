


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

function removeElements(els) {
  for (var i = els.length - 1; i > -1; i--) {
    var el = els[i];
    el.parentNode.removeChild(el);
  };
};

function renderImages(images) {
  console.log("render images for: " + window.wir.name + " URL:" + document.URL);
  console.info(images);

  /*var testdiv = document.createElement("div");
  testdiv.innerHTML="<p>I inserted <em>this</em> content.</p>";
  testdiv.id = 'myModal';
  testdiv.className = "reveal-modal";
  var closeLink = document.createElement("a");
  closeLink.className = "close-reveal-modal";
  closeLink.innerHTML = "x";
  testdiv.appendChild(closeLink);
  // testdiv.style.background = '#0C0';
  document.body.appendChild(testdiv);*/

  /*var d = dialog({
        title: '欢迎',
        content: '欢迎使用 artDialog 对话框组件！',
        width: 460
    });
    d.showModal();*/

    /*var index = layer.open({
      title: images.title,
      type: 1,
      closeBtn: 1,
      content: '<p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p>' +
        '<p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p>'+
        '<p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p>',
      area: ['100%', '100%'],
      maxmin: true,
      success: function(layero, index){
        // fix
        var closeLink = getElementsByClassName('layui-layer-ico layui-layer-close layui-layer-close1', 'a');
        closeLink[0].innerHTML = "[X]";
      }
    });
    layer.full(index);*/

    /*var testDiv = document.createElement('div');
    testDiv.id = 'wir_images_popup';
    testDiv.className = 'pop_up popup_hide';
    testDiv.innerHTML = "<p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p><p>111</p>";

    var closeDiv = document.createElement('div');
    closeDiv.className = 'pop_up_close';
    testDiv.appendChild(closeDiv);

    document.body.innerHTML = "";
    document.body.appendChild(testDiv);

    var popupView = new popup();
    popupView.show(document.querySelector('#wir_images_popup'), "", function () {
        console.log('show do something');
        window.location.reload();
    });*/

    var renderAsList = function() {
      var table = document.createElement('table');
      table.className = "wirTable";
      table.setAttribute('border', '0');
      table.setAttribute('cellpadding', '15');
      var html = "<thead><tr class=\"wirTR\"><td class=\"wirTD\"><div class=\"wirTitle\"><h1 class=\"wirTitleFont\">" + images.title + "</h1></div></td></tr></thead>";
      html += "<tr><td class=\"wirTD\"><a href=\""+document.URL+"\">来源：" + document.URL + "</a></td><td td class=\"wirTD\"><a href=\"#\" onclick=\"window.location.reload()\">[关闭]</a></td></tr>";
      var imgCnt = 1;
      images.images.forEach(function(img){
        var imtCntStr = " ( " + (imgCnt++) + " / " + images.images.length + " )";
        html += "<tr class=\"wirTR\"><td class=\"wirTD\"><img class=\"wirImg\" src=\"" +　img.url + "\"/></tr></td>";
        html += "<tr class=\"wirTR\"><td class=\"wirTD\">" +　img.desc + imtCntStr + "</tr></td>";
        table.innerHTML = html;
      });
      return table;
    }

    var renderAsMatrix = function() {
      var table = document.createElement('table');
      table.className = "wirTable";
      table.setAttribute('border', '0');
      table.setAttribute('cellpadding', '15');
      var html = "<thead><tr class=\"wirTR\"><td class=\"wirTD\"><div class=\"wirTitle\"><h1 class=\"wirTitleFont\">" + images.title + "</h1></div></td></tr></thead>";
      html += "<tr><td class=\"wirTD\"><a href=\""+document.URL+"\">来源：" + document.URL + "</a></td><td td class=\"wirTD\"><a href=\"#\" onclick=\"window.location.reload();void(0);\">[关闭]</a></td></tr>";
      var imgCnt = 1;
      images.images.forEach(function(img){
        var imtCntStr = " ( " + (imgCnt++) + " / " + images.images.length + " )";
        html += "<tr class=\"wirTR\"><td class=\"wirTD\"><img class=\"wirImg\" src=\"" +　img.url + "\"/></tr></td>";
        html += "<tr class=\"wirTR\"><td class=\"wirTD\">" +　img.desc + imtCntStr + "</tr></td>";
        table.innerHTML = html;
      });
      return table;
    }

    removeElements(document.querySelectorAll('script'));
    removeElements(document.querySelectorAll('object'));
    removeElements(document.querySelectorAll('style'));
    removeElements(document.querySelectorAll('link[rel=stylesheet]'));
    removeElements(document.querySelectorAll('iframe'));
    document.body.innerHTML = null;
    document.body.id = "";
    document.body.className = "wirBody";
    if ( images.type == "list" ) {
      document.body.appendChild(renderAsList());
    }else {
      document.body.appendChild(renderAsMatrix());
    }

    // 重新调整图片大小，以适应窗口大小
    var resizeAllImage = function() {
      $('img').each(function () {
        // console.info($(this));
        if ( $(this).attr('naturalWidth') >= document.body.clientWidth ) {
          $(this).attr('width', '100%');
        } else {
          // $(this).attr('width', '100%');
        }
      });
    }

    resizeAllImage();

}

isReading = false;

function startUp() {
  isReading = true;
  if (document.readyState == 'complete') {
    getImagesInfoProvider()(function(error, images) {
      if ( error == null  ) {
        renderImages(images);
      } else {
        console.info(error);
      }
    });
  } else {
    window.setTimeout(startUp, 100);
  };
}

if ( isReading == false ) {
  startUp();
} else {
  isReading = false;
  window.location.reload();
}
