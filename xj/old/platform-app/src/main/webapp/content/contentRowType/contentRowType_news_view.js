/**
 * @author dgh
 * @date 2017/05/25
 */
$(function () {
    var urlParam = $.xljUtils.getUrlParams();
    var contentRowTypeId = urlParam.contentRowTypeId;
    if(!contentRowTypeId){
        contentRowTypeId = urlParam.businessId;
    }

    //判断当前审批环节是否是校稿环节
    var approveType = urlParam.approveType;
    if(approveType=='JG'){
       /* window.location.href = hostUrl + 'content/contentRowType/contentRowType_news_edit.html?ids=' + contentRowTypeId + '&oper=edit&approveType=JG';
        return;*/
    }


    /**
     * 创建新闻form表单
     */
    function createContentRowTypeForm() {
        $('body').css({'min-width':'100%'});
        $.ajax({
            type: "get",
            url: baseUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
            dataType: "json",
            //async:false,
            success: function (contentObj) {
                var contentRowType = contentObj.result;
                var attributeValue = contentRowType.attributeValue;
                var initData;
                if(attributeValue&&attributeValue!=''){
                    initData = JSON.parse(attributeValue);
                    $.ajax({
                        type: "post",
                        contentType: "application/json",
                        url: baseUrl + "oa/content/contentRowAttribute/queryList?time=" + Math.random(),
                        data: JSON.stringify({'contentTypeId':initData.contentTypeId,'isFormView':true,'isUsing':true}),
                        dataType: "json",
                        success: function (result) {
                            //动态创建form表单
                            createForm(result.result);
                            initFormData(initData);

                            //添加正文金格office
                            addOfficeToForm($("#newContentTbody"));

                            //添加附件操作行
                            addAttachToForm($("#newContentTbody"));

                            resizeOfficeIframe();

                        }
                    });
                }

            }
        });

    }
    createContentRowTypeForm();

    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        var table = $("#newContentTbody");
        var tbody = $('<tbody></tbody>');
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
                            var inputLabelObj = $('<label class="radio-inline"><input type="radio" disabled></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name',fieldCode);
                            inputObj.attr('id',fieldCode+count);
                            inputObj.val(item.val);
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
                        textInputObj=$('<select class="form-control addInputWidth" disabled></select>');
                        textInputObj.attr('name',fieldCode);
                        textInputObj.attr('id',fieldCode);
                        $.each(enumList,function (i,item) {
                            var optionObj = $('<option value="'+item.val+'">'+item.name+'</option>');
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
                            var inputLabelObj = $('<label class="checkbox-inline"><input type="checkbox" disabled></label>');
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
                    case 'file':

                        labelObj = $('<label></label>');
                        textInputObj = $('<div id="attach_'+fieldCode+'"></div>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                        }

                        labelObj.append(fieldName+' : ');
                        if(fieldCode!='titlePic'){
                            try{
                                textInputObj.xljAttachment({
                                    appId: '1',
                                    businessId: contentRowTypeId,
                                    categoryId: fieldCode,
                                    mode: 'view',
                                    singleUpload: true,
                                    hideButtonsWithNoFile:true
                                });
                            }catch (e){
                                console.warn('附件组件初始化失败');
                            }
                        }

                        break;
                    case 'textarea':
                        labelObj = $('<label></label>');
                        textInputObj = $('<textarea class="form-control addInputWidth" disabled></textarea>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }

                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
                        break;
                    default:
                        labelObj = $('<label></label>');
                        textInputObj = $('<input type="text" class="form-control addInputWidth" disabled>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }

                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
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
                    var colspan = $(rowTds[1]).attr('colspan');
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
        var colspanAttr = $(lastTrTds[1]).attr('colspan');
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

        //图片新闻的标题图片
        var attachTitlePic = $('#attach_titlePic');
        if(attachTitlePic&&attachTitlePic.length>0) {
            try{
                $('#attach_titlePic').xljAttachment({
                    appId: '1',
                    businessId: contentRowTypeId,
                    categoryId: '2',
                    mode: 'view',
                    singleUpload: false,
                    hideButtonsWithNoFile:true
                });
            }catch (e){
                console.warn('附件组件初始化失败');
            }
        }


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
            url: baseUrl + 'oa/dictionary/contentDictionaryItem/queryListDictionaryItem',
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
     * 添加附件操作行
     * @param table
     */
    function addAttachToForm(table) {
        //添加附件操作
        var attachTrObj = $('<tr class="form-tr"></tr>');
        var attachLabelTdObj = $('<td class="form-label"><label>附件 : </label></td>');
        attachTrObj.append(attachLabelTdObj);

        var attachTdObj = $('<td colspan="3"></td>');
        attachTrObj.append(attachTdObj);
        var attachContentDivObj = $('<div id="attach_'+contentRowTypeId+'"></div>');
        attachTdObj.append(attachContentDivObj);

        table.find('tbody').append(attachTrObj);
        //初始化附件
        try{
            /*$('#'+attachContentDivObj.attr('id')).xljAttachment({
                appId: '1',
                businessId: contentRowTypeId,
                categoryId: '1',
                mode: urlParams.oper,
                singleUpload: false,
                hideButtonsWithNoFile:false
            });*/
            $('#'+attachContentDivObj.attr('id')).xljAttachment({
                appId: '1',
                businessId: contentRowTypeId,
                categoryId: '1',
                mode: 'view',
                singleUpload: false,
                hideButtonsWithNoFile:true,
                loadFilesDone:function () {
                    resizeOfficeIframe();
                }
            });
        }catch (e){
            console.warn('附件初始化失败！');
        }

    }

    /**
     * 添加正文金格office操作行
     * @param table
     */
    function addOfficeToForm(table) {
        //添加正文金格office
        var contentTrObj = $('<tr class="form-tr"></tr>');
        //var contentLabelTdObj = $('<td class="form-label"><label>新闻正文 : </label></td>');
        //contentTrObj.append(contentLabelTdObj);

        var contentTdObj = $('<td colspan="4"></td>');
        contentTrObj.append(contentTdObj);
        var contentDivObj = $('<div id="officeJk" style="min-height:200px;"></div>');//$('<div class="embed-responsive embed-responsive-16by9" id="officeJk" style="padding-bottom: 40%"></div>');
        contentTdObj.append(contentDivObj);

        if($('#bizForm')[0]){
            contentDivObj.width($('#bizForm').width()-100);
            contentDivObj.css({'overflow':'auto'});
        }
        var contentIframeObj = $('<iframe class="embed-responsive-item" src="" id="contentOffice" name="contentOffice" onload="resizeOfficeIframe()" frameborder="no" border="0" onunload="javascript:alert(\'hello\');"></iframe>');
        contentIframeObj.css({width:'100%',border:'none'});

        $.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "0", function (okFlag, data) {
            if (okFlag) {
                if (data.result != null && data.result.length > 0) {
                    webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
                    var obj={};
                    obj.FILENAME = webOfficeUrl.substring(webOfficeUrl.lastIndexOf('/')+1);
                    obj.GROUP = data.result[0].path;
                    obj.NAME = data.result[0].name;
                    obj.ISMINVERSION = IEVersion();
                    $.ajax({
                        url:baseUrl + "iwebOffice/getHtmlPath" + "?time=" + Math.random(),
                        data:JSON.stringify(obj),
                        type:"POST",
                        contentType:'application/json',
                        dataType:'JSON',
                        async:false,
                        success:function (resultData ) {
                            if(resultData) {
                                var successFlag = resultData.success;
                                if(successFlag) {
                                    //$('#officeJk').load("../../"+resultData.msg);
                                    contentIframeObj.attr('src','../../'+resultData.msg+'?_t='+new Date().getTime());
                                    //contentDivObj.load(hostUrl+resultData.msg);
                                }else {
                                    $.xljUtils.tip("red",'获取静态页面失败！');
                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                        }
                    });
                }
            }
        },false);
        contentDivObj.append(contentIframeObj);

        table.find('tbody').append(contentTrObj);
    }

    //判断是否是IE浏览器
    function IEVersion(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if(isIE){
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion < 11)
            { return true;}
            else
            { return false}//IE版本过低
        }else{
            return false;//非IE
        }
    }

    /**
     * 初始化form表单数据
     */
    function initFormData(initData) {
        //var initData = {};
        if(initData){
            for(var item in initData) {
                var inputObj = $('#newContentForm :input[name="'+item+'"]');
                var inputType = $(inputObj[0]).attr('type');
                if(inputType=='radio'||inputType=='checkbox'){
                    var inputObj = $('#newContentForm :input[name="'+item+'"][value="'+initData[item]+'"]')[0];
                    if(inputObj) {
                        inputObj.checked = true;
                    }
                }else{
                    inputObj.val(initData[item]);
                }
            }
        }

    }

    //校稿环节显示流程审批页面保存/取消保存按钮
    if(urlParam.approveType&&urlParam.approveType=='JG'&&urlParam.iframeMode&&urlParam.iframeMode=='edit'){
        var editBusiFormBtn = window.parent.document.getElementById('editBusiForm');
        var saveBusiFormBtn = window.parent.document.getElementById('saveBusiForm');
        var cancelSaveBusiFormBtn = window.parent.document.getElementById('cancelSaveBusiForm');
        $(editBusiFormBtn).show();
        $(saveBusiFormBtn).hide();
        $(cancelSaveBusiFormBtn).hide();
    }

    //刷新父页面grid列表
    window.parent.window.onbeforeunload = function () {
        if(window.parent&&window.parent.opener&&$.isFunction(window.parent.opener.reloadGrid)){
            window.parent.opener.reloadGrid(contentRowTypeId,'contentRowGrid');
        }
    };

    //供外部页面调用
    window.editBusiForm = function () {
        window.location.href = hostUrl + 'content/contentRowType/contentRowType_news_edit.html?_time='+new Date().getTime()+'&id='+contentRowTypeId+'&oper=edit&approveType='+urlParam.approveType+'&iframeMode='+urlParam.iframeMode;
    };

    $(window).on('resize',function () {
        resizeOfficeIframe();
    });
});

function resizeOfficeIframe() {
    var b_iframe = document.getElementById("contentOffice");
    /*$($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
     $($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});*/
    if(b_iframe){
        if(window.contentOffice && window.contentOffice.document.body){
            $($(window.contentOffice.document).find('p[style*="margin-right"]')).css({margin:'auto'});
            $($(window.contentOffice.document).find('span')).css({'word-wrap': 'break-word'});
            $(b_iframe).height(window.contentOffice.document.body.scrollHeight);
        }
    }

    /*if (window.parent && window.parent.document.bizForm) {
        var bizForm = window.parent.document.bizForm;
        $(window.parent.document.getElementById('bizForm')).height(bizForm.document.getElementsByTagName('body')[0].scrollHeight);
    } else {
        // ff
        // var iframeBody = document.getElementById('bizForm').contentDocument.body;
        // b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
        var iframeBody = $(window.parent.document.documentElement).find("#bizForm");
        iframeBody.height(iframeBody[0].contentDocument.body.scrollHeight + 20);
    }*/
    var topWinSrc;
    try{
        topWinSrc = window.top.location.href;
        if(topWinSrc.indexOf('#')!=-1){
            topWinSrc = topWinSrc.substring(0,topWinSrc.indexOf('#'));
        }
        window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
    }catch(e){
        topWinSrc = $.xljUtils.getUrlParam('topWinSrc');
        if(topWinSrc){
            window.top.location = topWinSrc + '#flowTopHeight='+window.document.body.scrollHeight;
        }
    }
    
}
