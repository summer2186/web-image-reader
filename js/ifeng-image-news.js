var wir = wir || {};

wir.name = "iFeng Image News";

// ifeng新闻是存放到一段script代码当中，虽然为全局变量，但是插件和页面的对象除了DOM其他都是是隔离的
// 因此，只能遍历script标签，找到对应的代码，进行执行

// 但凤凰网有几个版本，目前只支持一个
wir.getImagesInfo = function (callback) {
  var getTitle = function() {
    var titleDiv = getElementsByClassName('titL', 'div');
    if ( titleDiv != null ) {
      var eles = titleDiv[0].getElementsByTagName('h1');
      if ( eles.length == 1 ) {
        return eles[0].innerHTML;
      }
    }
    return "";
  }

  var scripts = document.querySelectorAll('script');
  var find = false;
  var imagesInfo = { title: getTitle(), type: 'list', images: [] };
  for(var i=0; i<scripts.length; ++i) {
    var html = scripts[i].innerHTML;
    if ( html.indexOf('G_listdata') >= 0 ) {
      find = true;
      html = html.replace("var", "");
      html = html.replace("G_listdata=", "");
      html = html.replace(";", "");
      var jsonObj = eval("("+html+")");
      console.info(jsonObj);
      if ( jsonObj != null ) {
        jsonObj.forEach(function(o) {
          imagesInfo.images.push( {url: o.originalimg, title: '', desc: o.title});
        });
      }
      callback(null, imagesInfo);
    }
  }

  if ( find == false ) {
      wir.otherGetAllImages(callback);
  }
}
