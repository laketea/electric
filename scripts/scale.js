//售电情况
$(function() {

    var $title = $(".header_center");
    var mapAreas = {};
    var topAreas = ['成都', '乐山', '德阳'];
    var paper;

    // function ScalePage(options) {
    //     _.extend(this, options || {});
    //     this.initialize.apply(this, arguments);
    // }

    // ScalePage.prototype = {

    //     initialize: function() {
    //         this.$el = $(this.el);
    //         this.master = new TimelineMax({
    //             onStart: _.bind(this.beforeStart, this)
    //         });

    //         this.add(this._saleMapStep());
    //         this.add(this._saleList());
    //         this.add(this._saleListMap());
    //         this.add(this._saleListChange());
    //     },

    //     beforeStart: function() {
    //         self.$el.siblings().hide();
    //         self.$el.show();
    //     },

    //     start: function() {
    //         this.master.play();
    //     },

    //     _saleMapStep: function() {
    //         var step = new TimelineLite({
    //             title: "售电情况",
    //             onComplete: function() {
    //                 $("#sale_map .line").animate({ opacity: "1" }, 3000);
    //                 $("#sale_map .line_content").animate({ opacity: "1" }, 3000);
    //             }
    //         });

    //         var $map = $("#sale_map");
    //         var $circle = $("#circle");


    //         step.add(TweenMax.fromTo([$map, $circle], 3, {
    //             opacity: 0,
    //             rotation: 30,
    //             scale: 0
    //         }, {
    //             opacity: 1,
    //             rotation: 360,
    //             scale: 1
    //         }));
    //         return step;
    //     },

    //     _saleList: function() {
    //         var step = new TimelineLite({
    //             title: "售电情况",
    //             onStart: function() {
    //                 setInterval(function() {
    //                     $(".sale_order li").animate({
    //                         opacity: 0.25,
    //                         height: "toggle"
    //                     }, 1000, function() {
    //                         $(this).css("opacity", 1);
    //                         $(".sale_order li").slideDown(1000);
    //                     });
    //                 }, 5000);

    //             }
    //         });

    //         var $obj = $("#sale_list");

    //         step.add(
    //             TweenMax.fromTo($obj, 1.5, {
    //                 opacity: 0,
    //             }, {
    //                 opacity: 1,
    //             })
    //         );
    //         return step;
    //     },

    //     _saleListMap: function() {
    //         var step = new TimelineLite({
    //             title: "售电情况",
    //             onStart: function() {
    //                 setInterval(function() {
    //                     $(".sale_order li").animate({
    //                         opacity: 0.25,
    //                         height: "toggle"
    //                     }, 1000, function() {
    //                         $(this).css("opacity", 1);
    //                         $(".sale_order li").slideDown(1000);
    //                     });
    //                 }, 5000);

    //             }
    //         });

    //         var $obj = $("#sale_list");

    //         step.add(
    //             TweenMax.fromTo($obj, 1.5, {
    //                 opacity: 0,
    //             }, {
    //                 opacity: 1,
    //             })
    //         );
    //         return step;
    //     },

    //     _saleListChange: function() {
    //         var step = new TimelineLite({
    //             title: "售电情况"
    //         });

    //         var $obj = $(".sale_order");

    //         step.add(TweenMax.fromTo($obj, 6, {
    //             opacity: 1,
    //             delay: 2
    //         }, {
    //             opacity: 0,
    //             delay: 2
    //         }));
    //         return step;
    //     },


    //     _saleListChange: function() {
    //         var step = new TimelineLite({
    //             title: "售电情况"
    //         });

    //         var $obj = $(".sale_order");

    //         step.add(TweenMax.fromTo($obj, 6, {
    //             opacity: 1,
    //             delay: 2
    //         }, {
    //             opacity: 0,
    //             delay: 2
    //         }));
    //         return step;
    //     }
    // }

    initialize();

    function initialize() {

        /*改变页面title值*/
        $(".header_center").html("售电情况");
        drawMap();

        var master = window.scaleMaster = this.master = new TimelineMax({});

        master.add(saleMapStep());
        master.add(topAreasStep());
        // master.add(saleList());
        // master.add(saleListMap());
        // master.add(saleListChange());
        master.play();
    }



    function drawMap() {
        paper = Raphael("sale_map", 770, 670);
        var attr = {
            stroke: "#00fcff",
            "stroke-width": 1,
            "stroke-linejoin": "round"
        };


        for (var key in window.paths) {
            var fill = _.contains(topAreas, key) ? '#165dab' : '#0f2646';
            var path = mapAreas[key] = paper.path(window.paths[key]);
            var box = path.getBBox();
            paper.text(box.x + box.width / 2, box.y + box.height / 2, key).attr({
                fill: '#fff',
            });
            path.attr(_.extend({ fill: fill }, attr))
                .mouseover(function() {
                    this.animate({ fill: "#6666cc", stroke: "#fff" }, 500);
                })
                .mouseout(function() {
                    this.animate({ fill: fill, stroke: "#00fcff" }, 500);
                });
        };
    }

    function drawCircle(seconds) {
        var $circle = $("#circle");
        var paper = Raphael("circle", 560, 560);
        paper.customAttributes.arc = function(value, shit) {
            var total = 360,
                R = 280 - 1,
                CENTER = 280,
                alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = CENTER + R * Math.cos(a),
                y = CENTER - R * Math.sin(a),
                path;
            if (total == value) {
                path = [
                    ["M", CENTER, CENTER - R],
                    ["A", R, R, 0, 1, 1, CENTER - 0.01, CENTER - R]
                ];
            } else {
                path = [
                    ["M", CENTER, CENTER - R],
                    ["A", R, R, 0, +(alpha > 180), 1, x, y]
                ];
            }
            return { path: path };
        };
        var circle = paper.path().attr({ stroke: '#ddd', arc: 0 });
        circle.animate({ arc: [360, 200] }, seconds * 1000);
    }


    function saleMapStep() {
        var step = new TimelineLite({
            title: "售电情况",
            onStart: function() {

            },
            onComplete: function() {
                // $("#sale_map .line").animate({ opacity: "1" }, 3000);
                // $("#sale_map .line_content").animate({ opacity: "1" }, 3000);
            }
        });

        var $left = $("#sale .left");
        var $map = $("#sale_map");
        var $halo = $("#halo");
        var $svgMap = $("#sale_map > svg");



        //画圆圈
        step.add(TweenMax.to($halo, 1.5, {
            opacity: 0,
            onStart: function() {
                drawCircle(1.5);
            }
        }));

        //光圈逐现
        step.add(TweenMax.to($halo, 1, {
            opacity: 1,
        }));


        //地图放大
        step.add(TweenMax.fromTo($svgMap, 2, {
            scale: 0
        }, {
            scale: 0.65
        }, '+=2'));

        //地图左移
        step.add([TweenMax.to($left, 1, {
            left: '80px'
        }), saleList()]);

        return step;
    }

    function topAreasStep() {
        var $svgMap = $("#sale_map > svg");

        return new TimelineLite()
            .add(createAreaCenterTween('成都'))
            .add(createAreaCenterTween('德阳'))
            .add(createAreaCenterTween('乐山'))
            .add(TweenMax.to($svgMap, 2, {
                transform: 'scale(0.65) translate(0,0px)',
            }, '+=5'));

        function createAreaCenterTween(key) {
            var $areaTip = $("#sale_tip_wrap .area_tip"),
                $line = $("#sale_tip_wrap .line"),
                $lineContent = $("#sale_tip_wrap .line_content"),
                $lineContentInner = $("#sale_tip_wrap .line_content_inner");

            //显示成都
            var area = mapAreas[key],
                box = area.getBBox();

            //最大扩展到2/3的区域
            var MAX_DIAMETER = 560 * 2 / 3;

            var svgCenter = {
                x: 770 / 2,
                y: 670 / 2
            };
            var areaCenter = {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2
            };

            var originOffset = {
                x: -81,
                y: -32
            }

            var offset = {
                x: -1 * (areaCenter.x - svgCenter.x),
                y: -1 * (areaCenter.y - svgCenter.y)
            };

            var scale = MAX_DIAMETER / Math.max(box.width, box.height);

            console.log(scale);
            return new TimelineLite()
                .add(TweenMax.to($svgMap, 2, {
                transform: 'scale(' + scale + ') translate(' + offset.x + 'px,' + offset.y + 'px)',
                onStart: function() {
                    area.attr({ fill: "#165dab" });
                    _.each(mapAreas, function(area, areaKey) {
                        if (areaKey !== key) {
                            area.attr({ fill: "#0f2646" });
                        }
                    });
                },
            })).add(TweenMax.to($areaTip, 0.1, {
                opacity: 1
            })).add(TweenMax.to($line, 0.5, {
                width: 102
            })).add(TweenMax.to($lineContent, 0.5, {
                opacity: 1
            })).add(TweenMax.to($lineContent, 5, {
                opacity: 1
            }))
            .add(TweenMax.to($areaTip, 0.5, {
                opacity: 0,
                onComplete: function() {
                    $line.css('width', '0');
                    $lineContent.css('opacity', '0');
                }
            }));
        }

    }

    function saleList() {
        var step = new TimelineLite({
            title: "售电情况",
            onStart: function() {
                setInterval(function() {
                    $(".sale_order li").animate({
                        opacity: 0.25,
                        height: "toggle"
                    }, 1000, function() {
                        $(this).css("opacity", 1);
                        $(".sale_order li").slideDown(1000);
                    });
                }, 5000);

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
                //  setInterval(function(){
                //      $("#sale_list_map .sale_list_data").animate({
                //          opacity: 0.25,
                // height: "toggle"
                //      },1000,function(){
                //          $(this).css("opacity",1);
                // $("#sale_list_map .sale_list_data").slideDown(1000);
                //      });
                //  },6000);
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





})
