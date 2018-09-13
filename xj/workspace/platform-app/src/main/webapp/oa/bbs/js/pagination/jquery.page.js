(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				    obj.empty();
					var pageCount = args.pageCount;
					var current = args.current;
				    obj.append('<a href="javascript:void(0)">当前第 <span class="cur">'+current+'</span>/<span>'+pageCount+'</span>页</a><span style="width:40px;display:inline-block"></span>');
					obj.append('<a href="javascript:void(0)" class="turn-page home_page">首页</a>');
					//上一页
					if(current > 1){
						obj.append('<a href="javascript:void(0)" class="turn-page last_page">上一页</a>');
					}else{
						obj.remove('last_page');
						obj.append('<a href="javascript:void(0)">上一页</a>');
					}
					// 下一页
					if (current < pageCount) {
						obj.append('<a href="javascript:void(0)" class="turn-page next_page">下一页</a>');
					}else{
						obj.remove('next_page');
						obj.append('<a href="javascript:void(0)">下一页</a>');
					}
				    obj.append('<a href="javascript:void(0)" class="turn-page end_page">尾页</a>');
					obj.append('<input type="text" class="form-control pageInput" value="1" placeholder="">');
					obj.append('<button class="btn-sm go_page">GO</button>');
					$('.pageInput').val(current+'');

			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
				$('.home_page').on("click",function(){
					if(typeof(args.backFn)=="function"){
						args.backFn({'start':0});
						ms.fillHtml(obj,{"current":1,"pageCount":args.pageCount});
					}
				});
				$('.pageInput').on('change', function() {
					var thisValue = $(this).val();
					$('.pageInput').val(thisValue);
				});
				//上一页
				$('.last_page').on("click",function(){
					var current = parseInt($('.pageInput').val());
					if(typeof(args.backFn)=="function"){
						args.backFn({'start':current-2});
						ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					}
				});
				//下一页
				$('.next_page').on("click",function(){
					var current = parseInt($('.pageInput').val());
					if(typeof(args.backFn)=="function"){
						args.backFn({'start':current});
						ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					}

				});
				//尾页
				$('.end_page').on("click",function(){
					var current = parseInt($('.pageInput').val());
					if(typeof(args.backFn)=="function"){
						args.backFn({'start':args.pageCount-1});
						ms.fillHtml(obj,{"current":args.pageCount,"pageCount":args.pageCount});
					}
				});
				//跳转
				$('.go_page').on('click',function () {
					var current = parseInt($('.pageInput').val());
					if(typeof(args.backFn)=="function"){
						if(current==0){
							args.backFn({'start':0});
						}else
						if(current>=args.pageCount){
							args.backFn({'start':args.pageCount-1});
							$('.pageInput').val(args.pageCount);
						}else{
							args.backFn({'start':current-1});
						}
						ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					}
				});
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 0,
			current : 0,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);