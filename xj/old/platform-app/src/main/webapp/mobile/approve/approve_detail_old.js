	var showUserPickerButton;
    var userResult;
    var wpId = 0;
    //taskId 新增
    var taskId =0;
    var userPicker;
    var backSkip = "false";
    var rebackUrl=document.referrer;
    var rebackGoUrl=document.referrer;
    var userId;
    var path;
    var wiid;
    var from = "0";
    var isMuti=0;
    var isback="";//"${param.back}";
    var mobibleParam;
    var paramText = "";
    //本页面的URL格式是approve_detail.html?param=XXXX&userArray={}&isback=NO
    //至少会带过来三个参数
    //msgId=1111&users=[]&isback=N&opCode=NA&tabIdx=1
    var url = decodeURI(location.href);
  	var urlText = url.split("?")[1];
  	var paramArray = urlText.split("&");
  	var msgId = paramArray[0].split("=")[1]; 
  	var selectUserText =  paramArray[1].split("=")[1]
    var selectUser = JSON.parse(decodeURIComponent(selectUserText||'[]'));
    
  	isback = paramArray[2].split("=")[1];
  	var isMutiBack="";
    if(isback && isback!="YES"){
		rebackUrl="approve/approve_list.html";
		isMutiBack = "1";
    }
    var opCode = paramArray[3].split("=")[1];
    var tabIdx = paramArray[4].split("=")[1];
    
    (function($, doc) {
    	$.init({
    		swipeBack: true //启用右滑关闭功能
        });
        $.ready(function() {
   			userPicker = new $.PopPicker();
   			e("showUserPicker").addEventListener('tap',function(){
   				userPicker.show(function(items) {
   	        		var item=items[0];
   	        		e("userResult").innerText = item.text;
   					wpId = item.value;
   					taskId = item.bvalue;
   					//jQuery("#selectReturnNode").prepend(template("buttonTemplate",{name:item.text,value:item.value}));
   				});
   	        },false);
         });
    })(mui, document);
        
    //进入详情界面加载数据完成之前，显示对话框提示。
	var ajaxLoading = $("#background,#progressBar1");
	//点击提交按钮，返回结果之前显示对话框提示。
	var ajaxSubmit = $("#background,#progressBar2");
	ajaxLoading.hide();
	ajaxSubmit.hide();
    $(function() {
    	var curWwwPath = window.document.location.href;
        var pathName =  window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPaht = curWwwPath.substring(0,pos);
        var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        path = localhostPaht + projectName;
        getMobileParamAndQueryFormData();
        
        //renderCheckStatus();
		//给被选择人的按钮加上删除事件
		$("#selectUserDiv").delegate("button.selectUserButton","click",function(){
			var $this=$(this);
			var name=$this.attr("data-name");
			var value=$this.attr("data-value"); 
			for(var i=0;i<selectUser.length;++i){
				if(selectUser[i].value==value){
					selectUser.splice(i,1);
				}
			}
			$this.remove();
		});
   });
        
    //选择用户之后 将页面回到从前
	function renderCheckStatus(){
    	//console.log("renderCheckStatus is called.. (判读是否从选择页面过来,,,, )isback="+isback);
		//判读是否从选择页面过来
	    //从选择用户过来
        if(isback == "YES" || isback == "Y"){
			if(isMutiBack=="1"){
				var $that=$("#clfs").find("input[code=XB]");
         		$that.attr("checked",true);
                $("#opCode").val("XB");
                $("#opName").val("协办");
                isMuti=1;
         	}else if(isMutiBack=="0"){
         		var $that=$("#clfs").find("input[code=ZB]");
         		$that.attr("checked",true);
                $("#opCode").val("ZB");
                $("#opName").val("转办");
                isMuti=0;
            }
            
			$("#selectUserDiv").show();
            //渲染按钮
            console.log("selectUser",selectUser);
            if(selectUser.length){
            	var htmlFrag="",userNames="",userIds="";
         		for(var i=0;i<selectUser.length;++i){
         			if(i==0){
         				userNames+=selectUser[i].name;
         				userIds+=selectUser[i].value;
         			}else{
         				userNames+=","+selectUser[i].name;
         				userIds+=","+selectUser[i].value;
         			}
         			htmlFrag+=template("buttonTemplate", selectUser[i]);
         		}
             	//$("#selectUserDiv").find("button.selectUserButton").remove();
            	$("#selectUserDiv").prepend(htmlFrag);
            	$("#dealUsersNames").val(userNames);
            	$("#dealUsersIds").val(userIds);
            }else{
            	$("#dealUsersNames").val("");
            	$("#dealUsersIds").val("");
            }
       }
	}
    
    //清除协办转办状态和按钮
    function clearCheckStatus(){
    	selectUser=new Array();
        $("#selectUserDiv").find("button.selectUserButton").remove();
        $("#dealUsersNames").val("");
		$("#dealUsersIds").val("");
    }
    
    //点击打开页面 wiid=4459&userId=shenpi22&from=0
	e("selectUserButtonId").addEventListener('tap',function(){
		rebackGoUrl=rebackUrl;
		if(!rebackUrl){
			/* if(backType==0){
				rebackUrl=path +"/weixin/todo_ds.html";	
			}else if(backType==1){
				rebackUrl=path +"/weixin/todo_dy.html";	
			}else if(backType==2){
				rebackUrl=path +"/weixin/todo_yb.html";	
			}else if(backType==3){
				rebackUrl=path +"/weixin/todo_fq.html";	
			} */
			rebackUrl=path +"/mobile/approve/approve_list.html";	
		}
		var paramSelectUser = JSON.stringify(selectUser);
		//msgId="+params[0]+"&users=[]&isback=N&opCode=NA&tabIdx=0
		var tempParamText = "?msgId="+msgId+"&users="+paramSelectUser+"&isback=NO&opCode="+opCode+"&tabIdx="+tabIdx;
		var urlText = "/mobile/approve/selectUser.html"+tempParamText;
		window.location.href=path+urlText
  });
        
		 
	//本页面所有的ajax都加载完成显示页面
	$(document).ajaxStop(function(){
		$("body").show();
		//console.log("本页面所有的ajax都加载完成显示页面 >> isback="+isback);
	 	if(isback){
	 		$("html,body").scrollTop($("#selectUserAnchor").offset().top);
	 	}
	});
	
	function getMobileParamAndQueryFormData(){
		$.ajax({
	       url: path+"/flow/sysNoticeMsg/get/"+msgId, type: 'GET',
	       contentType: 'application/json', dataType: 'JSON',
	       success: function (resultData) {
	    	   mobibleParam = resultData.result.mobibleParam;
	    	   queryFormData(mobibleParam);
	       }
		});
	}
	
    function queryFormData(paramDataText) {
        $.ajax({
        	type: "POST",
            url: path + "/mobile/approve/queryMobileApprove",
            data: paramDataText, //JSON.stringify(paramData),
            contentType: 'application/json',
  	        dataType: "json",
            //在发送请求之前调用
         	beforeSend: function(){
            	ajaxLoading.show();
         	},
         	//请求完成后回调函数 (请求成功或失败之后均调用)。
         	complete: function(){
            	ajaxLoading.hide();
         	},
            success:function(retData){
            	var dataDto = retData.result;
            	var dataList = dataDto.dataList;
                var str;
                // 业务信息
                var data;
                if (dataDto && dataList) {
                     $("#ywxx").empty();
                     for (var i = 0; i<dataList.length; i++) {
                   	  str = "<tr><td   class=\"title\" style=\"padding: 5px; WORD-WRAP: break-word \">" + dataList[i].name + "</td><td class=\"titlevalue\" style=\"padding: 5px;padding-left: 10px;\">" + dataList[i].value + "</td></tr>";
                         $("#ywxx").append(str);
                     }
                }
                // 业务附件
                var fileList = dataDto.fileList
                if (dataDto && fileList) {
                    $("#ywxxfjsl").empty().append("附件("+ fileList.length +")");
                    $("#ywxxfjlist").empty();
                    for (var i = 0; i<fileList.length; i++) {
                    	str = "<li class=\"mui-table-view-cell\"><a class=\"mui-navigate-right\" onclick=\"downLoad(this,'"+ fileList[i].url +"')\">"+fileList[i].fullName +"</a></li>";
                        $("#ywxxfjlist").append(str);
                    }
                }
                      
                var flowList = dataDto.flowList;
                // 审批流程
                if (flowList) {
                    $("#splc").empty();
                    var flag = "";
                    //status   wiName  personName  opName  userNote  completeTime
                    //acStatus  acName    approverName           taskComments   acEndTime
                    for (var i = 0; i<flowList.length; i++) {
                    	//1-未运行; 2-运行中; 3-已完成
                  	  if (flowList[i].acStatus == '3') {// 已办
                            flag = "pass";
                        } else if (flowList[i].acStatus == '2') {// 待办
                            flag = "current";
                        } else if (flowList[i].acStatus == '1') {// 未办
                            flag = "waiting";
                        }
                        str = "<li class='dian_"+ flag+ "'a><p class='jiao_"+ flag +"'><span class='"+ flag+"'>";
                        str += "["+ flowList[i].acName + "]";
                        if(flowList[i].approverName){
                      	  str += "&nbsp;&nbsp;"+ flowList[i].approverName;
                        }
                        /**
                        if(data[i].opRole){
                      	  str +=  "(" + data[i].opRole +")";
                        }
                        **/
                        if (flowList[i].opName != null) {
                            str += "[" + flowList[i].opName + "]";
                        }
                        if (flowList[i].taskComments != null) {
                      	  str += "<br/>" + flowList[i].taskComments;
                        }
                        if (flowList[i].acEndTime != null) {
                        	var taskEndTime = flowList[i].taskEndTime;
                        	if(!taskEndTime || "null"==taskEndTime ){
                        		taskEndTime = "";
                        	}
                            str += "<br/>" + taskEndTime;
                        } 
                        str += "</span></p></li>";
                        $("#splc").append(str);
                    }
                }
                // 处理方式
                // TG：通过  WYY：无异议（不需要填写意见） HF：回复  XB：协办  JS：接受  BJS：不接受  GTFQR：沟通  BH：驳回  ZB：转办 CH:收回
                //消息操作类型 DB(1待办) YB(2已办) YD(3已读) WD(4未读) RM(5删除)
                if(dataDto.opType.toUpperCase() != "DB" && dataDto.opType.toUpperCase() != "WD"){
              	     //$("#spcz").hide();
                }
                      
                if(tabIdx>0 || tabIdx!="0"){//0-是待办,其他的分别是 待阅-已办和我的发起
                	$("#spcz").hide();
                	return "";
                }
                var nextList = dataDto.nextList;
                if (nextList) {
                    $("#clfs").empty();
                    $("#clfs").append("\n");
                    if(nextList && nextList.length>0){
                     	for (var i=0; i<nextList.length; i++) {
                           var str="";
                           if ("|BH|HF|TG|GTFQR|ZB|WYY|JS|BJS|GTFQR|XB|TY|DH|".indexOf("|"+nextList[i].operationCode+"|")>-1) {
                               str = "<div class=\"mui-input-row mui-radio mui-left\">";
                               str += "<label>"+nextList[i].operationName+"</lable>";
                               var checkedText = "";
                               if(nextList[i].operationCode == opCode){
                            	   checkedText = "checked=\"checked\" ";
                               }
                               str += "<input type=\"radio\" name=\"cz\""+checkedText+" opname=\""+ nextList[i].operationName
                               +"\"  code=\""+ nextList[i].operationCode + "\" value=\""+ nextList[i].operationCode 
                               + "_"+ nextList[i].operationName +"\" onclick=\"czClick(this)\"/>";
                               str += "</div>";
                               $("#clfs").append(str);
                          } 
                       }
   				  }else{
	    				str = "<div class=\"mui-input-row mui-radio mui-left\">";
                        str += "<label>收回</lable>";
                        str += "<input type=\"radio\" name=\"cz\" opname=\"收回\"  code=\"SH\" value=\"SH\" onclick=\"czClick(this)\"/>";
                        str += "</div>";
                        $("#clfs").append(str);  
                     }
                } else {
                    //$("#spcz").hide();
                }
                      
                // 隐藏字段赋值
                /* if (msg.toDoWorkEntity != null) {
                    $("#wiId").val(msg.toDoWorkEntity.wiId);
                    $("#backToWpId").val(msg.backToWpId);
                    $("#backToTaskId").val(msg.backToTaskId);
                } */
                renderCheckStatus();
                //驳回节点
                /* if(msg.todoWpBeans != null){
              	  var s = msg.todoWpBeans;
              	  var t = new Array;
              	  //转换json的格式为{value : 5459,text : "发起",bvalue:56789}
              	  for(var i=0;i<s.length;++i){
              		if(s[i].wpId){
              			  t.push({value:s[i].wpId,text:s[i].wpName+"【"+s[i].taskDealPersonName+"】",bvalue:s[i].flowInstanceTaskId});
              		}else{
              			  t.push({value:s[i].flowInstanceStepId,text:s[i].wpName+"【"+s[i].taskDealPersonName+"】",bvalue:s[i].flowInstanceTaskId});
              		}
              	  
              	  }
                    userPicker.setData(t);
                } */
           }
      });
  }
  
  function downLoad(obj, urlText) {
   	  obj.href = urlText;
   	  obj.onclick = function(){};
   	  window.open(obj.href);
  }
    
  function czClick(obj) {// 点击操作选项事件
   	var $this=$(obj);
   	var code=$this.attr("code");
   	opCode = code;
   	var opname=$this.attr("opname");
   	$("#opCode").val(code);
    $("#opName").val(opname);
    $("#userNote").val(opname);
    //$("#selectUserDiv").hide();//将用户名选择隐藏
    //$("#selectReturnNode").hide();
    if(code=="BH"){//驳回
    	  $("#selectUserDiv").hide();//将用户名选择隐藏
        $("#selectReturnNode").show();
 	      $("#dealIdea").show();
    }else if(code=="XB"){//协办
        $("#dealIdea").show();
        $("#selectUserDiv").show();
        isMuti=1;
        //clearCheckStatus();
    }else if(code=="ZB"){//转办
    	  $("#dealIdea").show();
        $("#selectUserDiv").show();
        isMuti=0;
        //clearCheckStatus();
    }else if(code=="WYY"){//其他
    	 $("#dealIdea").show();
    	 $("#selectUserDiv").hide();//将用户名选择隐藏
    }else{
    	 $("#dealIdea").show();
    	 $("#selectUserDiv").hide();//将用户名选择隐藏
    }
  }
          
  function chooseRepeatApprove(obj) {// 选择是否重新审批
   	 var $this = $(obj);
   	 var value = $this.attr("value");
     if(value == "yes"){
         backSkip = "true";
     }else if(value == "no"){
       	 backSkip = "false";
     }
  } 
        
  function doSubmit(){
     var checkRadioArray = $("#clfs").find(":radio:checked");
     //console.log(checkRadioArray);
     if(!$("#clfs").find(":radio:checked").length){
         alert("请选择一种审批操作！");
         return;
     }
        	
     /* var jsonParams={
     	backSkip:backSkip,
     	backToWpId:wpId,
     	backToTaskId:taskId,
     	opCode:$("#opCode").val(),
     	opName:$("#opName").val(),
     	userName:userId,
     	userNote:$("#userNote").val() +"(来自:微信)", 
     	wiId:$("#wiId").val(),
     	dealUsersIds:$("#dealUsersIds").val(),
     	dealUsersNames:$("#dealUsersNames").val()
     }; */
      var selectRadioValue = $("input[type='radio']:checked").val();//$('input:radio[name="zc"]:checked').val();
      //var operationType = $("#opCode").val();
      var selectedValues = selectRadioValue.split("_");
      var operationType = selectedValues[0];
      var operationName = selectedValues[1];
      var paramObj = JSON.parse(mobibleParam);
      var instanceId = paramObj.instanceId;
      var taskId = paramObj.taskId;
      var submitData = {instanceId: instanceId, taskId: taskId, msgId: msgId,
           operationType:operationType, operationName:operationName, userNote:$("#userNote").val()+"(来自:移动)"};
      //验证转办协办人不能为空
      if("ZB|XB".indexOf(operationType)>-1){
      	 if(!$("#selectUserDiv").find("button.selectUserButton").length){
      		alert("请选择转办/协办人！");
      		return ;
      	 }
      	 //转办：transferId 转办人ID、transferName转办人名称
      	 //协办：assisters值的逗号分隔、assistersName;名称值的逗号分隔
      	
		 if(operationType == "ZB"){
			submitData.transferId =  $("#dealUsersIds").val();
			submitData.transferName = $("#dealUsersNames").val();
		 }
		 if(operationType == "XB"){
			submitData.assisters = $("#dealUsersIds").val();
			submitData.assistersName = $("#dealUsersNames").val();
		 }
      }
      //验证驳回节点不能为空
      if("BH".indexOf(operationType)>-1){
      	  if(jsonParams.backToWpId == 0){
      		alert("请选择驳回节点！");
      		return;
      	  }
      }
	        
	  var reallyScrollHeight = (document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight:document.documentElement.scrollHeight;
		$("#background").height(reallyScrollHeight);
        $("#progressBar2").css({"margin-top":reallyScrollHeight-$(window).height()});
		//ajaxSubmit.show();
        $.ajax({
            type : "post",//提交数据的类型 POST GET
            url : path + "/flow/instance/approval",
			timeout : 60000,
			data: JSON.stringify(submitData), //提交的数据
            contentType: 'application/json',
  	        dataType: "json",//返回数据的格式
            beforeSend: function(){//在发送请求之前调用
            	ajaxSubmit.show();// Handle the beforeSend event
            },
            
            complete: function(){//请求完成后回调函数 (请求成功或失败之后均调用)。
              	ajaxSubmit.hide();// Handle the complete event
            },
            //成功返回之后调用的函数             
            success: function(data){
				//ajaxSubmit.hide();
                if (data.resultCode == '2') {
                    alert("提交失败");
                }else {
                    alert("提交成功");
                    window.location.href = path + "/mobile/approve/approve_list.html";
               }   
         } 
	 });
  }
  
  