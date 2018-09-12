/**
 * lixd
 * 自助模块js
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
    var w_h = $(window).height();//673 是浏览器窗口的高度
    $(".slide-left .ztree-box").height((w_h - 100) + "px");
    //右侧table 2个列表
    $(".con-table .mytable").height((w_h - 180) / 2 + "px");
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 100) + "px");

}
//计算表格宽度
function resizeGrid() {
    //右边两个列表
    //设置table的高度比mytable高度小一点
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width()-2, true);

    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {
    //初始化高度
    resizeHeight();
    //========课程库=========
    initJqGridSubjectKuList();
    //========我的课程======
    //========正学======
    initJqGridMySubjectList();
    //========已学======
    initJqGridMySubject1List();
    //========我的考试======
    initJqGridMyTest();
    //=========人员信息================
    //工作经历
    workHistoryList();
    //教育经历
    eduHistoryList();

    //处理日期选择	1
    dateTime();
    //初始化日期控件 只有年月日
    initDatetimepicker();
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
    resizeGrid();
});
/**
 * 初始化课程库列表
 */
function initJqGridSubjectKuList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#subjectKu").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            jsonReader: {
                root: "result"
            },
            width: $('.mytable1').width(),
            height: $('.mytable1').height(),
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'type', label: "课程类别", width: 150, align: "center"},
                {name: 'name', label: "课程名称", width: 150, align: "center"},
                {name: 'period', label: "课程学分", width: 100, align: "center"},
                {name: 'ourseware', label: "课件", width: 80, align: "center"},
                {name: 'teacher', label: "讲师", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'remark', label: "课程简介", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'org', label: "所属机构", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'ifPublic', label: "是否公开", width: 100, align: "center", sortable: false, align: "center"},
                {name: 'ifDownload', label: "允许下载", width: 100, align: "center", sortable: false, align: "center"},
                {name: 'ifExam', label: "是否考试", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'paper', label: "关联试卷", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'hasSelect', label: "是否已选课", width: 100, align: "center", sortable: false, align: "center"}
            ],
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                $.xljUtils.resizeNestedGrid();
            },
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'name',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    //创建jqGrid组件
    var mydata = [
        {
            id: "1",
            type: "鑫员工类",
            name: "入职培训-鑫苑品牌",
            period: "10.0",
            ourseware:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-download-alt"></span></button>',
            teacher: "张三",
            remark: "介绍公司企业文化的构成",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "企业文化",
            hasSelect: "未选择"
        },
        {
            id: "2",
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-download-alt"></span></button>',
            teacher: "李四",
            remark: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            hasSelect: "已选择"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#subjectKu").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化我的正学课程列表
 */
function initJqGridMySubjectList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#mySubject").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            jsonReader: {
                root: "result"
            },
            width:$('.mytable1').width(),
            heigth:$('.mytable1').height(),
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id',            label: "序号", width: 55, align: "center"},
                {name: 'name',          label: "课程名称", width: 100, align: "center"},
                {name: 'beginDate',     label: "起始时间", width: 100, align: "center"},
                {name: 'endDate',       label: "结束时间", width: 100, align: "center"},
                {name: 'time',          label: "次数", width: 100, align: "center"},
                {name: 'progress',      label: "进度", width: 80, align: "center"},
                {name: 'study',       label: "学习", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'exam',   label: "考试", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'note',           label: "笔记", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'remark',      label: "评论", width: 150, align: "center", sortable: false, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    //创建jqGrid组件
    var mydata = [
        {
            id:"1",
            name:"企业文化",
            beginDate:"2017-5-23 16:14:23",
            endDate:"2017-5-23 16:14:34",
            time:"1",
            progress:'<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 40%;"><span class="sr-only">40% 完成</span></div></div>',
            study:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            exam:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            note:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th"></span></button>',
            remark:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span></button>'
        },
        {
            id:"1",
            name:"企业文化",
            beginDate:"2017-5-23 16:14:23",
            endDate:"2017-5-23 16:14:34",
            time:"1",
            progress:'<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"><span class="sr-only">60% 完成</span></div></div>',
            study:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            exam:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            note:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th"></span></button>',
            remark:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span></button>'
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#mySubject").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 初始化我的已学课程列表
 */
function initJqGridMySubject1List() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#mySubject1").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            jsonReader: {
                root: "result"
            },
            width: $('.mytable1').width(),
            height: $('.mytable1').height(),
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id',            label: "序号", width: 55, align: "center"},
                {name: 'name',          label: "课程名称", width: 100, align: "center"},
                {name: 'beginDate',     label: "起始时间", width: 100, align: "center"},
                {name: 'endDate',       label: "结束时间", width: 100, align: "center"},
                {name: 'time',          label: "次数", width: 100, align: "center"},
                {name: 'progress',      label: "进度", width: 80, align: "center"},
                {name: 'study',       label: "学习", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'exam',   label: "考试", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'note',           label: "笔记", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'remark',      label: "评论", width: 150, align: "center", sortable: false, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    //创建jqGrid组件
    var mydata = [
        {
            id:"1",
            name:"企业文化111",
            beginDate:"2017-5-23 16:14:23",
            endDate:"2017-5-23 16:14:34",
            time:"1",
            progress:'<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"><span class="sr-only">60% 完成</span></div></div>',
            study:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            exam:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            note:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th"></span></button>',
            remark:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span></button>'
        },
        {
            id:"1",
            name:"企业文化",
            beginDate:"2017-5-23 16:14:23",
            endDate:"2017-5-23 16:14:34",
            time:"1",
            progress:'<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"><span class="sr-only">60% 完成</span></div></div>',
            study:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            exam:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button>',
            note:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th"></span></button>',
            remark:'<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span></button>'
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#mySubject1").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/*
 * 初始化我的考试列表
 */
function initJqGridMyTest() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#mytest").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            jsonReader: {
                root: "result"
            },
            width: $('.mytable1').width(),
            height: $('.mytable1').height(),
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'name', label: "名称", width: 100, align: "center"},
                {name: 'beginDate', label: "起始时间", width: 100, align: "center"},
                {name: 'endDate', label: "结束时间", width: 100, align: "center"},
                {name: 'hour', label: "考试时长", width: 100, align: "center"},
                {name: 'type', label: "答卷方式", width: 80, align: "center"},
                {name: 'status', label: "状态", width: 100, align: "center", sortable: false, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true
        });
    //创建jqGrid组件
    var mydata = [
        {
            id: "1",
            name: "业务培训",
            period: "10.0",
            beginDate: "2017-5-22 09:00:00",
            endDate: "2017-5-22 10:00:00",
            hour: "60",
            type: "整版",
            status: "启动"
        },
        {
            id: "2",
            name: "业务培训",
            period: "10.0",
            beginDate: "2017-5-22 09:00:00",
            endDate: "2017-5-22 10:00:00",
            hour: "60",
            type: "整版",
            status: "启动"
        },
        {
            id: "3",
            name: "业务培训",
            period: "10.0",
            beginDate: "2017-5-22 09:00:00",
            endDate: "2017-5-22 10:00:00",
            hour: "60",
            type: "整版",
            status: "启动"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#mytest").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 学习经历列表
 */
function eduHistoryList() {
    var ubody = "sys/org/post/queryPostListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridPost = jQuery("#eduHistory").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": ""},
            datatype: "json",
            rownumbers: false,
            multiselect: true,//多选
            width: $('.table2').width(),
            height: $('.table2').height(),
            jsonReader: {
                root: "result"
            },
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 100, align: "center"},
                {name: 'node', label: '节点名称', width: 250, align: "center"},
                {name: 'post', label: '岗位', width: 250, align: "center"},
                {name: 'charge', label: '责任人', width: 180, align: "center"},
                {name: 'option', label: '操作', width: 100, align: "center"},
                {name: 'idea', label: '处理意见', width: 100, align: "center"},
                {name: 'handle', label: '处理时间', width: 400, align: "center"}
            ],
            rowNum: -1,//一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            onCellSelect: function (rowid) {
                var queryData = {
                    "postId": rowid
                };
                jqGridPostUser.jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            viewrecords: true
        }).navGrid('#pager2', {add: false, edit: false, del: false, search: false, refresh: false});
    //灌值
    var mydata = [
        {
            id: "1",
            node: "发起",
            post: "岗位1",
            charger: "张三",
            option: "发起",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "2",
            node: "复审",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "3",
            node: "审批",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "3",
            node: "结束",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#eduHistory").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 工作经历列表
 */
function workHistoryList() {
    //alert($('.mytable1').width());
    //alert($('.mytable1').height() - 70);
    var ubody = "sys/org/post/queryPostListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridPost = jQuery("#workHistory").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": ""},
            datatype: "json",
            rownumbers: false,
            multiselect: true,//多选
            width: $('.table1').width(),
            height: $('.table1').height(),
            jsonReader: {
                root: "result"
            },
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 100, align: "center"},
                {name: 'node', label: '节点名称', width: 250, align: "center"},
                {name: 'post', label: '岗位', width: 250, align: "center"},
                {name: 'charge', label: '责任人', width: 180, align: "center"},
                {name: 'option', label: '操作', width: 100, align: "center"},
                {name: 'idea', label: '处理意见', width: 100, align: "center"},
                {name: 'handle', label: '处理时间', width: 400, align: "center"}
            ],
            rowNum: -1,//一页显示多少条
            pager: '#pager2',//表格页脚的占位符(一般是div)的id
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            onCellSelect: function (rowid) {
                var queryData = {
                    "postId": rowid
                };
                jqGridPostUser.jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
            viewrecords: true
        }).navGrid('#pager2', {add: false, edit: false, del: false, search: false, refresh: false});
    //灌值
    var mydata = [
        {
            id: "1",
            node: "发起",
            post: "岗位1",
            charger: "张三",
            option: "发起",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "2",
            node: "复审",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "3",
            node: "审批",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }, {
            id: "3",
            node: "结束",
            post: "岗位1",
            charger: "张三",
            option: "通过",
            idea: "请审批",
            handle: "2017-5-22 15:27:36"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#workHistory").jqGrid('addRowData', i + 1, mydata[i]);
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
 * 显示课程库
 */
function showSbujectKe() {
    window.location.href = "self_courseLibrary.html";
}
//显示我的课程
function showMySbuject() {
    window.location.href = "self_myCourse.html";
}
/**
 * 新增(行内)
 */
function toAdd() {
    var dataRow = {
        id: "5",
        code: "104",
        name: "副总裁",
        seq: "管理序列",
        upcode: "-1",
        upname: "",
        status: "有效",
        remark: "",
        operate: ""
    };
    //将新添加的行插入到第一列
    $("#postList").jqGrid("addRowData", '5', dataRow);
    $("#postList").setColProp("showType", {editable: true});
    $("#postList").setColProp("code", {editable: true});
    $("#postList").jqGrid('editRow', '5', true);
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.gridResizeFn();
    $("#cancelButton").show();
}
/**
 * 新增后的取消
 */
function cancel() {
    $('#postList').jqGrid().trigger("reloadGrid");
    $("#cancelButton").hide();
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
 * 选课确认
 */
function selectSubjectConfirm() {
    $.xljUtils.tip('', "选择成功");
}

//初始化日期控件
function initDatetimepicker() {
    var picker1 = $('#datetimepicker1').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });
}
//自助 我的课程 已学课程||未学课程的切换
$(".right-content .con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");//同胞移除激活状态的样式
    $(this).addClass("active");//自己激活
    //如果有这个样式
    if($(this).attr('class').indexOf('zhengxue') > 0){
        $("#zhengxue").css("display","block");
        $("#yixue").css("display","none");
    }else{
        $("#zhengxue").css("display","none");
        $("#yixue").css("display","block");
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});
/**
 * 删除行
 * @param tableId   表格的id
 * @param removeButtonId    删除按钮的id
 */
function deleteRow(tableId,removeButtonId) {
    $("#"+removeButtonId).bind("click", function () {
        var selectedRowIds = $("#" + tableId).jqGrid("getGridParam", "selarrrow"); //删除多行
        if (selectedRowIds == "") {
            $.xljUtils.tip('red', '请选择要删除的行！');
            return;
        } else {
            var len = selectedRowIds.length;
            for (var i = 0; i < len; i++) {
                $("#" + tableId).jqGrid("delRowData", selectedRowIds[0]);
            }
            $.xljUtils.tip("green","数据删除成功！");
        }
    })
}