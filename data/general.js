$(function() {
	initIndexPage();
	initSalePage();
});

function initIndexPage(){
	//售电情况
	$("#menu .menu_list1>div.content1>span:eq(1)").text("21000亿kW-h");
	
	$("#menu .menu_list1>div.content2>span:eq(1)").text("1768亿kW-h");
	
	$("#menu .menu_list1>div.content3>span:eq(1)").text("168亿kW-h");
	
	$("#menu .menu_list1>div.content4>span:eq(1)").text("99%");
	
	$("#menu .menu_list1>div.content5>span:eq(1)").text("-15%");
	
	$("#menu .menu_list1>div.content6>span:eq(1)").text("20%");
	//市场预测
	$("#menu .menu_list2>div.content1>span:eq(1)").text("187亿kW-h");
	
	$("#menu .menu_list2>div.content2>span:eq(1)").text("67.5亿kW-h");
	
	$("#menu .menu_list2>div.content3>span:eq(1)").text("32.11亿kW-h");
	
	$("#menu .menu_list2>div.content4>span:eq(1)").text("32.11亿kW-h");
	
	$("#menu .menu_list2>div.content5>span:eq(1)").text("32.11亿kW-h");
	//宏观经济-指数类
	
	$("#menu .menu_list3>div.content2>span:eq(1)").text("31.5");
	
	$("#menu .menu_list3>div.content3>span:eq(1)").text("45.2");
	
	$("#menu .menu_list3>div.content4>span:eq(1)").text("666.8");
	//重点行业及龙头企业
	
	$("#menu .menu_list4>div.content1>span:eq(1)").text("168亿kW-h");
	
	$("#menu .menu_list4>div.content2>span:eq(1)").text("38.6");
	
	$("#menu .menu_list4>div.content3>span:eq(1)").text("24.5");
	
	$("#menu .menu_list4>div.content4>span:eq(1)").text("19.2");
	
}

function initSalePage(){
	/*售电量规模排名数据*/
	$("#sdgm>li:eq(0)>span:eq(0)").html("<strong class='first'>1</strong> 成都");
	$("#sdgm>li:eq(0)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(1)>span:eq(0)").html("<strong class='second'>2</strong> 乐山");
	$("#sdgm>li:eq(1)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(2)>span:eq(0)").html("<strong class='third'>3</strong> 德阳");
	$("#sdgm>li:eq(2)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(3)>span:eq(0)").html("4 阿坝");
	$("#sdgm>li:eq(3)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(4)>span:eq(0)").html("5 天府");
	$("#sdgm>li:eq(4)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(5)>span:eq(0)").html("6 攀枝花");
	$("#sdgm>li:eq(5)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(6)>span:eq(0)").html("7 绵阳");
	$("#sdgm>li:eq(6)>span:eq(1)").text("412亿kW-h");

	$("#sdgm>li:eq(7)>span:eq(0)").html("8 雅安");
	$("#sdgm>li:eq(7)>span:eq(1)").text("412亿kW-h");

	/*售电量增速排名*/
	$("#sdl>li:eq(0)>span:eq(0)").html("<strong class='first'>1</strong> 成都");
	$("#sdl>li:eq(0)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(1)>span:eq(0)").html("<strong class='second'>2</strong> 乐山");
	$("#sdl>li:eq(1)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(2)>span:eq(0)").html("<strong class='third'>3</strong> 德阳");
	$("#sdl>li:eq(2)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(3)>span:eq(0)").html("4 阿坝");
	$("#sdl>li:eq(3)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(4)>span:eq(0)").html("5 天府");
	$("#sdl>li:eq(4)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(5)>span:eq(0)").html("6 攀枝花");
	$("#sdl>li:eq(5)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(6)>span:eq(0)").html("7 绵阳");
	$("#sdl>li:eq(6)>span:eq(1)").text("412亿kW-h");

	$("#sdl>li:eq(7)>span:eq(0)").html("8 雅安");
	$("#sdl>li:eq(7)>span:eq(1)").text("412亿kW-h");

	/*增长贡献率排名*/
	$("#zzl>li:eq(0)>span:eq(0)").html("<strong class='first'>1</strong> 成都");
	$("#zzl>li:eq(0)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(1)>span:eq(0)").html("<strong class='second'>2</strong> 乐山");
	$("#zzl>li:eq(1)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(2)>span:eq(0)").html("<strong class='third'>3</strong> 德阳");
	$("#zzl>li:eq(2)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(3)>span:eq(0)").html("4 阿坝");
	$("#zzl>li:eq(3)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(4)>span:eq(0)").html("5 天府");
	$("#zzl>li:eq(4)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(5)>span:eq(0)").html("6 攀枝花");
	$("#zzl>li:eq(5)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(6)>span:eq(0)").html("7 绵阳");
	$("#zzl>li:eq(6)>span:eq(1)").text("412亿kW-h");

	$("#zzl>li:eq(7)>span:eq(0)").html("8 雅安");
	$("#zzl>li:eq(7)>span:eq(1)").text("412亿kW-h");
}