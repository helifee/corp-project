
/**
 * 人员档案列表js
 */
var sysCodeSetName;

//手动的调整窗口时
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});
//计算表格的高度	1
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 100) + "px");
    //右侧table 2个列表
    $(".con-table .mytable").height((w_h - 180) / 2 + "px");
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 200) + "px");
}
//计算表格宽度
function resizeGrid() {
    //右边两个列表
    //设置table的高度比mytable高度小一点
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {

    //初始化代码项列表
    initSysCodeItemList();

    //初始化高度
    resizeHeight();
    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });

    //树加滚动条
    setTimeout(function(){
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
    },300);
    //在加载完表格后，设置表格的宽度
    resizeGrid();
});
//跳转新建代码项页面
function  add() {
    var winObjEI = window.open('sys_code_item_edit_personfile.html?sysCodeSetId='+$.xljUtils.getUrlParam("sysCodeSetId")+"&sysCodeSetName="+encodeURI(sysCodeSetName,"UTF-8"));
    var isClose = 1;
    //关闭open页面时刷新父页面列表
    var loop = setInterval(function () {
        if (winObjEI.closed && isClose == 1) {
            isClose--;
            //这里写刷新代码
            $('#sysCodeItemList').jqGrid().trigger("reloadGrid");
        }
    }, 1000);
}

/**
 * 初始化代码项列表
 */
function initSysCodeItemList() {
    //创建jqGrid组件
    jQuery("#sysCodeItemList").jqGrid(
        {
            url : baseUrl+'/sys/sysCodeItem/getSysCodeItemById',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            postData:{"code_set_id":$.xljUtils.getUrlParam("sysCodeSetId")},
            // colNames: ['code_set_id', '代码项名称', '代码项值','排序','状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name :'code_set_id',index:'code_set_id',label : 'code_set_id',editable:false,sortable:false,hidden:true,align: "center"},
                {name: 'name',index:'name', label: '人员档案名称',  align: "center"},
                {name :'id',index:'id',label : '人员档案值',editable:false,align: "center"},
                {name: 'sort',index:'sort', label: '排序',  align: "center"},
                {name: 'status',index:'status', label: '状态', align: "center",formatter:statusFmatter}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            autoWidth: true,
            rownumbers:true,
            sortname: 'sort',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            onSelectRow: function () {
                var rowId=$('#sysCodeItemList').jqGrid("getGridParam","selrow");
                rowData = $('#sysCodeItemList').jqGrid('getRowData',rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
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
                    sysCodeSetName=decodeURI(escape($.xljUtils.getUrlParam("sysCodeSetName")));
                    $("#sysCodeSetName").text("人员档案集："+sysCodeSetName);
                }
            }
        });
}

function goBack(){
    window.location.href = 'sys_serial_number_list.html?location=aType';
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
    var idsVal = $('#sysCodeItemList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
            $.ajax({
                url:baseUrl+"/sys/sysCodeItem/deleteBatch/"+idsVal,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","数据删除成功！");
                            $('#sysCodeItemList').jqGrid().trigger("reloadGrid");
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

//初始化-修改
function openUpdateView(){
    //跳转编辑页
    var idsVal = $('#sysCodeItemList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行修改！");
            return;
        }else{
            var rowId=$('#sysCodeItemList').jqGrid("getGridParam","selrow");
            rowData = $('#sysCodeItemList').jqGrid('getRowData',rowId);
            var winObjEI = window.open('sys_code_item_edit_personfile.html?id='+rowData.id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    //这里写刷新代码
                    $('#sysCodeItemList').jqGrid().trigger("reloadGrid");
                }
            }, 1000);
        }

    }else{
        $.xljUtils.tip("red", "请先选择一条记录！");
        return;
    }
}
