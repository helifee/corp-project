/**
* 封装ajax数据生成html模板接口 依赖jquery和underscore 使用是务必将这两个库提前引入
*/
+(function($) {
	var AjaxUtil = function(opts) {

		this.settings = $.extend({
			url: null,
			data: {},
			templateObj: null,	//页面模板id
			pagination: true,	//是否分页
			dataHandler: null,	//对ajax请求到数据后对其进行处理的方法
			callbackHandler: null,
			ajaxCompleteFun: null,
            ajaxBeforeSendFun: null,
			pagerHandler: null,	//分页处理函数
            wrapperClass: null	//包裹list的dom
		}, opts);
		
//		this.init();

	}
	
	AjaxUtil.prototype = {
		init: function() {	//res 是ajax获取的数据
			var option = this.settings;
			var _this = this;
			_this.getData('async', function(res) {
				var data = res.result.list;	//数组对象
				var page = {
					start: res.result.start,
                    total: res.result.total,
                    limit: res.result.limit
				};
				if(option.dataHandler && (typeof option.dataHandler) == 'function') {
					var bakData = data;
					data = option.dataHandler(data, res);	//对数据进行处理 data: res.body; res:元数据
					data = data ? data : bakData;
				}
				var template = _this.getHtmlTemplate(option.templateObj[0]);
				var container = $(option.templateObj[0]).parent();
                // var targetWrapper = option.wrapperClass ? $('<ul class="data-list ' + option.wrapperClass + '"></ul>') : $('<ul class="data-list"></ul>');
				var targetWrapper = container;
				// var dom = _this.buildDom(data, template);
				var dom = _this.buildDom(data, option.templateObj);
				var dataUL = $('.item-list');
				if(dataUL.length <= 0) {
                    targetWrapper.html(dom);
					container.append(targetWrapper).show();
				}else {
					dataUL.html(dom);
				}
				
				
				//是否分页
				if(option.pagination && page && page.total > 1) {
					var pageContainer = $('.page');
					_this.pagination(page, pageContainer);
				}
				/*else {
					$(".page").remove();
				}*/
				
				if(option.callbackHandler && (typeof option.callbackHandler) == 'function') {
					option.callbackHandler();
				}
			});
		},
		buildDom: function(data, template) {	//替换模板 生成dom结构
			var _this = this;
			if(_.isArray(data)) {
				var dom = '';
				var len = data.length;
				if(len > 0) {
                    for(var i = 0; i < len; i++) {
                        var obj = data[i];
                        var keys = _.keys(obj);
                        var baktmp = (i==0&&obj.floorHost?$(template[0]).html():$(template[1]).html());
                        for(var j = 0; j < keys.length; j++) {	//模板替换
                            var reg = new RegExp("{{\\s*" + keys[j] + "\\s*}}", "gim");	//使用正则表达式的构造函数 可以加入变量
							if(baktmp&&baktmp!=null){
								baktmp = baktmp.replace(reg, obj[keys[j]]);
								if(keys[j]=='content'&&obj.referData&&obj.referData.length>0){  //处理回复引用的信息
									var tmp = baktmp;
									var container = $('<div/>');
									var refertmp = $(template[2]).html();
									var referDom = '';
									var dataArr =  new Array();
									//  替换引用模板并放入数组
                                      for(var k=0;k<obj.referData.length;k++){
                                      	var tmprefer = refertmp;
                                      	  var refer = obj.referData[k];
										  var referKeys = _.keys(refer);
										  for(var m=0;m<referKeys.length;m++){
											  var referReg = new RegExp("{{\\s*" + referKeys[m] + "\\s*}}", "gim");
											  tmprefer = tmprefer.replace(referReg,refer[referKeys[m]]);
										  }
										  dataArr[k] = $(tmprefer);
									  }
                                     //把处理好的引用数组，递归成盖楼的回复
									_this.setDiv(1,dataArr.length,'',dataArr,referDom,container);
									//添加含有引用的内容样式
									tmp= tmp.replace('hf-con-text','hf-con-text has-yy');
									//在带有引用信息的回复模板中添加引用拼装好的盖楼内容HTML
									tmp = tmp.replace('<div id="refer-div'+obj.replyId+'"></div>',container.html());
									baktmp = tmp;
								}
							}
							continue;
                        }
                        dom += baktmp;
                    }
				}else {	//没有数据
					dom = '<div class="ajaxNoData">没有数据</div>'
				}
				return dom;
			}else {
				throw new Error('AjaxUtil ---> buildDom: 传入的数据不是数组对象');
			}
		},
		getHtmlTemplate: function(obj) {
			if(!obj) {
				throw new Error('AjaxUtil ---> getHtmlTemplate: 没有传入模板id');
			}
			if($(obj).length <= 0) {
				return null;
			}
			return $(obj).html();
		},
		pagination: function(page, pageContainer) {
			var _this = this;
			var option = this.settings;
			var container = pageContainer;
			container.createPage({
		        pageCount:parseInt((page.total-1)/page.limit) + (((page.total-1)%page.limit>0)?1:0),
		        current: parseInt(page.start==0?1:(page.start/page.limit+1)),	//当前页
		        backFn:function(p){
		        	if(option.pagerHandler && (typeof option.pagerHandler) == 'function') {
		        		var postData = JSON.parse(option.data);
						postData.start = postData.limit*p.start;
		        		option.pagerHandler(postData);
		        		return;
		        	}
		        	// console.log(_this.settings);
		        }
		    }); 
		},
		getData: function(async, fn) {	//获取数据 的方法
			var option = this.settings;
			
			var isAsync = async && async === 'async' ? true : false;

			if(!option.url) {
				throw new Error('没有传入数据接口');
			}
			
			var result = null;
			$.ajax({
				url: option.url + '?t=' + new Date().valueOf(),
				type: option.type ? option.type : 'GET',
				async: isAsync,
                contentType: 'application/json;charset=utf-8',
				dataType:'json',
				data: option.data,
				beforeSend: function( xhr ) { 
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    if(option.ajaxBeforeSendFun && (typeof option.ajaxBeforeSendFun == 'function')) {
                        option.ajaxBeforeSendFun();
                    }
				},
				success: function(res) {
				/*	console.log("======AjaxUtil data Begin======")
					console.log(res)
					console.log("======AjaxUtil data End======")*/
					if(res && res.success && res.result && res.result.list.length > 0) {	//对数据进行判断
						result = res;
						if(fn && (typeof fn == 'function')) {
							fn(res);
						}
					}else {
						$.xljUtils.tip('red',res.msg);
					}
				},
				error: function() {
					console.log('error');
				},
				complete: function(res) {
					if(option.ajaxCompleteFun && (typeof option.ajaxCompleteFun == 'function')) {
                        option.ajaxCompleteFun($.parseJSON(res.responseText));
					}
				}
			});
			return result;
		},
		setDiv:function(i,j,$div,dataArr,dom,container){
			var _this = this;
			var cdiv= dataArr[i-1];
			if(dom!=''){
				cdiv.appendTo($div);
			}else{
				dom = cdiv;
			}
			i++;
			if(i<=j){
				return _this.setDiv(i,j,cdiv,dataArr,dom,container);
			}else {
				container.append(dom);
				return false;
			}
		}

}
	
	window.AjaxUtil = AjaxUtil;
})(jQuery);



















