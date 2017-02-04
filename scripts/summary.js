//整体概况
$(function() {
	$(".header_center").html("整体概况");
    var master = this.master = new TimelineMax({});
    master.add(menuStep());
    master.add([menuList2Step(),menuList3Step()]);

    function menuStep() {
        var step = new TimelineLite({
            title: "整体概况",
            onStart: function() {
                $("#scale").addClass("hide");
                $("#company").addClass("hide");
            }
    	});

        var $menu = $("#menu");

        step.add(TweenMax.fromTo($menu, 3, {
            opacity: 0,
            right: -1200,
            delay:10
        }, {
            opacity: 1,
            left: 0,
            delay:10
        }));
        return step;
    }


    function menuList2Step(){
    	var step = new TimelineLite({
            title: "市场预测",

            onStart: function() {
            	setInterval(function(){
	            	$(".change").animate({
	            		opacity: 0.25,
				        height: "toggle"
	            	},1000,function(){
	            		$(this).css("opacity",1);
				        $(".change").slideDown(1000);
	            	});
        		},5000);
            }
        });

        var $obj = $(".change");

        step.add(
            TweenLite.to($obj, 2, { opacity:1})
        );
        return step;
    }

    function menuList3Step() {
        var step = new TimelineLite({
            title: "宏观经济",
            onStart: function() {
            	setInterval(function(){
	            	$(".menu_list3>div").animate({
	            		opacity: 0.25,
				        height: "toggle"
	            	},1000,function(){
	            		$(this).css("opacity",1);
				        $(".menu_list3>div").slideDown(1000);
	            	});
        		},5000);
            }
        });

        var $obj = $(".menu_list3");


        /*rotationY: 360, transformOrigin: "center center", delay: 5*/
        step.add(
            TweenLite.to($obj, 2, {opacity:1})
        );
        return step;
    }

    master.play();
})
