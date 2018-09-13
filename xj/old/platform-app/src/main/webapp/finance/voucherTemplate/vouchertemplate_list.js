/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
	var _tempList;
	_tempList = {
		ns: "_tempList",
		dataPar: {
			rowData: null,
			rowDataBefore: null,
			appCode: _tabList.dataPar.appCode,
			accountSetId: $("#selectCompany").val() == null ? "null" : $("#selectCompany").val(),
			isup: false,
			isOne: false,
			entryObjFieldisOne: false,
			zTreeObj: null,
			oldBizObjectId: null,
			maintainData: []
		},
		//模板业务类型树 的参数配置
		setting: {
			view: {
				dblClickExpand: false,
				showLine: false,
				selectedMulti: false,
				nameIsHTML: true
			},
			data: {
				keep: {
					leaf: false,
					parent: true
				},
				simpleData: {
					enable: true,
					idKey: 'id',
					pIdKey: 'parentId',
					rootPId: '0'
				}
			},
			callback: {
				onCollapse: function () {
					$.xljUtils.treeResizeFn();
				},
				onClick: function (event, treeId, treeNode) {
					_tempList.zTreeOnClick(event, treeId, treeNode)
				} //点击节点事件
			}
		},
		/**
		 * 保存模板及分录
		 */
		saveTempAll: function () {
			var my = this;
			//映射后台保存方法
			var url = hostUrl + "finance/voucherTemplateType/saveTempAll";
			//请求方式
			var type = 'POST';
			//获取form表单元素并遍历赋值
			var dataArr = $("#fieldEditFrom").serializeArray();
			var dataDto = {};
			for (var i in dataArr) {
				dataDto[dataArr[i].name] = dataArr[i].value;
			}
			dataDto.delflag = 0;
			if (dataDto.id == null || "" == dataDto.id) {
				//tempUUID
				var uuid = my.getFormUUID();
				dataDto.id = uuid;
			}
			//从表数据
			var obj = $("#tempEntryGrid").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
			var arr = obj.concat(my.dataPar.maintainData);  //复制，var arr = arr1.slice(0)
			var lastArr = [];
			for (var i = 0; i < arr.length; i++) {
				arr[i].voucherTemplateId = dataDto.id;
				arr[i].sort = i + 1;
				arr[i].delflag = 0;
				if (arr[i].entryDataType == "") {
					arr[i].entryDataType = 3
				} else if (arr[i].entryDataType == "1") {
					arr[i].entryDataType = 1
				} else if (arr[i].entryDataType == "3") {
					arr[i].entryDataType = 3
				}
				if (!my.unique(arr[i].id, lastArr)) {
					lastArr.push(arr[i]);
				}
			}
			//规则列表赋值
			dataDto.entryList = lastArr;
			$.ajax({
				url: url,
				data: JSON.stringify(dataDto),
				type: type,
				contentType: 'application/json;charset=utf-8',
				dataType: 'JSON',
				success: function (resultData) {
					if (resultData.success) {
						pop_tip_open("green", '保存成功！');
						my.zTreeOnClick(null, null, my.dataPar.zTreeObj.getSelectedNodes()[0]);
					} else {
						pop_tip_open("red", resultData.msg);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 数组匹配id
		 */
		unique: function (n, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (n == arr[i].id) {
					return true;
				}
			}
			return false;
		},
		/**
		 * 加载公司下拉框
		 */
		loadSelData: function () {
			var my = this;
			$.ajax({
				type: 'POST',
				url: hostUrl + 'finance/accountSetCompany/queryList' + '?time=' + Math.random(),
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify('{"delflag":"0","sidx":"createDate","accountSetId":"' + my.dataPar.accountSetId + '"}'),
				success: function (json) {
					if (json.success) {
						var data = json.result;
						for (var o in data) {
							$("#companySct").append("<option value='" + data[o].companyId + "'>" + data[o].companyName + "</option>");
						}
					} else {
						//pop_tip_open("red","获取上级数据失败！");
					}
					//获取凭证模板树
					my.getTempTree();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 下拉框onchange事件
		 */
		searchProjectDate: function () {
			this.getTempTree();//加载凭证模板树
		},
		/**
		 * 获取凭证模板树
		 */
		getTempTree: function () {
			var my = this;
			//获取组织机构树地址
			var urlBody = "finance/voucherTemplateType/queryList" + '?time=' + Math.random();
			var urlAll = hostUrl + urlBody;
			var jsonData = {
				delflag: 0,
				accountSetId: $("#selectCompany").val() == null ? "null" : $("#selectCompany").val(),
				companyId: $('#companySct').val() == null ? "null" : $('#companySct').val(),
				sidx: "createDate"
			};
			$.ajax({
				type: 'POST',
				url: urlAll,
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify(jsonData),
				success: function (json) {
					//返回的数据节点
					var zNodes = json.result;
					my.dataPar.zTreeObj = $.fn.zTree.init($("#treeDemo"), my.setting, zNodes);

					var nodes = my.dataPar.zTreeObj.getNodes();
					//默认展开第一个节点
					my.dataPar.zTreeObj.expandNode(nodes[0], true, false, false, false);

					//树重新加载后清空模板及分录信息
					$("#tempEntryGrid").jqGrid("clearGridData");//清空所有分录数据行
					$('#fieldEditFrom')[0].reset();//清空模板表单
					//清楚隐藏元素值
					$('#fieldEditFrom').find('input[name="id"]').val('');
					$('#fieldEditFrom').find('input[name="typeId"]').val('');
					$('#fieldEditFrom').find('input[name="bizObjectName"]').val('');
					//分录删除数据置空
					my.dataPar.maintainData = [];

					setTimeout(function () {
						$.xljUtils.addTreeScroll('ztree-box');
						$.xljUtils.treeResizeFn();
					}, 300);
				}, error: function (XMLHttpRequest, textStatus, errorThrown) {
					//pop_tip_open("red", "获取凭证模板树请求失败");
				}
			})
		},
		/**
		 * 模板类型树样式
		 */
		getFontCss: function (treeId, treeNode) {
			return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {
				color: "#333",
				"font-weight": "normal"
			};
		},
		/**
		 * 树点击节点事件
		 */
		zTreeOnClick: function (event, treeId, treeNode) {
			var my = this;
			var treeTypeName = treeNode.name;
			var treeTypeId = treeNode.id;
			var queryDataPost = {
				"typeId": treeNode.id,
				"delflag": 0
			};
			//模板数据
			$.ajax({
				type: 'post',
				url: hostUrl + 'finance/voucherTemplate/queryList' + '?time=' + Math.random(),
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify(queryDataPost),
				success: function (data) {
					var formData = data.result;
					$('#fieldEditFrom')[0].reset();
					$("#fieldEditFrom").find("input[name='id']").val('');
					$("#fieldEditFrom").find("input[name='typeId']").val('');
					$("#fieldEditFrom").find("input[name='bizObjectName']").val('');
					if (formData.length > 0) {
						//凭证模板
						$("#fieldEditFrom").find("input[name='id']").val(formData[0].id);
						$("#fieldEditFrom").find("input[name='typeId']").val(formData[0].typeId);
						$("#fieldEditFrom").find("input[id='typeName']").val(treeTypeName);
						$("#fieldEditFrom").find("select[name='bizObjectId']").val(formData[0].bizObjectId);
						$("#fieldEditFrom").find("input[name='bizObjectName']").val(formData[0].bizObjectName);
						$("#fieldEditFrom").find("input[name='remark']").val(formData[0].remark);
						$("#fieldEditFrom").find(":radio[name='status'][value=" + formData[0].status + "]").attr("checked", true);
						$("#fieldEditFrom").find("input[name='word']").val(formData[0].word);
						$("#fieldEditFrom").find("textarea[name='filter']").val(formData[0].filter);
						//凭证模板分录
						$("#tempEntryGrid").jqGrid("setGridParam", {
							postData: {
								voucherTemplateId: formData[0].id,
								delflag: 0,
								page:1
							}
						}).trigger("reloadGrid");

						my.dataPar.oldBizObjectId = formData[0].bizObjectId;
					} else {
						$("#fieldEditFrom").find("input[name='typeId']").val(treeTypeId);
						$("#fieldEditFrom").find("input[id='typeName']").val(treeTypeName);
						//清空所有分录数据行
						$("#tempEntryGrid").jqGrid("clearGridData");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 加载模板分录数据
		 */
		loadTempEntryData: function () {
			var my = this;
			var voucherTemplateId = $("#fieldEditFrom").find("input[name='id']").val();
			if (null == voucherTemplateId || voucherTemplateId == "") {
				voucherTemplateId = 'null';
			}
			jQuery("#tempEntryGrid").jqGrid({
				url: hostUrl + 'finance/voucherTemplateEntry/queryList' + '?time=' + Math.random(),
				ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
				mtype: "POST",
				datatype: "json",
				postData: {voucherTemplateId: voucherTemplateId, delflag: 0},
				multiselect: false,
				multiboxonly: false,
				width: $('.busiTemp').width(),
				height: $(window).height() - 520,
				rownumbers: true,
				jsonReader: {
					root: "result",
					repeatitems: false
				},
				colModel: [
					{name: 'id', label: 'id', hidden: true, align: "center"},
					{name: 'entryDataType', label: 'entryDataType', hidden: true, align: "center"},
					{name: 'voucherTemplateId', label: 'voucherTemplateId', hidden: true, align: "center"},
					{name: 'captionId', label: 'captionId', hidden: true, align: "center"},
					{name: 'assCode', label: 'assCode', hidden: true, align: "center"},
					{name: 'cashFlowCode', label: 'cashFlowCode', hidden: true, align: "center"},
					{name: 'cashFlowId', label: 'cashFlowId', hidden: true, align: "center"},
					{name: 'summary', label: '摘要', align: "center"},
					{name: 'filter', label: '筛选条件', align: "center"},
					{name: 'captionName', label: '会计科目名称', align: "center"},
					{name: 'assName', label: '辅助核算名称', align: "center"},
					{name: 'cashFlowName', label: '现金流量名称', align: "center"},
					{name: 'drmnyexpr', label: '借方金额', align: "center"},
					{name: 'crmnyexpr', label: '贷方金额', align: "center"},
					{name: 'remark', label: '备注', align: "center"},
				],
				rowNum: -1,//一页显示多少条
				rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
				ondblClickRow: function (rowid) {
					my.to_upEntry(rowid);
				},
				gridComplete: function () {
					$.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
//                	my.dataPar.rowDataBefore = my.dataPar.rowData;
//                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
//                    	//添加回显选中行样式
//                    	$('#assType').setSelection(my.dataPar.rowDataBefore.id,true);
//                    	$('#assType '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight");
//                    }
				},
				viewrecords: true,
				loadError: function (xhr, status, error) {
					//异常处理
					if (xhr.status == 404) {
						pop_tip_open("red", "请求url有误！");
						return;
					}
					if (xhr.status == 405) {
						pop_tip_open("red", "请求方法有误！");
						return;
					}
					pop_tip_open("red", "网络异常,请联系管理员！");
				},
				loadComplete: function (xhr) {
					if (!xhr.success) {
						if (xhr.code == "50000" || xhr.code == "50001" || xhr.code == "50003") {
							pop_tip_open("red", xhr.msg);
							return;
						}
						if (xhr.code == "50002") {
							pop_tip_open("blue", xhr.msg);
							return;
						}
						//pop_tip_open("red", "查询数据失败！");
					} else {
						//success
					}
				}

			});
		},
		/**
		 * 加载业务下拉框
		 */
		loadBizObjectData: function () {
			var my = this;
			$.ajax({
				type: 'POST',
				url: hostUrl + 'finance/businessObject/queryList' + '?time=' + Math.random(),
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				data: JSON.stringify({"delflag": "0", "status": "1", "type": "2", "appCode": my.dataPar.appCode}),//appCode 系统value
				success: function (json) {
					if (json.success) {
						var data = json.result;
						$("#bizObjectId").empty();
						$("#bizObjectId").append("<option value=''>请选择</option>");
						for (var o in data) {
							$("#bizObjectId").append("<option value='" + data[o].id + "'>" + data[o].name + "</option>");
						}
					} else {
						//pop_tip_open("red","获取上级数据失败！");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if(XMLHttpRequest.status==0){
						my.loadBizObjectData();
						return ;
					}
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 业务对象赋值
		 */
		changeProject: function () {
			var my = this;
			if (!my.isCheckedTree()) {//没有选择模板类型树
				$("#bizObjectId").val('');//清空业务对象
				return;
			}
			var filter = $('#fieldEditFrom').find('textarea[name="filter"]').val();
			var obj = $("#tempEntryGrid").jqGrid("getRowData");
			;
			var isNull = true;
			if ("" != filter && null != filter) {
				isNull = false;
			} else if (obj.length > 0) {
				isNull = false;
			}
			$('#bizObjectName').val($("#bizObjectId").find("option:selected").text());
			/*if (!isNull) {
				pop_text_open("blue", "此操作要清空筛选条件及分录列表,是否继续?", function () {
					$("#tempEntryGrid").jqGrid("clearGridData");//清空所有数据行
					$('#fieldEditFrom').find('textarea[name="filter"]').val('');//清空筛选条件
					my.dataPar.maintainData = [];//删除数据置空

					my.dataPar.oldBizObjectId = $("#bizObjectId").val();
					$('#bizObjectName').val($("#bizObjectId").find("option:selected").val());
				}, function () {
					$("#bizObjectId").val(my.dataPar.oldBizObjectId);
				});
			} else {
				my.dataPar.oldBizObjectId = $("#bizObjectId").val();
				$('#bizObjectName').val($("#bizObjectId").find("option:selected").val());
			}*/
		},
		/**
		 * 新增的时候 自动的生成表单id
		 */
		getFormUUID: function () {
			var uuid = null;
			$.ajax({
				type: 'get',
				async: false,
				url: hostUrl + '/generator/getGuuid' + '?time=' + Math.random(),
				success: function (data) {
					uuid = data.result;
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
			return uuid;
		},
		/**
		 * 新增方法-模板类型
		 */
		to_addTempType: function () {
			var my = this;
			if (!$('#companySct').val()) {
				pop_tip_open("blue", "对照公司为空不能添加");
				return;
			}
			//打开模态窗口
			$("#addBusiType").modal("show");

			$('#typeModalBody').load("vouchertemplatetype_modal.html", function () {
				//绑定modal树事件
				my.modalSelEvent();
				//表单初始验证
				$.xljUtils.customValidate();
				//表单元素赋值
				$("#cashTempTypeFrom").find("input[name='id']").val(my.getFormUUID());
				$("#cashTempTypeFrom").find("input[name='companyId']").val($('#companySct').val());
				$("#cashTempTypeFrom").find("input[name='accountSetId']").val(my.dataPar.accountSetId);
				//父节点赋值
				var nodes = my.dataPar.zTreeObj.getSelectedNodes();
				if (nodes.length == 1) {
					$('#cashTempTypeFrom').find('input[id="parentName"]').val(nodes[0].name);
					$('#cashTempTypeFrom').find('input[name="parentId"]').val(nodes[0].id);
				}
				//修改titile
				$('#tempType-title').html("凭证模板类型-新增");
			});
		},
		/**
		 * 复制方法-模板类型
		 */
		to_addCopyTempType: function (typeId) {
			var my = this;
			if (!$('#companySct').val()) {
				pop_tip_open("blue", "对照公司为空不能添加");
				return;
			}
			//打开模态窗口
			$("#addBusiType").modal("show");
			$('#typeModalBody').load("vouchertemplatetype_modal.html", function () {
				var tempId = my.getFormUUID();
				//修改表单验证保存方法
				$('#cashTempTypeFrom').attr("data-validate-success", "_tempList.saveCopyTempType('" + tempId + "')");
				//绑定modal树事件
				my.modalSelEvent();
				//表单初始验证
				$.xljUtils.customValidate();
				//表单元素赋值
				$("#cashTempTypeFrom").find("input[name='id']").val(tempId);
				$("#cashTempTypeFrom").find("input[name='companyId']").val($('#companySct').val());
				$("#cashTempTypeFrom").find("input[name='accountSetId']").val(my.dataPar.accountSetId);
				//修改titile
				$('#tempType-title').html("凭证模板类型-复制");
			});
		},
		/**
		 * 修改方法
		 */
		to_updateTempType: function (ids) {
			var my = this;
			var nodes = my.dataPar.zTreeObj.getSelectedNodes();
			if (nodes.length != 1) {
				pop_tip_open("blue", "请选择一个凭证模板类型");
				return false;
			}
			$.ajax({
				type: 'get',
				url: hostUrl + 'finance/voucherTemplateType/get/' + nodes[0].id + '?time=' + Math.random(),
				success: function (data) {
					var fieldData = data.result;
					if (fieldData) {
						$('#typeModalBody').load("vouchertemplatetype_modal.html", function () {
							//绑定modal树事件
							my.modalSelEvent();
							//表单初始验证
							$.xljUtils.customValidate();
							//修改titile
							$('#tempType-title').html("凭证模板类型-修改");
							//表单元素赋值
							$('#cashTempTypeFrom').find('input[name="id"]').val(fieldData.id);
							$('#cashTempTypeFrom').find('input[name="accountSetId"]').val(fieldData.accountSetId)
							$('#cashTempTypeFrom').find('input[name="companyId"]').val(fieldData.companyId)
							$('#cashTempTypeFrom').find('input[name="parentId"]').val(fieldData.parentId)
							if (null != nodes[0].getParentNode() && "" != nodes[0].getParentNode()) {
								$('#cashTempTypeFrom').find('input[id="parentName"]').val(nodes[0].getParentNode().name)
							}
							$('#cashTempTypeFrom').find('input[name="name"]').val(fieldData.name)
						});
						//是否删除操作
						my.dataPar.isup = true;
						//show modal
						$("#addBusiType").modal("show");
					} else {
						pop_tip_open("red", "数据为空！");
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 删除事件
		 */
		to_deleteTempType: function () {
			var my = this;
			var nodes = my.dataPar.zTreeObj.getSelectedNodes();
			if (nodes.length != 1) {
				pop_tip_open("blue", "请选择一个凭证模板类型");
				return false;
			} else if (nodes[0].children != null && nodes[0].children.length > 0) {
				pop_tip_open("blue", "存在下级节点，不可删除");
				return false;
			}
			pop_text_open("blue", "确认要删除该节点吗?", function () {
				$.ajax({
					url: hostUrl + "finance/voucherTemplateType/deletePseudoBatch/" + nodes[0].id,
					type: 'DELETE',
					dataType: 'JSON',
					success: function (xhr, textStatus) {
						if (xhr) {
							if (xhr.success) {
								pop_tip_open("green", "删除数据成功！");
								my.getTempTree();
							} else {
								if (xhr.code == "50000") {
									pop_tip_open("red", xhr.msg);
									return;
								}
								pop_tip_open("red", "数据删除失败！");
							}
						} else {
							pop_tip_open("red", "服务异常,请联系管理员！");
						}
					},
					error: function (xhr, textStatus, errorThrown) {
						pop_tip_open("red", "服务异常,请联系管理员！");
					}
				});
			}, function () {
				return;
			});
		},
		/**
		 * 保存模板类型
		 */
		saveTempType: function () {
			var my = this;
			//映射后台保存方法
			var url = hostUrl + "finance/voucherTemplateType/save";
			//请求方式
			var type = 'POST';
			if (my.dataPar.isup) {
				//映射后台修改方法
				url = hostUrl + "finance/voucherTemplateType/update/" + $('#cashTempTypeFrom').find("input[name='id']").val();
				type = 'PUT';
			}
			//获取form表单元素并遍历赋值
			var dataArr = $("#cashTempTypeFrom").serializeArray();
			var dataDto = {};
			for (var i in dataArr) {
				if (dataArr[i].name == 'parentId') {
					if (dataArr[i].value == null || dataArr[i].value == "" || dataArr[i].value == undefined) {
						dataArr[i].value = '0';
					}
				}
				dataDto[dataArr[i].name] = dataArr[i].value;
			}
			dataDto.delflag = 0;
			$.ajax({
				url: url,
				data: JSON.stringify(dataDto),
				type: type,
				contentType: 'application/json;charset=utf-8',
				dataType: 'JSON',
				success: function (resultData) {
					if (resultData.success) {
						pop_tip_open("green", '保存成功！');
						//关闭模态窗口
						$("#addBusiType").modal("hide");
						//重新加载模板类型树
						my.getTempTree();
					} else {
						pop_tip_open("red", resultData.msg);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 初始化数据项
		 */
		loadFieldData: function () {
			var my = this;
			var dataId = $("#fieldEditFrom").find("select[name='bizObjectId']").val();
			if (null == dataId || "" == dataId) {
				dataId = "null";
			}
			if (!my.dataPar.isOne) {
				jQuery("#objFieldGrid").jqGrid({
					url: hostUrl + 'finance/businessField/getTreeByObjId' + '?time=' + Math.random(),
					ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
					mtype: "POST",
					treeGrid: true,
					treeGridModel: "adjacency",
					ExpandColumn: "nodeIcon",
					datatype: "json",
					postData: {bizObjectId: dataId},
					width: 340,
					height: 200,
					subGrid: true,
					//width:$('.container-all').width(),
					//height:"auto",
					jsonReader: {
						root: "result",
						repeatitems: false
					},
					colModel: [
						{name: 'id', label: 'id', hidden: true, align: "center"},
						{name: 'bizObjectId', label: '业务对象id', hidden: true, align: "center"},
						{name: 'dataType', label: '数据维护类型', hidden: true, align: "center"},
						{name: 'name', label: '名称', hidden: true, align: "center"},
						{name: 'nodeIcon', label: '名称', align: "center"},
						{name: 'code', label: '编号', align: "center"},
						{
							name: 'type', label: '数据类别', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "String:字符串;Integer:整数 ;Boolean:布尔;Double:浮点;Object:对象"}
						},
						{name: 'parentName', label: '所属上级', align: "center"},
						{
							name: 'isQuery', label: '是否查询', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						},
						{
							name: 'display', label: '是否显示', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						},
						{
							name: 'urlTypeFlag', label: '是否url类型标识', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						}
					],
					viewrecords: true,
					onSelectRow: function () {
						var rowId = $('#objFieldGrid').jqGrid("getGridParam", "selrow");
						my.dataPar.rowData = $('#objFieldGrid').jqGrid('getRowData', rowId);
						var rtnText = "{!" + my.dataPar.rowData.code + ":" + my.dataPar.rowData.name + ";}"
						$('#objFilterText').val($('#objFilterText')[0].value + rtnText);
					},
					onCellSelect: function () {
						//	                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
						//	                		//重新选择行时清除上一次选中行的样式
						//	                		$('#fieldList '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight");
						//	                	}
					},
					treeReader: {
						level_field: "level",
						parent_id_field: "parentId",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						left_field: "lft",
						right_field: "rgt"
					},
					gridComplete: function () {
						//	                	$(window).resize();
							                    $.xljUtils.addGridScroll();
						//	                    //重绘滚动条
							                    $.xljUtils.gridResizeFn();
						//	                	my.dataPar.rowDataBefore = my.dataPar.rowData;
						//	                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
						//	                    	//添加回显选中行样式
						//	                    	$('#fieldList').setSelection(my.dataPar.rowDataBefore.id,true);
						//	                    	$('#fieldList '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight");
						//	                    }
						my.dataPar.isOne = true;
					},
					loadError: function (xhr, status, error) {
						//异常处理
						switch (xhr.status) {
							case 404:
								pop_tip_open("red", "请求url有误！");
								break;
							case 405:
								pop_tip_open("red", "请求方法有误！");
								break;
							default:
								//pop_tip_open("red", "获取系统菜单服务异常！");
								break;
						}

					},
					loadComplete: function (xhr) {
						if (!xhr.success) {
							switch (xhr.code) {
								case "50000":
									pop_tip_open("red", xhr.msg);
									break;
								case "50001":
									pop_tip_open("red", xhr.msg);
									break;
								case "50002":
									//pop_tip_open("blue",xhr.msg);
									break;
								case "50003":
									pop_tip_open("red", xhr.msg);
									break;
								default:
									//pop_tip_open("red", "查询数据失败！");
									break;
							}
						} else {
							//success
						}
					}
				});
			} else {
				$("#objFieldGrid").jqGrid("setGridParam", {postData: {bizObjectId: dataId},pge:1}).trigger("reloadGrid");
			}
		},
		/**
		 * 初始化数据项
		 */
		loadEntryObjFieldData: function () {
			var my = this;
			var dataId = $("#fieldEditFrom").find("select[name='bizObjectId']").val();
			if (null == dataId || "" == dataId) {
				dataId = "null";
			}
			if (!my.dataPar.entryObjFieldisOne) {
				jQuery("#objFieldModalGrid").jqGrid({
					url: hostUrl + 'finance/businessField/getTreeByObjId' + '?time=' + Math.random(),
					ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
					mtype: "POST",
					treeGrid: true,
					treeGridModel: "adjacency",
					ExpandColumn: "nodeIcon",
					datatype: "json",
					postData: {bizObjectId: dataId},
					subGrid: true,
					width: 566,
					height: 200,
					jsonReader: {
						root: "result",
						repeatitems: false
					},
					colModel: [
						{name: 'id', label: 'id', hidden: true, align: "center"},
						{name: 'bizObjectId', label: '业务对象id', hidden: true, align: "center"},
						{name: 'dataType', label: '数据维护类型', hidden: true, align: "center"},
						{name: 'name', label: '名称', hidden: true, align: "center"},
						{name: 'nodeIcon', label: '名称', align: "center"},
						{name: 'code', label: '编号', align: "center"},
						{
							name: 'type', label: '数据类别', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "String:字符串;Integer:整数 ;Boolean:布尔;Double:浮点;Object:对象"}
						},
						{name: 'parentName', label: '所属上级', align: "center"},
						{
							name: 'isQuery', label: '是否查询', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						},
						{
							name: 'display', label: '是否显示', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						},
						{
							name: 'urlTypeFlag', label: '是否url类型标识', align: "center", formatter: "select", hidden: true,
							editoptions: {value: "0:否;1:是"}
						}
					],
					viewrecords: true,
					onSelectRow: function () {
						var rowId = $('#objFieldModalGrid').jqGrid("getGridParam", "selrow");
						my.dataPar.rowData = $('#objFieldModalGrid').jqGrid('getRowData', rowId);
						var rtnText = "{!" + my.dataPar.rowData.code + ":" + my.dataPar.rowData.name + ";}"
						$('#objFilterArea').val($('#objFilterArea')[0].value + rtnText);
					},
					onCellSelect: function () {
					},
					treeReader: {
						level_field: "level",
						parent_id_field: "parentId",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						left_field: "lft",
						right_field: "rgt"
					},
					gridComplete: function () {
						my.dataPar.entryObjFieldisOne = true;
					},
					loadError: function (xhr, status, error) {
						//异常处理
						switch (xhr.status) {
							case 404:
								pop_tip_open("red", "请求url有误！");
								break;
							case 405:
								pop_tip_open("red", "请求方法有误！");
								break;
							default:
								pop_tip_open("red", "获取系统菜单服务异常！");
								break;
						}

					},
					loadComplete: function (xhr) {
						if (!xhr.success) {
							switch (xhr.code) {
								case "50000":
									pop_tip_open("red", xhr.msg);
									break;
								case "50001":
									pop_tip_open("red", xhr.msg);
									break;
								case "50002":
									//pop_tip_open("blue",xhr.msg);
									break;
								case "50003":
									pop_tip_open("red", xhr.msg);
									break;
								default:
									//pop_tip_open("red", "查询数据失败！");
									break;
							}
						} else {
							//success
						}
					}
				});
			} else {
				$("#objFieldModalGrid").jqGrid("setGridParam", {postData: {bizObjectId: dataId},page:1}).trigger("reloadGrid");
			}
		},
		/**
		 * 清空上级
		 */
		empty: function () {
			$("#cashTempTypeFrom").find("input[name='parentId']").val("");
			$("#cashTempTypeFrom").find("input[id='parentName']").val("");
		},
		/**
		 * 科目回调函数
		 * @param data
		 */
		subjectCallback: function (treeNodes, e) {
			var treeIds = "";
			var treeNames = "";
			for (var i = 0; i < treeNodes.length; i++) {
				var isParent = treeNodes[i].isParent;
				if (!isParent) {
					treeIds += treeNodes[i].id + ",";
					treeNames += treeNodes[i].name + ",";
				}
			}
			$("#cashFlowModalFrom").find("input[id='subjectCodes']").val(treeIds.substring(0, treeIds.length - 1));
			$("#cashFlowModalFrom").find("input[id='subjectNames']").val(treeNames.substring(0, treeNames.length - 1));
		},
		/**
		 * 上级回调函数
		 * @param data
		 */
		flowCallback: function (treeNode, e) {
			var flowId = $("#cashTempTypeFrom").find("input[name='id']").val();
			if (treeNode.id == flowId) {
				pop_tip_open("blue", "上级组织不能选择自己");
				$("#cashTempTypeFrom").find("input[id='parentId']").val('');
				$("#cashTempTypeFrom").find("input[id='parentName']").val('');
			}
		},
		/**
		 * 新增分录方法
		 */
		to_addEntry: function () {
			var my = this;
			if ("" == $("#bizObjectId").val() || null == $("#bizObjectId").val()) {//没有选择模板类型树
				pop_tip_open("blue", "模板【业务对象】为空不能增加分录！");
				return;
			}
			$('#entryModalBody').load("vouchertemplateentry_modal.html", function () {
				//绑定modal树事件
				my.entrySelEvent();
				//表单初始验证
				$.xljUtils.customValidate();
				//表单元素赋值
				$("#templateEntryFrom").find("input[name='id']").val(my.getFormUUID());
				$("#templateEntryFrom").find("input[name='entryDataType']").val('1');
				//修改titile
				$('.templateEntryModal-title').html("凭证模板分录-新增");
			});
			//打开模态窗口
			$("#templateEntryModal").modal("show");
		},
		/**
		 * 修改分录方法
		 */
		to_upEntry: function (ids) {
			var my = this;
			var ids = $('#tempEntryGrid').jqGrid('getGridParam', 'selrow');
			if (!ids || ids.length == 0) {
				pop_tip_open("blue", "请选择要修改的分录行！");
				return;
			}
			var rowData = $('#tempEntryGrid').jqGrid('getRowData', ids);
			if (!rowData.dataType == 1) {
				rowData.entryDataType = 3;
			}
			$('#entryModalBody').load("vouchertemplateentry_modal.html", function () {
				//绑定modal树事件
				my.entrySelEvent();
				//表单初始验证
				$.xljUtils.customValidate();
				//打开维护规则页面(摸态框方式)
				$('.templateEntryModal-title').html("凭证模板分录-修改");
				//表单元素赋值
				$('#templateEntryFrom').find('input[name="id"]').val(rowData.id);
				$('#templateEntryFrom').find('input[name="entryDataType"]').val(rowData.entryDataType);
				$('#templateEntryFrom').find('input[name="voucherTemplateId"]').val(rowData.voucherTemplateId);
				$('#templateEntryFrom').find('input[name="captionId"]').val(rowData.captionId);
				$('#templateEntryFrom').find('input[name="assCode"]').val(rowData.assCode);
				$('#templateEntryFrom').find('input[name="cashFlowId"]').val(rowData.cashFlowId);
				$('#templateEntryFrom').find('input[name="cashFlowCode"]').val(rowData.cashFlowCode);
				$('#templateEntryFrom').find('input[name="summary"]').val(rowData.summary);
				$('#templateEntryFrom').find('input[name="filter"]').val(rowData.filter);
				$('#templateEntryFrom').find('input[name="captionName"]').val(rowData.captionName);
				$('#templateEntryFrom').find('input[name="assName"]').val(rowData.assName);
				$('#templateEntryFrom').find('input[name="cashFlowName"]').val(rowData.cashFlowName);
				$('#templateEntryFrom').find('input[name="drmnyexpr"]').val(rowData.drmnyexpr);
				$('#templateEntryFrom').find('input[name="crmnyexpr"]').val(rowData.crmnyexpr);
				$('#templateEntryFrom').find('input[name="remark"]').val(rowData.remark);
			});
			//打开模态窗口
			$("#templateEntryModal").modal("show");
		},
		/**
		 * 删除分录
		 */
		to_delEntry: function () {
			var my = this;
			var ids = $('#tempEntryGrid').jqGrid('getGridParam', 'selrow');
			if (!ids || ids.length == 0) {
				pop_tip_open("blue", "请选择要删除分录的行！");
				return;
			}
			//添加删除数据
			var rowData = $('#tempEntryGrid').jqGrid('getRowData', ids);
			rowData.entryDataType = 2;
			this.dataPar.maintainData[this.dataPar.maintainData.length] = rowData;
			//grid删除操作
			$("#tempEntryGrid").jqGrid("delRowData", ids);//删除
		},
		/**
		 * 复制
		 */
		to_copyTempData: function () {
			var tempId = $("#fieldEditFrom").find("input[name='id']").val();
			if ("" == tempId || null == tempId) {
				pop_tip_open("blue", '请先选择要复制的模板类型！');
				return;
			}
			this.to_addCopyTempType();
		},
		/**
		 * 复制模板
		 */
		saveCopyTempType: function (typeId) {
			var my = this;
			//映射后台保存方法
			var url = hostUrl + "finance/voucherTemplateType/saveAllCopyTemp";
			//请求方式
			var type = 'POST';
			//获取form表单元素并遍历赋值
			var dataArr = $("#cashTempTypeFrom").serializeArray();
			var dataDto = {};
			for (var i in dataArr) {
				if (dataArr[i].name == 'parentId') {
					if (dataArr[i].value == null || dataArr[i].value == "" || dataArr[i].value == undefined) {
						dataArr[i].value = '0';
					}
				}
				dataDto[dataArr[i].name] = dataArr[i].value;
			}
			dataDto.delflag = 0;


			//获取form表单元素并遍历赋值
			var fieldArr = $("#fieldEditFrom").serializeArray();
			var tempDto = {};
			for (var i in fieldArr) {
				tempDto[fieldArr[i].name] = fieldArr[i].value;
			}
			tempDto.delflag = 0;
			//tempUUID
			var uuid = my.getFormUUID();
			tempDto.id = uuid;
			tempDto.typeId = typeId;
			dataDto.tempDto = tempDto;

			//从表数据
			var obj = $("#tempEntryGrid").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
			var arr = obj.concat(my.dataPar.maintainData);  //复制，var arr = arr1.slice(0)
			var lastArr = [];
			for (var i = 0; i < arr.length; i++) {
				arr[i].id = my.getFormUUID();
				arr[i].voucherTemplateId = tempDto.id;
				arr[i].sort = i + 1;
				arr[i].delflag = 0;
				if (arr[i].entryDataType == "") {
					arr[i].entryDataType = 3
				} else if (arr[i].entryDataType == "1") {
					arr[i].entryDataType = 1
				} else if (arr[i].entryDataType == "3") {
					arr[i].entryDataType = 3
				}
				if (!my.unique(arr[i].id, lastArr)) {
					lastArr.push(arr[i]);
				}
			}
			//规则列表赋值
			dataDto.entryList = lastArr;


			$.ajax({
				url: url,
				data: JSON.stringify(dataDto),
				type: type,
				contentType: 'application/json;charset=utf-8',
				dataType: 'JSON',
				success: function (resultData) {
					if (resultData.success) {
						pop_tip_open("green", '复制成功！');
						//关闭模态窗口
						$("#addBusiType").modal("hide");
						//重新加载模板类型树
						my.getTempTree();
					} else {
						pop_tip_open("red", resultData.msg);
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red", "服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 绑定按钮事件
		 */
		bind_event: function () {//事件绑定
			var my = this;
			//新增
			$('#addTempType').on('click', function () {
				my.to_addTempType();
			});
			//修改
			$('#upTempType').on('click', function () {
				my.to_updateTempType();
			});
			//删除
			$('#delTempType').on('click', function () {
				my.to_deleteTempType();
			});

			//新增分录
			$('.addEntry').on('click', function () {
				my.to_addEntry();
			});
			//修改分录
			$('.upEntry').on('click', function () {
				my.to_upEntry();
			});
			//删除分录
			$('.delEntry').on('click', function () {
				my.to_delEntry();
			});
			//复制
			$('#copyTempData').on('click', function () {
				my.to_copyTempData();
			});

			//摸态窗口关闭事件-模板类型
			$('#addBusiType').on('hidden.bs.modal', function () {
				//重置表单
				$('#typeModalBody').empty();
				//取消选中树
				//my.dataPar.zTreeObj.cancelSelectedNode();
				//重置模板类型是否修改or新增
				my.dataPar.isup = false;
			});
			//摸态窗口打开事件-模板类型
			$('#addBusiType').on('show.bs.modal', function () {
			});
			//摸态窗口打开事件-模板
			$('#formulaEdit').on('show.bs.modal', function () {
				//回填数据
				$('#objFilterText').val($('#fieldEditFrom').find('textarea[name="filter"]')[0].value);
				//左公式点击事件
				$('.click-event').on('click', function () {
					var currentEle = $(this);
					$('#objFilterText').val($('#objFilterText')[0].value + currentEle.attr('value'));
				});
				//确认事件
				$('.formulaEdit-confirm').on('click', function () {
					$('#fieldEditFrom').find('textarea[name="filter"]').val($('#objFilterText')[0].value);
					$('#formulaEdit').modal("hide");
				});
				//右加载业务对象数据项
				my.loadFieldData();
			});
			//摸态窗口打开事件-模板
			$('#formulaEdit').on('hidden.bs.modal', function () {
				$('#objFilterText').val('');
				$('.formulaEdit-confirm').unbind(); //移除所有
				$('.click-event').unbind(); //移除所有
			});
			//摸态窗口关闭事件-分录
			$('#templateEntryModal').on('hidden.bs.modal', function () {
				//重置表单
				$('#entryModalBody').empty();
				//移除所有事件
				$('.templateEntryModal-confirm').unbind();
			});
			//摸态窗口打开事件-分录
			$('#templateEntryModal').on('show.bs.modal', function () {
			});
			//摸态窗口打开事件-业务项
			$('#objFieldModal').on('show.bs.modal', function () {
				//右加载业务对象数据项
				my.loadEntryObjFieldData();
			});
			//摸态窗口打开事件-业务项
			$('#objFieldModal').on('hidden.bs.modal', function () {
				$('#objFilterArea').val('');
				$('.objFieldModal-confirm').unbind(); //移除所有事件
			});
			//表单初始验证
			$.xljUtils.customValidate();
		},
		/**
		 * 分录确认
		 */
		entryConfirm: function () {
			var my = this;
			//form表单数据
			var entryArr = $("#templateEntryFrom").serializeArray();
			var entryDto = {};
			for (var i in entryArr) {
				entryDto[entryArr[i].name] = entryArr[i].value;
			}
			entryDto.delflag = 0;
			var rowId = $("#templateEntryFrom").find("input[name='id']").val();
			//验证修改id是否为null
			if (1 != entryDto.entryDataType) {
				$("#tempEntryGrid").jqGrid('setRowData', rowId, entryDto);//修改
			} else {
				$("#tempEntryGrid").addRowData(rowId, entryDto, "last");//新增
			}
			$("#templateEntryModal").modal("hide");
		},
		/**
		 * 上级树
		 */
		modalSelEvent: function () {
			var my = this;
			//上级树插件
			$('#parentName,#selectTempEntry').on('click', function () {
				var urlBody = "finance/voucherTemplateType/queryList" + '?time=' + Math.random();
				var urlAll = hostUrl + urlBody;
				var dataPost = {
					delflag: 0,
					accountSetId: $("#selectCompany").val() == null ? "null" : $("#selectCompany").val(),
					companyId: $('#companySct').val() == null ? "null" : $('#companySct').val(),
					sidx: "createDate"
				};
				$(my).xljSingleSelector({
					title: '选择上级',//选择器标题，默认是'选择组织机构'
					selectorType: 'company',//选择器类型，默认是组织机构选择器
					immediatelyShow: true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
					treeUrl: urlAll,
					treeParam: dataPost,//生成zTree树的参数
					targetId: 'parentId',//选择的数据的ID存储input域
					targetName: 'parentName',//选择的数据的Name存储input域
					ajaxType: 'POST', //ajax的type 默认为post
					saveCallback: my.flowCallback,
					treeSettings: {
						data: {
							simpleData: {
								enable: true,
								idKey: 'id',
								pIdKey: 'parentId'
							}
						},
					}
				});
			});
		},
		entrySelEvent: function () {
			var my = this;
			//摘要
			$('#templateEntryFrom').find('input[name="summary"],a[id="selectSummary"]').on('click', function () {
				$("#objFieldModal").modal("show");
				//回填数据
				$('#objFilterArea').val($("#templateEntryFrom").find("input[name='summary']").val());
				
				$('.objFieldModal-confirm').on('click', function () {
					$("#templateEntryFrom").find("input[name='summary']").val($('#objFilterArea')[0].value);
					$("#templateEntryFrom").find("input[name='summary']").focus();
					$('#objFieldModal').modal("hide");
				});
			});
			//筛选条件
			$('#templateEntryFrom').find('input[name="filter"],a[id="selectFilter"]').on('click', function () {
				$("#objFieldModal").modal("show");
				//回填数据
				$('#objFilterArea').val($("#templateEntryFrom").find("input[name='filter']").val());
						
				$('.objFieldModal-confirm').on('click', function () {
					$("#templateEntryFrom").find("input[name='filter']").val($('#objFilterArea')[0].value);
					$("#templateEntryFrom").find("input[name='filter']").focus();
					$('#objFieldModal').modal("hide");
				});
			});
			//会计科目名称
			$('#templateEntryFrom').find('input[name="captionName"],a[id="selectCaption"]').on('click', function () {
				var urlBody = "finance/accountCaption/queryList" + '?time=' + Math.random();
				var urlAll = hostUrl + urlBody;
				var dataPost = {
					accountSetId: my.dataPar.accountSetId == null ? "null" : my.dataPar.accountSetId,
					delflag: 0
				}
				$(this).xljSingleSelector({
					title: '选择会计科目',//选择器标题，默认是'选择组织机构'
					selectorType: 'captionName',//选择器类型，默认是组织机构选择器
					immediatelyShow: true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
					treeUrl: urlAll,
					treeParam: dataPost,//生成zTree树的参数
					targetId: 'captionId',//选择的数据的ID存储input域
					targetName: 'captionName',//选择的数据的Name存储input域
					ajaxType: 'POST', //ajax的type 默认为post
					saveCallback: my.captionCallback,
					treeSettings: {
						data: {
							simpleData: {
								enable: true,
								idKey: 'id',
								pIdKey: 'parentId'
							}
						}
					}
				});
			});
			//现金流量名称
			$('#templateEntryFrom').find('input[name="cashFlowName"],a[id="selectCashFlow"]').on('click', function () {
				var urlBody = "finance/cashFlowItem/queryList" + '?time=' + Math.random();
				var urlAll = hostUrl + urlBody;
				var dataPost = {"accountSetId": my.dataPar.accountSetId == null ? "null" : my.dataPar.accountSetId};
				$(this).xljSingleSelector({
					title: '选择现金流量',//选择器标题，默认是'选择组织机构'
					selectorType: 'company',//选择器类型，默认是组织机构选择器
					immediatelyShow: true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
					treeUrl: urlAll,
					treeParam: dataPost,//生成zTree树的参数
					targetId: 'cashFlowId',//选择的数据的ID存储input域
					targetName: 'cashFlowName',//选择的数据的Name存储input域
					ajaxType: 'POST', //ajax的type 默认为post
					saveCallback: my.cashflowCallback,
					treeSettings: {
						data: {
							simpleData: {
								enable: true,
								idKey: 'id',
								pIdKey: 'parentId'
							}
						},
					}
				});
			});
			//借方金额
			$('#templateEntryFrom').find('input[name="drmnyexpr"],a[id="selectDrmnyexpr"]').on('click', function () {
				$("#objFieldModal").modal("show");
				//回填数据
				$('#objFilterArea').val($("#templateEntryFrom").find("input[name='drmnyexpr']").val());
				$('.objFieldModal-confirm').on('click', function () {
					$("#templateEntryFrom").find("input[name='drmnyexpr']").val($('#objFilterArea')[0].value);
					$("#templateEntryFrom").find("input[name='drmnyexpr']").focus();
					$('#objFieldModal').modal("hide");
				});
			});
			//贷方金额
			$('#templateEntryFrom').find('input[name="crmnyexpr"],a[id="selectCrmnyexpr"]').on('click', function () {
				$("#objFieldModal").modal("show");
				//回填数据
				$('#objFilterArea').val($("#templateEntryFrom").find("input[name='crmnyexpr']").val());
				$('.objFieldModal-confirm').on('click', function () {
					$("#templateEntryFrom").find("input[name='crmnyexpr']").val($('#objFilterArea')[0].value);
					$("#templateEntryFrom").find("input[name='crmnyexpr']").focus();
					$('#objFieldModal').modal("hide");
				});
			});
			//备注
			$('#templateEntryFrom').find('textarea[name="remark"],a[id="selectRemark"]').on('click', function () {
				$("#objFieldModal").modal("show");
				//回填数据
				$('#objFilterArea').val($("#templateEntryFrom").find("input[name='remark']").val());
				$('.objFieldModal-confirm').on('click', function () {
					$("#templateEntryFrom").find("input[name='remark']").val($('#objFilterArea')[0].value);
					$("#templateEntryFrom").find("input[name='remark']").focus();
					$('#objFieldModal').modal("hide");
				});
			});
		},
		/**
		 * 页面高度自适应
		 */
		resizeTreeHeight: function () {
			var w_h = $(window).height();
			$(".ztree-box").height(($(window).height() - 205) + "px");
			$('#tempEntryGrid').jqGrid().setGridWidth($('.busiTemp').width());
			$('#tempEntryGrid').jqGrid().setGridHeight($(window).height() - 520);
		},
		/**
		 * 会计科目回调
		 */
		captionCallback: function (treeNode, e) {
			$("#templateEntryFrom").find("input[name='captionId']").val(treeNode.id);
			$("#templateEntryFrom").find("input[name='captionName']").val(treeNode.name);
			$("#templateEntryFrom").find("input[name='assCode']").val(treeNode.assIds);
			$("#templateEntryFrom").find("input[name='assName']").val(treeNode.assNames);
			$("#templateEntryFrom").find("input[name='captionName']").focus();
		},
		/**
		 * 现金流量回调
		 */
		cashflowCallback: function (treeNode, e) {
			$("#templateEntryFrom").find("input[name='cashFlowId']").val(treeNode.id);
			$("#templateEntryFrom").find("input[name='cashFlowCode']").val(treeNode.code);
			$("#templateEntryFrom").find("input[name='cashFlowName']").val(treeNode.name);
			$("#templateEntryFrom").find("input[name='cashFlowName']").focus();
		},
		/**
		 * 摘要清空
		 */
		summaryEmpty:function () {
			$("#templateEntryFrom").find("input[name='summary']").val('');
		},
		/**
		 * 筛选条件清空
		 */
		filterEmpty:function () {
			$("#templateEntryFrom").find("input[name='filter']").val('');
		},
		/**
		 * 会计科目名称及辅助核算名称清空
		 */
		captionEmpty:function () {
			$("#templateEntryFrom").find("input[name='captionId']").val('');
			$("#templateEntryFrom").find("input[name='captionName']").val('');
			$("#templateEntryFrom").find("input[name='assCode']").val('');
			$("#templateEntryFrom").find("input[name='assName']").val('');
		},
		/**
		 * 现金流量名称清空
		 */
		cashFlowEmpty:function () {
			$("#templateEntryFrom").find("input[name='cashFlowId']").val('');
			$("#templateEntryFrom").find("input[name='cashFlowCode']").val('');
			$("#templateEntryFrom").find("input[name='cashFlowName']").val('');
		},
		/**
		 * 借方金额清空
		 */
		drmnyexprEmpty:function () {
			$("#templateEntryFrom").find("input[name='drmnyexpr']").val('');
		},
		/**
		 * 贷方金额清空
		 */
		crmnyexprEmpty:function () {
			$("#templateEntryFrom").find("input[name='crmnyexpr']").val('');
		},
		/**
		 * 备注清空
		 */
		remarkEmpty:function () {
			$("#templateEntryFrom").find("input[name='remark']").val('');
		},
		/**
		 * 是否选中模板类型树
		 */
		isCheckedTree: function () {
			var nodes = this.dataPar.zTreeObj.getSelectedNodes();
			if (nodes.length != 1) {
				pop_tip_open("blue", "请选择一个凭证模板类型");
				return false;
			} else {
				return true;
			}
		},
		/**
		 * 页面初始化
		 */
		pageInit: function () {
			//加载业务对象
			this.loadBizObjectData();
			//公司下拉框
			this.loadSelData();
			//凭证模板分录
			this.loadTempEntryData();
			//绑定按钮事件
			this.bind_event();
			//页面加载完毕后更改grid宽高
			//$.xljUtils.resizeNestedGrid();
			//模板树高度
			this.resizeTreeHeight();
			// 自适应宽度
			$(window).resize(function () {
				_tempList.resizeTreeHeight();
			});
		}
	};
	$(_tempList.pageInit());
    window[_tempList.ns] = _tempList;
})(window,document);
