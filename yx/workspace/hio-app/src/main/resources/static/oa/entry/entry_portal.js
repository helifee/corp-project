/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window, document) {
    var _entryPlugins = {
        ns: "_entryPlugins",
		dataPar:{
			path:null,
			name:null
		},
        resultData:null,
        /**
         * 生成父级div html
         */
        loadPlugins: function() {
            var my = this;
            var corname=$("#corname").getInputVal();
            var dataP = '{}';
            if(null!=corname&&""!=corname&&undefined!=corname){
            	dataP = '{"name":"'+corname+'"}';
            }
            $.ajax({
                url: "http://127.0.0.1:9999/platform-app/oa/sys/quick/entry/queryPortalList"+'?time='+Math.random(),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataP),
                success: function(resultData) {
                    if (resultData && resultData.success) {
                    	my.resultData = resultData.result;
                    	//清空页面
                    	$(".companyDiv,.deptDiv").empty();
                        //生成页面
                    	my.createPageElement(my.resultData);
                    } else {
                    	pop_tip_open("red",'加载数据失败！');
                    }
                    $('.content-list').niceScroll().resize();
                },
             	error: function(XMLHttpRequest, textStatus, errorThrown) {
             		pop_tip_open("red","服务异常,请联系管理员！");
                }
            });
        },
        createPageElement:function(resultData){
        	var my = this;
        	//生成一级tab
        	$.each(resultData,
                	function(i, pItem) {
                		//生成tab
                    	var companDiv = "";
                    	if(i==0){
                    		companDiv = $("<button type='button' name='approve' class='approve-btn active'>"+pItem.name+"</button>");
                    	}else{
                    		companDiv = $("<button type='button' name='approve' class='approve-btn'>"+pItem.name+"</button>");
                    	}
                    	companDiv.on("click",function() {
                    		$(this).siblings().removeClass("active");
                            $(this).addClass("active");
                            var index = $(this).index();
                            $(".deptDiv>div").hide();
                            $(".deptDiv>div").eq(index).show();
                            var btnName = $(this).attr("name");
                            $('.deptDiv').niceScroll().resize();
                            $(".deptDiv").getNiceScroll(0).doScrollTop(0, 1);
                        });
						if(i==0){
							var contentBox = $("<div class='content-box'>");
							$.each(pItem.children,function(m, item) {
								var clearfix = $("<div class='item clearfix'>");
								var pullLeft = $("<span class='item-tit pull-left' title='"+item.name+"'><span>"+item.name+"</span><i></i></span>");
								var w91 = $("<div class='pull-left w91'>");
								$.each(item.children,function(n, aitem) {
									var clearfix = $("<a href='javascript:void(0);'><span class='split'>|</span><span class='link-name'>"+aitem.name+"</span></a>");
									clearfix.on("click",function() {
										my.openUrl(aitem,my);
									});
									w91.append(clearfix);
								});
								clearfix.append(pullLeft);
								clearfix.append(w91);
								contentBox.append(clearfix);
							});
							if(i!=0){
								contentBox.hide();
							}
							$('.deptDiv').append(contentBox);
						}
                    	$('.companyDiv').append(companDiv);
            });
        	//生成2级类型及3级表单
			//setTimeout(function(){
				$.each(resultData,function(p, pItem) {
					if(p!=0){
						var contentBox = $("<div class='content-box'>");
						$.each(pItem.children,function(i, item) {
							var clearfix = $("<div class='item clearfix'>");
							var pullLeft = $("<span class='item-tit pull-left' title='"+item.name+"'><span>"+item.name+"</span><i></i></span>");
							var w91 = $("<div class='pull-left w91'>");
							$.each(item.children,function(n, aitem) {
								var clearfix = $("<a href='javascript:void(0);'><span class='split'>|</span><span class='link-name'>"+aitem.name+"</span></a>");
								clearfix.on("click",function() {
									my.openUrl(aitem,my);
								});
								w91.append(clearfix);
							});
							clearfix.append(pullLeft);
							clearfix.append(w91);
							contentBox.append(clearfix);
						});
						if(p!=0){
							contentBox.hide();
						}
						$('.deptDiv').append(contentBox);
					}
				});
			//},100);
        },
        /**
         * 打开url
         */
        openUrl: function(aitem,my) {
			var url = aitem.url;
			var isInner = aitem.isInner;
			var name = aitem.name;
			var resourceId = aitem.resourceId;
			my.dataPar.path = null;
			my.dataPar.name = null;
            if (url) {
				if(url.indexOf("http:")>=0&&isInner!=0){
					url = url;
				}else if(isInner!=0){
					if(url.indexOf(serviceUrl) == -1 && url.indexOf(".html") == -1){
						url= serviceUrl+url;
					}
            	}
            	if(isInner!=1&&url.indexOf('#[userName]')==-1){
            		window.open(url, '_blank');
            	}else{
					var btnMenuCode = null;
					var uAll = "/platform-app/sys/quick/entry/getUserAndSessionId/"+resourceId;
					$.ajax({
						type:'get',
						url:uAll,
						success: function(data) {
							btnMenuCode=data.result.code;
							debugger;
							url = url.replace("#[userName]",data.result.name).replace("#[sessionId]",data.result.roleId);
							my.dataPar.path = url;
							if(btnMenuCode){
								if(url.indexOf("?")==-1){
									my.dataPar.path = url+"?btnMenuCode="+btnMenuCode;
								}else{
									my.dataPar.path = url+"&btnMenuCode="+btnMenuCode;
								}
							}
							my.dataPar.name = name;
							if(url.indexOf("?")==-1){
								window.open('entry_redirect.html', '_blank');
							}else{
								window.open('entry_redirect.html'+url.substring(url.indexOf("?"),url.length), '_blank');
							}
						}
					})
            	}
            }
        },
		//返回path
		getParentPath:function(){
			return this.dataPar.path;
		},
		//返回name
		getParentName:function(){
			return this.dataPar.name;
		},
        /**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    	 	//生成快速入口div  html
            this.loadPlugins();
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#corname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchDate();
    			}
    		});
    	},
        /**
         * 初始化页面
         */
        pageInit: function() { // 页面初始化JS
        	$('.content-list').height($(window).height() - 80);
            $(".content-list").niceScroll({
                autohidemode: false,
                cursorcolor: "#eee",
                cursorwidth: "6px", // 滚动条的宽度，单位：便素
                cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                horizrailenabled: false, // nicescroll可以管理水平滚动
                background: "#fff"
            });
			$('#corname').inputPlaceholder();
        	//支持回车事件
    		this.bindSearchDate();
            //设置div高度及滚动条
            $(window).on('resize', function () {
            	$('.content-list').niceScroll().resize();
            	$('.content-list').height($(window).height() - 80);
            });
            //生成快速入口div  html
            this.loadPlugins();
        }
    };
    $(_entryPlugins.pageInit());
    window[_entryPlugins.ns] = _entryPlugins;
})(window, document);