;(function ($,window,document,undefined) {

    /**
     * @author:luorongxin
     */
    /**
     * 全局变量
     */
//正文Office地址初始化
    var webOfficeUrl;
//目录ID
    var contentChildId;
//目录编码
    var contentChildCode;
//目录名称
    var contentChildName;
//大类ID
    var contentTypeId;
//大类编码
    var contentTypeCode;
//大类名称
    var contentTypeName;
//新闻id
    var contentRowTypeId;
//操作 add edit
    var oper;
// 是否发起流程
    var process;
    //业务对象code
    var businessObjectCode;
//登陆人
    var currentUser;
    //当前登录人所在公司
    var currentCompany;
    //当前登录人所在部门
    var currentDept;
    //文档状态
    var status;

    //更新时表单数据
    var initDataForUpdate;
    //流程校稿环节标识
    var approveType;
    /**
     * 初始化数据操作
     */
    /**
     */
    $(document).ready(function () {

        try {
            //computeIframe();
            //编辑的新闻ID
            contentRowTypeId = $.xljUtils.getUrlParam('ids');
            if(typeof contentRowTypeId == 'undefined'){
                contentRowTypeId = $.xljUtils.getUrlParam('businessId');
            }
            contentRowTypeId = contentRowTypeId=='null'?'':contentRowTypeId;
            //所属的目录ID
            contentChildId = $.xljUtils.getUrlParam('contentChildId');
            contentChildId = contentChildId=='null'?'':contentChildId;
            //所属的目录编码
            contentChildCode = decodeURI(escape($.xljUtils.getUrlParam('contentChildCode')));
            contentChildCode = contentChildCode=='null'?'':contentChildCode;
            //所属的目录名称
            contentChildName = decodeURI(escape($.xljUtils.getUrlParam("contentChildName")));
            contentChildName = contentChildName=='null'?'':contentChildName;
            //所属的大类ID
            contentTypeId = $.xljUtils.getUrlParam('contentTypeId');
            contentTypeId = contentTypeId=='null'?'':contentTypeId;
            //所属的大类编码
            contentTypeCode = $.xljUtils.getUrlParam('contentTypeCode');
            contentTypeCode = contentTypeCode=='null'?'':contentTypeCode;
            //所属的大类名称
            contentTypeName = decodeURI(escape($.xljUtils.getUrlParam("contentTypeName")));
            contentTypeName = contentTypeName=='null'?'':contentTypeName;
            //操作 新增add 编辑edit
            oper = $.xljUtils.getUrlParam('oper');
            oper = oper=='null'?'':oper;
            //是否启动审批
            process = $.xljUtils.getUrlParam('process');
            process = process=='null'?'':process;
            //业务对象code
            businessObjectCode = $.xljUtils.getUrlParam('businessObjectCode');
            businessObjectCode = businessObjectCode=='null'?'':businessObjectCode;
            //文档状态
            status = $.xljUtils.getUrlParam('status');



            //初始化uuId
            if(oper=='add') {
                initUUId();
                $('.xj-form-title span').text('新闻管理-新增');
            }else if(oper=='edit'){
                //初始化表单数据
                initDataForUpdate = getDataForUpdate(contentRowTypeId);
                contentRowTypeId = initDataForUpdate.id;
                contentTypeId = initDataForUpdate.contentTypeId;
                process = initDataForUpdate.approvalProcess;
                businessObjectCode = initDataForUpdate.businessObjectCode;
                status = initDataForUpdate.status;
                approveType = $.xljUtils.getUrlParam('approveType');
                if(approveType&&approveType=='JG'){
                    $('.xj-form-header').hide();
                    $('#_base').css({'margin-top':'0px'});

                    window.bizFormSubmit = function () {
                        var saveResult = submitForm('save');
                        $.when(saveResult).done(function (data) {
                            if(data){
                                window.location.href = serviceUrl + 'content/contentRowType/contentRowType_news_edit.html?ids=' + contentRowTypeId + '&oper=edit&approveType=JG';
                            }

                        });
                       /* if(saveResult){

                        }*/
                        return saveResult;
                    }
                }

                $('.xj-form-title span').text('新闻管理-修改');
                $.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "-1", function (okFlag, data) {
                    if (okFlag) {
                        if (data.result != null && data.result.length > 0) {
                            webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
                            $('#Group').val(data.result[0].path);
                            $('#FileGroupPath').val(webOfficeUrl);
                        }
                    }
                },false);
            }

            //初始化用户信息
            getUserInfo();

            if((process=='true'||process==true)&&status=='DRAFT'){
             //   status:草稿：DRAFT、审批中：APPROVALING、已审批未发布：APPROVED、已发布：PUBLISHED、作废：INVALID
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='processBtn'>发起流程</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='viewBtn'>预览</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='temporarySaveBtn'>暂存</button>");

            }else{
            		$('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
                    // $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='saveBtn'>保存</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='publishBtn'>发起审批</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='temporarySaveBtn'>暂存</button>");
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='viewBtn'>预览</button>");
            }
            //绑定按钮事件
            bindButton();

            //创建contentRowType的form表单
            createContentRowTypeForm();
        } catch (e) {

        }

    });

    /**
     * 获取更新时数据
     * @param contentRowTypeId
     * @returns {{}}
     */
    function getDataForUpdate(contentRowTypeId) {
        var updateData = {};
        $.ajax({
            type: "get",
            url: serviceUrl + "oa/content/contentRowType/queryObjectInfoById/" + contentRowTypeId+"?time="+Math.random(),
            dataType: "json",
            async:false,
            success: function (contentObj) {
                var contentRowType = contentObj.result;
                updateData = (contentRowType.attributeValue&&contentRowType.attributeValue!='')?JSON.parse(contentRowType.attributeValue):contentRowType;
                updateData.status = contentRowType.status;
                updateData.contentChildId = contentRowType.contentChildId;
                updateData.contentChildName = contentRowType.contentChildName;
                updateData.contentChildCode = contentRowType.contentChildCode;
                updateData.fullIdPath = contentRowType.fullIdPath;
                updateData.contentTypeName = contentRowType.contentTypeName;
                updateData.contentTypeCode = contentRowType.contentTypeCode;
                updateData.contentType = contentRowType.contentType;
                updateData.businessObject = contentRowType.businessObject;
                updateData.approvalProcess = contentRowType.approvalProcess;
                updateData.newsType = contentRowType.newsType;
            }
        });

        return updateData;
    }

    /**
     * 生成ID
     */
    function initUUId() {
        $.ajax({
            type: 'get',
            url: baseUrl+"sys/uuid/generator/getGuuid?time=" + Math.random(),
            async:false,
            success: function (data) {
                var guuid = data.result;
                contentRowTypeId = guuid;
                $("#id").val(guuid);
            }
        });
    }

    /**
     * 绑定按钮事件
     */
    function bindButton() {
        //保存按钮
        $("#saveBtn").click(function () {
            submitForm('save');
        });
        //暂存按钮
        $("#temporarySaveBtn").click(function () {
            submitForm('temporary');
        });
        //预览按钮
        $("#viewBtn").click(function () {
           // submitForm('preView');
        	staticPagePreview();
        });
        //流程发起按钮
        $("#processBtn").click(function () {
            submitForm('process');
        });
        //大类未开启流程时发起审批按钮
        $("#publishBtn").click(function () {
            submitForm('publish');
        });
        //关闭按钮
        $("#closeBtn").click(function () {
            window.close();
        });
    }
    
    /**
     * 获取组织机构过滤条件
     */
    function getOrgType(fieldCode){
    	var result=new Object();
    	if(fieldCode=="belongDeptName"){
    		result.type="dept";
    		result.tip="请选择部门！";
    	}else if(fieldCode=="belongCompanyName"){
    		result.type="company";
    		result.tip="请选择公司！";
    	}else if(fieldCode=="belongProjectName"){
    		result.type="group";
    		result.tip="请选择项目！";
    	}else if(fieldCode=="belongBranchName"){
    		result.type="branch";
    		result.tip="请选择分期！";
    	}else{
    		result.type="all";
    		result.tip="";
    	}
    	return result;
    }

    /**
     * 创建新闻form表单
     */
    function createContentRowTypeForm() {
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: serviceUrl + "oa/content/contentRowAttribute/queryList?time=" + Math.random(),
            data: JSON.stringify({'contentTypeId':contentTypeId,'isFormView':true,'isUsing':true}),
            dataType: "json",
            success: function (result) {
                //动态创建form表单
                createForm(result.result);
                initFormData();

                var table = $('#newContentTbody');

                //添加正文金格office
                addOfficeToForm(table);

                //添加附件操作行
                addAttachToForm(table);
            }
        });
    }

    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        var table = $("#newContentTbody");
        //var row = table.insertRow();
        var tempRow;
        var labelTdObj;
        var inputTdObj;
        var countFlg = 0;
        if (resultList != null && resultList.length > 0) {
    
            /*获取大类的基本属性字段，拼接form表单*/
            for (var i = 0; i < resultList.length; i++) {
                var attr = resultList[i];
                var fieldCode = attr.fieldCode;//字段代码
                var fieldName = attr.fieldName;//字段名称
                var formType = attr.formType;//表单类型
                var isReadonly = attr.isReadonly;//是否只读
                var isEntireRow = attr.isEntireRow;//是否整行显示
                var isRequired = attr.isRequired;//是否必填
                var  columnWidth = attr.columnWidth;//字段宽度
                var selectorTitle = '选择组织';
                //所属公司
                if(fieldCode == 'belongCompanyName'){
                    selectorTitle = '选择所属公司';
                }
                //所属部门
                if(fieldCode == 'belongDeptName'){
                    selectorTitle = '选择所属部门';
                }
                //所属项目
                if(fieldCode == 'belongProjectName'){
                    selectorTitle = '选择所属项目';
                }
                //所属分期
                if(fieldCode == 'belongBranchName'){
                    selectorTitle = '选择所属分期';
                }

                if(fieldCode=='docContent'){
                    continue;
                }
                if(!tempRow){
                    tempRow = $('<tr class="form-tr"></tr>');
                    table.append(tempRow);
                }

                if(!labelTdObj){
                    labelTdObj = $('<td class="form-label"></td>');
                    tempRow.append(labelTdObj);
                }

                if(!inputTdObj){
                    inputTdObj = $('<td ></td>');
                    tempRow.append(inputTdObj);
                }

                var labelObj;
                var textInputObj;
                switch (formType) {
                    case 'hidden':
                        var hiddenInputObj = $('<input type="hidden">');
                        hiddenInputObj.attr('id',fieldCode);
                        hiddenInputObj.attr('name',fieldCode);
                        inputTdObj.append(hiddenInputObj);
                        break;
                    case 'radio':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        var textInputObjHtml = '';
                        $.each(enumList,function (i,item) {
                            var inputLabelObj = $('<label class="radio-inline"><input type="radio" ></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name',fieldCode);
                            inputObj.attr('id',fieldCode+count);
                            inputObj.val(item.val);
                            if((i+1)==enumList.length){
                                inputObj.attr('checked','checked');
                            }
                            inputLabelObj.append(item.name);
                            textInputObjHtml += inputLabelObj[0].outerHTML;
                            count++;
                        });

                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        labelObj.append(fieldName+' : ');
                        textInputObj = $(textInputObjHtml);

                        break;
                    case 'select':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        textInputObj=$('<select class="form-control addInputWidth" onmouseover="this.title=this.options[this.selectedIndex].text" ></select>');
                        textInputObj.attr('name',fieldCode);
                        textInputObj.attr('id',fieldCode);
                        $.each(enumList,function (i,item) {
                            var optionObj = $('<option value="'+$.xljUtils.htmlEncode(item.val)+'">'+$.xljUtils.htmlEncode(item.name)+'</option>');
                            textInputObj.append(optionObj);
                        });

                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        labelObj.append(fieldName+' : ');
                        break;
                    case 'checkbox':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        var textInputObjHtml = '';
                        $.each(enumList,function (i,item) {
                            var inputLabelObj = $('<label class="checkbox-inline"><input type="checkbox" ></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name',fieldCode);
                            inputObj.attr('id',fieldCode+count);
                            inputObj.val(item.val);
                            inputLabelObj.append(item.name);
                            textInputObjHtml += inputObj.html();
                            count++;
                        });

                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }
                        labelObj.append(fieldName+' : ');
                        textInputObj = $(textInputObjHtml);
                        break;
                    case 'date':
                        labelObj = $('<label></label>');
                        if(fieldCode == 'createDate'){
                        	textInputObj = $("<input type='text'  onmouseover='this.title=this.value' id='"+fieldCode+"'  name='" + fieldCode + "' class='form-control addInputWidth' data-html='true'>");
                        }else{
                        	textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                                    + "<input onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "' size='16' type='text' name='" + fieldCode + "'  readonly>"
                                    + "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                                    + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                                    + "</div>");
                        }
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }
                        if(isReadonly) {
                            textInputObj.attr('readonly','readonly');
                        }
                        labelObj.append(fieldName+' : ');
                        break;
                    case 'personselector':
                        labelObj = $('<label></label>');
                        textInputObj = $("<div class='input-group form-date resetwidth'></div>");
                        var inputObj = $("<input  onmouseover='this.title=this.value' type='text'class='form-control addInputWidth' id='"+fieldCode+"'  name='" + fieldCode + "' readonly='readonly' placeholder='选择人员'/>");
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            inputObj.attr('data-required','true');
                            inputObj.attr('data-placeholder',fieldName);
                        }
                        textInputObj.append(inputObj);
                        labelObj.append(fieldName+' : ');

                        var reg = /[A-Z]/g;
                        var arr;
                        var lastIndex;
                        while((arr=reg.exec(fieldCode))!=null){
                            lastIndex = arr.index;
                        }
                        var targetId = '';
                        if(lastIndex) {
                            targetId = fieldCode.substring(0,lastIndex)+'Id';
                        }else {
                            targetId = fieldCode + 'Id';
                        }
                        targetId="orgId";
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');
                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);
                        $(inputAddonFa).xljSingleSelector( {
                            title:"选择人员",//选择器标题，默认是'选择组织机构'
                            selectorType:"person",//选择器类型，默认是组织机构选择器
                            targetId:targetId,
                            targetName:fieldCode,
                            saveCallback:function (selectData,ele) {
                                /*if(fieldCode == 'author'){
                                 $('#authorId').val(selectData.id);
                                 }
                                 $('#'+fieldCode).val(selectData.name);*/
                                $(ele).val(selectData.name);
                                var eleName = $(ele).attr('name');
                                var reg = /[A-Z]/g;
                                var arr;
                                var lastIndex;
                                while((arr=reg.exec(eleName))!=null){
                                    lastIndex = arr.index;
                                }

                                var targetId = '';
                                if(lastIndex) {
                                    targetId = eleName.substring(0,lastIndex)+'Id';
                                }else {
                                    targetId = eleName + 'Id';
                                }

                                $('#'+targetId).val(selectData.id);

                            }
                        });
                        break;
                    case 'orgselector':
                        labelObj = $('<label></label>');
                        textInputObj = $("<div class='input-group form-date resetwidth'></div>");
                        var inputObj = $("<div class='input-group form-date resetwidth'><input  onmouseover='this.title=this.value' type='text'class='form-control addInputWidth' id='"+fieldCode+"'  name='" + fieldCode + "' readonly='readonly' placeholder='选择组织'/>");
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            inputObj.attr('data-required','true');
                            inputObj.attr('data-placeholder',fieldName);
                        }
                        textInputObj.append(inputObj);
                        labelObj.append(fieldName+' : ');
                        var reg = /[A-Z]/g;
                        var arr;
                        var lastIndex;
                        while((arr=reg.exec(fieldCode))!=null){
                            lastIndex = arr.index;
                        }
                        var targetId = '';
                        if(lastIndex) {
                            targetId = fieldCode.substring(0,lastIndex)+'Id';
                        }else {
                            targetId = fieldCode + 'Id';
                        }
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');
                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);
                        var orgFilter=getOrgType(fieldCode);
                        $(inputAddonFa).xljSingleSelector( {
                        	treeUrl: 'http://127.0.0.1:9999/platform-app/sys/org/root/getOrgTreeByType'+'?time='+Math.random(),
        					treeParam:{
        						'rootDelFlag':'0',
        						'rootStatus' :'1',
        						'orgDelFlag':'0',
        						'orgStatus':'1',
        						'type':orgFilter.type
        					},
        					selectNodeType:{
        						"type":orgFilter.type,
        						"msg":orgFilter.tip
        					},
                            title:selectorTitle,//选择器标题，默认是'选择组织机构'
                            selectorType:"org",//选择器类型，默认是组织机构选择器
                            targetId:targetId,
                            targetName:fieldCode,
                            saveCallback:function (selectData,ele) {
                                $(ele).val(selectData.name);
                                var eleName = $(ele).attr('name');
                                var reg = /[A-Z]/g;
                                var arr;
                                var lastIndex;
                                while((arr=reg.exec(eleName))!=null){
                                    lastIndex = arr.index;
                                }

                                var targetId = '';
                                if(lastIndex) {
                                    targetId = eleName.substring(0,lastIndex)+'Id';
                                }else {
                                    targetId = eleName + 'Id';
                                }

                                $('#'+targetId).val(selectData.id);
                            }
                        });
                        break;
                    case 'file':
                        labelObj = $('<label></label>');
                        textInputObj = $('<div id="attach_'+fieldCode+'"></div>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }

                        labelObj.append(fieldName+' : ');

                        break;
                    case 'textarea':
                        labelObj = $('<label></label>');
                        textInputObj = $('<textarea  onmouseover="this.title=this.value" class="form-control addInputWidth" data-html="true"></textarea>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }
                        if(isReadonly) {
                            textInputObj.attr('readonly','readonly');
                        }
                        textInputObj.attr('data-maxlength',columnWidth);
                        textInputObj.attr('data-placeholder',fieldName);
                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
                        break;
                    default:
                        labelObj = $('<label></label>');
                        textInputObj = $('<input type="text"  onmouseover="this.title=this.value" class="form-control addInputWidth">');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }
                        if(isReadonly) {
                            textInputObj.attr('readonly','readonly');
                        }
                        textInputObj.attr('data-maxlength',columnWidth);
                        textInputObj.attr('data-placeholder',fieldName);
                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
                        if(fieldCode == 'title'){
                            textInputObj.on('blur',function () {
                                if($.trim(this.value)!=''){
                                    $("#newContentForm").find("input[name='title']").parent().removeClass('has-error');
                                    $('#title-error').remove();
                                }
                            });
                        }
                        break;
                }

                //判断是否隐藏域
                if(formType!='hidden'){
                    labelTdObj.append(labelObj);
                    inputTdObj.append(textInputObj);
                    //判断是否整行显示
                    if(isEntireRow) {
                        var rowTds = tempRow.find('td');
                        if(rowTds.length==2){
                             inputTdObj.prop('colspan','3');
                             tempRow.append('<td class="form-label"></td><td></td>')
                        }else if(rowTds.length==4){
                            $(rowTds[2]).remove();
                            $(rowTds[3]).remove();
                            tempRow.append('<td class="form-label"></td><td></td>');
                            tempRow = undefined;
                            tempRow = $('<tr class="form-tr"></tr>');
                            table.append(tempRow);
                            tempRow.append(labelTdObj);
                            inputTdObj.prop('colspan','3');
                            tempRow.append(inputTdObj);
                            tempRow.append('<td class="form-label"></td><td></td>')
                        }
                    }
                    labelTdObj = undefined;
                    inputTdObj = undefined;
                }

                //计算去除整行显示的行中多余单元格
                var rowTds = tempRow.find('td');
                if(rowTds.length>=4){
                    var colspan = $(rowTds[1]).prop('colspan');
                    if(colspan&&colspan=='3'){
                        $(rowTds[2]).remove();
                        $(rowTds[3]).remove();
                    }
                    tempRow = undefined;
                }
            }
        }

        //最后一行如果为两列，则再添加两列，补充为一行四列
        var lastTrObj = table.find("tr:last");
        var lastTrTds = lastTrObj.find('td');
        var colspanAttr = $(lastTrTds[1]).prop('colspan');
        if(colspanAttr&&colspanAttr!='3'){
            if (lastTrTds.length == 2) {
                var cellTemp1 = $('<td class="form-label"></td>');
                var cellTemp2 = $('<td class=""></td>');
                lastTrObj.append(cellTemp1);
                lastTrObj.append(cellTemp2);
            }
        }

        //动态添加时间事件
        $('.form_datetime').datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii:ss',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });

        var attachTitlePic = $('#attach_titlePic');
        if(attachTitlePic&&attachTitlePic.length>0) {
            try{
                $('#attach_titlePic').xljAttachment({
                    appId: '1',
                    businessId: contentRowTypeId,
                    categoryId: '2',
                    mode: oper,
                    singleUpload: true
                });
            }catch (e){
                console.warn('附件组件初始化失败');
            }
        }

        //替换所属目录input为select
        var contentChildNameObj = table.find('input[name="contentChildName"]');
        if(contentChildNameObj[0]){
            var pTdObj = contentChildNameObj.parent('td');
            pTdObj.html('');
            var contentChildNameInput = $('<input type="hidden" name="contentChildName" id="contentChildName">');
            pTdObj.append(contentChildNameInput);
            var contentChildIdSelect = $('<select onmouseover="this.title=this.options[this.selectedIndex].text"  name="contentChildId" id="contentChildId" class="form-control addInputWidth"></select>');
            pTdObj.append(contentChildIdSelect);
            contentChildIdSelect.on('change',function () {
               var name = $(this).find('option:selected').text();
                $(this).prev().val(name);
            });
            $.ajax({
                url:serviceUrl + 'oa/content/contentChild/queryContentChildList',
                data:JSON.stringify({contentTypeId:contentTypeId,delflag:false}),
                type:'POST',
                contentType:'application/json',
                dataType:'JSON',
                async:false,
                success:function (resultData ) {
                    if(resultData&&resultData.success){
                        var contentChilds = resultData.result;
                        if(contentChilds&&contentChilds.length>0) {
                            for (var i = 0; i < contentChilds.length; i++) {
                                var obj = contentChilds[i];
                                var id = obj.id;
                                var name = obj.name;
                                var optObj = $('<option></option>');
                                optObj.attr("value",id);
                                optObj.text(name);
                                contentChildIdSelect.append(optObj);
                                optObj = undefined;
                            }
                        }
                    }
                },
                error:function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });
            //var contentpTdObj.find('input[name="contentChildId"]');
        }


    }

    /**
     * 清空选择器
     */
    window.clearSelector=function(id,name) {
        $('#'+id).val('');
        $('#'+name).val('');
    }
    /**
     * 初始化表单数据
     */
    function initFormData() {
        var initData = {};
        if(oper=='add'){
            initData.businessObjectCode = businessObjectCode;
            initData.createPersonName = currentUser?currentUser.realName:'';
            initData.createPersonId = currentUser?currentUser.id:'';
            initData.agencyName = currentUser?currentUser.realName:'';
            initData.agencyId = currentUser?currentUser.id:'';
            initData.belongCompanyName = currentCompany?currentCompany.name:'';
            initData.belongCompanyId = currentCompany?currentCompany.id:'';
            initData.belongDeptName = currentDept?currentDept.name:'';
            initData.belongDeptId = currentDept?currentDept.id:'';
            initData.contentTypeName = contentTypeName;
            initData.contentTypeId = contentTypeId;
            initData.contentChildName = contentChildName;
            initData.contentChildId = contentChildId;
            initData.createDate = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
            initData.author = currentUser?currentUser.realName:'';
            initData.authorId = currentUser?currentUser.id:'';
            var authorOrgId = currentUser?currentUser.belongOrgId:'';//用户所属组织
            $("#orgId").val(authorOrgId);
        }else {
            /*$.ajax({
                type: "get",
                url: serviceUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
                dataType: "json",
                async:false,
                success: function (contentObj) {
                    var contentRowType = contentObj.result;
                    initData = (contentRowType.attributeValue&&contentRowType.attributeValue!='')?JSON.parse(contentRowType.attributeValue):contentRowType;
                }
            });*/
            initData = initDataForUpdate?initDataForUpdate:{};
        }

        for(var item in initData) {
            var inputObj = $('#newContentForm :input[name="'+item+'"]');
            var inputType = $(inputObj[0]).attr('type');
            if(inputType=='radio'||inputType=='checkbox'){
                var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+initData[item]+'"]')[0];
                if(inputObj) {
                    inputObj.checked = true;
                }
            }else if(inputType=='select'){
                var inputObj = $('#newContentForm :input[name="'+item+'"] option[value="'+initData[item]+'"]')[0];
                if(inputObj) {
                    inputObj.selected = true;
                }
            }else{
                inputObj.val(initData[item]);
            }
        }

    }

    /**
     * 添加附件操作行
     * @param table
     */
    function addAttachToForm(table) {
        //添加附件操作
        var attachTrObj = $('<tr class="form-tr"></tr>');
        table.append(attachTrObj);

        var attachLabelTdObj = $('<td class="form-label"><label>附件 : </label></td>');
        attachTrObj.append(attachLabelTdObj);

        var attachTdObj = $('<td colspan="3"></td>');
        attachTrObj.append(attachTdObj);
        var attachContentDivObj = $('<div id="attach_'+contentRowTypeId+'"></div>');
        attachTdObj.append(attachContentDivObj);

        //初始化附件
        try{
            $('#'+attachContentDivObj.attr('id')).xljAttachment({
                appId: '1',
                businessId: contentRowTypeId,
                categoryId: '1',
                mode: oper,
                singleUpload: false,
                hideButtonsWithNoFile:false
            });
        }catch (e){
        //    console.warn('附件初始化失败！');
        }
    }

    /**
     * 添加正文金格office操作行
     * @param table
     */
    function addOfficeToForm(table) {
        //添加正文金格office
        var contentTrObj = $('<tr class="form-tr"></tr>');
        table.append(contentTrObj);

        /*var contentLabelTdObj = $('<td class="form-label"><label>新闻正文 : </label></td>');
        contentTrObj.append(contentLabelTdObj);*/
    
        var contentTdObj = $('<td colspan="4"></td>');
        contentTrObj.append(contentTdObj);
        var contentDivObj = $('<div class="embed-responsive embed-responsive-16by9" style="padding-bottom: 85%;width:100%" id="officeJk"></div>');
        contentTdObj.append(contentDivObj);
        var contentIframeObj = $('<iframe class="embed-responsive-item" src="" id="contentOffice" name="contentOffice" ></iframe>');
        if(approveType&&approveType=='JG'){
            //onload="resizeOfficeIframe()"
            contentIframeObj.attr('onload','resizeOfficeIframe()');
        }

        if(oper=='add') {
            contentIframeObj.attr('src','../../iwebOffice/demoOffice.html?operationType=addForm&contentRowTypeId='+contentRowTypeId);
        }else if(oper=='edit'){
            contentIframeObj.attr('src','../../iwebOffice/demoOffice.html?operationType=updateData&contentRowTypeId='+contentRowTypeId);
        }

        contentDivObj.append(contentIframeObj);
    }

    /**
     * 根据查询类型和字段类型获取  该属性的枚举
     * @param contentTypeId
     * @param fieldCode
     */
    function enumPropertiesResult(fieldCode, propertiesName) {
        var result = "";
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: serviceUrl + 'oa/dictionary/contentDictionaryItem/queryListDictionaryItem',
            dataType: "json",
            data: JSON.stringify({code: fieldCode}),
            success: function (data) {
                console.log(data);
                if (data.success) {
                    result = data.result;

                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });

        return result;
    }

    /**
     * 获取用户信息
     */
    function getUserInfo(){
        $.ajax({
            url:serviceUrl+'oa/content/contentRowType/getUserInfo?time='+Math.random(),
            type:'GET',
            dataType:'JSON',
            async:false,
            success:function (returnData) {
                currentUser = returnData.result.securityUserDto;
                currentCompany = returnData.result.securityDirectCompanyDto;
                currentDept = returnData.result.securityDirectDeptDto;
                /*$('#createPersonName').val(currentUser);
                $('#createPersonName').val(currentUser);*/
            }
        });
    }

    /**
     * 保存附件
     */
    function saveAttachement() {
        var defObjs = {};
        var def = new $.Deferred();
        $('#attach_'+$('#id').val()).xljAttachmentSubmit(function (isSuccess, obj) {
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
                def.resolve(true);
            } else {
                $.xljUtils.getError(obj);
                def.resolve(false);
            }
        });
        defObjs.attachDef = def.promise();

        var def1 = new $.Deferred();
        var attachTitlePic = $('#attach_titlePic');
        if(attachTitlePic&&attachTitlePic.length>0) {
            $('#attach_titlePic').xljAttachmentSubmit(function (isSuccess, obj) {
                if (isSuccess) {
                    if (obj.success === true) {
                        $.xljUtils.tip('blue', '附件信息提交成功');
                        def1.resolve(true);
                    }
                } else {
                    $.xljUtils.getError(obj);
                    def1.resolve(false);
                }
            });
            defObjs.picDef = def1.promise();
        }else{
            def1.resolve(true);
            defObjs.picDef = def1.promise();
        }
        return defObjs;

    }
    /**
     * 预览
     */
    function staticPagePreview(){
    	//调用office预览方法
        document.getElementById('contentOffice').contentWindow.staticPagePreview(contentRowTypeId);
    }
    /**
     * 表单提交: 初始化参数
     */
    function submitForm(saveType) {
        var saveResult;
        var url = serviceUrl + 'oa/content/contentRowType/save';
        var method = 'POST';

        if(saveType=='save'||saveType=='process'||saveType=='publish'){
            $.xljUtils.customSingleValidate($('#newContentForm')[0]);
            if(!$('#newContentForm').valid()){
                return;
            }
        }else{
         /*   var titleVal = $('#title').val();
            $("#newContentForm").find("input[name='title']").parent().removeClass('has-error');
            $('#title-error').remove();
            if($.trim(titleVal)==''){
                $("#newContentForm").find("input[name='title']").parent().addClass('has-error');
                $("#newContentForm").find("input[name='title']").parent().append('<label id="title-error" class="error help-block" for="title" style="margin: 0px; text-align: left;">主题不能为空</label>');
                return;
            }*/
        }

        if (oper == 'add') {
        } else if (oper == 'edit') {
            url = serviceUrl + 'oa/content/contentRowType/update/'+ contentRowTypeId;
            method = 'PUT';
        }

        //同步提交方式
        var asyncType = true;
        if(approveType&&approveType=='JG'){
            asyncType = false;
        }

        //获取form表单数据
//        var formFields = $('#newContentForm :input[name]');
        
        var formFields = $("#newContentForm").serializeArray();
        var jsonData = {};
        var numReg = new RegExp("^[0-9]*$");
        for(var i=0;i<formFields.length;i++) {
            if(formFields[i].value==""){
                continue;
            }
            var cv = formFields[i].value.replace(/\\/g, "\\\\");
            cv = cv.replace(/'/g, "\\'");
            jsonData[formFields[i].name]=cv;
            //jsonData[formFields[i].name]=$.xljUtils.encodeSpecialChars(formFields[i].value);
        }
        jsonData['relationId']=contentRowTypeId;
        if(saveType=='publish'){
            jsonData['status'] = 'PUBLISHED';
            jsonData['publishDate'] = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
        }
        var def = new $.Deferred();
        //ajax方式提交表单，提交时以json格式提交
        $.ajax({
            url:url,
            data:JSON.stringify(jsonData),
            type:method,
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if(successFlag){
                        //保存附件
                        var defObjs = saveAttachement();

                        //$.when(defObjs.attachDef,defObjs.picDef).done(function () {
                            if(saveType!=='preView'){
                                //保存金格office
                                document.getElementById('contentOffice').contentWindow.saveOffice(contentRowTypeId);
                            }

                            def.resolve(true);
                            if((saveType=='temporary'||saveType=='save'||saveType=='publish')){
                                if((approveType&&approveType=='JG')||saveType=='temporary'){
                                    saveResult = true;
                                    $.xljUtils.tip('green','新闻表单数据保存成功！');
                                    window.location.href = serviceUrl + "content/contentRowType/contentRowType_news_edit.html?ids=" + jsonData.id + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + process + "&businessObjectCode=" + businessObjectCode + "&status=" + status;
                                    return saveResult;
                                }
                                document.getElementById('contentOffice').contentWindow.closeOffice();
                                if(window.opener != null){
                                    window.opener.reloadGrid(jsonData.id,'contentRowGrid');
                                }
                                if(saveType=='save'||saveType=='publish'){
                                    window.close();
                                }
                            }else if(saveType=='process') {
                                //window.open(serviceUrl + 'flow/runtime/approve/start.html?businessObjectCode='+businessObjectCode+'&businessId='+contentRowTypeId);
                                document.getElementById('contentOffice').contentWindow.closeOffice();
                                if(window.opener != null){
                                    window.opener.reloadGrid(jsonData.id,'contentRowGrid');
                                }
                                window.location.href = serviceUrl + 'flow/runtime/approve/start.html?businessObjectCode='+businessObjectCode+'&businessId='+contentRowTypeId;
                            }else if(saveType=='preView'){
                                // document.getElementById('contentOffice').contentWindow.SaveAsHtml();
                                window.open("contentRowType_staticPage.html?id="+contentRowTypeId+"&contentTypeId="+contentTypeId);
                            }
                       // });


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
                                $.xljUtils.tip("blue","网络繁忙，请稍后！");
                                break;
                        }

                        saveResult = false;
                        def.resolve(false);
                    }

                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                $.xljUtils.getError(status);
                def.resolve(false);
            }
        });

        return def.promise();

    }

    //校稿环节重新计算外部iframe高度
    window.resizeOfficeIframe = function () {
        var b_iframe = document.getElementById("contentOffice");
        // alert($(b_iframe).width() + "=======")
        $($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
        $($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});
        $(b_iframe).height(document.contentOffice.document.body.scrollHeight+20);

        if (window.parent&&window.parent.document.bizForm){
            var bizForm = window.parent.document.bizForm;
            $(window.parent.document.getElementById('bizForm')).height(bizForm.document.body.scrollHeight+20);
        }
    };

})(jQuery,window,document);



