/**
 * Created by xph on 2017/7/6.
 */
;
(function ($, window, document, undefined) {

    //初始化组织机构数据
    var dataAuth = [];
    //角色ID
    var roleId;


    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算表格的高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 90) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //右边一个列表
        //$(".mytable table").jqGrid().setGridHeight($(window).height() - 600);
        $.xljUtils.gridResizeFn();
    };

    //初始化组织树
    window.initOrgList = function () {
        var height = $(window).height()-150;
        jQuery("#dataAuthList").jqGrid({
            url: hostUrl + "auth/authData/queryDataAuthList",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"roleId":roleId},
            treeGrid: true,
            treeGridModel: "adjacency",//treeGrid所使用的方法
            ExpandColumn:"name",//指定那列来展开tree grid，默认为第一列，只有在treeGrid为true时起作用
            datatype : "json",
            subGrid:true,
            sortable: false,//不支持标题栏单击排除查询
            // width:$(".roleScroll").width()-10,
            height: height,
            autowidth: true,
            jsonReader : {
                root:function(data){
                    for(var i =0;i<data.result.length;i++){
                        //默认不展开
                        data.result[i].expanded=false;
                        data.result[i].leavl
                    }
                },
                root:"result",
                repeatitems : false
            },
            colModel:[
                        {name : 'id',label : 'id',hidden:true,key:true},
                        {name : 'name',label : '机构',align : "center"},
                        {name : '',label : '选择',align : "center",formatter: formatterImportDataPointcheck,sortable: false}
                      ],
            rowNum:-1,
            treeReader:{
                level_field: "level",
                parent_id_field: "parentId",
                leaf_field: "isLeaf",
                expanded_field: "expanded"
            },
            gridComplete:function(){
                $. xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            loadComplete: function (data) {
                dataAuth = [];
                dataAuth = data.result;
            }
        });
    };

    //数据权限按钮初始化
    window.formatterImportDataPointcheck = function (cellvalue, options, cell) {
        var rowId = cell.id;
        var isCheck = cell.isCheck;
        var checkbox = '<label >'+
            '<input type="checkbox" id="chx'+rowId+'" value="'+rowId+'" onclick="clickCheckbox('+rowId+', this);"/></label>';
        if(isCheck) {
            checkbox = '<label >'+
                '<input type="checkbox" id="chx'+rowId+'" value="'+rowId+'" onclick="clickCheckbox('+rowId+', this);" checked="checked"/></label>';
        }
        return  checkbox ;
    };

    //checkbox事件
    window.clickCheckbox = function (rowid, $this) {
        checkChildren(rowid,$this);
        if($($this).is(':checked')){
            checkParent(rowid, $this);
        }else{
            //取消选中 取消父节点的全选择
            notCheckParent(rowid, $this);
        }
    };

    //递归选中子节点
    window.checkChildren = function (rowid, $this) {

        //获得当前节点
        var records =  $("#dataAuthList").jqGrid('getNodeChildren',$("#dataAuthList").jqGrid("getLocalRow", rowid));
        if(records.length>0){
            for (var i=0;i<records.length;i++){
                var cb = $("#chx"+records[i].id);
                cb.prop("checked", $($this).is(':checked'));
                checkChildren(records[i].id,cb);
            }
        }
    };

    /**
     * 递归选中父节点
     * 先查看节点的兄弟节点是否都为选中状态
     * @param rowid
     * @param $this
     */
    window.checkParent = function (rowid, $this) {

        //获取父节点
        var parent = $("#dataAuthList").jqGrid('getNodeParent',$("#dataAuthList").jqGrid("getLocalRow", rowid));

        if(parent) {

            var tempBoolean = false;

            //获取兄弟节点是否全是选中状态：父节点的子节点
            var records =  $('#dataAuthList').jqGrid('getNodeChildren', parent);
            if(records!=null&&records.length>0){
                if(records.length>0){
                    for (var i=0;i<records.length;i++) {
                        var cb = $("#chx"+records[i].id);
                        //获取当前状态
                        if($(cb).is(':checked')){
                        }
                        else {
                            tempBoolean = true;
                            break;
                        }
                    }
                }
            }

            if(!tempBoolean) {
                var cb = $("#chx"+parent.id);
                cb.prop("checked", $($this).is(':checked'));
                checkParent(parent.id,cb);
            }
        }
    };

    //取消父节点的全选
    window.notCheckParent = function (rowid, $this) {
        var parent = $("#dataAuthList").jqGrid('getNodeParent',$("#dataAuthList").jqGrid("getLocalRow", rowid));
        if(parent){
            var cb = $("#chx"+parent.id);
            cb.prop("checked",false);
            checkParent(parent.id,cb);
        }
    };

    //保存数据权限
    window.saveDataAuth = function () {

        var saveFlag = true;

        //获取所有节点
        var saveOrgIds = [];

        if(dataAuth!=null&&dataAuth.length>0&&roleId!=null&&roleId!=''&&roleId!=undefined) {

            //获取所有选中的组织结构
            for (var i=0;i<dataAuth.length;i++) {
                var cb = $("#chx"+dataAuth[i].id);

                if(cb&&dataAuth[i].id!=null&&dataAuth[i].id!='') {
                    //获取当前状态
                    if($(cb).is(':checked')){
                        saveOrgIds.push(dataAuth[i].id);
                    }
                }
            }

            if(saveOrgIds!=null&&saveOrgIds.length>0) {

                saveFlag = false;

                var data = {"saveOrgIds":saveOrgIds,"roleId":roleId};
                $.ajax({
                    type: "POST",
                    url: hostUrl + "auth/authData/saveDataAuth",
                    data:JSON.stringify(data),
                    dataType: "JSON",
                    contentType:"application/json",
                    success: function(resultData){
                        var successFlag = resultData.success;
                        if(successFlag){
                            pop_tip_open("green","数据权限保存成功！");
                        }else {
                            pop_tip_open("blue", resultData.message);
                        }
                    }
                });
            }
        }
        if(saveFlag) {
            pop_tip_open("blue","没有需要保存的数据权限信息！");
        }
    };

    //关闭页面
    window.backHtml = function () {
        window.parent.location.reload();//重载
        window.parent.closePa();
    };

    /**
     * 右侧滚动条
     */
    window.addCheckboxScroll = function (cl) {
        if(!cl) cl = ".check_group";
        $(cl).niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: false, // nicescroll可以管理水平滚动
            background: "#fff"
        });
    };

    //重置
    window.resizeScroll = function (cl) {
        if(!cl) cl = ".check_group";
        $(cl).getNiceScroll().show().resize();
    };

    //上来就执行
    $(function () {

        roleId = $.xljUtils.getUrlParam("roleId");

        //初始化高度
       // resizeHeight();

        initOrgList();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

        //在加载完表格后，设置表格的宽度
       // resizeGrid();

    });



})(jQuery, window, document);