
(function ($) {

	function init(target) {
		var opt = $.data(target, "tips").options;
		var tips = $(".easyui-tips-hover");
		if(tips.length == 0){
			tips = $("<div/>").css({
				"position":"absolute",
				"border-radius":"5px",
				"-webkit-border-radius":"5px",
				"-moz-border-radius":"5px",
				"padding":"5px",
				"background":"#fff",
				"display":"none",
				"border":"1px solid gray"
			}).hide().addClass("easyui-tips-hover").addClass(opt.cls);
		}
		
		opt.content = (opt.content || $(target).attr("tooltip"));
		tips.appendTo("body");
		
		$(target).css("color",opt.wrapColor);

		$(target).hover(function(){
		tips.html(opt.content);
			var offset = $(target).offset();
			var outerWidth = tips.outerWidth();
			if(outerWidth > 200){
				tips.width(200);
			}
			var scrollTop =  $(document).scrollTop();
			var tipsHeight = tips.outerHeight();
			var outerWidth = tips.outerWidth();
			
			var targetHeight = $(target).outerHeight();
			var top = offset.top-tipsHeight;
			var left = offset.left;
			
			if((offset.top-scrollTop)<top || top<0){
				top = offset.top+targetHeight;
			}
			var bodyClienWidth = $("body")[0].clientWidth;
			if((bodyClienWidth-left)<outerWidth){
				left = bodyClienWidth-outerWidth;
			}
			tips.css({top:top,left:left}).show();
		},function(){
			tips.hide().width("auto");
		});
	}
	
	$.fn.tips = function (options, params) {
		if (typeof options === 'string') {
			return $(this).tips.methods[options].call(this,params);
		}
		
		options = options || {};
		return this.each(function () {
			var opt = $.data(this, "tips");
			if (opt) {
				$.extend(opt.options, options);
			} else {
				$.data(this, "tips", {
					options : $.extend({}, $.fn.tips.defaults, options)
				});
				init(this);
			}
		});
	};
	
	$.fn.tips.defaults = {
		cls:"",
		content:null,
		wrapColor:"blue"
	};
	
	if ($.parser) {
		$.parser.plugins.push('tips')
	}
})(jQuery);