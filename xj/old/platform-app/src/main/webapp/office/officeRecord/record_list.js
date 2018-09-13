/** 
 * 调整记录列表
 * @author add by gyh
 * @date 2017-4-23
 * 
 */

var recordGridObj;
var selInfoId=window.opener.selInfoId;//选中行ID


/**
 * 入库记录列表
 */
function initrecordlistObj(){
	var ubody = "oa/office/officeRecord/page";
	var uall = hostUrl+ubody;
    //创建jqGrid组件
	recordGridObj = jQuery("#recordGrid").jqGrid(
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
            pager : '#recordPager',//表格页脚的占位符(一般是div)的id
            loadError:function(xhr,status,error){
            	$.xljUtils.tip("red","入库记录列表加载失败");
            },
            gridComplete: function(){
            	$.xljUtils.addGridScroll();
            	$.xljUtils.gridResizeFn();
            },
            sortname : 'create_date',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#recordPager', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.isDefault == "1" ){
        return "style='color:blue'";
    }
}

/**
 * 是否启用格式化
 */
function defaultFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

$(function(){
	//初始化initrecordlistObj
	initrecordlistObj();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
  //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
});

function closed(){
	window.close();
}