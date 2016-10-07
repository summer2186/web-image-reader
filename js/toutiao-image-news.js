var wir = wir || {};

wir.name = "Toutiao Image News";

wir.getImagesInfo = function (callback) {
  // 头条无法通过URL来分析出是否为图片新闻，尝试查找页面元素进行分析
  var slideList = getElementsByClassName('slide-list unslider-wrap unslider-carousel', 'ul');
  var imagesInfo = { title: '', type: 'list', images: []};
  var find = false;
  if ( slideList.length == 1 ) {
    find = true;
    var allLi = slideList[0].getElementsByTagName('li');
    for(var i = 0; i < allLi.length; ++i ) {
      var imgs = allLi[i].getElementsByTagName('div');
      if ( imgs.length == 1 ) {
        imagesInfo.images.push( { url:imgs[0].getAttribute('data-src'), title: '', desc: '' });
      }
    }
  }

  if ( find == false ) {
    wir.otherGetAllImages(callback);
    return;
  }

  var getTitle = function() {
    var titleDiv = getElementsByClassName('sidebar', 'div');
    if ( titleDiv != null && titleDiv.length == 1 ) {
      var eles = titleDiv[0].getElementsByTagName('h2');
      if ( eles.length == 1 ) {
        return eles[0].innerHTML;
      }
    }
    return "";
  }

  imagesInfo.title = getTitle();

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
