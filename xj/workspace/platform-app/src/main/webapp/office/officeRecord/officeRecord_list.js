/**
 * 列表查询 add by yongmei.xiao
 */
var selectHouseId=null;
var addRowId = null;
$(document)
		.ready(
				function() {
					var urlParam = $.xljUtils.getUrlParams();
					var act = (urlParam && urlParam.act) ? urlParam.act : "";
					var officeRecordGrid = $("#officeRecordGrid");
					var editable = false;
					var url = '';
					if (act == 'import') { // 快速录入页面
						$('#btn-ctrl').addClass('kslr').removeClass('kccx');
						officeRecordGrid.removeClass('flag');
						editable = true;
						// url = baseUrl + "oa/office/officeRecord/page";
					} else { // 库存查询页面
						$('#btn-ctrl').addClass('kccx').removeClass('kslr');
						officeRecordGrid.addClass('flag');
						url = baseUrl + "oa/office/officeRecord/page";
					}

					officeRecordGrid.jqGrid({
						url : url,
						ajaxGridOptions : {
							contentType : 'application/json',
							aync : true
						},
						mtype : "post",
						contentType : 'application/json',
						// postData: {"stockName": condition},
						datatype : "json",
						jsonReader : {
							repeatitems : false
						},
						colModel : [ {
							name : 'id',
							label : 'id',
							align : "center",
							hidden : true
						}, {
							name : 'stockNum',
							label : '编号',
							align : "center",
							editable : true
						}, {
							name : 'stockName',
							label : '名称',
							align : "center",
							editable : true
						}, {
							name : 'houseId',
							label : '类别id',
							align : "center",
							hidden : true
						}, {
							name : 'typeName',
							label : '所属类别',
							align : "center",
							editable : true,
							edittype : 'select',
							editoptions : {
								value : getOfficeHouse(),
								dataEvents : [{
								type : 'change',
								fn : function(e) {
									  var $attrTypeSel = $( e.target );  
									  selectHouseId = $attrTypeSel.val();
			                              
								}
							}]
							}
						}, {
							name : 'stockSpecifications',
							label : '规格',
							align : "center",
							editable : true
						}, {
							name : 'stockBrand',
							label : '品牌',
							align : "center",
							editable : true
						}, {
							name : 'meteringUnit',
							label : '单位',
							align : "center",
							editable : true
						}, {
							name : 'stockNum',
							label : '库存量',
							align : "center",
							editable : true
						}, {
							name : 'inCount',
							label : '入库数量',
							align : "center",
							editable : true
						}, {
							name : 'buyPrice',
							label : '入库单价',
							align : "center",
							editable : true,formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}
						}, {
							name : 'countMoney',
							label : '增减总金额',
							align : "center",
							editable : true,formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}
						} ],
						rowNum : 20,// 一页显示多少条
						rowList : [ 20, 50, 100, 200 ],// 可供用户选择一页显示多少条
						autowidth : true,
						pager : '#pagered',// 表格页脚的占位符(一般是div)的id
						rownumbers : true,
						viewrecords : true,
					//	multiboxonly : false,
					//	multiselect : true,
						/*
						 * ondblClickRow:function(rowid){ var _this = $(this);
						 * if(_this.hasClass('flag')) { //库存查询页面 双击进入调整库存页面
						 * openNewWindow('officeGrantRecord.html?act=update&id=' +
						 * rowid); }else { //快速录入页面 双击进行可编辑状态
						 * _this.editRow(rowid,true); }
						 *  },
						 */
						gridComplete : function() {
							$.xljUtils.resizeNestedGrid();
							$.xljUtils.addGridScroll();
						}
					});

					// 清除按钮
					$('#OfficeRecordClear').click(function() {
						$('#search').get(0).reset();
						$('#parentNodeId').val('');
					})

					// 搜索按钮
					$('#officeRecordQuery').click(function() {
						searchDate()
					})

					// 提交按钮
					$('#officeRecordSubmit').click(function() {
						toSave();
					})

					// 模板下载按钮
					$('#officeRecordTPLDownload')
							.click(
									function() {
										var gr = jQuery("#officeRecordGrid")
												.jqGrid('getGridParam',
														'selarrrow');
										if (gr.length > 0) {
											window.location.href = hostUrl
													+ "/oa/office/officeRecord/ExportOfficeRecordModel/"
													+ gr.join(',');
										} else {
											$.xljUtils.tip("red", "请选择导出的数据项！");
										}
									})

					// 文件导入按钮
					$('#officeRecordFileImport').click(function() {
						$('#upfile').click();
					})

					$('#upfile')
							.change(
									function() {
										var _this = $(this);
										if (_this.val() != '') {
											var file = _this.get(0).files[0];
											var formData = new FormData();
											formData.append('upfile', file)
											$
													.ajax({
														url : hostUrl
																+ "oa/office/officeRecord/importOfficeRecordByExcel",
														type : "POST",
														data : formData,
														contentType : false,
														processData : false,
														success : function(data) {
															if (data
																	&& data.result
																	&& data.result.length > 0) {
																var importData = data.result;
																var jqgridDataLength = $(
																		'#officeRecordGrid')
																		.jqGrid(
																				'getDataIDs').length;
																for ( var i = 0; i < importData.length; i++) {
																	officeRecordGrid
																			.jqGrid(
																					'addRowData',
																					importData[i].id,
																					importData[i]);
																}
																_this.val(''); // 将file置空
															}
														}
													})
										}

									})

					// 选择父节点
					$('.fatherNodeSelector')
							.click(
									function() {
										$(this)
												.xljSingleSelector(
														{
															title : '用品类别',// 选择器标题，默认是'选择组织机构'
															selectorType : 'officehouse',// 选择器类型，默认是组织机构选择器
															immediatelyShow : true,// 是否立即显示选择器，用于js调用判断,默认false,使用click触发
															treeUrl : baseUrl
																	+ "oa/office/officeHouse/getOfficeHouseTreeById/null?t="
																	+ (+new Date()),
															targetId : "parentNodeId",// 选择的数据的ID存储input域
															targetName : "parentNodeIdBak",// 选择的数据的Name存储input域
															formatTreeJson : formatZTreeData,
															ajaxType : "GET",
															treeSettings : {
																data : {
																	simpleData : {
																		enable : true,
																		idKey : 'id',
																		pIdKey : 'parentId'
																	}
																}
															}
														});
									})

				});

// 清除父类别内容
function empty(obj) {
	$(obj).siblings('input[name="parentNodeIdBak"]').val('');
	$(obj).siblings('input[name="parentNodeId"]').val('');
}

function formatZTreeData(arr) {

	$.each(arr, function(index, value) {
		value.iconSkin = 'diy-group';
	});

	return arr;
};

// 增减总金额计算
function calcTotalMoney(e) {
	var v = e.target.value - 0;
	var rowid = e.target.id.split('_')[0];
	var officeRecordGrid = $("#officeRecordGrid");
	var rowData = $("#officeRecordGrid").jqGrid('getRowData', rowid);
	e.target.value = v;
	if (!v || v < 0) {
		$.xljUtils.tip('red', '请输入合法的大于0的数字');
		e.target.value = '';
		e.target.focus();
	} else {
		var a = $("input#" + rowid + "_inCount").val() - 0;
		var b = $("input#" + rowid + "_buyPrice").val() - 0;
		var countMoney = a * b;
		var selectEditionRowIds = $('#selectEditionRowIds').val();

		if (selectEditionRowIds.indexOf(rowid) == -1) {
			$('#selectEditionRowIds').val(selectEditionRowIds + ',' + rowid);
		}

		officeRecordGrid.jqGrid('setCell', rowid, "countMoney", countMoney);
	}
}

/**
 * 提交保存数据
 */
function toSave() {
	var officeRecordGrid = $('#officeRecordGrid');
	var allData = officeRecordGrid.jqGrid('getRowData');

	if (allData.length > 0) {
		$.each(allData, function(i, ele) {
			// delete ele.id;
			delete ele.numberCode;
		})
		$.ajax({
			url : hostUrl + "/oa/office/officeRecord/saveBatch",
			data : JSON.stringify(allData),
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(data) {
				console.log(data)
			}
		})
		/*
		 * for (var i = 0; i < ids.length; i++) { var gr = ids[i]; if(gr) {
		 * officeRecordGrid.jqGrid('saveRow', gr); var dr=
		 * officeRecordGrid.jqGrid('getRowData',gr);//得到该行的数据 $.ajax({ url:
		 * hostUrl+"/oa/office/officeRecord/update/" + gr,
		 * data:JSON.stringify(dr), type:'PUT', contentType:'application/json',
		 * dataType:'JSON', success: function(data) { } }) }
		 *  }
		 */
	}

}
function getOfficeHouse() {
	var str = "";
	$.ajax({
		type : 'POST',
		url : hostUrl + 'sys/quick/entry/queryList' + '?time=' + Math.random(),
		dataType : 'json',
		contentType : 'application/json',
		async : false,
		data : JSON.stringify('{"delflag":"0","sidx":"sort"}'),
		success : function(json) {
			if (json.success) {
				data = json.result;
				for ( var o in data) {
					str += data[o].id + ":" + data[o].name + ";";
				}
			}

		}
	});
	return str;
}
/**
 * 模糊条件查询
 */
function searchDate() {
	var queryData = {
		"stockName" : $("#queryByName").val(),
		"stockNum" : $("#queryByNum").val()
	};
	//TODO 
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length == 1 ){
		queryData.houseId=nodes[0].id;
	}
	jQuery("#officeRecordGrid").jqGrid('setGridParam', {
		url : baseUrl + "oa/office/officeRecord/page",
		postData : queryData
	}).trigger('reloadGrid');
}

function toAddRow() {
	$("#listButton").hide();
	$("#saveButton").show();
	addRowId = initUUId();
	$("#officeRecordGrid").addRowData(addRowId, {
		"id" : addRowId,
		"stockNum" : "",
		"stockName" : "",
		"houseId" : "",
		"stockSpecifications" : "",
		"stockBrand" : "",
		"meteringUnit" : "",
		"stockNum" : "",
		"inCount" : "",
		"buyPrice" : "",
		"countMoney" : ""
	}, "last");
	jQuery("#officeRecordGrid").jqGrid('editRow', addRowId);
}
function cancel() {
	jQuery("#officeRecordGrid").jqGrid('restoreRow', addRowId);
	$("#officeRecordGrid").jqGrid("delRowData", addRowId);
	$("#listButton").show();
	$("#saveButton").hide();
}
function addRowData() {
	jQuery("#officeRecordGrid").jqGrid('saveRow', addRowId);
	var rowData = $("#officeRecordGrid").jqGrid('getRowData', addRowId);
			rowData.houseId=selectHouseId;
	delete rowData.typeName;
	$.ajax({
		url : hostUrl + "oa/office/officeRecord/save",
		type : 'post',
		dataType : 'JSON',
		contentType : "application/json",
		data : JSON.stringify(rowData),
		success : function(resultData) {
			if (resultData.success) {
				$('#officeRecordGrid').jqGrid().trigger("reloadGrid");
				addRowId = "";
				$("#saveButton").show();
				$("#listButton").hide();
			} else {
				pop_tip_open("red", resultData.msg);
			}
		},

	});

}
function initUUId() {
	var uuid = null;
	$.ajax({
		type : 'get',
		async : false,
		url : baseUrl + "generator/getGuuid" + "?time=" + Math.random(),
		success : function(data) {
			uuid = data.result;
		}
	});
	return uuid;
}
function delRow(){
	var rowid=jQuery("#officeRecordGrid").jqGrid('getGridParam',"selrow");
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
		if(rowid&&rowid!='') {
			  pop_text_open("blue",'确认要删除这条数据吗？',function(){
					$.ajax({
						url:hostUrl+"oa/office/officeRecord/delete/"+rowid,
						type:'DELETE',
						dataType:'JSON',
						success:function (resultData ) {
							if (resultData&&resultData.success) {
								$('#officeRecordGrid').jqGrid().trigger("reloadGrid");
								pop_tip_open("green","删除成功");
							}else{
								pop_tip_open("red",resultData.msg);
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							$.xljUtils.getError(jqXHR.status);
				        }
					});
			  },function(){
				  return;
			  });	
		}
}

//TODO 
var setting = {
    data: {
        simpleData: {
            enable: true,
            pIdKey: 'parentId'
        },
        key: {
        	
        }
    },
    callback: {
    	beforeClick: function(treeId, treeNode, clickFlag) {
    		return !treeNode.isParent;
    	},
        onClick: loadContentChildByTypeId
    }
};
	//生成左侧的菜单数
	/**
	 * 查询大类树结构
	 * null 参数代表查询所有的树结构，不带条件搜索
	 */
var treeObj;
    $.ajax({
        type: "GET",
        url: baseUrl + "oa/office/officeHouse/getOfficeHouseTreeById/null?t=" + (+new Date()),
        dataType: "json",
        contentType: 'application/json',
        success: function (typeNodes) {
            var zNodes = typeNodes.result;
            recursionArray(zNodes);
            treeObj= $.fn.zTree.init($("#_zTree"), setting, zNodes);
            treeObj.expandAll(true);
            /*//默认加载第一个菜单的列表数据
            if(zNodes.length>0){
            	var firstChildNode = null;
            	var nodes =  treeObj.transformToArray(treeObj.getNodes());
            	for(var i = 0, len = nodes.length;i<len;i++) {
            		if(!nodes[i].isParent) {
            			firstChildNode = nodes[i];
            			break;
            		}
            	}
            	treeObj.selectNode(firstChildNode);	//选中第一个节点
            	onClick("","",firstChildNode);
            }*/
        }
    });
    
    /**
     * 单击左侧菜单事件
     * 加载对应jqgrid数据列表
     */
    function loadContentChildByTypeId(e,treeId,treeNode){
    	/*jQuery("#officeRecordGrid").jqGrid('setGridParam',{
    		postData: {stockHouseId: treeNode.id}
    	}).trigger('reloadGrid');*/
    	searchDate();
    }
    
  //树增加样式
    function recursionArray(arr) {
        for(var i in arr) {
        	arr[i].iconSkin = "diy-system";
        }
    };