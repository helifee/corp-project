/*
 * 来源不同，审批完跳转页面不同
 */
var up_url=document.referrer;//上个页面url
if(up_url && (up_url.indexOf("approve_list.html")>0 || up_url.indexOf("pdaModuleConfigMain.do")>0)){
	window.localStorage.setItem("source_url",up_url);
}

var showUserPickerButton;
var userResult;
//var wpId = 0;
//taskId 新增
var instanceId;
var taskId;
var msgOpType;
var currentTaskStatus;
var activitiId;
var userPicker;
var backSkip = "false";
var userId;
var path;
var wiid;
var from = "0";
var isMuti=0;
var mobibleParam;
var paramText = "";
var closeFlag=false;
//本页面的URL格式是approve_detail.html?param=XXXX&userArray={}&isback=NO
//至少会带过来三个参数
//msgId=1111&users=[]&isback=N&opCode=NA&tabIdx=1
$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if (r!=null ){
		return unescape(r[2]);
	}
	return null;
};
var url = decodeURI(location.href);
var urlText = url.split("?")[1];
var paramArray = urlText.split("&");
var msgId = $.getUrlParam("msgId");
var instanceId = $.getUrlParam("instanceId");
var businessId = $.getUrlParam("businessId");
var appCode = $.getUrlParam("appCode");

var isback = $.getUrlParam("isback");
var selectUser = new Array();
//选人界面过来的，获取已选人员
var temp = "selUsers_";
if(isback == "YES" || isback == "Y"){
	var localdata = window.localStorage;
	for(var i=0;i<localdata.length;i++ ){
		key = localdata.key(i);;
		if(key.indexOf(temp) >= 0){
			var user = {};
			value = localdata.getItem(key);
			user.value = key.replace(temp,"");//用户id
			user.name = value;//用户name
			selectUser.push(user);
		}
	}
}

var opCode = $.getUrlParam("opCode");
var tabIdx = $.getUrlParam("tabIdx");


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
				activitiId = item.value;
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
	
	//多租户时租户code
	var tendCode = $.getUrlParam("tendCode");
	if(tendCode){
		var key = "mobile_tendCode";
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key,tendCode);
	}else if(up_url && (up_url.indexOf("approve_list.html")>0) ){
		var key = "mobile_tendCode";
		window.localStorage.removeItem(key);
	}
	
	$("#divPassRead").hide();
	queryFormDataByMsgId();
	
	//renderCheckStatus();
	//给被选择人的按钮加上删除事件
	$("#selectUserDiv").delegate("button.selectUserButton","click",function(){
		var $this=$(this);
		var name=$this.attr("data-name");
		var value=$this.attr("data-value");
		for(var i=0;i<selectUser.length;++i){
			if(selectUser[i].value==value){
				selectUser.splice(i,1);
				window.localStorage.removeItem(temp + value);
			}
		}
		$this.remove();
	});
	
	var sessionSign = 0;
	//拦截所有ajax请求url，为请求加上session标识
    jQuery.ajaxSetup({
        beforeSend:function (xhr) {
        	var tendCode = $.getUrlParam("tendCode");
			if(tendCode){
				sessionSign = tendCode;
                var reg = /(\?_s=)|(&_s=)/g;
                var paramStart = this.url.indexOf('?');
                if(paramStart>=0){

                    if(!reg.test(this.url)){
                        this.url = this.url+'&_s='+sessionSign;
                    }
                }else{
                    if(!reg.test(this.url)){
                        this.url = this.url+'?_s='+sessionSign;
                    }
                }
            }

        }
    });
});

//选择用户之后 将页面回到从前
function renderCheckStatus(){
	//console.log("renderCheckStatus is called.. (判读是否从选择页面过来,,,, )isback="+isback);
	//判读是否从选择页面过来
	//从选择用户过来
	if(isback == "YES" || isback == "Y"){
		if(opCode == 'XB'){
			var $that=$("#clfs").find("input[code=XB]");
			$that.attr("checked",true);
			$("#opCode").val("XB");
			$("#opName").val("协办");
			isMuti=1;
		}else if(opCode == 'ZB'){
			var $that=$("#clfs").find("input[code=ZB]");
			$that.attr("checked",true);
			$("#opCode").val("ZB");
			$("#opName").val("转办");
			isMuti=0;
		}

		$("#selectUserDiv").show();
		//渲染按钮
		//console.log("selectUser",selectUser);
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
	selectUser = new Array();
	clearLocal(temp);
}

//转办，协办 选人
e("selectUserButtonId").addEventListener('tap',function(){
	//1协办(多选)，0转办(单选)
	var tempParamText = "?msgId=" + msgId + "&isback=NO&opCode=" + opCode + "&tabIdx=" + tabIdx + "&isMuti=" + isMuti;
	var urlText = "/mobile/approve/selectUser.html"+tempParamText;
	window.location.href = path + urlText
});


function changeInstanceOperateLogIntoHaveRead(){
	var paramData = {instanceId: instanceId};
	var fullUrl = path+"/flow/instanceOperateLog/changeToReadIntoHaveRead";
	$.ajax({ //发送更新的ajax请求
		type: "post",
		url: fullUrl,
		dataType: "json",
		async: true,
		data: JSON.stringify( paramData ),
		contentType: 'application/json;charset=utf-8', //设置请求头信息
		success: function (data) {
			//console.info("调用修改操作日志的状态待阅变为已阅的接口 已成功! instanceId="+instanceId);
		},
		error: function (data) {
			console.info("调用修改操作日志的状态待阅变为已阅的接口  失败！  instanceId="+instanceId);
		}
	});
}

function changeMsgStatusIntoYY(msgIdText){
	var paramData = {id: msgIdText, 'newStatus': 'YY', 'oldStatus': 'DY'};
	var fullUrl = path + "/flow/sysNoticeMsg/updateStatusOfNoticeMsg";
	$.ajax({ //发送更新的ajax请求
		type: "post", url: fullUrl,
		dataType: "json", async: true,
		data: JSON.stringify( paramData ),
		contentType: 'application/json;charset=utf-8', //设置请求头信息
		success: function (data) {
			//console.info("调用待阅变已阅的接口 已成功! msgIdText="+msgIdText);
		},
		error: function (data) {
			console.info("调用待阅变已阅的接口失败！msgIdText="+msgIdText);
		}
	});
}

//根据流程实例Id和任务Id查询可以打回的流程环节
function queryFlowActivities(){
	$.ajax({
		type: 'POST',
		url: '/platform-app/flow/instance/queryApproverDone',
		contentType: 'application/json; charset=utf-8',   dataType: 'json',
		data: JSON.stringify({instanceId: instanceId, taskId:taskId}),
		success: function(data) {
			//console.log("queryFlowActivities >> data.result="+JSON.stringify(data));
			if(data.success){
				var dataArray = new Array();////转换json的格式为{value : 5459,text : "发起"}
				$.each(data.result, function(index, item) {
					var obj = new Object();
					obj['value'] = item.id;
					obj['text'] = item.displayName;
					dataArray.push(obj);
				});
				userPicker.setData(dataArray);
			}
		}
	});
}
/**
 * 流程状态映射业务表单状态
 * @param istatus
 */
function toFromStatus(istatus){
	var statusVar;
	switch (istatus) {
		case "1":
			statusVar="审批中"
			break;
		case "2":
			statusVar="完成"
			break;
		case "3":
			statusVar="草稿"
			break;
		case "4":
			statusVar="草稿"
			break;
		case "7":
			statusVar="作废"
			break;
		case "9":
			statusVar="审批中"
			break;
		default:
			break;
	}
	return statusVar;
}

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

//判断是否是IE浏览器
function IEVersion(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if(isIE){
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion < 11)
        { return true;}
        else
        { return false}//IE版本过低
    }else{
        return false;//非IE
    }
}

//新闻
/**
 * 查询附件URL列表
 */
function news_flow(contentRowTypeId){
	$.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "0", function (okFlag, data) {
	    if (okFlag) {
	        if (data.result != null && data.result.length > 0) {
	            var webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
	            var obj={};
	            obj.FILENAME = webOfficeUrl.substring(webOfficeUrl.lastIndexOf('/')+1);
	            obj.GROUP = data.result[0].path;
	            obj.NAME = data.result[0].name;
	            obj.ISMINVERSION = IEVersion();
	            mui.ajax(path + "/iwebOffice/getHtmlPath" + "?time=" + Math.random(),{
	                data:JSON.stringify(obj),
	                dataType:'json',//服务器返回json格式数据
	                type:'POST',//HTTP请求类型
	                async:false,
	                timeout:10000,//超时时间设置为10秒；
	                headers:{'Content-Type':'application/json'},
	                success:function(data){
	                    //服务器返回响应，根据响应结果，分析是否登录成功；
	                    if(data&&data.success) {
	                    	//TODO
	                        $('#newsContent').load("../../"+data.msg,function () {
	                            var imgs = $('#newsContent').find('img');
	                            $.each(imgs,function (i,img) {
	                                var oldSrc = $(img).attr('src');
	                                $(img).attr('src',path + '/officeFiles/'+oldSrc);
	                            });

	                            $('#newsContent').find('p[style*="margin-right"]').css({margin:'auto'});
	                            $('#newsContent').find('p').each(function (i,item) {
	                               var styleStr = $(item).attr('style');
	                                $(item).css({'word-break':'break-all'});
	                                if(styleStr&&styleStr.indexOf('line-height:')==-1){
	                                    $(item).css({'line-height':'30pt'});
	                                }
	                            });

	                            var trs = $('#newsContent').find('table').find('tr');
	                            trs.each(function (i,item) {
	                               var tds = $(item).find('td');
	                                $.each(tds,function (i,tdObj) {
	                                    $(tdObj).removeAttr('width').css({'width':100/tds.length+'%'});
	                                })
	                            });
	                            $('#newsContent').find('table').css({'margin':'0 0 0 0'}).width($('#newsContent').width());

	                        });
	                    }else{
	                        mui.toast('新闻内容获取失败！',{ duration:'long', type:'div' });
	                    }
	                },
	                error:function(xhr,type,errorThrown){
	                    //异常处理；
	                    console.log(type);
	                }
	            });
	        }
	    }
	},false);
}


//获取详情
function queryFormDataByMsgId() {
	var paramData = {msgId: msgId,instanceId:instanceId,businessId:businessId,appCode:appCode};
	var sessionSign = 0;
	$.ajax({
		type: "POST",
		url: "/platform-app/mobile/approve/queryMobileApprove",
		data: JSON.stringify(paramData),
		contentType: 'application/json',
		dataType: "json",
		//在发送请求之前调用
		beforeSend: function () {
			var tendCode = getTextUrlParams(window.location.href)['tendCode'];
			if(tendCode){
				sessionSign = tendCode;
                var reg = /(\?_s=)|(&_s=)/g;
                var paramStart = this.url.indexOf('?');
                if(paramStart>=0){

                    if(!reg.test(this.url)){
                        this.url = this.url+'&_s='+sessionSign;
                    }
                }else{
                    if(!reg.test(this.url)){
                        this.url = this.url+'?_s='+sessionSign;
                    }
                }
            }
			ajaxLoading.show();
		},
		//请求完成后回调函数 (请求成功或失败之后均调用)。
		complete: function () {
			ajaxLoading.hide();
		},
		success: function (retData) {
			var dataDto = retData.result;
			var dataList = dataDto.dataList;
			var msgDelflag = dataDto.msgDelFlag;
			if(msgDelflag){
				alert("该消息已撤销");
				return;
			}
			instanceId = dataDto.instanceId;
			var businessObjectName = dataDto.businessObjectName;
			if(businessObjectName){
				document.title=businessObjectName; 
			}
			taskId = dataDto.taskId;
			currentTaskStatus = dataDto.currentTaskStatus;
			msgOpType = dataDto.opType;
			var upLoad_appId,upLoad_businessId,upLoad_categoryId;
			var str;
			var flowList = dataDto.flowList;// 业务附件列表
			//业务单据状态：根据流程 状态
			var istatus;
			if (flowList && flowList.length > 0) {
				istatus = flowList[0].instanceStatus;
				istatus = toFromStatus(istatus);
			}
			// 业务信息
			var data;
			if (dataDto && dataList) {
				$("#ywxx").empty();
				var bd = $("#ywxx").append("<table class='table_ywxx'></table>");
				var $table_ywxx = $(".table_ywxx");
				var  docContentValue;
				var is_document_flow=false;
				for (var i = 0; i < dataList.length; i++) {
					var nameText = dataList[i].name;
					var valueText = dataList[i].value;
					if(nameText == 'NEWS_FLOW' && valueText == 'true'){
						news_flow(dataList[i].businessId);
						continue;
					}
					if(nameText == 'DOCUMENT_FLOW' && valueText == 'true'){
						is_document_flow=true;
						continue;
					}
					if(nameText == 'docContent' ){
						docContentValue = valueText;
						continue;
					}
					if (valueText && valueText.length > 1) {
						try{
							valueText = decodeURIComponent(valueText.replace(/\+/g, " "));
						}catch(e){
						}
					}
					if (dataList[i].name == '单据状态') {
						valueText = istatus;
					}
					if(!valueText){
						valueText = "";
					}
//                	str = "<p><span>"+dataList[i].name+":&nbsp;</span>  <span>"+valueText+"</span></p>";
					str = "<tr><td class='txt-center'><span>" + dataList[i].name + "</span></td><td class='txt-r'><span>" + valueText + "</span></td></tr>";
					$table_ywxx.append(str);
				}
				if(is_document_flow && docContentValue){
					var $newsContent = $("#newsContent");
					$newsContent.append(docContentValue);
				}
			}
			var fileList = dataDto.fileList;// 业务附件列表
			if (dataDto && fileList) {
				$("#attachmentSum").empty().append(fileList.length);
				$("#attachmentList").empty();
				// try {
				//     $('#attachmentList').xljAttachment({
				//         appId: '9d6cba61c4b24a5699c339a49471a0e7',
				//         businessId: 'e4d63aae40d049f8869e0c2f205c72f6',
				//         categoryId: '9a6e29a5d38344789ef46747bb474622',
				//         mode: 'view',
				//         singleUpload: false,
				//     });
				// } catch (e) {
				//     console.warn('附件组件初始化失败');
				// }
				for (var i = 0; i < fileList.length; i++) {
					//str = "<li class=\"mui-table-view-cell\"><a class=\"mui-navigate-right\"" +
					//	" onclick=\"downLoad(this,'"+ fileList[i].url +"')\">"+fileList[i].fullName +"</a></li>";
					var fullName = fileList[i].fullName;
					var smallIcon = "default"
					if (fullName.indexOf("pdf") >= 0) {
						smallIcon = "pdf";
					}
					if (fullName.indexOf("doc") >= 0) {
						smallIcon = "word";
					}
					if (fullName.indexOf("xls") >= 0) {
						smallIcon = "excel";
					}
					if (fullName.indexOf("rar") >= 0 || fullName.indexOf("zip") >= 0) {
						smallIcon = "rarzip";
					}
					if (fullName.indexOf("ppt") >= 0) {
						smallIcon = "ppt";
					}
					if (fullName.indexOf("txt") >= 0) {
						smallIcon = "txt";
					}

					if (fullName.indexOf("bmp") >= 0 || fullName.indexOf("tif") >= 0
						|| fullName.indexOf("jpg") >= 0 || fullName.indexOf("png") >= 0) {
						smallIcon = "picture";
					}
					str = "<li onclick=\"downLoad(this,'" + fileList[i].type + "','" + fileList[i].name + "','" + fileList[i].path + "','" + fileList[i].url + "')\"><img src=\"../myimg/attach_suffix/" + smallIcon + "_s.png\"><span class=\"\">" + fullName + "</span></li>";
					$("#attachmentList").append(str);
				}
			} else {
				$("#attachmentSum").empty().append("0");
			}
			if (flowList) {//审批流程
				$("#splc").empty();
				var flag = "";

				var instanceStatus;
				for (var i = 0; i<flowList.length; i++) {
					var itemObj = flowList[i];
					var taskStatus = itemObj.taskStatus;
					instanceStatus = itemObj.instanceStatus;
					var postName = itemObj.postName;
					if(postName){
						var arr=postName.split("/");
						postName=arr[arr.length-1];
					}
					if(!postName){
						postName="";
					}
					if (taskStatus>='3') {// 1-未运行; 2-运行中; 3-已完成4-跳过5-流程撤回
						flag = "pass";
					} else if (taskStatus == '2') {// 待办
						flag = "current";
						if(itemObj.groupKey != null&&upLoad_categoryId == null) {
							upLoad_appId=itemObj.appId;//itemObj.appId
							upLoad_businessId=itemObj.instanceId;//itemObj.businessId
							upLoad_categoryId=itemObj.groupKey;
						}
					} else if (taskStatus == '1' || taskStatus==null || taskStatus=="null" ) {// 未办
						flag = "waiting";
					}
					/*<li class="dian_pass" a=""> <p class="jiao_pass mui-clearfix">
					 <span class="pass">张璐<br><label>[新环节1]</label></span>
					 <span class="info">请领导审批！请领导审批！<br>2017-06-09 15:14:16</span>
					 </p>
					 </li>*/
					var approverName = itemObj.approverName;
					if(!approverName || approverName=="null" ){
						approverName = "";
					}
					var acName = itemObj.acName;
					if(!acName || acName=="null" ){
						acName = "";
					}
					//console.log("taskStatus="+taskStatus+"acName="+acName+"; approverName="+approverName);
					var taskComments = itemObj.taskComments;
					if(!taskComments || taskComments=="null" ){
						taskComments = "";
					}
					var taskEndTime = itemObj.taskEndTime;
					if(!taskEndTime || taskEndTime=="null" ){
						taskEndTime = "";
					}
					if("结束"==acName || "end"==acName){
						if(instanceStatus && instanceStatus=='2'){
							//正常完成
							flag="pass";
							//传阅按钮
							$("#divPassRead").show();
						}
					}else{
						/*str = "<li class='dian_"+flag+"' a=''> <p class='jiao_"+flag+" mui-clearfix'>";
						 str += "<span  class='"+ flag + '_1' + "'></span>";
						 str +="<span class='"+ flag+"'>"+approverName+"<br><label>"+acName+"</label></span>"+
						 "<span class='info'>"+taskComments+"<br>"+taskEndTime+"</span></p></li>";*/

					}
					var flowLi = $("<li class='dian_"+flag+"' a=''>");
					var flowApproveDiv = $("<div class='list_detail_approve jiao_"+flag+" mui-clearfix'>");
					var flowAttImg = $("<span id='flAtt"+itemObj.groupKey+"' class='fujian_icon_common' style='display:"+ (flag !='pass'||acName=="end"||acName=="结束"? 'none': 'block') +"'></span>");
					flowAttImg.on("click",itemObj,function(e){
						itemObj = e.data;
						var categoryId = "";
						if(itemObj.taskStatus == '3') {
							if(itemObj.acType == '1'){
								categoryId = itemObj.instanceId;
							}else{
								if(itemObj.groupKey != null) {
									categoryId = itemObj.groupKey;
								}
							}
						}
						if(categoryId!=""){
							if($($("#"+e.target.id)[0].parentNode.parentNode).find("ul").length>0) return true;
							try {
								$("#"+e.target.id).xljAttachment({
									appId: itemObj.appId,//itemObj.appId
									businessId: itemObj.instanceId,//itemObj.businessId
									categoryId: categoryId,//itemObj.categoryId
									mode: 'view',
									isTable:'false',
									singleUpload: false,
								});
							} catch (e) {
								console.warn('附件组件初始化失败');
							}
						}else{
							flowAttImg="";
						}
					});
					// var flowDiv = $("<div class='mui-clearfix top_list_content'>").append(flowAttImg).append("<span  class='"+ flag + '_1' + "'></span>"+
					// 	"<span class='pass'>" +
					// 	"<span class='pass_name' style='display:"+ (approverName? 'block': 'none') +"'>"+approverName+"</span>" +
					// 	"<span class='pass_acname' style='display:"+ (acName? 'block': 'none') +"'>"+acName+"</span>" +
					// 	"</span>" +
					// 	"<span class='info'>" +
					// 	"<span class='info_s'>"+postName+"</span>" +
					// 	"<span class='info_s info_s_time' style='display:"+ (taskEndTime? 'block': 'none') +"'>"+taskEndTime+"</span>" +
					// 	"<span class='info_s info_s_txt'  style='display:"+ (taskComments? 'block': 'none') +"'>"+taskComments+"</span>" +
					// 	"</span>");
					var flowDiv = $("<div class='mui-clearfix top_list_content'>").append(flowAttImg)
						.append('<table class="table_detail_approve">'+
							'<tr>'+
							'<td class="td_w1 pass_name">'+ approverName +'</td>'+
							'<td class="td_w2 info_s">'+ postName +'</td>'+
							'</tr>'+
							'<tr>'+
							'<td class="td_w1 pass_acname"></td>'+
							'<td class="td_w2 info_s">'+ taskEndTime +'</td>'+
							'</tr>'+
							'<tr>'+
							'<td class="td_w1 pass_acname">'+acName +'</td>'+
							'<td class="td_w2 info_text">'+ taskComments +'</td>'+
							'</tr>'+
							'</table>');

					$("#splc").append(flowLi.append(flowApproveDiv.append(flowDiv)));
					flowAttImg.click();
				}
				fujianEvent();
			}
			// 处理方式
			// TG：通过  WYY：无异议（不需要填写意见） HF：回复  XB：协办  JS：接受  BJS：不接受  GTFQR：沟通  BH：驳回  ZB：转办 CH:收回
			//消息操作类型 DB(1待办) YB(2已办) YD(3已读) WD(4未读) RM(5删除)

			if(msgOpType=="DB" && currentTaskStatus=="2"){//DB是待办,
				$("#spcz").show();
				try {
					$('#attachmentUpload').xljAttachment({
						appId: upLoad_appId,//itemObj.appId
						businessId: upLoad_businessId,//itemObj.businessId
						categoryId: upLoad_categoryId,//itemObj.categoryId
						mode: 'add',
						singleUpload: false,
					});
				} catch (e) {
					console.warn('附件组件初始化失败');
				}
			}else{//其他的分别是 待阅-已办和我的发起
				$("#spcz").hide();
				if("DY" == msgOpType){//如果是待阅消息,需要去将消息的状态改为已阅, 流程操作日志的对应状态修改为已读
					changeMsgStatusIntoYY(msgId);
					changeInstanceOperateLogIntoHaveRead(instanceId);
				}
				return "";
			}

			if(msgOpType=="DB" && currentTaskStatus=="2"){//DB是待办,2-运行中
				var nextList = dataDto.nextList;
				if (nextList) {
					$("#clfs").empty();
					$("#clfs").append("\n");
					if(nextList && nextList.length>0){
						for (var i=0; i<nextList.length; i++) {
							var str="";
							if ("|BH|HF|TG|GTFQR|ZB|WYY|JS|BJS|GTFQR|XB|TY|DH|".indexOf("|"+nextList[i].operationCode+"|")>-1) {
								str = "<div class=\"mui-input-row mui-radio mui-left\"> <label>"+nextList[i].operationName+"</lable>";
								var checkedText = "";
								//if(nextList[i].operationCode == opCode){
								if(i==0){
									checkedText = "checked=\"checked\" ";
									$("#userNote").val(nextList[i].operationName);
								}
								str += "<input type=\"radio\" name=\"cz\""+checkedText+" opname=\""+ nextList[i].operationName
									+"\"  code=\""+ nextList[i].operationCode + "\" value=\""+ nextList[i].operationCode
									+ "_"+ nextList[i].operationName +"\" onclick=\"czClick(this)\"/> </div>";
								$("#clfs").append(str);
							}
						}
					}
				}
			}
			renderCheckStatus();
			if(taskId){
				queryFlowActivities();//根据流程实例Id和任务Id查询可以打回的流程环节
			}

		}
	});
}
function fujianEvent(){
	var $splc = $("#splc li");
	$splc.on("click",".fujian_icon_common",function(e){
		var target = $(e.delegateTarget),
			currentTargeet = $(e.currentTarget);
		currentTargeet.toggleClass("fujian_icon_sel");
		target.find(".attachment-box").toggle();
	});
}
function czClick(obj) {// 点击操作选项事件
	var $this=$(obj);
	var code=$this.attr("code");
	opCode = code;
	var opname=$this.attr("opname");
	$("#opCode").val(code);
	$("#opName").val(opname);
	$("#userNote").val(opname);
	$("#selectUserDiv").hide();//将用户名选择隐藏
	//$("#selectReturnNode").hide();
	$("#selectReturnNode").hide();
	if(code=="BH" || code=="DH"){//驳回--
		$("#selectReturnNode").show();
		$("#dealIdea").show();
	}else if(code=="XB"){//协办
		$("#dealIdea").show();
		$("#selectUserDiv").show();
		isMuti=1;
		clearCheckStatus();
	}else if(code=="ZB"){//转办
		$("#dealIdea").show();
		$("#selectUserDiv").show();
		isMuti=0;
		clearCheckStatus();
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
var disabledFlag = false;
function doSubmit(){
	//附件上传
	var def = new $.Deferred();
	$('#attachmentUpload').xljAttachmentSubmit(function (isSuccess, obj) {
		if (isSuccess) {
			if (obj.success === true) {
				//alert('提交成功');
			}
			def.resolve(true);
		} else {
			//alert(obj);
			def.resolve(false);
		}
	});
	var submitBtn = $("#submit");
	submitBtn.attr('disabled',true);
	submitBtn.attr("disabled","disabled");

	var checkRadioArray = $("#clfs").find(":radio:checked");
	//console.log(checkRadioArray);
	if(!$("#clfs").find(":radio:checked").length){
        disabledFlag = true;
		alert("请选择一种审批操作！");
		submitBtn.attr('disabled',false);
		submitBtn.removeAttr("disabled");
		return;
	}
	var selectRadioValue = $("input[type='radio']:checked").val();//$('input:radio[name="zc"]:checked').val();
	if(!$("#userNote").val()){
        disabledFlag = true;
		alert("请填写处理意见！");
		return;
	}
	//var operationType = $("#opCode").val();
	var selectedValues = selectRadioValue.split("_");
	var operationType = selectedValues[0];
	var operationName = selectedValues[1];
	var submitData = {instanceId: instanceId, taskId: taskId, msgId: msgId,
		operationType:operationType, operationName:operationName, userNote:$("#userNote").val()+"(来自：移动)"};
	//验证转办协办人不能为空
	if("ZB|XB".indexOf(operationType)>-1){
		if(!$("#selectUserDiv").find("button.selectUserButton").length){
            disabledFlag = true;
			alert("请选择转办/协办人！");
			submitBtn.attr('disabled',false);
			submitBtn.removeAttr("disabled");
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
	//验证驳回或打回节点不能为空
	if("BH"==operationType || "DH"==operationType ){
		if(!activitiId || activitiId=="" || activitiId=="null" || activitiId.length<10 ){
            disabledFlag = true;
			alert("请选择打回节点！");
			submitBtn.attr('disabled',false);
			submitBtn.removeAttr("disabled");
			return;
		}
		submitData.returnApprover = activitiId;
		submitData.returnApproverName = $("#userResult").text();
		submitData.approveRepeat = $("input[name='approveRepeat']:checked").val();
	}
	//console.log("submitData JSON= "+JSON.stringify(submitData));
	var reallyScrollHeight = (document.documentElement.clientHeight>document.documentElement.scrollHeight)?document.documentElement.clientHeight:document.documentElement.scrollHeight;
	$("#background").height(reallyScrollHeight);
	$("#progressBar2").css({"margin-top":reallyScrollHeight-$(window).height()});
	//ajaxSubmit.show();
	//console.log(JSON.stringify(submitData));
	var sessionSign = 0;
	$.ajax({
		type : "post",//提交数据的类型 POST GET
		url : path + "/flow/instance/approval",
		timeout : 60000,
		data: JSON.stringify(submitData), //提交的数据
		contentType: 'application/json',
		dataType: "json",//返回数据的格式
		beforeSend: function(){//在发送请求之前调用
			var tendCode = getTextUrlParams(window.location.href)['tendCode'];
			if(tendCode){
				sessionSign = tendCode;
                var reg = /(\?_s=)|(&_s=)/g;
                var paramStart = this.url.indexOf('?');
                if(paramStart>=0){

                    if(!reg.test(this.url)){
                        this.url = this.url+'&_s='+sessionSign;
                    }
                }else{
                    if(!reg.test(this.url)){
                        this.url = this.url+'?_s='+sessionSign;
                    }
                }
            }
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
				submitBtn.attr('disabled',false);
				submitBtn.removeAttr("disabled");
			}else if(!data.success){
				alert(data.msg);
			}else {
				 alert_close("提交成功");
			}
		}
	});
}
function downLoad(obj,type,name,path,url) {
	var officeType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx';
	var pngType = "image/jpg,image/jpeg,image/png,image/gif";
	if("url"==type){
		window.location.href=url;
	}else {
		var obj = {};
		obj.FILENAME = url.substring(url.lastIndexOf('/') + 1);
		obj.GROUP = path;
		obj.NAME = name;
		var extensionName = obj.FILENAME.substring(obj.FILENAME.lastIndexOf(".") + 1);
		if (officeType.indexOf(extensionName.toLowerCase()) > -1) {
			$.ajax({
				url: "/platform-app/univ/attachment/attachment/docConverter" + "?time=" + Math.random(),
				data: JSON.stringify(obj),
				type: "POST",
				contentType: 'application/json',
				dataType: 'JSON',
				async: false,
				success: function (resultData) {
					if (resultData) {
						var successFlag = resultData.success;
						if (successFlag) {
							var exName = resultData.msg.substring(resultData.msg.lastIndexOf(".") + 1);
							if ("html" == exName) {
								//window.location.href=$.xljUtils.serverAddr+resultData.msg;
								window.location.href = $.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + encodeURIComponent(name);
							} else {
								// window.location.href=$.xljUtils.serverAddr+"/pdf.html?path="+resultData.msg.replace(/\\/g,"/");
								window.location.href = $.xljUtils.serverAddr + "/pdf/viewer.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + encodeURIComponent(name);
							}
						} else {
							alert('获取静态页面失败！');
						}
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("服务异常,请联系管理员！");
				}
			});
		} else if (pngType.indexOf(extensionName.toLowerCase()) > -1) {
			$.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
				{filePath: path},
				function (ip) {
					if (ip) {
						// window.location.href=location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
						window.location.href = $.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + location.protocol + '//' + ip + ":" + $.xljUtils.fdfsStoragePort + "/" + path + "&fileName=" + encodeURIComponent(name);
					}
				}
			);
		} else {
			alert("该文件不支持预览,请在电脑上查看！")
			return;
		}
	}
}
//重写alert方法
function alert(text){
	$("#alertTitle").text(text);
	$("#alertName").show();
	$('body').css("overflow",'hidden');
}
function alert_close(text){
	$("#alertTitle").text(text);
	$("#alertName").show();
	$('body').css("overflow",'hidden');
	closeFlag = true;
}
function hideBtn(){
	$("#alertName").hide();
	$('body').css("overflow",'auto');
	if(disabledFlag){
        var submitBtn = $("#submit");
        submitBtn.attr('disabled',false);
	}
	if(closeFlag){
		var return_url=window.localStorage.getItem("source_url");
		if(!return_url){
			// window.close();//如果上个页面为空，关闭当前页，但是kk移动端此代码不管用
		}else{
			window.location.href = return_url;
		}
	}
}
//打开传阅页面
function openPassRead(){
	clearLocal(temp);
	var key = "mobile_instanceId";
	window.localStorage.removeItem(key);
	window.localStorage.setItem(key,instanceId);
	window.location.href = "spread_list.html";
}

//清除localStorage缓存
function clearLocal(localTemp){
	var localLength=window.localStorage.length;
	var name;
	var remove=[];
	for(var i=0; i<localLength; i++ ){
		name=window.localStorage.key(i);
		if(name && name.indexOf(localTemp)>=0){
			remove.push(name);
		}
	}
	for(var i=0; i<remove.length; i++ ){
		window.localStorage.removeItem(remove[i]);
	}
}
  