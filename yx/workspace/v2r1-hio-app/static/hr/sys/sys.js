/**
 * lixd
 * 系统模块js
 */
//手动的调整窗口时
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});
//计算表格的高度	1
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 100) + "px");
    //右侧table 2个列表
    $(".con-table .mytable").height((w_h - 180) / 2 + "px");
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 200) + "px");
}
//计算表格宽度
function resizeGrid() {
    //右边两个列表
    //设置table的高度比mytable高度小一点
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {
    //初始化高度
    resizeHeight();

    //初始化指标集列表
    initSysInfoSetList();
    //初始化指标项列表
    initSysInfoItemList();
    //初始化代码集列表
    initSysCodeSetList();
    //初始化代码项列表
    initSysCodeItemList();

    //初始化用户列表
    initUserList();

    //初始化角色列表
    initRoleList();
    //初始化角色下的用户列表
    initRoleUserList();

    //初始化模块列表
    initSysPmsModuleList();
    //初始化菜单列表
    initSysPmsMenuList();

    //初始化参数列表
    initParameterList();

    //处理日期选择	1
    dateTime();
    dateTime1();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
    $("#saveDemo").click(function () {
        $.xljUtils.tip('green', '保存成功！');
    });
    //树加滚动条
    setTimeout(function(){
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
    },300);
    //在加载完表格后，设置表格的宽度
    resizeGrid();
});
/**
 * 初始化指标集列表
 */
function initSysInfoSetList() {
    //创建jqGrid组件
    jQuery("#sysInfoSetList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '指标集编码', '名称', '范围', '记录类型', '显示顺序', '状态', '操作'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 20, align: "center"},
                {name: 'code', index: 'code', width: 100, align: "left"},
                {name: 'name', index: 'name', width: 50, align: "center"},
                {name: 'scope', index: 'scope', width: 50, align: "center"},
                {name: 'rptype', index: 'rptype', width: 100, align: "center"},
                {name: 'sort', index: 'sort', width: 50, align: "center"},
                {name: 'status', index: 'status', width: 50, align: "center"},
                {name: 'operate', index: 'operate', width: 50, align: "center"}
            ],
            autoWidth: true,
            width:$('.mytable1').width(),
            height:$('.mytable1').height(),
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
            //multiboxonly:true//单选
        });
    var mydata = [
        {
            id: "1",
            code: "hr_emp_personInfo",
            name: "人员基本信息子集",
            rptype:"单记录",
            scope: "国标",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        },
        {
            id: "2",
            code: "hr_emp_workInfo",
            name: "工作经历子集",
            rptype:"多记录",
            scope: "系统",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        },
        {
            id: "3",
            code: "hr_emp_educationInfo",
            name: "学习经历子集",
            rptype:"多记录",
            scope: "系统",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        }
        ,
        {
            id: "4",
            code: "hr_emp_familyInfo",
            name: "家庭信息子集",
            rptype:"多记录",
            scope: "系统",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        },
        {
            id: "5",
            code: "hr_org_organization",
            name: "机构信息子集",
            rptype:"单记录",
            scope: "系统",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        },
        {
            id: "6",
            code: "hr_org_post",
            name: "岗位信息子集",
            rptype:"单记录",
            scope: "系统",
            sort: "1",
            status: "有效",
            operate: '<button class="btn btn-sm" onclick="sys_info_item()">查看指标</button>'
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysInfoSetList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化指标项列表
 */
function initSysInfoItemList() {
    //创建jqGrid组件
    jQuery("#sysInfoItemList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '名称', '指标项编号', '范围','是否必填项','数据类型','显示顺序','状态'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'code', index: 'code', width: 100, align: "center"},
                {name: 'scope', index: 'scope', width: 100, align: "center"},
                {name: 'isnecessary', index: 'isnecessary', width: 100, align: "center"},
                {name: 'type', index: 'type', width: 100, align: "center"},
                {name: 'sort', index: 'sort', width: 100, align: "center"},
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
        {id: "1", name: "姓名", code: "name", scope: "国际",isnecessary:"是",type:"文本",sort:"1",status:"有效"},
        {id: "2", name: "工号", code: "code", scope: "国际",isnecessary:"是",type:"文本",sort:"2",status:"有效"},
        {id: "3", name: "性别", code: "sex", scope: "国际",isnecessary:"是",type:"代码",sort:"3",status:"有效"},
        {id: "4", name: "年龄", code: "age", scope: "国际",isnecessary:"是",type:"整数",sort:"4",status:"有效"},
        {id: "5", name: "证件", code: "cardType", scope: "国际",isnecessary:"是",type:"代码",sort:"5",status:"有效"},
        {id: "6", name: "证件号码", code: "idCard", scope: "国际",isnecessary:"是",type:"文本",sort:"6",status:"有效"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysInfoItemList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 初始化代码集列表
 */
function initSysCodeSetList() {
    //创建jqGrid组件
    jQuery("#sysCodeSetList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '名称', '国际代码', '范围','录入标志','状态','操作'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"},
                {name: 'i18n', index: 'i18n', width: 100, align: "center"},
                {name: 'scope', index: 'scope', width: 100, align: "center"},
                {name: 'inputLevel', index: 'isnecessary', width: 100, align: "center"},
                {name: 'status', index: 'status', width: 100, align: "center"},
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
        {id: "1", name: "是否", i18n:"",scope: "国际",inputLevel:"录到任意层",status:"有效",operate:'<button class="btn btn-sm" onclick="sys_code_item()">查看代码</button>'},
        {id: "2", name: "性别", i18n:"",scope: "国际",inputLevel:"录到任意层",status:"有效",operate:'<button class="btn btn-sm" onclick="sys_code_item()">查看代码</button>'},
        {id: "3", name: "民族", i18n:"",scope: "国际",inputLevel:"录到任意层",status:"有效",operate:'<button class="btn btn-sm" onclick="sys_code_item()">查看代码</button>'},
        {id: "4", name: "薪酬等级", i18n:"",scope: "国际",inputLevel:"录到任意层",status:"有效",operate:'<button class="btn btn-sm" onclick="sys_code_item()">查看代码</button>'},
        {id: "5", name: "职级", i18n:"",scope: "国际",inputLevel:"录到任意层",status:"有效",operate:'<button class="btn btn-sm" onclick="sys_code_item()">查看代码</button>'}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#sysCodeSetList").jqGrid('addRowData', i + 1, mydata[i]);
    }
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
//查询代码项列表
function sys_code_item(){
    window.location.href = 'sys_code_item.html';
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

