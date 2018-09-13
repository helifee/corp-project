

(function($) {
	$.fn.BusinessManagementTab = function(config){
		// 默认参数
		config = $.extend({
			titCell			: "",
			mainCell		: "",
			defaultIndex	: 0,
			trigger			: "click",
			titOnClassName	: "active",
			showtime		: 200
		}, config);
		// 全局变量
		var obj	= $(this),
			tabLi	= obj.find(config.titCell).children(),
			conDiv	= obj.find(config.mainCell).children();
		// 显示内容部分处理
		conDiv.each(function(){
			var div		= $(this),
				index	= div.index();
					
			div.addClass("BusinessManagementTabCon_"+index);
			if(index==config.defaultIndex){
				div.show();
			}else{
				div.hide();
			};
		});
		// 选项卡控制部分处理以及选项卡切换
		tabLi.each(function(){
			var li = $(this),
				index = li.index();
			
			if(index==config.defaultIndex){
				li.addClass(config.titOnClassName);
			};
			li.on(config.trigger, function(){
				li.addClass(config.titOnClassName).siblings().removeClass(config.titOnClassName);
				boxItem	= obj.find(config.mainCell).children(".BusinessManagementTabCon_"+index);
				boxItem.stop();
				boxItem.fadeIn(config.showtime).siblings().hide();
			});
		});
	};
})(jQuery);

$(".business-managementlogin-form-area").BusinessManagementTab({titCell:".business-management-tab-head",mainCell:".business-management-tab-content",defaultIndex:0,trigger:"click",titOnClassName:"active",showtime:0});