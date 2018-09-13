$(function () {

    /**
     * 计算ztree容器高度
     */
    function initTreeContainer() {
        var height = window.innerHeight;//$(window).height()
        $('.dictionary-tree').height(height-$('.tit-box').outerHeight()-$('.searchBox:visible').outerHeight()-48);
    }
    initTreeContainer();
    $("#cancleItemSaveBtn").hide();
    $("#saveItemBtn").hide();
    $('#searchBox').on('hidden.bs.collapse', function () {
        initTreeContainer();
    });

    $('#searchBox').on('shown.bs.collapse', function () {
        initTreeContainer();
    });

    $(window).on('resize',function () {
        initTreeContainer();
    });

    /**
     * 初始化grid列表
     */
    function initDictionaryItemList() {
        jQuery("#dictionaryItemList").jqGrid({
            url : baseUrl+"oa/dictionary/contentDictionaryItem/queryList",
            ajaxGridOptions: { contentType: 'application/json' },
            postData:{"dictionaryId":' '},
            mtype : "post",
            datatype : "json",
            jsonReader : {
                root:'result'
            },
            colModel : [
                {name : 'id',label : 'id',width : 75, align:"center",hidden:true,editable : false},
                {name : 'name',label : '名称',width : 75, align:"center",editable : true,formatter:function(name){
                	return  $.xljUtils.htmlEncode(name);
                }},
                {name : 'val',label : '值', align:"center",width : 55,editable : true,formatter:function(val){
                	return  $.xljUtils.htmlEncode(val);
                }},
                {name : 'sort',label : '序号', align:"center",width : 55,hidden : false}
            ],
            sortname : 'sort',//排序字段
            viewrecords : true,
            rownumbers: true,
            multiboxonly:true,
            multiselect:true,
            height:'auto',
            rowNum : -1,//一页显示多少条
            //rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
            //pager : '#pagered',//表格页脚的占位符(一般是div)的id
            caption : "",
            autowidth:true,
            ondblClickRow:function(rowid){
                var nodes = zTreeObj.getSelectedNodes();
                var selectedNode = nodes[0];
                if(selectedNode.isSystem) {
                    $.xljUtils.tip('blue', "此字典数据为系统内置，不可修改！");
                    return;
                }
                $('#dictionaryItemList').jqGrid('editRow',rowid, true);
                $('#cancleItemSaveBtn').show();
                $('#deleteItemBtn').hide();
                $('#saveItemBtn').show();
            },
            loadComplete:function(xhr){
            },
            gridComplete: function() {
                var gridData = $('#dictionaryItemList').jqGrid('getRowData');
                if(gridData.length>0){
                    $('#deleteItemBtn').show();
                }else{
                    $('#deleteItemBtn').hide();
                    $('#saveItemBtn').hide();
                }
                $('#cancleItemSaveBtn').hide();
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();

            }
        });
    }
    initDictionaryItemList();
    $.xljUtils.resizeNestedGrid();

    /**
     * 初始化字典树
     */
    function initDictionaryTree() {
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/dictionary/contentDictionary/queryDictionaryTree",
            data: JSON.stringify({}),
            dataType: "json",
            contentType: 'application/json',
            success: function (typeNodes) {
                var zNodes = typeNodes.result;
                recursionArray(zNodes);
                var setting = {
                    view: {
                        fontCss: getFontCss,
                        dblClickExpand: false
                    },
                    data:{
                        simpleData:{
                            enable:true,
                            idKey:'id',
                            pIdKey:'pId',
                            rootPId:null
                        }
                    },
                    callback:{
                        onExpand:function (event, treeId, treeNode) {
                            $.xljUtils.treeResizeFn('dictionary-tree');
                        },
                        onCollapse: function(){
                            $.xljUtils.treeResizeFn('dictionary-tree');
                        },
                        onClick:function (event, treeId, treeNode) {
                            loadItemGrid(treeNode.id);
                        }
                    }

                };
                zTreeObj = $.fn.zTree.init($("#dictionaryTree"), setting, zNodes);
                var nodes = zTreeObj.getNodes();
                //默认展开第一个节点
                zTreeObj.expandNode(nodes[0], true, false, false,false);
                zTreeObj.selectNode(nodes[0]);
                zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                setTimeout(function(){
                    $.xljUtils.addTreeScroll('dictionary-tree');
                    $.xljUtils.treeResizeFn('dictionary-tree');
                },300);
            }
        });
    }
    initDictionaryTree();

    //树增加样式
    function recursionArray(arr) {
        for(var i in arr) {
            arr[i].iconSkin = "diy-system";
            arr[i].name= $.xljUtils.htmlDecode(arr[i].name);
        }
    };

    //树的节点字体样式
    function getFontCss(treeId, treeNode) {
        return (treeNode.highlight&&treeNode.highlight=='true') ?
        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'} | ((typeof treeNode.status !='undefined')&& !treeNode.status)?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'};
    }

    //创建字典
    $('#createDictionaryBtn').on('click',function () {
        window.open('contentDictionary_edit.html?act=create');
    });

    //修改字典
    $('#updateDictionaryBtn').on('click',function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("dictionaryTree");
        var nodes = zTreeObj.getSelectedNodes();
        window.open('contentDictionary_edit.html?act=update&dictionaryId='+nodes[0].id);
    });

    //删除字典
    $('#deleteDictionaryBtn').on('click',function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("dictionaryTree");
        var nodes = zTreeObj.getSelectedNodes();
        var id = nodes[0].id;
        var name = nodes[0].name;
        if(nodes[0].isSystem) {
            $.xljUtils.tip('blue', "此字典数据为系统内置，不可删除！");
            return;
        }
        $.xljUtils.confirm('blue', '确定要删除此字典项吗', function () {
            $.ajax({
                url: hostUrl + "oa/dictionary/contentDictionary/deletePseudo/" + id,
                type: 'DELETE',
                dataType: 'JSON',
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        $.xljUtils.tip('green', "数据删除成功！");
                        var zTreeObj1 = $.fn.zTree.getZTreeObj("dictionaryTree");
                        var nodes1 = zTreeObj1.getSelectedNodes();
                        var nodes2=nodes1[0].getPreNode(); 
                        zTreeObj.removeNode(nodes1[0]);
                        zTreeObj.selectNode(nodes2);
                        loadItemGrid(nodes2.id);
                    } else {
                        $.xljUtils.tip('red', resultData.msg);
                    }
                }
            });
        },true);
    });

    /**
     * 查找树节点
     * @param keyName
     * @param value
     * @param isHighlight
     * @param treeObj
     */
    function searchDictionaryTree(keyName,value,isHighlight) {
        var ztreeObj = $.fn.zTree.getZTreeObj("dictionaryTree");
        var nodes = ztreeObj.getNodesByParamFuzzy(keyName, value, null);
        $.each(nodes,function (i,node) {
            if(isHighlight){
                node.highlight = 'true';
            }else{
                node.highlight = 'false';
            }

            ztreeObj.updateNode(node);
            ztreeObj.expandNode(node.getParentNode(), true, false, false);
        });
    }

    //查找input框事件
    $('#ztreeKeywords').bind('keyup',function (event) {
        searchDictionaryTree('highlight','true',false);
        var value = $(this).val();
        if(value=='') {
            searchDictionaryTree('highlight','true',false);
        }else {
            searchDictionaryTree('name',$.trim(value),true);
        }
    }).bind('blur',function (event) {
        var value = $(this).val();
        if(value=='') {
            searchDictionaryTree('highlight','true',false);
        }

    });

    //查找input框后边的查找按钮事件
    $('#ztreeKeywordsSearchBtn').on('click',function () {
        searchDictionaryTree('highlight','true',false);
        var inputVal = $('#ztreeKeywords').val();
        if($.trim(inputVal)!=''){
            searchDictionaryTree('name',inputVal,true);
        }

    });

    //加载字典项
    function loadItemGrid(dictionaryId) {
        jQuery('#dictionaryItemList').jqGrid('setGridParam',{
            postData: {'dictionaryId': dictionaryId}
        });
        jQuery('#dictionaryItemList').jqGrid().trigger('reloadGrid');
    }

    /**
     * 获取uuid
     * @returns {*}
     */
    function initUUID() {
        var guuid;
        var url = baseUrl + "generator/getGuuid"+'?time='+Math.random();
        $.ajax({
            type : 'get',
            async:false,
            url : url,
            success : function(data) {
                guuid = data.result;
                //$("#tempid").val(guuid);
            }
        });

        return guuid;
    }

    //增加一项字典项条目
    $('#createItemBtn').on('click',function () {
        var zTreeObj = $.fn.zTree.getZTreeObj('dictionaryTree');
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length==0) {
            $.xljUtils.tip('blue','请选择一个字典项！');
            return;
        }
        var selectedNode = nodes[0];
        if(selectedNode.isSystem) {
            $.xljUtils.tip('blue', "此字典为系统内置，不可增加新行！");
            return;
        }

        var trObjs = $('#dictionaryItemList tr');
        if(trObjs.length>0) {
            var trObj = trObjs[trObjs.length-1];
            var nameInputObj = $(trObj).find('input[name="name"]');
            var valInputObj = $(trObj).find('input[name="val"]');
            if(nameInputObj[0]){
                if($.trim($(nameInputObj[0]).val())==''||$.trim($(valInputObj[0]).val())==''){
                    $.xljUtils.tip('blue','字典项名称和值不能为空');
                    return;
                }
            }
        }

        var uuid = initUUID();

        var rowDatas = $('#dictionaryItemList').jqGrid('getRowData');
        var count = $('#dictionaryItemList tr:last td:last').text();
        count = $.trim(count);
        if(isNaN(parseInt(count))){
            count = 0;
        }
        count = parseInt(count);
        count++;
        $('#dictionaryItemList').jqGrid('addRowData',uuid,{id:uuid,name:'',val:'',sort:count},'last');
        $('#cancleItemSaveBtn').show();
        $('#deleteItemBtn').show();
        $('#saveItemBtn').show();
        $('#dictionaryItemList').jqGrid('editRow', uuid, true);
    });

    //取消添加数据项条目
    $('#cancleItemSaveBtn').on('click',function () {
    	$('#saveItemBtn').hide();
        $('#dictionaryItemList').jqGrid().trigger('reloadGrid');
    });

    //删除行
    $('#deleteItemBtn').on('click',function () {
        var nodes = zTreeObj.getSelectedNodes();
        var selectedNode = nodes[0];
        if(selectedNode.isSystem) {
            $.xljUtils.tip('blue', "此字典数据为系统内置，不可删除！");
            return;
        }
        var ids = $('#dictionaryItemList').jqGrid('getGridParam', 'selarrrow');
        if(ids.length==0){
            $.xljUtils.tip('blue', "请选择需要删除的数据！");
            return;
        }
        console.log(ids);
        $.xljUtils.confirm('blue','确定要删除这'+ids.length+'条数据吗？',function () {
            $.ajax({
                url: hostUrl + "oa/dictionary/contentDictionaryItem/deleteBatch/" + ids,
                type: 'DELETE',
                dataType: 'JSON',
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        var lastId;
                        if(ids.length>0){
                            lastId = ids[ids.length-1] ;
                        }
                        var trObj = $('#dictionaryItemList tr[id="'+lastId+'"]').prev();
                        var selId ;
                        if(trObj[0]){
                            selId = trObj.attr('id');
                        }
                        $('#dictionaryItemList').jqGrid().trigger('reloadGrid');
                        $.xljUtils.tip('green', "数据删除成功！");
                        setTimeout(function () {
                            $('#dictionaryItemList').jqGrid('setSelection',selId);
                        },500);
                    } else {
                        $.xljUtils.tip('red', "删除数据失败！");
                    }
                }
            });
        },true);
    });

    //保存字典项条目
    $('#saveItemBtn').on('click',function () {
        var trObjs = $('#dictionaryItemList tr');
        if(trObjs.length>0) {
            var trObj = trObjs[trObjs.length-1];
            var nameInputObj = $(trObj).find('input[name="name"]');
            var valInputObj = $(trObj).find('input[name="val"]');
            if(nameInputObj[0]){
                if($.trim($(nameInputObj[0]).val())==''||$.trim($(valInputObj[0]).val())==''){
                    $.xljUtils.tip('blue','字典项名称和值不能为空');
                    return;
                }
            }
            if(nameInputObj[0]){
                if($.trim($(nameInputObj[0]).val()).length>100||$.trim($(valInputObj[0]).val()).length>50){
                    $.xljUtils.tip('blue','字典项名称或值超长');
                    return;
                }
            }
        }
    	$("#cancleItemSaveBtn").hide();
    	$("#saveItemBtn").hide();
        $('#deleteItemBtn').show();
        var ids = $('#dictionaryItemList').jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var rowId = ids[i];
            $('#dictionaryItemList').jqGrid('saveRow',rowId,true,'clientArray');
        }

        var selIds = jQuery("#dictionaryItemList").jqGrid('getGridParam', 'selarrrow');
        if(selIds){
            for (var i = 0; i < selIds.length; i++) {
                var rowId = selIds[i];
                $('#dictionaryItemList').jqGrid('setSelection',rowId);
            }
        }
        $('#dictionaryItemList').jqGrid('setSelection',ids[ids.length-1]);

        var rowDatas = $('#dictionaryItemList').jqGrid('getRowData');
        var paramJson = {};
        var zTreeObj = $.fn.zTree.getZTreeObj('dictionaryTree');
        var nodes = zTreeObj.getSelectedNodes();
        if(nodes.length==0) {
            $.xljUtils.tip('blue','请选择一个字典项！');
            return;
        }
        paramJson.dictionaryId = nodes[0].id;
        paramJson.dictionaryItemList = JSON.stringify(rowDatas);
        $.ajax({
            url:hostUrl + 'oa/dictionary/contentDictionaryItem/saveAllDictionaryItem',
            data:JSON.stringify(paramJson),
            type:'POST',
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData&&resultData.successs) {
                    $.xljUtils.tip('green','数据保存成功！');
                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                $.xljUtils.getError(status);
            }
        });

    });

});

/**
 * 字典数据保存成功后刷新树回调函数
 * @param node
 */
function refreshDictionaryTree(node) {
    var zTreeObj = $.fn.zTree.getZTreeObj("dictionaryTree");
    node.pId='0';
    var nodeId = node.id;
    var zNodes = zTreeObj.getNodesByParam('id',nodeId);

    if(zNodes.length>0) {
        var znode = zNodes[0];
        zTreeObj.selectNode(znode);
        znode.id = node.id;
        znode.code =  $.xljUtils.htmlDecode(node.code);
        znode.formType = node.formType;
        znode.name = $.xljUtils.htmlDecode(node.name);
        znode.status = node.status;
        zTreeObj.updateNode(znode);
        return;
    }
    var nodeArr = [];
    node.iconSkin = "diy-system";
    nodeArr.push(node);
    node.name = $.xljUtils.htmlDecode(node.name);
    node.code =  $.xljUtils.htmlDecode(node.code);
    zTreeObj.addNodes(null,node);
    var zNodeArr = zTreeObj.getNodesByParam('id',node.id);
    zTreeObj.selectNode(zNodeArr[0]);
    zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, zNodeArr[0]);
    zTreeObj.updateNode(zNodeArr[0]);

}

