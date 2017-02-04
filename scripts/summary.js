//整体概况
$(function() {
    var master = this.master = new TimelineMax({});
    master.add([earthStep(),headerStep()]);
    master.add(menuStep());
    master.add(menuList3Step());

    function earthStep() {
        var $earth = $(".earth");
        var step = new TimelineLite({
            onStart: function() {
                $("#scale").addClass("hide");
                $("#company").addClass("hide");
            }
        });
        step.add(TweenMax.to($earth, 2, {
            opacity: 1
        }));
        return step;
    }

    function headerStep(){
    	var $header = $("#header");
    	return TweenMax.to($header, 2, {
            opacity: 1
        });
    }

    function menuStep() {
        var step = new TimelineLite({
            title: "整体概况",
            onStart: function() {}
        });

        var $menu = $("#menu");

        step.add(TweenMax.fromTo($menu, 3, {
            opacity: 0,
            right: -1200
        }, {
            opacity: 1,
            left: 0
        }));
        return step;
    }

    function menuList3Step() {
        var step = new TimelineLite({
            title: "宏观经济",
            onStart: function() {
                $("#scale").addClass("hide");
                $("#company").addClass("hide");
            }
        });

        var $obj = $(".menu_list3");



        step.add(
            TweenLite.to($obj, 2, {
                rotationY: 360,
                transformOrigin: "center center",
                delay: 8
            })
        );
        return step;
    }

    master.play();
})
