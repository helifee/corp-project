var jqGridSysCodeSet;
var rowData;
var sysCodeSetId;
//手动的调整窗口时
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});
//计算表格的高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    //表示con-table 下的mytable
    $(".con-table .mytable1").height((w_h - 80) + "px");
}

//计算表格宽度
function resizeGrid() {
    //ui-jqgrid-bdiv这个样式 时jqGrid主体的样式
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 100);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {
    //初始化代码集列表
    initSysCodeSetList();
    //初始化代码项列表
    initSysCodeItemList();
    //初始化高度
    resizeHeight();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
    //树加滚动条
    setTimeout(function(){
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
    },300);
    //在加载完表格后，设置表格的宽度
    // resizeGrid();
});
function  add() {
    sysCodeSetId="";
    var winObjEI = window.open('sys_code_set_edit.html');
    var isClose = 1;
    //关闭open页面时刷新父页面列表
    var loop = setInterval(function () {
        if (winObjEI.closed && isClose == 1) {
            isClose--;
            //这里写刷新代码
            $('#sysCodeSetList').jqGrid().trigger("reloadGrid");
        }
    }, 1000);
}
function update(){
    //跳转编辑页
    var idsVal = $('#sysCodeSetList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行修改！");
            return;
        }else{
            var rowId=$('#sysCodeSetList').jqGrid("getGridParam","selrow");
            rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
            sysCodeSetId = rowData.id;
            var winObjEI = window.open('sys_code_set_edit.html');
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    //这里写刷新代码
                    $('#sysCodeSetList').jqGrid().trigger("reloadGrid");
                }
            }, 1000);
        }

    }else{
        $.xljUtils.tip("red", "请先选择一条记录！");
        return;
    }

}
/**
 * 初始化主键ID
 */
function initUuid(){
    var uAll = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
    $.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
            var guuid=data.result;
            $("#sysCodeSetFrom").find("input[name='id']").val(guuid);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            pop_tip_open("red","初始化主键ID请求失败");
        }
    })
}
/**
 * 初始化代码集列表
 */
function initSysCodeSetList() {
    //创建jqGrid组件
    jqGridSysCodeSet = jQuery("#sysCodeSetList").jqGrid(
        {
            url : baseUrl+'/sys/sysCodeSet/queryList',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            colNames: [ '代码集名称','代码集值','代码集类型','代码集状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'name', index: 'name',editable:true, align: "center"},
                {name : 'id',label : 'id',editable:true,align: "center"},
                {name: 'type', index: 'type',editable:true, align: "center",formatter:typeFmatter},
                {name: 'status', index: 'status',editable:true, align: "center",formatter:statusFmatter}
            ],
            width:$('.mytable1').width(),
            height:$(window).height()-100,
            autoWidth: true,
            rownumbers:true,
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            onSelectRow: function () {
                var rowId=$('#sysCodeSetList').jqGrid("getGridParam","selrow");
                rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            ondblClickRow:function(rowId){
                //双击跳转查看代码项页面
                rowData = $('#sysCodeSetList').jqGrid('getRowData',rowId);
                // window.open("sys_code_item.html");
                window.location.href = 'sys_code_item.html?sysCodeSetId='+rowData.id+'&sysCodeSetName='+encodeURI(rowData.name,"UTF-8");
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
                }
            }
        });
}
/**
 * 状态数据格式化
 */
function typeFmatter (cellvalue, options, rowObject) {
    if(cellvalue == "0"){
        return "国标";
    }else if(cellvalue == "1"){
        return "系统";
    }else if(cellvalue == "2"){
        return "用户";
    }
}
/**
 * 状态数据格式化
 */
function statusFmatter (cellvalue, options, rowObject) {
    if(cellvalue == "1"){
        return "启用";
    }else if(cellvalue == "0"){
        return "禁用";
    }
}

/**
 * 删除
 */
function del(){
    var idsVal = $('#sysCodeSetList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
            $.ajax({
                url:baseUrl+"/sys/sysCodeSet/deleteBatch/"+idsVal,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","数据删除成功！");
                            $('#sysCodeSetList').jqGrid().trigger("reloadGrid");
                        }else{
                            if(xhr.code=="50000"){
                                $.xljUtils.tip("red",xhr.msg);
                                return;
                            }
                            $.xljUtils.tip("red","数据删除失败！");
                        }
                    }else{
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        },true);
        return;
    }else{
        $.xljUtils.tip("blue","请选择要删除的数据！");
    }
}





//处理日期选择
function dateTime() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
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
 * 初始化代码项列表
 */
function initSysCodeItemList() {
    //创建jqGrid组件
    jQuery("#sysCodeItemList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '代码项', '代码值', '缩写','拼音/英文','层次码','用户编码','状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'value', index: 'code', width: 100, align: "center"},
                {name: 'shortname', index: 'scope', width: 100, align: "center"},
                {name: 'spell', index: 'isnecessary', width: 100, align: "center"},
                {name: 'layerCode', index: 'type', width: 100, align: "center"},
                {name: 'userCode', index: 'sort', width: 100, align: "center"},
                {name: 'status', index: 'sort', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "是", value: "00901", shortname: "",spell:"",layerCode:"1001",userCode:"",status:"有效"},
        {id: "2", name: "否", value: "00900", shortname: "",spell:"",layerCode:"1002",userCode:"",status:"有效"},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysCodeItemList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
//初始化用户列表
function initUserList(){
    //创建jqGrid组件
    jQuery("#userList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '姓名', '登录名', '状态','人员类别','所属管理员','性别','机构','部门','岗位','操作'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'loginName', index: 'loginName', width: 100, align: "center"},
                {name: 'status', index: 'status', width: 100, align: "center"},
                {name: 'type', index: 'type', width: 100, align: "center"},
                {name: 'belongRole', index: 'belongRole', width: 100, align: "center"},
                {name: 'sex', index: 'sex', width: 100, align: "center"},
                {name: 'orgId', index: 'orgId', width: 100, align: "center"},
                {name: 'deptId', index: 'deptId', width: 100, align: "center"},
                {name: 'postId', index: 'postId', width: 100, align: "center"},
                {name: 'operate', index: 'operate', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "张三", loginName: "zhangsan", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务一部",postId:'总裁',operate:'<button class="btn btn-sm" onclick="sys_pms_user_modifyPassword()">修改密码</button>'},
        {id: "2", name: "张三1", loginName: "zhangsan2", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务二部",postId:'总裁',operate:'<button class="btn btn-sm" onclick="sys_pms_user_modifyPassword()">修改密码</button>'},
        {id: "3", name: "张三2", loginName: "zhangsan3", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务三部",postId:'总裁',operate:'<button class="btn btn-sm" onclick="sys_pms_user_modifyPassword()">修改密码</button>'},
        {id: "4", name: "张三3", loginName: "zhangsan3", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务四部",postId:'总裁',operate:'<button class="btn btn-sm" onclick="sys_pms_user_modifyPassword()">修改密码</button>'},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#userList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
//初始化角色列表
function initRoleList(){
    //创建jqGrid组件
    jQuery("#roleList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '角色名称', '创建时间', '系统管理员','hr专业人员','领导人员','操作'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'createDate', index: 'loginName', width: 100, align: "center"},
                {name: 'isSys', index: 'status', width: 100, align: "center"},
                {name: 'isHr', index: 'type', width: 100, align: "center"},
                {name: 'isLeader', index: 'belongRole', width: 100, align: "center"},
                {name: 'operate', index: 'sex', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "系统管理员", createDate: "2017-06-07", isSys: "是",isHr:"否",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
        {id: "2", name: "考勤管理员", createDate: "2017-06-07", isSys: "否",isHr:"是",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
        {id: "3", name: "薪酬管理员", createDate: "2017-06-07", isSys: "否",isHr:"是",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
        {id: "4", name: "培训管理员", createDate: "2017-06-07", isSys: "否",isHr:"是",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
        {id: "5", name: "招聘管理员", createDate: "2017-06-07", isSys: "否",isHr:"是",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
        {id: "6", name: "绩效管理员", createDate: "2017-06-07", isSys: "否",isHr:"是",isLeader:"否",operate:'<button class="btn btn-sm" onclick="sys_pms_role_findUser()">查看用户</button><button class="btn btn-sm" onclick="sys_pms_role_grant()">授权</button>'},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#roleList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
//初始化角色下的用户列表
function initRoleUserList(){
    //创建jqGrid组件
    jQuery("#roleUserList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '姓名', '登录名', '状态','人员类别','所属管理员','性别','机构','部门','岗位'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'loginName', index: 'loginName', width: 100, align: "center"},
                {name: 'status', index: 'status', width: 100, align: "center"},
                {name: 'type', index: 'type', width: 100, align: "center"},
                {name: 'belongRole', index: 'belongRole', width: 100, align: "center"},
                {name: 'sex', index: 'sex', width: 100, align: "center"},
                {name: 'orgId', index: 'orgId', width: 100, align: "center"},
                {name: 'deptId', index: 'deptId', width: 100, align: "center"},
                {name: 'postId', index: 'postId', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "张三", loginName: "zhangsan", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务一部",postId:'总裁'},
        {id: "2", name: "张三1", loginName: "zhangsan2", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务二部",postId:'总裁'},
        {id: "3", name: "张三2", loginName: "zhangsan3", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务三部",postId:'总裁'},
        {id: "4", name: "张三3", loginName: "zhangsan3", status: "有效",type:"合同工",belongRole:"管理员",sex:"男",orgId:"鑫苑总部",deptId:"业务四部",postId:'总裁'},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#roleUserList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 初始化模块列表
 */
function initSysPmsModuleList(){
//创建jqGrid组件
    jQuery("#sysPmsModuleList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '模块名称','操作'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'operate', index: 'operate', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#psysPmsModuleList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "机构岗位模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "2", name: "人员模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "3", name: "合同模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "4", name: "绩效模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "5", name: "薪酬模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "6", name: "培训模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "7", name: "招聘模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'},
        {id: "8", name: "系统模块",operate:'<button class="btn btn-sm" onclick="sys_pms_menu()">查看菜单</button>'}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysPmsModuleList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化菜单列表
 */
function initSysPmsMenuList(){
//创建jqGrid组件
    jQuery("#sysPmsMenuList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '菜单名称','treeId','菜单地址'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'treeId', index: 'treeId', width: 100, align: "center"},
                {name: 'href', index: 'href', width: 100, align: "left"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#psysPmsMenuList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "机构与岗位",treeId:"00010001",href:"org_list.html"},
        {id: "1", name: "标准岗位",treeId:"00010002",href:"post_list.html"},
        {id: "1", name: "职级管理",treeId:"00010003",href:"org_rank_list.html"},
        {id: "1", name: "编制管理",treeId:"00010004",href:"org_size_list.html"},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysPmsMenuList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化参数设置
 */
function initParameterList(){
    //创建jqGrid组件
    jQuery("#parameterList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '参数名','所属模块','参数值'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'moduleId', index: 'moduleId', width: 100, align: "center"},
                {name: 'value', index: 'value', width: 100, align: "left"}
            ],
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pparameterList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "机构编制管控方式",moduleId:"机构岗位模块",value:"强管控"},
        {id: "2", name: "通知方式",moduleId:"培训模块",value:"MI通知"},
        {id: "3", name: "免税额",moduleId:"薪酬模块",value:"3500"},
        {id: "4", name: "考勤方式",moduleId:"考勤模块",value:"打卡"},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#parameterList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
//处理日期选择
function dateTime() {
    //定义datatimepicker的日期格式
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });
}
//初始化日期控件
function dateTime1() {
    $('.form_datetime1').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });
}
//查询指标集列表
function sys_info_set(){
    window.location.href = 'sys_info_set.html';
}
//查询指标项列表
function sys_info_item(){
    window.location.href = 'sys_info_item.html';
}
//查询代码集列表
function sys_code_set(){
    window.location.href = 'sys_code_set.html';
}

//修改密码
function sys_pms_user_modifyPassword(){
    window.open('sys_pms_user_modifyPassword.html');
}
//查询拥有该角色的用户
function sys_pms_role_findUser(){
    window.location.href = 'sys_role_userList.html';
}
function sys_pms_role(){
    window.location.href = 'sys_role_info.html';
}
//给角色授权
function sys_pms_role_grant(){
    window.location.href ='sys_role_grant.html';
}
//模块列表
function sys_pms_module(){
    window.location.href ='sys_module.html';
}
//菜单列表
function sys_pms_menu(){
    window.location.href ='sys_menu.html';
}
/**
 * 删除确认
 */
function delConfirm() {
    $.xljUtils.confirm("blue", "是否确认删除?", function () {
        $.xljUtils.tip("green", "数据删除成功！");
    }, true);
}
/**
 * 删除行
 * @param tableId   表格的id
 * @param removeButtonId    删除按钮的id
 */
function deleteRow(tableId, removeButtonId) {
    $("#" + removeButtonId).bind("click", function () {
        var selectedRowIds = $("#" + tableId).jqGrid("getGridParam", "selarrrow"); //删除多行
        if (selectedRowIds == "") {
            $.xljUtils.tip('red', '请选择要删除的行！');
            return;
        } else {
            var len = selectedRowIds.length;
            for (var i = 0; i < len; i++) {
                $("#" + tableId).jqGrid("delRowData", selectedRowIds[0]);
            }
            $.xljUtils.tip("green", "数据删除成功！");
        }
    })
}

