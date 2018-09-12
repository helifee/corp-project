/**
 * list.html中Grid高度自适应，注：其他不同结构的页面请重新计算
 *
 */
function computeGridHeight() {
    return $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 83;
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 80) + "px");
    //右侧table
    $(".con-table .mytable").height((w_h - 110) + "px");
}
//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    $.xljUtils.gridResizeFn();
}
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});


/**
 * 样式格式化
 * @param rowId
 * @param val
 * @param rowObject
 * @param cm
 * @param rdata
 * @returns {String}
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if (rowObject.status == "0") {
        return "style='color:red'";
    }
}

//初始化日期控件
function initDatetimepicker() {
    var picker = $('.datetimepicker').datetimepicker({
        language: 'zh-CN', //语言
        format: 'yyyy-mm-dd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    });

    $('.datetimepicker2').datetimepicker({
        language: 'en',
        format: 'hh:ii',
        startView: 1,
        autoclose: true,
    });
}
/**
 * 打开新窗口
 */
function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}

/**
 * 培训需求
 */
function demandInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listDemand").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            // width:window.screen.availWidth-20,
            // autowidth: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'applyCode', label: "申请单编码", width: 150, align: "center"},
                {name: 'theme', label: "主题", width: 150, align: "center"},
                {name: 'status', label: "审批状态", width: 150, align: "center"},
                // {name: 'approver', label: "当前审批人", width: 150, align: "center"},
                {name: 'applyPerson', label: "申请人", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'name', label: "需求名称", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'type', label: "类型", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'orderOrg', label: "举办机构", width: 250, align: "center", sortable: false, align: "center"},
                {name: 'supervisor', label: "负责人", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'trainAim', label: "培训目标", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'trainContent', label: "培训内容", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'trainStudent', label: "培训对象", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'stratDate', label: "开始时间", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'endDate', label: "结束时间", width: 150, align: "center", sortable: false, align: "center"},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            applyCode: "PX-2017-3-001",
            theme: "公司企业文化培训",
            status: "草稿",
            applyPerson: "张思涵",
            name: "公司企业文化培",
            type: "内部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "张三",
            trainAim: "提高公司文化的认知度",
            trainContent: "资产运营理论",
            trainStudent: "新进员工",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批完成",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批中",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        },
        {
            applyCode: "PX-2017-3-002",
            theme: "资产管理知识培训",
            status: "审批完成",
            applyPerson: "赵琦",
            name: "公司企业文化培",
            type: "外部",
            orderOrg: "鑫苑(中国)/鑫苑总部/人力资源部",
            supervisor: "李四",
            trainAim: "提高公司运营能力",
            trainContent: "企业文化",
            trainStudent: "资产运营人员",
            stratDate: "2017-01-01",
            endDate: "2017-01-31"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listDemand").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 培训需求
 */
function sunjectInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listSubject").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'type', label: "课程类别", width: 150, align: "center"},
                {name: 'name', label: "课程名称", width: 300, align: "center"},
                {name: 'period', label: "课程学分", width: 150, align: "center"},
                {name: 'ourseware', label: "课件", width: 150, align: "center"},
                {name: 'teacher', label: "讲师", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'description', label: "课程简介", width: 200, align: "center", sortable: false, align: "center"},
                {name: 'org', label: "所属机构", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'ifPublic', label: "是否公开", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'ifDownload', label: "允许下载", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'ifExam', label: "是否考试", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'paper', label: "关联试卷", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'times', label: "考试次数", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'status', label: "课程状态", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'creator', label: "创建人", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'createDate', label: "创建时间", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'startDate', label: "开始时间", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'endDate', label: "结束时间", width: 150, align: "center", sortable: false, align: "center"},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            id: "1",
            type: "鑫员工类",
            name: "入职培训-鑫苑品牌",
            period: "10.0",
            ourseware: "",
            teacher: "张三",
            description: "介绍公司企业文化的构成",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "企业文化",
            times: "2",
            status: "有效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        },
        {
            type: "人力资源类",
            name: "人事管理培训",
            period: "10.0",
            ourseware: "",
            teacher: "李四",
            description: "介绍了人事工作",
            org: "鑫苑(中国)",
            ifPublic: "是",
            ifDownload: "是",
            ifExam: "是",
            paper: "",
            times: "2",
            status: "无效",
            creator: "",
            startDate: "",
            endDate: ""
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listSubject").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 题库管理
 */
function themeInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listTheme").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'name', label: "试题名称", width: 300, align: "center"},
                {name: 'type', label: "试题类型", width: 100, align: "center"},
                {name: 'sort', label: "试题分类", width: 100, align: "center"},
                {name: 'difficulty', label: "试题难度", width: 80, align: "center"},
                // {name: 'fraction', label: "试题分数(分)", width: 150, align: "center", sortable: false, align: "center"},
                {name: 'description', label: "说明", width: 300, align: "center", sortable: false, align: "center"},
            ],
            multiselect: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }

        });
    //创建jqGrid组件
    var mydata = [
        {name: "市场最简单、最基本的内容是？", type: "单选题", sort: "信息类", difficulty: "中等", fraction: "10.0", description: ""},
        {name: "企业文化中最基本的形态是？", type: "单选题", sort: "信息类", difficulty: "简单", fraction: "10.0", description: ""},
        {name: "企业文化的作用是什么？", type: "多选题", sort: "人力资源类", difficulty: "简单", fraction: "5.0", description: ""},
        {name: "关于公司企业文化的说法不正确的有？", type: "多选题", sort: "人力资源类", difficulty: "简单", fraction: "5.0", description: ""},
        {name: "在薪资发放时一般需要扣除的项目有那些？", type: "多选题", sort: "人力资源类", difficulty: "简单", fraction: "5.0", description: ""},
        {name: "关于公司企业文化的说法不正确的有？", type: "多选题", sort: "人力资源类", difficulty: "简单", fraction: "5.0", description: ""},
        {
            name: "企业文化结构是指企业文化系统内各要素之间的时空顺序、主次地位和结合",
            type: "判断题",
            sort: "信息类",
            difficulty: "简单",
            fraction: "10.0",
            description: ""
        },
        {name: "企业文化的核心要素是共有价值观", type: "判断题", sort: "信息类", difficulty: "中等", fraction: "10.0", description: ""},
        {
            name: "企业价值观的不同也就决定了企业文化性质和企业的发展方向的不同。",
            type: "判断题",
            sort: "信息类",
            difficulty: "中等",
            fraction: "10.0",
            description: ""
        },
        // {name:"简述塑造企业价值观的方法？", type:"问答题", sort:"信息类",difficulty:"困难", fraction:"10.0", description:""},
        // {name:"简述企业文化的特点？", type:"问答题", sort:"信息类",difficulty:"中等", fraction:"10.0", description:""},
        // {name:"简述冲突的二重性理论？", type:"问答题", sort:"信息类",difficulty:"困难", fraction:"10.0", description:""},


    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listTheme").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 考试计划：试卷
 */
function planPaperInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPlanPaper").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'paperName', label: "试题名称", width: 100, align: "center", sortable: false},
                {name: 'fraction', label: "试卷分值", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {id: "1", paperName: "新员工入职培训考试", fraction: "100.0", duration: "90.0", description: "入职培训考试"},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPlanPaper").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 考试计划：安排人员
 */
function studengArrangedList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listStudengArrange").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'name', label: "姓名", width: 100, align: "center"},
                {name: 'code', label: "人员编号", width: 150, align: "center"},
                {name: 'org', label: "所属机构", width: 300, align: "center"},
                {name: 'post', label: "岗位", width: 150, align: "center", sortable: false},
                {name: 'paperStatus', label: "试卷状态", width: 150, align: "center", sortable: false},
                {name: 'scoringStatus', label: "阅卷状态", width: 150, align: "center", sortable: false},
                {name: 'score', label: "得分", width: 150, align: "center", sortable: false},
                {name: 'time', label: "考试用时", width: 150, align: "center", sortable: false},
                {name: 'times', label: "考试次数", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            name: "张三", code: "zhangsan001", org: "鑫苑(中国)/鑫苑总部/人力资源", post: "人力经理", paperStatus: "已考 ",
            scoringStatus: "已阅", score: "90.0", time: "40.0", times: "1"
        },
        {
            name: "李四", code: "lisi001", org: "鑫苑(中国)/鑫苑总部/人力资源", post: "人力经理", paperStatus: "已考 ",
            scoringStatus: "未阅", score: "100.0", time: "60.0", times: "2"
        },
        {
            name: "谢斌", code: "xiebin001", org: "鑫苑(中国)/鑫苑总部/人力资源", post: "人力经理", paperStatus: "已考 ",
            scoringStatus: "未阅", score: "100.0", time: "60.0", times: "2"
        },
        {
            name: "万茜", code: "wanqian001", org: "鑫苑(中国)/鑫苑总部/人力资源", post: "人力经理", paperStatus: "已考 ",
            scoringStatus: "未阅", score: "100.0", time: "60.0", times: "2"
        },
        {
            name: "邵云", code: "shaoyun001", org: "鑫苑(中国)/鑫苑总部/人力资源", post: "人力经理", paperStatus: "已考 ",
            scoringStatus: "未阅", score: "100.0", time: "60.0", times: "2"
        },
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listStudengArrange").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 课程库：课件信息
 */
function coursewareList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listCourseware").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'name', label: "课件名称", width: 100, align: "center"},
                {name: 'sort', label: "课件分类", width: 100, align: "center"},
                {name: 'duration', label: "课件时长", width: 100, align: "center"},
                {name: 'startDate', label: "开始时间", width: 100, align: "center"},
                {name: 'endDate', label: "结束时间", width: 100, align: "center"},
                {name: 'source', label: "课件来源", width: 150, align: "center", sortable: false},
                {name: 'href', label: "链接地址", width: 150, align: "center", sortable: false},
                // {name: 'ifFastForward', label: "调整播放进度", width: 150, align: "center", sortable: false},
            ],
            multiselect: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
        });
    //创建jqGrid组件
    var mydata = [
        {
            id: "1",
            name: "鑫苑品牌建设（上）",
            sort: "多媒体课件",
            duration: "90",
            startDate: "2010-01-01",
            endDate: "",
            source: "原创",
            href: "",
            ifFastForward: "否",
        },
        {
            id: "2",
            name: "鑫苑品牌建设（下）",
            sort: "多媒体课件",
            duration: "90",
            startDate: "2010-01-01",
            endDate: "",
            source: "原创",
            href: "",
            ifFastForward: "否",
        },
        {
            id: "3",
            name: "鑫苑品牌建设历程",
            sort: "普通课件",
            duration: "15",
            startDate: "2010-01-01",
            endDate: "",
            source: "转载",
            href: "",
            ifFastForward: "是",
        },
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listCourseware").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 课程库：试卷信息
 */
function paperList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaper").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: "序号", width: 55, align: "center", sortable: false},
                {name: 'paperName', label: "试题名称", width: 100, align: "center"},
                {name: 'fraction', label: "试卷分值", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
        });
    //创建jqGrid组件
    var mydata = [
        {id: "1", paperName: "新员工入职培训考试", fraction: "100.0", duration: "90.0", description: "入职培训考试"},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaper").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 *新增课程：试卷信息
 */
function paperForAddList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaperForAdd").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'name', label: "试卷名称", width: 100, align: "center"},
                {name: 'fraction', label: "分值", width: 150, align: "center"},
                {name: 'passLine', label: "通过分数", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
        });
    //创建jqGrid组件
    var mydata = [
        {id: "1", name: "鑫苑品牌建设考核", fraction: "100.0", passLine: "60", duration: "30", description: ""},
        // {id:"2", name:"鑫苑企业文化考核", fraction:"100.0", passLine:"60",duration:"30",description:""},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaperForAdd").jqGrid('addRowData', i + 1, mydata[i]);
    }
}


/**
 *新增课程：试卷信息
 */
function listPaperList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaperList").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'name', label: "试卷名称", width: 100, align: "center"},
                {name: 'fraction', label: "分值", width: 150, align: "center"},
                {name: 'passLine', label: "通过分数", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'status', label: "试卷状态", width: 150, align: "center", sortable: false},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc"//排序方式,可选desc,asc
        });
    //创建jqGrid组件
    var mydata = [
        {name: "鑫苑品牌建设考核", fraction: "100.0", passLine: "60", duration: "30", status:"有效",description: ""},
        {name: "入职培训考试", fraction: "100.0", passLine: "60", duration: "30", status:"有效",description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30",status:"有效", description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30",status:"有效", description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30", status:"有效",description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30", status:"无效",description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30", status:"有效",description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30", status:"无效",description: ""},
        {name: "鑫苑企业文化考核", fraction: "100.0", passLine: "60", duration: "30", status:"有效",description: ""}
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaperList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}


/**
 *考试计划：关联试卷
 */
function paperForPlanList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaperForPlan").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'radio', label: "请选择", width: 55, align: "center", sortable: false},
                {name: 'id', label: "序号", width: 55, align: "center", sortable: false},
                {name: 'name', label: "试卷名称", width: 100, align: "center"},
                {name: 'fraction', label: "分值", width: 150, align: "center"},
                {name: 'passLine', label: "通过分数", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            // multiselect:true,
        });
    //创建jqGrid组件
    var mydata = [
        {
            radio: "<input type='radio'/>",
            id: "1",
            name: "鑫苑品牌建设考核",
            fraction: "100.0",
            passLine: "60",
            duration: "30",
            description: ""
        },
        {
            radio: "<input type='radio'/>",
            id: "2",
            name: "鑫苑企业文化考核",
            fraction: "100.0",
            passLine: "60",
            duration: "30",
            description: ""
        },
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaperForPlan").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 *培训统计：学习情况分析表
 */
function plannedSpeedList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPlannedSort").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'orgName', label: "单位", width: 100, align: "center"},
                {name: 'dept', label: "部门", width: 150, align: "center"},
                {name: 'sort', label: "培训类别", width: 150, align: "center", sortable: false},
                {name: 'number', label: "合计培训人数", width: 150, align: "center", sortable: false},
                {name: 'period', label: "合计培训课时", width: 150, align: "center", sortable: false},
                {name: 'fee', label: "合计培训费用", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            orgName: "郑州二七公司", dept: "", sort: "入职培训", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "济南分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "徐州分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "西安分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "上海分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "北京分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "成都分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "昆山分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "长沙分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "长沙分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "长沙分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "苏州分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "苏州分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "苏州分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "合肥分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "合肥分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },
        {
            orgName: "合肥分公司", dept: "", sort: "企业文化", number: "20",
            period: "40.0", fee: "20000"
        },

    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPlannedSort").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 *培训统计：培训类别分析表
 */
function plannedSortList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPlannedSpeed").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'orgName', label: "单位名称", width: 100, align: "center"},
                {name: 'dept', label: "部门", width: 150, align: "center"},
                {name: 'post', label: "岗位", width: 150, align: "center"},
                {name: 'perName', label: "姓名", width: 100, align: "center"},
                {name: 'className', label: "课程名称", width: 150, align: "center", sortable: false},
                {name: 'startDate', label: "起始时间", width: 150, align: "center", sortable: false},
                {name: 'endDate', label: "终止时间", width: 150, align: "center", sortable: false},
                {name: 'duration', label: "时长", width: 150, align: "center", sortable: false},
                {name: 'times', label: "次数", width: 150, align: "center", sortable: false},
                {name: 'progress', label: "进度", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "入职考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "1",
            progress: "0%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },
        {
            orgName: "集团总部",
            dept: "集团领导",
            post: "董事长",
            perName: "张军",
            className: "高管考试",
            startDate: "2017-04-11",
            endDate: "2017-04-31",
            duration: "90",
            times: "2",
            progress: "20%"
        },

    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPlannedSpeed").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 *培训统计：员工培训分析表
 */
function plannedPersonList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPlannedPerson").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center",sortable: false},
                {name: 'org', label: "单位", width: 100, align: "center"},
                {name: 'dept', label: "部门", width: 150, align: "center"},
                {name: 'perName', label: "姓名", width: 100, align: "center"},
                {name: 'sort', label: "培训类别", width: 150, align: "center", sortable: false},
                {name: 'num', label: "合计项目数", width: 150, align: "center", sortable: false},
                {name: 'period', label: "合计培训课时", width: 150, align: "center", sortable: false},
                {name: 'fee', label: "合计培训费用", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "李四",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "张三",
            sort: "企业文化", num: "1", period: "4", fee: "1000"
        },
        {
            org: "集团总部", dept: "", perName: "王五",
            sort: "入职考试", num: "1", period: "4", fee: "1000"
        },
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPlannedPerson").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
/**
 * 试卷管理：新增试题
 */
function initJqGridUser_px() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listUser_px").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 1, align: "center", hidden: true},
                {name: 'realName', label: '试题名称', width: 30, align: "center"},
                {name: 'belongOrgId', label: '试题分类', width: 34, align: "center"},
                {name: 'prefixName', label: '试题类型', width: 34, align: "center"},
                {name: 'h', label: '难度', width: 30, align: "center"},
                // {name : 'h1',label : '试题分数',width : 20,align : "center"},
                {name: 'h2', label: '说明', width: 40, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
        });

    var mydata = [
        {
            id: "1",
            realName: "试题名称1 ",
            loginName: "人力资源",
            belongOrgId: "人力资源",
            prefixName: "选择题",
            h: "简单",
            h1: "5",
            h2: "",
            a: "0.80%",
            b: "0.40%",
            c: "0.80%",
            d: "",
            e: "3",
            f: "",
            g: "2"
        },
        {
            id: "2",
            realName: "试题名称2",
            loginName: "人力资源",
            belongOrgId: "人力资源",
            prefixName: "选择题",
            h: "简单",
            h1: "5",
            h2: "",
            a: "0.80%",
            b: "0.40%",
            c: "0.80%",
            d: "",
            e: "3",
            f: "",
            g: "2"
        },
        {
            id: "3",
            realName: "试题名称3",
            loginName: "人力资源",
            belongOrgId: "人力资源",
            prefixName: "选择题",
            h: "简单",
            h1: "5",
            h2: "",
            a: "0.80%",
            b: "0.40%",
            c: "0.80%",
            d: "",
            e: "3",
            f: "",
            g: "2"
        },
        {
            id: "4",
            realName: "试题名称4",
            loginName: "人力资源",
            belongOrgId: "人力资源",
            prefixName: "选择题",
            h: "简单",
            h1: "5",
            h2: "",
            a: "0.80%",
            b: "0.40%",
            c: "0.80%",
            d: "",
            e: "3",
            f: "",
            g: "2"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listUser_px").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 *新增课程：试卷信息
 */
function paperForSelectList() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaperForSelect").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: false,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'radio', label: "请选择", width: 55, align: "center", sortable: false},
                {name: 'id', label: "序号", width: 55, align: "center", sortable: false},
                {name: 'name', label: "试卷名称", width: 100, align: "center"},
                {name: 'fraction', label: "分值", width: 150, align: "center"},
                {name: 'passLine', label: "通过分数", width: 150, align: "center"},
                {name: 'duration', label: "考试时长", width: 100, align: "center"},
                {name: 'description', label: "试卷说明", width: 150, align: "center", sortable: false},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            // multiselect:true
        });
    //创建jqGrid组件
    var mydata = [
        {
            radio: "<input type='radio'/>",
            id: "1",
            name: "测试1",
            fraction: "100.0",
            passLine: "60",
            duration: "30",
            description: ""
        },
        {
            radio: "<input type='radio'/>",
            id: "2",
            name: "测试2",
            fraction: "100.0",
            passLine: "60",
            duration: "30",
            description: ""
        },
        {
            radio: "<input type='radio'/>",
            id: "3",
            name: "测试3",
            fraction: "100.0",
            passLine: "60",
            duration: "30",
            description: ""
        },
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaperForSelect").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 新增(行内)
 */
function toAdd() {
    var dataRow = {
        id: "4",
        name: "",
        sort: "",
        duration: "",
        startDate: "",
        endDate: "",
        source: "",
        href: "",
        ifFastForward: ""
    };
    //将新添加的行插入到第一列
    $("#listCourseware").jqGrid("addRowData", '4', dataRow);
    $("#listCourseware").setColProp("name", {editable: true});
    $("#listCourseware").setColProp("sort", {editable: true});
    $("#listCourseware").setColProp("duration", {editable: true});
    $("#listCourseware").setColProp("startDate", {editable: true});
    $("#listCourseware").setColProp("endDate", {editable: true});
    $("#listCourseware").setColProp("source", {editable: true});
    $("#listCourseware").setColProp("href", {editable: true});
    $("#listCourseware").jqGrid('editRow', 4, true);
    // $("#listButton").hide();
    // $("#addButton").show();
    // $("#editButton").hide();
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.gridResizeFn();
}

function add() {
    var mydata = [
        {
            id: "4",
            name: "<input type='text' class='form-control'>",
            sort: "<input type='text' class='form-control'>",
            duration: "<input type='text' class='form-control'>",
            startDate: "<input type='text' class='form-control'>",
            endDate: "<input class='form-control' id='datetimepick' size='16' type='text'>",
            source: "<select class='form-control'><option>请选择</option><option>原创</option><option>转载</option></select>",
            href: "<input type='text' class='form-control'>",
            ifFastForward: "<select class='form-control'><option>请选择</option><option>是</option><option>否</option></select>"
        }
    ]
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listCourseware").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 培训基础设置：新增知识分类
 */
function toAddTrainSort() {
    var dataRow = {
        id: "4",
        name: "",
        sort: "",
        duration: "",
        startDate: "",
        endDate: "",
        source: "",
        href: "",
        ifFastForward: ""
    };
    //将新添加的行插入到第一列
    $("#listCourseware").jqGrid("addRowData", '4', dataRow);
    $("#listCourseware").setColProp("name", {editable: true});
    $("#listCourseware").setColProp("sort", {editable: true});
    $("#listCourseware").setColProp("duration", {editable: true});
    $("#listCourseware").setColProp("startDate", {editable: true});
    $("#listCourseware").setColProp("endDate", {editable: true});
    $("#listCourseware").setColProp("source", {editable: true});
    $("#listCourseware").setColProp("href", {editable: true});
    $("#listCourseware").jqGrid('editRow', 4, true);
    // $("#listButton").hide();
    // $("#addButton").show();
    // $("#editButton").hide();
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.gridResizeFn();
}

/**
 * 培训设置：知识中心分类
 */
function trainSettingInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listTrainSetting").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: '序号', width: 55, align: "center"},
                {name: 'name', label: '名称', width: 90, align: "center", cellattr: addCellAttr},
                {name: 'code', label: '编码', width: 90, align: "center"},
                {name: 'description', label: '说明', width: 164, align: "center"},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {name: "人力资源类", code: "RLZY", description: ""},
        {name: "财务类", code: "CW", description: ""},
        {name: "信息类", code: "XX", description: ""},
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listTrainSetting").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

/**
 * 试卷设置
 */
function paperSetInit() {
    var ubody = "sys/org/user/queryUserListByOrgId";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridUser = jQuery("#listPaperSet").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: "序号", width: 55, align: "center"},
                {name: 'type', label: "类型", width: 100, align: "center"},
                {name: 'single_score', label: "单题分值", width: 100, align: "center"},
                {name: 'amount', label: "数量", width: 100, align: "center"},
                {name: 'total_score', label: "总分", width: 100, align: "center"},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
    //创建jqGrid组件
    var mydata = [
        {
            id: "1",
            type: "单选题",
            single_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            amount: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            total_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>"
        },
        {
            id: "1",
            type: "多选题",
            single_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            amount: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            total_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>"
        },
        {
            id: "1",
            type: "判断题",
            single_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            amount: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
            total_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>"
        },
        // {
        //     id: "1",
        //     type: "问答题",
        //     single_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
        //     amount: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>",
        //     total_score: "<input type='text' class='form-control' style='width: 150px;position:relative;left:25%'/>"
        // },


    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#listPaperSet").jqGrid('addRowData', i + 1, mydata[i]);
    }
}

$(function () {
    //初始化jqgrid
    resizeHeight();
    demandInit();
    sunjectInit();
    themeInit();
    planPaperInit();
    studengArrangedList();
    coursewareList();
    paperList();
    paperForAddList();
    paperForPlanList();
    plannedSpeedList();
    plannedSortList();
    plannedPersonList();
    paperForSelectList();
    trainSettingInit();
    listPaperList();
    //初始化日期控件
    initDatetimepicker();
    paperSetInit();
    initJqGridUser_px();
    //$('#list2').jqGrid().setGridWidth($('.container-all').width()-2);
    //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    $('.btn-adv').click(function () {
        expandedSearch();
        $('#list2').jqGrid().setGridHeight(computeGridHeight());
    });

    resizeGrid();
    // $.xljUtils.resizeNestedGrid();
    //grid随窗口变化高度
    //$(window).resize(function() {
    //    $('#list2').jqGrid().setGridHeight(computeGridHeight());
    //    $('#list2').jqGrid().setGridWidth($('.container-all').width()-2);
    //});
});
