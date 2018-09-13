//手动的调整窗口时,grid 自适应宽度
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
    //初始化高度
    resizeHeight();
    type = $.xljUtils.getUrlParam("type");
    //初始化（新增&修改）
    initUuid();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
    //在加载完表格后，设置表格的宽度
    resizeGrid();

    $("#saveTypeBtn").click(function () {
        if(type=="add"){
            $("#sysCodeItemFrom").attr("data-validate-success", " window.saveInfo()");
            $("#sysCodeItemFrom").submit();
        }else if(type=="update"){
            $("#sysCodeItemFrom").attr("data-validate-success", " window.updateInfo()");
            $("#sysCodeItemFrom").submit();
        }
    });
});

function closeWindow() {
    window.close();
}

/**
 * 新增-初始化主键ID
 * 修改-初始化sysCodeItemFrom
 */
function initUuid(){
    var id = $.xljUtils.getUrlParam("id");
    var sysCodeSetId = $.xljUtils.getUrlParam("sysCodeSetId");
    var sysCodeSetName=decodeURI(escape($.xljUtils.getUrlParam("sysCodeSetName")));
    if(id!=""&&id!=null){
        var uBody = "/sys/sysCodeItem/get/"+id+"?time="+Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type:'get',
            url:uAll,
            success: function(data) {
                $("#sysCodeItemFrom").find("input[name='id']").val(data.result.id);
                $("#sysCodeItemFrom").find("input[name='code_set_id']").val(data.result.code_set_id);
                $("#sysCodeItemFrom").find("input[name='name']").val(data.result.name);
                $("#sysCodeItemFrom").find("input[name='sort']").val(data.result.sort);
                $("#sysCodeItemFrom").find("input[name='parent_name']").val(data.result.parentName);
                $("#sysCodeItemFrom").find("input[name='parent_id']").val(data.result.parent_id);
                $("#sysCodeItemFrom").find("input[name='code_set_name']").val(data.result.code_set_name);
                if(data.result.status == "1"){
                    $("input[name='status'][value='1']").attr("checked",true);
                }else{
                    $("input[name='status'][value='0']").attr("checked",true);
                }
                initCodeTree1(data.result.code_set_id);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化代码集请求失败");
            }
        })
    }else{
        $("#sysCodeItemFrom").find("input[name='code_set_id']").val(sysCodeSetId);
        $("#sysCodeItemFrom").find("input[name='code_set_name']").val(sysCodeSetName);
        // $('[class="input-group-addon hr-single-selector"]').attr({ 'data-treeParam': '{"code_set_id":"'+sysCodeSetId+'"}'});
        initCodeTree1(sysCodeSetId);
    }
}

window.saveInfo = function(){
    var numType = "SYSCODEITEM";
    var uAlla = serviceUrl + "sys/sysSerialNumber/getSysCodeItemValueByType/"+numType+"?time=" + new Date().getTime();
    $.ajax({
        type:'get',
        url:uAlla,
        success: function(data) {
            var itemId=$('#code_set_id').val()+data.result;
            var sysCodeItemArr= $("#sysCodeItemFrom").serializeArray();
            var sysCodeItemDto={};

            for(var i in sysCodeItemArr){
                if(sysCodeItemArr[i].name!="parent_name"){
                    sysCodeItemDto[sysCodeItemArr[i].name]=sysCodeItemArr[i].value;
                }
            }
            sysCodeItemDto.delflag=false;
            sysCodeItemDto.id=itemId;
            $.ajax({
                url:baseUrl+"sys/sysCodeItem/save",
                type:'POST',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify(sysCodeItemDto),
                success:function (xhr) {
                    if (xhr){
                        if(xhr.success) {
                            window.opener.sysCodeItemCallBack(xhr.result.id);
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
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","初始化代码值请求失败");
        }
    });
};


/**
 * 修改-保存
 * @param n
 */
window.updateInfo = function(){
    var sysCodeItemArr= $("#sysCodeItemFrom").serializeArray();
    var sysCodeItemDto={};
    var sysCodeItemID = $('#id').val();
    for(var i in sysCodeItemArr){
        if(sysCodeItemArr[i].name!="parent_name"){
            sysCodeItemDto[sysCodeItemArr[i].name]=sysCodeItemArr[i].value;
        }
    }
    $.ajax({
        url:baseUrl+"/sys/sysCodeItem/update/"+sysCodeItemID,
        type:'put',
        dataType:'JSON',
        contentType:'application/json',
        data:JSON.stringify(sysCodeItemDto),
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if(successFlag) {
                    $.xljUtils.tip("green","修改成功！");
                    window.opener.sysCodeItemCallBack(sysCodeItemID);
                    closeWindow();
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
 * 清空组织机构上级
 */
function empty(){
    $("#sysCodeItemFrom").find("input[id='parent_id']").val("");
    $("#sysCodeItemFrom").find("input[id='parent_name']").val("");
}

function initCodeTree1(codeSetId){
    var Options1 = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':codeSetId},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#parent_id").val(selectData.id);
            $("#parent_name").val(selectData.name);
        }
    };
    $('[class="input-group-addon hr-single-selector1"]').xljSingleSelector(Options1);
}
