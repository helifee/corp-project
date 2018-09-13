/**
 * @author luorongxin
 */
var id;//编辑的id
var name;//编辑的name
var oper;//操作
var rowData;//选中的数据
var uuid;
var url;//提交的地址
var type;//提交方法
$(function(){
    //初始页面
    initPage();
});
/**
 * 初始化页面
 */
function initPage(){
    //获取url参数
    id=$.xljUtils.getUrlParam("id");
    name=decodeURI(escape($.xljUtils.getUrlParam("name")));
    oper=$.xljUtils.getUrlParam("oper");
    //重置表单
    $('#noticeMsgUserConfigForm')[0].reset();
    $("#closeNoticeMsgUserConfigBtn").on("click",function(){
        document.getElementById("noticeMsgUserConfigForm").reset();
    });
    //绑定按钮事件
    //保存窗口
    $("#saveNoticeMsgUserConfigBtn").on('click',function () {
        //表单提交
        submitForm();
    });
    //关闭当前页面
    $("#closeNoticeMsgUserConfigBtn").on('click',function () {
        document.getElementById("noticeMsgUserConfigForm").reset();
        window.close();
    });
    if(oper=="add"){
        $('title').text("外部用户消息配置-新增");
        $(".xj-form-title").text("外部用户消息配置-新增");
        //初始化UUID
        $.ajax({
            type:"GET",
            url:baseUrl+"oa/content/contentChild/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            success: function(resultValue, textStatus) {
                uuid = resultValue.result;
                $('#id').val(uuid);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });

        url = baseUrl+'/flow/sysNoticeMsgUserConfig/save';
        type= "POST";

    }else if(oper=="edit"){
        $('title').text("外部用户消息配置-修改");
        $(".xj-form-title").text("外部用户消息配置-修改");
        url = baseUrl+'flow/sysNoticeMsgUserConfig/get/'+id;
        type= "GET";
        editNoticeMsgUserConfig(id);
        //新增url type
        url = baseUrl+'flow/sysNoticeMsgUserConfig/update/'+id;
        type= "PUT";
    }
}
/**
 * 表单保存提交
 */
function submitForm(){

    //表单提交
    submit();
}
/**
 * 表单提交方法
 */
function submit() {
    if($("#noticeMsgUserConfigForm").valid()){
        var formElements = $("#noticeMsgUserConfigForm").serializeArray();
        var postData = {};
        for(var i in formElements){
            var item = formElements[i];
            postData[item.name] = item.value;
        }
        $.ajax({
            type:type,
            url:url+'?time='+Math.random(),
            data:JSON.stringify(postData),
            dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function(xhr) {
                if(xhr){
                    if(xhr.success){
                        var editObjData = xhr.result;
                        document.getElementById("noticeMsgUserConfigForm").reset();
                        if(window.opener != null){
                            if (oper == 'add') {
                                window.opener.setJqGridAddedRowId(postData.id);
                            }
                            //刷新父页面grid
                            window.opener.reloadGrid();
                        }
                        window.close();
                    }else{
                        //异常处理

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
                                $.xljUtils.tip("red","服务异常,请联系管理员！");
                                break;
                        }
                    }

                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }
}
/**
 * 编辑浮动窗口
 * @param
 */
function editNoticeMsgUserConfig(id){
    var formElements = $("#noticeMsgUserConfigForm").serializeArray();
    $.ajax({
        type:'GET',
        url:url+'?time='+Math.random(),
        dataType:"json",
        contentType: "application/json;charset=utf-8",
        success: function(xhr) {
            if(xhr){
                if(xhr.success){
                    var editObjData = xhr.result;
                    for (var i in formElements) {
                        var inputName = formElements[i].name;
                        var inputVal;
                        if(inputName == 'id'){
                            inputVal = editObjData.id;
                        }
                        if(inputName == 'userName'){
                            inputVal = editObjData.userName;
                        }
                        if(inputName == 'loginName'){
                            inputVal = editObjData.loginName;
                        }
                        if(inputName == 'postUrl'){
                            inputVal = editObjData.postUrl;
                        }
                        if(inputName == 'modifyUrl'){
                            inputVal = editObjData.modifyUrl;
                        }
                        if(inputName == 'tendCode'){
                            inputVal = editObjData.tendCode;
                        }
                        $("#noticeMsgUserConfigForm :input[name='"+inputName+"']").val(inputVal);
                    }

                }else{
                    //异常处理

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
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                            break;
                    }
                }

            }else{
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            $.xljUtils.tip("red","服务异常,请联系管理员！");
        }

    });

}
