/**
 * Created by admin on 2017/7/25.
 */
$(function () {

    //解码url参数
    var urlParams = $.xljUtils.getUrlParams();
    urlParams.contentTypeName = decodeURIComponent(urlParams.contentTypeName);
    urlParams.contentTypeCode = decodeURIComponent(urlParams.contentTypeCode);
    urlParams.contentChildName = decodeURIComponent(urlParams.contentChildName);
    urlParams.contentChildCode = decodeURIComponent(urlParams.contentChildCode);
    urlParams.businessObjectCode = decodeURIComponent(urlParams.businessObjectCode);
    urlParams.contentTypeName = decodeURIComponent(urlParams.contentTypeName);

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
                urlParams.contentRowTypeId = guuid;
                $("#id").val(guuid);
            }
        });
    }

    var docAttachDef;

    /**
     * 初始化页面元素
     */
    function initPageEle() {
        if(urlParams.oper=='add'){
            $('.xj-form-title span').text('新闻管理-新增');
            initOperateBtn(urlParams.process,urlParams.status);
            initUUId();
            //初始化表单绘制
            initContentForm(urlParams.contentTypeId);

            //初始化金格组件参数
            initDocContentAttachment(urlParams.contentRowTypeId);

        }else if(urlParams.oper=='edit'){
            $('.xj-form-title span').text('新闻管理-修改');

            var updateDef = getDataForUpdate(urlParams.id);
            $.when(updateDef).done(function (updateData) {
                if(updateData) {
                    //初始化金格组件参数
                    initDocContentAttachment(updateData.id);

                    urlParams.contentRowTypeId = updateData.id;
                    urlParams.code = updateData.code;
                    urlParams.oldCode = updateData.code;
                    urlParams.codeType = updateData.codeType;
                    urlParams.oldCodeType = updateData.codeType;
                    if(updateData.code){
                        urlParams.year = updateData.code.substring(updateData.code.indexOf("〔")+1, updateData.code.indexOf("〕"));
                    }
                    urlParams.process = updateData.approvalProcess;
                    urlParams.businessObjectCode = updateData.businessObject;
                    urlParams.contentTypeId = updateData.contentTypeId;
                    urlParams.currentUserId = updateData.currentUserId;
                    //初始话操作按钮
                    initOperateBtn(updateData.approvalProcess,updateData.status);
                    //初始化表单绘制
                    initContentForm(updateData.contentTypeId,updateData);

                }
            });
        }
    }
    initPageEle();

    /**
     * 初始话操作按钮
     * @param process
     * @param status
     */
    function initOperateBtn(process,status) {
        //关闭页面
        var closeBtn = $('<button type="button" class="btn btn-sm btn-adv" id="closeBtn">关闭</button>');
        closeBtn.on('click',function () {
            window.close();
        });
        //保存按钮
        var saveBtn = $('<button type="button" class="btn btn-sm btn-adv" id="saveBtn">保存</button>');
        saveBtn.on('click',function () {
            submitForm('save');
        });
        //发起流程
        var processBtn = $('<button type="button" class="btn btn-sm btn-adv" id="processBtn">发起流程</button>');
        processBtn.on('click',function () {
            submitForm('process');
        });
        //预览
        var viewBtn = $('<button type="button" class="btn btn-sm btn-adv" id="viewBtn">预览</button>');
        viewBtn.on('click',function () {
            staticPagePreview();
        });
        //暂存
        var temporarySaveBtn = $('<button type="button" class="btn btn-sm btn-adv" id="temporarySaveBtn">暂存</button>');
        temporarySaveBtn.on('click',function () {
            submitForm('temporary');
        });
        //发起审批
        var publishBtn = $('<button type="button" class="btn btn-sm btn-adv" id="publishBtn">发起审批</button>');
        publishBtn.on('click',function () {
            submitForm('publish');
        });

        if((process=='true'||process==true)&&status=='DRAFT'){
            //   status:草稿：DRAFT、审批中：APPROVALING、已审批未发布：APPROVED、已发布：PUBLISHED、作废：INVALID
            $('#btnContainer').append(closeBtn);
            $('#btnContainer').append(processBtn);
            $('#btnContainer').append(viewBtn);
            $('#btnContainer').append(temporarySaveBtn);

        }else{
            $('#btnContainer').append(closeBtn);
            $('#btnContainer').append(publishBtn);
            $('#btnContainer').append(viewBtn);
            $('#btnContainer').append(temporarySaveBtn);
        }
    }

    /**
     * 初始化知识大类属性
     * @returns {{}}
     */
    function initContentRowAttr(contentTypeId) {
        var def = new $.Deferred();
        $.ajax({
            type: "POST",
            url: serviceUrl + "oa/content/contentRowAttribute/queryList?time=" + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'delflag': 0,isUsing:true,contentTypeId:contentTypeId,isFormView:true}),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var attrArray = xhr.result;
                        def.resolve(attrArray);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

        return def.promise();
    }

    /**
     * 表单绘制
     * @param contentTypeId
     */
    function initContentForm(contentTypeId,initData) {
        //初始化属性
        var attrDef = initContentRowAttr(contentTypeId);
        $.when(attrDef).done(function (attrData) {
            //绘制表单
            createForm(attrData);

            var table = $('#newContentTbody');
            //初始化表单数据
            initFormData(initData);

            //添加正文金格office
            addOfficeToForm(table,urlParams.contentRowTypeId);

            //添加附件操作行
            addAttachToForm(table,urlParams.contentRowTypeId);

            //编码赋值
            if(urlParams.oper=='add'){
                $("#code").val($.xljUtils.getNumber("NEWSNUMBER"));
            }

        });
    }

    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        var table = $("#newContentTbody");
        var tbody = $('<tbody></tbody>');
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
                var columnWidth = attr.columnWidth;//字段宽度
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
                    tbody.append(tempRow);
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
                        textInputObj.append($('<option value="">请选择...</option>'));
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
                            var inputLabelObj ='<input type="checkbox" name="'+fieldCode+'" id="'+fieldCode+count+'" value="'+item.val+'"><label >'+item.name+'</label>';
                     /*       var inputLabelObj = $('<label class="checkbox-inline"><input type="checkbox" ></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name',fieldCode);
                            inputObj.attr('id',fieldCode+count);
                            inputObj.val(item.val);
                            inputLabelObj.append(item.name);*/
                            textInputObjHtml += inputLabelObj;
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
                            textInputObj.addClass('read-only');
                        }else{
                            textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                                + "<input onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "' size='16' type='text' name='" + fieldCode + "'  readonly>"
                                //+ "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
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
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a href="javascript:void(0);" class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a href="javascript:void(0);" class="fa fa-ellipsis-h "></a></span>');
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

                            },
                            onShowModalEvent:hideModalEvent,
                            onHideModalEvent:showModalEvent
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
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a href="javascript:void(0);" href="javascript:void(0);" class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a href="javascript:void(0);" href="javascript:void(0);" class="fa fa-ellipsis-h"></a></span>');
                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);
                        var orgFilter=getOrgType(fieldCode);
                        $(inputAddonFa).xljSingleSelector({
                            treeUrl: 'http://127.0.0.1:9999/platform-app//sys/org/root/getOrgTreeByType'+'?time='+Math.random(),
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
                            },
                            onShowModalEvent:hideModalEvent,
                            onHideModalEvent:showModalEvent
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
                            textInputObj.addClass('read-only');
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
                            textInputObj.addClass('read-only');
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
                            tbody.append(tempRow);
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
        var lastTrObj = tbody.find("tr:last");
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

        table.append(tbody);

        //判断最后一行是否有显示的input域，如果没有则整行隐藏
        var lastTrVisibleInputs = lastTrObj.find(':input:visible');
        if(!lastTrVisibleInputs[0]){
            lastTrObj.hide();
        }

        //动态添加时间事件
        $('.form_datetime').find(':input').on('click',function () {
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd HH:mm:ss",
                errDealMode: -1
            });
        });
        $('.form_datetime').find(':input').siblings('.input-group-addon').on('click',function () {
            WdatePicker({
                el: $(this).siblings(':input')[0],
                dateFmt: "yyyy-MM-dd HH:mm:ss",
                errDealMode: -1
            });
        });

        $('.form_datetime').on('show',function(){hideModalEvent();})
        $('.form_datetime').on('hide',function(){showModalEvent();})

        var attachTitlePic = $('#attach_titlePic');
        if(attachTitlePic&&attachTitlePic.length>0) {
            try{
                $('#attach_titlePic').xljAttachment({
                    appId: '1',
                    businessId: urlParams.contentRowTypeId,
                    categoryId: '2',
                    mode: urlParams.oper,
                    singleUpload: true,
                    onShowModalEvent:showModalEvent,
                    onHideModalEvent:hideModalEvent,
                });
            }catch (e){
                console.warn('附件组件初始化失败');
            }
        }
        
        //替换所属目录input为select
        var contentChildNameObj = table.find('input[name="contentChildName"]');
        if(contentChildNameObj[0]){
            var pTdObj = contentChildNameObj.parent('td');
            var contentChildId = $("#contentChildId").val();
            var fieldName = contentChildNameObj.attr("data-placeholder");
            var fieldCode = "contentChildName";
            var isRequired = contentChildNameObj.attr("data-required");
            
            var textInputObj = $("<div class='input-group form-date resetwidth'></div>");
            var hiddenInputObj = $('<input type="hidden">');
	            hiddenInputObj.attr('id',"contentChildId");
	            hiddenInputObj.attr('name',"contentChildId");
	            hiddenInputObj.val(contentChildId);
	            textInputObj.append(hiddenInputObj);
            var inputObj = $("<div class='input-group form-date resetwidth'><input  onmouseover='this.title=this.value' type='text'class='form-control addInputWidth' id='"+fieldCode+"'  name='" + fieldCode + "' readonly='readonly' placeholder='选择目录'/>");
            if (isRequired == 'true'){
                inputObj.attr('data-required','true');
                inputObj.attr('data-placeholder',fieldName);
            }
            textInputObj.append(inputObj);
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
            var inputAddonRemove = $('<div class="input-group-addon resetposition"><a href="javascript:void(0);" class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
            var inputAddonFa = $('<span class="input-group-addon w28"><a href="javascript:void(0);" class="fa fa-ellipsis-h "></a></span>');
            textInputObj.append(inputAddonRemove);
            textInputObj.append(inputAddonFa);
            pTdObj.html('');
            pTdObj.append(textInputObj);
            $(inputAddonFa).xljSingleSelector( {
            	treeUrl:serviceUrl + 'oa/content/contentChild/queryList'+'?time='+Math.random(),
				treeParam:{
					'contentTypeId':urlParams.contentTypeId,
					'delflag':false
				},
				selectNodeType:{
					"isParent":false,
					"msg":"请先选择所属的具体新闻目录！"
				},
				treeSettings:{
	                "data":{
	                    "simpleData":{
	                        "enable":true,
	                        "idKey":"id",
	                        "pIdKey":"parentId",
	                        "rootPId":null
	                    }
	                },
	                callback:{
	                    onNodeCreated:function (event,treeId,treeNode) {
	                        if(contentChildId==treeNode.id){
	                            $.fn.zTree.getZTreeObj(treeId).removeNode(treeNode,false);
	                        }

	                    }
	                }
	            },
                title:"选择所属目录",
                selectorType:"contentChildName",
                targetId:targetId,
                targetName:fieldCode,
                saveCallback:function (selectData,ele) {
            		 $(ele).val(selectData.name);
            		 $('#'+targetId).val(selectData.id);
                },
                onShowModalEvent:hideModalEvent,
                onHideModalEvent:showModalEvent
            });
        }
        /**
         * 绑定下拉框事件
         */
        $('#codeType').change(function(){
            var codeType = $('#codeType').val();
            if(codeType){
                var date=new Date;
                var year=date.getFullYear();

                if(urlParams.oper=='edit'){
                    if(codeType == urlParams.codeType){
                        $('#code').val(urlParams.code);
                        urlParams.oldCode = urlParams.code;
                        urlParams.oldCodeType = codeType;
                        return ;
                    }
                }
                var code = codeType+"〔"+year+"〕"+"1号"
                $.ajax({
                    type: "get",
                    url: serviceUrl + "oa/content/contentRowType/getCodeByCodeType?code=" + encodeURIComponent(code)+"&codeType="+encodeURIComponent(codeType)+"&time="+Math.random(),
                    dataType: "json",
                    success: function (contentObj) {
                        if(contentObj.success){
                            var code = contentObj.result;
                            $('#code').val(code);
                            urlParams.oldCode = code;
                            urlParams.oldCodeType = codeType;
                        }else{
                            var date=new Date;
                            var year=date.getFullYear();
                            $('#code').val(codeType+"〔"+year+"〕"+"1号");
                            urlParams.oldCode = codeType+"〔"+year+"〕"+"1号";
                            urlParams.oldCodeType = codeType;
                        }
                    },
                    error:function (xhr) {
                        var date=new Date;
                        var year=date.getFullYear();
                        $('#code').val(codeType+"〔"+year+"〕"+"1号");
                        urlParams.oldCode = codeType+"〔"+year+"〕"+"1号";
                        urlParams.oldCodeType = codeType;
                    }
                });
            }else{
                $('#code').val('');
                urlParams.oldCode = urlParams.code;
                urlParams.oldCodeType = urlParams.codeType;
            }
        });
        /**
         * 绑定编码输入框事件
         */
        $('#code').change(function(){
            var codeType = $('#codeType').val();
            var code = $('#code').val();
            var year = code.substring(code.indexOf("〔")+1, code.indexOf("〕"));
            if(urlParams.oldCode.substring(code.indexOf("〔")+1, code.indexOf("〕")) ==year&&codeType == urlParams.oldCodeType){
                return;
            }

            if(undefined!=codeType&&""!=codeType&&null!=codeType){
                // if(urlParams.oper=='edit'){
                //     if(codeType == urlParams.codeType&&year==updateData.code.substring(updateData.code.indexOf("〔")+1, updateData.code.indexOf("〕"))){
                //         $('#code').val(urlParams.code);
                //         return ;
                //     }
                // }

                var date=new Date;
                var nowYear=date.getFullYear();

                //var subCode = code.substring(code.indexOf("〔"));
                // var code = new RegExp("").test(code)?code:codeType+"〔"+year+"〕"+"1号";
                var result=code.match(/^[\u4e00-\u9fa5]{1,}[〔]{1}\d{4}[〕]{1}\d{1,}[\u4e00-\u9fa5]$/);
                if(result==null){
                    code = codeType+"〔"+nowYear+"〕"+"1号";
                    $('#code').val(code);
                    urlParams.oldCode = code;
                    urlParams.oldCodeType = codeType;
                }else  if(urlParams.codeType==codeType&&urlParams.year == year){
                    $('#code').val(urlParams.code);
                    urlParams.oldCode = code;
                    urlParams.oldCodeType = codeType;
                }else{
                    $.ajax({
                        type: "get",
                        url: serviceUrl + "oa/content/contentRowType/getCodeByCodeType?code=" + encodeURIComponent(code)+"&codeType="+encodeURIComponent(codeType)+"&time="+Math.random(),
                        dataType: "json",
                        success: function (contentObj) {
                            if(contentObj.success){
                                var code = contentObj.result;
                                $('#code').val(code);
                                urlParams.oldCode = code;
                                urlParams.oldCodeType = codeType;
                            }
                        },
                        error:function (xhr) {
                            var date=new Date;
                            var year=date.getFullYear();
                            $('#code').val(codeType+"〔"+year+"〕"+"1号");
                            urlParams.oldCode = codeType+"〔"+year+"〕"+"1号";
                            urlParams.oldCodeType = codeType;
                        }
                    });
                }
            }
        });
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
     * 清空选择器
     */
    window.clearSelector=function(id,name) {
        $('#'+id).val('');
        $('#'+name).val('');
    }

    /**
     * 添加附件操作行
     * @param table
     */
    function addAttachToForm(table,contentRowTypeId) {
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
                mode: urlParams.oper,
                singleUpload: false,
                hideButtonsWithNoFile:false,
                onShowModalEvent:showModalEvent,
                onHideModalEvent:hideModalEvent,
                loadFilesDone:function () {
                    resizeOfficeIframe();
                },
                fileUploaded:function () {
                    resizeOfficeIframe();
                }
            });
        }catch (e){
            //    console.warn('附件初始化失败！');
        }
    }

    /**
     * 隐藏office
     */
    function showModalEvent(){
        $("#contentOffice").contents().find("#activeTd").show();
    }
    /**
     * 展开office
     */
    function hideModalEvent(){
        $("#contentOffice").contents().find("#activeTd").hide();
    }
    /**
     * 添加正文金格office操作行
     * @param table
     */
    function addOfficeToForm(table,contentRowTypeId) {
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
        if(urlParams.approveType&&urlParams.approveType=='JG'){
            //onload="resizeOfficeIframe()"
            contentIframeObj.attr('onload','resizeOfficeIframe()');
        }

        contentDivObj.append(contentIframeObj);
        if(urlParams.oper=='add') {
            contentIframeObj.attr('src','../../iwebOffice/demoOffice.html?operationType=addForm&contentRowTypeId='+contentRowTypeId + '&_t='+new Date().getTime());
        }else if(urlParams.oper=='edit'){
            contentIframeObj.attr('src','../../iwebOffice/demoOffice.html?operationType=updateData&contentRowTypeId='+contentRowTypeId + '&_t='+new Date().getTime());
        }


    }

    /**
     * 初始化新闻正文附件参数
     */
    function initDocContentAttachment(contentRowTypeId) {
        //var def = new $.Deferred();
        $.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "-1", function (okFlag, data) {
            if (okFlag) {
                if (data.result != null && data.result.length > 0) {
                   // var docAttachmentObj = {};
                    var webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
                    var group = data.result[0].path;
                    $('#Group').val(group);
                    $('#FileGroupPath').val(webOfficeUrl);


                    //def.resolve(docAttachmentObj);
                }
            }
        },false);
        //return def.promise();
    }

    /**
     * 初始化表单数据
     */
    function initFormData(initData) {
        if(urlParams.oper=='add'){
            initData = {};
            var userDef = getUserInfo();
            $.when(userDef).done(function (curentUserInfo) {
                initData.businessObjectCode = urlParams.businessObjectCode;
                initData.createPersonName = curentUserInfo.currentUser?curentUserInfo.currentUser.realName:'';
                initData.createPersonId = curentUserInfo.currentUser?curentUserInfo.currentUser.id:'';
                initData.agencyName = curentUserInfo.currentUser?curentUserInfo.currentUser.realName:'';
                initData.agencyId = curentUserInfo.currentUser?curentUserInfo.currentUser.id:'';
                initData.belongCompanyName = curentUserInfo.currentCompany?curentUserInfo.currentCompany.name:'';
                initData.belongCompanyId = curentUserInfo.currentCompany?curentUserInfo.currentCompany.id:'';
                initData.belongDeptName = curentUserInfo.currentDept?curentUserInfo.currentDept.name:'';
                initData.belongDeptId = curentUserInfo.currentDept?curentUserInfo.currentDept.id:'';
                initData.contentTypeName = urlParams.contentTypeName;
                initData.contentTypeId = urlParams.contentTypeId;
                initData.contentChildName = urlParams.contentChildName;
                initData.contentChildId = urlParams.contentChildId;
                initData.createDate = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
                initData.author = curentUserInfo.currentUser?curentUserInfo.currentUser.realName:'';
                initData.authorId = curentUserInfo.currentUser?curentUserInfo.currentUser.id:'';
                var authorOrgId = curentUserInfo.currentUser?curentUserInfo.currentUser.belongOrgId:'';//用户所属组织
                $("#orgId").val(authorOrgId);

                initForm(initData);
            });

        }else {
            if(initData){
                initForm(initData);
            }
        }
    }

    /**
     * 初始化form表单数据
     * @param initData
     */
    function initForm(initData) {
        for(var item in initData) {
            var inputObj = $('#newContentForm :input[name="'+item+'"]');
            var inputType = $(inputObj[0]).attr('type');
            if(inputType=='radio'){
                var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+initData[item]+'"]')[0];
                if(inputObj) {
                    inputObj.checked = true;
                }
            }else if(inputType=='select'){
                var inputObj = $('#newContentForm :input[name="'+item+'"] option[value="'+initData[item]+'"]')[0];
                if(inputObj) {
                    inputObj.selected = true;
                }
            }else if(inputType=='checkbox'){
            	var checkboxValues = initData[item].split(",");
            	for(var checkValue in checkboxValues) {
            		var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+checkboxValues[checkValue]+'"]')[0];
                    if(inputObj) {
                        inputObj.checked = true;
                    }
            	}
                
            }else{
                inputObj.val(initData[item]);
            }
        }
    }
    /**
     * 获取用户信息
     */
    function getUserInfo(){
        var def = new $.Deferred();
        $.ajax({
            url:serviceUrl+'oa/content/contentRowType/getUserInfo?time='+Math.random(),
            type:'GET',
            dataType:'JSON',
            //async:false,
            success:function (returnData) {
                var curentUserInfo = {};
                curentUserInfo.currentUser = returnData.result.securityUserDto;
                curentUserInfo.currentCompany = returnData.result.securityDirectCompanyDto;
                curentUserInfo.currentDept = returnData.result.securityDirectDeptDto;

                urlParams.currentUserId = returnData.result.securityUserDto.id;
                def.resolve(curentUserInfo);
            }
        });
        return def.promise();
    }

    /**
     * 获取更新时数据
     * @param contentRowTypeId
     * @returns {{}}
     */
    function getDataForUpdate(contentRowTypeId) {
        var updateDef = new $.Deferred();
        $.ajax({
            type: "get",
            url: serviceUrl + "oa/content/contentRowType/queryObjectInfoById/" + contentRowTypeId+"?time="+Math.random(),
            dataType: "json",
            success: function (contentObj) {
                var updateData = {};
                if(contentObj.success){
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
                    updateDef.resolve(updateData);
                }
            },
            error:function (xhr) {
                $.xljUtils.tip('red','获取更新新闻对象失败！')
            }
        });
        return updateDef.promise();
    }

    /**
     * 预览
     */
    function staticPagePreview(){
        //调用office预览方法
        document.getElementById('contentOffice').contentWindow.staticPagePreview($('#id').val());
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
        }

        if (urlParams.oper == 'edit') {
            url = serviceUrl + 'oa/content/contentRowType/update/'+ $('#id').val();
            method = 'PUT';
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
            //jsonData[formFields[i].name]=cv;
            
            if(!jsonData[formFields[i].name]){
            	jsonData[formFields[i].name]=cv;
			}else{
				jsonData[formFields[i].name] = jsonData[formFields[i].name] + "," + cv;
			}
            
            //jsonData[formFields[i].name]=$.xljUtils.encodeSpecialChars(formFields[i].value);
        }
        jsonData['relationId']=jsonData.id;
        if(saveType=='publish'){
            jsonData['status'] = 'PUBLISHED';
            jsonData['publishDate'] = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
        }
        //保存附件
        var defObjs = saveAttachement();

        var def = new $.Deferred();
        //ajax方式提交表单，提交时以json格式提交
        $.when(defObjs.attachDef,defObjs.picDef).done(function () {
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



                        if(saveType!=='preView'){
                            //保存金格office
                            document.getElementById('contentOffice').contentWindow.saveOffice(jsonData.id);
                        }

                        def.resolve(true);
                        if((saveType=='temporary'||saveType=='save'||saveType=='publish')){
                            if((urlParams.approveType&&urlParams.approveType=='JG')&&saveType=='save'){
                                $.xljUtils.tip('green','新闻表单数据保存成功！');
                                cancelSaveBusiForm();
                                return;
                            }
                            document.getElementById('contentOffice').contentWindow.closeOffice();
                            if(window.opener != null){
                                window.opener.reloadGrid(jsonData.id,'contentRowGrid');
                            }
                            //如果是暂存则刷新当前页面
                            if(saveType=='temporary') {
                                window.location.href = serviceUrl + "content/contentRowType/contentRowType_news_edit.html?id=" + jsonData.id + "&oper=edit&contentTypeId=" + jsonData.contentTypeId;
                                return;
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
                            window.location.href = serviceUrl + 'flow/runtime/approve/start.html?businessObjectCode='+urlParams.businessObjectCode+'&businessId='+jsonData.id;
                        }else if(saveType=='preView'){
                            // document.getElementById('contentOffice').contentWindow.SaveAsHtml();
                            window.open("contentRowType_staticPage.html?id="+jsonData.id+"&contentTypeId="+jsonData.contentTypeId);
                        }



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
        });
        return def.promise();

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
                    }
                    def1.resolve(true);
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

    //校稿环节显示流程审批页面保存/取消保存按钮
    if(urlParams.approveType&&urlParams.approveType=='JG'){
        $('body').css({'min-width':'100%'});
        $('.xj-form-header').hide();
        $('#_base').css({'margin-top':'0px'});
        var editBusiFormBtn = window.parent.document.getElementById('editBusiForm');
        var saveBusiFormBtn = window.parent.document.getElementById('saveBusiForm');
        var cancelSaveBusiFormBtn = window.parent.document.getElementById('cancelSaveBusiForm');
        $(editBusiFormBtn).hide();
        $(saveBusiFormBtn).show();
        $(cancelSaveBusiFormBtn).show();

        window.onunload = function () {
            if (window.parent&&window.parent.document.bizForm){
                var bizForm = window.parent.document.bizForm;
                $(window.parent.document.getElementById('bizForm')).height(200);
            }
        }
    }

    //供外部调用
    window.saveBusiForm = function () {
        var contentRowTypeId = $('#id').val();
        submitForm('save');
    };

    //供外部调用
    window.cancelSaveBusiForm = function () {
        var contentRowTypeId = $('#id').val();
        window.location.href = serviceUrl + 'content/contentRowType/contentRowType_news_view.html?businessId='+contentRowTypeId+'&time='+new Date().getTime()+
            '&bizId='+contentRowTypeId+'&flCode='+urlParams.businessObjectCode+'&DTL_SESSION_ID=&userId='
            +urlParams.currentUserId+'&approveType='+urlParams.approveType+'&iframeMode='+urlParams.iframeMode;
    };

    //校稿环节重新计算外部iframe高度
    window.resizeOfficeIframe = function () {
        if(urlParams.approveType&&urlParams.approveType=='JG') {
            var b_iframe = document.getElementById("contentOffice");
            // alert($(b_iframe).width() + "=======")
            if(document.contentOffice.document.body){
                $($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
                $($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});
                $(b_iframe).height(document.contentOffice.document.body.scrollHeight+120);
            }


            if (window.parent&&window.parent.document.bizForm){
                var bizForm = window.parent.document.bizForm;
                $(window.parent.document.getElementById('bizForm')).height(bizForm.document.body.scrollHeight+20);
            }
        }
    };

});