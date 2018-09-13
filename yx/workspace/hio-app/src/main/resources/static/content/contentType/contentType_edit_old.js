$(function () {
    //初始化主键ID
    function initUUId() {
        var url = serviceUrl + "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: url,
            async:false,
            success: function (data) {
                var guuid = data.result;
                $("#id").val(guuid);
            }
        })
    }

    /**
     * 初始化contentType数据，为更新操作使用
     * @param contentTypeId
     */
    function getContentTypeForUpdate(contentTypeId) {
        $.ajax({
            url:serviceUrl + 'oa/content/contentType/get/'+contentTypeId,
            type:'GET',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    var contentType = resultData.result;
                    for(var item in contentType){

                        if(item == "displayPortal"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            $('#businessObjectForm :input[name="'+item+'"][value="'+contentType[item]+'"]')[0].checked=true;
                            continue;
                        }
                        $('#businessObjectForm :input[name="'+item+'"]').val(contentType[item]);
                    }

                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }

    /**
     * 获取大类相关权限，为更新
     * @param contentTypeId
     */
    function getContentAuthorForUpdate(contentTypeId){
        $.ajax({
            url:serviceUrl + 'oa/content/contentAuthor/queryList',
            type:'POST',
            data:JSON.stringify({typeId:contentTypeId}),
            dataType:'JSON',
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var contentAuthorList = resultData.result;
                    var defaultReader = {};
                    defaultReader.typeName = 'DEFAULT_READER';
                    defaultReader.participantType = null;
                    defaultReader.personId = [];
                    defaultReader.participant = [];


                    var fileDownload = {};
                    fileDownload.typeName = 'FILE_DOWNLOAD';
                    fileDownload.participantType = null;
                    fileDownload.personId = [];
                    fileDownload.participant = [];

                    var fileView = {};
                    fileView.typeName = 'FILE_VIEW';
                    fileView.participantType = null;
                    fileView.personId = [];
                    fileView.participant = [];

                    var fileEdit = {};
                    fileEdit.typeName = 'FILE_EDIT';
                    fileEdit.participantType = null;
                    fileEdit.personId = [];
                    fileEdit.participant = [];

                    for(var i=0;i<contentAuthorList.length;i++){
                        var contentAuthor = contentAuthorList[i];
                        var typeName = contentAuthor.typeName;
                        switch (typeName){
                            case 'DEFAULT_READER':
                                defaultReader.participantType = contentAuthor.participantType;
                                defaultReader.participant.push(contentAuthor.participant);
                                defaultReader.personId.push(contentAuthor.personId);
                                break;
                            case 'FILE_DOWNLOAD':
                                fileDownload.participantType = contentAuthor.participantType;
                                fileDownload.participant.push(contentAuthor.participant);
                                fileDownload.personId.push(contentAuthor.personId);
                                break;
                            case 'FILE_VIEW':
                                fileView.participantType = contentAuthor.participantType;
                                fileView.participant.push(contentAuthor.participant);
                                fileView.personId.push(contentAuthor.personId);
                                break;
                            case 'FILE_EDIT':
                                fileEdit.participantType = contentAuthor.participantType;
                                fileEdit.participant.push(contentAuthor.participant);
                                fileEdit.personId.push(contentAuthor.personId);
                                break;
                        }
                    }

                    //默认阅读者
                    $('#defaultReaderPersonId').val(defaultReader.personId.join(','));
                    $('#defaultReaderParticipantType').val(defaultReader.participantType?defaultReader.participantType:'person');
                    $('#defaultReaderParticipant').val(defaultReader.participant.join(','));

                    //附件可下载者
                    $('#fileDownloadPersonId').val(fileDownload.personId.join(','));
                    $('#fileDownloadParticipantType').val(fileDownload.participantType?fileDownload.participantType:'person');
                    $('#fileDownloadParticipant').val(fileDownload.participant.join(','));

                    //附件可查看者
                    $('#fileViewPersonId').val(fileView.personId.join(','));
                    $('#fileViewParticipantType').val(fileView.participantType?fileView.participantType:'person');
                    $('#fileViewParticipant').val(fileView.participant.join(','));

                    //附件可编辑者
                    $('#fileEditPersonId').val(fileEdit.personId.join(','));
                    $('#fileEditParticipantType').val(fileEdit.participantType?fileEdit.participantType:'person');
                    $('#fileEditParticipant').val(fileEdit.participant.join(','));
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }
    /**
     * 初始化form表单数据
     */
    function initFormData() {
        //获取url中的参数contentTypeId
        var urlParam = $.xljUtils.getUrlParams();
        var act;
        var contentTypeId;
        if(urlParam){
            act = urlParam.act;
            contentTypeId = urlParam.contentTypeId;
        }
        switch (act) {
            case 'update':
                getContentTypeForUpdate(contentTypeId);
                getContentAuthorForUpdate(contentTypeId);
                $('#title').text("知识大类-修改");
                $("#temptitle").html("知识大类-修改");
                break;
            case 'create':
                initUUId();
                $('#title').text("知识大类-新增");
                $("#temptitle").html("知识大类-新增");
                break;
        }

        //列表url
        $('#listUrl').val('/platform-app/content/contentRowType/contentRowType_list.html');
        //编辑页url
        $('#editUrl').val('/platform-app/content/contentRowType/contentRowType_edit.html');
        //portal Url
        $('#portalUrl').val('http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getContentRowData/');
    }
    initFormData();
    //保存
    $('#saveBtn').on('click',function () {
        $('#businessObjectForm').attr('data-validate-success','saveAndCloseWindow("save")');
        $('#businessObjectForm').submit();
    });

    //保存并更新
    $('#saveAndCreateBtn').on('click',function () {
        $('#businessObjectForm').attr('data-validate-success','saveAndCloseWindow("saveAndCreate")');
        $('#businessObjectForm').submit();
    });

    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
        window.close();
    });

});

/**
 * 保存知识大类
 * @param saveType
 * @returns {boolean}
 */
function saveAndCloseWindow(saveType) {
    var formEles = $('#businessObjectForm :input')
    var formData = {};
    if($("#fileSize").val() > $("#countCapacity").val()){
		$.xljUtils.tip('blue',"单附件上传大小不能大于总容量！");
		return false;
	}

    //将form表单数据处理成json格式数据
    for(var i=0;i<formEles.length;i++){
        var key = $(formEles[i]).attr('name');
        if(!key){
            continue;
        }

        var val = formEles[i].value;
        if(key=='displayPortal'){
            if(formEles[i].checked){
                formData[key] = val;
            }
            continue;
        }

        if(typeof formData[key] != 'undefined'){
            var repeatDatas = formData[key];
            if(!$.isArray(repeatDatas)){
                var preVal = repeatDatas;
                repeatDatas = [];
                repeatDatas.push(preVal);
            }

            repeatDatas.push(val);
            formData[key] = repeatDatas;
        }else{
            formData[key] = val;
        }
    }

    //将内容权限相关数据处理成list类型的json数据
    var personIds = formData['personId'];
    delete formData['personId'];
    var typeNames = formData['typeName'];
    delete formData['typeName'];
    var participantTypes = formData['participantType'];
    delete formData['participantType'];
    var participants = formData['participant'];
    delete formData['participant'];
    var contentAuthors = [];
    for (var i = 0; i < participants.length; i++) {
        var contentAuthor = {};

        var participant = participants[i];
        var personId = personIds[i];
        var typeName = typeNames[i];
        var participantType = participantTypes[i];

        contentAuthor['participant'] = participant;
        contentAuthor['personId'] = personId;
        contentAuthor['typeName'] = typeName;
        contentAuthor['participantType'] = participantType;

        if(personId!=null&&personId!=''){
            contentAuthors.push(contentAuthor);
        }

    }
    formData.list = contentAuthors;


    //组件
    var component = {};
    component.id = formData.id;
    component.title = formData.name;
    component.code = formData.code;
    //component.titleIcon =
    component.contentUrl = formData.portalUrl+formData.code;
    component.moreUrl = formData.listUrl;
    //component.categoryId
    component.displayDelete=1;
    component.displayRefresh=1;
    component.displayMove=1;


    var menu = {};
    menu.id = formData.id;
    menu.code = formData.code;//编码
    menu.name = formData.name;//菜单名称
    menu.url = formData.listUrl;//菜单URL
    menu.appId = '9d6cba61c4b24a5699c339a49471a0e7';//应用ID
    menu.parentId = '8bb6b5766bfa493284595d1de24a0758';//上级菜单ID
    menu.status = 1;//状态
    //menu.icon;//菜单图标
    //menu.sort;//排序号
    menu.openmode = 1;//打开方式
    menu.remark = formData.description;//说明
    menu.isoutmenu = 0;//是否外部链接

    if(formData.contentType=='1'){
        formData.listUrl = formData.listUrl + '?contentTypeId='+formData.id+'&contentType=1';
        component.moreUrl = formData.listUrl;
        menu.parentId = '8bb6b5766bfa493284595d1de24a0758';//新闻管理一级菜单

    }else{
        formData.listUrl = formData.listUrl + '?contentTypeId='+formData.id+'&contentType=2';
        formData.editUrl = formData.editUrl + '?contentTypeId='+formData.id+'&contentType=2';
        menu.parentId = 'f14b863c5a9b4c82abf2c61175e99564';//知识管理一级菜单
    }
    menu.url = formData.listUrl;//菜单URL

    //是否显示在首页
    if(formData.displayPortal=='Y'){
        formData.componentJson = JSON.stringify(component);//显示在首页才注册组件
    }
    //delete formData.isDisplayPortal;
    formData.menuJson = JSON.stringify(menu);
    formData.delflag = false;
    console.info(formData);

    $.ajax({
        url:serviceUrl + 'oa/content/contentType/saveContentAndAuthor',
        data:JSON.stringify(formData),
        type:'POST',
        contentType:'application/json',
        dataType:'JSON',
        success:function (resultData ) {
            if(resultData){
                var success = resultData.success;
                var result = resultData.result;
                if(success){
                    $.xljUtils.tip('green','数据保存成功！');
                    if(saveType=='save'){
                        window.opener.reloadContentTypeGrid();
                        window.close();
                    }else if(saveType=='saveAndCreate'){
                        window.location.href = serviceUrl + 'content/contentType/contentType_edit.html?act=create';
                    }
                }else{
                    $.xljUtils.tip('red','数据保存失败！');
                }
            }else{

                $.xljUtils.tip('red',resultData.msg);
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
            console.info('数据保存失败');
        }
    });
}