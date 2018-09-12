var jqGridSysCodeSet;
var rowData;
var sysCodeSetId;

//手动的调整窗口时grid 自适应宽度
$(window).resize(function () {
    resizeGrid();
});

//计算表格宽度
function resizeGrid() {
	$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 100);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width(), true);
}

//上来就执行
$(function () {
    //初始化代码集列表
    initSysCodeSetList();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
});

function  add() {
    sysCodeSetId="";
    openPa('sys_code_set_edit.html');
}

function update(){
    //跳转编辑页
    var idsVal = $('#sysCodeSetList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行修改！");
            return;
        }else{
            var rowId=$('#sysCodeSetList').jqGrid("getGridParam","selrow");
            rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
            sysCodeSetId = rowData.sid;
            openPa('sys_code_set_edit.html');
        }
    }else{
        $.xljUtils.tip("red", "请先选择一条记录！");
        return;
    }
}

/**
 * 初始化主键ID
 */
function initUuid(){
    var uAll = hostUrl + "generator/getGuuid"+"?time="+Math.random();
    $.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
            var guuid=data.result;
            $("#sysCodeSetFrom").find("input[name='id']").val(guuid);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","初始化主键ID请求失败");
        }
    })
}
/**
 * 初始化代码集列表
 */
function initSysCodeSetList() {
    //创建jqGrid组件
    jqGridSysCodeSet = jQuery("#sysCodeSetList").jqGrid(
        {
            url : hostUrl+'/sys/sysCodeSet/queryList',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            colNames: [ '代码集名称','代码集值','代码集类型','代码集状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'name', index: 'name',editable:true, align: "center"},
                {name : 'sid',label : 'sid',editable:true,align: "center"},
                {name: 'type', index: 'type',editable:true, align: "center",formatter:typeFmatter},
                {name: 'status', index: 'status',editable:true, align: "center",formatter:statusFmatter}
            ],
			width: $(window).width(),
			height:$(window).height()-100,
            rownumbers:true,
            autoWidth: true,
            shrinkToFit: true,
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            jsonReader : {
                root:"result",
                repeatitems : false,
                id:"sid"
            },
            onSelectRow: function () {
                var rowId=$('#sysCodeSetList').jqGrid("getGridParam","selrow");
                rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            ondblClickRow:function(rowId){
                //双击跳转查看代码项页面
                rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
                window.location.href = 'sys_code_item.html?sysCodeSetId='+rowData.sid+'&sysCodeSetName='+encodeURI(rowData.name,"UTF-8");
            },
            rowNum:-1,
            loadError:function(xhr,status,error){
                //异常处理
                console.log(xhr.status);
                if(xhr.status==404){
                    $.xljUtils.tip("red","请求url有误！");
                    return;
                }
                if(xhr.status==405){
                    $.xljUtils.tip("red","请求方法有误！");
                    return;
                }
                $.xljUtils.tip("red","网络异常,请联系管理员！");
            },
            loadComplete:function(xhr){
                if(!xhr.success){
                    switch (xhr.code) {
                        case "50000":
                            $.xljUtils.tip("red",xhr.msg);
                            break;
                        case "50001":
                            $.xljUtils.tip("red",xhr.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("blue",xhr.msg);
                            break;
                        case "50003":
                            $.xljUtils.tip("red",xhr.msg);
                            break;

                        default:
                            $.xljUtils.tip("red","查询数据失败！");
                            break;
                    }
                }else{
                }
            }
        });
}
/**
 * 状态数据格式化
 */
function typeFmatter (cellvalue, options, rowObject) {
    if(cellvalue == "0"){
        return "国标";
    }else if(cellvalue == "1"){
        return "系统";
    }else if(cellvalue == "2"){
        return "用户";
    }
}
/**
 * 状态数据格式化
 */
function statusFmatter (cellvalue, options, rowObject) {
    if(cellvalue == "1"){
        return "启用";
    }else if(cellvalue == "0"){
        return "禁用";
    }
}

/**
 * 删除
 */
function del(){
    var idsVal = $('#sysCodeSetList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
            $.ajax({
                url:hostUrl+"/sys/sysCodeSet/deleteBatch/"+idsVal,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","数据删除成功！");
                            $('#sysCodeSetList').jqGrid().trigger("reloadGrid");
                        }else{
                            if(xhr.code=="50000"){
                                $.xljUtils.tip("red",xhr.msg);
                                return;
                            }
                            $.xljUtils.tip("red","数据删除失败！");
                        }
                    }else{
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        },true);
        return;
    }else{
        $.xljUtils.tip("blue","请选择要删除的数据！");
    }
}





//处理日期选择
function dateTime() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
}

//处理日期选择
function dateTime() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
}
//初始化日期控件
function dateTime1() {
    $('.form_datetime1').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });
}
//查询指标集列表
function sys_info_set(){
    window.location.href = 'sys_info_set.html';
}
//查询指标项列表
function sys_info_item(){
    window.location.href = 'sys_info_item.html';
}
//查询代码集列表
function sys_code_set(){
    window.location.href = 'sys_code_set.html';
}

