/**
 * update by dgh on 2017/05/16
 */
$(function () {

    /**
     * 初始化左侧树容器大小
     */
    function initTreeContainer() {
        $('.ztree-box').height($(window).height()-$('.org-title').outerHeight()-48);
    }
    initTreeContainer();
    $(window).on('resize',function () {
        initTreeContainer();
    });

    /**
     * 根据知识目录或知识大类初始化目录列表
     */
    function initContentChildGrid(parentId) {
        var postData = {delflag: false, 'parentId': parentId};
        var url = serviceUrl + 'oa/content/contentChild/queryList';
        $.xljUtils.initJqGrid({
            gridSelecter:"#listContentChild",
            url: url,
            ajaxGridOptions: {contentType: 'application/json'},
            postData: postData,
            mtype: "POST",
            datatype: "json",
            jsonReader: {
                root: "result"
            },
            colModel: [
                {name: 'id', label: 'id', width: 75, align: "center", hidden: true,sortable:false},
                {name: 'name', label: '知识类型名称', width: 100, align: "center", editable: true,sortable:false},
                {name: 'code', label: '知识类型编码', width: 90, align: "center", editable: true,sortable:false},
                {name: 'fullPath', label: '所属目录', align: "center", width: 55, editable: true,sortable:false},
                {name: 'isEyeshield', label: '护眼模式', width: 80, align: "center", editable: true,
                    formatter: function (v, opt, rec) {
                        if (v) return "是";
                        return "否";
                    },sortable:false
                },
                {name: 'isReply', label: '允许回复', width: 80, align: "center", editable: true,
                    formatter: function (v, opt, rec) {
                        if (v ) return "是";
                        return "否";
                    },sortable:false
                }
            ],
            viewrecords: true,
            rowNum: -1,// 一页显示多少条
            //rowList: [20, 50, 100, 200],// 可供用户选择一页显示多少条
            //pager: '#pagered',// 表格页脚的占位符(一般是div)的id
            rownumbers: true,
            multiboxonly: true,
            multiselect: true,
            height: 'auto',
            caption: "",
            autowidth: true
        });
    }
    initContentChildGrid('');
    $.xljUtils.resizeNestedGrid();

    /**
     * 初始化知识目录树
     */
    function initContentChildTree() {
        $.ajax({
            type: 'POST',
            url: serviceUrl + 'oa/content/contentChild/queryTreeList?time=' + Math.random(),
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({delflag: false}),
            success: function (json) {
                console.log(json);
                if (json && json.success) {
                    //返回的数据节点
                    var zNodes = json.result;
                    console.log(zNodes);
                    for(var o in zNodes){
                    	if(zNodes[o].parentId){
                    		zNodes[o].name= $.xljUtils.htmlDecode(zNodes[o].name);
                    	}
                    }
                    if (zNodes) {
                        var settings = {
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: 'id',
                                    pIdKey: 'pid',
                                    rootPId: null
                                }
                            },
                            view: {
                                dblClickExpand: false
                            },
                            callback: {
                                onClick: function (event, treeId, treeNode) {
                                    loadChildGrid(treeNode.id);
                                },
                                onExpand: function (event, treeId, treeNode) {
                                    $.xljUtils.treeResizeFn();
                                },
                                onCollapse: function () {
                                    $.xljUtils.treeResizeFn();
                                }
                            }
                        };
                        var treeObj = $('#contentChildTree');
                        var zTreeObj = $.fn.zTree.init(treeObj, settings, zNodes);
                        var nodes = zTreeObj.getNodes();
                        console.log(nodes);
                        //默认展开第一个节点
                        zTreeObj.expandNode(nodes[0], true, false, false, false);
                        zTreeObj.selectNode(nodes[0]);


                        setTimeout(function () {
                            zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                            $.xljUtils.addTreeScroll('ztree-box');
                            $.xljUtils.treeResizeFn();
                        }, 300);
                    }
                } else {
                    $.xljUtils.tip('red', '获取知识目录树失败！');
                }
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }
    initContentChildTree();

    //加载子目录
    function loadChildGrid(parentId) {
        jQuery('#listContentChild').jqGrid('setGridParam',{
            postData: {'parentId': parentId}
        });
        jQuery('#listContentChild').jqGrid().trigger('reloadGrid');
    }

    //新增目录
    $('#createBtn').on('click',function () {
        var zTree =  $.fn.zTree.getZTreeObj("contentChildTree");
        var nodes = zTree.getSelectedNodes();
        if(!nodes||nodes.length==0){
            $.xljUtils.tip('blue','请选择一个知识目录！');
            return;
        }
        //var contentTypeObj = getContentTypeData(nodes[0]);
       /* window.open(serviceUrl + 'content/contentChild/contentChild_edit.html?act=create&parentId='
            +nodes[0].id+'&parentName='+encodeURIComponent(nodes[0].name)
            +'&contentTypeId='+contentTypeObj.contentTypeId+'&contentTypeName='+encodeURIComponent(contentTypeObj.contentTypeName),'_blank');*/
       window.open('contentChild_edit.html?act=create&parentId='+nodes[0].id);
    });

    //更新目录
    $('#updateBtn').on('click',function () {
        var idsVal = $('#listContentChild').jqGrid('getGridParam', 'selarrrow');
        var idVal = $('#listContentChild').jqGrid('getGridParam', 'selrow');
        if(idsVal.length>1){
            $.xljUtils.tip('blue', "只能选择一行数据进行修改！");
            return;
        }
        if(idVal&&idVal!=''){
            window.open(serviceUrl + 'content/contentChild/contentChild_edit.html?act=update&id='+idVal,'_blank');
        }else{
            $.xljUtils.tip('blue', "请选择一行数据进行修改！");
        }

    });

    //删除目录
    $('#deleteBtn').on('click',function () {
        var ids = $('#listContentChild').jqGrid('getGridParam', 'selarrrow');
        if (!ids || ids.length == 0) {
            $.xljUtils.tip('blue', "请选择要删除的行！");
            return;
        }

        $.xljUtils.confirm('blue','确定要删除这'+ids.length+'条数据吗？',function () {
            var idsStr = ids.join(",");
            if (idsStr && idsStr != '') {
                $.ajax({
                    url: serviceUrl + "oa/content/contentChild/deleteBatch/" + idsStr,
                    type: 'DELETE',
                    dataType: 'JSON',
                    success: function (resultData) {
                        if (resultData && resultData.success) {
                            $.xljUtils.tip('green', "数据删除成功！");
                            $('#listContentChild').jqGrid().trigger("reloadGrid");

                            var zTree =  $.fn.zTree.getZTreeObj("contentChildTree");
                            for(var i=0;i<ids.length;i++){
                                var node = zTree.getNodeByParam('id',ids[i]);
                                zTree.removeNode(node);
                                //zTree.refresh();
                            }
                        } else {
                            $.xljUtils.tip('red', resultData.msg);
                        }
                    }
                });
            }
        },true);
    });

    /**
     * 获取contentType数据
     * @param node
     * @returns {*}
     */
    function getContentTypeData(node) {
        if(!node.contentTypeId||node.contentTypeId==''){
            getContentTypeData(node.getParentNode());
        }else {
            return node;
        }
    }

});

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setJqGridAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#listContentChild', rowId);
}

/**
 * 重置grid
 * @param childId
 */
function reloadChildGrid(childId) {
    $('#listContentChild').jqGrid().trigger('reloadGrid');
}

/**
 * 以供子页面获取tree的全路径
 * @param treeNodeId
 */
function getFullPath(treeNodeId,fullPathObj) {
    var zTreeObj = $.fn.zTree.getZTreeObj('contentChildTree');
    var zNodes = zTreeObj.getNodesByParam('id', treeNodeId, null);
    var zNode = zNodes[0];

    if(!fullPathObj){
        fullPathObj = {};
    }

    var fullIdPathArr = fullPathObj.fullIdPathArr;
    if(!fullIdPathArr){
        fullIdPathArr = [];
    }
    fullIdPathArr.push(zNode.id);
    fullPathObj.fullIdPathArr = fullIdPathArr;

    var fullPathArr = fullPathObj.fullPathArr;
    if(!fullPathArr){
        fullPathArr = [];
    }
    fullPathArr.push(zNode.name);
    fullPathObj.fullPathArr = fullPathArr;

    var pNode = zNode.getParentNode();
    if(pNode){
        getFullPath(pNode.id,fullPathObj);
    }
}

/**
 * 以供子页面刷新tree
 * @param parentId
 * @param nodes
 */
function addTreeNode(parentId,nodes,act) {
    var zTree =  $.fn.zTree.getZTreeObj("contentChildTree");
    var node = zTree.getNodeByParam('id',parentId);
    if(act == 'create'){
        nodes.name=$.xljUtils.htmlDecode(nodes.name);
        nodes.code=$.xljUtils.htmlDecode(nodes.code);
        zTree.addNodes(node,nodes);
        zTree.updateNode(nodes[0],false);
    }else{
        var curNode = zTree.getNodeByParam('id',nodes.id);
        curNode.name =$.xljUtils.htmlDecode(nodes.name); 
        curNode.code = $.xljUtils.htmlDecode(nodes.code);
        zTree.updateNode(curNode,false);
    }
    zTree.refresh();
    zTree.selectNode(node,false,false);
    zTree.setting.callback.onClick(null, zTree.setting.treeId, node);
}