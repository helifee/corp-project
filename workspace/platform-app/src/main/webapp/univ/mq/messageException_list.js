$(function(){
    //页面加载完成之后执行
    loadGridData();//加载表格数据

    $.xljUtils.resizeNestedGrid();

});
/**
 * author:liuf
 * describe:删除供方信息  伪删除  包括字表 账号  支持批量删除
 * param: name companyname provincename
 */
function loadGridData(){

	// 创建jqGrid组件
	$.xljUtils.initJqGrid({
		gridSelecter:'#list',
		url : hostUrl + 'univ/mq/messageException/page?random='+Date.now(),
		postData : {},
		colNames :['主键', '主题', '消息内容','消息状态','是否重发消息', '异常原因', '创建时间'],
		colModel : [ // jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
			{ name : 'id',  index : 'id', align : "center", hidden : true },
			{ name : 'topic',index : 'topic', align : "left" },
			{ name : 'body',index : 'body', align : "center"},
			{ name : 'state',index : 'state', align : "center", formatter:stateRender},
			{ name : 'isReSend', index : 'isReSend',align : "center", formatter:isReSendRender},
			{ name : 'remark', index : 'remark',align : "center" },
			{ name : 'createDate', index : 'createDate',align : "center"}
		],
		multiselect:false,
		viewrecords:true,
		pager : '#pager',//表格页脚的占位符(一般是div)的id
		sortname : 'createDate',// 初始化的时候排序的字段
		sortorder : "desc",// 排序方式,可选desc,asc
	});
    
};

/**
 * author:xubaoyong
 * describe:装载过滤查询的条件
 * param:null
 */
function searchData(){
     var topic_name=$.trim($("#topic_name").val());
     var paras = {
        delflag:false,
        topic : topic_name
     }
     if(topic_name.length == 0){
            delete paras.topic;
      }
    jQuery("#list").jqGrid("setGridParamPostData",paras).trigger("reloadGrid");

}
/**
 * 重发标识描述器
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {*}
 */
function isReSendRender(cellvalue, options, rowObject){
    if("0" == cellvalue){
        return "否";
    }else if("1" == cellvalue){
        return "是";
    }else {
        return cellvalue;
    }
}
/**
 * 消息单元格描述器
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {*}
 */
function stateRender(cellvalue, options, rowObject){
    if("1" == cellvalue){
        return "待发送";
    }else if("2" == cellvalue){
        return "已接收，未消费";
    }else if("3" == cellvalue){
        return "已消费";
    }else {
        return cellvalue;
    }
}
