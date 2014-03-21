$(function(){
// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
	ua = navigator.userAgent,

	gestureStart = function () {viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";},

	scaleFix = function () {
		if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
			viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
			document.addEventListener("gesturestart", gestureStart, false);
		}
	};
	
	scaleFix();
})

var ua=navigator.userAgent.toLocaleLowerCase(),
 regV = /ipod|ipad|iphone/gi,
 result = ua.match(regV),
 userScale="";
if(!result){
  $(".sf-with-ul>a").one("click",function(){
    $(this).next().slideToggle();
    event.preventDefault();
  })
  userScale=",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+userScale+'">')

$(function(){
  $(".gallery_box, .contact_box").append("<div class='p_abs green_bg bottom_bg'></div>");
  
  var main = $("body");
  var outer_wrap = $(".outer_wrap");
  if(outer_wrap.height()> main.height()){
    $(main).append("<div class='p_fix green_bg bottom_resp_arrow'></div>");
  }
  window.onscroll = function() {
    $(".bottom_resp_arrow").fadeOut("slow");
  }

})

