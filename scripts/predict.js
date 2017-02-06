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
            	// .add([this._earthStep(), this._headerStep()])
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
            var w = 1200,
                h = 340,
                paper = Raphael($(".viewport")[0], w, h);

            var attrs = {
                fill: '#e6e6e6',
                stroke: '#ccc',
                'stroke-width': 2,
                opacity: 0
            }
            var textAttrs = { fill: '#0b0f2a', 'font-size': '16px', opacity: 0 };

            var arrowAttrs = { stroke: '#ccc', 'stroke-width': 2, 'arrow-end': 'open-wide-long', opacity: 0 }

            //原始样本
            var orginShapes = [];
            orginShapes.push(paper.rect(30, 140, 100, 60, 10).attr(attrs));
            orginShapes.push(paper.text(80, 170, "原始样本").attr(textAttrs));


            //原始样本连线

            // paper.path("M130 170L245 105").attr(arrowAttrs);
            // paper.path("M130 170L245 235").attr(arrowAttrs);

            var childShaps = []
                //子样本1
            childShaps.push(paper.rect(250, 80, 100, 50, 25).attr(attrs));
            childShaps.push(paper.text(300, 105, "子样本1").attr(textAttrs));

            //子样本2
            childShaps.push(paper.rect(250, 210, 100, 50, 25).attr(attrs));
            childShaps.push(paper.text(300, 235, "子样本1").attr(textAttrs));


            //分组连线1,2

            // paper.path("M350 105L470 70").attr(arrowAttrs);
            // paper.path("M350 105L470 140").attr(arrowAttrs);
            // paper.path("M350 235L470 200").attr(arrowAttrs);
            // paper.path("M350 235L470 270").attr(arrowAttrs);

            var setShapes = [];
            //分组 1
            setShapes.push(paper.rect(470, 50, 100, 40, 20).attr(attrs));
            setShapes.push(paper.rect(470, 120, 100, 40, 20).attr(attrs));
            //分组 1 offset-y: 130
            setShapes.push(paper.rect(470, 180, 100, 40, 20).attr(attrs));
            setShapes.push(paper.rect(470, 250, 100, 40, 20).attr(attrs));


            var images = [];
            //子例1 
            var c1 = {
                x: 520 - 15,
                y: 70 - 15
            };
            drawUpImage(c1.x, c1.y);
            drawUpImage(c1.x + 35, c1.y);
            drawUpImage(c1.x - 35, c1.y);

            var c2 = {
                x: 520 - 15,
                y: 140 - 15
            }
            drawDownImage(c2.x, c2.y);

            var c3 = {
                x: 520 - 15,
                y: 200 - 15
            };
            drawUpImage(c3.x + 20, c3.y);
            drawUpImage(c3.x - 20, c3.y);

            var c4 = {
                x: 520 - 15,
                y: 270 - 15
            }
            drawDownImage(c4.x, c4.y);

            return new TimelineLite({
                    onComplete: function() {
                        drawPieChart();
                    }
                })
                .add(opacityTweens(orginShapes))
                .add(lineTweens(["M130 170L245 105", "M130 170L245 235"]))
                .add(opacityTweens(childShaps))
                .add(lineTweens(["M350 105L470 70", "M350 105L470 140", "M350 235L470 200", "M350 235L470 270"]))
                .add(opacityTweens(setShapes))
                .add(opacityTweens(images));

            function drawUpImage(x, y) {
                drawImage("a",x,y);
            };

            function drawDownImage(x, y) {
                drawImage("b",x,y);
            };

            function drawImage(type, x, y) {
                images.push(paper.image("./images/predict/" + type + ".png", x, y, 30, 30).attr({ opacity: 0 }));
            }

            function drawPieChart() {
                var pieChart = echarts.init(document.getElementById('forest-pie'));
                pieChart.setOption({
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [{
                        name: '关键因素',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 5, name: 'A上升趋势' },
                            { value: 2, name: 'B下降趋势' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                })
            }

            function opacityTweens(items) {
                var tweens = [];
                _.each(items, function(item) {
                    tweens.push(TweenMax.to(item, 1, {
                        raphael: {
                            opacity: 1
                        }
                    }));
                });
                return tweens;
            }

            function lineTweens(paths) {
                var tweens = [];
                _.each(paths, function(path) {
                	var start = path.split('L')[0].substr(1);
                    var shape = paper.path('M'+start+'L'+(parseInt(start.split(" ")[0])+1) + ' '+(parseInt(start.split(" ")[1])+1)).attr(arrowAttrs)
                    tweens.push(TweenMax.to(shape, 1, {
                        onStart: function(){
                            shape.attr('opacity', 1)
                            shape.animate({
                            	path: path
                            },1000);
                        }
                    }));
                });
                return tweens;
            }




        }

    }

    window.PredictPage = PredictPage;

});
