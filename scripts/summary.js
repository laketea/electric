//整体概况
$(function() {


    function SummaryPage() {
        this.$el = $('#summary');
        this.title = '整体概况';
        this.master = new TimelineMax({
            paused: true,
            onComplete: function() {
                console.log("summary complete");
            }
        });
        this.paper = null; //svg paper
        this.$mapShadow = null;
        this.regions = {};
        this.initialize.apply(this, arguments);
    }

    SummaryPage.prototype = {

        initialize: function() {

        },

        play: function() {
            this.master.resume();
        },

        add: function(args) {
            return this.master.add(args);
        },

        render: function() {
            this._updateTitle();
            this._drawMap();
            this.add([this._earthStep(), this._headerStep()])
                .add(this._mapStep())
                .add(this._regionBarStep())
                .add(this._menuStep())
                .add([this._menuList2Step(), this._menuList3Step()]);

            return this;
        },

        _drawMap: function() {
            this.paper = Raphael("summary-map", 930, 800);
            var attr = {
                fill: "#0f2646",
                stroke: "#00fcff",
                "stroke-width": 1,
                "stroke-linejoin": "round"
            };

            this.$mapShadow = this.paper.image("./images/index/map_shadow.png", 0, 12, 930, 800)

            for (var key in window.paths) {
                var path = this.regions[key] = this.paper.path(window.paths[key]);
                var box = path.getBBox();
                path.center = {};
                path.center.x = box.x + box.width / 2;
                path.center.y = box.y + box.height / 2;
                var text = this.paper.text(box.x + box.width / 2, box.y + box.height / 2, key);
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
        },

        _updateTitle: function(title) {
            $(".header_center").html(title);
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

        _mapStep: function() {
            var self = this;
            var $mapSvg = $("#summary-map>svg");
            var step = new TimelineLite();

            //地图放大
            step.add(TweenMax.fromTo($mapSvg, 1, {
                scale: 0
            }, {
                scale: 1
            }));

            //显示不同的密度
            var needChangeKeys = Object.keys(this.regions).slice(0, 4);
            var needChangeTweens = [];
            var needBackTweens = [];

            _.each(needChangeKeys, function(key) {
                needChangeTweens.push(TweenMax.to(self.regions[key], 2, {
                    raphael: {
                        fill: 'red'
                    },
                    ease: Power1.easeInOut
                }, "+=1"));
            });
            step.add(needChangeTweens);

            //显示通用的颜色
            _.each(needChangeKeys, function(key) {
                needBackTweens.push(TweenMax.to(self.regions[key], 2, {
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
            }), TweenMax.to(this.$mapShadow, 1, {
                raphael: {
                    y: 30
                }
            })]);

            return step;

        },

        _regionBarStep: function() {
            //显示柱子
            var self = this;
            var haloTweens = [];
            var oldBarTweens = [];
            var currentBarTweens = [];
            _.each(this.regions, function(path, key) {
                var offsetY = 10,
                    box = path.getBBox(),
                    centerX = box.x + box.width / 2,
                    centerY = box.y + box.height / 2,
                    baseH = 50 + Math.floor(40 * Math.random()),
                    diff = 10 + Math.floor(30 * Math.random());

                var barWidth = 6;

                //柱子基座
                var image = self.paper.image("./images/index/halo.png", centerX - 20 / 2 + 3, centerY - 20 / 2 - offsetY, 20, 20);
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
                    var react = self.paper.rect(centerX, centerY - offsetY, barWidth, 0);
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

            return new TimelineMax().add(haloTweens)
                .add(oldBarTweens)
                .add(currentBarTweens);
        },

        _menuStep: function() {
            var $menu = $("#menu");
            return TweenMax.fromTo($menu, 3, {
                opacity: 0,
                right: -1200,
            }, {
                opacity: 1,
                right: 0,
            });
        },


        _menuList2Step: function() {
            var $obj = $(".change");
            return TweenLite.to($obj, 2, {
                opacity: 1,
                onStart: function() {
                    setInterval(function() {
                        $(".change").animate({
                            opacity: 0.25,
                            height: "toggle"
                        }, 1000, function() {
                            $(this).css("opacity", 1);
                            $(".change").slideDown(1000);
                        });
                    }, 5000);
                }
            })
        },

        _menuList3Step: function() {
            var $obj = $(".menu_list3");

            return TweenLite.to($obj, 2, {
                opacity: 1,
                onStart: function() {
                    setInterval(function() {
                        $(".menu_list3>div").animate({
                            opacity: 0.25,
                            height: "toggle"
                        }, 1000, function() {
                            $(this).css("opacity", 1);
                            $(".menu_list3>div").slideDown(1000);
                        });
                    }, 5000);
                }
            });
        }

    }

    window.SummaryPage = SummaryPage;

});
