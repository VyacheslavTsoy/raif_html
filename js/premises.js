$(document).ready(function(){
	$(".pager_item").mouseover(function(){
		var floor = 10-parseInt($(this).attr("data-floor"));
		$('.floor_highlight'+floor).stop().animate({opacity:1}, 400);
	}).mouseout(function(){
		var floor = 10-parseInt($(this).attr("data-floor"));
		$('.floor_highlight'+floor).stop().animate({opacity:0}, 400)
	}).click(function(){
		$(".pager_item").removeClass("current");
		$(this).addClass("current");
		$("div.premises_details").fadeOut("fast");
		var floor = parseInt($(this).attr("data-floor"));
		$.get("/floors/floor"+floor+".html", function(data){
			$("div.premises_details").html(data);
			$("div.premises_details").fadeIn("fast");
		});
		return false;
	});
	var currentSelected = false;
	
	$("div[class^='floor_highlight']").mouseover(function(){
		var fl = 10-parseInt($(this).attr("class").replace("floor_highlight",""));
		if ($("a.pager_item[data-floor="+fl+"]").hasClass("current"))
			currentSelected = true;
		else
			currentSelected = false;
			
		$("a.pager_item[data-floor="+fl+"]").addClass("current");
		$(this).stop().animate({opacity:1}, 400);
	}).mouseout(function(){
		var fl = 10-parseInt($(this).attr("class").replace("floor_highlight",""));
		if (!currentSelected)
			$("a.pager_item[data-floor="+fl+"]").removeClass("current");
		$(this).stop().animate({opacity:0}, 400);
	}).click(function(){
		var fl = 10-parseInt($(this).attr("class").replace("floor_highlight",""));
		$("div.premises_details").fadeOut("fast");
		$.get("/floors/floor"+fl+".html", function(data){
			$("div.premises_details").html(data);
			$("div.premises_details").fadeIn("fast");
		});
	});
	/*
	 $(".pager_item").on("hover", function(){
      var floor = $(this).data("floor");
      $('.floor_highlight1').fadeIn();
    })
	*/
})