;(function ($,window,document) {

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
	//大本版号
	var bigVersion;
	//小版本号
	var minorVersion;
	//业务对象编码
	var businessObjectCode;
	//版本关联id
	var relationId;
	var from;
	var versionStatus;//最新版本文档状态
	/**
	 * 初始化数据操作
	 */
	/**
	 */
	$(document).ready(function () {

		try {

			//编辑的新闻ID
			contentRowTypeId = $.xljUtils.getUrlParam('id');

			validateDataAuth(contentRowTypeId);

			computeIframe();

			if(!contentRowTypeId){
				contentRowTypeId = $.xljUtils.getUrlParam('businessId');
			}

			 from = $.xljUtils.getUrlParam('from');
			$('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
			$('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv btn-hide' id='newBtn'>新版本</button>");
			$('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv btn-hide' id='favoriteBtn'>收藏</button>");
			if(from&&(from=='preview'||from=='version'||from=='index')){
				if(from=='index'||from=='version'){
					//获取文档当前版本信息
					if(getCurrentVersion()){
						$('#newBtn').show();
						$('#favoriteBtn').show();
					};
				}
				//预览页没有按钮新版本收藏
			}else{
				//获取文档当前版本信息
				if(getCurrentVersion()){
					$('#newBtn').show();
					$('#favoriteBtn').show();
				};
			}



			//计算点击量
			addHitNum();
			//绑定按钮事件
			bindButton();

			//回显附件
			initFile();
			//创建contentRowType的form表单并回显属性
			echoContentRowTypeView(contentRowTypeId);

			//checkBox选中事件
			$("input[type='checkbox']").change(function () {
				if ($("input[type='checkbox']").is(':checked')) {
					$('.history').show();
				} else {
					$('.history').hide();
				}
			});
			//加载相关文档列表
			referPageInit();
			//初始化收藏夹
			initFavoriteTree();
		}catch (e) {

		}

	});
	//计算点击量
  function addHitNum() {
  	try{
	   from = $.xljUtils.getUrlParam('from');
		if(from&&from=='portal'){
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: hostUrl + "oa/content/contentRowType/hit/" + contentRowTypeId+"?time="+Math.random(),
				dataType: "json",
				success: function (contentObj) {
				}
			});
		}

	}catch (e){

	}

  }
	//计算表格宽度
	function resizeGrid(w){
		$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth(w, true);
		$.xljUtils.gridResizeFn();
	}
	//grid 自适应宽度
	$(window).resize(function(){
		if(parseInt($(window).width())>1100){
			resizeGrid(($(window).width()*0.916*0.75)-160);
		}else{
			resizeGrid(600);
		}
	});
	/**
	 * 初始化页面
	 */
	//不用计算高度  出滚动条就行  miying ---add
	function computeIframe() {
		//$('.content').css({overflow: 'hidden'});
		//$('.content').height($(window).height() - $('.xj-form-header').height());
		//美化滚动条
		//addNiceScroll();
		//resizeGrid();
	}

	/**
	 * 页面滚动条
	 */
	function addNiceScroll() {
		$(".content").niceScroll({
			autohidemode: false,
			cursorcolor: "#eee",
			cursorwidth: "6px", // 滚动条的宽度，单位：便素
			cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
			horizrailenabled: true, // nicescroll可以管理水平滚动
			background: "#fff"

		});
	}
	/**
	 * 绑定按钮事件
	 */
	function bindButton() {

		//收藏按钮点击事件
		$('#favoriteBtn').on('click',function () {
			$('#favoriteModal').modal('show');
		});

		//保存收藏事件
		$('#saveFavoriteBtn').on('click',function () {
			$('#favoriteForm').attr('action',hostUrl+'oa/favorite/save');
			var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
				$("#favoriteId").val(contentRowTypeId);
				$("#favoriteCode").val(contentRowTypeId);
				$('#favoriteForm').submit();
		});

		//保存收藏夹按钮事件
		$('#saveParentFavoriteBtn').on('click',function () {
			$('#parentFavoriteForm').attr('action',hostUrl+'oa/favorite/save');
			var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
			$.ajax({
				type: 'get',
				url: url,
				async:false,
				success: function (data) {
					var guuid = data.result;
					$("#parentFavoriteId").val(guuid);
					$("#parentFavoriteCode").val(guuid);
				}
			});
			$('#parentFavoriteForm').submit();
		});

		$('#favoriteModal').on('shown.bs.modal',function () {
			var resourceLink = baseUrl+"content/contentRowType/contentRowType_doc_view.html?id="+contentRowTypeId;
			var favoriteName = $('#title').text();
			if($.trim(favoriteName)=='') {
				favoriteName = resourceLink;
			}
			$('#resourceLink').val(resourceLink);
			$('#favoriteName').val(favoriteName);
		});

		//创建文件夹
		$('#addParentFavorite').on('click',function () {
			// $('#parentFavoriteModal').modal('show');
			$('#parentFavoriteModal').show();
		});
		//新版本按钮
		$("#newBtn").click(function () {
			//获取文档当前版本信息
			getCurrentVersion();
			if(versionStatus!='PUBLISHED'){
				$.xljUtils.tip("blue","文档被锁定，请先处理未发布的版本！",5000);
				return;
			}
			versionConfirm("blue",function () {
				var version = $("input[name='version']:checked").val();
				var newId;
				$.ajax({
				 	type: 'get',
				 	url: baseUrl + "generator/getGuuid?time=" + Math.random(),
					async: false,
				 success: function (data) {
				     newId = data.result;
				 	}
				 });

				$.ajax({
					type: 'POST',
					url: baseUrl + 'oa/content/contentRowType/attachment/save',
					contentType: "application/json",
					dataType:'json',
					data:JSON.stringify({appId: '1',businessId: contentRowTypeId,categoryId: '1',newBusinessId:newId}),
					success: function (data) {
						window.open("contentRowType_doc_edit.html?ids=" + contentRowTypeId + "&oper=newVersion&contentTypeId=" + contentTypeId+"&process="+process+"&businessObjectCode="+businessObjectCode+"&version="+version+"&newId="+newId);
					}
				});
				// window.close();
			},true);
		});

		//关闭按钮
		$("#closeBtn").click(function () {
			//window.close();
			window.open('','_self','');
			window.close();
		});
	}

	/**
	 *
	 * 获取当前版本
     */
	function getCurrentVersion() {
		var isNewVersion = false;
		$.ajax({
			type: "get",
			url: hostUrl + "oa/content/contentRowType/get/current/version/" + contentRowTypeId+"?time="+Math.random(),
			dataType: "json",
			async:false,
			success: function (xhr) {
				if(xhr.success){
					var obj = xhr.result.obj;
					isNewVersion= xhr.result.isNewVersion;
					versionStatus = obj['status'];
					bigVersion = obj['bigVersion'];
					minorVersion = obj['minorVersion'];
					relationId = obj['relationId'];
				}else{
					switch (xhr.code) {
						case "50000":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50001":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue",xhr.msg);
							break;
						case "50003":
							$.xljUtils.tip("red",xhr.msg);
							break;

						default:
							$.xljUtils.tip("red","查询数据失败！");
							break;
					}
				}

			}
		});
    	return isNewVersion;
	}


	/**
	 * 版本选择框
	 */
	function versionConfirm(skinType, fn, failFn,yesText,callback) {
		var skinType = "blue";
		var minorText;
		var bigText;
		if(minorVersion<9){
			minorText =bigVersion+"."+(minorVersion+1);
			bigText = (bigVersion+1)+".0";
		}else{
			minorText = (bigVersion+1)+".0";
			bigText = (bigVersion+2)+".0";
		}


		var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
			'<span class="">请选择版本号</span> <div class="tipBody">' +
			'<p><input name="version" type="radio" value="'+bigText+'"><label>'+bigText+'</label><input name="version" type="radio" value="'+minorText+'" checked/><label>'+minorText+'</label></p> <div class="btn-footer"> ' +
			'<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
		easyDialog.open({
			container: {
				content: html,
				yesFn: fn,
				noFn: failFn
			},
			callback:callback
		});
		if(yesText) $("#easyDialogYesBtn").text(yesText);
		if(!failFn) $("#easyDialogNoBtn").remove();
		$(".easyDialog_footer").remove();
	}

	function validateDataAuth(contentRowTypeId) {
		$.ajax({
			type: "get",
			url: hostUrl + "oa/content/contentRowType/validateDataAuth/" + contentRowTypeId+"?time="+Math.random(),
			dataType: "json",
			async:false,
			success: function (xhr) {
				if(xhr.success){
					var contentRowTypeList = xhr.result;
					if(!contentRowTypeList){
						window.open(hostUrl + 'nopower.html','_self');
					}
				}else{
					switch (xhr.code) {
						case "50000":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50001":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue",xhr.msg);
							break;
						case "50003":
							$.xljUtils.tip("red",xhr.msg);
							break;

						default:
							$.xljUtils.tip("red","查询数据失败！");
							break;
					}
				}

			}
		});
	}

	/**
	 *  回显页面
     */
    function echoContentRowTypeView(contentRowTypeId){
		$.ajax({
			type: "get",
			url: hostUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
			dataType: "json",
			success: function (xhr) {
				if(xhr.success){
					var obj = xhr.result;
					$('#title').text(obj['title']);//主题
					$('#author').text("文件作者："+(obj['author']==null?"佚名":obj['author']) +" "+obj['createDate'] +" 阅读("+(obj['hitNum']==null?"0":obj['hitNum'])+")");
					$('#docDesc').text(obj['docDesc']?obj['docDesc']:'');//主题
					var doc = obj['docContent'];
					document.getElementById('docContent').innerHTML=doc;
					/*if((bigVersion == obj['bigVersion'])&&(minorVersion == obj['minorVersion'])){
						if(from&&(from=='version'||from=='index')){  // 版本列表穿透新版本可以显示的按钮
							$('#newBtn').show();
							$('#favoriteBtn').show();
						}
					}*/
					businessObjectCode = obj['businessObjectCode'];
					process = obj['approvalProcess'];
					contentTypeId = obj['contentTypeId'];
					contentChildId = obj['contentChildId'];
					$('#currentVersion').text(obj['bigVersion']+"."+obj['minorVersion']);
					relationId = obj['relationId'];
					//获取右侧同分类文档列表
					getSameList();
					//历史版本列表
					loadPage();
				}else{
					switch (xhr.code) {
						case "50000":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50001":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue",xhr.msg);
							break;
						case "50003":
							$.xljUtils.tip("red",xhr.msg);
							break;

						default:
							$.xljUtils.tip("red","查询数据失败！");
							break;
					}
				}

			}
		});
	}

	/**
	 * 获取同分类文档列表
     */
	function getSameList(){
		$.ajax({
			contentType: "application/json",
			type: "post",
			url: hostUrl + "oa/content/contentRowType/querySameList",
			dataType: "json",
			data:JSON.stringify({'contentTypeId':contentTypeId,'status':'PUBLISHED','contentChildId':contentChildId,'id':contentRowTypeId,'relationId':relationId}),
			success: function (contentObj) {
				var obj = contentObj.result;
				if(obj!=null&&obj.length>0){
					$('.toMore').show();
				}else{
					$('#sameFileList').append("<li><span>无相关记录</span></li>");
				}
				for(var i in obj){
					var data = obj[i];
					var li = $("<li><a href=javaScript:gotoDetail('"+data.id+"')>"+data.title+" "+(data.author==null?"佚名":data.author)+" "+data.createDate+"</a></li>")
					$('#sameFileList').append(li);
				}
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
				hideButtonsWithNoFile:true
			});
		}catch (e){

		}
	}
	//加载历史版本附件
	function initHistoryFile(id,businessId) {
		try{
			$('#'+id).xljAttachment({
				appId: '1',
				businessId: businessId,
				categoryId: '1',
				mode: 'view',
				singleUpload: false,
				hideButtonsWithNoFile:true
			});
		}catch (e){

		}
	}


	/**
	 *  初始化数据版本文件列表页面
	 */
	function loadPage(){
		var versionGrid = $("#versionGrid");
		versionGrid.jqGrid(
			{
				url : hostUrl+"oa/content/contentRowType/versionList",
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "post",
				datatype : "json",
				postData:{"delflag":false,'status':'PUBLISHED','sortFields':JSON.stringify({'bigVersion':'asc','minorVersion':'asc','createDate':'desc'}),'relationId':relationId},
				jsonReader : {
					root:"result",
					repeatitems: false
				},
				// colNames : [ 'id' ,'主题','创建人' , '版本', '创建时间' ],
				colModel : [
					{name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
					{name : 'contentTypeId',label : 'contentTypeId',editable:true,width : 60,sortable:false,hidden:true},
					{name : 'contentChildId',label : 'contentChildId',editable:true,width : 60,sortable:false,hidden:true},
					{name : 'title',label : '主题',editable:true,width : 60,sortable:false,align:'center'},
					{name : 'createPersonName',label : '创建人',editable:true,width : 60,sortable:false,align:'center'},
					{name : 'version',label : '版本',editable:true,width : 60,sortable:false,align:'center'},
					{name : 'createDate',label : '创建时间',editable:true,width : 60,sortable:false,align:'center'}
				],
				sortname : 'sort',//排序字段
				viewrecords : true,
				rownumbers: true,
				multiboxonly:true,
				rowNum : -1,//一页显示多少条
				rowTotal:-1,
				ondblClickRow: function(id){
					window.open("contentRowType_doc_view.html?id="+id+"&from=version");

				},
				gridComplete: function() {
					$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
					var w= $(".grid-container").width();
					versionGrid.jqGrid("setGridWidth", w-10, true);
					$.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
				},
				loadError: function() {
					$.xljUtils.addGridScroll();
				},
				loadComplete:function(xhr){
					if(!xhr.success){
						/*switch (xhr.code) {
							case "50000":
								$.xljUtils.tip("red",xhr.msg);
								break;
							case "50001":
								$.xljUtils.tip("red",xhr.msg);
								break;
							case "50002":
								$.xljUtils.tip("blue",xhr.msg);
								break;
							case "50003":
								$.xljUtils.tip("red",xhr.msg);
								break;

							default:
								$.xljUtils.tip("red","查询数据失败！");
								break;
						}*/
					}else{
						//success
						try{
							var historyArr  = xhr.result;
                            for(var i in historyArr){
								var data = historyArr[i];
								var tr = $("<tr><td><label>"+data.version+"</label></td><td><div id='"+data.id+"'></div></td></tr>");
								$('#historyTbody').append(tr);
								initHistoryFile(data.id,data.id);
							}
						}catch (e){

						}


					}
				}
			});
	}

	/**
	 * 加载相关文档列表列表
	 */
	function referPageInit(){
		$("#referGrid").jqGrid(
			{
				url : baseUrl+'oa/contentRowTypeAssociated/queryList',//创建完成之后请求数据的url
				datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
				mtype : "post",//向后台请求数据的ajax的类型。可选post,get
				ajaxGridOptions: { contentType: 'application/json' },
				postData:{"delflag":false,'sortFields':JSON.stringify({'createDate':'desc'}),'contentRowTypeId':contentRowTypeId},
				contentType : "application/json",
				autowidth:true,
				colNames : [ 'id','类型', '文档主题' ,'文档路径','文档类型' , '当前文档ID','关联引用文档ID'],
				colModel : [
					{name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
					{name : 'contentType',label : '类型',editable:true,width : 60,sortable:false,hidden:true},
					{name : 'title',label : '文档主题',editable:true,width : 120,sortable:false,align:'center'},
					{name : 'url',label : '文档路径',editable:true,width : 120,sortable:false,align:'center'},
					{name : 'type',label : '文档类型',editable:true,width : 120,sortable:false,align:'center',formatter: "select", editoptions:{value:"0:静态类型;1:引用文档"}},
					{name : 'contentRowTypeId',label : '当前文档ID',hidden:true,editable:true,width : 60,sortable:false,align:'center'},
					{name : 'referenceId',label : '关联引用文档ID',hidden:true,editable:true,width : 60,sortable:false,align:'center'}

				],
				// multiselect : true,
				multiboxonly:true,
				rownumbers:true,
				jsonReader : {
					root:'result',
					repeatitems : false
				},
				ondblClickRow:function(rowid){
					var rowData = $('#referGrid').jqGrid('getRowData', rowid); ;
					if(rowData.type=='0'){
						window.open(rowData.url);
					}else{
						if(rowData.contentType=='NEWS'){
							window.open("contentRowType_staticPage.html?id="+rowData.referenceId);
						}else{
							window.open("contentRowType_doc_view.html?id="+rowData.referenceId);
						}
					}

				},
				onCellSelect: function(){
				},
				onSelectRow: function () {
				},
				gridComplete: function () {
					$.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
				},
				rowNum:-1,
				loadError:function(xhr,status,error){
					//异常处理
					if(xhr.status==404){
						$.xljUtils.tip("red","请求url有误！");
						return;
					}
					if(xhr.status==405){
						$.xljUtils.tip("red","请求方法有误！");
						return;
					}
					$.xljUtils.tip("red","网络异常,请联系管理员！");


				},
				loadComplete:function(xhr){
					if(!xhr.success){
						switch (xhr.code) {
							case "50000":
								$.xljUtils.tip("red",xhr.msg);
								break;
							case "50001":
								$.xljUtils.tip("red",xhr.msg);
								break;
							case "50002":
								$.xljUtils.tip("blue",xhr.msg);
								break;
							case "50003":
								$.xljUtils.tip("red",xhr.msg);
								break;

							default:
								$.xljUtils.tip("red","查询数据失败！");
								break;
						}
					}else{
						//success
					}
				}
			});
	}

   window.gotoDetail = function (id) {
	   window.open("contentRowType_doc_view.html?id="+id);
   }
   window.gotoList = function () {
	   window.open(hostUrl+"content/contentRowType/contentRowType_list.html?contentType=2&newOpenWin=true&contentTypeId="+contentTypeId+"&contentChildId="+contentChildId);
   }
//============================
	//初始化收藏夹树
	function initFavoriteTree() {
		$.ajax({
			type: "POST",
			url: hostUrl + "oa/favorite/queryList",
			data: JSON.stringify({}),
			dataType: "json",
			contentType: 'application/json',
			success: function (typeNodes) {
				if(typeNodes.success) {
					var zNodes = typeNodes.result;
					if(!zNodes){
						return;
					}

					for (var j = 0; j < zNodes.length; j++) {
						var zNode = zNodes[j];

						if(zNode.isFavorite){
							var optObj = $('<option></option>');
							optObj.val(zNode.id);
							optObj.text(zNode.name);
							$('#favoriteParentId').append(optObj);

							optObj = $('<option></option>');
							optObj.val(zNode.id);
							optObj.text(zNode.name);
							$('#parentFavoriteParentId').append(optObj);
							zNode.isParent = true;
						}
					}
					var setting = {

						data:{
							simpleData:{
								enable:true,
								idKey:'id',
								pIdKey:'parentId',
								rootPId:null
							}
						},
						callback:{
							onExpand:function (event, treeId, treeNode) {
								$.xljUtils.treeResizeFn('favorite-tree');
							},
							onCollapse: function(){
								$.xljUtils.treeResizeFn('favorite-tree');
							},
							onClick:function (event, treeId, treeNode) {
								if(!treeNode.isFavorite){
									$('#xj-index-iframe').attr('src',treeNode.resourceLink);
									$('#favoriteContainer').hide();
								}
							},
							onRightClick:function (event,treeId,treeNode) {

							},
							beforeRemove:function (treeId,treeNode) {
								var id = treeNode.id;
								var flag = false;
								/*$.xljUtils.confirm('blue', '确定要删除吗？', function () {

								 },true);*/
								$.ajax({
									url: hostUrl + "oa/favorite/delete/" + id,
									type: 'DELETE',
									dataType: 'JSON',
									async:false,
									success: function (resultData) {
										if (resultData && resultData.success) {
											$.xljUtils.tip('green', "数据删除成功！");
											flag = true;
										} else {
											$.xljUtils.tip('red', "删除数据失败！");
										}
									}
								});
								return flag;
							},
							beforeRename:function (treeId,treeNode,newName) {
								var jsonData = {};
								jsonData.id = treeNode.id;
								jsonData.name = newName;
								var flag = false;
								$.ajax({
									url:hostUrl+'oa/favorite/update/'+treeNode.id,
									data:JSON.stringify(jsonData),
									type:'PUT',
									contentType:'application/json',
									dataType:'JSON',
									async:false,
									success:function (resultData ) {
										if(resultData) {
											var successFlag = resultData.success;
											var result = resultData.result;
											var msg = resultData.msg;
											if(successFlag) {
												$.xljUtils.tip('green', "重命名成功！");
												flag = true;
											}else{
												$.xljUtils.tip('red', "重命名失败！");
											}
										}

									},
									error:function (XMLHttpRequest, textStatus, errorThrown) {
										var status = XMLHttpRequest.status;
										$.xljUtils.getError(status);
									}
								});
								return flag;
							},
							onRemove:function (event, treeId, treeNode) {
								var pNode =  treeNode.getParentNode();
								pNode.isParent = true;
								$.fn.zTree.getZTreeObj(treeId).updateNode(pNode);
							}
						},
						edit:{
							enable:true,
							removeTitle:'删除',
							renameTitle:'重命名',
							shownRemoveBtn:true,
							shownRenameBtn:true
						}

					};
					zTreeObj = $.fn.zTree.init($("#favoriteTree"), setting, zNodes);
					var nodes = zTreeObj.getNodes();
					//默认展开第一个节点
					zTreeObj.expandNode(nodes[0], true, false, false,false);
					//zTreeObj.selectNode(nodes[0]);
					//zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
					setTimeout(function(){
						$.xljUtils.addTreeScroll('favorite-tree');
						$.xljUtils.treeResizeFn('favorite-tree');
					},300);
				}else{

				}
			}
		});
	}




//关闭收藏bain编辑弹出框
	window.closeFavoriteModal=function(isParent,resultData) {
		debugger;
		console.info(resultData);
		if (resultData.success) {
			var result = resultData.result;
			if (isParent) {
				$.xljUtils.tip('green', '文件夹创建成功');
				var optObj = $('<option></option>');
				optObj.val(result.id);
				optObj.text(result.name);
				$('#favoriteParentId').append(optObj);

				optObj = $('<option></option>');
				optObj.val(result.id);
				optObj.text(result.name);
				$('#parentFavoriteParentId').append(optObj);
				$('#parentFavoriteModal').modal('hide');
				result.isParent = true;

			} else {
				$.xljUtils.tip('green', '添加收藏成功');
				$('#favoriteModal').modal('hide');
				result.isParent = false;
			}

			var favoriteTree = $.fn.zTree.getZTreeObj('favoriteTree');
			var pNode = favoriteTree.getNodeByParam('id', result.parentId);
			favoriteTree.addNodes(pNode, result);
			favoriteTree.updateNode(result);

		} else {
			if (isParent) {
				$.xljUtils.tip('red', '文件夹创建失败');
			} else {
				$.xljUtils.tip('red', '添加收藏失败');
			}
		}

		$('#favoriteForm').reset();
		$('#parentFavoriteForm').reset();
	}
})(jQuery,window,document);



