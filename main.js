
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

// 检查是否为腾讯图片新闻
function isTxImageNews(host, path, callback) {
  //console.info(ARTICLE_INFO);
  //console.info(window.ARTICLE_INFO);
  if ( host == 'news.qq.com' && path.indexOf('/a/') == 0 ) {
    callback(true);
  } else {
    callback(false);
  }
}

/*
images struct
{
 title: article_title,
 type: 'list|matrix',
 images:[
    {url: "", title:"", desc: ""}
  ]
}
*/

function getTxImageNewInfo(host, path, callback) {
  // http://news.qq.com/a/date/news_id.htm#p=N?
  // new images news_id.hdBigPic.js
  var getTitle = function() {
    var titleDiv = getElementsByClassName('title', 'div');
    console.info(titleDiv);
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
        images.images.push({ url: bigimgurl.Children[0].Content, title: "", desc: desc.Children[0].Content });
      }
    });

    return images;
  }

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

function isOtherURL(host, path) {
  return true;
}

function otherGetAllImages(host, path) {
  return null;
}

var imagesInfoProcessorTable = [
  [isTxImageNews, getTxImageNewInfo],
  [isOtherURL, otherGetAllImages]
];

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
  console.log("render images for " + document.URL);
  console.info(images);

  var testdiv = document.createElement("div");
  testdiv.innerHTML="<p>I inserted <em>this</em> content.</p>";
  testdiv.id = 'wirImagesDiv';
  // testdiv.style.background = '#0C0';
  document.body.appendChild(testdiv);
}

//test();
/*
getImagesInfo(function(error, images) {
  if ( error == null  ) {
    renderImages(images);
  } else {
    console.info(error);
  }
});*/

console.info(window);
