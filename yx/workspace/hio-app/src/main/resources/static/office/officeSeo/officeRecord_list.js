var selInfoId=$.xljUtils.getUrlParam('id');
$(function(){
	pageInit();
});
function pageInit(){
	
		getOfficeInfoList();
	   $.xljUtils.resizeNestedGrid();

}
function getOfficeInfoList(){
	var ubody = "oa/office/officeRecord/page";
	var uall = serviceUrl+ubody;
	jQuery("#officeRecordList").jqGrid(
	        {
	        	url: uall,
	            ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST",  
	            contentType : "application/json",  
	            postData:{delflag:"0",stockInfoId:selInfoId},
	            datatype : "json", 
	            jsonReader : {
		            repeatitems : false  
		        },
	            rownumbers: true,
	            autowidth:true,
	            colModel : [ 
	                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
	                 {name : 'inCount',label : '入库数量', align : "center"},
	                 {name : 'buyPrice',label : '入库单价', align : "center",formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
	                 {name : 'stockBrand',label : '品牌',align : "center"},
	                 {name : 'countMoney',label : '增减总金额',align : "center",formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
	                 {name : 'createPersonName',label : '录入者',align : "center"},
	                 {name : 'createDate',label : '入库时间',align : "center"}
	            ],
	            rowNum : 20,//一页显示多少条
	            rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	            pager : '#pager',//表格页脚的占位符(一般是div)的id
	            loadError:function(xhr,status,error){
	            	$.xljUtils.tip("red","入库记录列表加载失败");
	            },
	            gridComplete: function(){
	            	$.xljUtils.addGridScroll();
	            	$.xljUtils.gridResizeFn();
	            },
	            sortname : 'create_date',//初始化的时候排序的字段
	            sortorder : "desc",//排序方式,可选desc,asc
	            viewrecords : true
	        });
}


function closed(){
	window.close();
}