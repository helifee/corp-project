;(function ($,window,document,undefined) {
var uuid;
var rowData;
var sysCodeSetName;
var focusId;
    $(function(){
        var location = $.xljUtils.getUrlParam("location");
        initLoadPersonTypeList();//默认加载人员类别数据
        resizeHeight();
        resizeGrid();
        //pType();
        //aType();
        // applyId();
        // aType();

        if(location == 'aType'){
            $(".right-content .con-tit button").siblings().removeClass("active");
            $(".aType").addClass("active");
            $("#applySettingPer").css("display", "none");
            $("#applySettingCon").css("display", "none");
            $("#pType").css("display", "none");
            $("#aType").css("display", "block");
            $("#applyId").css("display", "none");
        }

        /**
         *添加人员类别新增页面
         */
        $("#addPersonType").click(function(){
            openPa("sys_serial_persontype_add.html?type=add");
        });


        //初始化-修改
        $("#editPersonType").click(function(){
            //跳转编辑页
            var idsVal = $('#pTypeList').jqGrid('getGridParam','selarrrow');
            if(idsVal&&idsVal!="") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行修改！");
                    return;
                }else{
                    var rowId=$('#pTypeList').jqGrid("getGridParam","selrow");
                    rowData = $('#pTypeList').jqGrid('getRowData',rowId);
                    openPa('sys_code_item_edit.html?id='+rowData.sid+'&type=update');
                }

            }else{
                $.xljUtils.tip("blue", "请先选择一条记录！");
                return;
            }
        });

        /**
         * 刪除人员类别
         */
        $("#deletePersonTypeRecord").click(function(){
            deletePersonTypeRecord();
        });

        //todo 启用人员类别
        $('#enableBtn').click(function () {
            var idsVal = $('#pTypeList').jqGrid('getGridParam','selarrrow');
            if(idsVal&&idsVal!=""){
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var rowData = $("#pTypeList").jqGrid('getRowData',idsVal);
                    if(rowData.status == "启用"){
                        $.xljUtils.tip("blue", "已经启用，请勿重复操作！");
                    }else{
                        var sysCodeItemDto = {};
                        sysCodeItemDto.status = 1;
                        $.ajax({
                            url:hostUrl+"/sys/sysCodeItem/update/"+idsVal,
                            type:'put',
                            dataType:'JSON',
                            contentType:'application/json',
                            data:JSON.stringify(sysCodeItemDto),
                            success:function (resultData ) {
                                if(resultData) {
                                    var successFlag = resultData.success;
                                    var msg = resultData.msg;
                                    if(successFlag) {
                                        $.xljUtils.tip("green","启用成功！");
                                        $("#pTypeList").jqGrid().trigger('reloadGrid');
                                    }else {
                                        pop_tip_open("red","启用失败！"+msg);
                                    }
                                }
                            },error:function(XMLHttpRequest, textStatus, errorThrown){
                                pop_tip_open("red","启用失败");
                            }
                        });
                    }
                }
            }else{
                $.xljUtils.tip("blue", "请选择启用的数据！");
            }
        });

        //todo 禁用人员类别
        $('#disableBtn').click(function () {
            var idsVal = $('#pTypeList').jqGrid('getGridParam','selarrrow');
            if(idsVal&&idsVal!=""){
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var rowData = $("#pTypeList").jqGrid('getRowData',idsVal);
                    if(rowData.status == "禁用"){
                        $.xljUtils.tip("blue", "已经禁用，请勿重复操作！");
                    }else{
                        var sysCodeItemDto = {};
                        sysCodeItemDto.status = 0;
                        $.ajax({
                            url:hostUrl+"/sys/sysCodeItem/update/"+idsVal,
                            type:'put',
                            dataType:'JSON',
                            contentType:'application/json',
                            data:JSON.stringify(sysCodeItemDto),
                            success:function (resultData ) {
                                if(resultData) {
                                    var successFlag = resultData.success;
                                    var msg = resultData.msg;
                                    if(successFlag) {
                                        $.xljUtils.tip("green","禁用成功！");
                                        $("#pTypeList").jqGrid().trigger('reloadGrid');
                                    }else {
                                        pop_tip_open("red","禁用失败！"+msg);
                                    }
                                }
                            },error:function(XMLHttpRequest, textStatus, errorThrown){
                                pop_tip_open("red","禁用失败");
                            }
                        });
                    }
                }
            }else{
                $.xljUtils.tip("blue", "请选择禁用的数据！");
            }
        });

    });
    //计算高度
    function resizeHeight(){
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h-120)+"px");
    }

//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    $.xljUtils.gridResizeFn();
}
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});
//表格上面 切换：考勤期间设置/节假日设置/假期类别设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('pType') > 0) {
        $("#pType").css("display", "block");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "none");
        //加载人员类别设置
        initLoadPersonTypeList();
    } else if ($(this).attr('class').indexOf('aType') > 0) {
        $("#pType").css("display", "none");
        $("#aType").css("display", "block");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "none");
        //人员档案设置
        //aType();

    }
    else if ($(this).attr('class').indexOf('applyId') > 0) {
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "block");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "none");
        //加载单据号设置
    }
    else if ($(this).attr('class').indexOf('applySettingPer') > 0) {
        initPerAppSetting();
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applySettingPer").css("display", "block");
        $("#applyId").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "none");
        //加载单据号设置
    }
    else if ($(this).attr('class').indexOf('applySettingCon') > 0) {
        initConAppSetting();
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "block");
        //$("#orgna").css("display", "none");
        //加载单据号设置
    }
    else {
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "block");
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});

/**********************************************************************/
//加载人员类别数据
    function initLoadPersonTypeList() {
        //创建jqGrid组件
        jQuery("#pTypeList").jqGrid(
            {
                url : hostUrl+'sys/sysCodeItem/getSysCodeItemById',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                postData:{"code_set_id":'1019'},
                colNames: ['sid','人员类别名称','排序','人员类别状态'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'sid', index: 'sid',label: 'sid',  hidden:true, align: "center"},
                    {name: 'name', index: 'name',label: '人员类别名称',  align: "center",sortable:false},
                    {name: 'sort', index: 'sort',label: '排序',  align: "center"},
                    {name: 'status', index: 'status', label: '人员类别状态',align: "center",formatter:statusFmatter}
                ],
                width:$('.mytable').width(),
                height:$('.mytable').height(),
                autoWidth: true,
                rownumbers:true,
                sortname: 'sort',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader : {
                    root:"result",
                    repeatitems : false,
                    id:"sid"
                },
                onSelectRow: function () {
                    var rowId=$('#sysCodeItemList').jqGrid("getGridParam","selrow");
                    rowData = $('#sysCodeItemList').jqGrid('getRowData',rowId);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    if(focusId != null && focusId != '') {
                        $("#pTypeList").jqGrid('setSelection',focusId);
                    }
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    rowData = $('#pTypeList').jqGrid('getRowData',rowid);
                    //跳转编辑页
                    openPa('sys_code_item_edit.html?id='+rowData.sid+'&type=update');
                },
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
                        $("#sysCodeSetName").text("代码集："+sysCodeSetName);
                    }
                }
            });
    }
    /**
     * 删除人员
     */
    function deletePersonTypeRecord(){
        var idsVal = $('#pTypeList').jqGrid('getGridParam','selarrrow');
        if(idsVal&&idsVal!="") {
            $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
                $.ajax({
                    url:hostUrl+"/sys/sysCodeItem/deleteBatch/"+idsVal,
                    type:'DELETE',
                    dataType:'JSON',
                    contentType:'application/json',
                    data:JSON.stringify({}),
                    success:function (xhr,textStatus ) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","数据删除成功！");
                                $('#pTypeList').jqGrid().trigger("reloadGrid");
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

    //单据号设置
    function applyId(){
        var ubody = "sys/sysSerialNumber/queryList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridPost = jQuery("#serialNumberList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                contentType: "application/json",
                // postData: {"orgId": ""},
                datatype: "json",
                width:$('.mytable').width(),
                height:$('.mytable').height()-45,
                rownumbers:true,
                multiselect: true,//多选
                jsonReader: {
                    root: "result"
                },
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',align : "center",editable:false,hidden:true},
                    {name : 'numType',label : '单据类型',align : "center",editable:true,edittype:"text"},
                    {name : 'numCode',label : '单据类型编号',align : "center",editable:true,edittype:"text"},
                    {name : 'ifYear',label : '年',align : "center",editable:true,edittype:"checkbox",editoptions:{value:"0:1"},editrules:{required:true},formatter:statusFmatter},
                    {name : 'ifMonth',label : '月',align : "center",editable:true,edittype:"checkbox",editoptions:{value:"0:1"},formatter:statusFmatter},
                    {name : 'ifDay',label : '日',align : "center",editable:true,edittype:"checkbox",editoptions:{value:"0:1"},formatter:statusFmatter},
                    {name : 'numLength',label : '流水号长度',align : "center",number:true,editable:true,edittype:"text"},
                    {name : 'zeroType',label : '流水号归零',align : "center",editable:true,edittype:"checkbox",editoptions:{value:"0:1"},formatter:statusFmatter},
                    // {name : 'maxVal',label : '最大值',align : "center",editable:true,edittype:"text"},
                    {name : 'stepLength',label : '步长',align : "center",editable:true,edittype:"text"}
                ],
                rowNum: -1,//一页显示多少条
                pager: '#pager',//表格页脚的占位符(一般是div)的id
                sortname: 'id',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "初始化单据号列表请求失败");
                },
                gridComplete: function(){
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    if(focusId != null && focusId != '') {
                        $("#serialNumberList").jqGrid('setSelection',focusId);
                    }
                },
                ondblClickRow:function(rowId){
                    //双击跳转查看代码项页面
                    rowData = $('#serialNumberList').jqGrid('getRowData', rowId);
                    var winObjEI = window.open('sys_serial_number_edit.html?id='+ rowData.id+'&type=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            //这里写刷新代码
                            $('#serialNumberList').jqGrid().trigger("reloadGrid");
                        }
                    }, 1000);
                },
                viewrecords: true
            }).navGrid('#pager', {add: false, edit: false, del: false, search: false, refresh: false});
    }
    /**
     * 删除
     */
    function del(){
        var idsVal = $('#serialNumberList').jqGrid('getGridParam','selarrrow');
        if(idsVal&&idsVal!="") {
            $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
                $.ajax({
                    url:hostUrl+"/sys/sysSerialNumber/deleteBatch/"+idsVal,
                    type:'DELETE',
                    dataType:'JSON',
                    contentType:'application/json',
                    data:JSON.stringify({}),
                    success:function (xhr,textStatus ) {
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","数据删除成功！");
                                $('#serialNumberList').jqGrid().trigger("reloadGrid");
                                $('#addRowBtn').show();
                                $('#saveRowBtn').hide();
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
    function addRow() {
        var tableObject = $('#serialNumberList');
        //获取表格的初始model
        var colModel = tableObject.jqGrid().getGridParam("colModel") ;
        var newRow = JSON.stringify(colModel);
        var ids = tableObject.jqGrid('getDataIDs');
        //如果jqgrid中没有数据 定义行号为1 ，否则取当前最大行号+1
        var rowId = (ids.length ==0 ? 1: Math.max.apply(Math,ids)+1);
        //获得新添加行的行号（负数:与编辑行差别对待）
        var newRowId = (0-rowId);
        //设置grid单元格不可编辑 （防止在添加时，用户修改其他非添加行的数据）
        tableObject.setGridParam({cellEdit:false});
        //将新行追加到表格头部
        tableObject.jqGrid("addRowData", newRowId,newRow,"first");
        //设置grid单元格可编辑（防止追加行后，可编辑列无法编辑）
        tableObject.jqGrid('editRow', newRowId, true);
        //新增行是被选中状态
        $("#serialNumberList").setSelection(newRowId);
        $('#addRowBtn').hide();
        $('#saveRowBtn').show();
        //此处初始化主键id
        initUuid();
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

    function saveInfo() {
        var rowId=$('#serialNumberList').jqGrid("getGridParam","selrow");
        rowData = $('#serialNumberList').jqGrid('getRowData',rowId);
        var sysSerialNumberDto={};
        sysSerialNumberDto.id=uuid;
        sysSerialNumberDto.numType=$("#"+rowId+"_numType").val();
        sysSerialNumberDto.numCode=$("#"+rowId+"_numCode").val();
        sysSerialNumberDto.ifYear=$("#"+rowId+"_ifYear").val();
        sysSerialNumberDto.ifMonth=$("#"+rowId+"_ifMonth").val();
        sysSerialNumberDto.ifDay=$("#"+rowId+"_ifDay").val();
        sysSerialNumberDto.numLength=$("#"+rowId+"_numLength").val();
        sysSerialNumberDto.zeroType=$("#"+rowId+"_zeroType").val();
        // sysSerialNumberDto.maxVal=$("#"+rowId+"_maxVal").val();
        sysSerialNumberDto.stepLength=$("#"+rowId+"_stepLength").val();
        // sysSerialNumberDto.initValue=$("#"+rowId+"_initValue").val();
        sysSerialNumberDto.delflag=0;

        $.ajax({
            url:hostUrl+"/sys/sysSerialNumber/save/",
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(sysSerialNumberDto),
            success:function (xhr) {
                if (xhr){
                    if(xhr.success) {
                        $.xljUtils.tip("green","保存成功！");
                        $('#serialNumberList').jqGrid().trigger("reloadGrid");
                        $('#addRowBtn').show();
                        $('#saveRowBtn').hide();
                    }else{
                        if(xhr.code=="50000"){
                            $.xljUtils.tip("red",xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red","保存失败！");
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
                uuid=data.result;
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    }

    $("#saveBtn").unbind('click').on('click', function () {
        var winObjEI = window.open('sys_serial_number_edit.html?type=add');
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {
                isClose--;
                //这里写刷新代码
                $('#serialNumberList').jqGrid().trigger("reloadGrid");
            }
        }, 1000);
    });
    $("#updateBtn").unbind('click').on('click', function () {
        var idsVal = $('#serialNumberList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#serialNumberList').jqGrid("getGridParam", "selrow");
                rowData = $('#serialNumberList').jqGrid('getRowData', rowId);
                var winObjEI = window.open('sys_serial_number_edit.html?id='+ rowData.id+'&type=edit');
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //这里写刷新代码
                        $('#serialNumberList').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    });

    window.callBackType = function(editId, type) {
        focusId=editId;
        $('#'+type).jqGrid().trigger("reloadGrid");
    }
})(jQuery,window,document);