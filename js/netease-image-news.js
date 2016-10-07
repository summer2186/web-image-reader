var wir = wir || {};

wir.name = "Netease Image News";

wir.getImagesInfo = function (callback) {
  // 目前已知网易有两种数据结构来存放图片列表信息
  // 一种是在textarea里面存放HTML元素来分割
  // http://news.163.com/photoview/00AN0001/2203124.html?from=ph_ss
  // 另外一种就是textarea里面存放json数据
  // http://news.163.com/photoview/00AP0001/2203089.html?from=ph_ss#p=C2PI7FMJ00AP0001
  var getTitle = function() {
    var titleDiv = getElementsByClassName('nph_set_title', 'div');
    if ( titleDiv != null && titleDiv.length == 0 ) {
      titleDiv = getElementsByClassName('headline', 'div');
    }
    if ( titleDiv != null && titleDiv.length == 1 ) {
      var eles = titleDiv[0].getElementsByTagName('h1');
      if ( eles.length == 1 ) {
        return eles[0].innerHTML;
      }
    }
    return "";
  }

  var imagesInfo = { title: getTitle(), type: 'list', images: []};

  var getImagesInfoByJSON = function() {
    var hideTextarea = document.getElementsByName('gallery-data');
    if ( hideTextarea != null && hideTextarea.length == 1 ) {
      var galleryData = window.JSON.parse(hideTextarea[0].innerHTML);
      galleryData.list.forEach(function(img) {
        imagesInfo.images.push({ url: img.oimg, title: "", desc: img.note });
      });
    }
  }

  var getImagesInfoByEle = function() {
    var hideTextarea = document.getElementById('photoList');
    if ( hideTextarea != null ) {
      var div = document.createElement("div");
      div.innerHTML = hideTextarea.textContent;
      var allLi = div.getElementsByTagName('li');
      for(var j=0; j<allLi.length; ++j) {
        var li = allLi[j];
        var image = { title: '' };
        var p = li.getElementsByTagName('p');
        if ( p.length >= 1 ) {
          image.desc = p[0].innerHTML;
        }
        var i = li.getElementsByTagName('i');
        if ( i.length >= 1 ) {
          image.url = i[0].innerHTML;
        }

        imagesInfo.images.push(image);
      }
    }
  }

  getImagesInfoByJSON();
  getImagesInfoByEle();
  callback(null, imagesInfo);

  /*
  var hideTextarea = document.getElementById('photoList');
  if ( hideTextarea == null ) {
    callback(new Error('no images data found!, cant find hide textarea'), null);
    return;
  }
  var allLi = hideTextarea.getElementsByTagName('li');
  if ( allLi == null ) {
    callback(new Error('textarea has no li elements'), null);
  }

  allLi.forEach(function(li) {

  });*/
}
