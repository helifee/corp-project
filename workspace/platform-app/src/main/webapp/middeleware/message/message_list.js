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
    jQuery("#list").jqGrid(
        {
            url: hostUrl+'sys/middeleware_message/mqMessage/page',
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            datatype : "json",
            postData:{delflag:false},
            multiselect:true,
            autowidth:true,
            rownumbers:true,
            jsonReader : {
                repeatitems: false
            },
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'id',hidden:true,align : "center"},
                {name : 'topic',label : '主题',align : "center"},
                //{name : 'tag',label : '消息标签',align : "center"},
                {name : 'body',label : '消息内容',align : "center"},
                {name : 'state',label : '消息状态',align : "center",formatter:stateRender},
                {name : 'isReSend',label : '是否重发消息',align : "center",formatter:isReSendRender},
                {name : 'createDate',label : '创建时间',align : "center"}
            ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
            pager : '#pager',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){

            },
            viewrecords : true
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
