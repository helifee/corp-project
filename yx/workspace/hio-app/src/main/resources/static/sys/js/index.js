$(function(){
    //页面加载完成之后执行
    pageInit();
});
function pageInit(){
    var myData = [
        {"id":"0","invdate":"北京公司","name":"账户1","amount":"张三","tax":"初级","total":"类型一"},
        {"id":"1","invdate":"上海公司","name":"账户2","amount":"李四","tax":"高级","total":"类型二"}
    ];
    //创建jqGrid组件
    jQuery("#list2").jqGrid(
        {
            url : '../data/JSONData.json',//组件创建完成之后请求数据的url
            datatype : "json",//请求数据返回的类型。可选json,xml,txt
            //data: myData,
            colNames : [ 'Id', '所属机构', '帐户', '姓名', '职级','账户类型' ],//jqGrid的列显示名字
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',index : 'id',width : 55},
                {name : 'invdate',index : 'invdate',width : 180},
                {name : 'name',index : 'name asc, invdate',width : 180},
                {name : 'amount',index : 'amount',width : 180,align : "right"},
                {name : 'tax',index : 'tax',width : 180,align : "right"},
                {name : 'total',index : 'total',width : 207,align : "right"},
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        });
    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});

    jQuery("#list3").jqGrid(
        {
            url : '../data/JSONData.json',//组件创建完成之后请求数据的url
            datatype : "json",//请求数据返回的类型。可选json,xml,txt
            colNames : [ 'Id', '所属机构', '帐户', '姓名', '职级','账户类型' ],//jqGrid的列显示名字
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',index : 'id',width : 55},
                {name : 'invdate',index : 'invdate',width : 180},
                {name : 'name',index : 'name asc, invdate',width : 180},
                {name : 'amount',index : 'amount',width : 180,align : "right"},
                {name : 'tax',index : 'tax',width : 180,align : "right"},
                {name : 'total',index : 'total',width : 207,align : "right"},
            ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager3',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        });
    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    jQuery("#list3").jqGrid('navGrid', '#pager3', {edit : false,add : false,del : false});
}