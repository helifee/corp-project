/**
 * Created by admin on 2017/7/23.
 */
$(function () {
    var baseUrl = '/platform-app/';
    var urlParams = $.xljUtils.getUrlParams();

    if(urlParams.contentType=='NEWS') {
        $('#treeTitle').text('新闻中心');
        $('.xj-form-title').text('新闻中心');
    }else{
        $('#treeTitle').text('知识中心');
        $('.xj-form-title').text('知识中心');
    }

    //判断是否显示bar条
    if (urlParams.newOpenWin&&urlParams.newOpenWin=='true'){
        $('.xj-form-header').show();
        $('.news-container').css({'padding-top':'70px'});
    }

    //获取按钮权限
    function getOperationAuthorition() {
        $.ajax({
            type: 'GET',
            url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?_t='+new Date().getTime()+'&appCode=OA&menuCode=' + urlParams.btnMenuCode,
            dataType: 'json',
            //contentType: 'application/json',
            async: false,
            //data: JSON.stringify(postdata),
            success: function (data) {
                if (data.success) {
                    var operations = [];
                    for (var i = 0; i < data.result.length; i++) {
                        var obj = data.result[i];
                        operations.push(obj.replace(urlParams.btnMenuCode + '_', ''));
                    }

                    initBtns(operations);
                } else {
                    $.xljUtils.tip('red', '获取按钮权限失败！');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip('red', '获取按钮权限失败！');
            }
        });
    }
    getOperationAuthorition();

    /**
     * 初始化页面操作按钮
     * @param operationBtns
     */
    function initBtns(operationBtns) {

        var addBtn = $('<button type="button" class="btn btn-sm btn-default" id="addBtn">新增</button>');

        var updateBtn = $('<button type="button" class="btn btn-sm btn-default" id="updateBtn">修改</button>');
        var delBtn = $('<button type="button" class="btn btn-sm btn-default" id="delBtn">删除</button>');
        var publishBtn = $('<button type="button" class="btn btn-sm btn-default" id="publishBtn">发布</button>');
        var stickBtn = $('<button type="button" class="btn btn-sm btn-default" id="stickBtn">置顶</button>');
        var upBtn = $('<button type="button" class="btn btn-sm btn-default" id="downBtn">上移</button>');
        var downBtn = $('<button type="button" class="btn btn-sm btn-default" id="upBtn">下移</button>');

        var transBtn = $('<button type="button" class="btn btn-sm btn-default" id="transBtn">分类转移</button>');
        var unPublishBtn = $('<button type="button" class="btn btn-sm btn-default" id="unPublishBtn">取消发布</button>');
        var unStickBtn = $('<button type="button" class="btn btn-sm btn-default" id="unStickBtn">取消置顶</button>');
        var viewApproveBtn = $('<button type="button" class="btn btn-sm btn-default" id="checkApprovalBtn">查看审批</button>');

        var moreBtnContainer = $('<div class="btn-group more"></div>');
        var moreBtn = $('<button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown">更多<span class="caret"></span></button>');
        var moreUlContainer = $('<ul class="dropdown-menu" role="more"></ul>');
        moreBtnContainer.append(moreBtn)
        moreBtnContainer.append(moreUlContainer)
        //var moreLiObj = $('<li><a href="javascript:void(0)" id="transBtn">分类转移</a></li>');

        if($.inArray('CREATE',operationBtns)!=-1){
            $('#contentRowTypeBtnContainer').append(addBtn);
        }

        if($.inArray('UPDATE',operationBtns)!=-1){
            $('#contentRowTypeBtnContainer').append(updateBtn);
        }

        if($.inArray('DELETE',operationBtns)!=-1){
            $('#contentRowTypeBtnContainer').append(delBtn);
        }

        if($.inArray('PUBLISH',operationBtns)!=-1){
            $('#contentRowTypeBtnContainer').append(publishBtn);
        }

        if($.inArray('STICK',operationBtns)!=-1){
            $('#contentRowTypeBtnContainer').append(stickBtn);
        }

        if($.inArray('UP_MOVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(upBtn);
        }else if($.inArray('UP_MOVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="downBtn">上移</a></li>')
        }

        if($.inArray('DOWN_MOVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(downBtn);
        }else if($.inArray('DOWN_MOVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="upBtn">下移</a></li>')
        }

        if($.inArray('TRANS',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(transBtn);
        }else if($.inArray('TRANS',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="transBtn">分类转移</a></li>')
        }

        if($.inArray('UN_PUBLISH',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(unPublishBtn);
        }else if($.inArray('UN_PUBLISH',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="unPublishBtn">取消发布</a></li>')
        }

        if($.inArray('UN_STICK',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(unStickBtn);
        }else if($.inArray('UN_STICK',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="unStickBtn">取消置顶</a></li>')
        }

        if($.inArray('VIEW_APPROVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length<5){
            $('#contentRowTypeBtnContainer').append(viewApproveBtn);
        }else if($.inArray('VIEW_APPROVE',operationBtns)!=-1&&$('#contentRowTypeBtnContainer button').length>=5){
            moreUlContainer.append('<li><a href="javascript:void(0)" id="checkApprovalBtn">查看审批</a></li>')
        }

        if(moreUlContainer.find('li').length>0){
            $('#contentRowTypeBtnContainer').append(moreBtnContainer);
        }
    }

    /**
     * 初始化知识大类属性
     * @returns {{}}
     */
    function initContentRowAttr() {
        var defObjs = {};
        var def = new $.Deferred();
        $.ajax({
            type: "POST",
            url: serviceUrl + "oa/content/contentRowAttribute/queryList?time=" + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({'delflag': 0,isUsing:true,contentTypeId:urlParams.contentTypeId}),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var attrArray = xhr.result;

                        //列表表头字段
                        var colModel = [];
                        var idColObj = {name: 'id',label : 'ID',hidden: true,sortable:false};
                        colModel.push(idColObj);
                        var agencyIdColObj = {name: 'agencyId',label : 'agencyId',hidden: true,sortable:false};
                        colModel.push(agencyIdColObj);
                        var approvalProcessColObj = {name: 'approvalProcess',label : 'approvalProcess',hidden: true,sortable:false};
                        colModel.push(approvalProcessColObj);
                        var processInstanceId = {name: 'processInstanceId',label : 'processInstanceId',hidden: true,sortable:false};
                        colModel.push(processInstanceId);
                        var createPersonId = {name: 'createPersonId',label : 'createPersonId',hidden: true,sortable:false};
                        colModel.push(createPersonId);
                        var flCode = {name: 'flCode',label : 'flCode',hidden: true,sortable:false};
                        colModel.push(flCode);
                        //查询条件表单字段
                        var generalArr = [];
                        var exactArr = [];

                        var fuzzyArr = [];
                        //定义扩展字段的集合
                        //var extendArr = [];

                        for(var i in attrArray) {
                            var obj = attrArray[i];
                            var colObj = {};
                            if(obj.isListView){
                                colObj.name = obj.fieldCode;
                                colObj.label = obj.fieldName;
                                colObj.isExtendedField = obj.isExtendedField;
                                colObj.sortable = false;
                                //colObj.width = false;

                                if('importance'==obj.fieldCode){
                                    //colObj.width = 80;
                                    colObj.formatter = function (v, opt, rec) {
                                        switch (v) {
                                            case 'ALLIMPORTANT':
                                                return '非常重要';
                                            case 'IMPORTANT':
                                                return '重要';
                                            case 'GENERAL':
                                                return '普通';
                                            default:
                                                return '普通';
                                        }
                                    };

                                    colObj.unformat = function (v, opt, rec) {
                                        switch (v) {
                                            case '非常重要':
                                                return 'ALLIMPORTANT';
                                            case '重要':
                                                return 'IMPORTANT';
                                            case '普通':
                                                return 'GENERAL';
                                            default:
                                                return 'GENERAL';
                                        }
                                    };
                                }

                                if('status'==obj.fieldCode){
                                    //colObj.width = 55;
                                    colObj.formatter = function (v, opt, rec) {
                                        switch (v) {
                                            case 'DRAFT':
                                                return '草稿';
                                            case 'APPROVALING':
                                                return '审批中';
                                            case 'APPROVED':
                                                return '已审批未发布';
                                            case 'PUBLISHED':
                                                return '已发布';
                                            case 'INVALID':
                                                return '作废';
                                            default:
                                                return '草稿';
                                        }
                                    };

                                    colObj.unformat = function (v, opt, rec) {
                                        switch (v) {
                                            case '草稿':
                                                return 'DRAFT';
                                            case '审批中':
                                                return 'APPROVALING';
                                            case '已审批未发布':
                                                return 'APPROVED';
                                            case '已发布':
                                                return 'PUBLISHED';
                                            case '作废':
                                                return 'INVALID';
                                            default:
                                                return 'DRAFT';
                                        }
                                    };
                                }

                                if('stick'==obj.fieldCode){
                                    //colObj.width = 80;
                                    colObj.formatter = function (v, opt, rec) {
                                        if('true'==v||true==v) {
                                            return '是';
                                        }
                                        return '否';
                                    };

                                    colObj.unformat = function (v, opt, rec) {
                                        if('是'==v) {
                                            return true;
                                        }
                                        return false;
                                    };
                                }

                                if('createDate'==obj.fieldCode){
                                    colObj.formatter = function (v, opt, rec) {
                                        if(v && v!=''&&v.length>=10) {
                                            return v.substring(0,10);
                                        }
                                        return v;
                                    };
                                }

                                if('businessObjectCode'==obj.fieldCode){
                                    colObj.hidden = true;
                                }

                                colObj.width = obj.columnWidth;
                                if (obj.fieldCode == 'title') {
                                    colObj.width = 500;
                                }

                                colModel.push(colObj);
                            }

                            //通用查询或者通用&模糊查询
                            if (obj.searchType == 'GENERA_FUZZY_SEARCH' || obj.searchType == 'GENERAL_SEARCH') {
                                generalArr.push(obj);
                            }
                            //精确查询或者精确&模糊查询
                            if (obj.searchType == 'EXACT_SEARCH'||obj.searchType == 'EXACT_FUZZY_SEARCH') {
                                //如果包含高级查询条件则显示高级查询条件按钮
                                exactArr.push(obj);
                            }

                            if (obj.searchType=='FUZZY_SEARCH'||obj.searchType=='GENERA_FUZZY_SEARCH'||obj.searchType=='EXACT_FUZZY_SEARCH'){
                                fuzzyArr.push(obj);
                            }

                            /* //判断该字段是否是扩展字段，如果是扩展字段的模糊查询，则把扩展字段的模糊查询放在一个集合中
                             if (obj.isExtendedField == true && (obj.searchType=='FUZZY_SEARCH'||obj.searchType=='GENERA_FUZZY_SEARCH'||obj.searchType=='EXACT_FUZZY_SEARCH')){
                             extendArr.push(obj);
                             }*/

                        }

                        var data = {};
                        data.listColModel = colModel;
                        data.generalArr = generalArr;
                        data.exactArr = exactArr;
                        data.fuzzyArr = fuzzyArr;

                        def.resolve(data);
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

        defObjs.attrArrayDef = def.promise();
        return defObjs;
    }
    var defObjs = initContentRowAttr();


    /**
     * 初始化新闻/知识列表
     */
    function initContentRowTypeGrid() {
        $.when(defObjs.attrArrayDef).done(function (data) {
            if(data){
                var colModel = data.listColModel;
                $.xljUtils.initJqGrid({
                    gridSelecter:"#contentRowGrid",
                    url: serviceUrl + "oa/content/contentRowType/page",
                    ajaxGridOptions: {contentType: 'application/json'},
                    mtype: "post",
                    datatype: "json",
                    postData: {
                        "contentTypeId": urlParams.contentTypeId,
                        'groupByFields': JSON.stringify(['relationId', 'status']),
                        'sortFields': JSON.stringify({'stick': 'desc','newsCustomStatus':'ASC','publishDate': 'desc'}),
                        'contentType':urlParams.contentType,
                        'status':'PUBLISHED',
                        "loadinit":"true"
                    },  // 'havingFields':JSON.stringify({'status':'PUBLISHED'}),
                    jsonReader: {
                        root:function (data) {
                            var rows = data.rows;
                            for(var j in rows ){
                                for(var i in rows[j]){
                                    //   rows[j][i] = $.xljUtils.escapeHtml(rows[j][i]);
                                    rows[j][i] = rows[j][i]?$.xljUtils.htmlEncode(rows[j][i]):'';
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
                        if (urlParams.contentType == 'NEWS') { //跳转新闻静态页面
                            if (rowData.status == 'DRAFT') {
                                //window.open("contentRowType_news_edit.html?ids=" + id + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                                if(!checkDataAuthEdit(id)){
                                    $.xljUtils.tip("blue","数据权限不足！");
                                    return;
                                }
                                window.open("contentRowType_news_edit.html?id=" + id + "&oper=edit");
                            } else {
                                window.open("contentRowType_staticPage.html?id=" + id );
                            }
                        } else if (urlParams.contentType == 'DOCUMENT') { //跳转文档明细页
                            if (rowData.status == 'DRAFT') {
                                if(!checkDataAuthEdit(id)){
                                    $.xljUtils.tip("blue","数据权限不足！");
                                    return;
                                }
                                window.open("contentRowType_doc_edit.html?ids=" + id + "&oper=edit&contentTypeId=" + urlParams.contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                            } else {
                                window.open("contentRowType_doc_view.html?id=" + id);
                            }
                        }
                    },
                    onCellSelect: function () {
                        /*if (rowDataBefore != null && rowDataBefore != 'undefined') {
                         //重新选择行时清除上一次选中行的样式
                         $('#contentRowGrid ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                         }*/
                    },
                    onSelectRow: function (rowId,status) {

                        $('#contentRowGrid').data('currentSelRowId',rowId);
                        var rowData = $('#contentRowGrid').jqGrid('getRowData', rowId);
                        //   status:草稿：DRAFT、审批中：APPROVALING、已审批未发布：APPROVED、已发布：PUBLISHED、作废：INVALID
                        if (rowData.status == 'APPROVED' || rowData.status == 'PUBLISHED') {
                            $('#updateBtn').text('修订');
                        } else {
                            $('#updateBtn').text('修改');
                        }
                    },
                    gridComplete:function () {
                        var currentSelRowId = $('#contentRowGrid').data('currentSelRowId');
                        $('#contentRowGrid').jqGrid('setSelection',currentSelRowId);
                        var  postData = $("#contentRowGrid").jqGrid('getGridParam','postData');
                        if(!postData.loadState){//更新操作不重宽高
                            $.xljUtils.resizeNestedGrid();
                        }
                        $.xljUtils.addGridScroll();
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
                        } else {
                            //success
                        }
                        $.xljUtils.resizeNestedGrid();
                    }
                });
            }
            //$.xljUtils.resizeNestedGrid();
        });
    }
    initContentRowTypeGrid();


    /**
     * 加载左侧知识目录树
     */
    function initContentChildTree() {
        $.ajax({
            type: "POST",
            url: serviceUrl + 'oa/content/contentChild/queryTreeList?time=' + Math.random(),
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({delflag: false,contentTypeId:urlParams.contentTypeId,contentType:urlParams.contentType}),
            success: function (typeNodes) {
                var zNodes = typeNodes.result;
                if (zNodes == null || zNodes.length == 0) {
                    return;
                }
                $("#contentTitle").html( zNodes[0].name);

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
                    callback: {
                        onClick: function (event,treeId,treeNode,clickFlag) {
                            var  postData = $("#contentRowGrid").jqGrid('getGridParam','postData');
                            if(postData != undefined){
                                delete postData['extendAttarFields'];
                            }
                            if(postData != undefined){
                                delete postData['fuzzyQueryFields'];
                            }

                            if(!postData) {
                                postData = {};
                            }
                            /*for(var item in postData) {
                             delete postData[item];
                             }*/

                            if(treeNode.contentChildId){
                                var childeNodeIds = new Array();
                                var nodeList = $.fn.zTree.getZTreeObj(treeId).transformToArray(treeNode);

                                for(var i = 0, len = nodeList.length;i<len;i++) {
                                    var childNodeId = nodeList[i].id;
                                    if(childNodeId){
                                        childeNodeIds.push(childNodeId);
                                    }
                                }

                                if(childeNodeIds.length > 0){
                                    postData.contentChildId = childeNodeIds.join(',');
                                }else{
                                    postData.contentChildId = null;
                                }
                            }else{
                                delete postData['contentChildId'];
                            }
                            postData.contentTypeId = treeNode.contentTypeId;
                            postData.loadState = "tree_click";
                            $("#contentRowGrid").jqGrid('setGridParam', {
                                postData: postData,
                                page:1
                            }).trigger('reloadGrid');
                        },
                        onExpand:function (event, treeId, treeNode) {
                            $.xljUtils.treeResizeFn();
                        },
                        onCollapse: function(){
                            $.xljUtils.treeResizeFn();
                        }
                    }

                };

                $.fn.zTree.init($("#contentTree"), setting, zNodes);
                var zTreeObj = $.fn.zTree.getZTreeObj('contentTree');
                var nodes = zTreeObj.getNodes();
                //默认展开第一个节点
                zTreeObj.expandNode(nodes[0], true, false, false, false);
                zTreeObj.selectNode(nodes[0]);
                zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                setTimeout(function(){
                    $.xljUtils.addTreeScroll();
                    $.xljUtils.treeResizeFn();
                },300);
            }
        });
    }
    initContentChildTree();

    /**
     * 初始化查询条件表单
     */
    function initSearchForm() {
        $.when(defObjs.attrArrayDef).done(function (data) {
            if(data){
                var generalArr = data.generalArr;
                var exactArr = data.exactArr;

                var fuzzyArr = data.fuzzyArr;

                createForm(generalArr,'.generalSearchTab');
                createForm(exactArr,'.exactSearchTab');
                //处理模糊查询
                var fuzzyFieldNames = [];
                var fuzzyFieldCodes = [];
                //定义扩展字段的模糊集合
                var fuzzyExtendFieldCodes = [];
                for (var i = 0; i < fuzzyArr.length; i++) {
                    var obj = fuzzyArr[i];
                    fuzzyFieldNames.push(obj.fieldName);
                    if(obj.isExtendedField == true){
                        fuzzyExtendFieldCodes.push(obj.fieldCode);
                    }else{
                        fuzzyFieldCodes.push(obj.fieldCode);
                    }
                }

                $('body').data('fuzzyFieldCodes',fuzzyFieldCodes);
                $('body').data('fuzzyExtendFieldCodes',fuzzyExtendFieldCodes);
                // $('#keywords').attr('placeholder',fuzzyFieldNames.join('/'));
                // $('#keywords').attr('onmouseover','this.title=this.value');
                $('#keywords').attr('data-temp-placeholder', fuzzyFieldNames.join('/'));
                $("#keywords").inputPlaceholder();
                $.xljUtils.resizeNestedGrid();
            }
        });
    }
    initSearchForm();

    /**
     * 动态创建表单属性
     */
    function createForm(resultList, tableSelector) {
        var table = $(tableSelector);
        var tbodyObj = $('<tbody></tbody>');
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
                var isExtendedField = attr.isExtendedField;//是否是扩展属性

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
                    //table.append(tempRow);
                    tbodyObj.append(tempRow);
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
                            if(isExtendedField == true){
                                inputObj.attr('extendAttar', "1");
                            }
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
                        textInputObj = $('<select class="form-control" onmouseover="this.title=this.options[this.selectedIndex].text"></select>');
                        textInputObj.attr('name', fieldCode);
                        textInputObj.attr('id', fieldCode);
                        if(isExtendedField == true){
                            textInputObj.attr('extendAttar', "1");
                        }
                        textInputObj.append('<option value="">全部</option>');
                        $.each(enumList, function (i, item) {
                            var optionObj = $('<option value="' + $.xljUtils.htmlEncode(item.val) + '">' + $.xljUtils.htmlEncode(item.name) + '</option>');
                            textInputObj.append(optionObj);
                        });
                        labelObj.append(fieldName + ' : ');
                        break;
                    case 'checkbox':
                        labelObj = $('<label></label>');
                        var enumList = enumPropertiesResult(fieldCode);
                        var count = 0;
                        var textInputObjHtml = '';
                        $.each(enumList, function (i, item) {
                            /*	var inputObj =$('<input type="checkbox" name="'+fieldCode+'" id="'+fieldCode+count+'" value="'+item.val+'">');*/
                            var inputLabelObj = null;
                            if(isExtendedField == true){
                                inputLabelObj ='<input type="checkbox" extendAttar="1" name="'+fieldCode+'" id="'+fieldCode+count+'" value="'+item.val+'"><label >'+item.name+'</label>';
                            }else{
                                inputLabelObj ='<input type="checkbox" name="'+fieldCode+'" id="'+fieldCode+count+'" value="'+item.val+'"><label >'+item.name+'</label>';
                            }
                            /*     inputObj.attr('name', fieldCode);
                             inputObj.attr('id', fieldCode + count);
                             if(isExtendedField == true){
                             inputObj.attr('extendAttar', "1");
                             }
                             inputObj.val(item.val);*/
                            /*    inputLabelObj.append(inputObj);*/
                            textInputObjHtml += inputLabelObj;
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
                        if(isExtendedField == true){
                            //扩展属性添加扩展属性标志
                            textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                                + "<input onmouseover='this.title=this.value' class='form-control' isVague='true' extendAttar='1' id='" + fieldCode + "_starttime' name='" + fieldCode + "_starttime' size='16' type='text'   readonly>"
                                //+ "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                                + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                                + "</div>");
                        }else{
                            textInputObj = $("<div class='input-group date form_datetime form-date'  data-date=''  data-date-format='dd MM yyyy - HH:ii p' data-link-field='dtp_input1'>"
                                + "<input onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "_starttime' name='" + fieldCode + "_starttime' size='16' type='text'   readonly>"
                                //+ "<span class='input-group-addon' ><span class='glyphicon glyphicon-remove' ></span></span>"
                                + "<span class='input-group-addon' ><span class='glyphicon glyphicon-th'></span></span>"
                                + "</div>");
                        }

                        labelObj.append(fieldName);
                        break;
                    case 'personselector':
                        labelObj = $('<label></label>');
                        if(isExtendedField == true){
                            //扩展属性添加扩展属性标志
                            textInputObj = $("<div class='input-group form-date resetwidth'><input type='text' extendAttar='1' onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "'  name='" + fieldCode + "' readonly='readonly'/></div>");
                        }else{
                            textInputObj = $("<div class='input-group form-date resetwidth'><input type='text'  onmouseover='this.title=this.value' class='form-control' id='" + fieldCode + "'  name='" + fieldCode + "' readonly='readonly'/></div>");
                        }


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
                        if(isExtendedField == true){
                            //扩展属性添加扩展属性标志
                            textInputObj = $('<div class="input-group form-date resetwidth"><input type="text" extendAttar="1" onmouseover="this.title=this.value" class="form-control" id="' + fieldCode + '"  name="' + fieldCode + '" readonly="readonly"/></div>');
                        }else{
                            textInputObj = $('<div class="input-group form-date resetwidth"><input type="text" onmouseover="this.title=this.value" class="form-control" id="' + fieldCode + '"  name="' + fieldCode + '" readonly="readonly"/></div>');
                        }

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

                        var orgFilter=getOrgType(fieldCode);
                        $(inputAddonFa).xljSingleSelector( {
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
                        textInputObj = $('<textarea isVague="true" class="form-control"></textarea>');
                        labelObj.append(fieldName);
                        textInputObj.attr('id', fieldCode);
                        textInputObj.attr('name', fieldCode);
                        if(isExtendedField == true){
                            textInputObj.attr('extendAttar', "1");
                        }
                        break;
                    default:
                        if (fieldCode == 'contentChildName') {
                            labelObj = $('<label></label>');
                            var enumList = selectContentChildList();
                            var count = 0;
                            textInputObj = $('<select class="form-control" onmouseover="this.title=this.options[this.selectedIndex].text" ></select>');
                            textInputObj.attr('name', fieldCode);
                            textInputObj.attr('id', fieldCode);
                            if(isExtendedField == true){
                                textInputObj.attr('extendAttar', "1");
                            }
                            textInputObj.append('<option value="" selected>请选择</option>');
                            $.each(enumList, function (i, item) {
                                var optionObj = $('<option value="' + $.xljUtils.htmlEncode(item.id) + '">' + $.xljUtils.htmlEncode(item.name) + '</option>');
                                textInputObj.append(optionObj);
                            });
                            labelObj.append(fieldName + ' : ');
                        } else {
                            labelObj = $('<label></label>');
                            textInputObj = $('<input type="text" isVague="true" onmouseover="this.title=this.value" class="form-control">');
                            labelObj.append(fieldName);
                            textInputObj.attr('id', fieldCode);
                            textInputObj.attr('name', fieldCode);
                            if(isExtendedField == true){
                                textInputObj.attr('extendAttar', "1");
                            }

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
                if (rowTds.length >= 6 && tableSelector == '.generalSearchTab') {
                    tempRow = undefined;
                } else if (rowTds.length >= 6 && tableSelector == '.exactSearchTab') {
                    tempRow = undefined;
                }
            }
        }


        //最后一行如果为两列，则再添加两列，补充为一行四列
        var lastTrObj = tbodyObj.find("tr:last");
        var lastTrTds = lastTrObj.find('td');

        table.append(tbodyObj);

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


        //展开/收起查询区域
        $('#collapseSearchSpan').unbind('click').on('click',function () {
            //$('#searchFormContainer').fadeToggle();
            if($('#searchFormContainer').is(':visible')){
                $('#searchFormContainer').hide();
                $(this).removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $('#searchFormContainer').show();
                $(this).removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $.xljUtils.resizeNestedGrid();
        });

        //展开/收起高级查询区域
        $('#advanceSearchBtn').unbind('click').on('click',function () {
            //$('#exactSearchContainer').fadeToggle();
            //if($('#searchFormContainer').is(':visible')){

            if($(this).find('i').hasClass('fa-angle-down')){
                $('#exactSearchContainer').hide();
                $(this).find('span').text('高级查询');
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $('#exactSearchContainer').show();
                $(this).find('span').text('收起');
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            //}
            $.xljUtils.resizeNestedGrid();
        });

        //重置按钮事件
        $('#resetFormBtn').unbind('click').on('click',function () {
            $('#searchForm')[0].reset();
        });

        //高级查询按钮事件
        $('#searchFormBtn').unbind('click').on('click',function () {

            var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');
            if(postDataObj != undefined){
                delete postDataObj['extendAttarFields'];
            }
            if(postDataObj ){
                if(postDataObj['fuzzyQueryFields'] != undefined){
                    var fuzzyQueryFieldsTem = JSON.parse(postDataObj['fuzzyQueryFields'])
                    for(var i in fuzzyQueryFieldsTem){
                        delete postDataObj[fuzzyQueryFieldsTem[i]];
                    }
                    delete postDataObj['fuzzyQueryFields'];
                }
            }

            var postData = {};
            var dateArr = [];
            postData.contentTypeId = postDataObj.contentTypeId;
            postData.contentChildId = postDataObj.contentChildId;
            postData.sortFields = postDataObj.sortFields;
            var extendAttarDATA = {};
            var fuzzyQueryFields = {};
            $('#searchForm input').each(function (index, item) {
                var name = item.name;
                if ($.trim(item.value) != '') {

                    if (name.indexOf('starttime') > -1 || name.indexOf('endtime') > -1) {
                        dateArr.push(name);
                    }
                    var extendAttar = $('#'+name+'').attr('extendattar')
                    var isVague = $('#'+name+'').attr('isVague')
                    if(extendAttar != "undefined" && extendAttar == '1'){
                        extendAttarDATA[item.name] = item.value;
                    }if(isVague != "undefined" && isVague){
                        fuzzyQueryFields[item.name] = item.value;
                    }else{
                        postData[item.name] = item.value;
                    }
                }else {
                    delete postData[item.name];
                }
                delete postDataObj[item.name];
            });
            $('input:checkbox:checked').each(function (index, item) {
                var name = item.name;
                if ($.trim(item.value) != '') {
                    var extendAttar = $('input[name='+name+']:checked').attr('extendattar');
                    if(extendAttar != "undefined" && extendAttar == '1'){
                        //extendAttarDATA[item.name] = item.value;

                        if(!extendAttarDATA[item.name]){
                            //jsonData[name] = value;
                            extendAttarDATA[item.name] = item.value;
                        }else{
                            extendAttarDATA[item.name] = extendAttarDATA[item.name] + "," + item.value;
                        }

                    }
                }else {
                    delete postData[item.name];
                }
                delete postDataObj[item.name];
            });
            $('input:radio:checked').each(function (index, item) {
                var name = item.name;
                if ($.trim(item.value) != '') {
                    var extendAttar = $('input[name='+name+']:checked').attr('extendattar');
                    if(extendAttar != "undefined" && extendAttar == '1'){
                        extendAttarDATA[item.name] = item.value;
                    }
                }else {
                    delete postData[item.name];
                }
                delete postDataObj[item.name];
            });

            $('#searchForm textarea').each(function (index, item) {
                var name = item.name;
                if ($.trim(item.value) != '') {
                    var extendAttar = $('#'+name+'').attr('extendattar')
                    var isVague = $('#'+name+'').attr('isVague')
                    if(extendAttar != "undefined" && extendAttar == '1'){
                        extendAttarDATA[item.name] = item.value;
                    }if(isVague != "undefined" && isVague){
                        fuzzyQueryFields[item.name] = item.value;
                    }else{
                        postData[item.name] = item.value;
                    }
                }else {
                    delete postData[item.name];
                }
                delete postDataObj[item.name];
            });
            if (dateArr.length > 0) {
                postData.dateFields = JSON.stringify(dateArr);
            }

            $('#searchForm select').each(function (index, item) {
                var name = item.name;
                if ($.trim(item.value) != '' && $.trim(item.value) != 'ALL') {

                    if (name.indexOf('contentChildName') > -1) {
                        postData.contentChildId = item.value;
                    } else{
                        var extendAttar = $(item).attr('extendattar');
                        if(extendAttar != "undefined" && extendAttar == '1'){
                            extendAttarDATA[item.name] = item.value;
                        }else{
                            postData[item.name] = item.value;
                        }
                    }
                }else{
                    if (name.indexOf('contentChildName') > -1) {
                        //postData.contentChildId = item.value;
                        delete postData['contentChildId'];
                    } else{
                        delete postData[item.name];
                    }

                }

                delete postDataObj[item.name];
            });

            if (JSON.stringify(extendAttarDATA) != "{}") {
                postData.extendAttarFields = JSON.stringify(extendAttarDATA);
            }
            delete postDataObj.dateFields;





            $("#contentRowGrid").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
            delete postData.extendAttarFields;
        });

        /**
         * 重置数据
         * @param resetBtn
         * @returns
         */
        function resetData(resetBtn){
            //重置按钮
            resetBtn.click(function () {
                /*$('.exactSearchTab input').each(function (index, item) {
                 item.value = '';
                 })*/
                $('#searchForm')[0].reset();
            });
        }

        /**
         * 高级查询
         * @param advancedQueryBtn
         * @returns
         */
        function searchData(searchBtn){
            //高级查询按钮
            searchBtn.click(function () {
                var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');

                if(postDataObj != undefined){
                    delete postDataObj['extendAttarFields'];
                }
                if(postDataObj != undefined){
                    delete postDataObj['fuzzyQueryFields'];
                }
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
                $("#contentRowGrid").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
            });
        }

        //动态添加时间事件
        /*$('.form_datetime').datetimepicker({
            startView: 2,
            minView: 2,
            maxView: 2,
            language: 'zh-CN',
            format: "yyyy-mm-dd",
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮

        });*/

        $('.form_datetime').find(':input').on('click',function () {
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd",
                errDealMode: -1
            });
        });
        $('.form_datetime').find(':input').siblings('.input-group-addon').on('click',function () {
            WdatePicker({
                el: $(this).siblings(':input')[0],
                dateFmt: "yyyy-MM-dd",
                errDealMode: -1
            });
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
     * 获取目录列表
     */
    function selectContentChildList() {
        var result = "";
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: serviceUrl + 'oa/content/contentChild/queryList',
            dataType: "json",
            data: JSON.stringify({contentTypeId: urlParams.contentTypeId}),
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
     * 绑定按钮事件
     */
    function bindButton() {
        $('#closeBtn').on('click',function () {
            window.open("","_self","");
            window.close();
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

                    if (rowData.status == 'PUBLISHED') {
                        $.xljUtils.tip('blue', "该数据已发布！");
                        return;
                    }
                    if (rowData.approvalProcess == "true") {
                        if (rowData.status == 'APPROVED') {
                            updateContentRowTypeState("publish", "APPROVED",rowData);
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
                        updateContentRowTypeState("publish", "UNAPPROVED",rowData);
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
                            updateContentRowTypeState("unPublish", "PUBLISHED",rowData);
                        }
                    } else {
                        updateContentRowTypeState("unPublish", "DRAFT",rowData);
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
                        updateContentRowTypeState("stick", hour,rowData);

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
                        $.xljUtils.tip('blue', "该数据还未进行过置顶！");
                        return;
                    }
                    updateContentRowTypeState("unStick", "CANCEL",rowData);
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
                    updateContentRowTypeState("up", "UP",rowData);
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
                    updateContentRowTypeState("down", "DOWN",rowData);
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
                    updateContentRowTypeState("collect", "COLLECT",rowData);
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
                var rowDataGrid = $('#contentRowGrid').jqGrid('getRowData', rowId);
                window._rowDataGrid = rowDataGrid;
                if (rowDataGrid.status != 'INVALID') {
                    $('#transBtn').xljSingleSelector({
                        title: '选择分类',//选择器标题，默认是'选择组织机构'
                        treeUrl: serviceUrl + "oa/content/contentChild/getContentChildTreeById/" + $.xljUtils.getUrlParam('contentType'),
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
                            updateContentRowTypeState("trans", selectData.id,window._rowDataGrid);

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
            if (urlParams.contentType == 'NEWS') {
                addNEWS(); //新增新闻
            } else if (urlParams.contentType == 'DOCUMENT') {
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
                if (urlParams.contentType == 'NEWS' && rowData.status != 'INVALID'&& rowData.status!='APPROVALING') { //修改新闻
                    //window.open("contentRowType_news_edit.html?ids=" + rowId + "&oper=edit&contentTypeId=" + contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
                    window.open("contentRowType_news_edit.html?id=" + rowId + "&oper=edit");
                } else if (urlParams.contentType == 'DOCUMENT' && rowData.status != 'INVALID' && rowData.status!='APPROVALING') {//修改文档
                    window.open("contentRowType_doc_edit.html?ids=" + rowId + "&oper=edit&contentTypeId=" + urlParams.contentTypeId + "&process=" + rowData.approvalProcess + "&businessObjectCode=" + rowData.businessObjectCode + "&status=" + rowData.status);
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

            if (urlParams.contentType == 'NEWS') {
                deleteNEWS(); //删除新闻
            } else if (urlParams.contentType == 'DOCUMENT') {
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
                    window.open(serviceUrl+'flow/runtime/query/batch_modify_reader.html');
                }else{
                    $.xljUtils.tip('blue', '数据未开始审批，无法修改可阅读人！');
                }
            }else{
                $.xljUtils.tip('blue', '请选择要操作的数据！');
            }


        });

        //模糊查询按钮
        $("#fuzzySearchBtn").click(function () {
            var postDataObj = $('#contentRowGrid').jqGrid('getGridParam', 'postData');

            if(postDataObj != undefined){
                delete postDataObj['extendAttarFields'];
            }
            if(postDataObj != undefined){
                delete postDataObj['fuzzyQueryFields'];
            }
            // console.log(postDataObj);
            // console.log(fuzzyArr);
            var postData = {};
            postData.contentTypeId = postDataObj.contentTypeId;
            postData.contentChildId = postDataObj.contentChildId;
            postData.sortFields = postDataObj.sortFields;
            var value = $('#keywords').getInputVal();
            var fuzzyArr = $('body').data('fuzzyFieldCodes');
            var fuzzyExtendArr = $('body').data('fuzzyExtendFieldCodes');
            var extendAttarDATA = {};
            for (var i in fuzzyArr) {
                if ($.trim(value) != '') {
                    postData[fuzzyArr[i]] = value;
                    postData.fuzzyQueryFields = JSON.stringify(fuzzyArr);
                }
                delete postDataObj[fuzzyArr[i]];
            }

            for (var i in fuzzyExtendArr) {
                if ($.trim(value) != '') {
                    extendAttarDATA[fuzzyExtendArr[i]] = value;
                }
                delete postDataObj[fuzzyExtendArr[i]];
            }
            if (JSON.stringify(extendAttarDATA) != "{}") {
                extendAttarDATA['FuzzyQuery'] = true;
                postData.extendAttarFields = JSON.stringify(extendAttarDATA);
            }

            $('#searchForm input').each(function (index, item) {
                delete postDataObj[item.name];
            });
            $('#searchForm select').each(function (index, item) {
                delete postDataObj[item.name];
            });
            delete postDataObj.fuzzyQueryFields;
            delete postDataObj.extendAttarFields;
            $("#contentRowGrid").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
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
                    window.open(serviceUrl+'flow/runtime/approve/flow.html?flCode='+rowData.flCode+'&businessId='+rowId+'&appId=OA&userId='+rowData.createPersonId);
                }else{
                    $.xljUtils.tip('blue', '数据未开始审批，无法查看审批！');
                }
            }else{
                $.xljUtils.tip('blue', '请选择要操作的数据！');
            }


        });
    }
    bindButton();

    /**
     *  检查数据修和删除权限
     */
    function checkDataAuthEdit(id){
        var dataAuth = false;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: serviceUrl + "oa/content/contentRowType/check/dataAuthEdit/"+id+"?_t="+new Date().getTime(),
            dataType: "json",
            data:JSON.stringify({contentType:urlParams.contentType,contentTypeId:urlParams.contentTypeId}),
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
     *  修改内容状态
     */
    function updateContentRowTypeState(state, param,rowData) {
        $.ajax({
            type: "put",
            contentType: "application/json",
            url: serviceUrl + "oa/content/contentRowType/updateState/" + rowData.id + "/" + $.xljUtils.htmlDecode(param)+ "/" + state ,
            dataType: "json",
            success: function (result) {
                if(result&&result.success){
                    var msg;
                    if(state=='publish'){
                        msg = "发布成功！";
                        $.xljUtils.tip('green',msg);
                    }else if(state=='stick'){
                        msg = "置顶成功！";
                        $.xljUtils.tip('green',msg);
                    }
                    $("#contentRowGrid").jqGrid('setGridParam', {postData: {"contentTypeId": rowData.contentTypeId,loadState:state}}).trigger('reloadGrid');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
    function loadGrid() {
        $("#contentRowGrid").jqGrid('setGridParam', {postData: {"contentTypeId": urlParams.contentTypeId}}).trigger('reloadGrid');
    }

    /**
     * 新增新闻
     */
    function addNEWS() {
        var zTreeObj = $.fn.zTree.getZTreeObj('contentTree');
        var nodes = zTreeObj.getSelectedNodes();
        var zTreeNode = nodes[0];
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

        window.open("contentRowType_news_edit.html?contentTypeId=" + zTreeNode.contentTypeId + "&contentTypeName=" + encodeURIComponent(pNode.name) + "&contentTypeCode=" + encodeURIComponent(pNode.code) + "&contentChildId=" + zTreeNode.contentChildId + "&contentChildName=" + encodeURIComponent(zTreeNode.name) + "&contentChildCode=" + encodeURIComponent(zTreeNode.code) + "&oper=add&process=" + pNode.approvalProcess + "&businessObjectCode=" + encodeURIComponent(pNode.businessObject) + "&status=DRAFT");
    }

    /**
     * 新增文档
     */
    function addDoc() {
        var zTreeObj = $.fn.zTree.getZTreeObj('contentTree');
        var nodes = zTreeObj.getSelectedNodes();
        var zTreeNode = nodes[0];
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

        window.open("contentRowType_doc_edit.html?contentTypeId=" + zTreeNode.contentTypeId + "&contentTypeName=" + encodeURIComponent(pNode.name) + "&contentTypeCode=" + encodeURIComponent(pNode.code) + "&contentChildId=" + zTreeNode.id + "&contentChildName=" + encodeURIComponent(zTreeNode.name) + "&contentChildCode=" + encodeURIComponent(zTreeNode.code) + "&oper=add&process=" + pNode.approvalProcess + "&businessObjectCode=" + encodeURIComponent(pNode.businessObject) + "&status=DRAFT");
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
                    url: serviceUrl + "oa/content/contentRowType/deleteAll/" + ids + "/news",
                    dataType: "json",
                    success: function (result) {
                        if(result&&result.success){
                            $.xljUtils.tip('green','数据删除成功！');
                            resetCurrentRowIdForDel(ids,'contentRowGrid');
                        }else{
                            $.xljUtils.tip('red','数据删除失败！');
                        }
                    },
                    error:function (xhr) {
                        $.xljUtils.tip('red','数据删除失败！');
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
                    url: serviceUrl + "oa/content/contentRowType/deleteAll/" + ids + "/knowledge",
                    dataType: "json",
                    success: function (result) {
                        if(result&&result.success) {
                            $.xljUtils.tip('green','数据删除成功！');
                            resetCurrentRowIdForDel(ids,'contentRowGrid');
                        }else{
                            $.xljUtils.tip('red','数据删除失败！');
                        }

                    },
                    error:function (xhr) {
                        $.xljUtils.tip('red','数据删除失败！');
                    }
                });

                $.ajax({
                    type: "delete",
                    url: serviceUrl + "univ/attachment/attachment/deleteBatch/" + ids,
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
     * 重新加载grid数据
     * @param selIds
     * @param tableId
     */
    function resetCurrentRowIdForDel(selIds,tableId) {
        var rowIndex;
        for (var i = 0; i < selIds.length; i++) {
            var tempRowIndex = $('#'+tableId).jqGrid('getInd',selIds[i]);
            if(!rowIndex) {
                rowIndex = tempRowIndex;
            }else if(rowIndex&&tempRowIndex<rowIndex){
                rowIndex = tempRowIndex;
            }
        }
        if(rowIndex&&(rowIndex-1)>0){
            $('#'+tableId).data('currentSelRowId',$('#contentRowGrid')[0].rows[rowIndex-1].id);
        }
        $('#contentRowGrid').jqGrid('setGridParam', {postData: {loadState:'delete'}}).trigger('reloadGrid');
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

    //重新加载grid
    window.reloadGrid = function(rowId, tableId){
        if(rowId){
            $('#'+tableId).data('currentSelRowId',rowId);
        }

        $('#'+tableId).jqGrid().trigger('reloadGrid');
    };

    /**
     * 获取顶级知识大类节点
     * @param childNode
     * @returns {*}
     */
    function getContentTypeNode(childNode) {
        var pNode = childNode.getParentNode();
        if(!pNode||pNode==null){
            return childNode;
        }
        childNode = getContentTypeNode(pNode);
        return childNode;
    }

    //计算高度
    function resizeTreeHeight() {
        var headerHeight = 0;
        if($('header').is(":visible") ){
            headerHeight = 70;
        }
        var height = window.innerHeight;//$(window).height()
        if(!window.innerHeight){
            height = Math.max(document.body.clientHeight,document.documentElement.clientHeight);
        }
        $('.ztree-box').height(height-$('.org-title').outerHeight()-$('.searchBox:visible').outerHeight()-38-headerHeight);
    }
    resizeTreeHeight();

    $(window).resize(function () {
        resizeTreeHeight();
        $.xljUtils.resizeNestedGrid();
    });

});
