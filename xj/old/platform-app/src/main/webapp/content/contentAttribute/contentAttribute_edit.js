$(function () {

    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);

    // 初始化主键ID
    function initUUId() {
        var url = baseUrl + "generator/getGuuid" + '?time=' + Math.random();
        $.ajax({
            type: 'get',
            url: url,
            success: function (data) {
                var guuid = data.result;
                $("#id").val(guuid);
            }
        });
    }

    /**
     * 初始化form表单数据
     */
    function initFormData() {
        var act = $('body').data('act');
        switch (act){
            case 'create':
                $('#temptitle').text('数据项设置-新增');
                $('#topTitle').text('数据项设置-新增');
                initUUId();
                $('#contentTypeId').val($('body').data('contentTypeId'));
                $('#formType').val('text');
                setTimeout(function () {
                    $('#formType').change();
                },100);

                break;
            case 'update':
                $('#temptitle').text('数据项设置-修改');
                $('#topTitle').text('数据项设置-修改');
                initFormDataForUpdate();
                break;
            case 'view':
                $('#temptitle').text('数据项设置-查看');
                $('#topTitle').text('数据项设置-查看');
                break;
        }
    }
    initFormData();

    /**
     * 修改数据回显
     */
    function initFormDataForUpdate() {
        var attributeId = $('body').data('id');
        $.ajax({
            type: "get",
            url: baseUrl + "oa/content/contentRowAttribute/get/" + attributeId + '?time=' + Math.random(),
            dataType: "json",
            success: function (contentObj) {
                var obj = contentObj.result;
                var inputObjs = $('#contentAttributeForm :input');
                for (var i = 0; i < inputObjs.length; i++) {
                    var obj1 = inputObjs[i];
                    var inputName = $(obj1).attr('name');
                    var inputType = $(obj1).attr('type');
                    if(inputType=='radio'){
                        if(obj1.value==(obj[inputName]+'')){
                            obj1.checked = true;
                        }
                        continue;
                    }

                    $(obj1).val(obj[inputName]);

                    if(inputName=='formType'){
                        $(obj1).change();
                    }
                }

                if(!obj.isExtendedField){
                    /*$('#formType').attr('readonly','readonly');
                    $('#fieldNameSelect').attr('readonly','readonly');
                    $('#fieldNameText').attr('readonly','readonly');
                    $('#fieldCode').attr('readonly','readonly');
                    $('#viewName').attr('readonly','readonly');
                    $('#sortNum').attr('readonly','readonly');
                    $('#searchType').attr('readonly','readonly');
                    $('input[name="isFormView"]').attr('readonly','readonly');
                    $('input[name="isRequired"]').attr('readonly','readonly');
                    $('input[name="isListView"]').attr('readonly','readonly');
                    $('input[name="isUsing"]').attr('readonly','readonly');
                    $('input[name="isReadonly"]').attr('readonly','readonly');*/
                    $('#formType').attr('disabled','disabled');
                    $('#fieldCode').attr('readonly','readonly');
                }
            }
        });
    }

    //类型下拉选择更改事件
    $('#formType').on('change',function () {
        var typeVal = $(this).val();
        switch (typeVal){
            case 'select':
                $('#fieldNameText').hide();
                $('#fieldNameSelect').show()
                changeFieldNameHtml('select');
                break;
            case 'checkbox':
                $('#fieldNameText').hide();
                $('#fieldNameSelect').show()
                changeFieldNameHtml('checkbox');
                break;
            case 'radio':
                $('#fieldNameText').hide();
                $('#fieldNameSelect').show()
                changeFieldNameHtml('radio');
                break;
            default:
                $('#fieldNameText').show();
                $('#fieldNameSelect').hide();
                $('#fieldCode').removeAttr('readonly');
                break;
        }

    });
    $('#formType').change();

    $('#fieldNameSelect').on('change',function () {
        var code = $(this).val();
        $('#fieldCode').val(code);
        $('#fieldCode').attr('readonly','readonly');
        var fieldName = $(this).find('option:selected').text();
        $('#fieldNameText').val(fieldName);
    });

    /**
     * 从字典中获取对应的select\checkbox\radio预定义属性名
     * @param code
     */
    function changeFieldNameHtml(code) {
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            url: baseUrl + 'oa/dictionary/contentDictionary/queryList',
            dataType: "json",
            data: JSON.stringify({formType: code,delflag:false,status:true}),
            success: function (data) {
                if (data.success) {
                    var attrs = data.result;
                    var selectObj = $('#fieldNameSelect');
                    selectObj.html('');
                   // $("#attributeCheck").append(selectObj);

                    selectObj.append('<option value="">请选择...</option>');
                    var fieldCode = $('#fieldCode').val();
                    for(var i=0;i<attrs.length;i++){
                        if(fieldCode==attrs[i].code){
                            selectObj.append('<option value="'+attrs[i].code+'" selected>'+attrs[i].name+'</option>');
                        }else{
                            selectObj.append('<option value="'+attrs[i].code+'">'+attrs[i].name+'</option>');
                        }

                    }

                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }


    //关闭窗口
    $('#closeWinBtn').on('click',function () {
        window.close();
    });

    //保存并新增
    $('#saveAndCreateBtn').on('click',function () {
        $('#contentAttributeForm').attr('data-validate-success','saveFormData("saveAndCreate")');
        $('#contentAttributeForm').submit();
    });

    //保存
    $('#saveBtn').on('click',function () {
        $('#contentAttributeForm').attr('data-validate-success','saveFormData("save")');
        $('#contentAttributeForm').submit();
    });


});

/**
 * 表单提交回调函数
 */
function saveFormData(saveType) {
    var subType = 'POST';
    var url = baseUrl + "oa/content/contentRowAttribute/save";
    var act = $('body').data('act');
    switch (act){
        case 'create':
            break;
        case 'update':
            var id = $('#id').val();
            url = baseUrl + "oa/content/contentRowAttribute/update/" + id;
            subType = 'PUT';
            break;
    }

    var formDatas = $('#contentAttributeForm').serializeArray();
    var formData = {};
    for (var i = 0; i < formDatas.length; i++) {
        var obj = formDatas[i];
        formData[obj.name] = obj.value;

    }

    $.ajax({
        type: subType,
        contentType: "application/json",
        url: url,
        data: JSON.stringify(formData),
        dataType: "JSON",
        success: function (result) {
            if(result&&result.success){
                if (saveType == 'saveAndCreate') {
                    if(window.opener&&$.isFunction(window.opener.reloadContentTypeAttrGrid)){
                        //window.opener.userOnId = id;
                        window.opener.reloadContentTypeAttrGrid(id);
                    }
                    window.location.href = hostUrl + 'content/contentAttribute/contentAttribute_edit.html?act=create&contentTypeId='+$('#contentTypeId').val();
                } else {
                    //window.opener.userOnId = id;
                    if(window.opener&&$.isFunction(window.opener.reloadContentTypeAttrGrid)){
                        //window.opener.userOnId = id;
                        window.opener.reloadContentTypeAttrGrid(id);
                    }
                    window.close();
                }
            }else {
                if(result.code=='50001'){
                    $.xljUtils.tip('red', '字段编码已存在！');
                    $('#fieldCode').focus();
                    return;
                }
                $.xljUtils.tip('red', '数据保存失败！');
            }

        }
    });

}
