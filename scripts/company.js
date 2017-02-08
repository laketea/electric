//重点行业及龙头企业
$(function() {
    function CompanyPage() {
        this.$el = $('#company');
        this.title = '重点行业及龙头企业';
        this.master = new TimelineMax({
            paused: true,
        });
        this.master.timeScale(1);
        this.paper = null; //svg paper
        this.advRegions = ['成都', '乐山', '德阳'];
        this.regions = {};
        this.initialize.apply(this, arguments);
    }


    CompanyPage.prototype = {

        initialize: function() {},

        play: function() {
            this.master.resume();
        },

        add: function(args) {
            return this.master.add(args);
        },

        render: function() {
            this.$el.siblings().addClass("hidden");
            this.$el.removeClass("hidden");
            this._updateTitle(this.title);
            this.add([this._earthStep(), this._headerStep()]);
            this.add(this._bgStep());
            this.add(this._companyLoadData());
            return this;
        },
        /*header部分加载*/
        _headerStep: function() {
            var $header = $("#header");
            return TweenMax.to($header, 2, {
                opacity: 1
            });
        },
        /*背景图加载*/
        _earthStep: function() {
            var $earth = $(".earth");
            return TweenMax.to($earth, 4, {
                opacity: 1
            });
        },

        /*更新标题文字*/
        _updateTitle: function(title) {
            $(".header_center").html(title);
        },



        /*上下部背景图*/
        _bgStep: function() {
            var $top = $("#company .top");
            var $bottom = $("#company .bottom");
            return TweenMax.to([$top, $bottom], 3, {
                opacity: 1
            });
        },

        /*售电量分析*/
        _companyLoadData: function() {
            var step = new TimelineLite({
                title: "行业售电量分析",
                onStart: function() {
                	window.companyLoadData();
                    var ul = $("#carousel");
                    var oneWidth = $("#carousel li").eq(0).width();
                    var timer = null;
                    companyIndex = 0;
                    //定时器的使用，自动开始
                    timer = setInterval(function() {
                        ul.animate({
                        	"right":oneWidth*companyIndex
                        },2000);
                        companyIndex++;
                    }, 7000);
                }
            });

            var $obj = $("#companyData");

            step.add(
                TweenMax.fromTo($obj, 2, {
                    opacity: 0,
                }, {
                    opacity: 1,
                })
            );
            return step;

        }

    }

    window.CompanyPage = CompanyPage;
})
