/**
 * @date 2017/5/13
 * @author dgh
 * @description 字典创建页面js
 *
 */
$(function () {

    /**
     * 初始化form表单数据
     */
    function initFormData() {
        var urlParams = $.xljUtils.getUrlParams();
        var act = urlParams.act;
        switch (act){
            case 'create':
                //初始化UUID
                $.ajax({
                    type:"GET",
                    url:baseUrl+"oa/content/contentChild/getGuuid?_t="+new Date().getTime(),
                    dataType:"json",
                    success: function(resultValue, textStatus) {
                        var uuid = resultValue.result;
                        $('#id').val(uuid);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                });
                $('#isSystem').val('false');
                $('temptitle').text("知识字典-新增");
                $("#editTitle").text('知识字典-新增');
                $('#contentDictionaryForm').attr('action',hostUrl+'oa/dictionary/contentDictionary/save');
                $('#contentDictionaryForm').attr('method','POST');
                break;
            case 'update':
                $('temptitle').text("知识字典-更新");
                $("#editTitle").text('知识字典-更新');
                var id = urlParams.dictionaryId;
                $.ajax({
                    url:baseUrl+'oa/dictionary/contentDictionary/get/'+id+'?time='+Math.random(),
                    type:'GET',
                    success:function (resultData) {
                        if(resultData&&resultData.success) {
                            var contentDictionary = resultData.result;
                            for(var item in contentDictionary) {
                                if($("#contentDictionaryForm :input[name='"+item+"']").length>0){
                                    $("#contentDictionaryForm :input[name='"+item+"']").val(''+contentDictionary[item]);
                                }
                            }
                            $('#contentDictionaryForm').attr('action',hostUrl+'oa/dictionary/contentDictionary/update/'+id);
                            $('#contentDictionaryForm').attr('method','PUT');

                            if(contentDictionary.isSystem) {
                                $('#formType').attr('disabled','disabled');
                                $('#code').attr('readonly','readonly');
                                $('#status').attr('disabled','disabled');
                            }
                        }
                        
                    }
                });
                break;
        }
    }
    initFormData();

    //保存按钮事件
    $('#saveBtn').on('click',function () {
        $('#contentDictionaryForm').attr('data-callback','saveFormData("save")');
        $('#contentDictionaryForm').submit();
    });

    //保存并新增按钮事件
    $('#saveAndCreateBtn').on('click',function () {
        $('#contentDictionaryForm').attr('data-callback','saveFormData("saveAndCreate")');
        $('#contentDictionaryForm').submit();
    });

    //关闭按钮事件
    $('#closeWindowBtn').on('click',function () {
       window.close();
    });
});

/**
 * 表单保存回调函数
 * @param saveType
 * @param resultData
 */
function saveFormData(saveType,resultData) {
    if(resultData&&resultData.success) {
        if(resultData.result.status||resultData.result.status=='true'){
            resultData.result.status = true;
        }else{
            resultData.result.status = false;
        }
        if(window.opener){
            window.opener.refreshDictionaryTree(resultData.result);
        }

        if(saveType=='save'){
            window.close();
        }else if(saveType=='saveAndCreate'){
            window.location.href = 'contentDictionary_edit.html?act=create';
        }
    }else {
        var errorCode = resultData.code;
        if(errorCode=='50001'){
            $.xljUtils.tip('red',resultData.msg);
        }else{
            $.xljUtils.tip('red','数据保存失败！');
        }

    }
}