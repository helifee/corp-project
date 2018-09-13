/**
 * lixd
 * 人员类别新增js
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
    initUuid();//初始化表单
    //保存数据
    $("#saveTypeBtn").click(function(){
        $("#personTypeAddFrom").attr("data-validate-success", "window.saveInfo()");
        $("#personTypeAddFrom").submit();
    });

});

function closeWindow() {
    window.parent.location.reload();
    window.parent.closePa();
}

/**
 * 保存
 * @param n
 */
window.saveInfo = function(){
    var sysCodeItemArr= $("#personTypeAddFrom").serializeArray();
    var sysCodeItemDto={};
    sysCodeItemDto.delflag=0;
    for(var i in sysCodeItemArr){
        if(sysCodeItemArr[i].name!="parent_name"){
            sysCodeItemDto[sysCodeItemArr[i].name]=sysCodeItemArr[i].value;
        }
    }
    $.ajax({
        url:hostUrl+"sys/sysCodeItem/save/",
        type:'POST',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysCodeItemDto),
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if(successFlag) {
                    $.xljUtils.tip("green","添加成功！");
                    // window.opener.callBackType(resultData.result.id,'pTypeList');
                    // closeWindow();
                    window.parent.closePa();
                    window.parent.location.reload();
                }else {
                    pop_tip_open("red","数据添加保存失败！"+msg);
                }
            }
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","数据添加保存请求失败");
        }
    });
}

/**
 * 新增-初始化主键ID
 * 修改-初始化personTypeAddFrom
 */
function initUuid(){
        var uAll = hostUrl + "generator/getGuuid"+"?time="+Math.random();
        $.ajax({
            type:'get',
            url:uAll,
            success: function(data) {
                var guuid=data.result;
                $("#personTypeAddFrom").find("input[name='id']").val(guuid);
                $("#personTypeAddFrom").find("input[name='code_set_id']").val('1019');
                $("#personTypeAddFrom").find("input[name='code_set_name']").val('人员类别');
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
}