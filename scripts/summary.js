//整体概况
$(function() {
	$(".header_center").html("整体概况");
    var master = this.master = new TimelineMax({
        onComplete: function(){
            if(window.scaleMaster){
                window.scaleMaster.play();
            }
        }
    });
    var paper,
        $mapShadow,
        mapAreas = {};
    //初始化
    initialize();

    master.add([earthStep(), headerStep()]);
    // master.add(mapStep());
    // master.add(menuStep());
    // master.add([menuList2Step(),menuList3Step()]);

    function initialize() {

        drawMap();
        bindEvent();

        function drawMap() {
            paper = Raphael("summary-map", 930, 800);
            var attr = {
                fill: "#0f2646",
                stroke: "#00fcff",
                "stroke-width": 1,
                "stroke-linejoin": "round"
            };

            $mapShadow = paper.image("./images/index/map_shadow.png", 0, 12, 930, 800)


            for (var key in window.paths) {
                var path = mapAreas[key] = paper.path(window.paths[key]);
                var box = path.getBBox();
                path.center = {};
                path.center.x = box.x + box.width / 2;
                path.center.y = box.y + box.height / 2;
                var text = paper.text(box.x + box.width / 2, box.y + box.height / 2, key);
                //svg沿Z轴旋转了8度，故需要反向旋转8度以保持水平
                text.attr({
                    fill: '#fff',
                    transform: 'r-8'
                });
                path.attr(attr)
                    .mouseover(function() {
                        this.animate({ fill: "#6666cc", stroke: "#fff" }, 500);
                    })
                    .mouseout(function() {
                        this.animate({ fill: "#0f2646", stroke: "#00fcff" }, 500);
                    });
            };


        }

        function bindEvent() {
            $(".control").on("click", function() {
                if (master.isActive()) {
                    $(this).html("恢复");
                    master.pause();
                } else {
                    $(this).html("暂停");
                    master.resume();
                }
            });
        }

    }


    function earthStep() {
        var $earth = $(".earth");
        var step = new TimelineLite({
            onStart: function() {
                $("#scale").addClass("hide");
                $("#company").addClass("hide");
            }
        });
        step.add(TweenMax.to($earth, 4, {
            opacity: 1
        }));
        return step;
    }

    function headerStep() {
        var $header = $("#header");
        return TweenMax.to($header, 2, {
            opacity: 1
        });
    }

    function mapStep() {
        var $mapSvg = $("#summary-map>svg");
        var step = new TimelineLite();

        //地图放大
        step.add(TweenMax.fromTo($mapSvg, 1, {
            scale: 0
        }, {
            scale: 1
        }));

        //显示不同的密度
        var needChangeKeys = Object.keys(mapAreas).slice(0, 4);
        var needChangeTweens = [];
        var needBackTweens = [];

        _.each(needChangeKeys, function(key) {
            needChangeTweens.push(TweenMax.to(mapAreas[key], 2, {
                raphael: {
                    fill: 'red'
                },
                ease: Power1.easeInOut
            }, "+=1"));
        });
        step.add(needChangeTweens);

        //显示通用的颜色
        _.each(needChangeKeys, function(key) {
            needBackTweens.push(TweenMax.to(mapAreas[key], 2, {
                raphael: {
                    fill: '#0f2646'
                },
                ease: Power1.easeInOut
            }, "+=1"));
        });
        step.add(needBackTweens);

        //倾斜到60度
        step.add([TweenMax.to($mapSvg, 1, {
            transform: 'rotateX(60deg) rotateZ(8deg)'
        }),TweenMax.to($mapShadow, 1, {
            raphael: {
                y: 30
            }
        })]);

        //显示柱子
        var haloTweens = [];
        var oldBarTweens = [];
        var currentBarTweens = [];
        _.each(mapAreas, function(path, key) {
            var offsetY = 10,
                box = path.getBBox(),
                centerX = box.x + box.width / 2,
                centerY = box.y + box.height / 2,
                baseH = 50 + Math.floor(40 * Math.random()),
                diff = 10 + Math.floor(30 * Math.random());

            var barWidth = 6;

            //柱子基座
            var image = paper.image("./images/index/halo.png", centerX - 20 / 2 + 3, centerY - 20 / 2 - offsetY, 20, 20);
            image.attr({
                opacity: 0
            });
            haloTweens.push(TweenMax.to(image, 0.5, {
                raphael: {
                    opacity: 1
                }
            }));


            //超出柱子
            var overRect = createRect('#d2e927');
            //超出部分同时增长，避免错位的诡秘问题
            oldBarTweens.push(createTween(overRect, 0, baseH, '+=1'));

            //同期柱子
            var oldRect = createRect('#00ebe6');
            oldBarTweens.push(createTween(oldRect, 0, baseH, '+=1'));

            //当期柱子
            var currentRect = createRect('#0045bc');
            if (Math.random() > 0.5) {
                //不超出
                currentBarTweens.push(createTween(currentRect, 0, baseH - diff, '+=1'));
            } else {
                //超出
                var sub = new TimelineLite();
                sub.add(createTween(currentRect, 0, baseH, '+=1'));
                sub.add(createTween(overRect, baseH, diff));
                currentBarTweens.push(sub);
            }

            function createRect(color) {
                var react = paper.rect(centerX, centerY - offsetY, barWidth, 0);
                react.attr({
                    fill: color,
                    transform: 'r-8',
                    'stroke-width': 0
                });
                return react;
            }

            function createTween(rect, startY, distance, delay) {
                var speed = 2 / 40;
                return TweenMax.to(rect, speed * distance, {
                    raphael: {
                        y: centerY - offsetY - (startY + distance),
                        height: startY + distance
                    },
                    ease: Power1.easeInOut
                }, delay || '+=0');
            }

        });

        step.add(haloTweens);
        step.add(oldBarTweens);
        step.add(currentBarTweens);

        return step;

    }

    function menuStep() {
        var step = new TimelineLite({
            title: "整体概况",
            onStart: function() {}
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
