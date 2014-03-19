(function($){
	$.fn.equalHeights=function(minHeight,maxHeight){
		tallest=(minHeight)?minHeight:0;
		this.each(function(){
			if($(this).outerHeight()>tallest){tallest=$(this).outerHeight()}
		});
		if((maxHeight)&&tallest>maxHeight) tallest=maxHeight;
		return this.each(function(){$(this).outerHeight(tallest)})
	}
})(jQuery)

$(window).load(function(){
	if($(document).width()>767){
		if($(".maxheight").length){$(".maxheight").equalHeights()}
	}
})
$(window).resize(function(){
	if($(".maxheight").length){$(".maxheight").equalHeights()}
})