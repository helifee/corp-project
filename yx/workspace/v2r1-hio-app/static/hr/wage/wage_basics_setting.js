var itemCode;
var leaveCode;
;(function ($,window,document,undefined) {

    //个税
    var jqGridTaxRate;

    //劳务
    var jqGridLabourTaxRate;

    //固定项目grid设置
    var jqGridSalaryItem;

    //津贴项目grid设置
    var jqGridAllowanceItem;

    //奖金项目grid设置
    var jqGridBonusItem;

    //考勤项目grid设置
    var jqGridKqItem;

    //社保公积金项目grid设置
    var jqGridSiItem;

    //其他项目grid设置
    var jqGridOtherItem;

    //个税项目grid设置
    var jqGridTaxItem;

    //合计项目grid设置
    var jqGridSumItem;

    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据
    var openUrlPeriod = "wage_salary_period_edit.html";//计薪期间的编辑页面
    var openUrlRate = "wage_rate_edit.html";//税率表的编辑页面
    var editPeriodId;//跳转修改页面时记录计薪期间的ID
    var editRateId;//跳转修改页面时记录税率表的ID
    var editTypePeriod=0;//计薪期间新增、修改打开方式：0新增，1修改。默认新增
    var editTypeRate=0;//税率表新增、修改打开方式：0新增，1修改。默认新增
    var openTypeRate=1;//税率表 打开类型，1：薪资&年终奖个税税率表     2:劳务人员个税税率表    默认是薪资&年终奖个税类型税率表
    var totalYear = new Date().getFullYear();//获取当前归属年度
    var focusW;//第二页聚焦


    var periodId ;//计薪期间Id

    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 180) + "px");
    };

    //为薪资项目页签中的表格设置宽度
    window.resizeGrid = function () {
        $.xljUtils.gridResizeFn();
    };

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //项目设置页签：固定项目初始化
    window.initSalaryItemList = function () {
        jqGridSalaryItem = jQuery("#salaryItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            postData: {"itemType":SALARY_ITEM_TYPE_SALARY, "time": new Date()},
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
             var itemGrid = "salaryItemList";
                var itemName = "固定项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_SALARY));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：津贴项目初始化
    window.initAllowanceItemList = function () {
        jqGridAllowanceItem = jQuery("#allowanceItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_AllOWANCE, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
                var itemGrid = "allowanceItemList";
                var itemName = "津贴项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_AllOWANCE));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：奖金项目初始化
    window.initBonusItemList = function () {
        jqGridBonusItem = jQuery("#bonusItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_BONUS, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
                var itemGrid = "bonusItemList";
                var itemName = "奖金项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_BONUS));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：考勤项目初始化
    window.initKqItemList = function () {
        jqGridKqItem = jQuery("#kqItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_KQ, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
                var itemGrid = "kqItemList";
                var itemName = "考勤项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_KQ));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：社保公积金项目初始化
    window.initSiItemList = function () {
        jqGridSiItem = jQuery("#siItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_SI, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
                var itemGrid = "siItemList";
                var itemName = "社保公积金项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_SI));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：其他项目初始化
    window.initOtherItemList = function () {
        jqGridOtherItem = jQuery("#otherItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_OTHER, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            },
            ondblClickRow: function () {
                var itemGrid = "otherItemList";
                var itemName = "其他项目";
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(1));
                    localStorage.setItem('itemType',JSON.stringify(SALARY_ITEM_TYPE_OTHER));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        });
    };

    //项目设置页签：个税项目初始化
    window.initTaxItemList = function () {
        jqGridTaxItem = jQuery("#taxItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_TAX, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            }
        });
    };

    //项目设置页签：合计项目初始化
    window.initSumItemList = function () {
        jqGridSumItem = jQuery("#sumItemList").jqGrid({
            url : hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData: {"itemType":SALARY_ITEM_TYPE_SUM, "time": new Date()},
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name : 'id',label : 'id',sortable:false,hidden:true},
                {name : 'code',label : '项目编码',sortable:false,hidden:true},
                {name : 'correspond',label : '对应关系编码',sortable:false,hidden:true},
                {name : 'name',label : '项目名称', sortable:false,align:'center',width:130},
                {name : 'itemPerce',label : '小数位数',sortable:false,align:'center',width:80},
                {name : 'itemProperty',label : '项目属性',sortable:false,align:'center',width:80,formatter:statusFmatter,unformat:unStatusFmatter},
                {name : 'showClassify',label : '工资条显示分类',sortable:false,align:'center',width:100,formatter:showClassifyFmatter},
                {name : 'itemDataSource',label : '项目数据来源',sortable:false,align:'center',width:150,formatter:soruceFmatter,unformat:unSoruceFmatter},
                {name : 'taxRule',label : '计税规则',sortable:false,align:'center',width:120,formatter:taxRuleFmatter},
                {name : 'status',label : '状态',sortable:false,align:'center',width:100,formatter:statusFmatter,unformat:unStatusFmatter}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            gridComplete: function () { //滚动条
                $. xljUtils.addGridScroll();
            }
        });
    };

    //计薪设置：初始化
    window.initPeriodSetting = function () {
        var ubody = "wage/wagePeriod/queryList";
        var uall = hostUrl+ubody;
        var querydata ={time:new Date()};
        $.ajax({
            type:'post',
            dataType:'json',
            contentType:'application/json',
            data:JSON.stringify(querydata),
            url:uall,
            success: function(data) {
                //记录已经存在，直接修改
                if(data.result!=null&&data.result.length>0) {
                    var tempDate = data.result[0];
                    $("#periodFrom").find("input[name='periodId']").val(tempDate.sid);
                    $("#startDate").val(tempDate.startDate);
                    $("#wageWay").val(tempDate.wageWay);
                    $("#periodFrom").find("input[name='workingDay']").val(tempDate.workingDay);
                    $("#kqSource").val(tempDate.kqSource);
                    $("#siSource").val(tempDate.siSource);

                    //初始化结束日期
                    var tempStartDate = tempDate.startDate;
                    if(tempStartDate!=null&&tempStartDate!='') {
                        var endDate = calculateEndDate(tempStartDate);
                        if(tempStartDate!='1'||tempStartDate!=1) {
                            $("#endDate").val("次月" + endDate+"日");
                        }else {
                            $("#endDate").val("本月" + endDate+"日");
                        }
                    }

                }
                //记录不存在，需新增插入
                else {
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化计薪期间请求失败");
            }
        })
    };

    //计薪设置：保存
    window.savePeriodSetting = function () {

        var tempPeriodDto={};
        var id = $("#periodId").val();
        var startDate = $("#startDate").val();
        var wageWay = $("#wageWay").val();
        var workingDay = $("#workingDay").val();
        var kqSource = $("#kqSource").val();
        var siSource = $("#siSource").val();

        if(startDate==null||startDate=='') {
            pop_tip_open("blue","请选择计薪开始时间！");
            return;
        } else if(wageWay==null||wageWay=='') {
            pop_tip_open("blue","请选择计薪方式！");
            return;
        } else if(kqSource==null||kqSource=='') {
            pop_tip_open("blue","请选择考勤数据来源！");
            return;
        } else if(siSource==null||siSource=='') {
            pop_tip_open("blue","请选择社保数据来源！");
            return;
        }

        //如果计薪方式为实际工作日，则必须数据工作日天数
        else if(wageWay=="3") {
            if(workingDay==null||workingDay=="") {
                pop_tip_open("blue","请输入工作日天数！");
                return;
            } else if(workingDay<0||workingDay>30) {
                pop_tip_open("blue","请输入有效工作日天数！");
                return;
            }
        }

        var endDate = calculateEndDate(startDate);//获取结束时间

        tempPeriodDto.startDate = startDate;
        tempPeriodDto.endDate = endDate;
        tempPeriodDto.wageWay = wageWay;
        tempPeriodDto.workingDay = workingDay;
        tempPeriodDto.kqSource = kqSource;
        tempPeriodDto.siSource = siSource;
        tempPeriodDto.delflag=0;
        if(id!=null&&id!=""){//编辑
            tempPeriodDto.id = id;
            updateSavePeriod(tempPeriodDto);
        }else{//新增
            addSavePeriod(tempPeriodDto);
        }
    };

    //计薪设置：修改保存
    window.updateSavePeriod = function (tempPeriodDto) {
        var periodId = $('#periodId').val();
        tempPeriodDto.id = periodId;
        $.ajax({
            url:hostUrl+"wage/wagePeriod/update/"+periodId,
            data:JSON.stringify(tempPeriodDto),
            type:'put',
            dataType:'JSON',
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        $.xljUtils.tip("green","计薪设置修改成功！");
                    }else {
                        pop_tip_open("blue","计薪设置修改失败！"+ message);
                        initPeriodSetting();
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","计薪设置修改请求失败");
            }
        });
    };

    //计薪设置：新增保存
    window.addSavePeriod = function (tempPeriodDto) {
        $.ajax({
            type:'get',
            url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#periodFrom").find("input[name='periodId']").val(guuid);
                var periodId = $('#periodId').val();
                tempPeriodDto.id = periodId;
                tempPeriodDto.sid = periodId;
                $.ajax({
                    url:hostUrl+"wage/wagePeriod/save/",
                    type:'POST',
                    dataType:'JSON',
                    contentType:'application/json',
                    data:JSON.stringify(tempPeriodDto),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","计薪设置新增成功！");
                            }else{
                                if(xhr.code=="50000"){
                                    $.xljUtils.tip("blue",xhr.message);
                                    initPeriodSetting();
                                    return;
                                }
                                $.xljUtils.tip("blue","计薪设置新增失败！");
                                initPeriodSetting();
                            }
                        }else{
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                            initPeriodSetting();
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                });
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        });
    };

    //初始化中国员工薪资扣税基数
    window.initChinaTaxBase = function () {
        var uBody = "/sys/sysParameter/getValueByKey/ChinaTaxBase";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#taxBaseForm").find("input[name='ChinaTaxBase']").val(data.result);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化合并计税参数请求失败");
            }
        })
    };

    //初始化外籍员工薪资扣税基数
    window.initForeignTaxBase = function () {
        var uBody = "/sys/sysParameter/getValueByKey/foreignTaxBase";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#taxBaseForm").find("input[name='foreignTaxBase']").val(data.result);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化外籍员工薪资扣税基数请求失败");
            }
        })
    };

    //保存扣税基数
    window.saveTaxBase = function () {
        var ChinaTaxBase = $("#ChinaTaxBase").val();
        var foreignTaxBase = $("#foreignTaxBase").val();
        //保存更改
        $.ajax({
            url: hostUrl + "sys/sysParameter/updateValueByKey/ChinaTaxBase",
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({paraValue:ChinaTaxBase}),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + message);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
        $.ajax({
            url: hostUrl + "sys/sysParameter/updateValueByKey/foreignTaxBase",
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({paraValue:foreignTaxBase}),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + message);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });

    };

    //薪资基础设置相关:税率表
    window.taxRateList = function () {
        jqGridTaxRate = jQuery("#taxRateList").jqGrid(
            {
                url: hostUrl + 'wage/wageTaxRate/queryListByType',//创建完成之后请求数据的url
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                contentType: "application/json",
                postData:{"type":"1"},
                autowidth:true,
                colNames : [ 'id','type','应纳税所得额下限' ,'应纳税所得额上限','税率（%）', '速算扣除数', '说明'],
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '应纳税所得额下限', sortable:false,align:'right',width:130},
                    {name : 'topSalaryLimit',label : '应纳税所得额上限',sortable:false,align:'right',width:130},
                    {name : 'taxRate',label : '税率（%）',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '速算扣除数',sortable:false,align:'right',width:130},
                    {name : 'remark',label : '说明',sortable:false,align:'center',width:220}
                ],
                shrinkToFit:true,
                rownumbers: true,
                multiboxonly: true,//只能通过复选框进行多选
                rowNum: -1,//一页显示多少条 -1全部
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                multiselect: true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                onCellSelect: function(){
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //重新选择行时清除上一次选中行的样式
                        $('#taxRateList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId=$('#taxRateList').jqGrid("getGridParam","selrow");
                    rowData = $('#taxRateList').jqGrid('getRowData',rowId);
                },
                //双击事件
                ondblClickRow:function(rowid){
                    editTypeRate= 1;//修改状态
                    openTypeRate = 1; //薪资个税
                    editRateId = rowid;//获取选中的行ID

                    //跳转编辑页
                    localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                    localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                    localStorage.setItem('editRateId',JSON.stringify(editRateId));
                    window.location.href=openUrlRate;
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn()
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //添加回显选中行样式
                        $('#taxRateList').setSelection(rowDataBefore.id,true);
                        $('#taxRateList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                    if (focusW == null && focusW != undefined){
                        $("#taxRateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                        $("#taxRateList tr").last().find(":input[role='checkbox']").trigger("click");
                    }
                },
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
                }
            });
    };

    //薪资基础设置相关:劳务人员个税税率表
    window.labourTaxRateList = function () {
        jqGridLabourTaxRate = jQuery("#labourTaxRateList").jqGrid(
            {
                url: hostUrl + 'wage/wageTaxRate/queryListByType',//创建完成之后请求数据的url
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                contentType: "application/json",
                postData:{"type":"2"},
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colNames : [ 'id','type','应纳税所得额下限' ,'应纳税所得额上限','税率（%）', '速算扣除数','扣税基数', '说明'],
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '应纳税所得额下限', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '应纳税所得额上限',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '税率（%）',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '速算扣除数',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '扣税基数',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '说明',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                // cellEdit:true,//是否开启单元格的编辑功能
                // cellsubmit:'clientArray',//or 'clientArray',remote代表每次编辑提交后进行服务器保存，clientArray只保存到数据表格不保存到服务器
                // cellurl:'xxx',//cellsubmit要提交的后台路径
                onCellSelect: function(){
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //重新选择行时清除上一次选中行的样式
                        $('#labourTaxRateList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId=$('#labourTaxRateList').jqGrid("getGridParam","selrow");
                    rowData = $('#labourTaxRateList').jqGrid('getRowData',rowId);
                },
                //双击事件
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    editTypeRate= 1;//修改状态
                    openTypeRate = 2; //劳务人员个税
                    editRateId = rowid;//获取选中的最后一行的ID

                    localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                    localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                    localStorage.setItem('editRateId',JSON.stringify(editRateId));
                    window.location.href=openUrlRate;
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //添加回显选中行样式
                        $('#labourTaxRateList').setSelection(rowDataBefore.id,true);
                        $('#labourTaxRateList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                    if (focusW == null && focusW != undefined){
                        $("#labourTaxRateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                        $("#labourTaxRateList tr").last().find(":input[role='checkbox']").trigger("click");
                    }
                },
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
                }
            });
    };

    //税率表新增编辑 type:类型（1，薪资&个税  2：劳务人员个税），falg:操作状态（0:新增，1：编辑）
    window.addTaxRate = function (type,flag) {
        if(flag == 1) { //编辑
            editTypeRate = 1;
            if(type==1) { //1 薪资&个税
                var ids = $("#taxRateList").jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的薪资&个税记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的薪资&个税记录!");
                    return;
                }else {
                    openTypeRate = 1; //薪资个税
                    editRateId = $("#taxRateList").jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    // window.location.href=openUrlRate+"?openTypeRate=1&editTypeRate=1&id="+editRateId;
                    localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                    localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                    localStorage.setItem('editRateId',JSON.stringify(editRateId));
                    window.location.href=openUrlRate;
                }

            }else { //2 劳务人员个税
                var ids = $("#labourTaxRateList").jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的劳务人员个税记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的劳务人员个税记录!");
                }else {
                    openTypeRate = 2;//劳务人员个税
                    editRateId = $("#labourTaxRateList").jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    //赋值
                    localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                    localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                    localStorage.setItem('editRateId',JSON.stringify(editRateId));
                    window.location.href=openUrlRate;
                }
            }

        }else{
            editTypeRate = 0;//默认为新增
            if(type==1) { //1 薪资&个税
                openTypeRate = 1; //薪资个税
                localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                window.location.href=openUrlRate;
            }else {
                openTypeRate = 2;//劳务人员个税
                localStorage.setItem('openTypeRate',JSON.stringify(openTypeRate));
                localStorage.setItem('editTypeRate',JSON.stringify(editTypeRate));
                window.location.href=openUrlRate;
            }
        }
    };

    //删除薪资&年终奖个税税率表删除
    window.delTaxRate = function () {
        var idsVal = $('#taxRateList').jqGrid('getGridParam','selarrrow');       //获取选中的所有行
        if(idsVal&&idsVal!="") {
            pop_text_open("blue",'确定删除这条数据吗？',function(){
                $.ajax({
                    type:'DELETE',
                    url: hostUrl + "/wage/wageTaxRate/deleteBatch/"+idsVal,
                    // async: false,
                    dataType:'json',
                    contentType:'application/json',
                    data:JSON.stringify({}),
                    success:function (xhr,textStatus ) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","数据删除成功！");
                                var w = $.hrUtils.focusNode(idsVal);
                                focusW = w;
                                if (w == null){
                                    var queryData = {
                                        datatype:'json',
                                        page:1
                                    };
                                    $("#taxRateList").jqGrid('setGridParam',queryData).trigger("reloadGrid");
                                    return;
                                }
                                $("#taxRateList").jqGrid('setGridParam',{
                                    gridComplete:function () {
                                        if (w != null && w != ""){
                                            $("#taxRateList").setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            }else{
                                if(xhr.code=="50000"){
                                    $.xljUtils.tip("blue",xhr.message);
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
    };

    //劳务人员个税税率表删除
    window.delTaxRateByLabour = function () {
        var idsVal = $('#labourTaxRateList').jqGrid('getGridParam','selarrrow');       //获取选中的所有行
        if(idsVal&&idsVal!="") {
            pop_text_open("blue",'确定删除这条数据吗？',function(){
                $.ajax({
                    type:'DELETE',
                    url: hostUrl + "/wage/wageTaxRate/deleteBatch/"+idsVal,
                    dataType:'json',
                    contentType:'application/json',
                    data:JSON.stringify({}),
                    success:function (xhr,textStatus ) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","数据删除成功！");
                                var w = $.hrUtils.focusNode(idsVal);
                                focusW = w;
                                if (w == null){
                                    var queryData = {
                                        datatype:'json',
                                        page:1
                                    };
                                    $('#labourTaxRateList').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                                    return;
                                }
                                $('#labourTaxRateList').jqGrid('setGridParam',{
                                    gridComplete:function () {
                                        if (w != null && w != ""){
                                            $('#labourTaxRateList').setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            }else{
                                if(xhr.code=="50000"){
                                    $.xljUtils.tip("red",xhr.message);
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
    };

    //审批设置:初始化
    window.initApprovalSetting=function(){
        var key = "approvalSetting";
        var uBody = "/sys/sysParameter/getValueByKey/" + key;
        var uAll = hostUrl + uBody;
        $.ajaxSetup({ cache:false });//在IE浏览器下，数据不写入缓存
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data.result == "0"){//不需要审批
                    $("input[name='approvalSetting'][value='0']").prop("checked",true);
                }else{//1需要审批
                    $("input[name='approvalSetting'][value='1']").prop("checked",true);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化薪酬审批设置参数请求失败!");
            }
        })
    };

    //审批设置：保存
    window.saveApprovalSetting=function(){
        //判断是否已经选择值
        var val=$('input:radio[name="approvalSetting"]:checked').val();
        if(val==null){
            pop_tip_open("blue","数据保存失败！审批设置不能为空");
            return false;
        }else {
            //保存更改
            $.ajax({
                url: hostUrl + "sys/sysParameter/updateValueByKey/approvalSetting",
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({paraValue:val,dateTime:new Date()}),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var message = resultData.message;
                        if (successFlag) {
                            $.xljUtils.tip("green", "审批设置保存成功！");
                        } else {
                            pop_tip_open("blue", "审批设置保存失败！" + message);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }
            });
        }
    };

    //项目设置页签：openType:0 薪资项新增、1 修改  itemType：项目类别
    window.updateSalaryItem = function (openType,itemType) {
        if(openType == 1) { //编辑
            var itemName = "";//提示的项目名称
            var itemGrid = "";//项目grid
            if(itemType==SALARY_ITEM_TYPE_SALARY) { //固定项目
                itemName = "固定项目";
                itemGrid = "salaryItemList";
            } else if(itemType==SALARY_ITEM_TYPE_AllOWANCE) { //津贴项目
                itemName = "津贴项目";
                itemGrid = "allowanceItemList";
            } else if(itemType==SALARY_ITEM_TYPE_BONUS) { //奖金项目
                itemName = "奖金项目";
                itemGrid = "bonusItemList";
            } else if(itemType==SALARY_ITEM_TYPE_KQ) { //考勤项目
                itemName = "考勤项目";
                itemGrid = "kqItemList";
            } else if(itemType==SALARY_ITEM_TYPE_SI) { //社保公积金项目
                itemName = "社保公积金项目";
                itemGrid = "siItemList";
            } else if(itemType==SALARY_ITEM_TYPE_OTHER) { //其他项目
                itemName = "其他项目";
                itemGrid = "otherItemList";
            }
            if(itemName!=null&&itemName!=''&&itemGrid!=null&&itemGrid!='') {
                var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
                if (ids.length < 1) {
                    pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
                } else if (ids.length > 1) {
                    pop_tip_open("blue", "请选择一条需要修改的" + itemName + "记录!");
                }else {
                    var editId = $("#"+itemGrid).jqGrid("getGridParam", "selrow");//获取选中的最后一行的ID
                    localStorage.setItem('openType',JSON.stringify(openType));
                    localStorage.setItem('itemType',JSON.stringify(itemType));
                    localStorage.setItem('editId',JSON.stringify(editId));
                    window.location.href="wage_salary_item_edit.html";
                }
            }
        }else{
            localStorage.setItem('openType',JSON.stringify(openType));
            localStorage.setItem('itemType',JSON.stringify(itemType));
            window.location.href="wage_salary_item_edit.html";
        }
    };


    //删除薪资项
    window.delSalaryItem = function (tempItemType) {
        var itemName = "";//提示的项目名称
        var itemGrid = "";//项目grid
        if(tempItemType==SALARY_ITEM_TYPE_SALARY) { //固定项目
            itemName = "固定项目";
            itemGrid = "salaryItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_AllOWANCE) { //津贴项目
            itemName = "津贴项目";
            itemGrid = "allowanceItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_BONUS) { //奖金项目
            itemName = "奖金项目";
            itemGrid = "bonusItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_KQ) { //考勤项目
            itemName = "考勤项目";
            itemGrid = "kqItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_KQ) { //社保公积金项目
            itemName = "社保公积金项目";
            itemGrid = "siItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_OTHER) { //其他项目
            itemName = "其他项目";
            itemGrid = "otherItemList";
        }
        if(itemName!=null&&itemName!=''&&itemGrid!=null&&itemGrid!='') {
            var idsVal = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
            if (idsVal.length < 1) {
                pop_tip_open("blue", "请先选择需要修改的" + itemName + "记录!");
            } else {
                //根据选中的行记录进行操作
                for (var i in idsVal) {
                    var rowData = $("#"+itemGrid).jqGrid('getRowData', idsVal[i]);//根据选中的行获取每行的对象
                    var itemProperty = rowData.itemProperty;//获取指定行对象的name属性的元素
                    if (itemProperty != '2') {  //只要不是自定义项则不能删除
                        $.xljUtils.tip("blue", "选中的系统项不可以删除！");
                        return false;
                    }
                }
                pop_text_open("blue",'确定删除选中薪资项？',function(){
                    $.ajax({
                        type: "DELETE",
                        url:hostUrl+ "wage/wageSalaryItem/deleteSalaryItem/"+idsVal,
                        dataType: "JSON",
                        contentType:"application/json",
                        success: function(resultData){
                            if(resultData) {
                                var successFlag = resultData.success;
                                var result = resultData.result;
                                var message = resultData.message;
                                if(successFlag) {
                                    pop_tip_open("green","删除成功！");
                                    $("#"+itemGrid).jqGrid().trigger("reloadGrid");
                                }else {
                                    pop_tip_open("blue",message);
                                }
                            }
                        },error:function(XMLHttpRequest, textStatus, errorThrown){
                            pop_tip_open("red","数据删除请求失败");
                        }
                    });
                },true);
            }
        }
    };

    //计薪设置：根据选择的开始时间获取结束时间
    window.calculateEndDate = function (startDate) {
      if(startDate!=null&&startDate!='') {
          if(startDate==1){
              return 31;
          }else {
              return startDate-1;
          }
      }
    };

    //公式编辑器
    window.setFromula = function (tempItemType) {
        var itemName = "";//提示的项目名称
        var itemGrid = "";//项目grid
        if(tempItemType==SALARY_ITEM_TYPE_SALARY) { //固定项目
            itemName = "固定项目";
            itemGrid = "salaryItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_AllOWANCE) { //津贴项目
            itemName = "津贴项目";
            itemGrid = "allowanceItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_BONUS) { //奖金项目
            itemName = "奖金项目";
            itemGrid = "bonusItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_KQ) { //考勤项目
            itemName = "考勤项目";
            itemGrid = "kqItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_SI) { //社保公积金项目
            itemName = "社保公积金项目";
            itemGrid = "siItemList";
        } else if(tempItemType==SALARY_ITEM_TYPE_OTHER) { //其他项目
            itemName = "其他项目";
            itemGrid = "otherItemList";
        }
        if(itemName!=null&&itemName!=''&&itemGrid!=null&&itemGrid!='') {
            var ids = $("#"+itemGrid).jqGrid("getGridParam", "selarrrow");//获取选中的所有行
            if (ids.length < 1) {
                pop_tip_open("blue", "请先选择需要设置公式的" + itemName + "记录!");
            } else if (ids.length > 1) {
                pop_tip_open("blue", "请选择一条需要设置公式的" + itemName + "记录!");
            }else {
                var rowData = $("#"+itemGrid).jqGrid('getRowData', ids[0]);//根据选中的行获取每行的对象
                var itemProperty = rowData.itemDataSource;//获取指定行对象的name属性的元素
                var code = rowData.code;//公式编码
                if (itemProperty != SALARY_ITEM_SOURCE_FORMULA) {  //只要不是自定义项则不能删除
                    $.xljUtils.tip("blue", "只有数据来源为公式计算的薪资项目才能进行公式设置！");
                    return false;
                }
                localStorage.setItem('gotoTab',JSON.stringify(itemGrid));
                localStorage.setItem('editId',JSON.stringify(ids[0]));
                localStorage.setItem('itemCode',JSON.stringify(code));
                window.location.href="wage_formula_edit.html";
            }
        }
    };

    //考勤的公式编辑
    window.setKqFormula = function (tempItemType) {

        var ids = $("#kqItemList").jqGrid("getGridParam", "selarrrow");//获取选中的所有行
        if (ids.length < 1) {
            pop_tip_open("blue", "请先选择需要设置公式的考勤项目记录!");
        } else if (ids.length > 1) {
            pop_tip_open("blue", "请选择一条需要设置公式的考勤项目记录!");
        }else {
            var rowData = $("#kqItemList").jqGrid('getRowData', ids[0]);//根据选中的行获取每行的对象
            var itemProperty = rowData.itemDataSource;//获取指定行对象的name属性的元素
            if (itemProperty != SALARY_ITEM_SOURCE_FORMULA) {  //只要不是自定义项则不能删除
                $.xljUtils.tip("blue", "只有数据来源为公式计算的薪资项目才能进行公式设置！");
                return false;
            }
            var tempCode = rowData.code;
            var tempCorrespond = rowData.correspond;
            localStorage.setItem('editId',JSON.stringify(ids[0]));
            localStorage.setItem('itemCode',JSON.stringify(tempCode)); //公式结果编码
            localStorage.setItem('fType',JSON.stringify("kaoqing"));
            if(tempCorrespond!=null&&tempCorrespond!='') { //有对应关系，进入考勤模板设置
                var leaveCode = "次";
                localStorage.setItem('correspond',JSON.stringify(tempCorrespond)); //对应相关天数编码
                localStorage.setItem('leaveCode',JSON.stringify(leaveCode));
                window.location.href="wage_formula_kq_mould.html";
            } else {  //进入公式编辑器
                localStorage.setItem('gotoTab',JSON.stringify("kqItemList"));//返回标记
                window.location.href="wage_formula_edit.html";
            }
        }
    };

    //津贴的公式编辑
    window.setJtFormula = function (tempItemType) {

        var ids = $("#allowanceItemList").jqGrid("getGridParam", "selarrrow");//获取选中的所有行
        if (ids.length < 1) {
            pop_tip_open("blue", "请先选择需要设置公式的津贴项目记录!");
        } else if (ids.length > 1) {
            pop_tip_open("blue", "请选择一条需要设置公式的津贴项目记录!");
        }else {
            var rowData = $("#allowanceItemList").jqGrid('getRowData', ids[0]);//根据选中的行获取每行的对象
            var itemProperty = rowData.itemDataSource;//获取指定行对象的name属性的元素
            if (itemProperty != SALARY_ITEM_SOURCE_FORMULA) {  //只要不是自定义项则不能删除
                $.xljUtils.tip("blue", "只有数据来源为公式计算的薪资项目才能进行公式设置！");
                return false;
            }
            var tempCode = rowData.code;
            var tempCorrespond = rowData.correspond;

            localStorage.setItem('editId',JSON.stringify(ids[0]));
            localStorage.setItem('itemCode',JSON.stringify(tempCode)); //公式结果编码
            localStorage.setItem('fType',JSON.stringify("jintie"));//标志后台走的方法
            if(tempCorrespond!=null&&tempCorrespond!='') { //有对应关系，进入考勤模板设置
                var leaveCode = "天";
                localStorage.setItem('correspond',JSON.stringify(tempCorrespond)); //对应相关天数编码
                localStorage.setItem('leaveCode',JSON.stringify(leaveCode));
                window.location.href="wage_formula_allowance_mould.html";
            } else {  //进入公式编辑器
                localStorage.setItem('gotoTab',JSON.stringify("allowanceItemList"));//返回标记
                window.location.href="wage_formula_edit.html";
            }
        }
    };

    //状态数据格式化
    window.statusFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == "1"){//项目状态
            return "启用";
        }else if(cellvalue == "0"){//项目状态
            return "禁用";
        }else if(cellvalue == "3"){//项目属性
            return "系统项";
        }else if(cellvalue == "2"){//项目属性
            return "自定义项";
        }
    };

    //状态反格式化，用于数据获取
    window.unStatusFmatter = function(cellvalue, options, rowObject) {
        if(cellvalue == "启用"){//项目状态
            return "1";
        }else if(cellvalue == "禁用"){//项目状态
            return "0";
        }else if(cellvalue == "系统项"){ //项目属性
            return "3";
        }else if(cellvalue == "自定义项"){ //项目属性
            return "2";
        }
    };

    //计税规则数据格式化
    window.taxRuleFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == TAX_RULE_PRE_TAX_ADD){//税前加项
            return "税前加项";
        }else if(cellvalue == TAX_RULE_PRE_TAX_REDUCE){//税前减项
            return "税前减项";
        }else if(cellvalue == TAX_RULE_AFTER_TAX_ADD){//税后加项
            return "税后加项";
        }else if(cellvalue == TAX_RULE_AFTER_TAX_REDUCE){//税后减项
            return "税后减项";
        }else if(cellvalue == TAX_RULE_OTHER){//其他项
            return "其他项";
        }
    };

    //工资条显示分类
    window.showClassifyFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == SHOW_CLASSIFY_INCOME){
            return "收入项目";
        }else if(cellvalue == SHOW_CLASSIFY_DEDUCTION){
            return "扣减项目";
        }else if(cellvalue == SHOW_CLASSIFY_EMP){
            return "个人缴费";
        }else if(cellvalue == SHOW_CLASSIFY_ORG){
            return "公司缴费";
        }else if(cellvalue == SHOW_CLASSIFY_TOTAL){
            return "综合项目";
        }else if(cellvalue == SHOW_CLASSIFY_OTHER){
            return "中间项目";
        }else if(cellvalue == SHOW_CLASSIFY_TAX){
            return "个税项目";
        }
    };

    //数据来源显示分类
    window.soruceFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == SALARY_ITEM_SOURCE_IMPORT){
            return "手工输入";
        }else if(cellvalue == SALARY_ITEM_SOURCE_FORMULA){
            return "公式计算";
        }else if(cellvalue == SALARY_ITEM_SOURCE_ADJUSTMENT){
            return "调定薪";
        }else if(cellvalue == SALARY_ITEM_SOURCE_KQ){
            return "考勤";
        }else if(cellvalue == SALARY_ITEM_SOURCE_SI){
            return "社保";
        }else if(cellvalue == SALARY_ITEM_SOURCE_TAX){
            return "税率表";
        }
    };

    //数据来源显示分类反格式化，用于数据获取
    window.unSoruceFmatter = function(cellvalue, options, rowObject) {
        if(cellvalue == "手工输入"){
            return SALARY_ITEM_SOURCE_IMPORT;
        }else if(cellvalue == "公式计算"){
            return SALARY_ITEM_SOURCE_FORMULA;
        }else if(cellvalue == "调定薪"){
            return SALARY_ITEM_SOURCE_ADJUSTMENT;
        }else if(cellvalue == "考勤"){
            return SALARY_ITEM_SOURCE_KQ;
        }else if(cellvalue == "社保"){
            return SALARY_ITEM_SOURCE_SI;
        }else if(cellvalue == "税率表"){
            return SALARY_ITEM_SOURCE_TAX;
        }
    };

    //返回上一级
    window.goBack = function () {
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
    };

    //查询用户功能权限  add by tangsq since 20180123
    window.queryAuth = function () {
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_salary"}),
            success:function(json){
                var list=json.result;
                if(list!=null&&list.length>0) {
                    $.each(list,function(index,value){
                        for(var key in value){
                            if(key=="code"&&value[key]=="2"){//编辑权限
                                $("#savePeriodSetting").show();//计薪设置  保存
                                $("#saveTaxBase").show();//薪资&年终奖个税税率表 保存
                                $("#addTaxBase").show();//薪资&年终奖个税税率表 新增
                                $("#editTaxBase").show();//薪资&年终奖个税税率表  修改
                                $("#delTaxBase").show();//薪资&年终奖个税税率表 删除

                                $("#addTaxRate").show();//劳务人员个税税率表 新增
                                $("#editTaxRate").show();//劳务人员个税税率表  修改
                                $("#delTaxRate").show();//劳务人员个税税率表 删除

                                $("#updateSalaryItem").show();//薪资项 固定项目 修改

                                $("#addJtBtn").show();//薪资项 津贴项目 新增
                                $("#updateJtBtn").show();//薪资项 津贴项目 修改
                                $("#delJtBtn").show();//薪资项 津贴项目 删除
                                // $("#setJtFormulaBtn").show();//薪资项 津贴项目 公式设置  具体控制在公式保存按钮上

                                $("#addJjBtn").show();//薪资项 奖金项目 新增
                                $("#updateJjBtn").show();//薪资项 奖金项目 修改
                                $("#delJjBtn").show();//薪资项 奖金项目 删除
                                // $("#setJjFormulaBtn").show();//薪资项 奖金项目 公式设置 具体控制在公式保存按钮上

                                $("#updateKqBtn").show();//薪资项 考勤项目 修改
                                // $("#setKqFormulaBtn").show();//薪资项 考勤项目 公式设置  具体控制在公式保存按钮上

                                $("#updateSiBtn").show();//薪资项 社保公积金项目 修改

                                $("#addQtBtn").show();//薪资项 其他项目 新增
                                $("#updateQtBtn").show();//薪资项 其他项目 修改
                                $("#delQtBtn").show();//薪资项 其他项目 删除

                                $("#spSaveBtn").show();//审批设置  保存
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //初始化jqgrid
    $(function () {
        //初始化高度
        resizeHeight();

        initPeriodSetting();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

        //查询用户权限  设置按钮显隐性
        queryAuth();

        //计薪设置：切换开始日期进行相关处理
        $("#startDate").change(function(){
            var startDate = $("#startDate").val();
            if(startDate!=null&&startDate!='') {
                var endDate = calculateEndDate(startDate);
                if(startDate!='1'||startDate!=1) {
                    $("#endDate").val("次月" + endDate+"日");
                }else {
                    $("#endDate").val("本月" + endDate+"日");
                }

            }
        });

        //计薪设置：切换计薪方式进行相关处理
        $("#wageWay").change(function(){
            var startDate = $("#wageWay").val();
            if(startDate=="1") { //21.75
                $("#workingDay").val("21.75");
                document.getElementById('workingDayDiv1').style.visibility = 'hidden';//工作日天数设置为隐藏
                document.getElementById('workingDayDiv2').style.visibility = 'hidden';//工作日天数设置为隐藏
            } else if(startDate=="2") { //来源为考勤
                document.getElementById('workingDayDiv1').style.visibility = 'hidden';//工作日天数设置为隐藏
                document.getElementById('workingDayDiv2').style.visibility = 'hidden';//工作日天数设置为隐藏
                // $("#workingDay").val("22");//后期计算时进行读取
                // $("#workingDay").prop("disabled",true);
            } else if(startDate=="3") { //支持自定义设置
                $("#workingDay").val("");
                document.getElementById('workingDayDiv1').style.visibility = 'visible';//工作日天数设置为显示
                document.getElementById('workingDayDiv2').style.visibility = 'visible';//工作日天数设置为显示
                // $("#workingDay").prop("disabled",false);
            }
        });

        //页签切换
        $(".right-content .con-tit button").on("click", function (e) {
            //左侧  头部底部为60px  title类 为50px
            var w_h = $(window).height();
            $(".slide-left .ztree-box").height((w_h - 25) + "px");

            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            if ($(this).attr('class').indexOf('bytax') > 0) {
                $("#taxDiv").css("display", "block");//个税参数设置为block（显示）
                $("#periodDiv").css("display", "none");//计薪期间设置为none（隐藏）
                $("#salaryItemDiv").css("display", "none");//薪资项目设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）

                //刷新个税参数设置值
                initForeignTaxBase();
                initChinaTaxBase();
                taxRateList();
                labourTaxRateList();

            }else if ($(this).attr('class').indexOf('bySalaryItem') > 0) {
                $("#salaryItemDiv").css("display", "block");//薪资项目设置为block（显示）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#periodDiv").css("display", "none");//计薪期间设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）

                //刷新薪资项目相关列表
                initSalaryItemList();
                initAllowanceItemList();
                initBonusItemList();
                initKqItemList();
                initSiItemList();
                initOtherItemList();
                initTaxItemList();
                initSumItemList();

            } else if ($(this).attr('class').indexOf('byapply') > 0) {
                $("#applyDiv").css("display", "block");//审批设置为block（显示）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#salaryItemDiv").css("display", "none");//薪资项目设置为none（隐藏）
                $("#periodDiv").css("display", "none");//计薪设置为none（隐藏）

                //刷新审批设置值
                initApprovalSetting();

            } else { //计薪设置显示
                $("#periodDiv").css("display", "block");//计薪期间设置为block（显示）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#salaryItemDiv").css("display", "none");//薪资项目设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）

                //刷新计薪设置
                initPeriodSetting();
            }
            $.xljUtils.gridResizeFn();
            e.stopPropagation();
        });

        //初始化宽度
        resizeGrid();


        //子页面跳转父页面
        var gotoTab = localStorage.getItem('gotoTab');//跳转的页签
        var editId = localStorage.getItem('editId');//修改或新增ID
        if (gotoTab && gotoTab != undefined && gotoTab != 'undefined' && gotoTab != null) {
            gotoTab = JSON.parse(gotoTab);
            editId = JSON.parse(editId);

            //个税参数新增、保存返回
            if(editId && editId != undefined && editId != 'undefined' && editId != null) {
                if(gotoTab=="taxRateList") { //薪资个税聚焦
                    $("#taxBtn").click();
                    $("#taxRateList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#taxRateList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="labourTaxRateList") {//劳务个税聚焦
                    $("#taxBtn").click();
                    $("#labourTaxRateList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#labourTaxRateList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="salaryItemList") {//薪资项目—固定项目聚焦
                    $("#salaryItemBtn").click();
                    $("#salaryItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#salaryItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="allowanceItemList") {//薪资项目—津贴项目聚焦
                    $("#salaryItemBtn").click();
                    $("#allowanceItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#allowanceItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="bonusItemList") {//薪资项目—奖金项目聚焦
                    $("#salaryItemBtn").click();
                    $("#bonusItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#bonusItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="kqItemList") {//薪资项目—考勤项目聚焦
                    $("#salaryItemBtn").click();
                    $("#kqItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#kqItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="siItemList") {//薪资项目—社保项目聚焦
                    $("#salaryItemBtn").click();
                    $("#siItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#siItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                } else if (gotoTab=="otherItemList") {//薪资项目—其他项目聚焦
                    $("#salaryItemBtn").click();
                    $("#otherItemList").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $("#otherItemList").setSelection(editId);
                        }
                    }).trigger("reloadGrid");
                }
            }
            //个税参数直接返回
            else if(gotoTab=="backTaxRate") {
                $("#taxBtn").click();
            }
            //薪资项目页签返回
            else if(gotoTab=="backSalaryItem") {
                $("#salaryItemBtn").click();
            }


        }
        localStorage.removeItem('gotoTab');
        localStorage.removeItem('editId');

    });

})(jQuery,window,document);