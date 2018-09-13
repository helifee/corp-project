/**
* @function: 功能描述，文件导入
* @parame: 参数说明  title: 窗口名称
                     doUrl: 打开页面
                     width：窗口宽度
                     height：窗口高度
*/
function importDataExcel(title,doUrl,width,height) {
    if(!doUrl) return true;
    width = width || 500;
    height = height || 500;
    parent.$.modalDialog({
        title : title,
        width : width,
        height : height,
        href : doUrl,
        onLoad:function(){
            parent.$.modalDialog.openner= $('#module');
        }
    });
}

//上传文件
function importExcel(saveUrl){

    var uploadFileExcel = $("#uploadFileExcel");

    if(uploadFileExcel.val()==""){
        $.messager.show({
            title : '提示',
            msg : "导入文件不可为空"
        });
        return;
    }

    var fileType = (uploadFileExcel.val().substring(uploadFileExcel.val().lastIndexOf(".") + 1, uploadFileExcel.val().length)).toLowerCase();
    if (!(fileType == 'xls' || fileType == 'xlsx')) {                   
        $.messager.show({
            title : '提示',
            msg : "文件类型不正确，请上传后缀为xls或者xlsx的文件！"
        });
        return false;
    } 

    $("#uploadWait").ajaxStart(function(){
        $(this).show();
        uploadFileExcel.attr("disabled",true);
    }).ajaxComplete(function(){
        $(this).hide();
        uploadFileExcel.attr("disabled",false);
    });

    $.ajaxFileUpload({
        url: saveUrl,
        secureuri:true,
        secureuri: false,
        fileElementId:'uploadFileExcel',
        dataType: 'json',
        success: function(data) {
            var code = data.code;
            if(code == '1'){
                msg = "导入成功！";
                $.messager.show({
                    title : '提示',
                    msg : msg
                });
                parent.$.modalDialog.openner.datagrid('reload');
                parent.$.modalDialog.handler.dialog('close');
            }else{
                var errorList=  data.content;
                if(errorList!=null && errorList.length>0){
                    var errorHtml = "<tr><td style='width:400px;'>错误信息:</td></tr> ";
                    for(var i=0;i<errorList.length;i++){
                        var errorBean = errorList[i].msg;
                        errorHtml+="<tr><td>"+errorBean+"</td></tr>";
                    }
                    $("#tableId").append(errorHtml);
                }
            }
        },
        error: function() {
            showError("上传失败，请检查文件是否符合格式要求。");
        }
    });
}
