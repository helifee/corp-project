/**
 * Created by xph on 2017/7/6.
 */
;(function ($, window, document, undefined) {
    var divWidth;
    var rowData;
    var rowDataBefore;
    var deptId;

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeGrid();
    });

    //计算表格宽度
    window.resizeGrid = function () {
		$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 135);
		$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width(), true);
    };

    //角色列表初始化
    window.initRoleList = function () {
        jQuery("#roleList").jqGrid({
            url: hostUrl + "auth/authData/querRoleList",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            // postData:{"orderBy":"create_date"},
            postData:{},
            datatype : "json",
            jsonReader : {
                // root:"result"
                repeatitems: false
            },
             colModel: [
                {name: 'roleId',label : 'id',editable:true,sortable:false,hidden:true,key:true},
                {name: 'roleName',label : '角色名称', sortable:false,align:'center'},
                {name: 'createTime',label : '创建时间 ', sortable:false,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}},
                {name: 'roleRemark',label : '描述', sortable:false,align:'center',sortable:false},
                {name: '', label : '操作', align:'center',sortable:false,
                    formatter: function (cellvalue, options, rowObject) {
                        return "<button  onclick=\"authDataSet(" + rowObject.roleId+ ")\">权限设置</button>";
                    }
                }

            ],
            rowNum: 20,//一页显示多少条 -1全部
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: "#pager",//表格页脚的占位符(一般是div)的id
			width: $(window).width(),
			height:$(window).height()-135,
            rownumbers: true,
            sortable:false,
            autoWidth: true,
            shrinkToFit: true,
            multiselect: false,
            sortorder: "desc",//排序方式,可选desc,asc
            loadComplete:function(data){
            },
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    };

    //数据权限设置
    window.authDataSet = function (tempRoleId) {

        if(tempRoleId!=null&&tempRoleId!=''&&tempRoleId!=undefined) {
            openPa("auth_data_set.html?roleId="+tempRoleId);
        }else {
            var rowIds=$('#roleList').jqGrid("getGridParam","selarrrow");
            if(rowIds.length==0){
                pop_tip_open("blue","请选择需要设置的人员记录！");
                return;
            } else {
                //根据选中的行获取每行的数据对象
                var rowData = $("#roleList").jqGrid('getRowData', rowIds[0]);
                openPa("auth_data_set.html?roleId="+rowData.id);
            }
        }

    };

    //增加条件查询  回车查询
    $('#queryRoleName').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryRoleList();
        }
    });

    //增加条件查询
    window.queryRoleList = function () {
        var tempName = $("#queryRoleName").val();
        jQuery("#roleList").jqGrid("setGridParam", {url :hostUrl + 'auth/authData/querRoleList',postData : {name:tempName,page:1}}).trigger("reloadGrid");
    };

    //上来就执行
    $(function () {
        initRoleList();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
    });

})(jQuery, window, document);