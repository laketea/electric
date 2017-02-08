$(function() {

    window.index = 0;
    window.drawSaleListMap = function() {
        if (index == 0) {
            cityAnylist();
            companyAnylist();
            tempShip();
            index++;
        }else{
            companyAnylist();
        }
    }
    // drawSaleListMap();

    /*地市售电量分析*/
    function cityAnylist() {
        /*地市售电量分析*/
        // 基于准备好的dom，初始化echarts图表
        var myChartCity = echarts.init(document.getElementById('city_data'));


        var optionCity = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['月售电量', '同比'],
                textStyle: {
                    color: "#fff",
                },
                padding: [35, 0, 0, 0],
                borderColor: "#fff"
            },
            xAxis: [{
                type: 'category',
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
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
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    show: false
                }

            }, {
                type: 'value',
                name: '同比(%)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff",
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ["#ff0"],
                        opacity: 0.2
                    }
                }
            }],
            series: [{
                name: '月售电量',
                type: 'bar',
                barWidth: 20,
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                animationDuration: 5000,
                animationDelay: 3000,
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        shadowBlur: 3,
                        shadowColor: "#fff",
                        shadowOffsetX: 2,
                        shadowOffsetY: -2
                    }
                }
            }, {
                name: '同比',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                animationDuration: 3000,
                animationDelay: 6000,
                itemStyle: {
                    normal: {
                        color: "white",
                        borderWidth: 3
                    }
                },
                lineStyle: {
                    normal: {
                        color: "yellow",
                        width: 5
                    }
                }

            }]
        };

        // 为echarts对象加载数据 
        myChartCity.setOption(optionCity);
    }

    /*重点行业售电量趋势分析*/
    function companyAnylist() {
        var myChartCompany= null;
        /*重点行业售电量趋势*/
        myChartCompany = echarts.init(document.getElementById('company_data'));

        var optionCompany = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['大工业', '同比'],
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
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
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
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                name: '同比(%)',
                nameTextStyle: { color: "#fff" },
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: "#fff",
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ["#ff0"],
                        opacity: 0.2
                    }
                }
            }],
            series: [{
                name: '大工业',
                type: 'bar',
                barWidth: 20,
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                animationDuration: 5000,
                animationDelay: 3000,
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        shadowBlur: 3,
                        shadowColor: "#fff",
                        shadowOffsetX: 2,
                        shadowOffsetY: -2
                    }
                }
            }, {
                name: '同比',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                itemStyle: {
                    normal: {
                        color: "white",
                        borderWidth: 3
                    }
                },
                lineStyle: {
                    normal: {
                        color: "yellow",
                        width: 5
                    }
                },
                animationDuration: 3000,
                animationDelay: 6000
            }]
        };

        // 为echarts对象加载数据 
        myChartCompany.setOption(optionCompany);
    }

    /*温敏关系*/
    function tempShip() {

        /*温敏关系*/
        var myChartTemp = echarts.init(document.getElementById('temp_data'));

        var optionTemp = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['大工业', '同比'],
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
                name: '同比(%)',
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
            series: [{
                name: '大工业',
                type: 'bar',
                barWidth: 20,
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                animationDuration: 6000,
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        shadowBlur: 3,
                        shadowColor: "#fff",
                        shadowOffsetX: 2,
                        shadowOffsetY: -2
                    }
                }
            }, {
                name: '同比',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                itemStyle: {
                    normal: {
                        color: "white",
                        borderWidth: 3
                    }
                },
                lineStyle: {
                    normal: {
                        color: "yellow",
                        width: 5
                    }
                },
                animationDuration: 6000,
                animationDelay: 3000
            }]
        };

        // 为echarts对象加载数据 
        myChartTemp.setOption(optionTemp);
    }
})
