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
var count1 = 0;
var count2 = 0;
var count3 = 0;
$(function() {
	queryTabListDataAndShow(startPosition1, false, 0);
	queryTabListDataAndShow(startPosition2, false, 1);
	queryTabListDataAndShow(startPosition3, false, 2);
})
    
function queryTabListDataAndShow(startPosition, isClearUl, index){
    var queryUrlText;
    var paramData = {start:startPosition, limit: 50};
    queryUrlText = "/platform-app/mobile/meeting/pageQueryByParamMap"
    if(index==0){
        paramData.dataType = "toDo";
    }else if(index==1){
    	paramData.dataType = "haveDone";
    }else if(index==2){
    	paramData.dataType = "summary";
    }
            
    var str;
    $.ajax({
    	type: "POST", url: queryUrlText, data: JSON.stringify(paramData),
        contentType: 'application/json',  dataType: 'JSON',
        success:function(msg){
        	var result = msg.result;
            var dataList = result.list;
            if(dataList && dataList.length>0){
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
                  }
                        
                  if(isClearUl){
                      ul.empty();
                  }
                  ul.append(showListFragment(dataList,index));
              }
          }
       });
 }// end funtion()
        
 var showListFragment = function(dataList,index) {
     var fragment = document.createDocumentFragment();
     var li;
     if(index==2){
    	   for (var idx = 0; idx < dataList.length; idx++) {
 	     	var dataItem = dataList[idx];
 	     	li = $('<li></li>');
 	        li.addClass('mui-table-view-cell');
 	        li.attr('id',dataItem.id + "_"+ index);
 	        li.attr('data-urlText',dataItem.mobileUrl);
 	        var str = "<h4 class='mui-ellipsis-2 mytit'>" + dataItem.mtTitle + "</h4>";
 	        str += "<div class='detail time'><span>开会时间:</span><span>" +dataItem.entryDate+ "</span></div>";
               str += "<div class='detail'><span>发起人:</span><span>" + dataItem.createPersonName+"</span></div>";
 	        $(li).html(str);
 	        $(fragment).append(li);
 	      }
     }else{
    	   for (var idx = 0; idx < dataList.length; idx++) {
    	     	var dataItem = dataList[idx];
    	     	li = $('<li></li>');
    	        li.addClass('mui-table-view-cell');
    	        li.attr('id',dataItem.id + "_"+ index);
    	        li.attr('data-urlText',dataItem.mobileUrl);
    	        var str = "<h4 class='mui-ellipsis-2 mytit'>" + dataItem.title + "</h4>";
               str += "<div class='detail time'><span>开会时间:</span><span>" +dataItem.beginTime+ "</span></div>";
               str += "<div class='detail'><span>发起人:</span><span>" + dataItem.createPersonName+"</span></div>";
    	        $(li).html(str);
    	        $(fragment).append(li);
    	   }
     }
     return fragment;
 };//end for  showListFragment
                
 mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
       var idText = $(this).attr('id');//获取id
//       console.log("mui-table-view-cell >> idText="+idText);
       var dataArray = idText.split("_");
       var dataId = dataArray[0];
       var tabIdx = dataArray[1];
       var urlText = "/mobile/meeting/meeting_detail.html?meetingId="+dataId+"&time="+new Date().getTime();
       if(tabIdx==2){
    	   urlText = "/mobile/meeting/meeting_summary.html?meetingId="+dataId+"&time="+new Date().getTime();
       }
//       console.log("mui-table-view-cell >> urlText="+urlText);
       //传值给详情页面，通知加载新数据
       setTimeout(function() {
     	  window.location.href = path+urlText;
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
                      }
                      var self = this;
                      self.refresh(true);
                      setTimeout(function() {
                          if(index == 0){
                        	  queryTabListDataAndShow(startPosition1, true, index);                                                                          
                          }else if(index == 1){
                        	  queryTabListDataAndShow(startPosition2, true, index);
                          }else if(index == 2){
                        	  queryTabListDataAndShow(startPosition3, true, index);
                          }
                          self.endPullDownToRefresh();
                       }, 1000);
                   }
               },
               up: {
                   callback: function() {
                      var self = this;
                      if(index == 0){
                        startPosition1 += 50; 
                        if(startPosition1 > count1){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }else if(index == 1){
                        startPosition2 += 50;
                        if(startPosition2 > count2){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }else if(index == 2){
                        startPosition3 += 50;
                        if(startPosition3 > count3){
                           self.endPullUpToRefresh(true);
                           return;
                        }
                      }
                      setTimeout(function() {
                          if(index == 0){
                        	  queryTabListDataAndShow(startPosition1, false, index);                                                                         
                          }else if(index == 1){
                        	  queryTabListDataAndShow(startPosition2, false, index);
                          }else if(index == 2){
                        	  queryTabListDataAndShow(startPosition3, false, index);
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