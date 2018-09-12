/**
 * lixd
 * 角色授权js
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
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 200) + "px");
}
//计算表格宽度
function resizeGrid() {
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {
    //初始化高度
    resizeHeight();

    //初始化信息项授权
    initSysInfoItemGrantList();
    //机构查询
    //初始化有权机构列表
    initHasRightOrgList();
    //初始化无权机构列表
    initNoRightOrgList();
    //机构编辑
    //初始化有权机构列表
    initHasRightOrgList1();
    //初始化无权机构列表
    initNoRightOrgList1();
    //初始化薪酬范围列表
    initWageScopeList();

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
 * 初始化信息项权限列表
 */
function initSysInfoItemGrantList(){
    var mydata = [
        {id:"1",setName:"人员基本信息子集",itemName:"姓名",operate:'<input name="name" type="radio" name="10" value="1"/>拒绝<input name="name" type="radio" se="11" value="2"/>读<input name="name" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"2",setName:"人员基本信息子集",itemName:"工号",operate:'<input name="code" type="radio" se="10" value="1"/>拒绝<input name="code" type="radio" se="11" value="2"/>读<input name="code" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"3",setName:"人员基本信息子集",itemName:"身份证号",operate:'<input name="idCard" type="radio" se="10" value="1"/>拒绝<input name="idCard" type="radio" se="11" value="2"/>读<input name="idCard" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"4",setName:"人员基本信息子集",itemName:"性别",operate:'<input name="sex" type="radio" se="10" value="1"/>拒绝<input name="sex" type="radio" se="11" value="2"/>读<input name="sex" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"5",setName:"人员基本信息子集",itemName:"出生地",operate:'<input name="jiguan" type="radio" se="10" value="1"/>拒绝<input name="jiguan" type="radio" se="11" value="2"/>读<input name="jiguan" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"6",setName:"人员基本信息子集",itemName:"年龄",operate:'<input name="age" type="radio" se="10" value="1"/>拒绝<input name="age" type="radio" se="11" value="2"/>读<input name="age" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"7",setName:"人员基本信息子集",itemName:"出生日期",operate:'<input name="birthday" type="radio" se="10" value="1"/>拒绝<input name="birthday" type="radio" se="11" value="2"/>读<input name="birthday" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"8",setName:"人员基本信息子集",itemName:"最高学位",operate:'<input name="maxDegree" type="radio" se="10" value="1"/>拒绝<input name="maxDegree" type="radio" se="11" value="2"/>读<input name="maxDegree" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"9",setName:"人员基本信息子集",itemName:"最高学历",operate:'<input name="maxEdu" type="radio" se="10" value="1"/>拒绝<input name="maxEdu" type="radio" se="11" value="2"/>读<input name="maxEdu" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"10",setName:"人员基本信息子集",itemName:"薪酬等级",operate:'<input name="wageLevel" type="radio" se="10" value="1"/>拒绝<input name="wageLevel" type="radio" se="11" value="2"/>读<input name="wageLevel" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"11",setName:"机构基本信息子集",itemName:"机构名称",operate:'<input name="orgname" type="radio" se="10" value="1"/>拒绝<input name="orgname" type="radio" se="11" value="2"/>读<input name="orgname" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"12",setName:"机构基本信息子集",itemName:"机构代码",operate:'<input name="orgcode" type="radio" se="10" value="1"/>拒绝<input name="orgcode" type="radio" se="11" value="2"/>读<input name="orgcode" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"13",setName:"机构基本信息子集",itemName:"机构负责人",operate:'<input name="chargeId" type="radio" se="10" value="1"/>拒绝<input name="chargeId" type="radio" se="11" value="2"/>读<input name="chargeId" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"14",setName:"机构基本信息子集",itemName:"机构全称",operate:'<input name="fullname" type="radio" se="10" value="1"/>拒绝<input name="fullname" type="radio" se="11" value="2"/>读<input name="fullname" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"15",setName:"岗位基本信息子集",itemName:"岗位名称",operate:'<input name="postName" type="radio" se="10" value="1"/>拒绝<input name="postName" type="radio" se="11" value="2"/>读<input name="postName" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"16",setName:"岗位基本信息子集",itemName:"岗位代码",operate:'<input name="postcode" type="radio" se="10" value="1"/>拒绝<input name="postcode" type="radio" se="11" value="2"/>读<input name="postcode" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"17",setName:"岗位基本信息子集",itemName:"岗位序列",operate:'<input name="seq" type="radio" se="10" value="1"/>拒绝<input name="seq" type="radio" se="11" value="2"/>读<input name="seq" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
        {id:"18",setName:"岗位基本信息子集",itemName:"状态",operate:'<input name="status" type="radio" se="10" value="1"/>拒绝<input name="status" type="radio" se="11" value="2"/>读<input name="status" type="radio" CHECKED="checked" se="12" value="3"/>写'} ,
    ];
    jQuery("#list48").jqGrid({
        data: mydata,
        datatype: "local",
        height: 'auto',
        rowNum: 30,
        rowList: [10,20,30],
        colNames:['序号','指标集名称', '指标项名称', '操作权限'],
        colModel:[
            {name:'id',index:'id', width:60, sorttype:"int"},
            {name:'setName',index:'setName', width:90,hidden : true},
            {name:'itemName',index:'itemName', width:100},
            {name:'operate',index:'amount', width:80}
        ],
        width:$('.mytable1').width(),
        height:$('mytable1').height(),
        gridComplete: function () {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
        },
        //pager: "#plist48",
        viewrecords: true,//是否要显示总记录数
        sortname: 'setName',//排序名
        grouping:true,
        groupingView : {
            groupField : ['setName']
        },
        caption: "子集操作权限设置"
    });
}
/**
 * 初始化机构查询 有权查询列表
 */
function initHasRightOrgList(){
//创建jqGrid组件
    jQuery("#hasRightOrgList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '机构名称',],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"}
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
            pager: '#phasRightOrgList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "鑫苑集团1部"},
        {id: "2", name: "鑫苑集团2部"},
        {id: "3", name: "鑫苑集团3部"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#hasRightOrgList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化机构查询 无权查询列表
 */
function initNoRightOrgList(){
//创建jqGrid组件
    jQuery("#noRightOrgList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '机构名称',],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"}
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
            pager: '#pnoRightOrgList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "鑫苑集团4部"},
        {id: "2", name: "鑫苑集团5部"},
        {id: "3", name: "鑫苑集团6部"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#noRightOrgList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化机构编辑 有权查询列表
 */
function initHasRightOrgList1(){
//创建jqGrid组件
    jQuery("#hasRightOrgList1").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '机构名称',],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"}
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
            pager: '#phasRightOrgList1',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "鑫苑集团1部"},
        {id: "2", name: "鑫苑集团2部"},
        {id: "3", name: "鑫苑集团3部"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#hasRightOrgList1").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化机构编辑 无权查询列表
 */
function initNoRightOrgList1(){
//创建jqGrid组件
    jQuery("#noRightOrgList1").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '机构名称',],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"}
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
            pager: '#pnoRightOrgList1',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "鑫苑集团4部"},
        {id: "2", name: "鑫苑集团5部"},
        {id: "3", name: "鑫苑集团6部"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#noRightOrgList1").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化机构范围权限
 */
function initWageScopeList(){
    alert($('.mytable1').width());
    //创建jqGrid组件
    jQuery("#wageScopeList").jqGrid(
        {
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: ['序号', '薪酬组织名称'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', index: 'id', width: 100, align: "center"},
                {name: 'name', index: 'name', width: 100, align: "center"}
            ],
            width:$('.mytable1').width(),
            //width:1700,
            height:$('.mytable1').height(),
            //height:1500,
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            autoWidth: true,
            rowNum: 50,//一页显示多少条
            rowList: [10, 20, 30],//可供用户选择一页显示多少条
            pager: '#pwageScopeList',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    var mydata = [
        {id: "1", name: "鑫苑集团4部"},
        {id: "2", name: "鑫苑集团5部"},
        {id: "3", name: "鑫苑集团6部"}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#wageScopeList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

function sys_pms_role(){
    window.location.href = 'sys_role_info.html';
}
//给角色授权
function sys_pms_role_grant(){
    window.location.href ='sys_role_grant.html';
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
//角色授权 菜单操作权限|信息项权限|机构查询权限|机构维护权限|人员范围权限|薪酬范围权限的切换
$(".con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");//同胞移除激活状态的样式
    $(this).addClass("active");//自己激活

    //如果有这个样式 展示出来
    //菜单操作权限
    if($(this).attr('class').indexOf('sysPmsOperate') > 0){
        $("#sysPmsOperate").css("display","block");
        $("#sysInfoItem").css("display","none");
        $("#orgQuery").css("display","none");
        $("#orgEdit").css("display","none");
        //$("#personScope").css("display","none");
        $("#wageScope").css("display","none");
    }
    //信息项权限
    else if($(this).attr('class').indexOf('sysInfoItem') > 0){
        $("#sysPmsOperate").css("display","none");
        $("#sysInfoItem").css("display","block");
        $("#orgQuery").css("display","none");
        $("#orgEdit").css("display","none");
        //$("#personScope").css("display","none");
        $("#wageScope").css("display","none");
        //切换后重置一下大小
        resizeHeight();
        resizeGrid();
    }
    //机构查询权限
    else if($(this).attr('class').indexOf('orgQuery') > 0){
        $("#sysPmsOperate").css("display","none");
        $("#sysInfoItem").css("display","none");
        $("#orgQuery").css("display","block");
        $("#orgEdit").css("display","none");
        //$("#personScope").css("display","none");
        $("#wageScope").css("display","none");
    }
    //机构维护权限
    else if($(this).attr('class').indexOf('orgEdit') > 0){
        $("#sysPmsOperate").css("display","none");
        $("#sysInfoItem").css("display","none");
        $("#orgQuery").css("display","none");
        $("#orgEdit").css("display","block");
        //$("#personScope").css("display","none");
        $("#wageScope").css("display","none");
    }
    ////人员范围权限
    //else if($(this).attr('class').indexOf('personScope') > 0){
    //    $("#sysPmsOperate").css("display","none");
    //    $("#sysInfoItem").css("display","none");
    //    $("#orgQuery").css("display","none");
    //    $("#orgEdit").css("display","none");
    //    //$("#personScope").css("display","block");
    //    $("#wageScope").css("display","none");
    //}
    //薪酬范围权限
    else if($(this).attr('class').indexOf('wageScope') > 0){
        $("#sysPmsOperate").css("display","none");
        $("#sysInfoItem").css("display","none");
        $("#orgQuery").css("display","none");
        $("#orgEdit").css("display","none");
        //$("#personScope").css("display","none");
        $("#wageScope").css("display","block");
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();//停止派发事件
});

