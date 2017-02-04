// 路径配置
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});
// 使用
require(
    [
        'echarts',
        'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
    ],
    function(ec) {

        /*地市售电量分析*/
        // 基于准备好的dom，初始化echarts图表
        var myChartCity = ec.init(document.getElementById('city_data'));

        var optionCity = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            legend: {
                data: ['月售电量', '网比'],
                textStyle: {
                    color: "#fff",
                },
                padding: [35, 0, 0, 0]
            },
            xAxis: [{
                type: 'category',
                data: [{
                        value: '1月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '2月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '3月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '4月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '5月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '6月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '7月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '8月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '9月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '10月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '11月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '12月',
                        textStyle: {
                            color: "#fff"
                        }
                    },

                ],
            }],
            yAxis: [{
                type: 'value',
                name: '售电量(亿kW-h)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff"
                    }
                }
            }, {
                type: 'value',
                name: '网比(%)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff",
                    }
                }
            }],
            /*{
                name: '降水量',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },*/
            series: [{
                name: '月售电量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }, {
                name: '网比',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }]
        };

        // 为echarts对象加载数据 
        myChartCity.setOption(optionCity);

        /*重点行业售电量趋势*/
        var myChartCompany = ec.init(document.getElementById('company_data'));

        var optionCompany = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            legend: {
                data: ['大工业用电', '大工业同比','大工业售电量'],
                textStyle: {
                    color: "#fff",
                },
                padding: [35, 0, 0, 0]
            },
            xAxis: [{
                type: 'category',
                data: [{
                        value: '1月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '2月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '3月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '4月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '5月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '6月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '7月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '8月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '9月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '10月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '11月',
                        textStyle: {
                            color: "#fff"
                        }
                    }, {
                        value: '12月',
                        textStyle: {
                            color: "#fff"
                        }
                    },

                ],
            }],
            yAxis: [{
                type: 'value',
                name: '售电量(亿kW-h)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff"
                    }
                }
            }, {
                type: 'value',
                name: '网比(%)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff",
                    }
                }
            }],
            /*{
                name: '降水量',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },*/
            series: [{
                name: '月售电量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }, {
                name: '网比',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }]
        };

        // 为echarts对象加载数据 
        myChartCompany.setOption(optionCompany);

    }
);
