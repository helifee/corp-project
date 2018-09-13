var colNames = '';// 动态列表头
var colModel = '';// 动态列列名

$(function() {
	initPersonList(false);
});
function chg() {
	$.xljUtils.tip('blue', '.......');
}

/**
 * 初始化人员信息列表
 */
function initPersonList(flag) {
	if (flag) {
		colNames = '';// 重置动态列表头
		colModel = '';// 重置动态列列名
		$('#customtable').empty();
		$("#customtable").append(
				'<table id="hrEmpSetList" constraint-layout="true"></table>');
		$("#customtable").append('<div id="pager2"></div>');
	}

	// 将字符串转驼峰命名
	String.prototype.transform = function() {
		var re = /_(\w)/g;
		return this.replace(re, function() {
			var args = arguments;
			return args[1].toUpperCase();
		})
	};

	$.ajax({
		url : baseUrl + 'sys/sysInfoItem/getSelectList',
		type : 'post',
		data : JSON.stringify({
			"code" : 'emp_list'
		}),
		dataType : "json",
		sync : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		success : function(data) {
			var title = {};
			var arr = [];
			var flag = jQuery.isEmptyObject(data.result);
			var results = data.result;
			if (!flag) {
				for ( var i in results) {
					$.each(results[i], function(key, value) {
						if (key == 'code') {
							title.name = value.transform();// todo 将字符串转驼峰命名
							title.index = value.transform();
							if (value != 'id' && value != 'approval_num') {
								colNames += value.transform() + ',';
							}
							if(value=='name' || value=='org_id' || value=='account' || value=='phone') {
								title.queryable = false;
							} else {
								title.queryable = true;
							}
							if(value=='person_type' || value=='max_education' || value=='max_degree' || value=='entry_time') {
								title.querydefault = true;
							} else {
								title.querydefault = false;
							}
						}
						if (key == 'name') {
							title.label = value;
							if (value != 'id' && value != '入职审批号') {
								colModel += value + ",";
							}
						}
						if (key == "editType") {
							if (value == 1) { // 隐藏
								title.hidden = true;
								title.editable = false;
							}
							if (value == 2) { // 不可编辑
								title.editable = false;
							}
							if (value == 3) {// 可编辑
								title.editable = true;
							}
						}
						if (key == 'type') {// todo 字典翻译
							if (value == 5) {
								title.formatter = 'date';
								title.formatoptions = {
									srcformat : 'Y-m-d H:i:s',
									newformat : 'Y-m-d'
								};
								title.querytype = 'date';
							} else if(value == 1 || value == 2 || value == 8) {
								title.querytype = 'number';
							} else if(value == 7) {
								//title.querytype = 'sysCode';
								title.querytype = 'list';
								title.listoption = [{value:'1',name:'迟到'},{value:'2',name:'早退'},{value:'3',name:'旷工'}];
							} else {
								title.querytype = 'text';
							}
						}
					});
					title.align = 'center';
					title.cellattr = addCellAttr, arr.push(title);
					title = {};
				}

				colModel = colModel.substring(0, colModel.length - 1);
				colNames = colNames.substring(0, colNames.length - 1);
			}

			// 创建jqGrid组件
			// colNames: ['id', '姓名', '人员编号', '所属机构', '岗位', '人员类别', '证件号码',
			// '入职日期', '进入本公司日期'],
			jqGridSysInfoSet = jQuery("#hrEmpSetList").jqGrid({
				url : baseUrl + 'emp/empPersonInfo/page',
				datatype : "JSON",
				mtype : "post",
				ajaxGridOptions : {
					contentType : 'application/json'
				},
				contentType : "application/json",
				colModel : arr,
				shrinkToFit : false,
				autoScroll : false,
				autowidth : true,
				sortname : 'defaultSort',// 初始化的时候排序的字段
				sortorder : "asc",// 排序方式,可选desc,asc
				multiselect : true,
				multiboxonly : true,
				rownumbers : true,
				postData : {
					retiredPersonFlag : false
				},
				// width: $(".tableStyle").width()-20,
				height : $(window).height() - 164,
				rowNum : 20,
				pager : "#pager2",
				rowList : [ 20, 50, 100, 200 ],
				viewrecords : true,
				jsonReader : {
					repeatitems : false
				},
				onSelectRow : function() {
					var rowId = $('#hrEmpSetList').jqGrid(
							"getGridParam", "selrow");
					rowData = $('#hrEmpSetList').jqGrid('getRowData',
							rowId);
				},
				ondblClickRow : function(rowid) {
					// 跳转编辑页
					rowData = $('#hrEmpSetList').jqGrid('getRowData',
							rowid);
					var winObjEI = window
							.open("emp_personinfo.html?id="
									+ rowData.id + "&approvalNum="
									+ rowData.approvalNum);
				},
				loadError : function(xhr, status, error) {
					if (xhr.status == 404) {
						$.xljUtils.tip("red", "请求url有误！");
						return;
					}
					if (xhr.status == 405) {
						$.xljUtils.tip("red", "请求方法有误！");
						return;
					}
					$.xljUtils.tip("red", "网络异常,请联系管理员！");
				},
				loadComplete : function(xhr) {
					if (!xhr.success) {
						switch (xhr.code) {
						case "50000":
							$.xljUtils.tip("red", xhr.msg);
							break;
						case "50001":
							$.xljUtils.tip("red", xhr.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue", xhr.msg);
							break;
						case "50003":
							$.xljUtils.tip("red", xhr.msg);
							break;

						default:
							$.xljUtils.tip("red", "查询数据失败！");
							break;
						}
					} else {
						// jqGridSysInfoSet.jqGrid().trigger("reloadGrid");
					}
				},
				gridComplete : function() {
					$.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
				}
			});
			
			// 高级查询
			$('div.query-div').hrQueryCondition({
				queryHandler : function(rdata) {
					console.log(JSON.stringify(rdata));
				},
				selectNodeType : $.hrQry.selectNodeType.companyOrDept,
				seniorSeparator : '~', // 双日历及双数字值分割符,如果不赋值则默认为' ~ '
				seniorContainer : '#hrEmpSetList',
				toggleSeniorCallback : function() {
					$.xljUtils.resizeNestedGrid();
					$.xljUtils.gridResizeFn();
				}
			});
			
		},
		error : function() {
			alert("查询失败！");
		}
	});
}

/**
 * 样式格式化:对字段标红
 */
window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
    if (rowObject.status != "在职") {
        return "style='color:red'";
    }
};
