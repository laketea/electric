//售电情况
$(function() {

    var saleListTimer = null;
    var saleListMapTimer = null;
    function SalePage() {
        this.$el = $('#sale');
        this.title = '售电情况';
        this.master = new TimelineMax({
            // paused: true,
        });
        this.master.timeScale(6);
        this.paper = null; //svg paper
        this.advRegions = ['成都', '乐山', '德阳'];
        this.regions = {};
        this.initialize.apply(this, arguments);
    }

    SalePage.prototype = {

        initialize: function() {

        },

        play: function() {
            // this.master.resume();
        },

        add: function(args) {
            return this.master.add(args);
        },

        render: function() {
            this.$el.siblings().addClass("hidden");
            this.$el.removeClass("hidden");
            this._updateTitle();
            this._drawMap();
            this.add([this._earthStep(), this._headerStep()])
                .add(this._saleMapStep())
                .add(this._advRegionsStep());
            return this;
        },

        _earthStep: function() {
            var $earth = $(".earth");
            return TweenMax.to($earth, 4, {
                opacity: 1
            });
        },
        _headerStep: function() {
            var $header = $("#header");
            return TweenMax.to($header, 2, {
                opacity: 1
            });
        },

        _updateTitle: function(title) {
            $(".header_center").html(title);
        },

        _drawMap: function() {
            var self = this,
                attr = {
                    stroke: "#00fcff",
                    "stroke-width": 1,
                    "stroke-linejoin": "round"
                };

            var paper = this.paper = Raphael("sale_map", 770, 670);

            _.each(window.paths, function(item, key) {
                var fill = _.contains(self.advRegions, key) ? '#165dab' : '#0f2646';
                var path = self.regions[key] = paper.path(window.paths[key]);
                var box = path.getBBox();
                var text = paper.text(box.x + box.width / 2, box.y + box.height / 2, key);
                text.attr({
                    fill: '#fff',
                });
                path.attr(_.extend({ fill: fill }, attr))
                    .mouseover(function() {
                        this.animate({ fill: "#6666cc", stroke: "#fff" }, 500);
                    })
                    .mouseout(function() {
                        this.animate({ fill: fill, stroke: "#00fcff" }, 500);
                    })
                    .click(function() {
                        console.log(key);
                        window.index = 0;
                        self._selectRegion(key);
                        clearInterval(saleListTimer);
                        clearInterval(saleListMapTimer);
                        $("#sale_list").css("opacity",0);
                    });
            });
        },

        _saleMapStep: function() {

            var $left = $("#sale .left");
            var $map = $("#sale_map");
            var $halo = $("#halo");
            var $svgMap = $("#sale_map > svg");

            return new TimelineLite({})
                .add(TweenMax.to($halo, 1.5, { //画圆圈
                    opacity: 0.1,
                    // delay: 26,
                    onStart: function() {
                        drawCircle(1.5);
                    }
                })).add(TweenMax.to($halo, 1, { //光圈逐现
                    opacity: 1,
                })).add(TweenMax.fromTo($svgMap, 2, { //地图放大
                    scale: 0
                }, {
                    scale: 0.65
                }))
                .add([TweenMax.to($left, 1, { //地图左移
                    left: '80px'
                }), this._saleListStep()]);

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

        },

        _saleListStep: function() {
            var $obj = $("#sale_list");
            return new TimelineLite({
                title: "售电情况",
                onStart: function() {
                    $(".sale_order li").css("opacity",0);
                    $("#sale_list").css("display","block");
                    setTimeout(function(){
                        $(".sale_order li").css("opacity",1);
                    },4000);

                    saleListTimer = setInterval(function() {
                        $(".sale_order li").animate({
                            opacity: 0.25,
                            height: "toggle"
                        }, 1000, function() {
                            $(this).css("opacity", 1);
                            $(".sale_order li").slideDown(1000);
                        });
                    },10000);

                }
            }).add(
                TweenMax.fromTo($obj,2, {
                    opacity: 0,
                }, {
                    opacity: 1,
                })
            );

        },

        _advRegionsStep: function() {
            var $svgMap = $("#sale_map > svg");

            return new TimelineLite({})
                .add(this._zoomRegionTween('成都'))
                .add(tipTween())
                .add(this._zoomRegionTween('德阳'))
                .add(tipTween())
                .add(this._zoomRegionTween('乐山'))
                .add(tipTween())
                .add(TweenMax.to($svgMap, 2, {
                    transform: 'scale(0.65) translate(0,0px)',
                }, '+=5'));

            function tipTween() {
                var $tipWrap = $("#sale_tip_wrap"),
                    $areaTip = $("#sale_tip_wrap .area_tip"),
                    $line = $("#sale_tip_wrap .line"),
                    $lineContent = $("#sale_tip_wrap .line_content"),
                    $lineContentInner = $("#sale_tip_wrap .line_content_inner");

                return new TimelineLite()
                    .add(TweenMax.to($areaTip, 0.1, {
                        opacity: 1,
                        onStart: function() {
                            $tipWrap.css('visibility', 'visible');
                        }
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
                            $tipWrap.css('visibility', 'hidden');
                        }
                    }));
            }

        },
        _selectRegion: function(key) {

            var $saleList = $("#sale_list"),
                $saleListMap = $("#sale_list_map");

            return new TimelineLite()
                .add(this._zoomRegionTween(key))
                .add(this._saleListMap())
                .add(tipTween())
                .add(TweenMax.to($saleList, 1, {
                    opacity: 0
                }))
                .play();

            function tipTween() {
                var $tipWrap = $("#sale_select_tip"),
                    $line2 = $tipWrap.find('.line2'),
                    $line3 = $tipWrap.find('.line3'),
                    $content2 = $tipWrap.find('.content2'),
                    $content3 = $tipWrap.find('.content3');

                return new TimelineLite()
                    .add(TweenMax.to($tipWrap, 0.1, {
                        opacity: 1,
                        onStart: function() {
                            $tipWrap.css('visibility', 'visible');
                        }
                    })).add([TweenMax.to($line2, 0.5, {
                        width: 102
                    }), TweenMax.to($line3, 0.5, {
                        width: 127,
                        left: 170
                    })]).add(TweenMax.to([$content2, $content3, ], 0.5, {
                        opacity: 1
                    })).add(TweenMax.to($content2, 5, {
                        opacity: 1
                    }))
                    // .add(TweenMax.to($tipWrap, 0.5, {
                    //     opacity: 0,
                    //     onComplete: function() {
                    //         $line2.css('width', '0');
                    //         $line3.css({
                    //             width: '0',
                    //             left: '297px'
                    //         });
                    //         $content2.css('opacity', '0');
                    //         $content3.css('opacity', '0');
                    //         $tipWrap.css('visibility', 'hidden');
                    //     }
                    // }));
            }
        },

        _zoomRegionTween: function(key) {
            var self = this;
            var $svgMap = $("#sale_map > svg");
            //显示成都
            var area = this.regions[key],
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

            return new TimelineLite()
                .add(TweenMax.to($svgMap, 2, {
                    transform: 'scale(' + scale + ') translate(' + offset.x + 'px,' + offset.y + 'px)',
                    onStart: function() {
                        area.attr({ fill: "#165dab" });
                        _.each(self.regions, function(area, areaKey) {
                            if (areaKey !== key) {
                                area.attr({ fill: "#0f2646" });
                            }
                        });
                    },
                }));
        },

        _saleListMap: function() {
            var step = new TimelineLite({
                title: "售电情况",
                onComplete:function(){
                    window.drawSaleListMap();
                    var saleListMapTimer =  setInterval(function(){
                         $("#company_data").animate({
                            opacity: 0.25,
                            height: "toggle"
                         },1000,function(){
                             $("#company_data").css("opacity",1);
                             window.drawSaleListMap();
                             $("#company_data").slideDown(1000);
                         });
                     },16000);
                }
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

    }

    window.SalePage = SalePage;

    // function saleList() {
    //     var step = new TimelineLite({
    //         title: "售电情况",
    //         onStart: function() {
    //             setInterval(function() {
    //                 $(".sale_order li").animate({
    //                     opacity: 0.25,
    //                     height: "toggle"
    //                 }, 1000, function() {
    //                     $(this).css("opacity", 1);
    //                     $(".sale_order li").slideDown(1000);
    //                 });
    //             }, 5000);

    //         }
    //     });

    //     var $obj = $("#sale_list");

    //     step.add(
    //         TweenMax.fromTo($obj, 1.5, {
    //             opacity: 0,
    //         }, {
    //             opacity: 1,
    //         })
    //     );
    //     return step;
    // }

    // function saleListChange() {
    //     var step = new TimelineLite({
    //         title: "售电情况"
    //     });

    //     var $obj = $(".sale_order");

    //     step.add(TweenMax.fromTo($obj, 6, {
    //         opacity: 1,
    //         delay: 2
    //     }, {
    //         opacity: 0,
    //         delay: 2
    //     }));
    //     return step;
    // }

    // function saleListMap() {
    //     var step = new TimelineLite({
    //         title: "售电情况"
    //             // onStart:function(){
    //             //  setInterval(function(){
    //             //      $("#sale_list_map .sale_list_data").animate({
    //             //          opacity: 0.25,
    //             // height: "toggle"
    //             //      },1000,function(){
    //             //          $(this).css("opacity",1);
    //             // $("#sale_list_map .sale_list_data").slideDown(1000);
    //             //      });
    //             //  },6000);
    //             // }
    //     });

    //     var $obj = $("#sale_list_map");

    //     step.add(
    //         TweenMax.fromTo($obj, 1, {
    //             opacity: 0,
    //         }, {
    //             opacity: 1,
    //         })
    //     );
    //     return step;
    // }





})
