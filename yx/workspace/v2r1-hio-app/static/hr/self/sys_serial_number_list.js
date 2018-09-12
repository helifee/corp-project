
;(function ($,window,document,undefined) {
var uuid;
var rowData;
var sysCodeSetName;
var focusId;
    var personId;
    $(function(){
        initPersonId();
        var location = $.xljUtils.getUrlParam("location");
        initLoadPersonTypeList();//默认加载人员类别数据
        applyId();
        favorite();
        $('#subjectName').bind('keypress',function(event){
            if(event.keyCode == "13") {
                $("#subjectNameBtn").click();
            }
        });
        var back = $.xljUtils.getUrlParam("back");
        if(back == 'favorite'){
            $(".applySettingPer").siblings().removeClass("active");
            $(".applySettingPer").addClass("active");
            $("#pType").css("display", "none");
            $("#aType").css("display", "none");
            $("#applySettingPer").css("display", "block");
            $("#applyId").css("display", "none");
            $("#applySettingCon").css("display", "none");
            //$("#orgna").css("display", "none");
            //加载单据号设置
            $('#myFavorite').bind('keypress',function(event){
                if(event.keyCode == "13") {
                    $("#myFavoriteBtn").click();
                }
            });
        } else if(back == 'history'){
            $(".applyId").siblings().removeClass("active");
            $(".applyId").addClass("active");
            $("#pType").css("display", "none");
            $("#aType").css("display", "none");
            $("#applyId").css("display", "block");
            $("#applySettingPer").css("display", "none");
            $("#applySettingCon").css("display", "none");
            //$("#orgna").css("display", "none");
            //加载单据号设置
            $('#learnHistory').bind('keypress',function(event){
                if(event.keyCode == "13") {
                    $("#learnHistoryBtn").click();
                }
            });
        }
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
                        url:hostUrl+"/sys/sysCodeSet/deleteBatch/"+idsVal,
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

//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 215);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 30, true);
}
//grid 自适应宽度
$(window).resize(function () {
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
        $('#subjectName').bind('keypress',function(event){
            if(event.keyCode == "13") {
                $("#subjectNameBtn").click();
            }
        });
    } else if ($(this).attr('class').indexOf('aType') > 0) {
        $("#pType").css("display", "none");
        $("#aType").css("display", "block");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
    }
    else if ($(this).attr('class').indexOf('applyId') > 0) {
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "block");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
        //$("#orgna").css("display", "none");
        //加载单据号设置
        $('#learnHistory').bind('keypress',function(event){
            if(event.keyCode == "13") {
                $("#learnHistoryBtn").click();
            }
        });
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
        $('#myFavorite').bind('keypress',function(event){
            if(event.keyCode == "13") {
                $("#myFavoriteBtn").click();
            }
        });
    }
    else if ($(this).attr('class').indexOf('applySettingCon') > 0) {
        initConAppSetting();
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "block");
    }
    else {
        $("#pType").css("display", "none");
        $("#aType").css("display", "none");
        $("#applyId").css("display", "none");
        $("#applySettingPer").css("display", "none");
        $("#applySettingCon").css("display", "none");
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
                url: hostUrl + 'ojt/hrOjtSubject/queryListByConditionByPage',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {
                    subjectStatus: '1009100036',
                    /*personId: $("#personId").val(),*/
                    /*timeInterval: true*/
                },
                autoWidth: true,
                width: $(window).width() - 30,
                height:$(window).height() - 215,
                colNames: ['id','课程名称', '课程学分', '课件', '讲师', '课程简介',
                   ],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', width: 200, editable: true, sortable: false, align: 'center'},
                    {name: 'credit', index: 'credit', width: 80, editable: true, sortable: false, align: 'center'},
                    {
                        name: 'kejian', index: 'kejian', width: 100, editable: true, sortable: false, align: 'center',
                        formatter: kejianFmatter
                    },
                    {
                        name: 'teacherName',
                        index: 'teacherName',
                        width: 100,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'remark',
                        index: 'remark',
                        width: 200,
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: remarkFmatter
                    }
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                // jsonReader: {
                //     root: "result",
                //     repeatitems: false
                // },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#subjectList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    rowData = $('#subjectList').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    // var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    // rowData = $('#subjectList').jqGrid('getRowData', rowId);
                    // edit_subjectId = rowData.id;
                    // window.open("ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId);
                    //+"&name="+encodeURI(rowData.name,"UTF-8")
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = null;//rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#subjectList').setSelection(rowDataBefore.id, true);
                        $('#subjectList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                    }
                }

            });
    }
    function codeFmatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHRCodeNameById(cellvalue);
    }

    function remarkFmatter(cellvalue, options, rowObject) {
        if (cellvalue == undefined) {
            return "暂未设置";
        }
        if (cellvalue.length > 10) {
            return cellvalue.substr(0, 10) + "...";
        }
        return cellvalue;
    }
    function kejianFmatter(cellvalue, options, rowObject) {
        if (cellvalue > 0) {
            var a = "<a style='color: #46A7FF;text-decoration: none' " +
                "href='#' onclick='openViewPage(\"" + rowObject.id + "\")'>查看课件 ";
            if (rowObject.canPlayCount != 0 || rowObject.urlCour != 0) {
                a += "<img style='width:12px; height:12px; margin-right:2px; margin-bottom:2px;' src='../ojt/icon_video.png'/>";
            }
            if (rowObject.cannotPlayCount != 0) {
                a += "<img style='width:12px; height:12px; margin-bottom:2px;' src='../ojt/icon_file.png'/>";
            }
            return a += "</a>";
        } else {
            return "暂无课件";
        }
    }

    window.openViewPage = function (id,status) {
        window.location.href="../ojt/ojt_subject_courseware_view.html?id=" + id + "&type=self";
    }

    window.openViewPageHistory = function (id,status,ID) {
        if(status == null || status == undefined || status == '' || status == '1009100037'){
            $.xljUtils.tip("blue",'课件已经下架！！');
            $.ajax({
                url:hostUrl+"/ojt/ojtLeranHistory/deletePseudo/"+ID,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        $('#serialNumberList').jqGrid().trigger("reloadGrid");
                    }else{
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
            return;
        }
        window.location.href="../ojt/ojt_subject_courseware_view.html?id=" + id + "&type=self_history";
    }

    window.openViewPageFavorite = function (id,status,ID) {
        if(status == null || status == undefined || status == '' || status == '1009100037'){
            $.xljUtils.tip("blue",'课件已经下架！！');
            $.ajax({
                url:hostUrl+"/ojt/hrOjtFavorite/deletePseudo/"+ID,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        $('#myFavoriteList').jqGrid().trigger("reloadGrid");
                    }else{
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
            return;
        }
        window.location.href="../ojt/ojt_subject_courseware_view.html?id=" + id + "&type=self";
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
/**********************************************************************/

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
//历史学习ojt/ojtLeranHistory
    function applyId(){
        var ubody = "ojt/ojtLeranHistory/getHistoryList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridPost = jQuery("#serialNumberList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                contentType: "application/json",
                postData: {"personId":personId },
                datatype: "json",
                autoWidth: true,
                width: $(window).width() - 30,
                height:$(window).height() - 215,
                rownumbers:true,
                multiselect: true,//多选
              /*  jsonReader: {
                    root: "result"
                },*/
                //所属课程 后台sql 查询 返回值是大写的NAME
                colNames: ['id', '课件名称', '剩余时长','所属课程','课程简介','学习次数','课程Id','课件id','人员Id','是否下架'],
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',align : "center",editable:false,hidden:true},
                    {name : 'courName', index: 'name', width: 200, editable: true, sortable: false, align: 'center',formatter: nameFormatterHistory},
                    {name : 'remainTime', index: 'remainTime', width: 200, editable: true, sortable: false, align: 'center',formatter: remainFormatter},
                    {name : 'NAME', index: 'NAME', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'remark', index: 'remark', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'playTime', index: 'playTime', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'subjectId', index: 'subjectId', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'coursewareId', index: 'coursewareId', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'personId', index: 'personId', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'subjectStatus', index: 'subjectStatus', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                ],
                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager1',//表格页脚的占位符(一般是div)的id
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

    function favorite(){
        var ubody = "ojt/hrOjtFavorite/getFavoriteList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        var queryCondition = {};
        queryCondition.coureName = null;
        queryCondition.personId = personId;
        jqGridPost = jQuery("#myFavoriteList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                contentType: "application/json",
                postData: queryCondition,
                datatype: "json",
                autoWidth: true,
                width: $(window).width() - 30,
                height:$(window).height() - 215,
                rownumbers:true,
                multiselect: true,//多选
                /*jsonReader: {
                    root: "result"
                },*/
                colNames: ['课件名称','所属课程','课程简介', '学习次数','课程Id','课件id','是否下架','id'],
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'coureName', index: 'name', width: 200, editable: true, sortable: false, align: 'center',formatter: nameFormatterFavorite},
                    {name : 'subjectName', index: 'remainTime', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'remark', index: 'subjectId', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'playTime', index: 'coursewareId', width: 200, editable: true, sortable: false, align: 'center'},
                    {name : 'subjectId', index: 'personId', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'coureId', index: 'personId', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'subjectStatus', index: 'subjectStatus', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                    {name : 'id', index: 'id', width: 200, editable: true, sortable: false, align: 'center',hidden:true},
                ],
                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
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

    //初始化审批设置
    function initPerAppSetting() {
        var key1 = "PER_APP_SETTING";
        var uBody = "sys/sysParameter/getValueByKey/" + key1;
        var uAll = hostUrl + uBody;
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
        var uAll = hostUrl + uBody;
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
                url: hostUrl + "sys/sysParameter/updateValueByKey/PER_APP_SETTING",
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
                url: hostUrl + "/sys/sysParameter/updateValueByKey/CON_APP_SETTING",
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
            url: hostUrl+'emp/hrContAltogether/initConAppSetting',
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

    function remainFormatter(cellvalue, options, rowObject) {
        if (cellvalue == null || cellvalue == '') {
          return "观看不足一分钟";
        } else if(cellvalue == "00:00:00"){
          return "已看完";
        } else {
            return cellvalue;
        }
    }
    function nameFormatter(cellvalue, options, rowObject) {
        console.log(rowObject);
        var a = "<a style='color: blue;text-decoration: underline' " +
            "href='#' onclick='openViewPage(\"" + rowObject.subjectId+ "&cId="+ rowObject.coursewareId +"\")'>"+cellvalue;
        return a += "</a>";
    }

    function nameFormatterHistory(cellvalue, options, rowObject) {
        console.log(rowObject);
        var a = "<a style='color: blue;text-decoration: underline' " +
            "href='#' onclick='openViewPageHistory(\"" + rowObject.subjectId+ "&cId="+ rowObject.coursewareId +"\",\""+ rowObject.subjectStatus +"\",\""+ rowObject.id +"\")'>"+cellvalue;
        return a += "</a>";
    }
    function nameFormatterFavorite(cellvalue, options, rowObject) {
        console.log(rowObject);
        var a = "<a style='color: blue;text-decoration: underline' " +
            "href='#' onclick='openViewPageFavorite(\"" + rowObject.subjectId+ "&cId="+ rowObject.coureId +"\",\""+ rowObject.subjectStatus +"\",\""+ rowObject.id +"\")'>"+cellvalue;
        return a += "</a>";
    }
    function initPersonId() {
        var personInfoDto = $.hrUtils.getLoginUser();
        if (personInfoDto != null) {
             personId = personInfoDto.userId;
            var personName = personInfoDto.name;
        }
    }

    $("#subjectNameBtn").click(function () {
        var queryDataPost = {
            "subjectName": $("#subjectName").val(),
        };
        $('#pTypeList').jqGrid("setGridParam", {
            postData: queryDataPost,
            page: 1
        }).trigger("reloadGrid");
    })

    $("#learnHistoryBtn").click(function () {
        var queryDataPost = {
            "name": $("#learnHistory").val(),
            "personId":personId
        };
        $('#serialNumberList').jqGrid("setGridParam", {
            postData: queryDataPost,
            page: 1
        }).trigger("reloadGrid");
    })

    $("#myFavoriteBtn").click(function () {
        var queryDataPost = {
            "coureName": $("#myFavorite").val(),
            "personId":personId
        };
        $('#myFavoriteList').jqGrid("setGridParam", {
            postData: queryDataPost,
            page: 1
        }).trigger("reloadGrid");
    })
})(jQuery,window,document);