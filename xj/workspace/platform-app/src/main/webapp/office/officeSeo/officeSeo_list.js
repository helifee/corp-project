$(function(){
	pageInit();
});
function pageInit(){
	var menuArray = getOperationAuthorition();
	if($.inArray("toRecordBtn", menuArray)>-1){
		$('#toRecordBtn').show();
	}
	getOfficeInfoList();
	   $.xljUtils.resizeNestedGrid();
	   $("#officeName").inputPlaceholder();
	   $("#officeType").inputPlaceholder();
	   $("#officeNum").inputPlaceholder();
	    $("#officeName,#officeType,#officeNum").keypress(function(e){
	        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	        if (eCode == 13){
	        	searchData();
	        }
	 })
}
function getOfficeInfoList(){
 	jQuery("#officeSeo").jqGrid({
    	url : baseUrl + "oa/office/officeInfo/getOfficeInfopageByCurrentUser",
        ajaxGridOptions: { contentType: 'application/json', aync:true },
        mtype : "post",
        datatype : "json",
        contentType : "application/json",
        jsonReader : {
        	repeatitems: false
        },
        postData: {officeName:"",officeType:"",officeNum:""},
        colModel : [
             {name : 'id',label : 'id', align:"center",hidden : true},
             {name : 'accoutId',label : 'accoutId', align:"center",hidden : true},
             {name : 'stockNum',label : '编号', align:"center",defaultValue:"eeee"},
             {name : 'stockName',label : '名称', align:"center"},
             {name : 'typeName',label : '所属类别', align:"center"},
             {name : 'stockSpecifications',label : '规格',align:"center"},
             {name : 'stockBrand',label : '品牌',align:"center"},
             {name : 'meteringUnit',label : '单位',align:"center"},
             {name : 'price',label : '单价',align:"center",formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
             {name : 'stockCount',label : '库存量',align:"center"}
        ],
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
        autowidth:true,
        pager : '#pager',//表格页脚的占位符(一般是div)的id
        rownumbers:true,
        viewrecords : true,
        gridComplete: function() {
        	$.xljUtils.resizeNestedGrid();
        	$.xljUtils.addGridScroll();
        }
	});
}
function searchData(){
	var officeName=$("#officeName").getInputVal();
	var officeType=$("#officeType").getInputVal();
	var officeNum=$("#officeNum").getInputVal();
	jQuery("#officeSeo").jqGrid("setGridParam",{postData:{officeName:officeName,officeType:officeType,officeNum:officeNum},page:1}).trigger("reloadGrid");
	getOfficeInfoList();
}

function toRecordList(){
	var ids=$('#officeSeo').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择查看的档案！");
		return;
	}
	window.open("officeRecord_list.html?id="+ids);	
}
/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: hostUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=ZHCX',
		dataType: 'json',
		//contentType: 'application/json',
		async: false,
		//data: JSON.stringify(postdata),
		success: function (data) {
			if (data.success) {
				menuList =  data.result;

			} else {
				$.xljUtils.tip('red', '获取按钮权限失败！');
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			$.xljUtils.tip('red', '获取按钮权限失败！');
		}
	});
	return menuList;
}