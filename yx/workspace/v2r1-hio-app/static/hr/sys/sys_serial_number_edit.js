/**
 * anss
 * 单据号
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

var type;
$(function () {
    type = $.xljUtils.getUrlParam("type");
    if(type=='add'){
        $('title').text("单据号-新增");
        $(".xj-form-title").text("单据号-新增");
        initUuid();//初始化主键
    }else if(type=='edit'){
        $('title').text("单据号-修改");
        $(".xj-form-title").text("单据号-修改");
        initSysSerialNumberFrom();
    }
    $("#saveNumBtn").unbind('click').on('click', function (){
        if(type=='add'){
            $("#sysSerialNumberFrom").attr("data-validate-success", " window.saveInfo()");//保存
            $("#sysSerialNumberFrom").submit();
        }else if(type=='edit'){
            $("#sysSerialNumberFrom").attr("data-validate-success", " window.updateInfo()");//更新
            $("#sysSerialNumberFrom").submit();
        }
    });
});

/**
 * 保存
 * @param n
 */
window.saveInfo = function(){
    var sysSerialNumberArr= $("#sysSerialNumberFrom").serializeArray();
    var sysSerialNumberDto={};
    sysSerialNumberDto.delflag=0;
    for(var i in sysSerialNumberArr){
        sysSerialNumberDto[sysSerialNumberArr[i].name]=sysSerialNumberArr[i].value;
    }
    $.ajax({
        url:baseUrl+"sys/sysSerialNumber/save",
        type:'POST',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysSerialNumberDto),
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if(successFlag) {
                    $.xljUtils.tip("green","添加成功！");
                    window.opener.callBackType(resultData.result.id,'serialNumberList');
                    window.close();
                }else {
                    pop_tip_open("red","数据添加保存失败！"+msg);
                }
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","数据添加保存请求失败");
        }
    });
};

/**
 * 修改-保存
 * @param n
 */
window.updateInfo = function(){
    var id = $("#id").val();
    var sysSerialNumberDto={};
    sysSerialNumberDto.id= id;
    sysSerialNumberDto.numType=$("#numType").val();
    sysSerialNumberDto.numCode=$("#numCode").val();
    sysSerialNumberDto.ifYear=$('input:radio[name="ifYear"]:checked').val();
    sysSerialNumberDto.ifMonth=$('input:radio[name="ifMonth"]:checked').val();
    sysSerialNumberDto.ifDay=$('input:radio[name="ifDay"]:checked').val();
    sysSerialNumberDto.numLength=$("#numLength").val();
    sysSerialNumberDto.zeroType=$('input:radio[name="zeroType"]:checked').val();
    sysSerialNumberDto.stepLength=$("#stepLength").val();

    $.ajax({
        url:baseUrl+"/sys/sysSerialNumber/update/"+id,
        type:'put',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysSerialNumberDto),
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if(successFlag) {
                    $.xljUtils.tip("green","修改成功！");
                    window.opener.callBackType(id,'serialNumberList');
                    window.close();
                }else {
                    pop_tip_open("red","数据修改保存失败！"+msg);
                }
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","数据修改保存请求失败");
        }
    });
};

/**
 * 新增-初始化主键ID
 */
function initUuid(){
        var uAll = hostUrl + "generator/getGuuid"+"?time="+Math.random();
        $.ajax({
            type:'get',
            url:uAll,
            success: function(data) {
                var guuid=data.result;
                $("#sysSerialNumberFrom").find("input[name='id']").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
}

function initSysSerialNumberFrom() {
    var id = $.xljUtils.getUrlParam("id");
    var uBody = "sys/sysSerialNumber/get/"+id;
    var uAll = hostUrl + uBody;
    $.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
            $("#sysSerialNumberFrom").find("input[name='id']").val(data.result.id);
            $("#sysSerialNumberFrom").find("input[name='numType']").val(data.result.numType);
            $("#sysSerialNumberFrom").find("input[name='numCode']").val(data.result.numCode);
            $("#sysSerialNumberFrom").find("input[name='ifYear'][value='"+data.result.ifYear+"']").attr("checked",true);
            $("#sysSerialNumberFrom").find("input[name='ifMonth'][value='"+data.result.ifMonth+"']").attr("checked",true);
            $("#sysSerialNumberFrom").find("input[name='ifDay'][value='"+data.result.ifDay+"']").attr("checked",true);
            $("#sysSerialNumberFrom").find("input[name='numLength']").val(data.result.numLength);
            $("#sysSerialNumberFrom").find("input[name='zeroType'][value='"+data.result.zeroType+"']").attr("checked",true);
            $("#sysSerialNumberFrom").find("input[name='stepLength']").val(data.result.stepLength);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","初始化代码集请求失败");
        }
    })
}