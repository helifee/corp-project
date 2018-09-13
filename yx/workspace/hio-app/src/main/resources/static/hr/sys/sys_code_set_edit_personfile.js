/**
 * 人员档案模块js
 */
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
    //初始化高度
    resizeHeight();
    $("#updateBtn").hide();
    //初始化id
    initUuid();
    //修改时初始化当前值
    getSysCodeSetInfoById();

    //初始化代码集列表
    // initSysCodeSetList();
    //初始化代码项列表
    // initSysCodeItemList();


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
function  add() {
    window.open('sys_code_set_edit.html');
}

function closeWindow() {
    window.close();
}

/**
 * 初始化主键ID
 */
function initUuid(){
    var numType = "SYSCODESET";
    var uAlla = serviceUrl + "sys/sysSerialNumber/getSysCodeItemValueByType/"+numType;
    $.ajax({
        type:'get',
        url:uAlla,
        success: function(data) {
            var setId=data.result;
            $("#sysCodeSetFrom").find("input[name='id']").val(setId);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","初始化人员档案请求失败");
        }
    });
}
function saveInfo() {
    var sysCodeSetArr= $("#sysCodeSetFrom").serializeArray();
    var sysCodeSetDto={};
    sysCodeSetDto.delflag=false;
    sysCodeSetDto.mark=1;
    for(var i in sysCodeSetArr){
        sysCodeSetDto[sysCodeSetArr[i].name]=sysCodeSetArr[i].value;
    }
    $.ajax({
        url:baseUrl+"/sys/sysCodeSet/save/",
        type:'POST',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysCodeSetDto),
        success:function (xhr) {
            if (xhr){
                if(xhr.success) {
                    closeWindow();
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
//初始化-修改
function getSysCodeSetInfoById(){
    var sysCodeSetId = window.opener.sysCodeSetId;
    if(sysCodeSetId!=""&&sysCodeSetId!=null){
        $("#saveBtn").hide();
        $("#updateBtn").show();
        var uBody = "/sys/sysCodeSet/get/"+sysCodeSetId+"?time="+Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type:'get',
            url:uAll,
            success: function(data) {
                $("#sysCodeSetFrom").find("input[name='id']").val(data.result.id);
                $("#sysCodeSetFrom").find("input[name='name']").val(data.result.name);
                $("#type").val(data.result.type);
                if(data.result.status == "1"){
                    $("input[name='status'][value='1']").attr("checked",true);
                }else{
                    $("input[name='status'][value='0']").attr("checked",true);
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化人员档案请求失败");
            }
        })
    }
}

/**
 * 修改-保存
 * @param n
 */
function updateInfo(){
    var sysCodeSetArr= $("#sysCodeSetFrom").serializeArray();
    var sysCodeSetDto={};
    var sysCodeSetID = "";
    for(var i in sysCodeSetArr){
        if(sysCodeSetArr[i].name == "id"){
            sysCodeSetID = sysCodeSetArr[i].value;
        }
        sysCodeSetDto[sysCodeSetArr[i].name]=sysCodeSetArr[i].value;
    }
    $.ajax({
        url:baseUrl+"/sys/sysCodeSet/update/"+sysCodeSetID,
        type:'put',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysCodeSetDto),
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if(successFlag) {
                    $.xljUtils.tip("green","修改成功！");
                    closeWindow();
                }else {
                    pop_tip_open("red","数据修改保存失败！"+msg);
                }
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","数据修改保存请求失败");
        }

    });
}



