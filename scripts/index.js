//主js文件
$(function() {

    var $play = $('#header .control'),
        $next = $('#header .next'),
        $prev = $('#header .prev');

    function Control() {
        this.pages = [];
        this.current = null;
        this.autoPlay = false;
        this.master = new TimelineMax();
        this.initialize.apply(this, arguments);
    }

    Control.prototype = {
        initialize: function() {
            this.autoPlay && ($next.hide() || $prev.hide());
            $play.click(_.bind(this.playOrPause, this));
            $next.click(_.bind(this.goNext, this));
            $prev.click(_.bind(this.goNext, this));
        },

        addPage: function(page) {
            this.pages.push(page);
            this.master.add(page.master);
        },
        start: function() {
            if (this.autoPlay) {
                this.master.play();
            } else {
                this.pages[0].play();
            }
        },
        go: function(index) {
        	//如果当前page动画正在进行中，则直接结束
        	this.page = this.pages(index);
        	this.page.play();
        },
        goNext: function() {
            return this.go(Math.min(this.pages.length, _.indexOf(this.pages, this.page) + 1));
        },
        goPrev: function() {
            return this.go(Math.min(0, _.indexOf(this.pages, this.page) - 1));
        },
        playOrPause: function() {
            var master = this.autoPlay ? this.master : this.pages[0].master
            if (master.isActive()) {
                $play.html("恢复");
                master.pause();
            } else {
                $play.html("暂停");
                master.resume();
            }
        },

    }

    window.control = new Control();

});
