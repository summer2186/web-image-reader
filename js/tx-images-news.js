var wir = wir || {};

wir.name = "Tencent Image News";

wir.getImagesInfo = function (callback) {
  // http://news.qq.com/a/date/news_id.htm#p=N?
  // new images news_id.hdBigPic.js
  var getTitle = function() {
    var titleDiv = getElementsByClassName('title', 'div');
    //var titileDiv = $("div.title"); ???
    //console.info(titleDiv);
    if ( titleDiv != null ) {
      var eles = titleDiv[0].getElementsByTagName('h1');
      if ( eles.length == 1 ) {
        return eles[0].innerHTML;
      }
    }
    return null;
  }

  var title = getTitle();
  var images = { title: title, type: 'list', images: [] };

  var txImageInfoTran = function(txImageInfo) {
    var findEleByName = function(ary, name) {
      for(var i=0; i<ary.length; ++i) {
        if ( ary[i].Name == name ) {
          return ary[i];
        }
      }
      return null;
    }// end findEleByName

    var groupimg = findEleByName(findEleByName(txImageInfo.Children, 'groupimginfo').Children, 'groupimg');
    groupimg.Children.forEach(function(img){
      var bigimgurl = findEleByName(img.Children, 'bigimgurl');
      var desc = findEleByName(img.Children, 'cnt_article');
      if ( bigimgurl != null && desc != null ) {
        var desc = desc.Children[0].Content;
         desc = desc.replace("<p>", "");
         desc = desc.replace("</p>", "");
        images.images.push({ url: bigimgurl.Children[0].Content, title: "", desc: desc });
      }
    });

    return images;
  }

  var path = window.location.pathname;
  var host = window.location.host;
  var ary = path.split('/');
  if ( ary.length == 4 && ary[3].indexOf('.htm') != -1 ) {
    var tmp = ary[3].split('.');
    if ( tmp.length == 2 ) {
      var url = 'http://' + host + '/a/' + ary[2] + '/' + tmp[0] + '.hdBigPic.js';
      console.log("fetch: " +　url);
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if ( req.readyState == 4 ) {
          if (  req.status == 200 ) {
            callback(null, txImageInfoTran(eval("("+req.responseText+")")));
            //callback(null, txImageInfoTran(window.JSON.parse(req.responseText)));
            //callback(null, txImageInfoTran(jQuery.parseJSON(req.responseText)));
          }else {
            callback(new Error('http error code: ' + req.status), null);
          }
        }
      }
      req.open('GET', url, true);
      req.send();
    } else {
      callback(new Error('parse tencent image news path error'), null);
    }
  } else {
    callback(new Error('parse tencent image news path error'), null);
  }
}
