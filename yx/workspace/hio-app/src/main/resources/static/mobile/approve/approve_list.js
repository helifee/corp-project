var path;
$(function() {
    var curWwwPath = window.document.location.href;
    var pathName =  window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    path = localhostPaht + projectName;
});

mui.init();
var startPosition1 = 0;
var startPosition2 = 0;
var startPosition3 = 0;
var startPosition4 = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
$(function() {
	initUserInfo();
	var isMy=$.getUrlParam("isMy");
	if(isMy && isMy=='1'){
		$("#sliderSegmentedControl").remove(); 
		$("title").html("我的发起"); 
		$("#ds").css("display","none");
		$("#dy").css("display","none");
		$("#yb").css("display","none");
		$("#ds_div").css("display","none");
		$("#dy_div").css("display","none");
		$("#yb_div").css("display","none");
		getToDoData(0, true, 3);
	}else{
		changeMenu();
		queryAndShowToDoSum();
	}
	/*//读取待审的列表数据
	getToDoData(startPosition1, false, 0);
	//读取待阅的列表数据
	getToDoData(startPosition2, false, 1);
	//读取已办的列表数据
	getToDoData(startPosition3, false, 2);
	//读取我的发起的列表数据
	getToDoData(startPosition4, false, 3);
	//读取待办待阅的汇总数据
	queryAndShowToDoSum();*/
	
})
$.getUrlParam = function(name){
	     var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
	     var r = decodeURI(window.location.search).substr(1).match(reg);
	     if (r!=null ){
	         return unescape(r[2]);
	     }
	     return null;     
	};
function changeMenu(){
	var menu=$.getUrlParam("menu");
	if(!menu){
		menu=0;
	}
	mui('#slider').slider().gotoItem(menu);
	getToDoData(0, true, menu);
}
//---
//获取url参数
function getTextUrlParams(url) {
	var tendCodeParam = url.substring(url.indexOf('?'));
	tendCodeParam = tendCodeParam.replace('?', '').replace(/&/g, '","');
	tendCodeParam = tendCodeParam.replace(/=/g, '":"');
	if (tendCodeParam != "") {
		try{
			tendCodeParam = JSON.parse('{"' + tendCodeParam + '"}');
		}catch(e){}
	}

	return tendCodeParam;
}
//当前登录人 
var currentUserLoginName;
function initUserInfo(){
	var uBody = "/sys/org/user/getMyInfo?time="+Math.random();
	var uAll = "http://127.0.0.1:9999/platform-app" + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		dataType:'JSON',
		async:false,
		success: function(data) {
			currentUserLoginName = data.result.loginName;
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("获取用户请求失败");
		}
	});
}
//
function taskView(urlText){
	var tendCode = getTextUrlParams(urlText).tendCode;
	var flag = checkLogin(tendCode);
	if(!flag){
        if(tendCode){
            window.open('/platform-app/login.html?tendCode='+tendCode+'&_time='+Math.random(),'_self');
        }else{
            window.open('/platform-app/login.html?_time='+Math.random(),'_self');
        }

		return;
	}
   
	return tendCode;
}
//跨租户登录
function checkLogin(tendCode) {
    var flag = true;
    var url = path + '/sys/thirdPartyAuthentication/checkLogin?_time=' + new Date().getTime();
	//跨租户消息问题，暂时注释掉
	if(currentUserLoginName){
		url = url +'&loginName='+currentUserLoginName;
	}
    if(tendCode){
        url += '&tendCode='+tendCode + '&_s='+tendCode;
    }
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'JSON',
        async: false,
        success: function (resultData) {
            flag = resultData.success;
        },
        error: function (xhr) {
            flag = false;
        }
    });
    return flag;
}

//---

function queryAndShowToDoSum(){
	var queryUrlText = "http://127.0.0.1:9999/platform-app/flow/sysNoticeMsg/queryTwoSumData";
	$.ajax({
    	type: "POST", url: queryUrlText, data: JSON.stringify({}),
        contentType: 'application/json',  dataType: 'JSON',
        success:function(returnData){
        	if(returnData.success){
        		var itemData = returnData.result[0];
        		if(itemData && itemData.toDoSum && itemData.toDoSum>0){
        			$("#toDoSum").text(itemData.toDoSum);
            		$("#toDoSum").show();
        		}else{
        			$("#toDoSum").text("");
            		$("#toDoSum").hide();
        		}
        		if(itemData && itemData.toReadSum && itemData.toReadSum>0){
        			$("#toReadSum").text(itemData.toReadSum);
        			$("#toReadSum").show();
        		}else{
        			$("#toReadSum").text("");
        			$("#toReadSum").hide();
        		}
        	}else{
        		$("#toDoSum").text("");
        		$("#toDoSum").hide();
        		$("#toReadSum").text("");
        		$("#toReadSum").hide();
        	}
        }
	});
}
function getToDoData(startPosition, isClearUl, index){
    var queryUrlText;
    var paramData = {start:startPosition, limit: 25};
    queryUrlText = "http://127.0.0.1:9999/platform-app/flow/sysNoticeMsg/searchDataByKeyword"
    if(index==0){
        paramData.dataType = "DB";//"TO_DO";
    }else if(index==1){
    	paramData.dataType = "DY";//"TO_READ";
    }else if(index==2){
    	paramData.dataType = "HAVE_DONE";
    }else if(index==3){
    	paramData.dataType = "FQ";//"MY_START";
    }
    paramData.more=true;
    var str;
    $.ajax({
    	type: "POST", url: queryUrlText, data: JSON.stringify(paramData),
    	
        contentType: 'application/json',  dataType: 'JSON',
        success:function(msg){
        	var result = msg.result;
            var dataList = result.list;
            var tab;
            if(index==0){
               tab=$("#ds_div");
            }else if(index==1){
            	tab=$("#dy_div");
            }else if(index==2){
            	tab=$("#yb_div");
            }else if(index==3){
            	tab=$("#fq_div");
            }
           	tab.find(".mui-pull-loading").html("下拉重新加载");
            if(dataList ){
                  var ul;
                  if(index==0){
                	  ul = $("#tab_1");
                      count1 = result.total;
                  }else if(index==1){
                      ul = $("#tab_2");
                      count2 = result.total;
                  }else if(index==2){
                      ul = $("#tab_3");
                      count3 = result.total;
                  }else if(index==3){
                      ul = $("#tab_4");
                      count4 = result.total;
                  }
                        
                  if(isClearUl){
                      ul.empty();
                  }
                  if(dataList.length>7){
                	  tab.find(".mui-pull-loading").html("上拉显示更多");
                  }
                  ul.append(showListFragment(dataList,index));
              }
          }
       });
 }// end funtion()
        
 var showListFragment = function(dataList,index) {
     var fragment = document.createDocumentFragment();
     var li;
     for (var idx = 0; idx < dataList.length; idx++) {
     	var dataItem = dataList[idx];
     	var remainTimeMillis;
       	var dealTime;
       	var intHours;
       	var remainTimeStr;
       	var sendDate = dataItem.sendDate;
       	if(sendDate){
         	var str = sendDate.replace(/-/g,"/");
         	var date = new Date(str);
         	dealTime = date.getTime();
         }
         remainTimeMillis = new Date().getTime() - dealTime;
         if(remainTimeMillis > 0){
             intHours = remainTimeMillis / (1000 * 60 * 60);
             intHours = intHours | 0;
         }
         if(intHours > 0){
             remainTimeStr = "停留" + intHours + "小时";
         }else{
        	 remainTimeStr = "停留0小时";
         }
         li = $('<li></li>');//document.createElement('li');
         li.addClass('mui-table-view-cell');
         li.attr('id',dataItem.id + "_"+ index);
         li.attr('data-urlText',encodeURI(dataItem.mobibleUrl));
         var str;
         if(index == 0 || index == 1){
             str = "<h4 class='mui-ellipsis-2' style='word-break: break-all;word-wrap: break-word;font-weight: normal'>" + dataItem.title + "</h4>";
             if(remainTimeStr != undefined) {
                 str += "<h5><i class='mui-icon iconfont icon-shijian'></i>" + remainTimeStr + "</h5>";
             }
         }else {
             str = "<h4 class='mui-ellipsis-2' style='word-break: break-all;word-wrap: break-word;font-weight: normal'>" + dataItem.title + "</h4>";
         }
         $(li).html(str);
         $(fragment).append(li);
     }
     
     return fragment;
 };//end for  showListFragment
var keywords = ['2017年度考核', '2017年考核'];
 mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
     if($(this).parents(".mui-active").attr("id")=="ds_div"){
         var text = $(this).find("h4").text();
         var hasKeyWords = false;
         for(var i in keywords){
             if(text.indexOf(keywords[i])>-1){
                 hasKeyWords = true;
             }
         }
         if(hasKeyWords){
             alert("请在pc端查看");
             return;
         }
     }

       var idText = $(this).attr('id');//获取id
       var urlText =$(this).attr('data-urlText');
       var tendCode = taskView(urlText);
       //传值给详情页面，通知加载新数据
       var params = idText.split("_");
       setTimeout(function() {
    	   var oldUrl=urlText;
    	   if(urlText && urlText.indexOf("msgId=")<0){
    		   if(urlText.indexOf("?")>=0){
    			   urlText = urlText+"&msgId="+params[0]+"&users=[]&isback=N&opCode=NA&tabIdx="+params[1]+"&time="+Math.random();
    		   }else{
    			   urlText = urlText+"?msgId="+params[0]+"&users=[]&isback=N&opCode=NA&tabIdx="+params[1]+"&time="+Math.random();
    		   }
    	   }else{
    		   if(urlText.indexOf("?")>=0){
    			   urlText = urlText+"&time="+Math.random();
    		   }else{
    			   urlText = urlText+"?time="+Math.random();
    		   }
    	   }
    	   if(tendCode){
    		   urlText += '&_s='+tendCode;
    	   }
    	   //蓝翎的不拼接参数
    	   if(urlText &&urlText.indexOf("UserId")>0){
    		   urlText=oldUrl;
    	   }
    	   if(urlText && urlText.indexOf("http")==0){//以http打头的请求,就直接调整了
    		   window.location.href = urlText;
    	   }else{
    		   window.location.href = path+"/"+urlText;
    	   }
    	   
       },1000);
 });

(function($) {
   var deceleration = mui.os.ios?0.003:0.0009;//阻尼系数
   $('.mui-scroll-wrapper').scroll({
      bounce: false,
      indicators: true, //是否显示滚动条
      deceleration:deceleration
   });
      
   $.ready(function() {
      //循环初始化所有下拉刷新，上拉加载。
      $.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
          $(pullRefreshEl).pullToRefresh({
              down: {
                   callback: function() {
                      if(index == 0){
                    	  startPosition1 = 0;                                                                        
                      }else if(index == 1){
                          startPosition2 = 0;  
                      }else if(index == 2){
                          startPosition3 = 0;  
                      }else if(index == 3){
                          startPosition4 = 0;  
                      }
                      var self = this;
                      self.refresh(true);
                      setTimeout(function() {
                          if(index == 0){
                        	  getToDoData(startPosition1, true, index);
                        	  queryAndShowToDoSum();
                          }else if(index == 1){
                        	  getToDoData(startPosition2, true, index);
                        	  queryAndShowToDoSum();
                          }else if(index == 2){
                        	  getToDoData(startPosition3, true, index);
                          }else if(index == 3){
                        	  getToDoData(startPosition4, true, index);
                          }
                          self.endPullDownToRefresh();
                       }, 1000);
                   }
               },
               up: {
                   callback: function() {
                      var self = this;
                      if(index == 0){
                        startPosition1 += 25; 
                        if(startPosition1 > count1){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }else if(index == 1){
                        startPosition2 += 25;
                        if(startPosition2 > count2){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }else if(index == 2){
                        startPosition3 += 25;
                        if(startPosition3 > count3){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }else if(index == 3){
                        startPosition4 += 25;
                        if(startPosition4 > count4){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }
                      setTimeout(function() {
                          if(index == 0){
                        	  getToDoData(startPosition1, false, index);                                                                         
                          }else if(index == 1){
                        	  getToDoData(startPosition2, false, index);
                          }else if(index == 2){
                        	  getToDoData(startPosition3, false, index);
                          }else if(index == 3){
                        	  getToDoData(startPosition4, false, index);
                          }
                          self.endPullUpToRefresh(false);
                       }, 1000);
                        
                       }
                   }
               });
           });
       });
   })(mui);
   
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
   WeixinJSBridge.call('hideOptionMenu');
   WeixinJSBridge.call('hideToolbar');
});
/**
 * 切换页签，重新加载数据
 */
document.getElementById('ds').addEventListener('tap',function(){
	getToDoData(0, true, 0);
	queryAndShowToDoSum();
});
document.getElementById('dy').addEventListener('tap',function(){
	getToDoData(0, true, 1);
	queryAndShowToDoSum();
});
document.getElementById('yb').addEventListener('tap',function(){
	getToDoData(0, true, 2);
});
document.getElementById('fq').addEventListener('tap',function(){
	getToDoData(0, true, 3);
});
