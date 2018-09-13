;(function ($,window,document,CKEDITOR) {

    /**
     * @author:luorongxin
     */
    /**
     * 全局变量
     */
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
    //在线编辑器
    var editor;
    //新版本主键id
    var newId;
    //版本信息
    var version;
    //多版本文档 id
    var relationId;
    //文档状态
    var status;
    /**
     * 初始化数据操作
     */
    /**
     */
    $(document).ready(function () {

        try {

            computeIframe();
            //编辑的新闻ID
            contentRowTypeId = $.xljUtils.getUrlParam('ids');
            //所属的目录ID
            contentChildId = $.xljUtils.getUrlParam('contentChildId');
            //所属的目录编码
            contentChildCode = decodeURI(escape($.xljUtils.getUrlParam('contentChildCode')));
            //所属的目录名称
            contentChildName = decodeURI(escape($.xljUtils.getUrlParam("contentChildName")));
            //所属的大类ID
            contentTypeId = $.xljUtils.getUrlParam('contentTypeId');
            //所属的大类编码
            contentTypeCode = $.xljUtils.getUrlParam('contentTypeCode');
            //所属的大类名称
            contentTypeName = decodeURI(escape($.xljUtils.getUrlParam("contentTypeName")));
            //操作 新增add 编辑edit
            oper = $.xljUtils.getUrlParam('oper');
            //是否启动审批
            process = $.xljUtils.getUrlParam('process');
            //业务对象code
            businessObjectCode = $.xljUtils.getUrlParam('businessObjectCode');
           //版本信息
            version =  $.xljUtils.getUrlParam('version');
            //文档状态
            status = $.xljUtils.getUrlParam('status');
            if(process=='true'){
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
                if(status!='PUBLISHED'){
                    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='processBtn'>发起流程</button>");
                }
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='conclusionBtn'>审结</button>");
                // $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='associatedBtn'>关联文档</button>");
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='viewBtn'>预览</button>");
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='temporarySaveBtn'>暂存</button>");
            }else{
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
                // $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='associatedBtn'>关联文档</button>");
                // $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='saveBtn'>保存</button>");
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='publishBtn'>发起审批</button>");
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='temporarySaveBtn'>暂存</button>");
                $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='viewBtn'>预览</button>");
            }

        
            //新增页面
            if(oper == "add"){
                $.ajax({
                    type: 'get',
                    url: hostUrl + "generator/getGuuid?time=" + Math.random(),
                    success: function (data) {
                        contentRowTypeId = data.result;
                        $('.xj-form-title span').text('新增');
                        $('#id').val(contentRowTypeId);
                        console.log('contentRowTypeId=================='+contentRowTypeId);
                        //创建contentRowType的form表单
                        createContentRowTypeForm();
                    }
                });

            }
            //修改
            if (oper == "edit") {
                //如果是修改，则要把新闻的数据填充上去
                $("#id").val(contentRowTypeId);
                $('.xj-form-title span').text('修改');
                //创建contentRowType的form表单并回显属性
                createContentRowTypeForm();
                $('#docContentForm').height($(window).height() - $('.xj-form-header').height());
            }
              //新增版本
            if(oper == 'newVersion'){
                //新版本ID
                newId = $.xljUtils.getUrlParam('newId');
                //创建contentRowType的form表单并回显属性
                createContentRowTypeForm();
                $('#docContentForm').height($(window).height() - $('.xj-form-header').height());
                $('.xj-form-title span').text('新增');
               /* $.ajax({
                    type: 'get',
                    url: hostUrl + "generator/getGuuid?time=" + Math.random(),
                    success: function (data) {
                        $('.xj-form-title span').text('新增');
                        newId = data.result;

                    }
                });*/
            }
            //绑定按钮事件
            bindButton();
        } catch (e) {

        }

    });
    /**
     * 加载在线编辑器
     */

    function initEditor() {
        //加载在线编辑器
        var ckH = $(window).height() - 360;

        if(CKEDITOR.instances['content']){
            CKEDITOR.remove(CKEDITOR.instances['content']);
        }
        editor = CKEDITOR.replace('content',  { height: ckH + 'px' });

        CKEDITOR.on('instanceReady', function (ev) {
            editor = ev.editor;
            editor.setReadOnly(false);

        });
    }

    /**
     * 初始化页面
     */
    function computeIframe() {
        // $('#docContentForm').css({overflow: 'hidden'});
        $('#docContentForm').height($(window).height() - $('.xj-form-header').height());
        //美化滚动条
        // addNiceScroll();
    }
    /**
     * 页面滚动条
     */
    function addNiceScroll() {
        $("#docContentForm").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"

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
            submitForm('preView');
        });
        //流程发起按钮
        $("#processBtn").click(function () {
            submitForm('process');
        });
        //流程审结按钮
        $("#conclusionBtn").click(function () {
            submitForm('conclusion');
        });
        //大类未开启审批流程时的发起审批按钮
        $("#publishBtn").click(function () {
            submitForm('publish');
        });
        //关闭按钮

        $("#closeBtn").click(function () {
            if(window.opener!=null){
                try{
                    window.opener.reloadGrid();
                }catch (e){
                }
            }
            window.close();
        });
    }


    /**
     * 创建新闻form表单
     */
    function createContentRowTypeForm() {
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: hostUrl + "oa/content/contentRowAttribute/queryList?time=" + Math.random(),
            data: JSON.stringify({'contentTypeId':contentTypeId,'isFormView':true,'isUsing':true}),
            dataType: "json",
            success: function (result) {
                createForm(result.result);
                var table = $('#docContentTbody');
                //添加编辑器行
                addEditorToForm(table);
                //添加附件操作行
                addAttachToForm(table);
                //添加关联文档操作行
                addAssociatedToForm(table);
                if(oper=='add'){
                    //加载editor
                    initEditor();
                }
                if(oper == 'edit'){
                    //回显属性
                    echoContentRowType(contentRowTypeId);
                    //回显关联文档
                    loadAssociatedList(contentRowTypeId);
                }else if(oper=='newVersion'){
                    //回显属性
                    echoContentRowType(contentRowTypeId);
                    $('#createDate').val($.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date()));
                    //回显关联文档
                    loadAssociatedList(newId);
                }else if(oper == 'add'){
                    //传入创建人 大类 目录信息
                    $('#contentTypeId').val(contentTypeId);
                    $('#contentTypeName').val(contentTypeName);
                    $('#contentChildId').val(contentChildId);
                    $('#contentChildName').val(contentChildName=="null"?"":contentChildName);
                    $('#createDate').val($.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date()));
                    $('#version').val('1.0');
                    //获取用户信息
                    getUserInfo();
                }
            }
        });
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
                businessId: oper=='newVersion'?newId:contentRowTypeId,
                categoryId: '1',
                mode: (oper!='newVersion')?oper:'edit',
                singleUpload: false,
                fromTempTable:oper=='newVersion'?true:false,
                isAsyncSubmit:false //,
            //    serverAddr:location.protocol + '//' + location.host + baseUrl
            });
        }catch (e){
            console.warn('附件初始化失败！');
        }
    }

    /**
     * 添加关联文档
     */
    function addAssociatedToForm(table) {
        //添加关联文档tr
        var associatedTrObj = $('<tr class="form-tr"></tr>');
        table.append(associatedTrObj);

        var associatedLabelTdObj = $('<td class="form-label"><label>关联文档 : </label></td>');
        associatedTrObj.append(associatedLabelTdObj);

        var associatedTdObj = $('<td colspan="3"></td>');
        associatedTrObj.append(associatedTdObj);
        var associatedDivObj = $('<div class="col-sm-12" ></div>');
        associatedTdObj.append(associatedDivObj);
        var associatedObj = $('<div ><span style="margin-left: 44px;"><a href="javascript:void(0)" id="associatedBtn">添加文档</a></span><p><ul id="associatedList"></ul></p></div>');
        associatedDivObj.append(associatedObj);
        //关联文档
        $('#associatedBtn').click(function () {
            if(oper!='newVersion'){
                window.open('contentRowTypeAssociated_list.html?id='+contentRowTypeId);
            }else{
                window.open('contentRowTypeAssociated_list.html?id='+newId);
            }
        });
    }

    /**
     *  刷新关联文档
     */
    function loadAssociatedList(id) {
       $('#associatedList').empty();
        try{
            $.ajax({
                type: "post",
                url: hostUrl+'oa/contentRowTypeAssociated/queryList?_t'+new Date().getTime(),
                contentType:"application/json",
                dataType: "json",
                data:JSON.stringify({"delflag":false,'sortFields':JSON.stringify({'createDate':'desc'}),'contentRowTypeId':id}),
                success: function (contentObj) {
                    var result = contentObj.result;
                    if(contentObj.success){
                        if(result.length>0){
                            for(var i in result){
                                var associated = result[i];
                                if(associated.type=='0'){
                                    $('#associatedList').append('<li><a target="_blank" href="'+associated.url+'" title='+associated.title+'>《'+associated.title+'》</a></li>');
                                }else{
                                    var jumpUrl = '';
                                    if(associated.contentType=='NEWS'){
                                        jumpUrl = hostUrl+'content/contentRowType/contentRowType_staticPage.html?from=associated&id='+associated.referenceId;
                                        $('#associatedList').append('<li><a target="_blank" href="'+jumpUrl+'" title='+associated.title+'>《'+associated.title+'》</a></li>');
                                    }else if(associated.contentType=='DOCUMENT'){
                                        jumpUrl = hostUrl+'content/contentRowType/contentRowType_doc_view.html?from=associated&id='+associated.referenceId;
                                        $('#associatedList').append('<li><a target="_blank" href="'+jumpUrl+'" title='+associated.title+'>《'+associated.title+'》</a></li>');
                                    }
                                }
                            }
                        }
                    }else{
                    }
                }
            });
        }catch(e){
         //   console.error(e);
        }
    }

    /**
     * 添加编辑器正文操作行
     * @param table
     */
    function addEditorToForm(table) {
        //添加正文editor
        var contentTrObj = $('<tr class="form-tr"></tr>');
        table.append(contentTrObj);

        // var contentLabelTdObj = $('<td class="form-label"><label>文档内容 : </label></td>');
        // contentTrObj.append(contentLabelTdObj);

        var contentTdObj = $('<td colspan="4"></td>');
        contentTrObj.append(contentTdObj);
        var contentDivObj = $('<div class="col-sm-12" ></div>');
        contentTdObj.append(contentDivObj);
        var contentObj = $('<div ><textarea id="content"  class="ckeditor"></textarea></div>');
        contentDivObj.append(contentObj);
      
    }


    /**
     * 修改，回显数据
     * @param contentRowTypeId  新闻id
     */
    function echoContentRowType(contentRowTypeId) {
        $.ajax({
            type: "get",
            url: hostUrl + "oa/content/contentRowType/get/" + contentRowTypeId+"?time="+Math.random(),
            dataType: "json",
            success: function (contentObj) {
                var result = contentObj.result;
               var obj = (result.attributeValue&&result.attributeValue!='')?JSON.parse(result.attributeValue.replace(/\\\\/g,'\\')):result;  // $.xljUtils.htmlDecode(result.attributeValue)
                initEditor();
                editor.setData(result['docContent']);//在线编辑器附值
                status = result['status'];//文档状态
                relationId = result['relationId'];//版本关联ID
                var versionInfo = result['bigVersion']+'.'+result['minorVersion'];
                //动态填充内容,获取table中的text属性
                $("#docContentTbody :input[type='text']").each(function () {
                    if (obj[this.name] != "" && obj[this.name] != undefined) {

                        if(this.name == 'code' && oper == 'newVersion'){
                            this.value = obj[this.name]+"v"+version;
                            versionInfo = version;
                        }else
                        this.value = obj[this.name];
                    } else {
                        this.value = "";
                    }
                });
                //动态填充内容,获取table中的input属性
                $("#docContentTbody :input[type='hidden']").each(function () {
                    if (obj[this.name] != "" && obj[this.name] != undefined) {
                        this.value = obj[this.name];
                    }
                });
                //获取form中的textarea属性
                $("textarea").each(function () {
                    if (obj[this.name] != "" && obj[this.name] != undefined) {
                        this.value = obj[this.name];
                    } else {
                        this.value = "";
                    }
                });
                //获取form中的checkbox属性
                $("checkbox").each(function () {
                });

                //获取form中的radio属性
                $("#docContentTbody :input[type='radio']").each(function () {
                    if (obj[this.name] != "" && obj[this.name] != undefined) {
                        $("input[name='"+this.name+"'][value='"+obj[this.name]+"']").attr("checked",true);
                    }
                });

                //获取form中的select属性
                $("select").each(function () {
                    $(this).find('option[value="'+$.xljUtils.htmlEncode(obj[this.name])+'"]').prop("selected",true);
                });

                $('#version').val(versionInfo);//版本信息
            }
        });
    }
    /**
     * 动态创建表单属性
     */
    function createForm(resultList) {
        //获取table对象
        var table = $("#docContentTbody");
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

                    var hiddenInputObj = $('<input type="hidden">');
                    hiddenInputObj.attr('id',fieldCode);
                    hiddenInputObj.attr('name',fieldCode);
                    table.append(hiddenInputObj);
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
                        textInputObj=$('<select onmouseover="this.title=this.options[this.selectedIndex].text" class="form-control addInputWidth"></select>');
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
                        textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                            + "<input  onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "' size='16' type='text' name='" + fieldCode + "'  readonly>"
                            + "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                            + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                            + "</div>");
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
                        var inputObj = $("<input onmouseover='this.title=this.value' type='text'class='form-control addInputWidth' id='"+fieldCode+"'  name='" + fieldCode + "' readonly='readonly' placeholder='选择人员'/>");
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
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove"  onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
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
                        var inputObj = $("<input onmouseover='this.title=this.value' type='text'class='form-control addInputWidth' id='"+fieldCode+"'  name='" + fieldCode + "' readonly='readonly' placeholder='选择组织'/>");
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
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove"  onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');
                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);
                        var orgFilter=getOrgType(fieldCode);
                        $(inputAddonFa).xljSingleSelector( {
                        	treeUrl:hostUrl + '/sys/org/root/getOrgTreeByType'+'?time='+Math.random(),
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
                        try{
                            textInputObj.xljAttachment({
                                appId: '1',
                                businessId: contentRowTypeId,
                                categoryId: '2',
                                mode: oper,
                                singleUpload: true
                            });
                        }catch (e){
                            console.warn('附件组件初始化失败');
                        }
                        break;
                    case 'textarea':
                        labelObj = $('<label></label>');
                        textInputObj = $('<textarea onmouseover="this.title=this.value" class="form-control addInputWidth" data-html="true"></textarea>');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }
                        if(isReadonly) {
                            textInputObj.attr('readonly','readonly');
                        }
                        textInputObj.attr('data-html','true');
                        textInputObj.attr('data-maxlength',columnWidth);
                        textInputObj.attr('data-placeholder',fieldName);
                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
                        break;
                    default:
                        labelObj = $('<label></label>');
                        textInputObj = $('<input onmouseover="this.title=this.value" type="text" class="form-control addInputWidth">');
                        if (isRequired){
                            labelObj.append('<span>*</span>');
                            textInputObj.attr('data-required','true');
                            textInputObj.attr('data-placeholder',fieldName);
                        }
                        if(isReadonly) {
                            textInputObj.attr('readonly','readonly');
                        }
                        textInputObj.attr('data-html','true');
                        textInputObj.attr('data-maxlength',columnWidth);
                        textInputObj.attr('data-placeholder',fieldName);
                        labelObj.append(fieldName+' : ');
                        textInputObj.attr('id',fieldCode);
                        textInputObj.attr('name',fieldCode);
                        if(fieldCode == 'title'){
                            textInputObj.on('blur',function () {
                                if($.trim(this.value)!=''){
                                    $("#docContentForm").find("input[name='title']").parent().removeClass('has-error');
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
                            tempRow.append('<td  class="form-label"></td><td></td>')
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
                            tempRow.append('<td  class="form-label"></td><td></td>')
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
        //制单时间开始为当前时间
            $('#createDate').parent().datetimepicker('setStartDate', new Date());


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
            var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove" onclick="clearSelector(\''+targetId+'\',\''+fieldCode+'\')"></a></div>');
            var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');
            textInputObj.append(inputAddonRemove);
            textInputObj.append(inputAddonFa);
            pTdObj.html('');
            pTdObj.append(textInputObj);
            $(inputAddonFa).xljSingleSelector( {
            	treeUrl:hostUrl + 'oa/content/contentChild/queryList'+'?time='+Math.random(),
				treeParam:{
					'contentTypeId':contentTypeId,
					'delflag':false
				},
				selectNodeType:{
					"isParent":false,
					"msg":"请先选择所属的具体知识目录！"
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
                }
            });
        }
    }
    /**
     * 清空选择器
     */
    window.clearSelector=function(id,name) {
        $("#"+id).val('');
        $("#"+name).val('');
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
     * 表单提交: 初始化参数
     */
    function submitForm(saveType) {
        var url = hostUrl + 'oa/content/contentRowType/save';
        var method = 'POST';
        var jsonData = {};
        if(saveType=='save'||saveType=='process'||saveType=='conclusion'||saveType=='publish'){
            $.xljUtils.customSingleValidate($('#docContentForm')[0]);
            if(!$('#docContentForm').valid()){
                return;
            }
        }else{
            /*var titleVal = $('#title').val();
            $("#docContentForm").find("input[name='title']").parent().removeClass('has-error');
            $('#title-error').remove();
            if($.trim(titleVal)==''){
                $("#docContentForm").find("input[name='title']").parent().addClass('has-error');
                $("#docContentForm").find("input[name='title']").parent().append('<label id="title-error" class="error help-block" for="title" style="margin: 0px; text-align: left;">主题不能为空</label>');
                return;
            }*/
        }

        if (oper == 'add') {
            url = hostUrl + 'oa/content/contentRowType/save';
            method = 'POST';
            jsonData['bigVersion'] = 1;
            jsonData['minorVersion'] = 0;
            jsonData['relationId']=contentRowTypeId;
        } else if (oper == 'edit') {
            url = hostUrl + 'oa/content/contentRowType/update/'+ contentRowTypeId;
            method = 'PUT';
        }

        //获取form表单数据
        var formFields = $('#docContentForm').serializeArray();
        var numReg = new RegExp("^[0-9]*$");
        for(var i=0;i<formFields.length;i++) {
            if(formFields[i].value==""){
                continue;
            }
            jsonData[formFields[i].name]=$.xljUtils.htmlDecode(formFields[i].value);
        }
        if(oper == 'newVersion'){
            jsonData['id'] = newId;
        }
        jsonData['docContent'] = CKEDITOR.instances.content.getData();
        if(saveType == 'conclusion'){
             jsonData.status = 'APPROVED';
        }
        if(oper == 'newVersion'){
            url = hostUrl + 'oa/content/contentRowType/save';
            method = 'POST';
            var versionArr =  version.split('.');
            jsonData['bigVersion'] = versionArr[0];
            jsonData['minorVersion'] = versionArr[1];
            jsonData['relationId'] = relationId;
            jsonData['status'] = 'DRAFT';
        }
        if(saveType == 'publish'){
            jsonData.status = 'PUBLISHED';
            jsonData.publishDate = $.xljUtils.formatDate('yyyy-MM-dd hh:mm:ss',new Date());
        }
        //先保存附件在保存表单
        $('#attach_'+contentRowTypeId).xljAttachmentSubmit(function (isSuccess, obj) {
            if (isSuccess) {
                if (obj.success === true) {
                  //  $.xljUtils.tip('blue', '附件信息提交成功');
                }
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
                                // saveAttachement();
                                if((saveType=='temporary')||saveType=='save'||saveType=='conclusion'||saveType=='publish'){
                                    if(window.opener != null&&oper!='newVersion'){
                                        window.opener.reloadGrid(jsonData.id,'contentRowGrid');
                                    }
                                    if(saveType!='temporary'){
                                        window.close();
                                    }
                                }else if(saveType=='process') {
                                    window.open(hostUrl +"flow/runtime/approve/start.html?businessObjectCode="+businessObjectCode+"&businessId="+contentRowTypeId);
                                    document.getElementById("docContentForm").reset();
                                    window.close();
                                }else if(saveType=='preView'){
                                    window.open("contentRowType_doc_view.html?id="+contentRowTypeId+"&from=preview");
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
                            }

                        }

                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                        var status = XMLHttpRequest.status;
                        $.xljUtils.getError(status);
                    }
                });
            } else {
                $.xljUtils.getError(obj);
            }
        });
        //ajax方式提交表单，提交时以json格式提交
      /*  $.ajax({
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
                        saveAttachement();
                        if((saveType=='temporary')||saveType=='save'||saveType=='conclusion'||saveType=='publish'){
                            if(window.opener != null&&oper!='newVersion'){
                                window.opener.reloadGrid(jsonData.id,'contentRowGrid');
                            }
                            if(saveType!='temporary'){
                                window.close();
                            }
                        }else if(saveType=='process') {
                            window.open(hostUrl +"flow/runtime/approve/start.html?businessObjectCode="+businessObjectCode+"&businessId="+contentRowTypeId);
                            document.getElementById("docContentForm").reset();
                            window.close();
                        }else if(saveType=='preView'){
                                window.open("contentRowType_doc_view.html?id="+contentRowTypeId+"&from=preview");
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
                    }

                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                $.xljUtils.getError(status);
            }
        });*/

    }

    /**
     * 保存附件
     */
    function saveAttachement() {
        $('#attach_'+contentRowTypeId).xljAttachmentSubmit(function (isSuccess, obj) {
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
            } else {
                $.xljUtils.getError(obj);
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
            url: hostUrl + 'oa/dictionary/contentDictionaryItem/queryListDictionaryItem',
            dataType: "json",
            data: JSON.stringify({code: fieldCode, name: propertiesName}),
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
            url:hostUrl+'oa/content/contentRowType/getUserInfo?time='+Math.random(),
            type:'GET',
            dataType:'JSON',
            success:function (returnData) {
                 currentUser = returnData.result.securityUserDto.realName;
                var userDto = returnData.result.securityUserDto;
                var companyDto = returnData.result.securityDirectCompanyDto;
                var deptDto =  returnData.result.securityDirectDeptDto;
                $('#createPersonName').val(userDto.realName);
                $('#createPersonId').val(userDto.id);
                $('#author').val(userDto.realName);
                $('#authorId').val(userDto.id);
                $('#agencyName').val(userDto.realName);
                $('#agencyId').val(userDto.id);
                $('#belongCompanyName').val(companyDto?companyDto.name:'');
                $('#belongCompanyId').val(companyDto?companyDto.id:'');
                $('#belongDeptName').val(deptDto?deptDto.name:'');
                $('#belongDeptId').val(deptDto?deptDto.id:'');
            }
        });
    }

    /**
     * 刷新关联文档
     */
    window.loadAssociatedList=function (id) {
        loadAssociatedList(id);
    }
})(jQuery,window,document,CKEDITOR);



