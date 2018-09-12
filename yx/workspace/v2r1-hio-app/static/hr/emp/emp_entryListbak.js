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
 * 打开新窗口
 */
function openNewWindow(src,minus) {
    window.open(src, 'width=' + (window.screen.availWidth - 180)+',height='+ (window.screen.availHeight - minus) + ',top=0, left=90,menubar=no, scrollbars=0');
}

function closeWindow() {
    window.close();
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
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'aCode',label : '申请编号',width : 150,align : "center"},
                {name : 'title',label : '主题',width : 150,align : "center"},
                {name : 'atype',label : '审批状态',width : 100,align : "center"},
                {name : 'aperson',label : '当前审批人',width : 100,align : "center"},
                {name : 'properson',label : '经办人',width : 100,align : "center"},
                {name : 'atime',label : '申请日期',width : 100,align : "center"},
            ],
            multiselect : true,
            rownumbers: true,
            autoWidth:true,
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'aCode',//初始化的时候排序的字段
            sortorder : "desc"//排序方式,可选desc,asc
            //mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            //viewrecords : true
        });
    var mydata = [
        {aCode:"XY-2017-031",title : "张乐入职申请",atype : "草稿", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-032",title : "李华入职申请",atype : "审批中", aperson : "王强",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-033",title : "张孟凡入职申请",atype : "审批中", aperson : "王强",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-034",title : "李存孝入职申请",atype : "审批完成", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-035",title : "赵明入职申请",atype : "审批中", aperson : "王强",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-036",title : "王晨妍入职申请",atype : "审批完成", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-037",title : "叶耀魁入职申请",atype : "审批完成", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-038",title : "林动入职申请",atype : "草稿", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-039",title : "张子凡入职申请",atype : "草稿", aperson : "--",properson: "陈光",atime : "2017-01-03"},
        {aCode:"XY-2017-040",title : "李爱国入职申请",atype : "审批完成", aperson : "--",properson: "陈光",atime : "2017-01-03"},

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
