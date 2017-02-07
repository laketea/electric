//电量预测
$(function() {

    function PredictPage() {
        this.$el = $('#predict');
        this.title = '电量预测';
        this.master = new TimelineMax({
            paused: true
        });
        this.paper = null; //svg paper
        this.initialize.apply(this, arguments);
    }

    PredictPage.prototype = {

        initialize: function() {

        },

        play: function() {
            this.master.resume();
        },

        add: function(args) {
            return this.master.add(args);
        },

        render: function() {
            this.$el.siblings().addClass("hidden");
            this.$el.removeClass("hidden");
            this._updateTitle();
            this
                .add([this._earthStep(), this._headerStep()])
                .add(this._randomForestStep());
            return this;
        },

        _updateTitle: function() {
            $(".header_center").html(this.title);
        },

        _earthStep: function() {
            var $earth = $(".earth");
            return TweenMax.to($earth, 2, {
                opacity: 1
            });
        },
        _headerStep: function() {
            var $header = $("#header");
            return TweenMax.to($header, 2, {
                opacity: 1
            });
        },

        _randomForestStep: function() {
            var step = new TimelineMax();

            var paper = Raphael('forest', 1200, 350);

            step.timeScale(1);

            //显示外部因素以及历史电量并转圈
            step.add(opacityTo($('.input')))
                .add(opacityTo($('.input-title'), 0.5))
                // .add(opacityTo($('.text1'), 0.5))
                .add(to($('.input'), 2, {
                    rotation: 360
                }))
                .add(to($('.input'), 2, {
                    rotation: 0,
                }))

            var lineAttr = {
                stroke: '#fff',
                'stroke-linecap': 'square',
                "stroke-dasharray": "-",
                "opacity": 0
            }
            var path1 = paper.path("M84 144L84 145").attr(lineAttr), //182
                path2 = paper.path("M84 221L84 220").attr(lineAttr), //182
                path3 = paper.path("M84 183L85 183").attr(lineAttr); //232

            //显示第一次的虚线
            step.add(to(path1, 0.5, {
                    onStart: function() {
                        path1.attr("opacity", 1);
                        path2.attr("opacity", 1);
                        path1.animate({ "path": "M84 144L84 182" }, 500);
                        path2.animate({ "path": "M84 221L84 182" }, 500);
                    }
                }))
                .add(to(path3, 0.5, {
                    onStart: function() {
                        path3.attr("opacity", 1);
                        path3.animate({ "path": "M84 183L133 184" }, 500);
                    }
                }));

            var circle = paper.circle(132 + 2 * 2, 184, 0).attr({
                fill: '#fff'
            });

            step.add(to(circle, 0.2, {
                raphael: {
                    r: 3
                }
            }));

            //显示总体样本
            step.add(opacityTo([$('.origin-outer'), $('.origin-inner'), $('.origin-md')]))
                .add(opacityTo($('.origin-title')))
                .add([to($('.origin-outer'), 2, {
                    rotation: 360
                }), to($('.origin-inner'), 2, {
                    rotation: -360
                })])

            var lineAttr2 = {
                stroke: '#16deed',
                "opacity": 0
            }

            //显示总体样本与子样本的连线
            var path4 = paper.path("M347 184L347 184").attr(lineAttr2);
            var path5 = paper.path("M387 184L387 184").attr(lineAttr2);
            var path6 = paper.path("M387 184L387 184").attr(lineAttr2);

            step.add(to(path4, 0.5, {
                    onStart: function() {
                        path4.attr("opacity", 1);
                        path4.animate({ "path": "M347 184L387 184" }, 500);
                    }
                }))
                .add(to(path5, 1, {
                    onStart: function() {
                        path5.attr("opacity", 1);
                        path6.attr("opacity", 1);
                        path5.animate({ "path": "M387 184L387 109" }, 1000);
                        path6.animate({ "path": "M387 184L387 264" }, 1000);
                    },
                }))
                .add(to(path6, 1, {
                    onStart: function() {
                        path5.animate({ "path": "M387 184L387 104L426 104" }, 1000);
                        path6.animate({ "path": "M387 184L387 264L426 264" }, 1000);
                    }
                }));

            //显示子样例1 & 子样例N
            step.add(opacityTo([$('.sample1'), $('.sample2')]))
                .add(to($('.points'), 1, {
                    height: 35
                }));

            var path01 = paper.path("M552 104L552 104").attr(lineAttr2);
            var path03 = paper.path("M592 104LM592 104").attr(lineAttr2);
            var path04 = paper.path("M592 104LM592 104").attr(lineAttr2);

            var path02 = paper.path("M552 263L552 263").attr(lineAttr2);
            var path05 = paper.path("M592 263LM592 263").attr(lineAttr2);
            var path06 = paper.path("M592 263LM592 263").attr(lineAttr2);

            //显示子样例到 A/B/C的连线
            step.add(to(path01, 0.5, {
                    onStart: function() {
                        path01.attr("opacity", 1);
                        path02.attr("opacity", 1);
                        path01.animate({ "path": "M552 104L592 104" }, 500);
                        path02.animate({ "path": "M552 263L592 263" }, 500);
                    }
                }))
                .add(to(path03, 0.5, {
                    onStart: function() {
                        path03.attr("opacity", 1);
                        path04.attr("opacity", 1);
                        path05.attr("opacity", 1);
                        path06.attr("opacity", 1);
                        path03.animate({ "path": "M592 104L592 64" }, 500);
                        path04.animate({ "path": "M592 104L592 144" }, 500);
                        path05.animate({ "path": "M592 263L592 223" }, 500);
                        path06.animate({ "path": "M592 263L592 303" }, 500);
                    }
                }))
                .add(to(path04, 0.5, {
                    onStart: function() {
                        path03.animate({ "path": "M592 104L592 64L632 64" }, 500);
                        path04.animate({ "path": "M592 104L592 144L632 144" }, 500);
                        path05.animate({ "path": "M592 263L592 223L632 223" }, 500);
                        path06.animate({ "path": "M592 263L592 303L632 303" }, 500);
                    }
                }));

            //显示A/B/C
            step.add(opacityTo($('.sp')));

            var path11 = paper.path("M703 64L703 64").attr(lineAttr2);
            var path12 = paper.path("M703 221L703 221").attr(lineAttr2);

            //显示A/B/C到结果的连线
            var path1Tween = new TimelineLite().add(to(path11, 0.1, {
                onStart: function() {
                    path11.attr("opacity", 1);
                    path11.animate({ "path": "M703 64L764 64" }, 100);
                }
            })).add(to(path11, 0.3, {
                onStart: function() {
                    path11.animate({ "path": "M703 64L764 64L764 184" }, 300);
                }
            })).add(to(path11, 0.1, {
                onStart: function() {
                    path11.animate({ "path": "M703 64L764 64L764 184L783 184" }, 100);
                }
            }));

            var path2Tween = to(path12, 0.5, {
                onStart: function() {
                    path12.attr("opacity", 1);
                    path12.animate({ "path": "M703 221L783 221" }, 500);
                }
            });

            step.add([path1Tween, path2Tween]);

            //显示结果外圈
            step.add(opacityTo($(".result-outer")));

            var pos = {
                    x: 864 - 24,
                    y: 199 - 24,
                    dif: 27
                }
                //A/B/C 移动到结果中并消失 转圈
            step.add([
                to($('.aa-cp'), 1, {
                    left: pos.x - pos.dif,
                    top: pos.y - pos.dif
                }),
                to($('.bb-cp'), 1, {
                    left: pos.x - pos.dif,
                    top: pos.y + pos.dif
                }),
                to($('.cc-cp'), 1, {
                    left: pos.x + pos.dif,
                    top: pos.y + pos.dif
                }),
                to($('.aa2-cp'), 1, {
                    left: pos.x + pos.dif,
                    top: pos.y - pos.dif
                })
            ]).add([
                to($('.aa-cp'), 1, {
                    left: pos.x,
                    top: pos.y
                }),
                to($('.bb-cp'), 1, {
                    opacity: 0,
                }),
                to($('.cc-cp'), 1, {
                    opacity: 0
                }),
                to($('.aa2-cp'), 1, {
                    left: pos.x,
                    top: pos.y
                })
            ]).add([
                to($('.aa-cp'), 1, {
                    opacity: 0,
                }),
                to($('.aa2-cp'), 1, {
                    opacity: 0,
                }),
                opacityTo([$('.result-md'), $('.result-inner')])
            ]).add([
                fromTo($('.result-title'), 1, {
                    scale: 0
                }, {
                    scale: 1,
                    opacity: 1
                }, '-=0.5'),
                to($('.result-md'), 1, {
                    rotation: -360
                }),
                to($('.result-outer'), 1, {
                    rotation: 360
                })
            ]);

            var path21 = paper.path("M946 199L946 199").attr(lineAttr2);

            //显示结果到 方块的连线
            step.add(to(path21, 0.5, {
                onStart: function() {
                    path21.attr("opacity", 1);
                    path21.animate({ "path": "M946 199L974 199" }, 500);
                }
            }))

            //显示方块
            step.add(opacityTo($(".result-block")));

            //god-like: 全剧终

            return step;


            function opacityTo(items, duration) {
                return to(items, duration || 1, {
                    opacity: 1
                });
            }

            function to(a, b, c, d, e) {
                return TweenMax.to(a, b, c, d, e);
            }

            function fromTo(a, b, c, d, e) {
                return TweenMax.fromTo(a, b, c, d, e);
            }

        }

    }

    window.PredictPage = PredictPage;

});
