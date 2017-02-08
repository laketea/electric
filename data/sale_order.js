$(function() {


    window.saleOrderMap = function(){
        /*加载数据*/
        sdgmMap();
    }

    /*售电规模排名*/
    function sdgmMap() {
        // 基于准备好的dom，初始化echarts图表
        var myChartSDGM = echarts.init(document.getElementById('sdgm'));
             var cityArr = ["成都", "阿坝", "简阳", "天府", "泸州", "巴中", "广元", "达州", "南充", "宜宾","攀枝花",
                                "成都", "阿坝", "简阳", "天府", "泸州", "巴中", "广元", "达州", "南充", "宜宾","攀枝花"
                            ];
        var dataArr = [28, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6];
        var sdgmOption = {

            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        color:"#fff",
                        opacity: 0.2
                    }
                },
                data: (function() {
                    return cityArr.slice(0,10);
                })()
            },{
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                data: (function() {
                    var res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21,22];
                    return res.slice(0,10);
                })()
            }],
            yAxis: [{
                type: 'value',
                scale: true,
                name: '售电量',
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2],
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                        color:"#ff0",
                        opacity: 0.2
                    }
                }
            }],
            series: [{
                name: '售电总量',
                type: 'bar',
                animationDuration:3000,
                animationDelay:1000,
                data: (function() {
                    var res = dataArr.slice(0);
                    res = res.slice(0, 10);
                    return res;
                })()
            }]
        };



   
       
        myChartSDGM.setOption(sdgmOption);
        
        count = 10;
        cityIndex = 10;
        orderIndex = 11;
        setInterval(function() {
            if (cityIndex == 22) {
                cityIndex = 0;
            }
            if (count == 22) {
                count = 0;
            }
            if(orderIndex == 23){
                orderIndex = 1;
            }
            axisData = cityArr[cityIndex++];
            var data0 = sdgmOption.series[0].data;

            data0.shift();
            data0.push(dataArr[count++]);


            sdgmOption.xAxis[0].data.shift();
            sdgmOption.xAxis[0].data.push(axisData);
            sdgmOption.xAxis[1].data.shift();
            sdgmOption.xAxis[1].data.push(orderIndex++);

            myChartSDGM.setOption(sdgmOption);
        }, 5000);

    }
})
