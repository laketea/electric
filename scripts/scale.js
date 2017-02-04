//售电情况
$(function() {
    var master = this.master = new TimelineMax({});

    master.add(saleMapStep());
    master.add(saleList());
    master.add(saleListChange());

    function saleMapStep() {
        var step = new TimelineLite({
            title: "售电情况",
            onComplete:function(){
            	$("#sale_map .line").animate({opacity:"1"},3000);
            	$("#sale_map .line_content").animate({opacity:"1"},3000);
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
            title: "售电情况"
        });

        var $obj = $("#sale_list");

        step.add(
            TweenMax.fromTo($obj, 3, {
                opacity: 0,
                left:500,
                scale: 0
            }, {
                opacity: 1,
                scale: 1,
                left:0
            })
        );
        return step;
    }

    function saleListChange(){
    	var step = new TimelineLite({
            title: "售电情况"
        });

        var $obj = $(".sale_order");

        step.add(TweenMax.fromTo($obj, 6, {
            opacity: 1,
            delay:2
        }, {
            opacity: 0,
            delay:2
        }));
        return step;
    }

    master.play();
})
