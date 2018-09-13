;(function ($, window, document, easyDialog) {
    /**
     * author:luorongxin
     *
     */
    /**
     *    定义全局变量
     */
    var operType;//1：NEWS、2：文档DOC
    var contentType;//目前新闻1：NEWS、2：文档DOCUMENT
    var contentTitle;//文档主题
    var contentTypeId;//类型ID
    var contentChildId;//目录ID
    var zTreeNode;//选中树结点
    var zTreeObj;
    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据
    var attrArray = [];//属性数组
    var menuCode;//菜单编码
    var fuzzyArr = [];//模糊查询字段数组
    // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: 'id',
                pIdKey: 'pid',
                rootPId: null
            }
        },
        edit: {
            enable: false
        },
        view: {
            fontCss: getFontCss
        }
        ,
        callback: {
            onClick: zTreeOnClick,
            onExpand:function (event, treeId, treeNode) {
                $.xljUtils.treeResizeFn();
            },
            onCollapse: function(){
                $.xljUtils.treeResizeFn();
            }
        },
        
    };

    //用于计算头部bar条
    var newOpenWin;

    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {
            color: "#333",
            "font-weight": "normal"
        };
    }

    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language: 'zh',
        format: "yyyy-mm-dd hh:ii:00",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
    /**
     * 点击树方法
     * @param event
     * @param treeId
     * @param treeNode
     */
    function zTreeOnClick(event, treeId, treeNode) {
        zTreeNode = treeNode;
        var nodeChildren = zTreeNode.children;
        // if (nodeChildren && nodeChildren.length > 0) {
        //     return;
        // }
        var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
        if(postDataObj!=undefined){
            $('#searchForm input').each(function (index, item) {
                delete postDataObj[item.name];
                item.value = '';
            });
            $('#searchForm select').each(function (index, item) {
                delete postDataObj[item.name];
                item.value = 'ALL';
            });
                delete postDataObj.dateFields;
                delete postDataObj.fuzzyQueryFields;
                delete postDataObj.code;
        }

        $('#keywords').val('');
        var nodeChildId = new Array(); 
        nodeList = $.fn.zTree.getZTreeObj(treeId).transformToArray(treeNode)
       
        for(var i = 0, len = nodeList.length;i<len;i++) {
        	var pNode = nodeList[i].id;
            if(pNode != null){
            	nodeChildId.push(pNode);
            }
    	}
        $("#contentRowGrid").jqGrid('setGridParam', {
            postData: {
                "contentTypeId": treeNode.contentTypeId,
                "contentChildId": nodeChildId.toString()
            }, url: hostUrl + "oa/content/contentRowType/page"
        }).trigger('reloadGrid');
    }

    /**
     /**
     * 加载列表
     */
    $(document).ready(function () {
        operType = $.xljUtils.getUrlParam('contentType'); // 1是新闻 2是文档
        contentTypeId = $.xljUtils.getUrlParam('contentTypeId'); // 大类ID
        contentChildId = $.xljUtils.getUrlParam('contentChildId'); // 目录ID
        newOpenWin = $.xljUtils.getUrlParam('newOpenWin');
        if (operType == 'NEWS') { //加载新闻列表页面
            menuCode = 'NEWS_MANAGE';
            $('#contentTitle').text('新闻目录');
            $('#treeTitle').text('新闻中心');
        }
        if (operType == 'DOCUMENT') { //加载文档列表页面
            menuCode = 'KNOWLEDGE_MANAGE';
            $('#contentTitle').text('知识目录');
            $('#treeTitle').text('知识中心');
        }
        if (newOpenWin&&newOpenWin=='true'){
            $('.xj-form-header').show();
            $('.news-container').css({'padding-top':'70px'});
        }
        //获取用户信息
        getUserInfo();
        //获取查询条件
        initSearchAttr();
        //初始化样式
        initStyle();
        //加载左侧树
        listTree();
        //绑定按钮事件
        bindButton();



    });
    /**
     * 获取用户数据权限
     */
    function getDataAuth() {

    }
    /**
     * 获取获取用户当前页面按钮
     */
    function getUserBeanRelationInfo() {
        $.ajax({
            type: "GET",
            url: hostUrl + "oa/content/contentRowType/getUserBeanRelationInfo?time=" + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            success: function (xhr, textStatus) {
                if (xhr.success) {
                    // console.log(xhr.result);
                    var resArray = xhr.result.resourceDtoList;
                    var prefixId; //菜单
                    var operArray = [];//按钮数组
                    for (var i in resArray) {
                        if (resArray[i].code == menuCode && resArray[i].type == 'RESOURCE' && resArray[i].isAuth == 1) {
                            prefixId = resArray[i].prefixId;
                        }
                    }
                    for (var i in resArray) {
                        if (resArray[i].type == 'OPERATION' && resArray[i].isAuth == 1 && (resArray[i].prefixId).indexOf(prefixId) > -1) {
                            operArray.push(resArray[i]);
                        }
                    }
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 获取获取用户用户信息
     */
    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: hostUrl + "oa/content/contentRowType/getUserInfo?time=" + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            success: function (xhr, textStatus) {
                if (xhr.success) {
                    console.log(xhr.result);

                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 初始化列表页面查询条件
     * @param contentTypeId
     */
    function initSearchAttr() {
        $('#tableContainer').empty();//初始化高级查询条件
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/content/contentRowAttribute/queryContentRowQueryAttributeList/" + contentTypeId + "?time=" + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'delflag': 0}),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        attrArray = xhr.result;
                        createSearchTable(xhr.result);//创建查询条件模板
                        loadPage();//加载Grid列表文档
                        //$.xljUtils.resizeNestedGrid();
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
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    }

    /**
     * 创建查询条件模板
     * @param resultData
     */
    function createSearchTable(resultData) {

        /*
         <option value="GENERAL_SEARCH">通用查询</option>
         <option value="EXACT_SEARCH">精确查询</option>
         <option value="FUZZY_SEARCH">模糊查询</option>
         <option value="GENERA_FUZZY_SEARCH">通用&模糊查询</option>
         <option value="EXACT_FUZZY_SEARCH">精确&模糊查询</option>*/
        if (resultData) {
            var data = resultData;
            var fuzzyStr = '';//模糊查询关键字名称字符串
            var exactArr = [];//精确查询数组
            var generalArr = [];//固定查询
            for (var i in data) {
                var attr = data[i];
                //通用查询或者通用&模糊查询
                if (attr.searchType == 'GENERA_FUZZY_SEARCH' || attr.searchType == 'GENERAL_SEARCH') {
                    generalArr.push(attr);
                }
                //精确查询或者精确&模糊查询
                if (attr.searchType == 'EXACT_SEARCH'||attr.searchType == 'EXACT_FUZZY_SEARCH') {
                    //如果包含高级查询条件则显示高级查询条件按钮
                    exactArr.push(attr);
                }

                //处理模糊查询条件
                if (attr.searchType == 'FUZZY_SEARCH' || attr.searchType == 'GENERA_FUZZY_SEARCH' || attr.searchType == 'EXACT_FUZZY_SEARCH') {
                    fuzzyStr += $.xljUtils.htmlEncode(attr.fieldName) + "/";
                    fuzzyArr.push($.xljUtils.htmlEncode(attr.fieldCode));
                }
            }
            generateSearchField(generalArr, exactArr); //动态创建查询条件
            var text = fuzzyStr.substring(0, fuzzyStr.lastIndexOf('/'));
            $('#keywords').attr('data-temp-placeholder', text);
            $("#keywords").inputPlaceholder();
            // $('#keywords').prop('placeholder', fuzzyStr.substring(0, fuzzyStr.lastIndexOf('/')));
        }
        getContentType();//获取下拉大类列表
    }
/**
     * 创建查询条件模板
     */
    function generateSearchField(generalArr, exactArr) {
        /**
         * 固定查询域
         */
        createForm(generalArr, ".generalSearchTab");
        /**
         *  精确查询域
         */
        createForm(exactArr, ".exactSearchTab");

    }

    /**
     * 动态创建表单属性
     */
    function createForm(resultList, tableSelector) {
        var table = $(tableSelector);
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
                if (fieldCode == 'belongCompanyName') {
                    selectorTitle = '选择所属公司';
                }
                //所属部门
                if (fieldCode == 'belongDeptName') {
                    selectorTitle = '选择所属部门';
                }
                //所属项目
                if (fieldCode == 'belongProjectName') {
                    selectorTitle = '选择所属项目';
                }
                //所属分期
                if (fieldCode == 'belongBranchName') {
                    selectorTitle = '选择所属分期';
                }

                if (fieldCode == 'docContent') {
                    continue;
                }
                if (!tempRow) {
                    tempRow = $('<tr></tr>');
                    table.append(tempRow);
                }

                if (!labelTdObj) {
                    labelTdObj = $('<td></td>');
                    //labelTdObj.css("width", "11%");
                    labelTdObj.addClass('seinor-txt');
                    tempRow.append(labelTdObj);
                }

                if (!inputTdObj) {
                    inputTdObj = $('<td></td>');
                    inputTdObj.addClass('seinor-ele');
                    tempRow.append(inputTdObj);
                }
                if (formType == 'date') {
                    // inputTdObj.attr('colspan','3');
                }
                var labelObj;
                var textInputObj;
                switch (formType) {
                    case 'hidden':
                        var hiddenInputObj = $('<input type="hidden">');
                        hiddenInputObj.attr('id', fieldCode);
                        hiddenInputObj.attr('name', fieldCode);
                        inputTdObj.append(hiddenInputObj);
                        break;
                    case 'radio':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        var textInputObjHtml = '';
                        $.each(enumList, function (i, item) {
                            var inputLabelObj = $('<label class="radio-inline"><input type="radio" ></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name', fieldCode);
                            inputObj.attr('id', fieldCode + count);
                            inputObj.val(item.val);
                            inputLabelObj.append(item.name);
                            textInputObjHtml += inputLabelObj[0].outerHTML;
                            count++;
                        });
                        labelObj.append(fieldName);
                        textInputObj = $(textInputObjHtml);

                        break;
                    case 'select':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        textInputObj = $('<select class="form-control"></select>');
                        textInputObj.attr('name', fieldCode);
                        textInputObj.attr('id', fieldCode);
                        textInputObj.append('<option value="">全部</option>');
                        $.each(enumList, function (i, item) {
                            var optionObj = $('<option value="' + $.xljUtils.htmlEncode(item.val) + '">' + $.xljUtils.htmlEncode(item.name) + '</option>');
                            textInputObj.append(optionObj);
                        });
                        textInputObj.attr('onmouseover', "this.title=this.options[this.selectedIndex].text");
                        labelObj.append(fieldName + ' : ');
                        break;
                    case 'checkbox':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        var textInputObjHtml = '';
                        $.each(enumList, function (i, item) {
                            var inputLabelObj = $('<label class="checkbox-inline"><input type="checkbox" ></label>');
                            var inputObj = $(inputLabelObj.find('input')[0]);
                            inputObj.attr('name', fieldCode);
                            inputObj.attr('id', fieldCode + count);
                            inputObj.val(item.val);
                            inputLabelObj.append(item.name);
                            textInputObjHtml += inputObj.html();
                            count++;
                        });

                        labelObj.append(fieldName);
                        textInputObj = $(textInputObjHtml);
                        break;
                    case 'date':
                        labelObj = $('<label></label>');
                        /*textInputObj = $("<div class='pull-left'><div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                         + "<input class='form-control' id='"+fieldCode+"_starttime' name='"+fieldCode+"_starttime' size='16' type='text'   readonly>"
                         + "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                         + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                         + "</div></div><span class='pull-left dao'>到</span><div class='pull-left mr10'><div class='input-group date form_datetime form-date'  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'><input class='form-control' id='"+fieldCode+"_endtime' name='"+fieldCode+"_endtime' size='16' type='text'  readonly=''>"
                         + "<span class='input-group-addon'><span class='glyphicon glyphicon-remove'></span></span>"
                         + "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"
                         + "</div>");
                         */
                        textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                            + "<input onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "_starttime' name='" + fieldCode + "_starttime' size='16' type='text'   readonly>"
                            + "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                            + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                            + "</div>");
                        labelObj.append(fieldName);
                        break;
                    case 'personselector':
                        labelObj = $('<label></label>');
                        textInputObj = $("<div class='input-group form-date resetwidth'><input type='text'  onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "'  name='" + fieldCode + "' readonly='readonly'/></div>");

                        labelObj.append(fieldName);

                        var reg = /[A-Z]/g;
                        var arr;
                        var lastIndex;
                        while ((arr = reg.exec(fieldCode)) != null) {
                            lastIndex = arr.index;
                        }
                        var targetId = '';
                        if (lastIndex) {
                            targetId = fieldCode.substring(0, lastIndex) + 'Id';
                        } else {
                            targetId = fieldCode + 'Id';
                        }
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove"></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');
                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);
                        $(inputAddonFa).xljSingleSelector({
                            title: "选择人员",//选择器标题，默认是'选择组织机构'
                            selectorType: "person",//选择器类型，默认是组织机构选择器
                            targetId: targetId,
                            targetName: fieldCode,

                            saveCallback: function (selectData, ele) {
                                /*if(fieldCode == 'author'){
                                 $('#authorId').val(selectData.id);
                                 }
                                 $('#'+fieldCode).val(selectData.name);*/
                                $(ele).val(selectData.name);
                                var eleName = $(ele).attr('name');
                                var reg = /[A-Z]/g;
                                var arr;
                                var lastIndex;
                                while ((arr = reg.exec(eleName)) != null) {
                                    lastIndex = arr.index;
                                }

                                var targetId = '';
                                if (lastIndex) {
                                    targetId = eleName.substring(0, lastIndex) + 'Id';
                                } else {
                                    targetId = eleName + 'Id';
                                }

                                $('#' + targetId).val(selectData.id);

                            }
                        });
                        inputAddonRemove.on('click',{targetId:targetId, fileCode: fieldCode},function (e) {
                            $('#'+e.data.targetId).val('');
                            $('#'+e.data.fileCode).val('');
                        });
                        break;
                    case 'orgselector':
                        labelObj = $('<label></label>');
                        textInputObj = $('<div class="input-group form-date resetwidth"><input type="text" onmouseover="this.title=this.value" class="form-control" id="' + fieldCode + '"  name="' + fieldCode + '" readonly="readonly"/></div>');

                        labelObj.append(fieldName);

                        var reg = /[A-Z]/g;
                        var arr;
                        var lastIndex;
                        while ((arr = reg.exec(fieldCode)) != null) {
                            lastIndex = arr.index;
                        }
                        var targetId = '';
                        if (lastIndex) {
                            targetId = fieldCode.substring(0, lastIndex) + 'Id';
                        } else {
                            targetId = fieldCode + 'Id';
                        }
                        var inputAddonRemove = $('<div class="input-group-addon resetposition"><a class="glyphicon glyphicon-remove" ></a></div>');
                        var inputAddonFa = $('<span class="input-group-addon w28"><a class="fa fa-ellipsis-h "></a></span>');

                        textInputObj.append(inputAddonRemove);
                        textInputObj.append(inputAddonFa);

                        $(inputAddonFa).xljSingleSelector({
                            title: selectorTitle,//选择器标题，默认是'选择组织机构'
                            selectorType: "org",//选择器类型，默认是组织机构选择器
                            targetId: targetId,
                            targetName: fieldCode,
                            selectNodeType:{
                                         msg:function(fc) {
                                             var msg;
                                             switch (fc) {
                                                 case 'belongBranchName':
                                                     msg = '请选择分期';//指定分期可选
                                                     break;
                                                 case 'belongDeptName':
                                                     msg = '请选择部门';//指定部门可选
                                                     break;
                                                 case 'belongCompanyName':
                                                     msg = '请选择公司';//指定公司可选
                                                     break;
                                                 case 'belongProjectName':
                                                     msg = '请选择项目';//指定项目可选
                                                     break;
                                                 default:
                                                     msg = '请选择公司';
                                             }
                                             return msg;
                                         }(fieldCode),
                                         type:function(fs){
                                                     var type ;
                                                     switch(fs){
                                                         case 'belongBranchName': type='branch';//指定分期可选
                                                             break;
                                                         case 'belongDeptName': type='dept';//指定部门可选
                                                             break;
                                                         case 'belongCompanyName':type='company';//指定公司可选
                                                             break;
                                                         case 'belongProjectName':type='group';//指定项目可选
                                                             break;
                                                         default:
                                                             type='company';
                                                 }
                                                 return type;
                                }(fieldCode)
                            },
                            saveCallback: function (selectData, ele) {
                                $(ele).val(selectData.name);
                                var eleName = $(ele).attr('name');
                                var reg = /[A-Z]/g;
                                var arr;
                                var lastIndex;
                                while ((arr = reg.exec(eleName)) != null) {
                                    lastIndex = arr.index;
                                }

                                var targetId = '';
                                if (lastIndex) {
                                    targetId = eleName.substring(0, lastIndex) + 'Id';
                                } else {
                                    targetId = eleName + 'Id';
                                }

                                $('#' + targetId).val(selectData.id);
                            }
                        });
                        inputAddonRemove.on('click',{targetId:targetId, fileCode: fieldCode},function (e) {
                                    $('#'+e.data.targetId).val('');
                                    $('#'+e.data.fileCode).val('');
                        });
                        break;
                    case 'file':
                        labelObj = $('<label></label>');
                        textInputObj = $('<div id="attach_' + fieldCode + '"></div>');
                        labelObj.append(fieldName);
                        try {
                            textInputObj.xljAttachment({
                                appId: '1',
                                businessId: contentRowTypeId,
                                categoryId: '2',
                                mode: oper,
                                singleUpload: true
                            });
                        } catch (e) {
                            console.warn('附件组件初始化失败');
                        }
                        break;
                    case 'textarea':
                        labelObj = $('<label></label>');
                        textInputObj = $('<textarea class="form-control"></textarea>');
                        labelObj.append(fieldName);
                        textInputObj.attr('id', fieldCode);
                        textInputObj.attr('name', fieldCode);
                        break;
                    default:
                        if (fieldCode == 'contentChildName') {
                            labelObj = $('<label></label>');
                            var enumList = selectContentChildList();
                            var count = 0;
                            textInputObj = $('<select class="input-group form-control" onmouseover="this.title=this.options[this.selectedIndex].text" ></select>');
                            textInputObj.attr('name', fieldCode);
                            textInputObj.attr('id', fieldCode);
                            textInputObj.append('<option value="" selected>请选择</option>');
                            $.each(enumList, function (i, item) {
                                var optionObj = $('<option value="' + $.xljUtils.htmlEncode(item.id) + '">' + $.xljUtils.htmlEncode(item.name) + '</option>');
                                textInputObj.append(optionObj);
                            });
                            labelObj.append(fieldName + ' : ');
                        } else {
                            labelObj = $('<label></label>');
                            textInputObj = $('<input type="text" onmouseover="this.title=this.value" class="form-control">');
                            labelObj.append(fieldName);
                            textInputObj.attr('id', fieldCode);
                            textInputObj.attr('name', fieldCode);
                        }
                        break;
                }
                //判断是否隐藏域
                if (formType != 'hidden') {
                    labelTdObj.append(fieldName);
                    inputTdObj.append(textInputObj);
                    labelTdObj = undefined;
                    inputTdObj = undefined;
                }

                //计算去除整行显示的行中多余单元格
                var rowTds = tempRow.find('td');
                if (rowTds.length >= 8 && tableSelector == '.generalSearchTab') {
                    tempRow = undefined;
                } else if (rowTds.length >= 8 && tableSelector == '.exactSearchTab') {
                    tempRow = undefined;
                }
            }
        }

        //最后一行如果为两列，则再添加两列，补充为一行四列
        var lastTrObj = table.find("tr:last");
        var lastTrTds = lastTrObj.find('td');

        if (tableSelector == '.generalSearchTab') {
            if (lastTrTds.length <= 6) {
                var cellTemp1 = $('<td></td>');
                cellTemp1.addClass('seinor-txt');
                var cellTemp2 = $('<td colspan="'+(8-lastTrTds.length-1)+'"></td>');
                if(8-lastTrTds.length-1==1){
                    cellTemp2.addClass('seinor-ele');
                }
                lastTrObj.append(cellTemp1);
                lastTrObj.append(cellTemp2);

                var btn1 = $('<button class="btn btn-sm btn-adv senior-btn" type="button"><span>高级查询</span><i class="fa fa-angle-down" aria-hidden="true"></i></button>');
                var btn2 = $('<button class="btn btn-sm btn-search rm-pad" type="button" id="searchBtn"><i class="fa fa-search" aria-hidden="true"></i></button>');

                cellTemp2.append(btn1);
                cellTemp2.append(btn2);
                //重置按钮
                btn1.on("click", function () {
                    var sp = $(this).find("span");
                    var si = $(this).find("i");
                    $(".senior-box").toggle();
                    if (sp.text() == "高级查询") {
                        sp.text("收起");
                        si.removeClass('fa-angle-down').addClass('fa-angle-up');
                    } else {
                        sp.text("高级查询");
                        si.removeClass('fa-angle-up').addClass('fa-angle-down');
                    }
                    $.xljUtils.resizeNestedGrid();
                });

                //高级查询按钮
                btn2.click(function () {
                    var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
                    var postData = {};
                    var dateArr = [];
                    postData.contentTypeId = postDataObj.contentTypeId;
                    postData.contentChildId = postDataObj.contentChildId;
                    postData.sortFields = postDataObj.sortFields;
                    $('#searchForm input').each(function (index, item) {
                        if ($.trim(item.value) != '') {
                            var name = item.name;
                            if (name.indexOf('starttime') > -1 || name.indexOf('endtime') > -1) {
                                dateArr.push(name);
                            }
                            postData[item.name] = item.value;
                        }
                        delete postDataObj[item.name];
                    });
                    if (dateArr.length > 0) {
                        postData.dateFields = JSON.stringify(dateArr);
                    }
                    $('#searchForm select').each(function (index, item) {
                        if ($.trim(item.value) != '' && $.trim(item.value) != 'ALL') {
                            var name = item.name;
                            if (name.indexOf('contentChildName') > -1) {
                                postData.contentChildId = item.value;
                            } else
                                postData[item.name] = item.value;

                        }

                        delete postDataObj[item.name];
                    });
                    delete postDataObj.dateFields;
                    $("#contentRowGrid").jqGrid('setGridParam', {postData: postData}).trigger('reloadGrid');
                });
            } else {
                var tr = $('<tr></tr>');
                var cellTemp1 = $('<td></td>');
                cellTemp1.addClass('seinor-txt');
                var cellTemp2 = $('<td colspan="7"></td>');

                var btn1 = $('<button class="btn btn-sm btn-adv senior-btn" type="button"><span>高级查询</span><i class="fa fa-angle-down" aria-hidden="true"></i></button>');
                var btn2 = $('<button class="btn btn-sm btn-search rm-pad" type="button" id="searchBtn"><i class="fa fa-search" aria-hidden="true"></i></button>');

                cellTemp2.append(btn1);
                cellTemp2.append(btn2);


                tr.append(cellTemp1);
                tr.append(cellTemp2);
                //重置按钮
                btn1.on("click", function () {
                    var sp = $(this).find("span");
                    var si = $(this).find("i");
                    $(".senior-box").toggle();
                    if (sp.text() == "高级查询") {
                        sp.text("收起");
                        si.removeClass('fa-angle-down').addClass('fa-angle-up');
                    } else {
                        sp.text("高级查询");
                        si.removeClass('fa-angle-up').addClass('fa-angle-down');
                    }
                });

                //高级查询按钮
                btn2.click(function () {
                    var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
                    var postData = {};
                    var dateArr = [];
                    postData.contentTypeId = postDataObj.contentTypeId;
                    postData.contentChildId = postDataObj.contentChildId;
                    postData.sortFields = postDataObj.sortFields;
                    $('#searchForm input').each(function (index, item) {
                        if ($.trim(item.value) != '') {
                            var name = item.name;
                            if (name.indexOf('starttime') > -1 || name.indexOf('endtime') > -1) {
                                dateArr.push(name);
                            }
                            postData[item.name] = item.value;
                        }
                        delete postDataObj[item.name];
                    });
                    if (dateArr.length > 0) {
                        postData.dateFields = JSON.stringify(dateArr);
                    }
                    $('#searchForm select').each(function (index, item) {
                        if ($.trim(item.value) != '' && $.trim(item.value) != 'ALL') {
                            var name = item.name;
                            if (name.indexOf('contentChildName') > -1) {
                                postData.contentChildId = item.value;
                            } else
                                postData[item.name] = item.value;

                        }
                        delete postDataObj[item.name];
                    });
                    delete postDataObj.dateFields;
                    $("#contentRowGrid").jqGrid('setGridParam', {postData: postData}).trigger('reloadGrid');
                });
                table.append(tr);
            }


        }

        //如果最后一行小于等于4个td 在最后追加重置按钮
        if (tableSelector == '.exactSearchTab') {
            if (lastTrTds.length <= 6) {
                var cellTemp1 = $('<td></td>');
                cellTemp1.addClass('seinor-txt');
                var cellTemp2 = $('<td colspan="'+(8-lastTrTds.length-1)+'"><button class="btn btn-sm btn-adv reset-btn" type="button">重置</button></td>');
                if(8-lastTrTds.length-1==1){
                    cellTemp2.addClass('seinor-ele');
                }
                lastTrObj.append(cellTemp1);
                lastTrObj.append(cellTemp2);
                //重置按钮
                $('.reset-btn').click(function () {
                    $('.exactSearchTab input').each(function (index, item) {
                        item.value = '';
                    })
                });
            } else {
                var tr = $('<tr></tr>');
                var cellTemp1 = $('<td></td>');
                cellTemp1.addClass('seinor-txt');
                var cellTemp2 = $('<td colspan="7"><button class="btn btn-sm btn-adv reset-btn" type="button">重置</button></td>');
                tr.append(cellTemp1);
                tr.append(cellTemp2);
                //重置按钮
                $('.reset-btn').click(function () {
                    /*$('.exactSearchTab input').each(function (index, item) {
                        item.value = '';
                    })*/
                    $('#searchForm').reset();
                });
                table.append(tr);
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


    }

    /**
     * 清空选择器
     */
    window.clearSelector = function (id, name) {
        if(id&&id!=undefined){id.value='';}
        if(name&&name!=undefined){name.value='';}
    }
    /**
     * 获取目录列表
     */
    function selectContentChildList() {
        var result = "";
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: hostUrl + 'oa/content/contentChild/queryList',
            dataType: "json",
            data: JSON.stringify({contentTypeId: contentTypeId}),
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
     * 动态构建复选框，下拉框，单选框中的内容
     * @param enumResult
     * @param type
     * @returns {String}
     */
    function optionValue(enumResult, type, code) {
        var valueHtml = "";
        if (enumResult != "") {
            for (var o in enumResult) {
                if (type == "select") {
                    valueHtml = valueHtml + "<option value='" + enumResult[o].val + "'>" + enumResult[o].name + "</option>";
                } else if (type == "checkbox") {
                    valueHtml = valueHtml + "<input type='checkbox' name='" + code + "' value='" + enumResult[o].val + "'>" + enumResult[o].name + "";
                } else if (type == "radio") {
                    valueHtml = valueHtml + "<input class='form-control' type='radio' name='" + code + "' id='" + code + "' value='" + enumResult[o].val + "'>" + enumResult[o].name + "";
                }
            }
        }
        return valueHtml;
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
     *  获取大类
     */
    function getContentType() {
        var paramData;
        if (operType == 'NEWS') {
            paramData = JSON.stringify({'contentType': 'NEWS', 'deflag': 0, 'contentTypeId': contentTypeId});
        } else {
            paramData = JSON.stringify({'contentType': 'DOC', 'deflag': 0, 'contentTypeId': contentTypeId});
        }
        $.ajax({
            type: 'post',
            url: hostUrl + 'oa/content/contentChild/queryList',
            dataType: 'json',
            contentType: 'application/json',
            data: paramData,
            success: function (data) {
                if (data.success) {
                    if (data.result) {
                        var contentType = data.result;
                        for (var o in contentType) {
                            $("#contentType").append("<option value='" + contentType[o].id + "'>" + contentType[o].name + "</option>")
                        }
                    }
                } else {
                    $.xljUtils.tip("red", data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        })
    }

    /**
     * 加载树结构
     */
    function listTree() {

        $.ajax({
            type: "POST",
            //url: hostUrl+"oa/content/contentChild/getContentChildTreeById/"+contentTypeId+"?time="+Math.random(),
            url: hostUrl + 'oa/content/contentChild/queryTreeList?time=' + Math.random(),
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({delflag: false,contentTypeId:contentTypeId,contentType:operType}),
            success: function (typeNodes) {
                var zNodes = typeNodes.result;
                if (zNodes == null || zNodes.length == 0) {
                    return;
                }
                contentTitle = zNodes[0].name;
                $.fn.zTree.init($("#contentTree"), setting, zNodes);
                var zTreeObj = $.fn.zTree.getZTreeObj('contentTree');
                setTimeout(function(){
                    $.xljUtils.addTreeScroll();
                    $.xljUtils.treeResizeFn();
                },300);

                var nodes = zTreeObj.getNodes();
                //默认展开第一个节点
                zTreeObj.expandNode(nodes[0], true, false, false, false);
                zTreeObj.selectNode(nodes[0]);
                zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                $.xljUtils.addTreeScroll();
                $.xljUtils.treeResizeFn();
                $("#contentTitle").html(contentTitle);
            }
        });
    }

    /**
     *  初始化数据列表页面  operType 1:新闻NEWS 2：文档DOCUMENT
     */
    function loadPage() {
        var colModel = generateColModel();

        $.xljUtils.initJqGrid({
                gridSelecter:"#contentRowGrid",
                url: hostUrl + "oa/content/contentRowType/page",
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "post",
                datatype: "json",
                postData: {
                    "contentTypeId": contentTypeId,
                    "contentChildId": contentChildId,
                    'groupByFields': JSON.stringify(['relationId', 'status']),
                    'sortFields': JSON.stringify({'stick': 'desc', "sortNum": "desc", 'createDate': 'desc'}),
                    'contentType':operType
                },  // 'havingFields':JSON.stringify({'status':'PUBLISHED'}),
                jsonReader: {
                    root:function (data) {
                        var rows = data.rows;
                            for(var j in rows ){
                                for(var i in rows[j]){
                               //   rows[j][i] = $.xljUtils.escapeHtml(rows[j][i]);
                                    rows[j][i] = $.xljUtils.htmlEncode(rows[j][i]);
                                }
                            }
                        return rows;
                    },
                    repeatitems: false
                },
                colModel: colModel,
                sortname: 'sort',//排序字段
                pgbuttons: true,
                viewrecords: true,
                rownumbers: true,
                multiboxonly: true,
                height: $(window).height() - 228,
                autowidth:true,
                multiselect: true,
                sortorder: "desc",
                pager: '#pagered',
                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                ondblClickRow: function (id) {
                    var rowData = $('#contentRowGrid').jqGrid('getRowData', id);
                    if (operType == 'NEWS') { //跳转新闻静态页面
                        if (rowData.status == 'DRAFT') {
                            //window.open("contentRowType_news_edit.html?ids=" + id + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                            window.open("contentRowType_news_edit.html?ids=" + id + "&oper=edit");
                        } else {
                            window.open("contentRowType_staticPage.html?id=" + id + "&contentTypeId=" + rowData.contentTypeId);
                        }
                    } else if (operType == 'DOCUMENT') { //跳转文档明细页
                        if (rowData.status == 'DRAFT') {
                            window.open("contentRowType_doc_edit.html?ids=" + id + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                        } else {
                            window.open("contentRowType_doc_view.html?id=" + id);
                        }
                    }
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#contentRowGrid ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function (rowid,status) {

                    $(this).attr('data-current-rowid', null);
                    $(this).attr('data-previous-rowid', null);
                    // 有选择行时，以行号最小的rowid作为当前行id
                    var selIds = $(this).jqGrid('getGridParam','selarrrow');
                    if (selIds.length > 0) {
                        var rowIndexs = [];
                        for(var i = 0; i < selIds.length; i++) {
                            rowIndexs.push(this.rows[selIds[i]].rowIndex);
                        }
                        
                        var minRowIndex = Math.min.apply(Math, rowIndexs);
                        $(this).attr('data-current-rowid', this.rows[minRowIndex].id);
                        $(this).attr('data-previous-rowid', this.rows[minRowIndex].previousSibling.id);
                    }

                    var rowId = $('#contentRowGrid').jqGrid("getGridParam", "selrow");
                    rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                    //   status:草稿：DRAFT、审批中：APPROVALING、已审批未发布：APPROVED、已发布：PUBLISHED、作废：INVALID
                    if (rowData.status == 'APPROVED' || rowData.status == 'PUBLISHED') {
                        $('#updateBtn').text('修订');
                    } else {
                        $('#updateBtn').text('修改');
                    }
                },
                loadError: function () {


                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                        $.xljUtils.resizeNestedGrid();
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    } else {
                        //success
                    }

                }
            });
    }

    /**
     * 设置新增行ID到jqgrid
     * @param rowId
     * @returns
     */
    function setJqGridAddedRowId(rowId) {
        $.xljUtils.setAddedRowId('#contentRowGrid', rowId);
    }
    /**
     * 动态生成colModel
     */
    function generateColModel() {
        var colModel = [];
        var element = {name: 'id', label: 'id', align: "center", hidden: true};
        colModel.push(element);
        element = {name: 'approvalProcess', label: 'approvalProcess', hidden: true};
        colModel.push(element);
        element = {name: 'processInstanceId', label: 'processInstanceId', hidden: true};
        colModel.push(element);
        element = {name: 'contentChildId', label: 'contentChildId', hidden: true};
        colModel.push(element);
        element = {name: 'contentTypeId', label: 'contentTypeId', hidden: true};
        colModel.push(element);
        element = {name: 'agencyId', label: 'agencyId', hidden: true};
        colModel.push(element);
        element = {name: 'createPersonId', label: 'createPersonId', hidden: true};
        colModel.push(element);
        element = {name: 'flCode', label: 'flCode', hidden: true};
        colModel.push(element);
        for (var i in attrArray) {
            var attr = attrArray[i];
            if (attr.isListView == true) {
                if (attr.fieldCode == 'stick') {
                    element = {
                        name: 'stick',
                        label: attr.fieldName,
                        width: 55,
                        sortable: false,
                        align: "center",
                        editable: false,
                        formatter: 'select',
                        editoptions: {value: "true:是;false:否"}
                    };
                } else if (attr.fieldCode == 'status') {
                    element = {
                        name: 'status',
                        label: attr.fieldName,
                        width: 55,
                        sortable: false,
                        align: "center",
                        editable: false,
                        editoptions: {value: "DRAFT:草稿;APPROVALING:审批中;APPROVED:已审批未发布;PUBLISHED:已发布;INVALID:作废"},
                        formatter: function (v, opt, rec) {
                            if (v == 'INVALID') return "作废";
                            if (v == 'APPROVALING')  return "审批中";
                            if (v == 'APPROVED')  return "已审批未发布";
                            if (v == 'PUBLISHED')  return "已发布";
                            return '草稿'
                        },
                        unformat: function (v) {
                            if (v == '作废') return "INVALID";
                            if (v == '审批中')  return "APPROVALING";
                            if (v == '已审批未发布')  return "APPROVED";
                            if (v == '已发布')  return "PUBLISHED";
                            return 'DRAFT'
                        }
                    };//文档重要度  非常重要：ALLIMPORTANT；重要：IMPORTANT；普通：GENERAL；};//标识文档状态：草稿：DRAFT、审批中：APPROVALING、已审批未发布：APPROVED、已发布：PUBLISHED、作废：INVALID
                } else if (attr.fieldCode == 'importance') {
                    element = {
                        name: 'importance',
                        label: attr.fieldName,
                        width: 55,
                        sortable: false,
                        align: "center",
                        editable: false,
                        formatter: function (v, opt, rec) {
                            if (v == 'ALLIMPORTANT') return "非常重要";
                            if (v == 'IMPORTANT')  return "重要";
                            return '普通'
                        },
                        editoptions: {value: "ALLIMPORTANT:非常重要;IMPORTANT:重要;GENERAL:普通"},
                        unformat: function (v) {
                            if (v == '非常重要') return 'ALLIMPORTANT';
                            if (v == '重要') return 'IMPORTANT';
                            return 'GENERAL';
                        }
                    };//文档重要度  非常重要：ALLIMPORTANT；重要：IMPORTANT；普通：GENERAL；
                } else if (attr.fieldCode == 'docContent') {
                    element = {
                        name: attr.fieldCode,
                        label: attr.fieldName,
                        align: "center",
                        width: 55,
                        sortable: false,
                        editable: false,
                        title: false,
                        hidden: true,
                        formatter: StrLenFormat
                    };
                } else if(attr.fieldCode == 'businessObjectCode'){
                	 element = {
                	  name: attr.fieldCode,
                      label: attr.fieldName,
                      align: "center",
                      width: 55,
                      sortable: false,
                      editable: false,
                      title: false,
                      hidden: true
                	 };
                } else if (attr.fieldCode == 'title') {
                    element = {
                        name: attr.fieldCode,
                        label: attr.fieldName,
                        align: "center",
                        width: 150,
                        sortable: false,
                        editable: false
                    };
            
                } else {
                    element = {
                        name: attr.fieldCode,
                        label: attr.fieldName,
                        align: "center",
                        width: 55,
                        sortable: false,
                        editable: false
                    };
                }
                colModel.push(element);
            }
        }
        return colModel;
    }

    /**
     *
     */

    function StrLenFormat(cellvalue, options, rowObject) {
        var oldStrLen = '';
        if (cellvalue != null) {
            oldStrLen = cellvalue.length;
        }
        var newStr = '';
        if (oldStrLen > 10) {
            newStr = cellvalue.substring(0, 10) + '...';
        } else {
            newStr = cellvalue;
        }
        return newStr;
    }

    /**
     * 新增新闻
     */
    function addNEWS() {
        if (zTreeNode == null) {
            $.xljUtils.tip('blue', '请先选择所属的具体新闻目录！');
            return;
        }
        var nodeChildren = zTreeNode.children;
        if (nodeChildren && nodeChildren.length > 0) {
            $.xljUtils.tip('blue', '请先选择所属的具体新闻目录！');
            return;
        }

        var pNode = getContentTypeNode(zTreeNode);

        window.open("contentRowType_news_edit.html?contentTypeId=" + zTreeNode.contentTypeId + "&contentTypeName=" + encodeURI(pNode.name, "UTF-8") + "&contentTypeCode=" + pNode.code + "&contentChildId=" + zTreeNode.contentChildId + "&contentChildName=" + encodeURI(zTreeNode.name, "UTF-8") + "&contentChildCode=" + encodeURI(zTreeNode.code, "UTF-8") + "&oper=add&process=" + pNode.approvalProcess + "&businessObjectCode=" + pNode.businessObject + "&status=DRAFT");
    }

    function getContentTypeNode(childNode) {
        var pNode = childNode.getParentNode();
        if(!pNode||pNode==null){
            return childNode;
        }
        //while (pNode!=null){
            childNode = getContentTypeNode(pNode);
        //}
        return childNode;
    }

    /**
     * 新增文档
     */
    function addDoc() {
        if (zTreeNode == null) {
            $.xljUtils.tip('blue', '请先选择所属的具体知识目录！');
            return;
        }
        var nodeChildren = zTreeNode.children;
        if (nodeChildren && nodeChildren.length > 0) {
            $.xljUtils.tip('blue', '请先选择所属的具体知识目录！');
            return;
        }
        var pNode = getContentTypeNode(zTreeNode);

        window.open("contentRowType_doc_edit.html?contentTypeId=" + zTreeNode.contentTypeId + "&contentTypeName=" + encodeURI(pNode.name, "UTF-8") + "&contentTypeCode=" + pNode.code + "&contentChildId=" + zTreeNode.id + "&contentChildName=" + encodeURI(zTreeNode.name, "UTF-8") + "&contentChildCode=" + encodeURI(zTreeNode.code, "UTF-8") + "&oper=add&process=" + pNode.approvalProcess + "&businessObjectCode=" + pNode.businessObject + "&status=DRAFT");
    }

    /**
     * 批量删除新闻数据
     */
    function deleteNEWS() {

        var ids = $("#contentRowGrid").jqGrid("getGridParam", "selarrrow");
        if (ids.length != 0) {
            var flag = false;
            if(!checkDataAuthEdit(ids)){
                $.xljUtils.tip("blue","数据权限不足！");
                return;
            }
            for(var i in ids){
                var rowData = $('#contentRowGrid').jqGrid('getRowData', ids[i]);
                if(rowData.status=='APPROVALING'){
                    flag = true;
                }
            }
            if(flag){
                $.xljUtils.tip('blue', "不能删除处于审批中的数据！");
                return;
            }
            $.xljUtils.confirm("blue", "确认要删除这【" + ids.length + "】条数据吗？", function () {
                $.ajax({
                    type: "delete",
                    url: hostUrl + "oa/content/contentRowType/deleteAll/" + ids + "/news",
                    dataType: "json",
                    success: function (result) {
                        $('#contentRowGrid').jqGrid().trigger('reloadGrid');
                    }
                });
            }, true);

        } else {
            $.xljUtils.tip('blue', "请选择要删除的行！");
        }
    }

    /**
     * 批量删除文档数据
     */
    function deleteDoc() {
        var ids = $("#contentRowGrid").jqGrid("getGridParam", "selarrrow");
        var valArr = new Array();
        if (ids.length != 0) {
            var flag = false;
            for(var i in ids){
                var rowData = $('#contentRowGrid').jqGrid('getRowData', ids[i]);
                if(rowData.status=='APPROVALING'){
                    flag = true;
                }
            }
            if(flag){
                $.xljUtils.tip('blue', "不能删除处于审批中的数据！");
                return;
            }

            $.xljUtils.confirm("blue", "确认要删除这【" + ids.length + "】条数据吗？", function () {
                $.ajax({
                    type: "delete",
                    url: hostUrl + "oa/content/contentRowType/deleteAll/" + ids + "/knowledge",
                    dataType: "json",
                    success: function (result) {
                        $('#contentRowGrid').jqGrid().trigger('reloadGrid');
                    }
                });

                $.ajax({
                    type: "delete",
                    url: hostUrl + "univ/attachment/attachment/deleteBatch/" + ids,
                    dataType: "json",
                    success: function (result) {
                        $('#contentRowGrid').jqGrid().trigger('reloadGrid');
                    }
                });

            }, true);

        } else {
            $.xljUtils.tip('blue', "请选择要删除的行！");
        }
    }


    /**
     * 绑定按钮事件
     */
    function bindButton() {
        $('#closeBtn').on('click',function () {
        	 newwin = window.open("","_parent","");  
             newwin.close();
        });
        //发布
        $("#publishBtn").click(function () {
            var ids = $("#contentRowGrid").jqGrid("getGridParam", "selarrrow");
            if (ids.length > 1) {
                $.xljUtils.tip("blue", "只能选择一条数据发布");
                return;
            }
                    var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
                    if (rowId && rowId != '') {
                        if(!checkDataAuthEdit(rowId)){
                            $.xljUtils.tip("blue","数据权限不足！");
                            return;
                        }
                        var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                        if (rowData.status != 'INVALID') {

                        	//如果新闻或者文档是草稿状态，则不允许发布
                        	if (rowData.status == 'DRAFT') {
                                $.xljUtils.tip('blue', "该数据是草稿状态，不能发布！");
                                return;
                            }
                            if (rowData.status == 'PUBLISHED') {
                                $.xljUtils.tip('blue', "该数据已发布！");
                                return;
                            }
                            if (rowData.approvalProcess == "true") {
                                if (rowData.status == 'APPROVED') {
                                    updateContentRowTypeState("publish", "APPROVED");
                                } else {
                                    $.xljUtils.tip('blue', "该数据未经过审批！");
                                    return;
                                }
                            } else {
                               if($.trim(rowData.title)==''|| $.trim(rowData.code)==''
                                   || $.trim(rowData.author)==''||$.trim(rowData.agencyId)==''
                                   ||$.trim(rowData.importance)==''){
                                   $.xljUtils.tip('blue', "该数据存在未填入的必填项，请先编辑！");
                                   return;
                               }
                                updateContentRowTypeState("publish", "UNAPPROVED");
                            }
                        } else {
                            $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                        }

                    } else {
                        $.xljUtils.tip('blue', "请选择要操作的数据！");
                    }
        });
        //取消发布
        $("#unPublishBtn").click(function () {
            var ids = $("#contentRowGrid").jqGrid("getGridParam", "selarrrow");
                if (ids.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一条数据取消发布");
                    return;
                }
                    var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
                    if (rowId && rowId != '') {
                        if(!checkDataAuthEdit(rowId)){
                            $.xljUtils.tip("blue","数据权限不足！");
                            return;
                        }
                        var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                        if (rowData.status != 'INVALID') {
                            if (rowData.approvalProcess == 'true') {
                                if (rowData.status == 'APPROVED') {
                                    $.xljUtils.tip('blue', "该数据为未发布状态！");
                                    return;
                                }
                                if (rowData.status == 'PUBLISHED') {
                                    updateContentRowTypeState("unPublish", "PUBLISHED");
                                }
                            } else {
                                updateContentRowTypeState("unPublish", "DRAFT");
                            }
                        } else {
                            $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                        }
                    } else {
                        $.xljUtils.tip('blue', "请选择要操作的数据！");
                    }


        });
        //置顶
        $("#stickBtn").click(function () {

            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                	
                	if (rowData.status != 'PUBLISHED') {
                        $.xljUtils.tip('blue', "该数据不是发布状态，不能置顶！");
                        return;
                    }
                	
                    if (rowData.stick == true) {
                        $.xljUtils.tip('blue', "该数据已置顶！");
                        return;
                    }
                    stickConfirm("blue", function () {
                        var reg = new RegExp("^[0-9]*$");
                        var hour = $('#hours').val();
                        if($.trim(hour)==''){
                          //  $.xljUtils.tip("blue","请输入置顶周期!");
                            return false;
                        }
                        if (!reg.test(hour)) {
                        //    $.xljUtils.tip("blue","请输入数字!");
                            return false;
                        }
                        if (!/^[0-9]*$/.test(hour)) {
                        //    $.xljUtils.tip("blue","请输入数字!");
                            return false;
                        }
                        updateContentRowTypeState("stick", hour);

                        return true;
                    }, true);
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }

            } else {
                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //取消置顶
        $("#unStickBtn").click(function () {
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                    if (rowData.stick == false) {
                        $.xljUtils.tip('blue', "该数据已取消置顶！");
                        return;
                    }
                    updateContentRowTypeState("unStick", "CANCEL");
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }
            } else {

                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //上移
        $("#upBtn").click(function () {
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                    updateContentRowTypeState("up", "UP");
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }
            } else {
                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //下移
        $("#downBtn").click(function () {
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                    updateContentRowTypeState("down", "DOWN");
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }
            } else {
                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //收藏
        $("#collectBtn").click(function () {
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                    updateContentRowTypeState("collect", "COLLECT");
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }
            } else {
                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //分类转移
        $("#transBtn").click(function () {
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if (rowData.status != 'INVALID') {
                    $('#transBtn').xljSingleSelector({
                        title: '选择分类',//选择器标题，默认是'选择组织机构'
                        treeUrl: hostUrl + "oa/content/contentChild/getContentChildTreeById/" + $.xljUtils.getUrlParam('contentType'),
                        immediatelyShow: true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
                        ajaxType: 'POST',	//ajax的type 默认为post
                        /**
                         * 保存回调函数
                         * @param selectDatas 已选择的数据json对象
                         * @param ele 绑定选择器的对象
                         */
                        saveCallback: function (selectData, ele) {
                            //重新设置分类
                            var nodeChildren = selectData.children;
                            if (nodeChildren && nodeChildren.length > 0) {
                                $.xljUtils.tip('blue', '只能选取知识目录！');
                                return;
                            }
                            // if (selectData.pId == '0') {
                            // 	$.xljUtils.tip('blue', '只能选取知识目录！');
                            // 	return;
                            // }
                            updateContentRowTypeState("trans", selectData.id);

                        },
                        formatTreeJson: function(datas) {
                        	datas = datas.map(function(currentValue, index, arr){
                        	    return JSON.parse($.xljUtils.htmlEncode(JSON.stringify(currentValue)));
                        	});
                        	return datas;
                        },
                        treeSettings: {
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: 'id',
                                    pIdKey: 'pId',
                                    rootPId: null
                                }
                            }
                        }
                    });
                } else {
                    $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                }
            } else {
                $.xljUtils.tip('blue', "请选择要操作的数据！");
            }
        });
        //新增页面
        $("#addBtn").click(function () {
            if (operType == 'NEWS') {
                addNEWS(); //新增新闻
            } else if (operType == 'DOCUMENT') {
                addDoc();  //新增文档
            }
        });

        //修改页面
        $("#updateBtn").click(function () {
            var idsVal = $('#contentRowGrid').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                }
                //获取当前选中行的ID
                var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                if (operType == 'NEWS' && rowData.status != 'INVALID'&& rowData.status!='APPROVALING') { //修改新闻
                    //window.open("contentRowType_news_edit.html?ids=" + rowId + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                    window.open("contentRowType_news_edit.html?ids=" + rowId + "&oper=edit");
                } else if (operType == 'DOCUMENT' && rowData.status != 'INVALID' && rowData.status!='APPROVALING') {//修改文档
                    window.open("contentRowType_doc_edit.html?ids=" + rowId + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                } else {
                    if(rowData.status == 'INVALID'){
                        $.xljUtils.tip("blue", "不可编辑，数据文档已作废！");
                    }else if(rowData.status=='APPROVALING'){
                        $.xljUtils.tip("blue", "已被锁定，数据文档审批中！");
                    }
                }
            } else {
                $.xljUtils.tip('blue', '请选择要修改的数据！');
            }

        });
        //删除数据
        $("#delBtn").click(function () {

            if (operType == 'NEWS') {
                deleteNEWS(); //删除新闻
            } else if (operType == 'DOCUMENT') {
                deleteDoc(); //删除文档
            }
        });
       //修改可阅读人
        $('#authBtn').click(function () {
            //获取当前选中行的ID
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                if(!checkDataAuthEdit(rowId)){
                    $.xljUtils.tip("blue","数据权限不足！");
                    return;
                }
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if(rowData.processInstanceId&&rowData.processInstanceId!=''){
                    var instanceArr = new Array();
                    instanceArr.push(rowData.processInstanceId);
                    window.selectedIds = instanceArr;
                    window.open(hostUrl+'flow/runtime/query/batch_modify_reader.html');
                }else{
                    $.xljUtils.tip('blue', '数据未开始审批，无法修改可阅读人！');
                }
            }else{
                $.xljUtils.tip('blue', '请选择要操作的数据！');
            }


        });
        //高级查询按钮
        /*$("#searchBtn").click(function () {
            var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
            var postData = {};
            var dateArr = [];
            postData.contentTypeId = postDataObj.contentTypeId;
            postData.contentChildId = postDataObj.contentChildId;
            postData.sortFields = postDataObj.sortFields;
            $('#searchForm input').each(function (index, item) {
                if ($.trim(item.value) != '') {
                    var name = item.name;
                    if (name.indexOf('starttime') > -1 || name.indexOf('endtime') > -1) {
                        dateArr.push(name);
                    }
                    postData[item.name] = item.value;
                }
                delete postDataObj[item.name];
            });
            if (dateArr.length > 0) {
                postData.dateFields = JSON.stringify(dateArr);
            }
            $('#searchForm select').each(function (index, item) {
                if ($.trim(item.value) != '' && $.trim(item.value) != 'ALL') {
                    var name = item.name;
                    if (name.indexOf('contentChildName') > -1) {
                        postData.contentChildId = item.value;
                    } else
                        postData[item.name] = item.value;

                }
                delete postDataObj[item.name];
            });
            delete postDataObj.dateFields;
            $("#contentRowGrid").jqGrid('setGridParam', {postData: postData}).trigger('reloadGrid');
        });*/

        //模糊查询按钮
        $("#fuzzySearchBtn").click(function () {
            var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
            // console.log(postDataObj);
            // console.log(fuzzyArr);
            var postData = {};
            postData.contentTypeId = postDataObj.contentTypeId;
            postData.contentChildId = postDataObj.contentChildId;
            postData.sortFields = postDataObj.sortFields;
        
            for (var i in fuzzyArr) {
                if ($.trim(value) != '') {
                    postData[fuzzyArr[i]] = value;
                    postData.fuzzyQueryFields = JSON.stringify(fuzzyArr);
                }
                delete postDataObj[fuzzyArr[i]];
            }

            $('#searchForm input').each(function (index, item) {
                delete postDataObj[item.name];
            });
            $('#searchForm select').each(function (index, item) {
                delete postDataObj[item.name];
            });
            delete postDataObj.fuzzyQueryFields;
            $("#contentRowGrid").jqGrid('setGridParam', {postData: postData}).trigger('reloadGrid');
        });

        //模糊查询按钮绑定回车键
        $(document).keydown(function (event) {
            if (event.keyCode == 13) {
                $("#fuzzySearchBtn").click();
            }
        });
      //查看审批
        $('#checkApprovalBtn').on('click',function () {

            //获取当前选中行的ID
            var rowId = $("#contentRowGrid").jqGrid("getGridParam", "selrow");
            if (rowId && rowId != '') {
                var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                if(rowData.processInstanceId&&rowData.processInstanceId!=''){
                    window.open(hostUrl+'flow/runtime/approve/flow_view.html?flCode='+rowData.flCode+'&businessId='+rowId+'&appId=OA&userId='+rowData.createPersonId);
                }else{
                    $.xljUtils.tip('blue', '数据未开始审批，无法查看审批！');
                }
            }else{
                $.xljUtils.tip('blue', '请选择要操作的数据！');
            }


        });
        /*$(".senior-btn").on("click", function () {
            var sp = $(this).find("span");
            var si = $(this).find("i");
            $(".senior-box").toggle();
            if (sp.text() == "高级查询") {
                sp.text("收起");
                si.removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sp.text("高级查询");
                si.removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        });*/
    }

    /**
     *  检查数据修和删除权限
     */
    function checkDataAuthEdit(id){
        var dataAuth = false;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: hostUrl + "oa/content/contentRowType//check/dataAuthEdit/"+id,
            dataType: "json",
            data:JSON.stringify({contentType:operType}),
            async:false,
            success: function (result) {
                if(result&&result.success){
                    dataAuth = true;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return dataAuth;
    }
    /**
     * 置顶周期选择框
     */
    function stickConfirm(skinType, fn, failFn, yesText, callback) {
        var skinType = "blue";
        var html = '<div class="dialog-box" id=""> <div class="con ' + skinType + '"> ' +
            '<span class="">置顶周期</span> <div class="tipBody">' +
            '<p><input type="text" class="form-control" id="hours" name="hours" value="" placeholder="(小时)"></p> <div class="btn-footer"> ' +
            '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
        easyDialog.open({
            container: {
                content: html,
                yesFn: fn,
                noFn: failFn
            },
            overlay:true,
            callback: callback
        });
        if (yesText) $("#easyDialogYesBtn").text(yesText);
        if (!failFn) $("#easyDialogNoBtn").remove();
        $(".easyDialog_footer").remove();
    }

    /**
     *  修改内容状态
     */
    function updateContentRowTypeState(state, param) {
        $.ajax({
            type: "put",
            contentType: "application/json",
            url: hostUrl + "oa/content/contentRowType/updateState/" + rowData.id + "/" + state + "/" + $.xljUtils.htmlDecode(param),
            dataType: "json",
            success: function (result) {
                $("#contentRowGrid").jqGrid('setGridParam', {postData: {"contentTypeId": rowData.contentTypeId}}).trigger('reloadGrid');
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }


    /**
     * 刷新jqgrid页面
     */
    function resLoad() {
        $("#contentRowGrid").jqGrid('setGridParam', {postData: {"contentTypeId": $("#contentTypeId").val()}}).trigger('reloadGrid');
    }

    /**
     * 页面自动计算宽度和高度
     */
    $(window).resize(function () {
        resizeHeight();
    });
    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        /*var w_h = $(window).height();
       // $('.xj-main-grid').height(w_h - 256);
        $(".ztree-box").height((w_h - 88));
        //动态计算各grid的宽高
        setTimeout(function () {
        	$(".ztree-box").height($('.col9width').height()-69);
        },200);*/

        var headerHeight = 0;
        if($('header').is(":visible") ){
            headerHeight = 70;
        }
        var height = window.innerHeight;//$(window).height()
        $('.ztree-box').height(height-$('.org-title').outerHeight()-$('.searchBox:visible').outerHeight()-38-headerHeight);
    }


    /**
     * 样式初始化
     */
    function initStyle() {
        resizeHeight();

    }


    /**
     * 刷新grid
     */
    window.reloadGrid = function () {
        $('#contentRowGrid').jqGrid('setGridParam', {postData: {"contentTypeId": contentTypeId}}).trigger('reloadGrid');
        ;
    }

    /**
     *   设置新增行id
     */
    window.setJqGridAddedRowId= setJqGridAddedRowId;
})(jQuery, window, document, easyDialog)
