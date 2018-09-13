$(function () {
    var urlParam = $.xljUtils.getUrlParams();
    //urlParam.contentTypeName = decodeURIComponent(urlParam.contentTypeName);
    //urlParam.parentName = decodeURIComponent(urlParam.parentName);


    /**
     * 修改title内容
     */
    function changeTitle(parentOperationType){
        if(parentOperationType =='create'){
            $("#title").html("知识目录-新增");
            $("#temptitle").html("知识目录-新增");
        }else{
            $("#title").html("知识目录-修改");
            $("#temptitle").html("知识目录-修改");
        }
    }

    /**
     * 系统统一入口生成ID
     */
    function initUUId(){
        var url = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
        $.ajax({
            type:'get',
            url:url,
            success: function(data) {
                var guuid=data.result;
                $("#id").val(guuid);
            }
        });
    }

    /**
     * 初始化form表单数据
     */
    function initFormData() {
        var act = urlParam.act;
        changeTitle(act);
        switch (act){
            case 'create':
                $('#parentId').val(urlParam.parentId);
                var fullPathObj = {};
                window.opener.getFullPath(urlParam.parentId,fullPathObj);
                var fullIdPathArr = fullPathObj.fullIdPathArr;
                for(var i in fullIdPathArr){
                    fullIdPathArr[i] = $.xljUtils.htmlEncode(fullIdPathArr[i]);
                }
                fullIdPathArr = fullIdPathArr.reverse();
                var fullPathArr = fullPathObj.fullPathArr;
                for(var i in fullPathArr){
                    fullPathArr[i] = $.xljUtils.htmlEncode(fullPathArr[i]);
                }
                fullPathArr = fullPathArr.reverse();
                $('#fullIdPath').val(fullIdPathArr.join('/'));
                $('#fullPath').val(fullPathArr.join('/'));
                $('#contentTypeId').val(fullIdPathArr[0]);
                $('#contentTypeName').val(fullPathArr[0]);
                $('#parentName').val(fullPathArr[fullPathArr.length-1]);

                initUUId();
                break;
            case 'update':
                var id = urlParam.id;
                $.ajax({
                    url: serviceUrl + "oa/content/contentChild/get/" + id+'?_time='+new Date().getTime(),
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (resultData) {
                        if (resultData && resultData.success) {
                            var child = resultData.result;
                            var inputObjs = $('#contentChildForm :input');
                            $.each(inputObjs,function (i,inputObj) {
                                var inputName = $(inputObj).attr('name');
                                if(inputName=='isEyeshield'||inputName=='isReply'){
                                    if(child[inputName]==true){
                                        inputObj.checked=true;
                                    }
                                }else {
                                    $(inputObj).val(child[inputName]);
                                }

                            });
                            var fullPathArr = child.fullPath?child.fullPath.split('/'):[];
                            $('#contentTypeName').val(fullPathArr[0]);
                        } else {
                            $.xljUtils.tip('red', "获取数据失败！");
                        }
                    }
                });
                break;
        }
    }
    initFormData();

    //保存
    $('#saveBtn').on('click',function () {
        $('#contentChildForm').attr('data-validate-success','saveFormData("'+urlParam.act+'","save")');
        $('#contentChildForm').submit();
    });

    //保存并新增
    $('#saveAndCreateBtn').on('click',function () {
        $('#contentChildForm').attr('data-validate-success','saveFormData("'+urlParam.act+'","saveAndCreate")');
        $('#contentChildForm').submit();
    });

    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
        window.close();
    });
});



/**
 * 保存表单数据
 * @param act
 * @param saveType
 */
function saveFormData(act,saveType) {

    var formData = {};
    var formDatas = $('#contentChildForm').serializeArray();
    for(var i=0;i<formDatas.length;i++){
        formData[formDatas[i].name] = formDatas[i].value;
    }

    if(!formData.isReply||formData.isReply==''){
        formData.isReply=false;
    }

    if(!formData.isEyeshield||formData.isEyeshield==''){
        formData.isEyeshield=false;
    }

    var url = serviceUrl + 'oa/content/contentChild/save';
    var type = 'POST';
    switch (act){
        case 'create':
            formData.delflag = false;
            break;
        case 'update':
            type = 'PUT';
            url = serviceUrl + 'oa/content/contentChild/update/'+$('#id').val();
            break;
    }

    $.ajax({
        type:type,
        url:url,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(formData),
        success: function(json){
            if(json&&json.success){

                var nodes;
                if(act=='create'){
                   window.opener.setJqGridAddedRowId(formData.id);
                    nodes = json.result;
                    window.opener.reloadChildGrid(json.result.id);
                    window.opener.addTreeNode($('#parentId').val(),nodes,'create');
                }else{
                    var node = formData;
                    node.pid = formData.parentId;
                    node.pName = formData.parentName;
                    window.opener.reloadChildGrid(node.id);
                    window.opener.addTreeNode($('#parentId').val(),node,'update');
                }

                if(saveType=='save'){
                    window.close();
                }else {
                    //返回的数据节点
                    $.xljUtils.tip('green','保存数据成功！');
                    window.location.href = 'contentChild_edit.html?act=create&parentId='+$('#parentId').val();
                }

            }else {
                $.xljUtils.tip('red',json.msg);
            }


        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });
}