function removeElements(els) {
  for (var i = els.length - 1; i > -1; i--) {
    var el = els[i];
    el.parentNode.removeChild(el);
  };
};

function renderImages(images) {
  console.log("render images for: " + window.wir.name + " URL:" + document.URL);
  console.info(images);

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
