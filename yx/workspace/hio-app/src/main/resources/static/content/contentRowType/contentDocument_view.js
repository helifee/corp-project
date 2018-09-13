

	/**
	 * @author:luorongxin
	 */
	/**
	 * 全局变量
	 */
//目录ID
	var contentChildId;
//大类ID
	var contentTypeId;
//新闻id
	var contentRowTypeId;
// 是否发起流程
	var process = false;
	//在线编辑器
	var editor;
	//大本版号
	var bigVersion;
	//小版本号
	var minorVersion;
	//业务对象编码
	var businessObjectCode;
	/**
	 * 初始化数据操作
	 */
	/**
	 */
	$(document).ready(function () {

		try {
			contentRowTypeId = $.xljUtils.getUrlParam('businessId');
			//回显附件
			initFile();
			//创建contentRowType的form表单并回显属性
			echoContentRowTypeView(contentRowTypeId);
			//刷新父页面grid列表
			window.onunload = function () {
				if(window.parent.parent&&window.parent.parent.opener&&$.isFunction(window.parent.parent.opener.reloadGrid)){
					window.parent.parent.opener.reloadGrid();
					/*window.opener.setJqGridAddedRowId(jsonData.id);
					 window.opener.reloadGrid();*/
				}
			}

			resizeOfficeIframe();

		}catch (e) {

		}

	});


	/**
	 * 修改，回显数据
	 * @param contentRowTypeId  新闻id
	 */
	function echoContentRowType(contentRowTypeId) {
		$.ajax({
			type: "get",
			url: serviceUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
			dataType: "json",
			success: function (contentObj) {
				var obj = contentObj.result;
				editor.setData(obj['docContent']);//在线编辑器附值
				//动态填充内容,获取table中的text属性
				$("#docContentTbody :input[type='text']").each(function () {

					if (obj[this.name] != "" && obj[this.name] != undefined) {
						this.value = obj[this.name];
					} else {
						this.value = "";
					}
				});
				//动态填充内容,获取table中的input属性
				$("#docContentTbody :input[type='hidden']").each(function () {
					if (obj[this.name] != "" && obj[this.name] != undefined) {
						this.value = obj[this.name];
					}
				});
				//获取form中的textarea属性
				$("textarea").each(function () {
					if (obj[this.name] != "" && obj[this.name] != undefined) {
						this.value = obj[this.name];
					} else {
						this.value = "";
					}
				});
				//获取form中的checkbox属性
				$("checkbox").each(function () {
				});

				//获取form中的radio属性
				$("#docContentTbody :input[type='radio']").each(function () {
					if (obj[this.name] != "" && obj[this.name] != undefined) {
						$("input[name='"+this.name+"'][value='"+obj[this.name]+"']").attr("checked",true);
					}
				});

				//获取form中的select属性
				$("select").each(function () {

				});
			}
		});
	}

	/**
	 *  回显页面
	 */
	function echoContentRowTypeView(contentRowTypeId){
		$('body').css({'min-width':'100%'});
		$.ajax({
			type: "get",
			url: serviceUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
			dataType: "json",
			success: function (contentObj) {
				var obj = contentObj.result;
				$('#title').text(obj['title']);//主题
				$('#author').text("文件作者："+(obj['author']==null?"佚名":obj['author']) +" "+obj['createDate'] +" 阅读("+(obj['hitNum']==null?"0":obj['hitNum'])+")");
				$('#docDesc').text(obj['docDesc']);//主题
				var doc = obj['docContent'];
				document.getElementById('docContent').innerHTML=doc;
				bigVersion = obj['bigVersion'];
				minorVersion = obj['minorVersion'];
				businessObjectCode = obj['businessObjectCode'];
				process = obj['approvalProcess'];
				contentTypeId = obj['contentTypeId'];
				contentChildId = obj['contentChildId'];
				$('#currentVersion').text(bigVersion+"."+minorVersion);
				resizeOfficeIframe();
			}
		});
	}


	/**
	 * 初始化附件id
	 * appid:1是的代表知识管理类型
	 * categoryId:1是的代表知识管理类型
	 */
	function initFile() {
		try{
			$('#loadFile').xljAttachment({
				appId: '1',
				businessId: contentRowTypeId,
				categoryId: '1',
				mode: 'view',
				singleUpload: false,
				hideButtonsWithNoFile:true,
				loadFilesDone:function () {
					resizeOfficeIframe();
				}
			});
		}catch (e){

		}
	}
	function resizeOfficeIframe() {
		var b_iframe = document.getElementById("contentOffice");
		/*$($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
		 $($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});*/
		if(b_iframe){
			if(document.contentOffice && document.contentOffice.document.body){
				$($(document.contentOffice.document).find('p[style*="margin-right"]')).css({margin:'auto'});
				$($(document.contentOffice.document).find('span')).css({'word-wrap': 'break-word'});
				$(b_iframe).height(document.contentOffice.document.body.scrollHeight);

			}
		}

		if (window.parent&&window.parent.document.bizForm){
			var bizForm = window.parent.document.bizForm;
			$(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
		} else {
			// ff
			// var iframeBody = document.getElementById('bizForm').contentDocument.body;
			// b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
			var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
			iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight+20);
		}
	}



