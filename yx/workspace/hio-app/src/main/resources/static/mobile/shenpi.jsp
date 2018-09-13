<%@ page language="java"  contentType="text/html; charset=UTF-8" pageEncoding="utf-8" %>
<%
response.setContentType("text/html;charset=UTF-8");
request.setCharacterEncoding("utf-8");
%>
<!DOCTYPE html>
<html>
    <head>
        <title>流程表单</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <!--标准mui.css-->
        <link rel="stylesheet" href="css/mui.min.css">
        <link rel="stylesheet" href="mycss/about.css">
        <!--App自定义的css-->
        <link rel="stylesheet" type="text/css" href="css/app.css" />
        <link href="css/mui.picker.css" rel="stylesheet" />
		<link href="css/mui.poppicker.css" rel="stylesheet" />
        <style type="text/css">
            .title {
                font-weight: 400;
                width: 6em;
                color: #8f8f94;
            }
            
            .titlevalue {
                text-align: left;
                padding-left:5px;
            }
            
            .titlevalue-right {
                text-align: right;
                 padding-left:5px;
            }
            
            #list td {
                padding: 5px 5px;
            }
            
            #list tr:active {
                background-color: rgba(0, 0, 0, .25);
            }
            
            #topPopover {
                position: fixed;
                top: 16px;
                right: 6px;
            }
            
            h5.mui-content-padded {
				margin-left: 3px;
				margin-top: 20px !important;
			}
			h5.mui-content-padded:first-child {
				margin-top: 12px !important;
			}
			
            .mui-btn {
				font-size: 16px;
				padding: 8px;
				margin: 3px;
			}
			
            .ui-alert {
				text-align: center;
				padding: 20px 10px;
				font-size: 16px;
			}

			  body{

				margin: 0;

				font-size: 14px;

				line-height: 100%;

				font-family: Arial, sans-serif;

				}

				.background {

				display: block;

				width: 100%;

				height: 100%;

				opacity: 0.4;

				filter: alpha(opacity=40);

				background-color:#000;

				position: absolute;

				top: 0;

				left: 0;

				z-index: 2000;

				}

				.progressBar {

				border: solid 2px #86A5AD;

				background: white url(progressBar_m.gif) no-repeat 10px 10px;

				}

				.progressBar {

				display: block;

				width: 200px;

				height: 50px;

				position: fixed;

				top: 60%;

				left: 40%;

				margin-left: -74px;

				margin-top: -14px;

				padding: 10px 10px 10px 50px;

				text-align: left;

				line-height: 27px;

				font-weight: bold;
				
				font-size: 12px;

				position: absolute;

				z-index: 2001;

				}

        </style>
    </head>

    <body  style="">
	    <input type="hidden" name="dealUsersIds" id="dealUsersIds"/>
		<input type="hidden" name="dealUsersNames" id="dealUsersNames"/>
		<input type="hidden" id="backSkip" name="backSkip" value="false"/>
		<input type="hidden" id="backToWpId" name="backToWpId" value=""/>
		<input type="hidden" id="backToTaskId" name="backToTaskId" value=""/>
		<input type="hidden" id="wiId" name="wiId" value=""/>
		<input type="hidden" id="opCode" name="opCode" value=""/>
		<input type="hidden" id="opName" name="opName" value=""/>
        <!-- <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">流程表单</h1>
        </header> -->
        <div class="mui-content">
            <h4 class="mui-content-padded">业务信息</h4>
            <div style="background-color: #fff;padding-bottom: 5px;">
                <div class="mui-content-padded">
                    <h4 style="text-align: center;padding-top: 10px;"></h4>
                    <table id="ywxx" border="1" width="100%" style="padding: 5px 5px;text-align: center;table-layout:fixed;">
                    </table>
                </div>
            </div>
            <ul class="mui-table-view mui-table-view-chevron">
                  <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right" href="#" id="ywxxfjsl">附件</a>
                      <ul class="mui-table-view mui-table-view-chevron" id="ywxxfjlist">
                      </ul>
                  </li>
              </ul>
            <h4 class="mui-content-padded">审批流程</h4>
            <div class="spcontent">
                <ul class="event_list" id="splc">
                </ul>
            </div>
				<div id="background" class="background" style="display: none;"></div> 
				<div id="progressBar1" class="progressBar" style="display: none; ">正在加载中，请稍等...</div>
				<div id="progressBar2" class="progressBar" style="display: none; ">正在处理，请稍等...</div> 
            <div id="spcz" calss="mui-content">
                <h4 class="mui-content-padded">审批操作</h4>
                <div class="mui-card">
                    <form id="clfs" class="mui-input-group" style="font-size: 18px;">
                    </form>
                </div>
                <div class="mui-content-padded" id="selectReturnNode" style="display: none;">
                	<button type="button" id="showUserPicker" class="mui-btn mui-btn-success mui-icon mui-icon-plus mui-btn-block">选择驳回节点</button>
				    <div>
						<label style="padding-left: 5px;">驳回节点：</label>
						<label id="userResult"></label>
				    </div>
				     <h5 class="mui-content-padded">是否重新审批</h5>
					<div class="mui-card">
						<div class="mui-input-row mui-radio mui-left">
							<label>是</label>
							<input name="radio1" type="radio" value="yes" onclick="chooseRepeatApprove(this)">
						</div>
						<div class="mui-input-row mui-radio mui-left">
							<label>否</label>
							<input name="radio1" type="radio" value="no" onclick="chooseRepeatApprove(this)" checked>
						</div>
					</div> <!---->
                </div>
                <a id="selectUserAnchor" name="selectUserAnchor"></a>
                <div class="mui-content-padded" id="selectUserDiv" style="display: none;">
                	<button type="button" id="selectUserButtonId" class="mui-btn mui-btn-success mui-icon mui-icon-plus mui-btn-block">选择操作人</button>
                </div>
                <div class="mui-content-padded" id="dealIdea">
                    <textarea id="userNote" rows="2" placeholder="处理意见"></textarea>
                </div>
                <div class="mui-content-padded">
                    <button id="submit" type="button" class="mui-btn mui-btn-primary mui-btn-block" onclick="doSubmit();">提交</button>
                </div>
            </div>
        </div>
    </body>
    <%--<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>--%>
    <script src="js/template.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/mui.min.js"></script>
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/mui.picker.js"></script>
	<script type="text/javascript" src="js/mui.poppicker.js"></script>

    <script>
        var showUserPickerButton;
        var userResult;
        var wpId = 0;
        //taskId 新增
        var taskId =0;
        var userPicker;
        var backSkip = "false";
        var rebackUrl=document.referrer;
		var  rebackGoUrl=document.referrer;
		//alert(rebackGoUrl);
        var userId;
        var path;
        var wiid;
        var from = "0";
        var isMuti=0;
        var back="${param.back}";
        //从selectUser回来的页面
        var isMutiBack="${param.isMuti}";
        var selectUser=JSON.parse(decodeURIComponent('${param.selectUser}'||'{}'));
        //alert("回来的isMutiBack----"+isMutiBack);
      //alert(JSON.stringify(selectUser));
       if(back){
        	rebackUrl=back;
        }
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
            var params = curWwwPath.split("?");
            if (params.length > 1) {
                wiid = "${param.wiid}";
				if(wiid){
					wiid=wiid.replace("teid_", "");
				    wiid=wiid.replace("teId_", "");
					wiid=wiid.replace("task_", "");
				    wiid=wiid.replace("wi_", "");
				}
				
                userId = "${param.userId}";
                from = "${param.from}";
                backType="${param.backType}";
                if (from != "0" && from != "1") {
                    $("#spcz").hide();
                }
                getInfo(wiid);
            }
			//renderCheckStatus();
			//给被选择人的按钮加上删除事件
			$("#selectUserDiv").delegate("button.selectUserButton","click",function(){
				var $this=$(this);
				var name=$this.attr("data-name");
				for(var i=0;i<selectUser.length;++i){
					if(selectUser[i].name==name){
						selectUser.splice(i,1);
					}
				}
				//renderCheckStatus();
				$this.remove();
			});
        });
        
        //选择用户之后 将页面回到从前
        function renderCheckStatus(){
            //判读是否从选择页面过来
  
            	//从选择用户过来
            	if(back){
            		//alert("isMutiBack"+isMutiBack);
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
        //清楚协办转办状态和按钮
        function clearCheckStatus(){
        	selectUser=new Array();
        	$("#selectUserDiv").find("button.selectUserButton").remove();
        	$("#dealUsersNames").val("");
			$("#dealUsersIds").val("");
        }
        //点击打开页面 wiid=4459&userId=shenpi22&from=0
		e("selectUserButtonId").addEventListener('tap',function(){
	         rebackGoUrl=rebackUrl;
	         //alert("111"+rebackGoUrl);
			if(!rebackUrl){
				
				if(backType==0){
					rebackUrl=path +"/weixin/todo_ds.html";	
				}else if(backType==1){
					rebackUrl=path +"/weixin/todo_dy.html";	
				}else if(backType==2){
					rebackUrl=path +"/weixin/todo_yb.html";	
				}else if(backType==3){
					rebackUrl=path +"/weixin/todo_fq.html";	
				}
			}
			
			    // alert("isMuti--"+isMuti);
			window.location.href=path+"/weixin/selectUser.jsp?wiid="+wiid+"&userId="+userId+"&from="+from+"&isMuti="+isMuti+"&rebackUrl="+encodeURIComponent(rebackUrl)+"&rebackGoUrl="+rebackGoUrl;
    	});
        
		 
        //本页面所有的ajax都加载完成显示页面
		$(document).ajaxStop(function(){
			 $("body").show();
			 if(back){
			 	$("html,body").scrollTop($("#selectUserAnchor").offset().top);
			 }
		});
		
        function getInfo(wiid) {
     
            $.ajax({
                  type: "GET",
                  url: path +"/todo_detail?wiid=" + wiid + "&modulecode=PT&t="+Math.random(),
                  dataType: "json",
	                //在发送请求之前调用
	  	            beforeSend: function(){
	  	            	ajaxLoading.show();
	  	            },
	  	            //请求完成后回调函数 (请求成功或失败之后均调用)。
	  	            complete: function(){
	  	            	ajaxLoading.hide();
	  	            },
                  success:function(msg){
                      var str;
                      // 业务信息
                      var data;
                      if (msg.toDoFiEntity != null && msg.toDoFiEntity.dataList != null) {
                          data = msg.toDoFiEntity.dataList;
                          $("#ywxx").empty();
                          for (var i = 0; i < data.length; i++) {
                        	  str = "<tr><td   class=\"title\" style=\"padding: 5px; WORD-WRAP: break-word \">" + data[i].name + "</td><td class=\"titlevalue\" style=\"padding: 5px;padding-left: 10px;\">" + data[i].value + "</td></tr>";
                              $("#ywxx").append(str);
                          }
                      }
                      // 业务附件
                      if (msg.toDoFiEntity != null && msg.toDoFiEntity.uploadEntityList != null) {
                          data = msg.toDoFiEntity.uploadEntityList;
                          $("#ywxxfjsl").empty().append("附件("+ data.length +")");
                          $("#ywxxfjlist").empty();
                          for (var i = 0; i < data.length; i++) {
                              str = "<li class=\"mui-table-view-cell\"><a class=\"mui-navigate-right\" onclick=\"downLoad(this,'"+ data[i].uploadId +"')\">"+data[i].filename +"</a></li>";
                              $("#ywxxfjlist").append(str);
                          }
                      }
                      
                      // 审批流程
                      if (msg.toDoWorkEntities != null) {
                          $("#splc").empty();
                          data = msg.toDoWorkEntities;
                          var flag = "";
                          for (var i = 0; i < data.length; i++) {
                              if (data[i].status == '2') {// 已办
                                  flag = "pass";
                              } else if (data[i].status == '1') {// 待办
                                  flag = "current";
                              } else if (data[i].status == '0') {// 未办
                                  flag = "waiting";
                              }
                              str = "<li class='dian_"+ flag+ "'a><p class='jiao_"+ flag +"'><span class='"+ flag+"'>";
                              str += "["+ data[i].wiName + "]";
                              
                              if(data[i].personName){
                            	  str+=data[i].personName;
                              }
                              /**
                              if(data[i].opRole){
                            	  str +=  "(" + data[i].opRole +")";
                              }
                              **/
                              if (data[i].opName != null) {
                                  str += "[" + data[i].opName + "]";
                              }
                              if (data[i].userNote != null) {
                            	  str += "<br/>" + data[i].userNote;
                              }
                              if (data[i].completeTime != null) {
                                  str += "<br/>" + data[i].completeTime;
                              }
                              str += "</span></p></li>";
                           //   console.log(str);
                              $("#splc").append(str);
                          }
                      }
                      // 处理方式
                      // TG：通过  WYY：无异议（不需要填写意见） HF：回复  XB：协办  JS：接受  BJS：不接受  GTFQR：沟通  BH：驳回  ZB：转办 CH:收回
                      //消息操作类型 DB(1待办) YB(2已办) YD(3已读) WD(4未读) RM(5删除)
                      if(msg.opType.toUpperCase() != "DB" && msg.opType.toUpperCase() != "WD"){
                    	  $("#spcz").hide();
                      }
                      if (msg.toDoButtonEntities != null) {
                          $("#clfs").empty();
                          $("#clfs").append("\n");
                          data = msg.toDoButtonEntities;
                          if(data!=null&&data.length>0){
                          for (var i = 0; i < data.length; i++) {
                        	
                              str="";
                              if ("|BH|HF|TG|GTFQR|ZB|WYY|JS|BJS|GTFQR|XB|".indexOf("|"+data[i].code+"|")>-1) {
                                  str = "<div class=\"mui-input-row mui-radio mui-left\">";
                                  str += "<label>"+data[i].name+"</lable>";
                                  str += "<input type=\"radio\" name=\"cz\" opname=\""+ data[i].name + "\"  code=\""+ data[i].code + "\" value=\""+ data[i].code + "_"+ data[i].name +"\" onclick=\"czClick(this)\"/>";
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
                          $("#spcz").hide();
                      }
                      
                      // 隐藏字段赋值
                      if (msg.toDoWorkEntity != null) {
                          $("#wiId").val(msg.toDoWorkEntity.wiId);
                          $("#backToWpId").val(msg.backToWpId);
                          $("#backToTaskId").val(msg.backToTaskId);
                      }
                      renderCheckStatus();
                     //驳回节点
                      if(msg.todoWpBeans != null){
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
                      }
                  }
                });
        }
        
        function downLoad(obj, fileId,moduleCode) {
        	var url = path +"/weixin/downloadFile?fileId="+fileId+"&fileName="+obj.text;
        	if(moduleCode){
        		url += "&moduleCode="+moduleCode;
        	}
        	$.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                beforeSend: function(){
                    ajaxLoading.show();
                },
                //请求完成后回调函数 (请求成功或失败之后均调用)。
                complete: function(){
                
                    ajaxLoading.hide();
                },
                success:function(msg){
                	console.log("download msg: " + JSON.stringify(msg));
                	if((""+msg.convertAttachmentUri).indexOf("http://")==-1){
                		obj.href = path + msg.convertAttachmentUri;
                	}else{
                		obj.href = msg.convertAttachmentUri;	
                	}
                	console.log("obj.href: " + obj.href);
//                	obj.onclick = function(){};
//                	window.open(obj.href);
//                    wx.previewImage({
//                        current: obj.href, // 当前显示图片的http链接
//                        urls: [obj.href] // 需要预览的图片http链接列表
//                    });
//                    mui.openWindow({url:obj.href,show:{autoShow:true,
//                        aniShow:'slide-in-right',
//                        duration:400},wating:{autoShow:false,title:"正在加载..."}});
//
//                    window.open();
//                    window.location = obj.href;

                    window.open(obj.href);

                    setTimeout(function() {
                        window.location = obj.href;
                    },1000);

//                    var aa=window.open();
//                    setTimeout(function(){
//                        aa.location="http://www.jb51.net";
//                    }, 100);
//                        var newTab=window.open('about:blank');
//                        $.ajax({
//                            success:function(data){
//                                if(data){
//                                    //window.open('http://www.jb51.net');
//                                    newTab.location.href="http://www.jb51.net";
//                                }
//                            }
//                        })
                

                }
        	});
        }
        
         // 点击操作选项事件
        function czClick(obj) {
        	var $this=$(obj);
        	var code=$this.attr("code");
        	var opname=$this.attr("opname");
            $("#opCode").val(code);
            $("#opName").val(opname);
            $("#userNote").val(opname);
            //将用户名选择隐藏
            $("#selectUserDiv").hide();
            $("#selectReturnNode").hide();
            if(code=="BH"){
              //驳回 
              $("#selectReturnNode").show();
         	 $("#dealIdea").show();
            }else if(code=="XB"){
              //协办
              	 $("#dealIdea").show();
              $("#selectUserDiv").show();
              isMuti=1;
              clearCheckStatus();
            }else if(code=="ZB"){
            	 $("#dealIdea").show();
              //转办
              $("#selectUserDiv").show();
              isMuti=0;
              clearCheckStatus();
            }else if(code=="WYY"){
             //其他
            	$("#dealIdea").show();
            }else{
            	
            	  $("#dealIdea").show();
            }
        }
         
        // 选择是否重新审批
         function chooseRepeatApprove(obj) {
        	var $this = $(obj);
        	var value = $this.attr("value");
            if(value == "yes"){
              backSkip = "true";
            }else if(value == "no"){
            	backSkip = "false";
            }
        } /**/
        
        function doSubmit(){
        	if(!$("#clfs").find(":radio:checked").length){
        		alert("请选择一种审批操作！");
        		return;
        	}
	        var jsonParams={
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
	        };
	        
	        var url = path +"/todo_commit?json="+JSON.stringify(jsonParams);
	        //console.log(JSON.stringify(jsonParams));
	        //验证转办协办人不能为空
	        if("ZB|XB".indexOf(jsonParams.opCode)>-1){
	        	if(!$("#selectUserDiv").find("button.selectUserButton").length){
	        		alert("请选择转办/协办人！");
	        		return;
	        	}
	        }
	        //验证驳回节点不能为空
	        if("BH".indexOf(jsonParams.opCode)>-1){
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
	            //提交数据的类型 POST GET
	            type:"post",
	            //提交的网址
	            url:url,
				timeout:60000,
	            //提交的数据
	            // data:{"backSkip":"true","backToWpId":0,"opCode":"TG","opName":"同意","userName":"shenpi11","userNote":"通过","wiId":4223},
	            //返回数据的格式
	            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
	            //在发送请求之前调用
	            beforeSend: function(){
	              // Handle the beforeSend event
	              ajaxSubmit.show();
	            },
	            //请求完成后回调函数 (请求成功或失败之后均调用)。
	            complete: function(){
	              // Handle the complete event
	              ajaxSubmit.hide();
	            },
	            //成功返回之后调用的函数             
	            success: function(data){
					//ajaxSubmit.hide();
	                if (data.resultCode == '2') {
	                    alert("提交失败");
	                }else {
	                    alert("提交成功");
	                    
	                    //返回上一页并刷新页面 如果是OA的待办，提交成功之后调到已处理(提交成功从审批页面返回到待审页面)
	                    if('${param.which}'.toUpperCase()=='OA'&&'${param.from}'=='0'){
	                    	//var url=window.location.href;
	                   		//url=url.replace("from=0","from=2");
	                    	//window.location.href=url;
							     	WeixinJSBridge.call('closeWindow');
	                    	//var url=window.location.href;
	                    	//var urls = 	url.split('shenpi');
	                    	//var u1 = urls[0]+'todo.jsp';
	                    	//window.location.href = u1+"?menu=ds";
	                    }else{
	                    	//var rebackUrl="";
						//	window.location.href = rebackUrl;
	                    //	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	                    		//WeixinJSBridge.call('closeWindow');
	                    		var url=window.location.href;
                    	var urls = 	url.split('shenpi');
                    	var u1 = urls[0]+'todo_ds.html';
                    	window.location.href = u1+"?"+userId;
	                    }
	                }   
	            } 
	         });
    	}
    </script>
    <script type="text/html" id="buttonTemplate">
    	<button type="button" class="mui-btn mui-btn-success mui-btn-outlined selectUserButton" data-name="{{name}}" data-value="{{value}}">{{name}}	
			<span class="mui-icon mui-icon-trash"></span>
		</button>
	</script>

</html>