/**
 * author:udpate by dgh
 *
 */
$(function () {
    //搜索回车事件
    $('#searchInput').on('keypress', function (e) {
        //var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        //if (eCode == 13) {
            fuzzyQuery();
        //}
    });

    $('#searchBtn').on('click',function () {
       fuzzyQuery();
    });

    /**
     * 模糊条件查询
     */
    function fuzzyQuery() {
        var searchInputVal = $("#searchInput").val();
        var queryDataObj =  $('#contentTypeGrid').jqGrid('getGridParam','postData');
        var queryData = {};
        queryData.sortFields = queryDataObj.sortFields;
        if(searchInputVal!='') {
            queryData.code = searchInputVal;
            queryData.name = searchInputVal;
            queryData.fuzzyQueryFields = JSON.stringify(['name','code']);
        }

        delete queryDataObj.code;
        delete queryDataObj.name;
        delete queryDataObj.fuzzyQueryFields;
        delete queryDataObj.sortFields;

        jQuery("#contentTypeGrid").jqGrid('setGridParam', {postData: queryData,page:1}).trigger('reloadGrid');
    }

    /**
     * 初始化知识大类列表
     */
    function initContentTypeGrid() {
        jQuery("#contentTypeGrid").jqGrid({
                url: serviceUrl + "oa/content/contentType/page",
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "post",
                datatype: "json",
                jsonReader: {
                    repeatitems: false
                },
                postData:{'sortFields':JSON.stringify({"contentType":"desc","code":'asc'})},
                colNames: ['Inv No', '名称', '编码', '文档类型','新闻类型','启用审批'],
                colModel: [
                    {name: 'id', label: 'id', width: 75, align: "center", hidden: true},
                    {name: 'name', label: '名称', width: 75, align: "center",formatter:function(name){
                    	return  $.xljUtils.htmlEncode(name);
                    },sortable: false},
                    {name: 'code', label: '编码', align: "center", width: 55, sortable: false,formatter:function(code){
                    	return  $.xljUtils.htmlEncode(code);
                    }},
                    {name: 'contentType', label: '文档类型', width: 90, align: "center", sortable: false,
                        formatter: function (v, opt, rec) {
                            if (v == 'NEWS') return "新闻";
                            return "文档";
                        }, unformat: function (v) {
                            if (v == '新闻') return 'NEWS';
                            return 'DOCUMENT';
                        }
                    },
                    {name: 'newsType', label: '新闻类型', width: 100, align: "center", sortable: false,
                        formatter: function (v, opt, rec) {
                            if (v == 'PIC_NEWS') return "图片新闻";
                            if (v == 'DOC_NEWS') return "文字新闻";
                            return '';
                        }, unformat: function (v) {
                            if (v == '图片新闻') return 'PIC_NEWS';
                            if (v == '文字新闻') return 'DOC_NEWS';
                            return '';
                        }
                    },
                    {name: 'approvalProcess', label: '启用审批', width: 100, align: "center", sortable: false,
                        formatter: function (v, opt, rec) {
                            if (!v  ) return "否";
                            return "是";
                        },
                        unformat: function (v) {
                            if (v == '否') return false;
                            return true;
                        }
                    }
                ],
                viewrecords: true,
                rownumbers: true,
                multiboxonly: true,
                multiselect: true,
                caption: "",
                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pagered',//表格页脚的占位符(一般是div)的id
                editurl: "",
                autowidth: true,
                gridComplete: function (xhr) {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    //高亮显示默认选中行
                },
                loadComplete:function (xhr) {
                  console.info(xhr);
                },
                ondblClickRow: function (id) {
                    clickOperationBtn('update');
                }
            }).navGrid('#pagered', {add: false, edit: false, del: false, search: false, refresh: false});
    }
    initContentTypeGrid();
    $.xljUtils.resizeNestedGrid();

    /**
     * 删除大类
     */
    function deleteContentType(ids) {
        var tipText = "确定要删除这" + ids.length + "条数据吗？";

        if (ids == "" || ids == null) {
            $.xljUtils.tip("blue", "请选择要删除的行！");
        } else {

            $.xljUtils.confirm("blue", tipText, function () {
                if (ids && ids != '') {
                    var delBusinessObject = deleteBusinessObject(ids);
                    if(delBusinessObject) {
                        $.ajax({
                            url: serviceUrl + "oa/content/contentType/deletePseudoAllObjectByIds/" + ids,
                            type: 'DELETE',
                            dataType: 'JSON',
                            success: function (resultData) {
                                if (resultData && resultData.success) {
                                    //deleteMenu(ids);
                                    $.xljUtils.tip('green', "数据删除成功！");
                                    jQuery("#contentTypeGrid").trigger('reloadGrid');
                                } else {
                                    $.xljUtils.tip('red', $.xljUtils.htmlEncode(resultData.msg));
                                }
                            }
                        });
                    }else{
                        $.xljUtils.tip('red','业务对象删除失败！');
                    }


                }
            }, true);
        }
    }

    /**
     * 删除业务对象
     */
    function deleteBusinessObject(ids) {
        var delBusinessObject = false;
        $.ajax({
            url: serviceUrl + "flow/businessObject/deletePseudoBatch/" + ids,
            type: 'DELETE',
            dataType: 'JSON',
            async: false,
            success: function (resultData) {
                var dataObj = resultData.result;
                if (resultData.success) {
                    delBusinessObject = true;
                }
            },
            error: function () {

            }
        });
        return delBusinessObject;
    }

    /**
     * 操作按钮点击事件调用方法
     * @param operationType 操作类型
     */
    function clickOperationBtn(operationType) {
        var defaultUrl = serviceUrl + "content/contentType/contentType_edit.html";
        var id = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selrow');
        var ids = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selarrrow');
        switch (operationType) {
            case 'create':
                window.open(defaultUrl + "?act=" + operationType);
                break;
            case 'update':
                if(ids.length>1) {
                    $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
                    return;
                }

                if(!id){
                    $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
                    return;
                }

                window.open(defaultUrl + "?contentTypeId=" + id + "&act=" + operationType);
                break;
            case 'delete':
                if(ids.length==0) {
                    $.xljUtils.tip('blue', "请选择需要删除的行！");
                    return;
                }
                deleteContentType(ids);
                break;
            case 'displayDataItem':
                if (id) {
                    window.open(serviceUrl + "content/contentAttribute/contentAttribute_list.html?contentTypeId=" + id);
                } else {
                    $.xljUtils.tip("blue", "请选择大类名称!");
                }
                break;
        }
        
    }

    //数据项显示
    $('#displayDataItemBtn').on('click',function () {
        clickOperationBtn('displayDataItem');
    });

    //删除知识大类
    $('#deleteBtn').on('click',function () {
        clickOperationBtn('delete');
    });

    //更新知识大类
    $('#updateBtn').on('click',function () {
        clickOperationBtn('update');
    });

    //新建知识大类
    $('#createBtn').on('click',function () {
        clickOperationBtn('create');
    });

    //流程模板
    $('#flowModelBtn').on('click',function () {
        var id = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selrow');
        var ids = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selarrrow');
        if(ids.length==0){
            $.xljUtils.tip('blue','请选择一条已启用审批的知识大类！');
            return;
        }

        if(ids.length>1){
            $.xljUtils.tip('blue','只能选择一条已启用审批的知识大类！');
            return;
        }

        var rowData = jQuery("#contentTypeGrid").jqGrid('getRowData',id);
        if(!rowData.approvalProcess){
            $.xljUtils.tip('blue','当前知识大类未启用审批，请选择一条已启用审批的知识大类！');
            return;
        }

        //查询该知识大类对应的业务对象
        var businessObject;
        $.ajax({
            type: 'GET',
            url: serviceUrl + "flow/businessObject/get/"+rowData.id + '?_t=' + new Date().getTime(),
            dataType: "JSON",
            async:false,
            success: function (resultData) {
                if (resultData&&resultData.success) {
                    var result = resultData.result;
                    if(result) {
                        businessObject = result;
                    }
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });

        var flTemplate;
        //判断业务对象是否存在
        if(businessObject) {

            //查询对应的默认流程模板
            $.ajax({
                type: 'GET',
                url: serviceUrl + "flow/fl/getDefaultFl/"+rowData.code + '?_t=' + new Date().getTime(),
                dataType: "JSON",
                async:false,
                success: function (resultData) {
                    if (resultData&&resultData.success) {
                        var result = resultData.result;
                        if(result) {
                            flTemplate = result;
                        }
                    }
                },
                error:function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });


            if(!flTemplate){
                window.open(serviceUrl+'flow/editor/fl_all.html?appId=9d6cba61c4b24a5699c339a49471a0e7&businessObjectId='+businessObject.id+'&businessObjectName='+encodeURIComponent(businessObject.name)+'&flStatus=2&isDefault=true');
            }else{
                window.open(serviceUrl+'flow/editor/fl_all.html?flId='+flTemplate.id+'&businessObjectId='+businessObject.id+'&flStatus=0');

            }
            return;
        }else{
            $.xljUtils.tip('red','当前知识大类没有查到对应的业务对象！');
        }

        /*//新建业务对象
        businessObject = saveContentTypeBusiObject(rowData);
        if(businessObject) {
            //更新知识大类中的存储的业务对象编码
            $.ajax({
                type: 'PUT',
                contentType: "application/json",
                url: serviceUrl + "oa/content/contentType/update/" + rowData.id,
                data: JSON.stringify({businessObject:businessObject.code}),
                dataType: "JSON",
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        $.xljUtils.tip('green', '流程业务对象保存成功！');

                    } else {
                        $.xljUtils.tip('red', '流程业务对象保存失败！');
                    }
                },
                error:function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });
            //查询对应的默认流程模板
            if(!flTemplate){
                window.open(serviceUrl+'flow/editor/fl_new.html?appId=9d6cba61c4b24a5699c339a49471a0e7&businessObjectId='+businessObject.id+'&businessObjectName='+encodeURIComponent(businessObject.name));
            }
            return;
        }*/
    });

    /**
     * 保存流程业务对象
     * @param rowData
     * @returns 保存后的业务对象
     */
    function saveContentTypeBusiObject(rowData) {
        //流程业务对象
        var processBusinessObject = {};
        processBusinessObject.variableList = [];
        //查询此大类下的用于审批字段
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: serviceUrl + "oa/content/contentRowAttribute/queryList",
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
        //保存业务对象
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: serviceUrl + "flow/businessObject/saveObjectAndVariableData",
            data: JSON.stringify(processBusinessObject),
            dataType: "JSON",
            async:false,
            success: function (resultData) {
                if (resultData&&resultData.success) {
                    businessObject = resultData.result;
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });

        return businessObject;
    }

    //功能授权
    $('#funcAuthBtn').on('click',function () {
        //sysManager/authority/authFun_list.html
        var id = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selrow');
        var ids = jQuery("#contentTypeGrid").jqGrid('getGridParam', 'selarrrow');
        if(ids.length>1) {
            $.xljUtils.tip('blue','只能选择一个大类进行功能授权！');
            return;
        }
        if(ids.length==0){
            $.xljUtils.tip('blue','请选择一个大类进行功能授权！');
            return;
        }
        window.open(serviceUrl+'sysManager/authority/authFun_list.html?menuId='+id);
    });


});

//重新
function reloadContentTypeGrid(rowId) {
    $('#contentTypeGrid').jqGrid().trigger("reloadGrid");
    setTimeout(function () {
        if(rowId){
            $('#contentTypeGrid').jqGrid('setSelection',rowId);
        }
    },1500);

}