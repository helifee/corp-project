/**
 * author:zhangfangzhi
 * date:20170322
 */
var customFormId = null; //表单模板ID
var rowData;
var rowDataBefore;
var sessionId = null;
var customCode = null; //表单模板编码
var formSearchSeniorJson = null;; //普通查询高级查询条件json
var formSearchJson = null;; //模糊查询条件json
var englishRootNames = ['American'];
var i18nDef = {};
initLangPackage();

$(function () {
	//获取表单ID
	var cols = [{
			name: 'id',
			label: 'id',
			hidden: true,
			align: "center"
		},
		{
			name: 'instanceId',
			label: 'instanceId',
			hidden: true,
			align: "center"
		},
		{
			name: 'status',
			label: i18nDef['zhuang_tai'],
			hidden: false,
			align: "center",
			formatter: statusFormatter,
			width: 60
		}
	];
	var id = $.xljUtils.getUrlParam('id');
	if (id) {
		customFormId = id;
		//查询表单获取选定显示列
		$.ajax({
			type: 'get',
			url: hostUrl + '/sys/base/customForm/get/' + id + '?time=' + Math.random(),
			success: function (data) {
				var customFormDto = data.result;
				if(customFormDto && customFormDto.userType=="2"){//管理员登录显示修改按钮
					$("#_modify").show();
				}else{
					$("#_modify").hide();
				}
				if (customFormDto && customFormDto.delflag == true) {
					pop_tip_open("blue", "模板已删除。");
					$(".xj-font").hide();
				} else if (customFormDto && customFormDto.formShowColumn != null && customFormDto.formShowColumn != "") {
					customCode = customFormDto.code;
					$("#custform_title").html(customFormDto.name);
					var formShowColumnJson; //显示列JSON
					try {
						formShowColumnJson = JSON.parse(customFormDto.formShowColumn);
						if (customFormDto.formSearchSeniorKey) {
							formSearchSeniorJson = JSON.parse(customFormDto.formSearchSeniorKey);
						}
						if (customFormDto.formSearchKey) {
							formSearchJson = JSON.parse(customFormDto.formSearchKey);
						}
						// 根节点名是否属于英文菜单, 将状态列隐藏
						// if (customFormDto.levelOneName && englishRootNames.indexOf(customFormDto.levelOneName) > -1) {
						// 	if (cols[2] && cols[2].name == 'status') {
						// 		cols[2].hidden = true;
						// 	} else {
						// 		cols.map(function (col, idx) {
						// 			if (col.name == 'status') {
						// 				col.hidden = true;
						// 			}
						// 		});
						// 	}
						// }
						//						formShowColumnJson = eval('(' + customFormDto.formShowColumn + ')');
					} catch (e) {
						pop_tip_open("red", "JSON解析失败。");
					}

					//显示列设置
					if (formShowColumnJson && formShowColumnJson.length > 0) {
						for (var i = 0; i < formShowColumnJson.length; i++) {
							var showColumn = formShowColumnJson[i];
							if (showColumn.name == null || showColumn.name == "") {
								showColumn.name = " ";
							}
							cols.push({
								label: showColumn.name,
								name: showColumn['id'],
								width: "100",
								formatter: operateFormatter
							});
						}
					}

					//页面加载完成之后执行
					pageInit(cols, id);

					//是否有高级查询
					var isHaveAdvance;
					//高级查询、普通查询处理
					if (formSearchSeniorJson && formSearchSeniorJson.length > 0) {
						var trHtml = $("<tr></tr>");
						var trOrdiHtml = $("<tr></tr>");
						var ordiCount = 0;
						var seniorCount = 0;
						var tdOrdiDefaultHtml = '<td class="seinor-txt"></td><td class="seinor-ele"></td>';
						var tdOrdiHiddenHtml = '<td class="seinor-txt"><input type="text" style="display: none"></td><td class="seinor-ele"></td>';
						var tdOrdiResetHtml = '<td class="seinor-txt"></td><td class="seinor-ele"><span><button class="btn btn-sm btn-search rm-pad pull-right" onclick="search()" title="查询/query"><i class="fa fa-search" aria-hidden="true"></i></button></td>';
						var isHaveButton = false;

						for (var i = 0; i < formSearchSeniorJson.length; i++) {
							var temp = formSearchSeniorJson[i];
							if (temp['searchMode'] == "2") {
								isHaveAdvance = true;
								break;
							}
						}
						for (var i = 0; i < formSearchSeniorJson.length; i++) {
							var searchData = formSearchSeniorJson[i];
							if (searchData['id'] == null || searchData['type'] == null) {
								continue;
							}
							if (searchData['searchMode'] == "1") { //普通查询
								ordiCount++;
								trOrdiHtml.append(toFormatSearch(searchData));
								if (ordiCount == 3 && !isHaveAdvance) { //普通查询第一行最后一列放高级查询按钮
									trOrdiHtml.append(tdOrdiResetHtml);
									toBindSearchEvent(trOrdiHtml); //按钮绑定事件
									// $(".ordinarySearch").append(trOrdiHtml);
									// trOrdiHtml=$("<tr></tr>");
									isHaveButton = true;
									ordiCount++;
								}


								if (ordiCount % 4 == 0) {
									$(".ordinarySearch").append(trOrdiHtml);
									trOrdiHtml = $("<tr></tr>");
								}
							} else if (searchData['searchMode'] == "2") { //高级查询
								seniorCount++;
								trHtml.append(toFormatSearch(searchData));
								if (seniorCount % 4 == 0) {
									$(".dynamicSearch").append(trHtml);
									trHtml = $("<tr></tr>");
								}
							}
						}

						//普通查询不足一行时补全td
						// if(!isHaveButton){
						// 	if(trOrdiHtml.find("td").length==0){
						// 	trOrdiHtml.append(tdOrdiDefaultHtml+tdOrdiDefaultHtml+tdOrdiDefaultHtml+tdOrdiResetHtml);
						// }else if(trOrdiHtml.find("td").length==2){
						// 	trOrdiHtml.append(tdOrdiDefaultHtml+tdOrdiDefaultHtml+tdOrdiResetHtml);
						// }else if(trOrdiHtml.find("td").length==4){
						// 	trOrdiHtml.append(tdOrdiDefaultHtml+tdOrdiResetHtml);
						// }else if(trOrdiHtml.find("td").length==6){
						// 	trOrdiHtml.append(tdOrdiResetHtml);
						// }
						// 	toBindSearchEvent(trOrdiHtml);//按钮绑定事件
						// }
						if (!isHaveButton) {
							if (trOrdiHtml.find("td").length == 2) {
								//当表单中只有一个查询条件时在ie下会回车事件会导致表单刷新出错，所以在只有一个条件时添加一个隐藏域
								var html = isHaveAdvance ? (tdOrdiHiddenHtml + tdOrdiDefaultHtml + tdOrdiDefaultHtml) : (tdOrdiDefaultHtml + tdOrdiDefaultHtml + tdOrdiResetHtml)
								trOrdiHtml.append(html);
							} else if (trOrdiHtml.find("td").length == 4) {
								var html = isHaveAdvance ? (tdOrdiDefaultHtml + tdOrdiDefaultHtml) : (tdOrdiDefaultHtml + tdOrdiResetHtml)
								trOrdiHtml.append(html);
							} else if (trOrdiHtml.find("td").length == 6) {
								var html = isHaveAdvance ? (tdOrdiDefaultHtml) : (tdOrdiResetHtml)
								trOrdiHtml.append(html);
							}
						}
						toBindSearchEvent(trOrdiHtml); //按钮绑定事件
						$(".ordinarySearch").append(trOrdiHtml);

						//高级查询
						var tdDefaultHtml = '<td class="seinor-txt"></td><td class="seinor-ele"></td>';
						var tdDefaultHiddenHtml = '<td class="seinor-txt"><input type="text" style="display: none"></td><td class="seinor-ele"></td>';
						// var tdResetHtml='<td class="seinor-txt"></td><td class="seinor-ele"><button class="btn btn-sm btn-adv reset-btn pull-right mr0 resetForm">重置</button></td>';
						// if(trHtml.find("td").length==0){
						// 	trHtml.append(tdDefaultHtml+tdDefaultHtml+tdDefaultHtml+tdResetHtml);
						// }else if(trHtml.find("td").length==2){
						// 	trHtml.append(tdDefaultHtml+tdDefaultHtml+tdResetHtml);
						// }else if(trHtml.find("td").length==4){
						// 	trHtml.append(tdDefaultHtml+tdResetHtml); 
						// }else if(trHtml.find("td").length==6){
						// 	trHtml.append(tdResetHtml);
						// }
						if (trHtml.find("td").length == 2) {
							//当表单中只有一个查询条件时在ie下会回车事件会导致表单刷新出错，所以在只有一个条件时添加一个隐藏域
							trHtml.append(tdDefaultHiddenHtml + tdDefaultHtml + tdDefaultHtml);
						} else if (trHtml.find("td").length == 4) {
							trHtml.append(tdDefaultHtml + tdDefaultHtml);
						} else if (trHtml.find("td").length == 6) {
							trHtml.append(tdDefaultHtml);
						}
						toBindSearchEvent(trHtml); //按钮绑定事件
						$(".dynamicSearch").append(trHtml);
						reBindEvent(); //全局事件绑定
					} else {
						$(".allFormBox").hide();
					}
					//查询条件放于表格上部作为表格标题
					var $ordinarySearchTitle = $(".ordinarySearchTitle");
					if (isHaveAdvance) { //有高级查询
						$ordinarySearchTitle.show();
						$ordinarySearchTitle.append('<div class="titleRightBox"><span class="fa fa-angle-down closeFormIcon"></span><button class="btn btn-sm btn-adv senior-btn mr0 pull-right" title="advanced query"><span>高级查询</span><i class="fa fa-angle-down" aria-hidden="true"></i></button><button class="btn btn-sm btn-adv reset-btn pull-right mr0 resetForm" title="reset/重置"></button><button title="query/查询" class="btn btn-sm btn-search rm-pad pull-right" onclick="search()"><i class="fa fa-search" aria-hidden="true"></i></button></div>');
					} else {
						$ordinarySearchTitle.hide();
					}

					//模糊查询处理
					if (formSearchJson && formSearchJson.length > 0) {
						var formTitleStr = "";
						for (var i = 0; i < formSearchJson.length; i++) {
							var searchData = formSearchJson[i];
							if (searchData['id'] == null || searchData['type'] == null) {
								continue;
							}
							if (formTitleStr != "") {
								formTitleStr += "、";
							}
							if (searchData['name']) {
								formTitleStr += searchData['name'];
							}
						}
						if (formTitleStr != "" && formTitleStr.length > 23) {
							$("#serarchName").attr("data-temp-placeholder", formTitleStr.substring(0, 23) + "...");
						} else {
							$("#serarchName").attr("data-temp-placeholder", formTitleStr);
						}
						$("#serarchName").inputPlaceholder();
					}

					//页面加载完毕后更改grid宽高
					$.xljUtils.resizeNestedGrid();
				} else {
					pop_tip_open("blue", "暂无设计。");
					$(".xj-font").hide();
				}
			}
		});
	}

	//获取SESSIONID
	$.ajax({
		type: 'get',
		url: baseUrl + '/sys/base/customForm/getSessionId' + '?time=' + Math.random(),
		success: function (data) {
			sessionId = data.result;
		}
	});

	//禁用所有按钮的默认行为
	$('.btn').click(function () {
		return false;
	});

	//    $('.btn-adv').click(function() {
	//        expandedSearch();
	//        $('#list2').jqGrid().setGridHeight(computeGridHeight());
	//    });

	//模糊查询按钮绑定回车键
	$(document).keydown(function (event) {
		if (event.keyCode == 13) {
			$("#searchKey").click();
		}
	});

	//所有ajax请求异常的统一处理函数，处理
	$(document).ajaxError(
		function (event, xhr, options, exc) {
			if (xhr.status == 'undefined') {
				return;
			}
			switch (xhr.status) {
				case 403:
					pop_tip_open("red", "系统拒绝。");
					break;
				case 404:
					pop_tip_open("red", "您访问的资源不存在。");
					break;
				case 500:
					pop_tip_open("red", "服务器异常。");
					break;
			}
		}
	);
});

function initLangPackage() {
	window.BROWSER_LANGUAGE = 'ZH';

	if (navigator.appName == 'Netscape') {
		language = navigator.language;
	} else {
		language = navigator.browserLanguage;
	}
	if (language.indexOf('en') > -1) {
		window.BROWSER_LANGUAGE = 'EN';

	} else if (language.indexOf('zh') > -1) {
		window.BROWSER_LANGUAGE = 'ZH';

	}

	i18nDef = {
		'zhuang_tai': '状态',
		'draft': '草稿',
		'pending': '审批中',
		'finish': '已完成'
	};

	if (window.BROWSER_LANGUAGE == 'EN') {
		i18nDef = {
			'zhuang_tai': 'status',
			'draft': 'draft',
			'pending': 'pending',
			'finish': 'finish'
		};
	}
}

/**
 * 动态查询条件初始化
 * return 返回两个td
 */
function toFormatSearch(searchData) {
	var type = searchData['type'];
	/*var beginHtml='<div class="form-group"><label>'+searchData['name']+'：</label>';
	var endHtml='</div>';*/
	//	var outerHtmlContent = $('<div class="form-group"><label>'+searchData['name']+'：</label></div>');

	var outerTitleHtmlContent = $('<td class="seinor-txt">' + searchData['name'] + '</td><td class="seinor-ele"></td>');
	var tagHtml = "";
	switch (type) {
		case "text":
			tagHtml = '<input id="' + searchData['id'] + '" type="text" class="form-control">';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('blur').on('blur', function () { //绑定查询
					toSearch();
				});
			}
			break;
		case "date":
			tagHtml = '<div class="input-group date dateEve" id="datetimepicker1">' +
				'<input id="' + searchData['id'] + '" type="text" class="form-control" readonly>' +
				'<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>' +
				'<span class="input-group-addon">' +
				'<span class="glyphicon glyphicon-calendar addLeft"></span></span></div>';
			tagHtml = $(tagHtml);
			tagHtml.find('.fa-times').unbind('click').on('click', function () { //清除内容
				$("#" + $(this).attr("hideBut")).val("");
			});
			break;
		case "select":
			tagHtml = '<select name="" id="' + searchData['id'] + '" class="form-control"><option value="">请选择</option>';
			var selectOptionVals = searchData['val'];
			if (selectOptionVals != null && selectOptionVals.length > 0) {
				for (var s = 0; s < selectOptionVals.length; s++) {
					var op = selectOptionVals[s];
					if (op['text'] != "" && op['text'] != null) {
						tagHtml += '<option value="' + op['text'] + '">' + op['text'] + '</option>';
					}
				}
			}
			tagHtml += '</select>';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('change').on('change', function () { //绑定查询
					toSearch();
				});
			}
			break;
		case "Status":
			tagHtml = '<select name="" id="' + searchData['id'] + '" class="form-control"><option value="">请选择</option>';
			tagHtml += '<option value="0">'+i18nDef['draft']+'</option>';
			tagHtml += '<option value="1">'+i18nDef['pending']+'</option>';
			tagHtml += '<option value="2">'+i18nDef['finish']+'</option>';
			tagHtml += '</select>';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('change').on('change', function () { //绑定查询
					toSearch();
				});
			}
			break;
		case "checkbox":
			tagHtml = '<div class="radio_group active">';
			var checkboxOptionVals = searchData['val'];
			if (checkboxOptionVals != null && checkboxOptionVals.length > 0) {
				for (var s = 0; s < checkboxOptionVals.length; s++) {
					var op = checkboxOptionVals[s];
					if (op['text'] != "" && op['text'] != null) {
						tagHtml += '<input value="' + op['text'] + '" type="checkbox" class="ver-middle"  name="' + searchData['id'] + '"><label>' + op['text'] + '</label>';
					}
				}
			}
			tagHtml += '</div>';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('change').on('change', function () { //绑定查询
					toSearch();
				});
			}
			break;
		case "radio":
			//			tagHtml='<div class="radio_group active">';
			//			var radioVals=searchData['val'];
			//			if(radioVals!=null && radioVals.length>0){
			//				for(var s=0;s<radioVals.length;s++){
			//					var op=radioVals[s];
			//					tagHtml+='<input value="'+op['text']+'" type="radio" class="ver-middle" autocomplete="off" name="'+searchData['id']+'"><label>'+op['text']+'</label>';
			//				}
			//			}
			//			tagHtml+='</div>';
			//			tagHtml = $(tagHtml);
			tagHtml = '<select name="" id="' + searchData['id'] + '" class="form-control"><option value="">请选择</option>';
			var selectOptionVals = searchData['val'];
			if (selectOptionVals != null && selectOptionVals.length > 0) {
				for (var s = 0; s < selectOptionVals.length; s++) {
					var op = selectOptionVals[s];
					if (op['text'] != "" && op['text'] != null) {
						tagHtml += '<option value="' + op['text'] + '">' + op['text'] + '</option>';
					}
				}
			}
			tagHtml += '</select>';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('change').on('change', function () { //绑定查询
					toSearch();
				});
			}
			break;
		case "CustomArchive":
			tagHtml = '<div class="input-group">';
			tagHtml += '<input type="text" id="' + searchData['id'] + '" class="form-control addInputWidth" readonly="true" placeholder="" data-placeholder="" data-required="true">';
			tagHtml += '<span class="input-group-addon w28">';
			tagHtml += '<a href="###;" hideBut="' + searchData['id'] + '" class="fa fa-times" aria-hidden="true"></a>';
			tagHtml += '</span>';
			tagHtml += '<span class="input-group-addon w28 selectBut ' + searchData['id'] + '">';
			tagHtml += '<a href="###;" class="fa fa-ellipsis-h" aria-hidden="true"></a>';
			tagHtml += '</span>';
			tagHtml += '</div>';
			tagHtml = $(tagHtml);
			tagHtml.find('.selectBut').xljSingleSelector({
				title: '自定义档案内容', //选择器标题，默认是'选择组织机构'
				selectorType: 'eeee', //选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
				treeUrl: hostUrl + '/sys/base/customArchives/getTree' + '?time=' + Math.random(), // 生成zTree树的请求url,不指定使用默认对应类型的url
				treeParam: {
					'mainId': searchData['val']
				}, //生成zTree树的请求参数，json对象
				targetId: 'parentId', //选择的数据的ID存储input域的id
				targetName: 'parentName', //选择的数据的Name存储input域
				saveCallback: function (selectData, ele) {
					if (selectData != null) {
						tagHtml.find('input').val(selectData.name);
						if (searchData['searchMode'] == "1") {
							toSearch();
						}
					}
				},
				formatTreeJson: formatZTreeData,
				treeSettings: {
					data: {
						simpleData: {
							enable: true
						}
					}
				}
			});
			tagHtml.find('.fa-times').unbind('click').on('click', function () { //清除内容
				$("#" + $(this).attr("hideBut")).val("");
				if (searchData['searchMode'] == "1") {
					toSearch();
				}
			});
			break;
		case "Organization":
		case "InnerCompany":
			tagHtml = '<div class="input-group">';
			tagHtml += '<input type="text" id="' + searchData['id'] + '" class="form-control addInputWidth" readonly="true" placeholder="" data-placeholder="" data-required="true">';
			tagHtml += '<span class="input-group-addon w28">';
			tagHtml += '<a href="###" hideBut="' + searchData['id'] + '" class="fa fa-times" aria-hidden="true"></a>';
			tagHtml += '</span>';
			tagHtml += '<span class="input-group-addon w28 selectBut ' + searchData['id'] + '">';
			tagHtml += '<a href="###" class="fa fa-ellipsis-h" aria-hidden="true"></a>';
			tagHtml += '</span>';
			tagHtml += '</div>';
			tagHtml = $(tagHtml);
			var orgFilter = searchData['orgFilter'];
			var tipMsg = getMsg(orgFilter);
			if (!orgFilter) {
				orgFilter = "all";
			}
			if (searchData['val'] == "2") { //多选
				tagHtml.find('.selectBut').xljMultipleSelector({
					treeUrl: hostUrl + '/sys/org/root/getOrgTreeByType' + '?time=' + Math.random(),
					treeParam: {
						'rootDelFlag': '0',
						'rootStatus': '1',
						'orgDelFlag': '0',
						'orgStatus': '1',
						'type': orgFilter
					},
					selectNodeType: {
						"type": orgFilter,
						"msg": tipMsg
					},
					saveCallback: function (selectData, ele) {
						var companyStr = "";
						if (selectData != null && selectData.length > 0) {
							for (var k = 0; k < selectData.length; k++) {
								if (companyStr != "") {
									companyStr += ",";
								}
								companyStr += selectData[k].name;
							}
							tagHtml.find('input').val(companyStr);
							if (searchData['searchMode'] == "1") {
								toSearch();
							}
						}
					}
				});
			} else { //单选
				tagHtml.find('.selectBut').xljSingleSelector({
					treeUrl: hostUrl + '/sys/org/root/getOrgTreeByType' + '?time=' + Math.random(),
					treeParam: {
						'rootDelFlag': '0',
						'rootStatus': '1',
						'orgDelFlag': '0',
						'orgStatus': '1',
						'type': orgFilter
					},
					selectNodeType: {
						"type": orgFilter,
						"msg": tipMsg
					},
					saveCallback: function (selectData, ele) {
						if (selectData != null) {
							tagHtml.find('input').val(selectData.name);
							if (searchData['searchMode'] == "1") {
								toSearch();
							}
						}
					}
				});
			}
			tagHtml.find('.fa-times').unbind('click').on('click', function () { //清除内容
				$("#" + $(this).attr("hideBut")).val("");
				if (searchData['searchMode'] == "1") {
					toSearch();
				}
			});
			break;
		case "InnerUsers":
			//			tagHtml='<div class="input-group">';
			//			tagHtml+='<input type="text" id="'+searchData['id']+'" class="form-control addInputWidth" readonly="true" placeholder="" data-placeholder="" data-required="true">';
			//			tagHtml+='<span class="input-group-addon w28">';
			//			tagHtml+='<a href="javascript:void(0);" hideBut="'+searchData['id']+'" class="fa fa-times" aria-hidden="true"></a>';
			//			tagHtml+='</span>';
			//			tagHtml+='<span class="input-group-addon w28 selectBut '+searchData['id']+'">';
			//			tagHtml+='<a href="javascript:void(0);" class="fa fa-ellipsis-h" aria-hidden="true"></a>';
			//			tagHtml+='</span>';
			//			tagHtml+='</div>';
			//			tagHtml = $(tagHtml);
			//			
			//			if(searchData['val']=="1"){//单选
			//				tagHtml.find('.selectBut').xljSingleSelector({
			//					selectorType:'person',
			//					saveCallback:function (selectData,ele) {
			//						if (selectData != null) {
			//							tagHtml.find('input').val(selectData.name);
			//							if(searchData['searchMode']=="1"){
			//								toSearch();
			//							}
			//						}
			//					}
			//				});
			//			}else if(searchData['val']=="2"){//多选
			//				tagHtml.find('.selectBut').xljMultipleSelector({
			//					selectorType:'person',
			//					saveCallback:function (selectData,ele) {
			//						var companyStr="";
			//						for(var k=0;k<selectData.length;k++){
			//							if(companyStr!=""){
			//								companyStr+=",";
			//							}
			//							companyStr+=selectData[k].name;
			//						}
			//						tagHtml.find('input').val(companyStr);
			//						if(searchData['searchMode']=="1"){
			//							toSearch();
			//						}
			//					}
			//				});
			//			}
			//			tagHtml.find('.fa-times').unbind('click').on('click',function () {//清除内容
			//				$("#"+$(this).attr("hideBut")).val("");
			//				if(searchData['searchMode']=="1"){
			//					toSearch();
			//				}
			//			});

			tagHtml = '<input id="' + searchData['id'] + '" type="text" class="form-control">';
			tagHtml = $(tagHtml);
			if (searchData['searchMode'] == "1") {
				tagHtml.unbind('blur').on('blur', function () { //绑定查询
					toSearch();
				});
			}
			break;
		default:
			;
	}

	$(outerTitleHtmlContent[1]).append(tagHtml);
	return outerTitleHtmlContent;
}

/**
 * 查询准备
 */
function toSearch() {
	clearSeniorSearch();
	search();
}

/**
 * 全局绑定事件
 */
function reBindEvent() {
	$("#custFormInstanceOrdi").find('.dateEve').datetimepicker({
		language: 'zh-CN', //语言
		format: 'yyyy-mm-dd', //显示格式
		minView: "month", //设置只显示到月份
		initialDate: new Date(), //初始化当前日期
		autoclose: true, //选中自动关闭
		todayBtn: true //显示今日按钮
	}).on('changeDate', function () {
		toSearch();
	});

	$("#custFormInstance").find('.dateEve').datetimepicker({
		language: 'zh-CN', //语言
		format: 'yyyy-mm-dd', //显示格式
		minView: "month", //设置只显示到月份
		initialDate: new Date(), //初始化当前日期
		autoclose: true, //选中自动关闭
		todayBtn: true //显示今日按钮
	})
}

/**
 * 查询
 */
function search(searchType) {
	var customFormInstanceDto = {};
	var searchSql = "";
	customFormInstanceDto.formSearchKey = null;
	customFormInstanceDto.formSearchSeniorValue = null;
	if (searchType == 1) { //模糊查询
		if (formSearchJson != null && formSearchJson.length > 0) {
			for (var i = 0; i < formSearchJson.length; i++) {
				var searchData = formSearchJson[i];
				var sVal = $.trim($("#serarchName").getInputVal());
				if (sVal) {
					searchSql += getSearchSql(searchData['id'], sVal, searchData['type']);
				}
			}
			if (searchSql) {
				searchSql = "and (" + searchSql.substring(2) + ")";
				customFormInstanceDto.formSearchKey = searchSql;
			}
		}
	} else { //普通查询、高级查询
		if (formSearchSeniorJson != null && formSearchSeniorJson.length > 0) {
			for (var i = 0; i < formSearchSeniorJson.length; i++) {
				var searchData = formSearchSeniorJson[i];
				var val = getConponentValue(searchData);
				if (val) {
					searchSql += getSearchSeniorSql(searchData['id'], val, searchData['type']);
				}
			}
			if (searchSql) {
				customFormInstanceDto.formSearchSeniorValue = searchSql;
			}
		}
	}
	$("#list2").jqGrid('setGridParam', {
		postData: customFormInstanceDto
	}).trigger('reloadGrid');
	return false;
}

/**
 * 校验
 */
function getConponentValue(searchData) {
	var type = searchData['type'];
	var returnVal = null;
	switch (type) {
		case "text":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "date":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "select":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "Status":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "checkbox":
			var checkboxStr = "";
			$(".searchTopDiv").find('input[name=' + searchData['id'] + ']:checked').each(function () {
				if (checkboxStr != "") {
					checkboxStr += ",";
				}
				checkboxStr += $(this).val();
			});
			returnVal = $.trim(checkboxStr);
			break;
		case "radio":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "CustomArchive":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "Organization":
		case "InnerCompany":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		case "InnerUsers":
			returnVal = $.trim($("#" + searchData['id']).val());
			break;
		default:
			;
	}
	return returnVal;
}

/**
 * 模糊查询方式拼接sql
 * text,checkbox,date,Organization,InnerCompany,InnerUsers:模糊查询
 * raido,select,CustomArchive:精确查询
 */
function getSearchSql(id, value, type) {
	var headStr = "or s.form_search_key like ";
	var delimiter = ":";
	var sql = "";
	if (type == "text" || type == "date") {
		sql = " '%" + id + delimiter + "%" + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	} else if (type == "checkbox" || type == "Organization" || type == "InnerCompany" || type == "InnerUsers") { //解决多选问题
		if (value.indexOf(",") != -1) {
			var arrStr = value.split(",");
			var finalStr = "";
			for (var s = 0; s < arrStr.length; s++) {
				finalStr += headStr;
				finalStr += " '%" + id + delimiter + "%" + arrStr[s] + "%" + delimiter + id + "%' ";
			}
			headStr = finalStr;
		} else {
			sql = " '%" + id + delimiter + "%" + value + "%" + delimiter + id + "%' ";
			headStr += sql;
		}
	} else {
		sql = " '%" + id + delimiter + "%" + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	}
	return headStr;
}

/**
 * 普通查询，高级查询拼接sql
 * text,checkbox,date,Organization,InnerCompany,InnerUsers:模糊查询
 * raido,select,CustomArchive:精确查询
 */
function getSearchSeniorSql(id, value, type) {
	var headStr = " and s.form_search_senior_value like ";
	var delimiter = ":";
	var sql = "";
	if (type == "text") {
		sql = " '%" + id + delimiter + "%" + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	} else if (type == "date") {
		sql = " '%" + id + delimiter + value + "%" + delimiter + id + "%' ";
		headStr += sql;
	} else if (type == "checkbox" || type == "Organization" || type == "InnerCompany" || type == "InnerUsers") { //解决多选问题
		if (value.indexOf(",") != -1) {
			var arrStr = value.split(",");
			var finalStr = "";
			for (var s = 0; s < arrStr.length; s++) {
				finalStr += headStr;
				finalStr += " '%" + id + delimiter + "%" + arrStr[s] + "%" + delimiter + id + "%' ";
			}
			headStr = finalStr;
		} else {
			sql = " '%" + id + delimiter + value + delimiter + id + "%' ";
			headStr += sql;
		}
	} else {
		sql = " '%" + id + delimiter + value + delimiter + id + "%' ";
		headStr += sql;
	}
	if (type == "Status") {
		if (value == "0") {
			headStr = " and s.status = '0' ";
		} else if (value == "1") {
			headStr = " and s.status = '1' ";
		} else if (value == "2") {
			headStr = " and s.status = '2' ";
		}
	}
	return headStr;
}

/**
 * list.html中Grid高度自适应，注：其他不同结构的页面请重新计算
 *
 */
function computeGridHeight() {
	return $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 83;
}

// 过滤特殊字符
function filterSpecStr(strSrc) {
	var filtered = strSrc.replace(/\t/g, '    ');
	filtered = filtered.replace(/\r|\n/g, '');
	return filtered;
}

/**
 * 动态表格展示
 * @param cellvalue  	当前cell的值
 * @param options		该cell的options设置，包括{rowId, colModel,pos,gid} 
 * @param rowObject		当前cell所在row的值，如{ id=1, name="name1", price=123.1, ...}
 * @returns
 */
function operateFormatter(cellvalue, options, rowObject) {
	var formShowColumnJsonVal;
	try {
		//		formShowColumnJsonVal = eval('(' + rowObject.formValueJson + ')');
		if (rowObject.formValueJson) {
			formShowColumnJsonVal = JSON.parse(filterSpecStr(rowObject.formValueJson));
		}
	} catch (e) {
		pop_tip_open("red", "表单值JSON解析失败。");
	}
	var valObj = formShowColumnJsonVal['' + options.colModel.name + ''];
	if (valObj && valObj.cmpValueShowName) {
		if (valObj.cmpValueShowName == null || valObj.cmpValueShowName == "null") {
			return "";
		} else {
			return valObj.cmpValueShowName;
		}
	} else {
		return "";
	}
}

/**
 * 状态格式化
 */
function statusFormatter(cellvalue, options, rowObject) {
	if (cellvalue == "0") {
		return i18nDef['draft'];
	} else if (cellvalue == "1") {
		return i18nDef['pending'];
	} else if (cellvalue == "2") {
		return i18nDef['finish'];
	}
	return "";
}

/**
 * 初始化表格
 */
function pageInit(cols, id) {
	$("#st").html("");
	$("#st").append("<div class='xj-main-grid grid-container'><table id='list2' constraint-layout='true'></table><div id='pager2'></div></div>");
	jQuery("#list2").jqGrid({
		url: hostUrl + '/sys/base/customFormInstance/page',
		ajaxGridOptions: {
			contentType: 'application/json'
		},
		mtype: "POST",
		contentType: "application/json",
		datatype: "json",
		postData: {
			"customFormId": id
		},
		multiboxonly: true,
		multiselect: true,
		autowidth: true,
		rownumbers: true,
		jsonReader: {
			repeatitems: false
		},
		colModel: cols,
		ondblClickRow: function (rowid) {
			var row = $("#list2").jqGrid('getRowData', rowid);
			if (row.status == i18nDef['draft']) {
				window.open("../customForm/dist/index.html?type=edit&id=" + row.id + "&customFormId=" + customFormId + "&session=" + sessionId + "&time=" + Math.random());
			} else {
				//    			window.open("customFormInstance_view.html?businessObjectCode="+customCode+"&businessId="+row.id+"&customFormId="+customFormId);
				window.open("/platform-app/flow/runtime/approve/flow.html?instanceId=" + row.instanceId + "&businessId=" + row.id);
				//    			pop_tip_open("blue","只能修改草稿状态的表单！");
			}

		},
		loadError: function (xhr, status, error) {

		},
		onCellSelect: function () {
			if (rowDataBefore != null && rowDataBefore != 'undefined') {
				$('#list2 ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
			}
		},
		onSelectRow: function () {
			var rowId = $('#list2').jqGrid("getGridParam", "selrow");
			rowData = $('#list2').jqGrid('getRowData', rowId);
		},
		gridComplete: function () {
			rowDataBefore = rowData;
			if (rowDataBefore != null && rowDataBefore != 'undefined') {
				$('#list2').setSelection(rowDataBefore.id, true);
				$('#list2 ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
			}
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
		},
		rowNum: 20, //一页显示多少条
		rowList: [20, 50, 100, 200], //可供用户选择一页显示多少条
		pager: '#pager2', //表格页脚的占位符(一般是div)的id
		sortname: 'id', //初始化的时候排序的字段
		sortorder: "desc",
		viewrecords: true
	}).navGrid('#pager2', {
		add: false,
		edit: false,
		del: false,
		search: false,
		refresh: false
	});
}

/**
 * 刷新表格
 */
function reloadList() {
	$('#list2').jqGrid().trigger("reloadGrid");
}

/**
 * 新增
 */
function toAdd() {
	$.ajax({
		type: 'get',
		url: baseUrl + '/generator/getGuuid' + '?time=' + Math.random(),
		success: function (data) {
			var guuid = data.result;
			window.open("../customForm/dist/index.html?type=add&id=" + guuid + "&customFormId=" + customFormId + "&session=" + sessionId + "&time=" + Math.random());
		}
	});
}

/**
 * 修改
 */
function toupdate() {
	var ids = $('#list2').jqGrid('getGridParam', 'selarrrow');
	if (ids && ids.length == 1) {
		var row = $('#list2').jqGrid('getRowData', ids[0]);
		if (row.status == 'draft' || row.status == '草稿') {
			window.open("../customForm/dist/index.html?type=edit&id=" + row.id + "&customFormId=" + customFormId + "&session=" + sessionId + "&time=" + Math.random());
		} else {
			pop_tip_open("blue", "只能修改草稿状态的表单！");
		}
	} else {
		pop_tip_open("blue", "请选择一行！");
	}
}

/**
 * 修订（管理员功能）
 */
function toModify() {
	var ids = $('#list2').jqGrid('getGridParam', 'selarrrow');
	if (ids && ids.length == 1) {
		var row = $('#list2').jqGrid('getRowData', ids[0]);
		window.open("../customForm/dist/index.html?type=modify&id=" + row.id + "&customFormId=" + customFormId + "&session=" + sessionId + "&time=" + Math.random());
	} else {
		pop_tip_open("blue", "请选择一行！");
	}
}

/**
 * 删除
 */
function toDelete() {
	var flag = true;
	var ids = $('#list2').jqGrid('getGridParam', 'selarrrow');
	if (!ids || ids.length == 0) {
		pop_tip_open("blue", "请选择要删除的行！");
		return;
	}
	var idsArray = new Array();
	for (var i = 0; i < ids.length; i++) {
		idsArray[i] = ids[i];
		var rowd = $('#list2').jqGrid('getRowData', ids[i]);
		if (rowd.status != 'draft' && rowd.status != '草稿') {
			flag = false;
			break;
		}
	}

	ids = ids.join(",");
	if (idsArray && idsArray.length > 0) {
		if (flag) {
			pop_text_open("blue", "确认删除" + idsArray.length + "条数据吗？", function () {
				$.ajax({
					url: hostUrl + "/sys/base/customFormInstance/deletePseudoBatch/" + ids,
					type: 'DELETE',
					dataType: 'JSON',
					success: function (resultData) {
						$.xljUtils.removeGridScroll();
						if (resultData && resultData.success) {
							for (var s = 0; s < idsArray.length; s++) {
								$("#list2").jqGrid('delRowData', idsArray[s], true);
							}
						} else {
							pop_tip_open("red", "删除数据失败！");
						}
					}
				});
			}, true);
		} else {
			pop_tip_open("blue", "只能删除草稿状态的表单！");
		}
	} else {
		pop_tip_open("blue", "请选择一行！");
	}
}

/**
 * 发起审批
 */
function toApproval() {
	var ids = $('#list2').jqGrid('getGridParam', 'selarrrow');
	if (ids && ids.length == 1) {
		var row = $('#list2').jqGrid('getRowData', ids[0]);
		if (row.status == i18nDef['draft']) {
			window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode=" + customCode + "&businessId=" + row.id + "&customFormId=" + customFormId + "&time=" + Math.random());
		} else {
			pop_tip_open("blue", "请选择草稿状态发起审批！");
		}
	} else {
		pop_tip_open("blue", "请选择一行！");
		return;
	}
}

/**
 * 查看审批记录
 */
function approvalRecord() {
	var ids = $('#list2').jqGrid('getGridParam', 'selarrrow');
	if (ids && ids.length == 1) {
		var row = $('#list2').jqGrid('getRowData', ids[0]);
		if (row.status != i18nDef['draft']) {
			window.open("/platform-app/flow/runtime/approve/flow.html?instanceId=" + row.instanceId + "&businessId=" + row.id);
		} else {
			pop_tip_open("blue", "还没有发起审批！");
		}
	} else {
		pop_tip_open("blue", "请选择一行！");
		return;
	}
}

/**
 * 绑定查询事件
 * @param trOrdiHtml
 */
function toBindSearchEvent(trOrdiHtml) {
	trOrdiHtml.find('.btn').click(function (e) {
		e.preventDefault();
	});
}
//高级查询
$(".ordinarySearchTitle").on("click", ".senior-btn", function () {
	var sp = $(this).find("span");
	var si = $(this).find("i");
	$(".senior-box").toggle();
	if (sp.text() == "高级查询") {
		sp.text("收起");
		sp.parent().attr("title", "retract");
		si.removeClass('fa-angle-down').addClass('fa-angle-up');
	} else {
		sp.text("高级查询");
		sp.parent().attr("title", "advanced query");
		si.removeClass('fa-angle-up').addClass('fa-angle-down');
	}
	$.xljUtils.resizeNestedGrid();
	return false;
});
//重置
$(".ordinarySearchTitle").on("click", ".resetForm", function () {
	$('#custFormInstance')[0].reset();
	$('#custFormInstanceOrdi')[0].reset();
	return false;
});
//关闭所有的查询条件
$(".ordinarySearchTitle").on("click", ".closeFormIcon", function () {
	var bd = $('.allFormBox');
	bd.toggle();
	var str;
	if (bd.is(":hidden")) {
		str = "fa-angle-up"
	} else {
		str = "fa-angle-down"
	}
	$(this).removeClass("fa-angle-up fa-angle-down").addClass(str);
	$.xljUtils.resizeNestedGrid();
	return false;
});
/**
 * 根据查询返回数据整理成zTree需要的JSON数据
 * @param arr
 * @returns
 */
function formatZTreeData(arr) {
	var zNodes = [];

	if (arr != null && arr.length > 0) {
		for (var i = 0; i < arr.length; i++) {
			var iconStyle = 'diy-group';
			if (arr[i].pId == '0') {
				iconStyle = "diy-group";
			} else {
				iconStyle = "diy-program";
			}
			zNodes.push({
				id: arr[i].id,
				pId: arr[i].pId,
				name: arr[i].name,
				iconSkin: iconStyle
			});
		}
	}
	return zNodes;
};

/**
 * 返回错误提示
 */
function getMsg(param) {
	if (param) {
		if (param == "company") {
			return "请选择公司！"
		} else if (param == "dept") {
			return "请选择部门！"
		} else if (param == "group") {
			return "请选择项目！"
		} else if (param == "branch") {
			return "请选择分期！"
		}
		return "";
	}
	return "";
}

/**
 * 重置
 */
function clearSeniorSearch() {
	$('#custFormInstance')[0].reset();
	$("#serarchName").val("");
}

/**
 * 流程回调
 */
function flowCallBack() {
	reloadList();
}

//测试
function test() {
	var id = '3c24a84994e844b7914ff9d65d94e547';
	$.ajax({
		type: 'get',
		url: hostUrl + '/sys/base/customFormInstance/getVariable/' + id + '?time=' + Math.random(),
		success: function (data) {
			var customFormDto = data.result;
			alert(1);
		}
	});
}

//测试
function test1() {
	$.ajax({
		type: 'get',
		url: hostUrl + '/sys/base/customFormInstance/getInstance/b78dff747b8d45f3aea9c5a60d50e9a4/4454752b33d340fa9b5c5e95a92c1eac?time=' + Math.random(),
		success: function (data) {
			var customFormDto = data.result;
			alert(1);
		}
	});
}