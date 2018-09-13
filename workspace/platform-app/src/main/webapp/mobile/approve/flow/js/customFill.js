/**
 * Created by Administrator on 2017/11/22.
 */

(function(window,document){
    var customFill = {
        baseUrl : '/',
        hostUrl : '/platform-app/',
        search:window.location.search,
        id:"",
        type:"add",
        customFormId:"",
        modal:"",
        code:"",
        appId:"",
        dataValueForSave:{
            operatorId:"",
            operateDepartmentId:"",
            operateCompanyId:"",
            operateProjectId:"",
            operateQiId:"",
            status: "",
            tendId: "",
            updatePersonId: "",
            vbusinesstype: "",
            createCompanyId: "",
            createOrgId: "",
            createPersonId: "",
            createCompanyName: "",
            createDate: "",
            createOrgName: "",
            createPersonName: "",
            operateCompanyName: "",
            operateDepartmentName: "",
            operateProjectName: "",
            operateQiName: "",
            operatorName: "",
            updateDate: "",
            updatePersonName: "",
            formNumber:""
        },
        mapping:{
            "Operator":"operatorId",
            "OperateCompany":"operateCompanyId",
            "OperateProject":"operateProjectId",
            "OperateQi":"operateQiId",
            "OperateDepartment":"operateDepartmentId",
            "CreateOrg":"createOrgId"
        },
        stageData:{},
        trEle:{},
        formValueJson:{},
        /**
         * 绑定事件
         */
        bind_event:function(){//事件绑定
            //附件删除
            $(".attachment-box .del").on("click",function(e){
                e.stopPropagation();
                $(this).parents("li").remove();
            });
            //展开折叠面板
            $(".con-tab .icon").on("click",function(){
                if($(this).hasClass("fa-angle-down")){
                    $(this).removeClass("fa-angle-down");
                    $(this).addClass("fa-angle-up");
                }else{
                    $(this).removeClass("fa-angle-up");
                    $(this).addClass("fa-angle-down");
                }
                $(this).parents(".con-tab").next().toggle();
            });
            //关闭窗口
            $(".title-header .close").on("click", function () {
                window.close();
            });
            //暂存
            $(".tmpsave").on("click", function () {
                if (_.isEmpty(customFill.stageData)) {
                    dialog_tip('页面未加载完成，请稍等');
                    return false;
                } else {
                    if($(".error-border").length>0){
                        dialog_tip('文本框组件不能输入引号和回车，多行文本不能输入引号');
                        return false;
                    }
                }
                customFill.onClickSubmitOrder({mode: 'TEMP_SAVE'});
            });
            //发起审批
            $(".approve").on("click", function () {
                if (_.isEmpty(customFill.stageData)) {
                    dialog_tip('页面未加载完成，不能发起流程');
                    return false;
                }
                if($(".error-border").length>0){
                    dialog_tip('有未填写正确的栏目，不能发起流程');
                    return false;
                }else {
                    var code = 0;
                    var customFormId = customFill.customFormid;
                    var id = customFill.id;
                    var url =  "/platform-app/flow/runtime/approve/start.html?businessObjectCode="+code+"&businessId="+id+"&customFormId="+customFormId+"&time="+_.random(0,999999);
                    customFill.onClickSubmitOrder({
                        mode: 'START_FLOW',
                        url: url
                    });

                }
            });
            //组件点击
            $('[data-cmpId]').map(function(i, node){
                var cmpName = node.getAttribute('data-cmpName');
                var mapping = customFill.mapping;
                if(mapping.hasOwnProperty(cmpName) || cmpName=="CustomArchive" || cmpName=="Organization"){
                    $(node).find(".my-sel").on("click",function(){
                        var that = this;
                        var id = $(node).attr("data-cmpValueIds");
                        var modal = $.selectModal({
                            $input : $(that),
                            selectionMethod: "single",  //single  multi
                            selectKey :{
                                val:  "user",
                                key : "type"
                            },
                            selectList : id,
                            param : {
                                url:customFill.hostUrl + 'sys/org/user/getUserTree?random=' + Date.now(),
                                type: "POST",
                                contentType:'application/json'
                            },
                            callback : function(data){
                                if(data){
                                    console.log(data);
                                    $(node).find("input").val(data.name);
                                    $(node).attr("data-cmpValueIds",data.id);
                                    $(node).attr("data-cmpValue",data.name);

                                }
                            }, close : function(){
                                //modal.remove();
                            }
                        }).open();
                    });

                }

            });

            //附件展开折叠
            $("body").delegate(".custom-add-btn", "click", function(event){
                $(".attachAddFiels").toggleClass("collapse");
                $(this).next().toggle();
            });
            $("body").delegate(".fileinput-button", "click", function(e){
                e.stopPropagation();
            });


            //提示框样例
            var dialog_tip = this.dialog_tip = function (text){
                $(document).dialog({
                    type : 'notice',
                    infoText: text,
                    autoClose: 2500,
                    position: 'top'  // center: 居中; bottom: 底部
                });
            }
            //验证部分
            //input,
            $("#fill-tbody input[type=text]").on("blur",function(){
                $(this).removeClass("error-border");
                var val = $(this).val();
                var p_node = $(this).parent();
                var cmpName = $(p_node).attr("data-cmpName");
                //
                if(($(p_node).attr("isRequired")=="TRUE" && cmpName!="Attach") || (cmpName == 'Operator' || cmpName == 'OperateCompany')){
                    if (_.isEmpty(val)) {
                        $(this).addClass("error-border");
                        dialog_tip("请检查某些可编辑的必填项，不能为空");
                        return;
                    }
                }
                //特殊字符验证
                if (!_.isEmpty(val)) {
                    if (/[\n|\r|\\]+/.test(val)) {
                        $(this).addClass("error-border");
                        dialog_tip("必须输入除回车，\\外的字符数字");
                        return;
                    }
                }
                if ( cmpName != 'Attach' && $(p_node).attr("inputDataType")!="") {
                    val = val.trim();
                    // 去掉两边的空格，再进行校验
                    if (!_.isEmpty(val)) {
                        var errorMsg = "";
                        if (!_.isUndefined(val)) {
                            var  dataType = $(p_node).attr("inputDataType");
                            var express = {
                                // 'STRING': /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                                'STRING': /^[^<>]+$/,
                                'INT': /^[0-9]*$/,
                                'FLOAT': /^[0-9]+(\.[0-9]{1,2})?$/,
                                'DATETIME': /^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})/
                            };
                            var msgs = {
                                'STRING': '字符类型：请输入除\', \"，回车，<, >, \\外的字符数字',
                                'INT': '整数类型：只可输入整数',
                                'FLOAT': '浮点类型：可输入带小数点的数字',
                                'DATETIME': '日期类型：可输入如2017-01-01的日期类字符',
                                'BOOLEAN': '布尔类型：可输入true, false'
                            };
                            _.map(express, function(v, k){
                                if (dataType != 'STRING' && dataType == k && !v.test(val)) {
                                errorMsg = msgs[dataType];
                                } else if (dataType == 'STRING' && (!express[dataType].test(val) || /[\n|\r|\\]+/.test(val))) {
                                    // 若是字符串，则继续匹配，不包含引号和回车
                                    errorMsg = msgs[dataType];
                                } else if (dataType == 'BOOLEAN' && ['true', 'false'].indexOf(_.toLower(val)) == -1) {
                                    errorMsg = msgs[dataType];
                                }
                             });
                            if(errorMsg){
                                $(this).addClass("error-border");
                                dialog_tip(errorMsg);
                                return;
                            }
                        }
                    }
                }
                $(this).parent().attr("data-cmpValue",$(this).val());
            });
            //多行文本框
            $("#fill-tbody textarea").on("blur",function(){
                $(this).removeClass("error-border");
                var val = $(this).val() || $(this).text();
                if (!_.isEmpty(val)) {
                    if (/[\n|\r|\\]+/.test(val)) {
                        $(this).addClass("error-border");
                        dialog_tip("必须输入除\\外的字符数字");
                        return;
                    }
                    val = val.trim().replace(/<br\/?>/g, '\n');
                    if (!_.isUndefined(val) && /[\\]+/.test(val)) {
                        $(this).addClass("error-border");
                        dialog_tip("多行文本：可输入除 \', \",  \\ 外的字符");
                        return;
                    }
                }
                $(this).parent().attr("data-cmpValue",val);
            });
            //select 选择
            $("#fill-tbody select").on("change",function(){
                $(this).parent().attr("data-cmpValue",$(this).val());
                $(this).parent().attr("data-cmpValueShowName",$(this).find("option:selected").text());
            });
            // radio
            $("#fill-tbody input[type='radio']").on("click",function(e){
                $(this).parent().attr("data-cmpValue",$(this).val());
                $(this).parent().attr("data-cmpValueShowName",$(this).next().html());
                e.e_stopPropagation();
            });
            //checkbox
            $("#fill-tbody input[type='checkbox']").on("click",function(e){
                var vals = $(this).parent().attr("data-cmpValue");
                vals = vals.split(",");
                var vnames = $(this).parent().attr("data-cmpValueShowName");
                vnames = vnames.split(",");
                if ($(this).attr("checked")){
                    vals.push($(this).val());
                    vnames.push($(this).next().html());
                }else{
                    vals = _.remove(vals, function(n) {
                        return n == $(this).val();
                    });
                    vnames= _.remove(vnames, function(n) {
                        return n == $(this).next().html();
                    });
                }
                $(this).parent().attr("data-cmpValue",vals.join(","));
                $(this).parent().attr("data-cmpValueShowName",vnames.join(","));
                e.e_stopPropagation();
            });
        },
        getUrlParam:function(name){
            var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
            var r = decodeURI(this.search).substr(1).match(reg);
            if (r!=null ){
                return unescape(r[2]);
            }
            return null;
        },
        // 过滤特殊字符
        filterSpecStr:function(strSrc) {
            if (typeof(strSrc) == 'string' && !_.isEmpty(strSrc)) {
                var specStrSrc = strSrc.replace(/\r|\n/g, '');
                specStrSrc = specStrSrc.replace(/\t/g, '    ');
                return specStrSrc;
            }
            return '';
        },
        //从页面获取dom数据
        getFilledDataFromDom:function(){
            var filledData = {};
            $('[data-cmpId]').map(function(i, node){
                var cmpName = node.getAttribute('data-cmpName');
            if (cmpName != 'Box.layout') {
                var cmpId = node.getAttribute('data-cmpId');

                // 转换单双字符
                var cmpValue = node.getAttribute('data-cmpValue') || '';
                var cmpValueIds = node.getAttribute('data-cmpValueIds') || '';
                var cmpValueShowName = node.getAttribute('data-cmpValueShowName') || '';

                // 转换单双字符
                if (_.isEmpty(cmpValueShowName)) {
                    cmpValueShowName = cmpValue;
                }
                if (cmpName != 'LabelForm') {
                    switch (cmpName) {
                        // 针对部分内部组件做特殊处理
                        case "Departments":
                        case "Organization":
                        case "InnerCompany":
                        case "InnerUsers":
                        case "OperateDepartment":
                            filledData[cmpId] = {
                                "cmpName":cmpName,
                                "cmpValue":cmpValue,
                                "cmpValueIds":cmpValueIds,
                                "cmpValueShowName":cmpValueShowName
                            };
                            break;

                        case "LegalPerson":
                        case "CustomArchive":
                            filledData[cmpId] = {
                                "cmpName":cmpName,
                                "cmpValue": cmpValueIds,
                                "cmpValueShowName": cmpValue,
                            };
                            break;

                        default:
                            filledData[cmpId] = {
                                "cmpName":cmpName,
                                "cmpValue":cmpValue,
                                "cmpValueShowName":cmpValueShowName
                            };
                            break;
                    }
                }
            }
        });
            return filledData;
        },
        flattenStageData:function(stageData){
            var invalidCmps = ['LabelForm'];
            var allCmpsValueInStageData = {};
            stageData.map(function(lineData) {
                lineData['row'].map(function(lineDatum) {
                    if (_.size(lineDatum) > 0 && _.indexOf(invalidCmps, lineDatum[0]['cmpName']) == -1) {
                        var cmpId = lineDatum[0].cmpId;
                        allCmpsValueInStageData[cmpId] = lineDatum[0];
                     }
                });
             });
            return allCmpsValueInStageData;
        },
        flattenStageLayoutData:function(stageData){
            // 排除标签组件
            var invalidCmps = ['LabelForm'];
            var allCmpsValueInLayoutData = {};
            stageData.map(function(lineData){
                var rowDispState = lineData['display']? lineData['display'] : 'VISIBLE';
                lineData['row'].map(function(lineDatum){
                    if (_.size(lineDatum) > 0 && _.indexOf(invalidCmps, lineDatum[0]['cmpName']) == -1) {
                        var cmpId = lineDatum[0].cmpId;
                        allCmpsValueInLayoutData[cmpId] = rowDispState;
                     }
                });
             });
            return allCmpsValueInLayoutData;
        },
        //获取数据
        getValueJson:function(filledData){

            var stageData = this.stageData;
            // 获得组件数据
            var allCmpsValueInStageData = this.flattenStageData(stageData);
            // 获得行布局数据
            var allCmpsDispStateInStageData = this.flattenStageLayoutData(stageData);

            var mobileValues = [];
            $('[data-cmpId]').map(function(i, node){
                var cmpName = node.getAttribute('data-cmpName');
            var cmpId = node.getAttribute('data-cmpId');
            if (allCmpsDispStateInStageData[cmpId] == 'VISIBLE') {
                var cmpNode = allCmpsValueInStageData[cmpId];
                var showColName = (cmpNode && cmpNode.showColName)? cmpNode.showColName : '';
                // cmpValueShowName 用来显示value对应的汉字
                var cmpValue = filledData[cmpId]? filledData[cmpId].cmpValueShowName : '';

                var value = {name: '', value: ''};
                if (!_.isEmpty(showColName)) {
                    value['name'] = showColName;
                    value['value'] = cmpValue;
                    value['type'] = cmpName;
                    mobileValues.push(value);
                }
            }
        });
            return mobileValues;
        },
        //获取经办等数据
        getOperatorData:function(){
            var operatorData = {
                operatorId: '',
                operatorName: '',

                operateDepartmentId: '',
                operateDepartmentName: '',

                operateCompanyId: '',
                operateCompanyName: '',

                operateProjectId: '',
                operateProjectName: '',

                operateQiId: '',
                operateQiName: '',

                createOrgId: '',
                createOrgName: '',
            };
            $('[data-cmpId]').map(function(i, node){
                var cmpName = node.getAttribute('data-cmpName');
            if (cmpName != 'Box.layout') {
                switch (cmpName) {
                    // 针对部分内部组件做特殊处理
                    case 'Operator':
                        operatorData.operatorId = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.operatorName = node.getAttribute('data-cmpValue') || '';
                        break;
                    case "OperateDepartment":
                        operatorData.operateDepartmentId  = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.operateDepartmentName = node.getAttribute('data-cmpValue') || '';
                        break;

                    case "OperateQi":
                        operatorData.operateQiId  = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.operateQiName = node.getAttribute('data-cmpValue') || '';
                        break;
                    case "OperateCompany":
                        operatorData.operateCompanyId  = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.operateCompanyName = node.getAttribute('data-cmpValue') || '';
                        break;
                    case "OperateProject":
                    {
                        operatorData.operateProjectId  = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.operateProjectName = node.getAttribute('data-cmpValue') || '';
                        break;
                    }

                    case "CreateOrg":
                        operatorData.createOrgId  = node.getAttribute('data-cmpValueIds') || '';
                        operatorData.createOrgName = node.getAttribute('data-cmpValue') || '';
                        break;

                    default:
                        break;

                }
            }
        });
            return operatorData;
        },

        //保存方法
        onClickSubmitOrder:function(option){
            var filledData = this.getFilledDataFromDom();
            var mobileValueJson = this.getValueJson(filledData);
            var operatorData = this.getOperatorData();
            var params = {
                id: customFill.id,
                customFormId: customFill.customFormId,
                formMobileValueJson: JSON.stringify(mobileValueJson)
            };
            params = _.assign(params,operatorData);
            params.formValueJson = JSON.stringify(filledData);
            // 过滤特殊字符
            params.formMobileValueJson = this.filterSpecStr(params.formMobileValueJson);
            //附件上传
            var def = new $.Deferred();
            $('#attachmentUpload').xljAttachmentSubmit(function (isSuccess, obj) {
                if (isSuccess) {
                    if (obj.success === true) {
                        //alert('提交成功');
                    }
                    def.resolve(true);
                } else {
                    //alert(obj);
                    def.resolve(false);
                }
            });
            this.upgradeFormValueJson(params,option,this.type);
            console.info('保存表单 %o，成功！', params);
        },
        //修改 新增
        upgradeFormValueJson:function(params,option,type){
            var that = this;
            var url = type=="edit" ? that.hostUrl+'sys/base/customFormInstance/update/'+params.id : that.hostUrl+'sys/base/customFormInstance/save/';
            var strData = JSON.stringify(params);
            strData = strData.replace(/\t/g, '    ');
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: strData,
                success: function(data) {
                    if (data.success) {
                        var newJsonData = JSON.parse(strData);
                        that.handleOprate({"filledData":newJsonData.filledData,"param":option});
                    } else {
                       that.dialog_tip("保存失败");
                    }
                },
            });

        },
        //处理操作
        handleOprate:function(action){
            // 保存当前操作区stageData后
            if (window.opener) {
                window.opener.reloadList();
            }

            if (action.param && action.param.mode == 'TEMP_SAVE') {
                if (window.opener) {
                    window.close();
                }

            } else if (action.param && action.param.mode == 'TEMP_SAVE_RO') {
                document.location.reload();
                return false;

            } else if (action.param && action.param.mode == 'START_FLOW') {
                const url = action.param.url;
                document.location.href = url;

            }
        },
        //添加时间事件
        addDateEvent:function(){
            var currYear = (new Date()).getFullYear();
            var opt={};
            opt.date = {preset : 'date'};
            opt.datetime = {preset : 'datetime'};
            opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 50, //开始年份
                endYear: currYear + 10 //结束年份
            };
            $(".inputDate").mobiscroll($.extend(opt['datetime'], opt['default']));
        },
        //初始化附件属性
        attachmentInit:function(){
            var that = this;
            $('#attachmentUpload').xljAttachment({
                appId: "88",//itemObj.appId
                businessId: that.id,//表单id
                categoryId: "77",//itemObj.categoryId
                mode: customFill.type,
                singleUpload: false,
                customApp:true
            });
        },
        /*
        * 渲染表单
        * */
        renderForm:function(resultData){
            //var stageData = {};
            var that = this;
            {_.map(resultData, function(rowData, key){
                var isRowVisible = true;
                if (_.has(rowData, 'display')) {
                    isRowVisible = rowData['display'] == 'VISIBLE'? true : false;
                }
                var isShow = isRowVisible?"table-row":'none';
                that.renderEachBox(rowData);
            })}
        },
        /*
        * 渲染box
        * */
        renderEachBox:function(rowData){
            var that = this;
            var newRow = [];
            var layout = [];
            {rowData['row'].map(function(colData, key){
                if(colData.length>0){
                    for(var v_key in that.formValueJson){
                        if(v_key==colData[0].cmpId){

                            colData[0].cmpValueIds = that.formValueJson[v_key].cmpValueIds ? that.formValueJson[v_key].cmpValueIds:"";
                            colData[0].cmpValue = that.formValueJson[v_key].cmpValue;
                        }
                    }
                    newRow.push(colData[0]);
                    layout.push(rowData['layout'][key]);
                }
            })}
            {newRow.map(function(r, key){
                var cols= "";
                var colwidth= "";
                if(newRow.length==1){
                    cols = 'colspan="2"';
                }
                if(key%2==0){//为偶数位的时候  建立tr
                    trEle = $("<tr>",{});
                    colwidth =  'width="30%"';
                }
                var tdEle = $("<td "+cols+" "+colwidth+">", {});
                var boxEle = $("<div>", {
                    "data-cmpId": layout[0].cmpId,
                    "data-cmpName": "Box.layout",
                    "data-stage-ele-type": "box"
                });
                var ele = that.renderEachComp(r);
                $(boxEle).append(ele);
                $(tdEle).append(boxEle);

                $(trEle).append(tdEle);
                if($(ele).attr("readonly")){
                    $(trEle).addClass("tr-read-bg");
                }
                if(key%2==0){
                    $("#fill-tbody").append(trEle);
                }
            })}
        },
        //渲染各个组件
        renderEachComp: function (eachCom) {
            var cmpName = eachCom.cmpName;
            switch (cmpName) {
                case 'TitleForm':
                    return "<div data-cmpId='"+ eachCom.cmpId+"' data-cmpName='TitleForm' data-cmpShowName='"+eachCom.cmpShowName+"'>" +
                    "<span>"+eachCom.staticText+"</span>" +
                    "</div>";

                case 'TextInput':
                    //<i class="fa fa-times input-close" aria-hidden="true"></i>
                    var inputDataType = eachCom.inputDataType ? eachCom.inputDataType : "";
                    return "<div class='pr' data-cmpId='"+ eachCom.cmpId+"' isRequired='"+ eachCom.isRequired+"' inputDataType='"+ inputDataType+"' data-cmpName='TextInput' data-cmpShowName='"+eachCom.cmpShowName+"' " +
                        "data-cmpValue='"+eachCom.cmpValue+"' data-showColName='"+eachCom.showColName+"' data-expressStatement='"+eachCom.inputExpressStatement+"'>" +
                        "<input type='text' value='"+eachCom.cmpValue+"' />" +
                        ''+
                        "</div>";

                case 'DateInput':
                    return '<div class="pr" data-cmpValue="'+eachCom.cmpValue+'" data-cmpName="DateInput"'+
                    'data-cmpId="'+ eachCom.cmpId+'">'+
                   '<input type="text" name="appDateTime" class="inputDate" value="'+eachCom.cmpValue+'"/>'+
                        '<i class="fa fa-calendar my-date-icon" aria-hidden="true"></i>'+
                    '</div>';

                case 'LabelForm':return "<div data-cmpId='"+ eachCom.cmpId+"' data-cmpName='LabelForm' data-cmpShowName='"+eachCom.cmpShowName+"'>" +
                        "<span>"+eachCom.staticText+"</span>" +
                        "</div>";

                case 'SingleSelect':
                    var optionSetting = eachCom.optionSetting? eachCom.optionSetting : [];
                    var slectHtml = "";
                    var selVal = "";
                    var selcted = "";
                    var v,showname= "";
                    optionSetting.map(function(optionItem){
                        if (eachCom.cmpValue != '') {
                            if(optionItem.value==eachCom.cmpValue){
                                selcted = "selected";
                            }else{
                                selcted = "";
                            }
                          }else{
                            if(optionItem.default==true){
                                selcted = "selected";
                            }else{
                                selcted = "";
                            }
                        }
                        if(selcted){
                            v = optionItem.value;
                            showname = optionItem.text;
                        }
                        slectHtml+= '<option value="'+optionItem.value+'"  '+selcted+'> '+optionItem.text+' </option>';

                    });
                    return ' <div data-cmpValue="'+v+'" data-cmpValueShowName="'+showname+'" data-cmpId="'+ eachCom.cmpId+'" data-cmpName="SingleSelect">'+
                     ' <select class="sel-style" value="'+selVal+'"> <option value="">-请选择-</option> '+slectHtml+'</select> </div>';

                case 'MultiSelect':
                    return ' <div data-cmpId="'+ eachCom.cmpId+'" data-cmpName="MultiSelect">'+
                        ' <select multiple> <option value="">-请选择-</option> </select> </div>';

                case 'TextAreaForm':
                    return "<div class='pr' data-cmpId='"+ eachCom.cmpId+"' data-cmpName='TextAreaForm' data-cmpShowName='"+eachCom.cmpShowName+"' " +
                        "data-cmpValue='"+eachCom.cmpValue+"' data-showColName='"+eachCom.showColName+"' data-expressStatement='"+eachCom.inputExpressStatement+"'>" +
                        "<textarea>"+eachCom.cmpValue+"</textarea>" +
                        '<span class="glyphicon-remove-sign" ></span>'+
                        "</div>";

                case 'RadioForm':
                case 'CheckboxForm':
                    var optionSetting = eachCom.optionSetting? eachCom.optionSetting : [];
                    var radioHtml = "";
                    var checked = "";
                    var type = cmpName=="RadioForm"?"radio":"checkbox";
                    optionSetting.map(function(optionItem){
                        if (eachCom.cmpValue != '') {
                            if(optionItem.value==eachCom.cmpValue){
                                checked = "checked";
                            }else{
                                checked = "";
                            }
                        }else{
                            if(optionItem.default=="TRUE"){
                                checked = "checked";
                            }else{
                                checked = "";
                            }
                        }
                        if(checked){
                            v = optionItem.value;
                            showname = optionItem.text;
                        }
                            radioHtml+= ' <label class="radio-inline"> <input type="'+type+'" '+
                        'name="'+optionItem.value+'" '+checked+' value="'+optionItem.value+'"/><span>'+optionItem.text+'</span></label>';

                    });
                    return ' <div data-cmpValue="'+eachCom.cmpValue+'" data-cmpValueShowName="'+eachCom.cmpValueShowName+'" data-cmpId="'+ eachCom.cmpId+'" ' +
                        'data-cmpName="'+cmpName+'">'+
                        ' '+radioHtml+'</div>';

            case 'FormNumber':
            case 'Status':
            case 'CreatePerson':
            case 'UpdatePerson':
            case 'CreateDate':
            case 'UpdateDate':
                var v = "";
                if(cmpName=="CreateDate") v = customFill.dataValueForSave.createDate;
                if(cmpName=="CreatePerson") v = customFill.dataValueForSave.createPersonName;
                if(cmpName=="Status") v = customFill.dataValueForSave.status;
                if(cmpName=="UpdatePerson") v = customFill.dataValueForSave.updatePersonName;
                if(cmpName=="UpdateDate") v = customFill.dataValueForSave.updateDate;
                if(cmpName=="FormNumber") v = customFill.dataValueForSave.formNumber;
                return "<div data-cmpId='"+ eachCom.cmpId+"' data-cmpValue='"+v+"' data-cmpName='"+cmpName+"' data-cmpShowName='"+v+"'>" +
                "<span>"+v+"</span>" +
                "</div>";
            case 'Operator':
            case 'OperateCompany':
            case 'OperateDepartment':
            case 'OperateProject':
            case 'OperateQi':
            case 'InnerUsers':
            case 'InnerCompany':
            case 'Departments':
            case 'Organization':
            case 'CustomArchive':
               var v =  eachCom.cmpValue?eachCom.cmpValue:"";
                var cmpValueIds = "";
                var mapping = customFill.mapping;
                if(mapping.hasOwnProperty(cmpName)){
                    cmpValueIds =  customFill["dataValueForSave"][mapping[cmpName]];
                }else{
                    cmpValueIds = eachCom.cmpValueIds?eachCom.cmpValueIds:"";
                }
                return '<div class="pr" data-cmpValue="'+v+'" data-cmpId="'+ eachCom.cmpId+'" readonly="true" data-cmpValueIds="'+cmpValueIds+'" data-cmpName="'+cmpName+'" >'+
            '<input type="text" readOnly value="'+v+'"/>' +
                '<i class="fa fa-ellipsis-h my-sel" aria-hidden="true"></i></div>';
            default:
            break;
        }
        },
        hasFormNumberCmp:function(formatStr) {
            var formatJson = JSON.parse(formatStr);
            var rtn = false;
            _.cloneDeepWith(formatJson, function(obj){
                if (obj && _.has(obj, 'cmpId') && _.has(obj, 'cmpName') && obj.cmpName == 'FormNumber') {
                rtn = true;
            }
            });
        return rtn;
    },
        /**
         * 获取数据
         */
        fetchFilledData:function (){
            var that = this;
            var ids=this.id;
            var type =this.type;
            var customFormId=this.customFormId;
            var resultData = "";
            $.ajax({
                url:that.hostUrl+"sys/base/customFormInstanace/getInstance/"+ids+"/"+customFormId,
                type:'put',
                dataType:'JSON',
                contentType:"application/json",
                success:function (resultData) {
                    if (resultData.success) {
                        if (that.hasFormNumberCmp(resultData.result.formFormatJson)) {
                            var url2 = that.hostUrl + "sys/base/customForm/getFormNumber/" + customFormId + "?time=" + _.random(0, 99999);
                            $.ajax({
                                url: url2,
                                type: 'put',
                                dataType: 'JSON',
                                contentType: "application/json",
                                success: function (dataNumber) {
                                    if (dataNumber.success) {
                                        if (type == 'add' && !_.isEmpty(resultData.result)) {
                                            resultData.result['formNumber'] = dataNumber.result;
                                        }
                                    }
                                }
                            });
                        }
                        var removedSpecStrValueJson = _.isEmpty(resultData.result.formValueJson)? "{}" : resultData.result.formValueJson;
                        removedSpecStrValueJson = removedSpecStrValueJson.replace(/\r|\n/g, '');
                        removedSpecStrValueJson = removedSpecStrValueJson.replace(/\\\'/g, '\'');
                        removedSpecStrValueJson = removedSpecStrValueJson.replace(/\\\"/g, '\'');
                        removedSpecStrValueJson = removedSpecStrValueJson.replace(/\t/g, '    ');

                        this.code = resultData.result.code;
                        this.appId = resultData.result.appId || '99';
                        //存值
                        for(var key in this.dataValueForSave){
                            this.dataValueForSave[key] = resultData.result[key]?resultData.result[key]:"";
                        }
                        //if (typeof(removedSpecStrValueJson) == 'object') {
                        //    this.stageData = JSON.stringify(removedSpecStrValueJson);
                        //}
                        this.stageData = eval('(' +resultData.result.formFormatJson+ ')');
                        this.formValueJson = JSON.parse(resultData.result.formValueJson);
                        this.renderForm(this.stageData);
                    }


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    that.dialog_tip("服务异常,请联系管理员！");
                }
            });
        },
        /**
         * 页面初始化
         */
        pageInit:function(){
            //绑定按钮事件

            this.id = this.getUrlParam("id");
            this.type = this.getUrlParam("type");
            this.customFormId = this.getUrlParam("customFormId");
            this.fetchFilledData();
            this.bind_event();
            this.addDateEvent();
            this.attachmentInit();

        }
    };
    $(customFill.pageInit());
    window["customFill"] = customFill;

})(window,document);