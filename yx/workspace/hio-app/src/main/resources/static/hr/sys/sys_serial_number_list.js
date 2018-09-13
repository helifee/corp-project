
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
        applyId();
        aType();


        if(location == 'aType'){

            $(".right-content .con-tit button").siblings().removeClass("active");
            $(".aType").addClass("active");
            $("#applySettingPer").css("display", "none");
            $("#applySettingCon").css("display", "none");
            $("#pType").css("display", "none");
            $("#aType").css("display", "block");
            $("#applyId").css("display", "none");
        }


        $('#saveRowBtn').hide();
        //增行
        $("#addRowBtn").unbind('click').on('click', function () {
            addRow();
        });
        //删除
        $("#deleteRowBtn").unbind('click').on('click', function () {
            del();
        });
        //保存
        $("#saveRowBtn").unbind('click').on('click', function () {
            saveInfo();
        });

        /**
         *添加人员类别新增页面
         */
        $("#addPersonType").click(function(){
            var winObjEI =  window.open("sys_serial_persontype_add.html?type=add");
            /*var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#pTypeList").jqGrid().trigger('reloadGrid');
                }
            }, 1000);*/
        });

        /**
         *  添加人员档案新增页面
         */
        $("#addPersonFile").click(function(){
            sysCodeSetId="";
            var winObjEI = window.open('sys_code_set_edit_personfile.html');
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    //这里写刷新代码
                    $('#aTypeList').jqGrid().trigger("reloadGrid");
                }
            }, 1000);
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
                    var winObjEI = window.open('sys_code_item_edit.html?id='+rowData.id+'&type=update');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            //这里写刷新代码
                            $('#pTypeList').jqGrid().trigger("reloadGrid");
                        }
                    }, 1000);
                }

            }else{
                $.xljUtils.tip("blue", "请先选择一条记录！");
                return;
            }
        });



        /**
         * 删除人员档案
         */
        $("#delPersonFile").click(function(){
            var idsVal = $('#aTypeList').jqGrid('getGridParam','selarrrow');
            if(idsVal&&idsVal!="") {
                $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
                    $.ajax({
                        url:baseUrl+"/sys/sysCodeSet/deleteBatch/"+idsVal,
                        type:'DELETE',
                        dataType:'JSON',
                        contentType:'application/json',
                        data:JSON.stringify({}),
                        success:function (xhr,textStatus ) {
                            console.log(xhr);
                            if (xhr){
                                if(xhr.success) {
                                    $.xljUtils.tip("green","数据删除成功！");
                                    $('#aTypeList').jqGrid().trigger("reloadGrid");
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
                            url:baseUrl+"/sys/sysCodeItem/update/"+idsVal,
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
                            url:baseUrl+"/sys/sysCodeItem/update/"+idsVal,
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

        /**
         * 初始化审批设置
         */
        initConAppSetting();
        initPerAppSetting();

        /**
         * 人事信息审批设置
         */
        $("#perAppSet").click(function(){
            savePerAppSetting();
        });
        /**
         * 合同信息审批设置
         */
        $("#conAppSet").click(function(){
            saveConAppSetting();
        });
    });
    //计算高度
    function resizeHeight(){
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h-90)+"px");
        //右侧table
        $(".con-table .mytable").height((w_h-120)+"px");
        //var w = $(".row").width();//1396
        //$(".row").css("width",(w-15)+"px");
        //$(".row").css("width","1381px");
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
//初始化日期控件
function initDatetimepicker() {
    var picker = $('.datetimepicker').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });
}
/**
 * 打开新窗口
 */
function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}
//表格上面 切换：考勤期间设置/节假日设置/假期类别设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    /**
     *     if($(this).attr('class').indexOf('byuser') > 0){
    	$("#userDiv").css("display","block");//按用户的display属性设置为block（显示）
    	$("#postDiv").css("display","none");//按岗位的display属性设置为none（隐藏）
    }else{
    	$("#userDiv").css("display","none");//按用户的display属性设置为none（隐藏）
		$("#postDiv").css("display","block");//按岗位的display属性设置为block（显示）
    }
     */
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
                url : baseUrl+'sys/sysCodeItem/getSysCodeItemById',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                postData:{"code_set_id":'1019'},
                colNames: ['id','人员类别名称','排序','人员类别状态'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id',label: 'id',  hidden:true, align: "center"},
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
                    repeatitems : false
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
                    window.open('sys_code_item_edit.html?id='+rowData.id+'&type=update');
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
/**********************************************************************/

//默认加载人员档案设置
function aType(){
    var ubody = "sys/sysCodeSet/queryList";
    var uall = serviceUrl + ubody;
    //创建jqGrid组件
    jqGridPost = jQuery("#aTypeList").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"mark": 1},
            datatype: "json",
            width:$('.mytable').width(),
            height:$('.mytable').height()-45,
            rownumbers:true,
            multiselect: true,//多选
            jsonReader: {
                root: "result"
            },
            colNames: [ '人员档案名称','人员档案值','人员档案类型','人员档案状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'name', index: 'name',editable:true, align: "center"},
                {name : 'id',label : 'id',editable:true,align: "center"},
                {name: 'type', index: 'type',editable:true, align: "center",formatter:typeFmatter},
                {name: 'status', index: 'status',editable:true, align: "center",formatter:statusFmatter}
            ],
            rowNum: -1,//一页显示多少条
            pager: '#pager',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            ondblClickRow:function(rowId){
                //双击跳转查看代码项页面
                rowData = $('#aTypeList').jqGrid('getRowData',rowId);
                // window.open("sys_code_item.html");
                window.location.href = 'sys_code_item_personfile.html?sysCodeSetId='+rowData.id+'&sysCodeSetName='+encodeURI(rowData.name,"UTF-8");
            },
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "初始化单据号列表请求失败");
            },
            gridComplete: function(){
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            viewrecords: true
        }).navGrid('#pager', {add: false, edit: false, del: false, search: false, refresh: false});
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

function pageInit(tableId,pageId,colModel,mydata){
    //创建jqGrid组件
    jQuery("#"+tableId).jqGrid(
        {
            datatype : "local",//请求数据返回的类型。可选json,xml,txt
            colModel : colModel,
            multiselect : true,
            autoWidth:true,
            width: "100%",
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#'+pageId,//表格页脚的占位符(一般是div)的id
            sortname : 'aCode',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            gridComplete: function(){
            }
        });
    for ( var i = 0; i <= mydata.length; i++){
        jQuery('#'+tableId).jqGrid('addRowData', i + 1, mydata[i]);
    }
    getSize(mydata,tableId)
}
function getSize(mydata,tableId){
    var widths = $('.con-table').width();
    //alert(widths);
    var eachHeight;
    //jQuery("#"+tableId).jqGrid("setGridWidth",'1092');
    if(mydata.length<=1){
        eachHeight=100;
    }else if(mydata.length==2){
        eachHeight=50;
    }else{
        eachHeight=42;
    }
    jQuery("#"+tableId).jqGrid("setGridHeight",mydata.length*eachHeight);
    jQuery("#"+tableId).jqGrid("setGridWidth",widths);
}
//单据号设置
    function applyId(){
        var ubody = "sys/sysSerialNumber/queryList";
        var uall = serviceUrl + ubody;
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
                // onCellSelect: function (rowid) {
                //     var queryData = {
                //         "postId": rowid
                //     };
                //     jqGridPostUser.jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
                // },
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
                    url:baseUrl+"/sys/sysSerialNumber/deleteBatch/"+idsVal,
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
        sysSerialNumberDto.delflag=false;

        $.ajax({
            url:baseUrl+"/sys/sysSerialNumber/save/",
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
        var uAll = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
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

    //初始化审批设置
    function initPerAppSetting() {
        var key1 = "PER_APP_SETTING";
        var uBody = "sys/sysParameter/getValueByKey/" + key1;
        var uAll = serviceUrl + uBody;
        $.ajaxSetup({ cache:false });//在IE浏览器下，数据不写入缓存
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data.result == "0"){//不需要审批
                    $("input[name='perAppSetting'][value='0']").prop("checked",true);
                    $("input[name='perAppSetting'][value='1']").prop("checked",false);
                }else{//1需要审批
                    $("input[name='perAppSetting'][value='1']").prop("checked",true);
                    $("input[name='perAppSetting'][value='0']").prop("checked",false);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化合并计税参数请求失败");
            }
        })
    }

    //初始化审批设置
    function initConAppSetting() {
        var key1 = "CON_APP_SETTING";
        var uBody = "sys/sysParameter/getValueByKey/" + key1;
        var uAll = serviceUrl + uBody;
        $.ajaxSetup({ cache:false });//在IE浏览器下，数据不写入缓存
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data.result == "0"){//不需要审批
                    $("input[name='conAppSetting'][value='0']").prop("checked",true);
                    $("input[name='conAppSetting'][value='1']").prop("checked",false);
                }else{//1需要审批
                    $("input[name='conAppSetting'][value='1']").prop("checked",true);
                    $("input[name='conAppSetting'][value='0']").prop("checked",false);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化合并计税参数请求失败");
            }
        })
    }

    //人事信息审批设置保存
    function savePerAppSetting() {
        //判断是否已经选择值
        var val=$('input:radio[name="perAppSetting"]:checked').val();
        if(val==null){
            pop_tip_open("red","数据保存失败！审批设置不能为空");
            return false;
        }else {
            //保存更改
            $.ajax({
                url: serviceUrl + "sys/sysParameter/updateValueByKey/PER_APP_SETTING",
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({paraValue:val}),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            $.xljUtils.tip("green", "修改成功！");
                        } else {
                            pop_tip_open("red", "数据修改保存失败！" + msg);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }

            });
        }
    }

    //合同信息审批设置保存
    function saveConAppSetting() {
        //判断是否已经选择值
        var val=$('input:radio[name="conAppSetting"]:checked').val();
        if(val==null){
            pop_tip_open("red","数据保存失败！审批设置不能为空");
            return false;
        }else {
            //保存更改
            $.ajax({
                url: serviceUrl + "/sys/sysParameter/updateValueByKey/CON_APP_SETTING",
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({paraValue:val}),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            updateConAppSetting();
                            $.xljUtils.tip("green", "修改成功！");
                        } else {
                            pop_tip_open("red", "数据修改保存失败！" + msg);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }

            });
        }
    }

    /**
     * 同步到后台
     */
    function updateConAppSetting() {
        var val=$('input:radio[name="conAppSetting"]:checked').val();
        $.ajax({
            url: baseUrl+'emp/hrContAltogether/initConAppSetting',
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({paraValue:val})
        });
    }

    window.callBackType = function(editId, type) {
        focusId=editId;
        $('#'+type).jqGrid().trigger("reloadGrid");
    }
})(jQuery,window,document);