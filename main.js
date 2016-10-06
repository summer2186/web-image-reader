
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
  var images = { title: title, images: [] };

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
  console.log(ary);
  if ( ary.length == 4 && ary[3].indexOf('.htm') != -1 ) {
    var tmp = ary[3].split('.');
    if ( tmp.length == 2 ) {
      var url = 'http://' + host + '/a/' + ary[2] + '/' + tmp[0] + '.hdBigPic.js';
      console.log("fetch: " +　url);
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if ( req.readyState == 4 ) {
          if (  req.status == 200 ) {
            callback(txImageInfoTran(eval("("+req.responseText+")")));
          }else {
            callback(null);
          }
        }
      }
      req.open('GET', url, true);
      req.send();
    } else {
      callback(null);
    }
  } else {
    callback(null);
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
function getImagesInfo() {
  var host = window.location.host;
  var path = window.location.pathname;
  var imagesInfo = null
  console.log("lookup for:" + host + "　　" +path);
  console.info(imagesInfoProcessorTable);
  imagesInfoProcessorTable.forEach(function(p) {
      p[0]( host, path, function(result) {
        if ( result == true ) {
          p[1](host, path, function(images) {
            console.log(images);
          })
        } else {

        }
      });
  });
}


console.log("work in: " + document.URL);
console.log("title: " + document.title);

getImagesInfo();
