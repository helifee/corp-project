;;(function ($,window,document,undefined) {

    /**
     * author luorongxin
     */
    var  type;    //  0 静态网页 1 引用文档
    var contentRowTypeId;
    var id;
    var btnName; // 按钮名称
    var ztreeObj;
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
        }
    };

    function getFontCss(treeId, treeNode) {
        return (treeNode.highlight&&treeNode.highlight=='true') ?
        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'};
    }
    /**
     * 点击树方法
     * @param event
     * @param treeId
     * @param treeNode
     */
    function zTreeOnClick(event, treeId, treeNode) {
         var  zTreeNode  = treeNode;
        var nodeChildren = zTreeNode.children;
        if (nodeChildren&&nodeChildren.length>0) {
            return;
        }
        $("#contentRowTypeGrid").jqGrid('setGridParam',{postData:{"contentTypeId":treeNode.contentTypeId,"contentChildId":treeNode.contentChildId}}).trigger('reloadGrid');
    }

    $(function () {
        contentRowTypeId = $.xljUtils.getUrlParam('id');
         //加载树结构
         listTree()
        //初始化页面
        pageInit();
        //初始化文档页面
        ContentRowTypePageInit()
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //绑定按钮事件
        bindButton();
   });
    /**
     * 加载树结构
     */
    function listTree(){

        $.ajax({
            type: "POST",
            //url: hostUrl+"oa/content/contentChild/getContentChildTreeById/null?time="+Math.random(),
            url: hostUrl + 'oa/content/contentChild/queryTreeList?time=' + Math.random(),
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify({delflag: false}),
            success: function(typeNodes){
                var zNodes = typeNodes.result;
                if(zNodes==null||zNodes.length ==0){
                    return ;
                }
                ztreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
                setTimeout(function(){
                    $.xljUtils.addTreeScroll();
                    $.xljUtils.treeResizeFn();
                },300);
            }
        });
    }



    /**
     * 绑定按钮事件
     */
    function bindButton() {
        //页面切换
       /* $(".con-tit .approve-btn").on("click",function(){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            btnName = $(this).attr("name");
        });*/
        //创建关联文档
        $('#createBtn').click(function () {
            var type = $('input:radio[name="type"]:checked').val();
            $.ajax({
                type: 'get',
                url: hostUrl + "generator/getGuuid?time=" + Math.random(),
                async:false,
                success: function (data) {
                    $('#staticTitle').val('');
                    $('#staticUrl').val('');
                    id = data.result;
                }
            });
            if(type=='0'){  //静态网页
                $('#staticPageModal').show();
            }else if(type == '1'){ //引用文档
                $('#referModal').show();
                var h =  $("#referModalDialog").height();
                $(".ztree-box").height((h-$('.org-title').outerHeight()-$('.searchBox').outerHeight()-50));
                $("#referModalDialog").find(".tableStyle").height((h-142)/2+"px");
                $("#contentRowTypeGrid").setGridWidth($(".tableStyle").width()-2,true);
                $("#contentRowTypeLocalGrid").setGridWidth($(".tableStyle").width()-2,true);
                $.xljUtils.treeResizeFn();
                $.xljUtils.gridResizeFn();
            }
           /*  if(btnName=='staticPage'){  //静态网页
                 $('#staticPageModal').show();
             }else if(btnName=='referPage'){ //引用文档
                 $('#referModal').show();
             }*/
            }
        );
        //删除关联文档
        $('#delBtn').click(function () {
             delAssociatedDoc();
        });
        //关闭按钮
        $('#closeBtn').click(function () {
            try {
                window.opener.loadAssociatedList(contentRowTypeId);
            }catch(e){
            }
           window.close();
        });
        //保存modal
        $('#saveModalBtn').click(function () {
            saveStaticPage();
        });
        //关闭modal
        $('#closeModalBtn').click(function () {
            $('#staticPageModal').hide();
        });
        //关闭modal
        $('#closeReferModalBtn').click(function () {
            $('.ztree-box').getNiceScroll().hide();
            $('#referModal').find('.ui-jqgrid-bdiv').getNiceScroll().hide();
            $('#referModal').hide();
        });
        //保存modal
        $('#saveReferModalBtn').click(function () {
            saveLocalGrid();
        });
        //模糊查询
        $('#fuzzySearchBtn').click(function () {
            var title = $('#keyword').val();
            $("#contentRowTypeGrid").jqGrid('setGridParam',{postData:{"title":$.trim(title),'fuzzyQueryFields':JSON.stringify(['title'])}}).trigger('reloadGrid');
        });
        //绑定回车事件
        $(document).keydown(function(event){
            if(event.keyCode == 13){ //绑定回车
                $('#fuzzySearchBtn').click();
            }
        });
        $('#searchTreeBtn').click(function () {
            searchTree('highlight','true',false);
            var inputVal = $('#keyTree').val();
            if($.trim(inputVal)!=''){
                searchTree('name',inputVal,true);
            }

        });
        //input绑定事件
        $('#keyTree').bind('keyup',function (event) {
            searchTree('highlight','true',false);
            var value = $(this).val();
            if(value=='') {
                searchTree('highlight','true',false);
            }else {
                searchTree('name',$.trim(value),true);
            }
        }).bind('blur',function (event) {
            var value = $(this).val();
            if(value=='') {
                searchTree('highlight','true',false);
            }
        });
    }

    /**
     *  查找树
     */
     function searchTree(keyName,value,isHighlight) {

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
    /**
     * 删除关联文档
     */
    function delAssociatedDoc() {

        var ids = $("#list").jqGrid("getGridParam", "selarrrow");
        if (ids.length != 0){
            $.xljUtils.confirm("blue","确认要删除这【"+ids.length+"】条数据吗？" ,function(){
                $.ajax({
                    url:hostUrl+'oa/contentRowTypeAssociated/deleteBatch/'+ids,
                    type:'delete',
                    contentType:'application/json',
                    dataType:'JSON',
                    data:JSON.stringify(),
                    success:function (xhr) {
                        if(xhr.success){
                            $.xljUtils.tip('green',xhr.msg);
                            $("#list").jqGrid().trigger('reloadGrid');
                        }else{
                            $.xljUtils.tip('red',xhr.msg);
                        }
                    }
                });

            },true);

        }else{
            $.xljUtils.tip('blue',"请选择要删除的行！");
        }


    }
    /**
     * 保存静态网页
     */
    function saveStaticPage() {
        var title  = $('#staticTitle').val();
        var url = $('#staticUrl').val();
        $.xljUtils.customSingleValidate($('#staticForm')[0]);
        if(!$('#staticForm').valid()){
            return;
        }
        // if($.trim(title)!=''&&$.trim(url)!=''){
            $.ajax({
                url:hostUrl+'oa/contentRowTypeAssociated/save',
                type:'POST',
                contentType:'application/json',
                dataType:'JSON',
                data:JSON.stringify({delflag:false,title:title,url:url,contentRowTypeId:contentRowTypeId,id:id,type:'0'}),
                success:function (xhr) {
                       if(xhr.success){
                           $.xljUtils.tip('green',xhr.msg);
                           $.xljUtils.setAddedRowId('#list', id);
                           $("#list").jqGrid().trigger('reloadGrid');
                           $('#staticPageModal').hide();
                       }else{
                           $.xljUtils.tip('red',xhr.msg);
                       }
                }
            });
      /*  }else{
            $.xljUtils.tip('blue','填入信息不完整！');
        }*/
    }
    /**
    * 加载列表
    */
    function pageInit(){
        $.xljUtils.initJqGrid(
            {
                gridSelecter:'#list',
                url : hostUrl+'oa/contentRowTypeAssociated/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                postData:{"delflag":false,'sortFields':JSON.stringify({'createDate':'desc'}),'contentRowTypeId':contentRowTypeId},
                contentType : "application/json",
                autowidth:true,
                height: $(window).height()-200,
                colNames : [ 'id', '文档主题' ,'文档路径','文档类型' , '当前文档ID'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'title',label : '文档主题',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'url',label : '文档路径',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'type',label : '文档类型',editable:true,width : 60,sortable:false,align:'center',formatter: "select", editoptions:{value:"0:静态类型;1:引用文档"}},
                    {name : 'contentRowTypeId',label : '当前文档ID',hidden:true,editable:true,width : 60,sortable:false,align:'center'}
                ],
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:'result',
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
                },
                // onCellSelect: function(){
                // },
                // onSelectRow: function () {
                // },
                // gridComplete: function () {
                //     $.xljUtils.addGridScroll();
                //     $.xljUtils.gridResizeFn();
                // },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        //success
                    }
                }
            });
    }

    /**
     * 加载列表
     */
    function ContentRowTypePageInit(){
        $("#contentRowTypeGrid").jqGrid(
            {
                url : hostUrl+'oa/content/contentRowType/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                postData:{"delflag":false,'status':'PUBLISHED','groupByFields': JSON.stringify(['relationId']),'sortFields':JSON.stringify({'createDate':'desc'}),'contentType':'DOCUMENT'},
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','文档类型', '文档主题' ,'文档路径'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'contentType',label : '文档类型',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'title',label : '文档主题',editable:true,width : 270,sortable:false,align:'center'},
                    {name : 'url',label : '文档路径',editable:true,width : 270,sortable:false,align:'center'}
                ],
                // multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root: function (obj) {
                        var result = obj.result;
                        var arr = [];
                        for(var row in result){
                            var data ={};
                            var rowData = result[row];
                            data.id = rowData.id;
                            data.title = rowData.title;
                            data.contentType = rowData.contentType;
                            data.url = (rowData.contentTypeName==null?"":rowData.contentTypeName+"/")+(rowData.contentChildName==null?"":rowData.contentChildName+"/")+rowData.title;
                            arr.push(data);
                        }

                        return arr;
                    },
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
                    var rowData = $('#contentRowTypeGrid').jqGrid('getRowData', rowid);
                    addDataToGrid(rowData)
                },
                onCellSelect: function(){
                },
                onSelectRow: function () {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        //success
                    }
                }
            });

        $("#contentRowTypeLocalGrid").jqGrid(
            {
                datatype : 'local',
                autowidth:true,
                colNames : [ 'id', '文档类型','文档主题' ,'文档路径'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'contentType',label : '文档类型',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'title',label : '文档主题',editable:true,width : 270,sortable:false,align:'center'},
                    {name : 'url',label : '文档路径',editable:true,width : 270,sortable:false,align:'center'}
                ],
                multiboxonly:true,
                rownumbers:true,
                ondblClickRow:function(rowid){
                    $("#contentRowTypeLocalGrid").jqGrid('delRowData',rowid);
                },
                onCellSelect: function(){
                },
                onSelectRow: function () {
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    }

    /**
     * 动态添加gird
     */
    function addDataToGrid(rowData) {
        var localRowData = $('#contentRowTypeLocalGrid').jqGrid('getRowData', rowData.id);
        if(localRowData&&!localRowData.id){
          $('#contentRowTypeLocalGrid').jqGrid('addRowData', rowData.id, rowData);
        }
    }

    /**
     * 保存本地grid
     */
    function saveLocalGrid() {
        var rows = $("#contentRowTypeLocalGrid").jqGrid("getRowData");
         for(var i in rows){
             var data = rows[i];
             $.ajax({
                 url:hostUrl+'oa/contentRowTypeAssociated/save',
                 type:'POST',
                 contentType:'application/json',
                 dataType:'JSON',
                 data:JSON.stringify({delflag:false,title:data.title,url:data.url,contentRowTypeId:contentRowTypeId,contentType:data.contentType,type:'1',referenceId:data.id}),
                 success:function (xhr) {
                     if(xhr.success){
                         $.xljUtils.tip('green',xhr.msg);
                         $.xljUtils.setAddedRowId('#list', xhr.result.id);
                         $("#list").jqGrid().trigger('reloadGrid');
                         $('.ztree-box').getNiceScroll().hide();
                         $('#referModal').find('.ui-jqgrid-bdiv').getNiceScroll().hide();
                         $('#referModal').hide();
                         $("#contentRowTypeLocalGrid").jqGrid("clearGridData");
                     }else{
                         $.xljUtils.tip('red',xhr.msg);
                     }
                 }
             });
         }
    }

})(jQuery,window,document)
