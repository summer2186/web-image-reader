var wir = wir || {};

wir.name = "Sina Slide Image News(DL Tag Version)";

// sina有很多种图片新闻，使用DL标签包含数据
// http://slide.tech.sina.com.cn/digi/slide_5_30939_67449.html#p=5
// http://slide.news.sina.com.cn/c/slide_1_2841_103962.html#p=1
wir.getImagesInfo = function (callback) {
  var imagesInfo = { title: '', type: 'list', images: [] };
  var eData = document.getElementById('eData');
  if ( eData != null ) {
    var dlTags = eData.getElementsByTagName('dl');
    for (var i = 0; i < dlTags.length; i++) {
      var ddTags = dlTags[i].getElementsByTagName('dd');
      var dtTags = dlTags[i].getElementsByTagName('dt');
      if ( dtTags.length == 1 ) {
        imagesInfo.title = dtTags[0].innerHTML;
      }
      if ( ddTags.length >= 5 ){
        imagesInfo.images.push( { url: ddTags[0].innerHTML, title: '', desc: ddTags[4].innerHTML } );
      }
    }
    callback(null, imagesInfo);
  }else {
    callback(new Error('no eData div tag found!'), null);
  }
}
