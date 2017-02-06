//售电情况
$(function() {
    /*改变页面title值*/
    $(".header_center").html("售电情况");
    var master = this.master = new TimelineMax({});
    // master.add(saleMapStep());
    // master.add(saleList());
    // master.add(saleListMap());
    // master.add(saleListChange());

    function saleMapStep() {
        var step = new TimelineLite({
            title: "售电情况",
            onComplete: function() {
                $("#sale_map .line").animate({ opacity: "1" }, 3000);
                $("#sale_map .line_content").animate({ opacity: "1" }, 3000);
            }
        });

        var $map = $("#sale_map");
        var $circle = $("#circle");


        step.add(TweenMax.fromTo([$map, $circle], 3, {
            opacity: 0,
            rotation: 30,
            scale: 0
        }, {
            opacity: 1,
            rotation: 360,
            scale: 1
        }));
        return step;
    }

    function saleList() {
        var step = new TimelineLite({
            title: "售电情况",
            onComplete: function() {
            	setInterval(function(){
            		$(".sale_order li").animate({
			            opacity: 0.25,
			            height: "toggle"
			        }, 1000, function() {
			        	$(this).css("opacity",1);
			            $(".sale_order li").slideDown(1000);
			        });
            	},7000);            	
            }
        });

        var $obj = $("#sale_list");

        step.add(
            TweenMax.fromTo($obj, 1.5, {
                opacity: 0,
            }, {
                opacity: 1,
            })
        );
        return step;
    }

    function saleListChange() {
        var step = new TimelineLite({
            title: "售电情况"
        });

        var $obj = $(".sale_order");

        step.add(TweenMax.fromTo($obj, 6, {
            opacity: 1,
            delay: 2
        }, {
            opacity: 0,
            delay: 2
        }));
        return step;
    }

    function saleListMap() {
        var step = new TimelineLite({
            title: "售电情况"
            // onStart:function(){
            // 	setInterval(function(){
	           //  	$("#sale_list_map .sale_list_data").animate({
	           //  		opacity: 0.25,
				        // height: "toggle"
	           //  	},1000,function(){
	           //  		$(this).css("opacity",1);
				        // $("#sale_list_map .sale_list_data").slideDown(1000);
	           //  	});
            // 	},6000);
            // }
        });

        var $obj = $("#sale_list_map");

        step.add(
            TweenMax.fromTo($obj, 1, {
                opacity: 0,
            }, {
                opacity: 1,
            })
        );
        return step;
    }

    master.play();


    
})
