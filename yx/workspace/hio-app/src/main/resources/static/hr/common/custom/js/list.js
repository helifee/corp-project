/**
 * 创建人：like
 *
 */
/**
 * 点击高级查询的时候添加可伸缩功能
 *
 */
/*function expandedSearch() {
    var s_Area = $('.expand-search');
    var s_btn = $('.btn-adv > i');
    if(s_Area.height() == 36) {
        s_Area.css({"height":"114px"});
        s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
    }else{
        s_Area.css({"height":"36px","overflow":"hidden"});
        s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
    }
}*/
/**
 * list.html中Grid高度自适应，注：其他不同结构的页面请重新计算
 *
 */
function computeGridHeight() {
    return $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 83;
}

/**
 * grid组件初始化方法
 *
 */
function pageInit(){
    //创建jqGrid组件
    jQuery("#list2").jqGrid(
        {
            datatype : "local",//请求数据返回的类型。可选json,xml,txt
            //width:$('.container-all').width()-2,
            //height:$(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 83,
            colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes' ],//jqGrid的列显示名字
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',index : 'id',width : 55},
                {name : 'invdate',index : 'invdate',width : 90},
                {name : 'name',index : 'name asc, invdate',width : 100},
                {name : 'amount',index : 'amount',width : 80,align : "right"},
                {name : 'tax',index : 'tax',width : 80,align : "right"},
                {name : 'total',index : 'total',width : 80,align : "right"},
                {name : 'note',index : 'note',width : 150,sortable : false}
            ],
            autoWidth:true,
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            //mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            //viewrecords : true
        });
    var mydata = [
        {id : "1",invdate : "2007-10-01",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"},
        {id : "2",invdate : "2007-10-02",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
        {id : "3",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
        {id : "4",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"},
        {id : "5",invdate : "2007-10-05",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
        {id : "6",invdate : "2007-09-06",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"},
        {id : "7",invdate : "2007-10-04",name : "test",note : "note",amount : "200.00",tax : "10.00",total : "210.00"},
        {id : "8",invdate : "2007-10-03",name : "test2",note : "note2",amount : "300.00",tax : "20.00",total : "320.00"},
        {id : "9",invdate : "2007-09-01",name : "test3",note : "note3",amount : "400.00",tax : "30.00",total : "430.00"}
    ];
    for ( var i = 0; i <= mydata.length; i++){
        jQuery("#list2").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
$(function() {
    //初始化jqgrid
    pageInit();
    //$('#list2').jqGrid().setGridWidth($('.container-all').width()-2);
    //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function(e) {
        e.preventDefault();
    });
    $('.btn-adv').click(function() {
        expandedSearch();
        $('#list2').jqGrid().setGridHeight(computeGridHeight());
    });

    $.xljUtils.resizeNestedGrid();
    //grid随窗口变化高度
    //$(window).resize(function() {
    //    $('#list2').jqGrid().setGridHeight(computeGridHeight());
    //    $('#list2').jqGrid().setGridWidth($('.container-all').width()-2);
    //});
});
