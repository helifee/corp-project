/**
 * Created by luoro on 2017/8/5.
 */

$(function () {
    echoData();
   //按鈕事件
    bindButtons();
})
/**
 * 綁定按鈕事件
 */
function bindButtons() {
    $('#saveBtn').click(function () {
        submitSettingForm();
    });
    $('#editBtn').click(function () {
        $('#editBtn').hide();
        $('.hide-class').show();
        $('.hideBtn').show();
        $("#settingForm input[type='text']").each(function (index,item) {
            if(item.name=='exceptionFlTemplateName'||item.name=='privilegedPersonName'
                ||item.name=='approvePersonName'){
            }else{
                $(item).removeAttr('readonly');
            }
        });
        $("#settingForm input[type='radio']").each(function (index,item) {
            $(item).removeAttr('disabled');
        });
        $('.form_datetime').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii:ss',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            startDate: new Date()
        });
    });
    $('#closeBtn').click(function () {
        $('.hideBtn').hide();
        $('.hide-class').hide();
        $('#editBtn').show();
        $("#settingForm input[type='text']").each(function (index,item) {
            $(item).attr('readonly','readonly');
        });
        $("#settingForm input[type='radio']").each(function (index,item) {
            $(item).attr('disabled',true);
        });
        document.getElementById("settingForm").reset();
        echoData();
    });
}
//表单提交
function submitSettingForm() {

   var OverdueSettingDto = {};
   var saveType = 'edit';
    var url ='';
    var method = '';
    $.xljUtils.customSingleValidate($('#settingForm')[0]);
    if(!$('#settingForm').valid()){
        return;
    }
    var formFields = $('#settingForm').serializeArray();
    for(var i=0;i<formFields.length;i++) {
        if(formFields[i].name=='id'&&(formFields[i].value==''||(formFields[i].value==undefined))){
            saveType = 'save';
        }
        if(formFields[i].name=='isWorkDay'){
            OverdueSettingDto.workDay = formFields[i].value == "true"? true:false;
        }else if(formFields[i].name=='approveHours'){
            OverdueSettingDto.approveHours =  formFields[i].value;
        }else{
            OverdueSettingDto[formFields[i].name]=$.xljUtils.htmlDecode(formFields[i].value);
        }
    }
    // $("#settingForm input").each(function (index,item) {
    //
    //     OverdueSettingDto[item.name] = item.value;
    // })
   if(saveType == 'save'){
      url = serviceUrl+'flow/overdueSetting/save';
       method = 'POST';
       OverdueSettingDto.id =  getGuuid('id');
   }else if(saveType = 'edit'){
       url = serviceUrl+'flow/overdueSetting/update/'+OverdueSettingDto.id+'?_t='+new Date().getTime();
       method = 'PUT';
   }
    $.ajax({
        url:url,
        data:JSON.stringify(OverdueSettingDto),
        type:method,
        contentType:'application/json',
        dataType:'JSON',
        success:function (resultData ) {
            if(resultData) {
                var successFlag = resultData.success;
                var result = resultData.result;
                var msg = resultData.msg;
                if(successFlag){
                    $.xljUtils.tip('green','保存成功！');
                    $('.hideBtn').hide();
                    $('#editBtn').show();
                    document.getElementById("settingForm").reset();
                    echoData();
                }else{
                    switch (resultData.code) {
                        case "50000":
                            $.xljUtils.tip("red",resultData.msg);
                            break;
                        case "50001":
                            $.xljUtils.tip("red",resultData.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("blue",resultData.msg);
                            break;
                        case "50003":
                            $.xljUtils.tip("red",resultData.msg);
                            break;

                        default:
                            $.xljUtils.tip("blue","系统繁忙，请稍后！");
                            break;
                    }
                }

            }

        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            var status = XMLHttpRequest.status;
            $.xljUtils.getError(status);
        }
    });

}


/**
 * 获取Guuid
 *
 * @param id  表单Guuid隐藏于ID
 */
function getGuuid(id) {
    var guuid = "";
    if(typeof id != "undefined"){
        $.ajax({
            type:'get',
            async:false,
            url: serviceUrl+'sys/uuid/generator/getGuuid'+"?time="+Math.random(),
            success: function(data) {
                guuid = data.result;
                $("#"+id).val(guuid);
            },
            error: function(xhr){
                $.xljUtils.getError(xhr.status);
            }
        });
    }else{
        $.ajax({
            type:'get',
            async:false,
            url: serviceUrl+'sys/uuid/generator/getGuuid'+"?time="+Math.random(),
            success: function(data) {
                guuid = data.result;
            },
            error: function(xhr){
                $.xljUtils.getError(xhr.status);
            }
        });
    }
    return guuid;
}

/***
 *  清除
 */
function clearInput(id,name) {
    $('#'+id).val('');
    $('#'+name).val('');
}
/**
 * 回显数据
 */
function echoData() {
    $.ajax({
        type:'get',
        url: serviceUrl+'flow/overdueSetting/get/setting'+"?time="+Math.random(),
        success: function(data) {
            if(data.success){
                var result = data.result;
                $("#settingForm input[type='text']").each(function (index,item) {
                    item.value = result[item.name];
                    $(item).attr('readonly','readonly');
                });
                $("#settingForm input[type='radio']").each(function (index,item) {
                    if(item.name=='workDay'){
                        $('#settingForm :input[name="isWorkDay"][value="'+result[item.name]+'"]')[0].checked=true;
                    }else{
                        $('#settingForm :input[name="'+item.name+'"][value="'+result[item.name]+'"]')[0].checked=true;
                    }
                    $(item).attr('disabled',true);
                });
                $("#settingForm input[type='hidden']").each(function (index,item) {
                    item.value = result[item.name];
                });
                $('.hide-class').hide();
            }else{
                $("#settingForm input[type='text']").each(function (index,item) {
                    $(item).attr('readonly','readonly');
                });
                $("#settingForm input[type='radio']").each(function (index,item) {
                    $(item).attr('disabled',true);
                });
                $('.hide-class').hide();
            }
        },
        error: function(xhr){
            $.xljUtils.getError(xhr.status);
        }
    });
}

