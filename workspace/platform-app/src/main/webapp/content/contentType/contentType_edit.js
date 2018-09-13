/**
 * author:update by dgh
 */
$(function () {
    $('.portal-relative').hide();
    $('.news-relative').hide();
   
    
    
    //初始化主键ID
    function initUUId() {
        var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
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

/*    $("#code").blur(function(){
    	 var code=$("#code").val();
    	 if(code.indexOf("'")>-1){
    		   $("#code").val("");
    		   $.xljUtils.tip('blue',"编码不允许输入'");
    	 }
    	});*/
    /**
     * 初始化contentType数据，为更新操作使用
     * @param contentTypeId
     */
    function getContentTypeForUpdate(contentTypeId) {
        $.ajax({
            url:hostUrl + 'oa/content/contentType/get/'+contentTypeId + '?_t='+new Date().getTime(),
            type:'GET',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    var contentType = resultData.result;
                //    initSelector();
                    for(var item in contentType){
                    	 
                        if(item == "approvalProcess"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            $('#contentTypeForm :input[name="'+item+'"][value="'+contentType[item]+'"]')[0].checked=true;
                            continue;
                        }
                         
                        if(item == "displayPortal"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            $('#contentTypeForm :input[name="'+item+'"][value="'+contentType[item]+'"]')[0].checked=true;
                            continue;
                        }

                        if(item == "displayPortalCompany"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            $('#contentTypeForm :input[name="'+item+'"][value="'+contentType[item]+'"]')[0].checked=true;
                            continue;
                        }

                        if(item == "displaySwitchCompany"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            $('#contentTypeForm :input[name="'+item+'"][value="'+contentType[item]+'"]')[0].checked=true;
                            continue;
                        }
                        if(item == "name"){
                        	//$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                        	$('#contentTypeForm :input[name="'+item+'"]').val( $.xljUtils.htmlEncode(contentType[item]));
                        	continue;
                        }
                        if(item == "code"){
                        	//$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                        	$('#contentTypeForm :input[name="'+item+'"]').val( $.xljUtils.htmlEncode(contentType[item]));
                        	continue;
                        }
                        if(item == "dataAuthSearch"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            if(contentType[item]=='docSearch'||contentType[item]=='newsSearch'){
                                $('#contentTypeForm :input[name="'+item+'"][value="true"]')[0].checked=true;
                            }
                            // $("#dataAuthSearch").find('option[value="'+$.xljUtils.htmlEncode(contentType[item])+'"]').prop("selected",true);
                            continue;
                        }
                        if(item == "dataAuthEdit"){
                            //$('#businessObjectForm :input[name="'+item+'"]:checked').val();
                            if(contentType[item]=='docEdit'||contentType[item]=='newsEdit'){
                                $('#contentTypeForm :input[name="'+item+'"][value="true"]')[0].checked=true;
                            }
                            // $("#dataAuthEdit").find('option[value="'+$.xljUtils.htmlEncode(contentType[item])+'"]').prop("selected",true);
                            continue;
                        }



                        $('#contentTypeForm :input[name="'+item+'"]').val(contentType[item]);
                    }

                }

                changeContentType();
                changeDisplayPortal();

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
            url:hostUrl + 'oa/content/contentAuthor/queryList',
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
                //getContentAuthorForUpdate(contentTypeId);
                $('#title').text("知识大类-修改");
                $("#temptitle").html("知识大类-修改");
                break;
            case 'create':
                initUUId();
                $('#title').text("知识大类-新增");
                $("#temptitle").html("知识大类-新增");
                changeContentType();
                changeDisplayPortal();
                // initSelector();
                break;
        }

        //列表url
        $('#listUrl').val('/platform-app/content/contentRowType/contentRowType_list.html');
        //编辑页url
        $('#editUrl').val('/platform-app/content/contentRowType/contentRowType_edit.html');
        //portal Url
        $('#portalUrl').val('/platform-app/oa/content/contentRowType/getContentRowData/');
    }
    initFormData();

    /**
     * 知识类型为新闻时显示新闻类型
     */
    function changeContentType() {
        var contentTypeVal = $('#contentType').val();
        $("#newsType").parent('td').removeClass('has-error');
        $("#newsType").parent('td').find('label.error').remove();
        if(contentTypeVal=='NEWS') {
            $('#newsType').attr('data-required','true');
            $("#newsType").rules("add",{required:true,messages:{required:"请选择新闻类型"}});
            $('.news-relative').show();
            //$('input[name="approvalProcess"][value="true"]')[0].checked=true;
        }else{
            $('#newsType').removeAttr('data-required');
            $("#newsType").rules("remove");
            $('.news-relative').hide();
            //$('#newsType').val('');
            $('#msgType option[value=""]')[0].selected = true;
            //$('input[name="approvalProcess"][value="false"]')[0].checked=true;
        }
    }
    //知识类型更改事件
    $('#contentType').on('change',function () {
        changeContentType();
    });

    /**
     * 显示portal时显示portal相关参数
     */
    function changeDisplayPortal() {
        var displayPortalVal = $('input[name="displayPortal"]:checked').val();
        if(displayPortalVal=='true') {
            $('.portal-relative').show();
        }else{
            $('.portal-relative').hide();
        }
    }
    //显示portal更改事件
    $('input[name="displayPortal"]').on('click',function () {
        changeDisplayPortal();
    });

    //保存
    $('#saveBtn').on('click',function () {
        $('#contentTypeForm').attr('data-validate-success','saveAndCloseWindow("save")');
        $('#contentTypeForm').submit();
    });

    //保存并更新
    $('#saveAndCreateBtn').on('click',function () {
        $('#contentTypeForm').attr('data-validate-success','saveAndCloseWindow("saveAndCreate")');
        $('#contentTypeForm').submit();
    });

    //关闭窗口
    $('#closeWindowBtn').on('click',function () {
        window.close();
    });



});
/**
 * 初始化数据权限下拉列表
 */
/*function initSelector() {
    var appId = '';
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: hostUrl + "/sys/res/appSystem/queryList",
        data: JSON.stringify({delflag:false,code:'OA'}),
        dataType: "JSON",
        async:false,
        success: function (resultData) {
            if (resultData&&resultData.success) {
                var fieldList = resultData.result;
                if(fieldList&&fieldList.length>0){
                    appId = fieldList[0].id;
                }
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: hostUrl + "/sys/res/dataItem/queryList",
        data: JSON.stringify({delflag:false,appId:appId}),
        dataType: "JSON",
        async:false,
        success: function (resultData) {
            if (resultData&&resultData.success) {
                var fieldList = resultData.result;
                if(fieldList){
                    for (var i = 0; i < fieldList.length; i++) {
                        var field = fieldList[i];
                            $('.authObject').append('<option value="'+field.itemCode+'">'+field.itemName+'</option>');
                    }
                }
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });
}*/
/**
 * 保存流程业务对象
 * @param rowData
 * @returns 保存后的业务对象
 */
function saveContentTypeBusiObject(rowData) {
    var saveBusinessObjFlag = false;
    //流程业务对象
    var processBusinessObject = {};
    processBusinessObject.variableList = [];
    //查询此大类下的用于审批字段
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: hostUrl + "oa/content/contentRowAttribute/queryList",
        data: JSON.stringify({contentTypeId:rowData.id,processVariable:true,delflag:false}),
        dataType: "JSON",
        async:false,
        success: function (resultData) {
            if (resultData&&resultData.success) {
                var fieldList = resultData.result;
                if(fieldList){
                    for (var i = 0; i < fieldList.length; i++) {
                        var field = fieldList[i];
                        var processVariable = {
                            id:field.id,//流程变量id
                            code:field.fieldCode,//流程变量编码
                            name:field.fieldName,//流程变量名称
                            concurrencyVersion:0,//并发版本
                            delflag:false,//删除标识
                            forFinance:false,//是否用于财务接
                            forFlowBranch:false,//是否用于流程分支
                            type:1,//1-字符串;2-整数;3-浮点数;4-布尔;5-日期
                            comment:''//备注说明
                        };

                        switch (field.formType){
                            case 'date':
                                processVariable.type=5;
                                break;
                            case 'radio':
                                processVariable.type=4;
                                break;
                            default:
                                processVariable.type=1;
                                break;
                        }
                        processBusinessObject.variableList.push(processVariable);

                    }
                }
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });

    processBusinessObject.id = rowData.id; //业务对象ID，外部系统指定, 且保证唯一性,必填
    processBusinessObject.name = rowData.name;//业务对象名称,必填
    processBusinessObject.code = rowData.code;//业务对象编码,必填
    processBusinessObject.parentCode = 'OA_NEWS_DATA';
    processBusinessObject.appCode = 'OA';//应用系统ID,必填
    //processBusinessObject.paramUrl = '';//审批URL(Pad),非必填
    if(rowData.contentType=='NEWS'){
        processBusinessObject.pcUrl = 'http://'+window.location.host + '/platform-app/content/contentRowType/contentRowType_news_view.html';//审批URL(PC)
    }else{
        processBusinessObject.pcUrl = 'http://'+window.location.host + '/platform-app/content/contentRowType/contentDocument_view.html';//审批URL(PC)
    }
    processBusinessObject.phoneUrl = '';//审批URL(手机)
    processBusinessObject.comment = '';//备注 非必填
    //processBusinessObject.callbackClass = '';//流程完成回调接口类
    //processBusinessObject.callbackMethod = "http://"+window.location.host + '/platform-app/oa/content/contentRowType/updateProcessState';//流程完成回调接口类对应的方法
    processBusinessObject.approveClass = 'http://'+window.location.host + '/platform-app/oa/content/contentRowType/queryVariableForFlow';//业务对象取值URL,
    processBusinessObject.busidataClass = '';//环节完成回调接口类
    processBusinessObject.busidataMethod = '';//环节完成回调接口类对应的方法
    //processBusinessObject.approveClass = '';//业务对象取值URL
    processBusinessObject.callbackClass = 'http://'+window.location.host + '/platform-app/oa/content/contentRowType/updateProcessState';//流程回调更改状态接口
    processBusinessObject.callbackMethod = '';

    processBusinessObject.concurrencyVersion = 0;//并发版本,必填
    processBusinessObject.delflag = false;//是否删除,必填false,
    //processBusinessObject.forCustomizeForm = true;//是否用于定义表单组件,"true"
    //processBusinessObject.forDataAuth = true;//是否用于数据权限,"true",
    //processBusinessObject.forFinance = false;//是否财务接口 "true/false"
    //processBusinessObject.financeClass = '';//财务接口类非必填
    //processBusinessObject.forFlow = true;//是否用于流程,必须添"true"

    var businessObject ;
    var url = hostUrl + "flow/businessObject/saveObjectAndVariableData";
    var type = 'POST';
    /*if($.xljUtils.getUrlParams().act=='update'){
        url = hostUrl+"flow/businessObject/update/"+processBusinessObject.id;
        type = 'PUT';
    }*/
    //保存业务对象
    $.ajax({
        type: type,
        contentType: "application/json",
        url: url,
        data: JSON.stringify(processBusinessObject),
        dataType: "JSON",
        async:false,
        success: function (resultData) {
            if (resultData&&resultData.success) {
                businessObject = resultData.result;
                saveBusinessObjFlag = true;
            }else{
                saveBusinessObjFlag = false;
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });

    return saveBusinessObjFlag;
}

/**
 * 保存知识大类
 * @param saveType
 * @returns {boolean}
 */
function saveAndCloseWindow(saveType) {
    var formEles = $('#contentTypeForm :input');
    var formData = {};
    /*var fileSize = parseInt($("#fileSize").val());
    var countCapacity = parseInt($("#countCapacity").val());
    if(fileSize&&countCapacity&&fileSize>countCapacity){
        $.xljUtils.tip('blue',"单附件上传大小不能大于总容量！");
        return false;
    }*/

    //将form表单数据处理成json格式数据
    for(var i=0;i<formEles.length;i++){
        var key = $(formEles[i]).attr('name');
        if(!key){
            continue;
        }

        var val = formEles[i].value;
        if($.trim(val)==''){
            continue;
        }
        if(key=='displayPortal'||key=='displayPortalCompany'||key=='displaySwitchCompany'||key=='approvalProcess'
        ||key=='dataAuthEdit'||key=='dataAuthSearch'){
            if(formEles[i].checked){
                if (val=='true'){
                    val = true;
                }else{
                    val = false;
                }
                formData[key] = val;
            }
            continue;
        }

        if(key=='newIconDays'){
            if(val!=''){
                val = parseInt(val);
            }else{
                val = 0;
            }
            formData[key] = val;
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

    //保存业务变量



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


    //菜单
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

    if(formData.contentType=='NEWS'){
        formData.listUrl = formData.listUrl + '?contentTypeId='+formData.id+'&contentType=NEWS';
        component.moreUrl = formData.listUrl + '&newOpenWin=true&btnMenuCode='+ menu.code;
        menu.parentId = '8bb6b5766bfa493284595d1de24a0758';//新闻管理一级菜单


    }else{
        formData.listUrl = formData.listUrl + '?contentTypeId='+formData.id+'&contentType=DOCUMENT';
        component.moreUrl = formData.listUrl + '&newOpenWin=true&btnMenuCode='+ menu.code;
        formData.editUrl = formData.editUrl + '?contentTypeId='+formData.id+'&contentType=DOCUMENT';
        menu.parentId = 'f14b863c5a9b4c82abf2c61175e99564';//知识管理一级菜单
    }
    menu.url = formData.listUrl;//菜单URL

    //是否显示在首页
    if(formData.displayPortal){
        formData.componentJson = JSON.stringify(component);//显示在首页才注册组件
    }
    //delete formData.isDisplayPortal;
    formData.menuJson = JSON.stringify(menu);
    formData.delflag = false;
    formData.businessObject = formData.code;
    //数据权限
    if(formData.dataAuthSearch){
        formData.dataAuthSearch = formData.contentType=='NEWS'?"newsSearch":"docSearch";
    }else{
        formData.dataAuthSearch = "";
    }
    if(formData.dataAuthEdit){
        formData.dataAuthEdit = formData.contentType=='NEWS'?"newsEdit":"docEdit";
    }else{
        formData.dataAuthEdit = "";
    }
    $.ajax({
        url:hostUrl + 'oa/content/contentType/saveContentAndAuthor',
        data:JSON.stringify(formData),
        type:'POST',
        contentType:'application/json',
        dataType:'JSON',
        success:function (resultData ) {
            if(resultData){
                var success = resultData.success;
                var result = resultData.result;
                if(success){
                    if(result.approvalProcess){
                        var businessObjectCodeFlag = saveContentTypeBusiObject(result);
                        if(!businessObjectCodeFlag) {
                            $.xljUtils.tip('red','业务对象保存失败！');
                            return;
                        }
                    }

                    if(saveType=='save'){
                    	$.xljUtils.tip('green','数据保存成功！');
                        window.opener.reloadContentTypeGrid(formData.id);
                        window.close();
                    }else if(saveType=='saveAndCreate'){
                        window.opener.reloadContentTypeGrid(formData.id);
                        $.xljUtils.tip('green','数据保存成功！');
                        window.location.href = hostUrl + 'content/contentType/contentType_edit.html?act=create';
                    }
                }else{
                    $.xljUtils.tip('red',resultData.msg);
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