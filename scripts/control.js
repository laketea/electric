//主js文件
$(function() {

    var $play = $('#header .control'),
        $next = $('#header .next'),
        $prev = $('#header .prev');

    function Control() {
        this.pages = [];
        this.current = null;
        this.master = new TimelineMax();
        this.initialize.apply(this, arguments);
    }

    Control.prototype = {
        initialize: function() {
            $play.click(_.bind(this.playOrPause, this));
            $next.click(_.bind(this.goNext, this));
            $prev.click(_.bind(this.goNext, this));
        },

        addPage: function(page) {
            this.pages.push(page);
            // this.master.add(page.master);
            return this;
        },
        start: function() {
            this.page = this.pages[0];
            this.page.render().play();
        },
        go: function(index) {
            //如果当前page动画正在进行中，则直接结束
            if(this.page && this.page.master.isActive()){
                return;
            }
            if(this.page){
                this.page.master.stop();
                this.page.master.clear();
                this.page.$el.empty();
            }
            this.page = this.pages[index];
            this.page.render().play();
        },
        goNext: function() {
            return this.go(Math.min(this.pages.length, _.indexOf(this.pages, this.page) + 1));
        },
        goPrev: function() {
            return this.go(Math.min(0, _.indexOf(this.pages, this.page) - 1));
        },
        playOrPause: function() {
            var master = this.pages[0].master
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
