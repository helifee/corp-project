/**
 * Created by Administrator on 2018/1/9.
 */

(function(){
	var startPage = {
		baseUrl :'/',
		hostUrl : '/platform-app/',
		businessId : "",
		appId:"",
		customFormId: "",
		businessObjectCode:"",
		resultData:[],
		settitle:"",
		disabledFlag:false,
		_ajax : function(cb,dataP,url){
			var self = startPage;
			if(!dataP){
				dataP = '{}';
			}
			if(!url){
				url = self.hostUrl+"flow/start";
			}
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(dataP),
				success: function(resultData) {
					if (resultData && resultData.success) {
						console.log(resultData)
						cb && cb (resultData)
					}else {

					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {

				}
			});
		},
		bind_event : function(){
			//提示框样例
			var dialog_tip = this.dialog_tip = function (text){
				$(document).dialog({
					type : 'notice',
					infoText: text,
					autoClose: 2500,
					position: 'top'  // center: 居中; bottom: 底部
				});
			}
			$("#submit").on("click",function(){
				startPage.doSubmit();
			});
			//折叠展开
			$("body").delegate(".mui-navigate-right", "click", function(e){
				$(this).next().toggle();
				var classflag = $(this).attr("classflag");
				var css=function(t,s){
					s=document.createElement('style');
					s.innerText=t;
					document.body.appendChild(s);
				};
				var cont;
				if($(this).next().is(":hidden")){
					cont = '\\e581';
				} else{
					cont = '\\e580';
				}
				css(".mui-table-view-cell.mui-collapse>.mui-navigate-right."+classflag+":after{content:'"+cont+"'}");
			});

			//选择责任人
			$("body").delegate(".selectPerson", "click", function(e){
				var that = this;
				var acId = $(this).attr("dataId");
				var data = {userStatus: true, userPostSelector: "defultUserPostSelector"};
				var id = "";
				var url = startPage.hostUrl + 'sys/org/roleUser/selectUserPostTree?random=' + Date.now();
				var modal = $.selectModal({
					$input : $(that),
					selectionMethod: "multi",  //single  multi
					selectKey :{
						val:  "user",
						key : "type"
					},
					selectList : id,
					param : {
						url:url,
						type: "POST",
						param:data,
						contentType:'application/json'
					},
					showTypeName:'user',
					callback : function(data){
						if(data && data.length>0){
							console.log(data);
							startPage.renderSelectTd(data,that);
							startPage.selectPerson(data,that,acId);
						}
					}, close : function(){
						//modal.remove();
					}
				}).open();
			});
			//选择人员 确定
			$("body").delegate(".result-get", "click", function(e){

			});

		},
		 selectPerson:function(backData,ele,acId){
			$.each(startPage.resultData.acDtoList, function(i, ac) {
				if(acId == ac.id) {
					var posts = [];
					$.each(backData, function(index, item){
						var prefixName = item.prefixName;
						var postNameold = '';
							if(prefixName.lastIndexOf('/')>-1){
								prefixName = prefixName.substring(0,prefixName.lastIndexOf('/'));
							}
							if(prefixName.lastIndexOf('/')>-1){
								postNameold = prefixName.substring(prefixName.lastIndexOf('/')+1);
								prefixName = prefixName.substring(0,prefixName.lastIndexOf('/'));
							}
						var postId = item.postId;
						var postName = prefixName + '/' + postNameold;
						var person = [{id: item.id, name: item.name}];
						var post = {id: postId, name: postName};
						post.users = person;
						posts.push(post);
					});
					ac.posts = JSON.stringify(posts);
				}
			});
	},
	getCustomData:function(){
		var self = startPage;
		var dataP = {
			businessId:self.businessId,
			businessObjectCode: self.businessObjectCode,
			flCode: null,
			limit: -1,
			nd: Math.random(),
			page: 1,
			rows: -1,
			sidx: "",
			sord: "asc",
			start: 0,
			_search: false
		};
		self._ajax(function(resultData){
			self.resultData = resultData.result;
			self.appId = resultData.result.appId;
			self.settitle = resultData.result.flowTitle;
			self.resultData.id = self.initUUID();
				var dataList = resultData.result.mobileFormDtoList;
				if (dataList) {
					$("#ywxx").empty();
					var bd = $("#ywxx").append("<table class='table_ywxx'></table>");
					var $table_ywxx = $(".table_ywxx");
					var  docContentValue;
					var is_document_flow=false;
					for (var i = 0; i < dataList.length; i++) {
						var nameText = dataList[i].name;
						var valueText = dataList[i].value;

						if (valueText && valueText.length > 1) {
							try{
								valueText = decodeURIComponent(valueText.replace(/\+/g, " "));
							}catch(e){
							}
						}

						if(!valueText){
							valueText = "";
						}
//                	str = "<p><span>"+dataList[i].name+":&nbsp;</span>  <span>"+valueText+"</span></p>";
						str = "<tr><td class='txt-center'><span>" + dataList[i].name + "</span></td><td class='txt-r'><span>" + valueText + "</span></td></tr>";
						$table_ywxx.append(str);
					}
					//if(is_document_flow && docContentValue){
					//	var $newsContent = $("#newsContent");
					//	$newsContent.append(docContentValue);
					//}
				}
			//附件
			var fileList = resultData.result.uploadAttachmentDtoList;// 附件列表
			if (fileList) {
				$("#attachmentSum").empty().append(fileList.length);
				$("#attachmentList").empty();
				for (var i = 0; i < fileList.length; i++) {
					//str = "<li class=\"mui-table-view-cell\"><a class=\"mui-navigate-right\"" +
					//	" onclick=\"downLoad(this,'"+ fileList[i].url +"')\">"+fileList[i].fullName +"</a></li>";
					var fullName = fileList[i].filename;
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
			var flowList = resultData.result.approvalLists;
			//审批列表
			if (flowList) {
				//审批流程
				$("#splc").empty();
				var flag = "";
				var instanceStatus;
				for (var i = 0; i<flowList.length; i++) {
					var $btn = "";
					var itemObj = flowList[i];
					var taskStatus = itemObj.taskStatus;
					instanceStatus = itemObj.instanceStatus;
					var postName = itemObj.postName;
					var setApproverWhenStart = itemObj.setApproverWhenStart;
					var approverName = itemObj.approverName;
					if(!approverName || approverName=="null" ){
						approverName = "";
					}
					if (setApproverWhenStart && !postName) {
						postName = '';
						approverName = '手选责任人';
						$btn = $("<button>",{dataId:itemObj.acId,class:"selectPerson",style:"margin-left:1.6rem;",html:"选择"});
					} else if (!setApproverWhenStart && !postName) {
						postName = '无岗位';
						approverName = '无';
					}else if(postName){
						var arr=postName.split("/");
						postName=arr[arr.length-1];
					}
					if (itemObj.acType == '3') {
						postName = '';
						approverName = '';
					}
					if(!postName){
						postName="";
					}
					if (taskStatus == '1' || taskStatus==null || taskStatus=="null" ) {// 未办
						flag = "waiting";
					}

					var acName = itemObj.acName;
					if(!acName || acName=="null" ){
						acName = "";
					}
					var taskComments = itemObj.taskComments;
					taskComments = taskComments ? taskComments : '';

					//标识岗位或人员为空跳过策略
					var approverOrPostIsNull = false;
					//if (itemObj.acStatus == '3' && itemObj.acType != '3') {
					//	//完成行岗位为空处理
					//	if (!itemObj.postId||itemObj.postId == '') {
					//		taskComments = '岗位为空，系统自动跳过';
					//		approverOrPostIsNull = true;
					//	}
					//}
					//if (itemObj.postStatus == '3') {
					//	if (itemObj.approverId == '' || itemObj.approverId == null) {
					//		taskComments = '审批人为空，系统自动跳过';
					//		approverOrPostIsNull = true;
					//	}
					//}
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

					}
					var flowLi = $("<li class='dian_"+flag+"' a=''>");
					var flowApproveDiv = $("<div class='list_detail_approve jiao_"+flag+" mui-clearfix'>");
					var flowAttImg = $("<span id='flAtt"+itemObj.groupKey+"' class='fujian_icon_common' style='display:"+ (flag !='pass'||acName=="end"||acName=="结束"? 'none': 'block') +"'></span>");

					var flowDiv = $("<div class='mui-clearfix top_list_content'>").append(flowAttImg)
						.append('<table class="table_detail_approve">'+
							'<tr>'+
							'<td class="td_w1 pass_name">'+ approverName +'</td>'+
							'<td class="td_w2 info_s selectPersonTd">'+ postName +'</td>'+
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
					if($btn){
						$(flowDiv).find("table .info_text").append($btn);
						//责任人列表
						var acList = resultData.result.acDtoList;
						if( acList && acList.length>0){
							$(acList).each(function(i,n){
								if(n.id == itemObj.acId && !n.post){
									var data =  eval('(' +n.post+ ')');
									if(data)
									startPage.renderSelectTd(data,$btn);
								}
							})
						}
					}
					//flowAttImg.click();
				}
				self.fujianEvent();
				try {
					$('#attachmentUpload').xljAttachment({
						appId: startPage.appId,//itemObj.appId
						businessId: startPage.resultData.id,//itemObj.businessId
						categoryId: startPage.resultData.id,//itemObj.categoryId
						mode: 'add',
						singleUpload: false,
						customApp:true
					});
				} catch (e) {
					console.warn('附件组件初始化失败');
				}
			}
			},dataP);
		},
		renderSelectTd:function(data,btn){
			var $table = $(btn).parents("table");
			$table.find(".selectPersonTd").html("");
			for(var i = 0;i<data.length;i++){
				var postnamearr = data[i].prefixName.split("/");
				var postname = postnamearr[postnamearr.length-2];
				var $p_box = $("<p>",{class:"p_box",style:"width:auto;background:none;"});
				var $p_name = $("<span>",{class:"p_name",style:"margin-right:20px",html:data[i].name});
				var $p_mainPostName = $("<span>",{class:"p_mainPostName",html:postname});
				$p_box.append($p_name,$p_mainPostName);
				$table.find(".selectPersonTd").append($p_box);
			}
		},
		fujianEvent:function(){
			var $splc = $("#splc li");
			$splc.on("click",".fujian_icon_common",function(e){
				var target = $(e.delegateTarget),
					currentTargeet = $(e.currentTarget);
				currentTargeet.toggleClass("fujian_icon_sel");
				target.find(".attachment-box").toggle();
			});
		},
		 doSubmit:function() {
			 var self = startPage;
			 resultData = self.resultData;
			 //var resultData = {};
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
			 submitBtn.attr('disabled', true);
			 submitBtn.attr("disabled", "disabled");

			 if (!$("#userNote").val()) {
				 self.disabledFlag = true;
				 alert("请填写处理意见！");
				 submitBtn.attr('disabled',false);
				 submitBtn.removeAttr("disabled");
				 return;
			 }
			 if($(".selectPerson").parents("table").find(".selectPersonTd").html()==""){
				 self.disabledFlag = true;
				 alert("请选择责任人！");
				 submitBtn.attr('disabled',false);
				 submitBtn.removeAttr("disabled");
				 return;
			 }
			 resultData.name = self.settitle;
			 resultData.userNote = $("#userNote").val();
			 resultData.customFormId = self.customFormId;
			 self.transferData();
			 $.ajax({
				 type: "post",//提交数据的类型 POST GET
				 url: self.hostUrl + "flow/instance/saveAllInstanceData",
				 timeout: 60000,
				 data : JSON.stringify(resultData),
				 contentType: 'application/json',
				 dataType: "json",//返回数据的格式

				 complete: function () {//请求完成后回调函数 (请求成功或失败之后均调用)。

				 },
				 //成功返回之后调用的函数
				 success: function (data) {
					 if (data) {
						 console.log(data);
						 var successFlag = data.success;
						 if (successFlag) {
							 var instanceId = data.result.instanceId;
							 //startPage.dialog_tip("提交成功");

							 var oUrl= startPage.hostUrl + "mobile/approve/approve_detail.html"
								 + "?instanceId=" + instanceId
								 + "&businessId=" + startPage.businessId
								 + "&appId=" + startPage.appId
								 + "&appCode=''&time=" + new Date().getTime();
							 oUrl=encodeURI(oUrl);
							 window.location.href=oUrl;
						 } else {

						 }
					 }
				 }
			 });
		 },
		/**
		 * 转换数据格式
		 */
		 transferData:function(){
			//转换业务变量数据格式
			var data = resultData.variableDtoList;
			var paramArray = new Array();
			for (x in data){
				var item = {};
				item.name = x;
				item.val = data[x]+"";
				paramArray.push(item);
			};
			resultData.variableDtoList = paramArray;
			delete resultData.approvalLists;
			delete resultData.flowTitle;

			window.pcUrl = resultData.pcUrl;
			delete resultData.pcUrl;
	},
		/**
		 * 获取uuid
		 * @returns {*}
		 */
		initUUID:function () {
			var guuid;
			var url = this.hostUrl+'generator/getGuuid?time='+Math.random();
			$.ajax({
				type : 'get',
				async:false,
				url : url,
				success : function(data) {
					guuid = data.result;
				}
			});
			return guuid;
		},
		getUrlParam:function(name){
			var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
			var r = decodeURI(window.location.search).substr(1).match(reg);
			if (r!=null ){
				return unescape(r[2]);
			}
			return null;
		},
		/**
		 * 页面初始化
		 */
		pageInit:function(){
			this.businessId = this.getUrlParam("businessId");
			this.customFormId = this.getUrlParam("customFormId");

			this.businessObjectCode = this.getUrlParam("businessObjectCode");
			this.getCustomData();
			this.bind_event();
		}
	};
	startPage.pageInit();
	window["startPage"]= startPage;
})()