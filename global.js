// 判断当前的窗口是不是顶层窗口
function inIframe () { 
	try { 
		return window.self !== window.top; //当前窗口嵌套在别的窗口中
	} catch (e) {
	 	return true; 
		}
}
// 背景颜色设置
var colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = "";
var currentAuthor = "";

// 打开路径
function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

// 获取引言
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r); 
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        $('#twitter-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#weibo-quote').attr('href', "http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(location.href)+ "&title=" + encodeURIComponent(currentQuote) + encodeURIComponent(currentAuthor));
      }
      $(".quote-text").animate({
          opacity: 0
        }, 500, function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(r.quote);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500, function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(r.author);
        });

      var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}

$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
  $('#twitter-quote').on('click', function() {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)); 
  });
  $('#weibo-quote').on('click', function() {
      openURL("http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(location.href)+ "&title=" + encodeURIComponent(currentQuote) + encodeURIComponent(currentAuthor));
  });
});
