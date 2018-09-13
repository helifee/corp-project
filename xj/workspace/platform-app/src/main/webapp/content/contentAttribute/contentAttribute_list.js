/**author:wangpw
 * update by dgh on 2017/05/16
 * 窗体加载数据列表
 */
$(function () {
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);
    //属性表单类型
    var formTypeEnum = {
        text:'文本',
        textarea:'文本域',
        hidden:'隐藏域',
        file:'文件',
        radio:'单选框',
        checkbox:'复选框',
        select:'下拉框',
        date:'日期',
        personselector:'人员选择器',
        orgselector:'组织机构选择器'
    };
    /**
     * 初始化属性列表
     * @param contentTypeId
     */
    function initAttributeGqGrid(contentTypeId) {
        //定义JSON串
        var contentChirlDto = {};
        //设置大类ID
        contentChirlDto['contentTypeId'] = contentTypeId;
        //请求数据
        jQuery("#contentTypeAttrGrid").jqGrid({
            url: baseUrl + "oa/content/contentRowAttribute/page",
            ajaxGridOptions: {contentType: 'application/json'},
            postData: {'contentTypeId': contentTypeId,'sortFields':JSON.stringify({"sortNum":"asc"})},
            mtype: "post",
            datatype: "json",
            jsonReader: {
                repeatitems: false
            },
            colModel: [
                {name: 'id', label: 'id', width: 75, align: "center", hidden: true},
                {name: 'contentTypeId', label: '大类ID', width: 75, align: "center", hidden: true},
                {name: 'fieldName', label: '字段名称', width: 90, align: "center"},
                {name: 'fieldCode', label: '编码', align: "center", width: 55},
                {name: 'formType', label: '字段类型', width: 100, align: "center",
                    formatter:function (v,opt,rec) {
                        return formTypeEnum[v];
                    },
                    unformatter:function (v,opt,rec) {
                        for (var item in formTypeEnum){
                            if(v==formTypeEnum[item]){
                                return item;
                            }
                        }
                    }
                },
                {name: 'viewName', label: '显示名称', width: 80, align: "center"},
                {name: 'isUsing', label: '是否启用', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v) return "<font color='red'>否</font>";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                { name: 'processVariable', label: '用于流程分支', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v ) return "否";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                {name: 'isRequired', label: '是否必填', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v ) return "否";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                {name: 'isListView', label: '列表显示', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v ) return "否";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                {name: 'isFormView', label: '表单显示', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v ) return "否";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                {name: 'isReadonly', label: '只读', width: 80, align: "center",
                    formatter: function (v, opt, rec) {
                        if (!v ) return "否";
                        return "是";
                    },
                    unformat: function (v) {
                        if (v == '否') return false;
                        return true;
                    }
                },
                {name: 'sortNum', label: '显示位置', width: 80, sortable: true, align: "center"},
                {name: 'isExtendedField', label: 'isExtendedField', width: 75, align: "center", hidden: true}
            ],
            viewrecords: true,
            rownumbers: true,
            sortorder: "asc",
            multiboxonly: true,
            multiselect: true,
            height: 'auto',
            caption: "",
            autowidth: true,
            rowNum: 20,//一页显示多少条
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: '#pagered',//表格页脚的占位符(一般是div)的id
            ondblClickRow: function (rowid,iRow,iCol,e) {
                window.open('contentAttribute_edit.html?act=update&id='+rowid);
            },
            loadComplete: function (xhr) {
                console.info(xhr);
            },
            gridComplete: function (xhr) {
                var currentSelRowId = $('#contentTypeAttrGrid').data('currentSelRowId');
                $('#contentTypeAttrGrid').jqGrid('setSelection',currentSelRowId);
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();

            }
        });
    }
    initAttributeGqGrid(urlParam.contentTypeId);
    $.xljUtils.resizeNestedGrid();

    //新增属性
    $('#createBtn').on('click',function () {
        window.open('contentAttribute_edit.html?act=create&contentTypeId='+$('body').data('contentTypeId'));
    });

    //更新
    $('#updateBtn').on('click',function () {
        var ids = $('#contentTypeAttrGrid').jqGrid('getGridParam','selarrrow');
        if(ids.length==0) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }

        if(ids.length>1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        var id = $('#contentTypeAttrGrid').jqGrid('getGridParam','selrow');
        var rowData = $('#contentTypeAttrGrid').jqGrid('getRowData',id);
       /* if(rowData.isExtendedField&&rowData.isExtendedField=='false'){
            $.xljUtils.tip('blue', "系统内置属性，不可更改！");
            return;
        }*/
        window.open('contentAttribute_edit.html?act=update&id='+id);
    });

    //删除
    $('#deleteBtn').on('click',function () {
        var ids = $('#contentTypeAttrGrid').jqGrid('getGridParam','selarrrow');
        if(ids.length==0) {
            $.xljUtils.tip('blue', "请选择需要删除的数据！");
            return;
        }

        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var rowData = $('#contentTypeAttrGrid').jqGrid('getRowData',id);
            if(rowData.isExtendedField&&rowData.isExtendedField=='false'){
                $.xljUtils.tip('blue', '属性【'+rowData.fieldName+'】为内置属性，不可删除！');
                return ;
            }
        }

        $.xljUtils.confirm('blue','确定要删除这'+ids.length+'条数据吗？',function () {
            $.ajax({
                url:hostUrl+'oa/content/contentRowAttribute/deleteBatch/'+ids,
                type:'DELETE',
                dataType:'JSON',
                success:function (resultData) {
                    if (resultData && resultData.success) {
                        $.xljUtils.tip('green', "数据删除成功！");
                        $('#contentTypeAttrGrid').jqGrid().trigger("reloadGrid");
                    } else {
                        $.xljUtils.tip('red', "删除数据失败！");
                    }
                }
            });
        },true);

    });

    //停用
    $('#forbiddenBtn').on('click',function () {
        udpateAttrStatus(false);
    });

    //启用
    $('#startBtn').on('click',function () {
        udpateAttrStatus(true);
    });

    //关闭窗口
    $('#closeWinBtn').on('click',function () {
        window.close();
    });

    //上移
    $('#upMoveBtn').on('click',function () {
        sortContentAttr('UP');
    });

    //上移
    $('#downMoveBtn').on('click',function () {
        sortContentAttr('DOWN');
    });

    /**
     * 启用/停用属性
     * @param isUsing
     */
    function udpateAttrStatus(isUsing) {
        var ids = $('#contentTypeAttrGrid').jqGrid('getGridParam','selarrrow');
        if(ids.length==0) {
            $.xljUtils.tip('blue','请选择需要'+(isUsing?'启用':'停用')+'的数据项！');
            return;
        }

        var formDataArr = [];
        for (var i = 0; i < ids.length; i++) {
            var formData = {};
            var id = ids[i];
            formData.id = id;
            formData.isUsing = isUsing;
            formDataArr.push(formData);
        }
        $.ajax({
            type: 'PUT',
            contentType: "application/json",
            url: baseUrl + "oa/content/contentRowAttribute/updateBatchAttribute/" + ids.join(','),
            data: JSON.stringify({attrList:formDataArr}),
            dataType: "JSON",
            success: function (resultData) {
                if (resultData && resultData.success) {
                    $.xljUtils.tip('green', (isUsing?'启用':'停用')+'成功！');

                    var ids = $('#contentTypeAttrGrid').jqGrid('getGridParam','selarrrow');
                    $('#contentTypeAttrGrid').jqGrid().trigger("reloadGrid");
                    setTimeout(function () {
                        for (var i = 0; i < ids.length; i++) {
                            var id = ids[i];
                            $('#contentTypeAttrGrid').jqGrid('setSelection',id);
                        }
                    },500);


                } else {
                    $.xljUtils.tip('red', (isUsing?'启用':'停用')+'失败！');
                }
            }
        });
    }

    //模糊查询input事件
    $('#searchInput').bind('keyup',function (event) {
        var value = $(this).val();
        fuzzySerach(value);

    });

    //模糊查询按钮事件
    $('#searchBtn').on('click',function () {
        var value = $('#searchInput').val();
        fuzzySerach(value);
    });

    /**
     * 模糊查询
     * @param value
     */
    function fuzzySerach(value) {
        var postDataObj =  $('#contentTypeAttrGrid').jqGrid('getGridParam','postData');
        var postData = {};
        postData.contentTypeId = postDataObj.contentTypeId;
        postData.sortFields = postDataObj.sortFields;
        if(value!=''){
            postData.fieldName = value;
            postData.fieldCode = value;
            postData.fuzzyQueryFields = JSON.stringify(['fieldName','fieldCode']);
        }


        delete postDataObj.contentTypeId;
        delete postDataObj.sortFields;
        delete postDataObj.fieldName;
        delete postDataObj.fieldCode;
        delete postDataObj.fuzzyQueryFields;

        $('#contentTypeAttrGrid').jqGrid('setGridParam',{
            postData: postData,
            page:1
        }).trigger("reloadGrid");
    }

    /**
     * 排序
     */
    function sortContentAttr(sortType) {
        var ids = $('#contentTypeAttrGrid').jqGrid('getGridParam','selarrrow');
        if(ids.length==0) {
            $.xljUtils.tip('blue', "请选择一条需要排序的数据！");
            return;
        }

        if(ids.length>1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行排序！");
            return;
        }

        //获取选中行id
        var id = $('#contentTypeAttrGrid').jqGrid('getGridParam','selrow');
        //获取选中行数据
        var rowData = $('#contentTypeAttrGrid').jqGrid('getRowData',id);
        if(rowData.isExtendedField&&rowData.isExtendedField=='false'){
            $.xljUtils.tip('blue', "系统内置属性，不可更改排序！");
            return;
        }

        //更新排序
        $.ajax({
            type: 'PUT',
            contentType: "application/json",
            url: hostUrl + 'oa/content/contentRowAttribute/sortAttr/id',
            data: JSON.stringify({id:id,sortType:sortType}),
            dataType: "JSON",
            success: function (result) {
                if(result&&result.success){
                    reloadContentTypeAttrGrid(id);
                    $.xljUtils.tip('blue','排序成功！');
                }else {
                    $.xljUtils.tip('red', result.msg);
                }

            }
        });


    }
});

/**
 * 重新加载grid
 */
function reloadContentTypeAttrGrid(id) {
    if(id){
        $('#contentTypeAttrGrid').data('currentSelRowId',id);
    }
    $('#contentTypeAttrGrid').jqGrid().trigger('reloadGrid');
}