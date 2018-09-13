/**
 * Created by ciic on 2017/6/28.
 */

;(function ($, window, document, undefined) {

    var opFlag = false;//操作按钮，避免请求未完成就再次进行请求

    var personListData;//机构对象
    var org_id;
    var focusId;//聚焦
    var focusW = false;//非第一页聚焦
    var calculateDate;//当前操作期间
    var inpay;
    var increase;
    var calculateDateId;
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号

    var flag="0";//单元格校验是否通过标志
    var periodDate;//期间日期显示
    var startDay;//开始日期
    var endDay;//结束日期
    var ifEditable=false;//是否可编辑单元格(可编辑单元格、删除人员、计算、导入)
    var ifCreatFalg = false; //归档、新建权限(新建报表、归档)

    var calculateFlag = false;//是否页面改过编辑框又重新计算过
    var queryCalculateStatus = "";//entry: 在职,leave: 离职,all默认查询所有
    //计算高度
    window.resizeHeight=function() {
//        //左侧  头部底部为60px  title类 为50px
//        var w_h = $(window).height();
//        //表示con-table 下的mytable1
//        $(".con-table .mytable").height((w_h - 130) + "px");
    };

    //计算表格宽度
    window.resizeGrid=function() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 235);
        $('#siCalculateList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#siCalculateList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
    };

    //grid 自适应宽度
    $(window).resize(function () {
//        resizeHeight();
        resizeGrid();
    });

    //清空组织机构
    window.emptyOrg=function() {
        $("#orgId").val("");
        $("#orgName").val("");
    };

    window.orgCallback=function(data) {
        $("#orgId").val(data.id);
        $("#orgName").val(data.name);
    };

    //查询用户功能权限
    window.queryAuth=function(){
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_social"}),
            success:function(json){
                var list=json.result;
                if(list!=null&&list.length>0) {
                    $.each(list,function(index,value){
                        for(var key in value){
                            if(key=="code"&&value[key]=="2"){//编辑权限
                                ifEditable=true;
                                $("#delBtn").show();//删除人员
                                $("#calculateBtn").show();//计算
                                $("#importBtn").show();//导入
                            }
                            if(key=="code"&&value[key]=="4"){//归档、新建权限
                                $("#NewFileBtn").show();//新建社保报表
                                $("#placeOnFileBtn").show();//归档
                                ifCreatFalg = true;
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //初始化社保页面
    window.initList = function() {
        var nameOrMobile = $("#nameOrMobile").val();
        var orgId = $("#orgId").val();
        var socialPayArea = $("#socialPayArea").val();
        var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
        var siPayArea = $("#siAreaId").val();
        var empType = $("#empType").val();
        var empTypeStr="";
        var socialPayAreaStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var queryDataPost = {};
        queryDataPost.nameOrMobile = nameOrMobile;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.siPayAreas = siPayArea;
        queryDataPost.fundPayAreas = fundPayArea;
        queryDataPost.socialPayAreas = socialPayAreaStr;
        queryDataPost.queryCalculateStatus=queryCalculateStatus;
        queryDataPost.empTypes = empTypeStr;
        queryDataPost.page = 1;
        $.ajax({
            url: hostUrl + 'si/siCalculate/queryFileListByCalculate',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({nameOrMobile:nameOrMobile,queryOrgIds:orgId,siPayAreas:siPayArea,fundPayAreas:fundPayArea,socialPayAreas:socialPayAreaStr,empTypes:empTypeStr}),
            success: function(resultData) {
                var data = resultData.result;//所有具体的值信息
                showModel = [];//所有信息
                var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                //当前操作的最新期间
                calculateDate = data.calculateDate;
                if(calculateDate!=null) {
                    $("#calculateDate").text(calculateDate.siTime);
                    $("#calculateDateId").val(calculateDate.id);
                    calculateDateId=calculateDate.id;
                }
                periodDate = data.periodDate;//期间日期展示
                var siPeriod ;//基础设置中的计薪设置
                startDay = "";//开始日期
                endDay = "";//结束日期

                //校验设置中的计薪日期设置是否正常显示
                if(periodDate!=null) {
                    siPeriod = periodDate.siPeriod ;
                    startDay = periodDate.startDay;
                    endDay = periodDate.endDay;
                }

                //统计行数据
                var sum = data.sum;
                if (sum === null || sum === undefined){
                    sum = {};
                }

                if(siPeriod !=null && siPeriod != undefined && siPeriod != 'undefined') {


                    if (calculateDate.accountStatus=="1") {
                        $("#NewFileBtn").attr("disabled", false);
                    }else {
                        $("#NewFileBtn").attr("disabled", true);//如果未归档不允许调用
                    }


                    if(endDay!=null&&endDay!='') {
                        $("#calculateDate").html(startDay + "-" + endDay);
                    }

                    //需要展示的所有记录
                    showModel.push({name: 'id', label : 'id', width: 100, editable: true, sortable: false, hidden: true,key:true, frozen: true});
                    showModel.push({name: 'personId', label : 'personId', width: 100, editable: true, sortable: false, hidden: true,key:true, frozen: true});
                    showModel.push({name: 'siTime',label : '社保期间', width: 100,  editable: false, sortable: false,align:'center',hidden: true, frozen: true});
                    showModel.push({name: 'realName',label : '姓名', width: 100,  editable: false, sortable: false,align:'center', frozen: true});
                    showModel.push({name: 'mobile', label : '手机号', width: 120,  editable: false, sortable: false,align:'center', frozen: true});
                    showModel.push({name: 'prefixName', label : '所属机构', width: 200,  editable: false, sortable: false,align:'center', frozen: true});
                    showModel.push({name: 'pinyin', label : '拼音', width: 100,  editable: false, sortable: false,align:'center',hidden: true});
                    // showModel.push({name: 'postName',label : '岗位', width: 100,  editable: false, sortable: false,align:'center'});
                    showModel.push({name: 'entryTime',label : '入职时间', width: 100,  editable: false, sortable: false,align:'center'});
                    showModel.push({name: 'leaveTime', label : '离职时间', width: 100,  editable: false, sortable: false,align:'center'});
                    showModel.push({name: 'person_type', label: '显示状态',editable: false, sortable: false,align: 'center',formatter:personTypeFmatter,unformat:unPersonTypeFmatter});
                    showModel.push({name: 'siPayAreaName', label : '社保缴纳地', width: 100,  editable: false, sortable: false,align:'center'});
                    showModel.push({name: 'socialPayAreaName', label : '户口性质', width: 100,  editable: false, sortable: false,align:'center'});
                    showModel.push({name: 'fundPayAreaName', label : '公积金缴纳地', width: 100,  editable: false, sortable: false,align:'center'});

                    var shrinkToFit=0;
                    if(tempShowField!=null&&tempShowField!=''&&tempShowField.length>0) {
                        for(var i in tempShowField) {
                            if(calculateDate!=null&&calculateDate.id!=''&&(calculateDate.accountStatus=="0"||calculateDate.accountStatus=="1")) { //支持修改
                                //如果数据来源为手工输入支持手动修改金额
                                if(tempShowField[i].itemDataSource=='0') {
                                    var itemPerce=  parseInt(tempShowField[i].itemPerce);
                                    var temp = {name:tempShowField[i].code ,label : tempShowField[i].name, width: 150,  align:'center',editable : ifEditable,formatter : "number",formatoptions : {decimalPlaces : itemPerce}};
                                    showModel.push(temp);
                                    shrinkToFit++;
                                    var name=tempShowField[i].code;
                                }
                                else {
                                    //数据来源为缴费规则的加上百分号 缴费比例不在页面上进行展示
                                    // var temp = {name:tempShowField[i].code ,label : tempShowField[i].name,  width: 150, align:'center',sortable:false,formatter : percentFormatter};
                                    var temp = {name:tempShowField[i].code ,label : tempShowField[i].name,  width: 150, align:'center',sortable:false};
                                    showModel.push(temp);
                                    shrinkToFit++;
                                }
                            }
                            else {  //不支持修改
                                var temp = {name:tempShowField[i].code ,label : tempShowField[i].name,  width: 150, align:'center',sortable:false};
                                showModel.push(temp);
                                shrinkToFit++;
                            }
                        }
                    }
                    queryDataPost.calculateDateId = calculateDateId;
                    jqgridCalculate = jQuery("#siCalculateList").jqGrid({
                        url: hostUrl + 'si/siCalculate/queryValueListByCalculate',//创建完成之后请求数据的url
                        ajaxGridOptions: {contentType: 'application/json'},
                        mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                        contentType: "application/json",
                        postData: queryDataPost,
                        datatype: "json",
                        autowidth: true,
                        height: $(window).height() -  260,
                        shrinkToFit:shrinkToFit>3?false:true,
                        rownumbers: true,
                        multiselect: true,
                        jsonReader: {
                            // root:"result"
                            repeatitems: false
                        },
                        colModel:showModel,//动态表格
                        rowNum: 20,//一页显示多少条 -1全部
                        rowList: [20, 50, 100,200],//可供用户选择一页显示多少条
                        pager: "#pager",//表格页脚的占位符(一般是div)的id
                        viewrecords: true, //定义是否要显示总记录数
                        sortable: false,//支持标题栏单击排除查询
                        cellEdit: ifEditable,//是否开启单元格的编辑功能
                        footerrow: true,//合计行
                        cellsubmit : "clientArray",//修改内容后用getChangedCells获取
                        gridComplete: function () { //滚动条
                            var nameOrMobile = $("#nameOrMobile").val();
                            var orgId = $("#orgId").val();
                            var socialPayArea = $("#socialPayArea").val();
                            var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
                            var siPayArea = $("#siAreaId").val();
                            var socialPayAreaStr="";
                            if(socialPayArea!=null&&socialPayArea.length>0){
                                for(var i=0;i<socialPayArea.length;i++){
                                    if(socialPayAreaStr.length>0){
                                        socialPayAreaStr+=',';
                                    }
                                    socialPayAreaStr+=socialPayArea[i];
                                }
                            }
                            if (calculateFlag){
                                var nameOrCodeByCal = $("#nameOrCodeByCal").val();
                                var orgId = $("#orgId").val();
                                $.ajax({
                                    url: hostUrl + 'si/siCalculate/queryFileListByCalculate',//创建完成之后请求数据的url
                                    datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                                    mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                                    ajaxGridOptions: {contentType: 'application/json'},
                                    contentType: "application/json",
                                    type: "POST",
                                    async: false,
                                    data: JSON.stringify({nameOrMobile:nameOrMobile,queryOrgIds:orgId,siPayAreas:siPayArea,fundPayAreas:fundPayArea,socialPayAreas:socialPayAreaStr,updateTime:new Date().getTime()}),
                                    success: function (resultData) {
                                        sum = resultData.result.sum;//统计行数据
                                    }
                                });
                            }
                            //合计行数据处理
                            for(var p in sum){
                                if(isNaN(sum[p])) {
                                    sum[p] = sum[p].toFixed(2);
                                }
                            }
                            var sumJson = {"realName": '合计'};
                            $("#siCalculateList").footerData('set', $.extend(sumJson,sum));

                            $. xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();
                            //刷新前先去除冻结列
                            $('#siCalculateList').jqGrid('destroyFrozenColumns');
                            //冻结列
                            jQuery("#siCalculateList").jqGrid('setFrozenColumns');

                            //显示统计相关数据
                            queryRedData();

                            //非第一页聚焦
                            if (focusW == null){
                                $("#siCalculateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                                $("#siCalculateList tr").last().find(":input[role='checkbox']").trigger("click");
                            }
                            //聚焦选中
                            if (focusId != undefined && focusId != null){
                                $("#siCalculateList").setSelection(focusId);
                            }
                        },/*
                        beforeSelectRow:function(rowid,e){
                            alert(rowid);
                        },*/
                        beforeSaveCell:function (rowid, cellname, value, iRow, iCol) {//在验证输入数据（如果存在）之前触发
                            var reg = /^-?\d+(\.\d+)?$/;
                            if (!reg.test(value)) {
                                pop_tip_open("blue", "请输入数字！");
                                flag="1";
                                return lastVaule;
                            }
                            if(value == 0 && value.length>1){
                                pop_tip_open("blue", "请输入正确格式的数字！");
                                flag="1";
                                return lastVaule;
                            }
                            var value1=value.split(".");
                            for(var i in tempShowField) {
                                if(tempShowField[i].code==cellname){
                                    if(tempShowField[i].type=="8"){
                                        var length=parseInt(tempShowField[i].itemLength)-parseInt(tempShowField[i].itemPerce);
                                        if(value1.length==1){
                                            if(value1[0].length>length){
                                                pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                        }else if(value1.length==2) {
                                            if(value1[0].length>length){
                                                pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                            if(value1[1].length>tempShowField[i].itemPerce){
                                                pop_tip_open("blue", "输入的数字小数位长度不能大于"+tempShowField[i].itemPerce+"！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                        }
                                    }
                                    if(tempShowField[i].type=="2"){
                                        var valueLength;
                                        if(value1.length==1){
                                            valueLength=value1[0].length;
                                        }else if(value1.length==2) {
                                            if(value1[0]=="0"){
                                                valueLength=value1[1].length;
                                            }else{
                                                valueLength=value1[0].length+value1[1].length;
                                            }
                                        }
                                        if(valueLength>6){
                                            pop_tip_open("blue", "输入的数字长度不能大于6！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                }
                            }
                            //当发薪期间状态为草稿时，数据库才会保存相对应值
                            if(calculateDate!=null&&calculateDate.id!=''&&(calculateDate.accountStatus=="0"||calculateDate.accountStatus=="1")) { //支持修改
                                //保存数据
                                var updateId = $("#siCalculateList").getCell(rowid,"id");//获取计算的id
                                var personId = $("#siCalculateList").getCell(rowid,"personId");//获取计算人员的id
                                var ColumnName = cellname;
                                var tempValue = value;
                                $.ajax({
                                    type: "POST",
                                    url: hostUrl + "si/siCalculate/updatesiItemValue",
                                    data: JSON.stringify({updateId: updateId,personId:personId,updateName:ColumnName,value:tempValue}),
                                    dataType: "JSON",
                                    async: false,
                                    contentType: "application/json",
                                    success: function (data) {
                                        if (!data.success) {
                                            pop_tip_open("blue", "数据修改失败！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                });
                            }
                        },
                        beforeEditCell:function(rowid,cellname,v,iRow,iCol){ //方便使用getRowData方法，可编辑表格状态下，获取具体内容，而不是html
                            lastrow = iRow;//单元格所在行的行号（注意不要和rowid搞混），iRow从1开始
                            lastcell = iCol;//单元格处于行中的列号，iCol从0开始
                            lastVaule = v;
                        },
                        loadComplete: function (xhr) {
                            //冻结列样式
                            $.xljUtils.setFrozenColumnStyle(41);

                            if (!xhr.success) {
                                switch (xhr.code) {
                                    case "50000":
                                        $.xljUtils.tip("red", xhr.message);
                                        break;
                                    case "50001":
                                        $.xljUtils.tip("red", xhr.message);
                                        break;
                                    case "50002":
                                        $.xljUtils.tip("blue", xhr.message);
                                        break;
                                    case "50003":
                                        $.xljUtils.tip("red", xhr.message);
                                        break;
                                    default:
                                        $.xljUtils.tip("red", "查询数据失败！");
                                        break;
                                }
                            } else {
                                personListData=xhr.result;
                            }
                    },ondblClickRow: function (rowid) {
                        //跳转编辑页
                        storageDate();//记录查询记录
                        var tempCalculateId = $("#siCalculateList").getCell(rowid,"id");//获取计算的id
                        var personId = $("#siCalculateList").getCell(rowid,"personId");//获取计算人员的id
                        localStorage.setItem('calculateDateId',JSON.stringify(calculateDateId));
                        localStorage.setItem('personId',JSON.stringify(personId));
                        localStorage.setItem('tempCalculateId',JSON.stringify(tempCalculateId));
                        localStorage.setItem('saveType','update');
                        rowData = $('#siCalculateList').jqGrid('getRowData', rowid);
                        localStorage.setItem('rowData',JSON.stringify(rowData));
                        var winObjEI = window.location.href="si_social_detail.html";
                    }
                });
                } else {
                    pop_tip_open("blue", "请在薪酬设置中完善计薪日期设置！");
                    return false;
                }
            }
        });
    };

    //社保计算:全部人员
    window.salaryCalculateAll = function () {
        flag="0";
        $("#siCalculateList").jqGrid("saveCell",lastrow,lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }
        var saveDto = {calculateDateId: calculateDateId};

        var calculateVlaue = [];//为区分计算项是参与计算还是

        saveDto.calculateVlaue = calculateVlaue;

        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#siCalculateList").jqGrid('getGridParam', 'records');
        if(total!=''&&total!=null&&total>0) {
            if(opFlag) {
                pop_tip_open("blue","上个操作请求未完成，请稍后执行操作！");
                return;
            }else{
                opFlag = true;//当前正在操作
                saveDto.importValue = importValue;
                $.ajax({
                    type: "POST",
                    url:hostUrl+ "si/siCalculate/socialFundCalculate",
                    dataType: "JSON",
                    data: JSON.stringify(saveDto),
                    contentType:"application/json",
                    success: function(data){
                        if(data.success) {
                            calculateFlag = true;
                            pop_tip_open("green","计算成功！");
                            //刷新前先去除冻结列
                            $('#siCalculateList').jqGrid('destroyFrozenColumns');
                            //重新加载数据
                            $('#siCalculateList').jqGrid().trigger("reloadGrid");
                        }else {
                            pop_tip_open("blue",data.message);
                        }
                        opFlag = false;
                    },
                    error:function (data) {
                        opFlag = false;
                        pop_tip_open("red", data.message);
                    }
                });
            }
        }else {
            pop_tip_open("blue","没有需要计算社保公积金的人员");
        }
    };

    window.queryCalculateStatus = function (type) {
        queryCalculateStatus = type;
        postQuery();
    };

    //查询方法
    window.postQuery=function () {
        var nameOrMobile = $("#nameOrMobile").val();
        var orgId = $("#orgId").val();
        var socialPayArea = $("#socialPayArea").val();
        var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
        var siPayArea = $("#siAreaId").val();
        var empType = $("#empType").val();
        var empTypeStr = "";
        var socialPayAreaStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var queryDataPost = {};
        queryDataPost.nameOrMobile = nameOrMobile;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.siPayAreas = siPayArea;
        queryDataPost.fundPayAreas = fundPayArea;
        queryDataPost.socialPayAreas = socialPayAreaStr;
        queryDataPost.queryCalculateStatus=queryCalculateStatus;
        queryDataPost.empTypes = empTypeStr;
        queryDataPost.page = 1;
        calculateFlag = true;

        $("#siCalculateList").jqGrid("setGridParam", {url :hostUrl + 'si/siCalculate/queryValueListByCalculate', postData: queryDataPost}).trigger("reloadGrid");
    };

    //页面显示格式化
    window.percentFormatter = function (cellvalue, options, rowObject) {
        if(cellvalue!=null){
            return cellvalue+'%';
        }
        return "";
    };


    //点击新建社保报表按钮
    window.NewFileBtn = function () {
     pop_text_open("blue",'新建报表则'+calculateDate.siTime+'月报表将不能再修改，且您上一次归档之后的修改将不会被保存。您确定现在就开始做下月社保吗？',function(){
        var payPeriodArr= $("#payPeriodFrom").serializeArray();
        var parPeriodDto={};
        for(var i in payPeriodArr){
            if(payPeriodArr[i].name=="id") {
                parPeriodDto.id = payPeriodArr[i].value;
            }
        }
        parPeriodDto.delflag = 0;
        if(opFlag) {
            pop_tip_open("blue","上个操作请求未完成，请稍后执行操作！");
            return;
        }else{
            opFlag = true;
            $.ajax({
                url:hostUrl+"si/siCalculateDate/saveNextCalculateDate",
                type:'POST',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify(parPeriodDto),
                success: function(resultData){
                    if(resultData!=null) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var message = resultData.message;
                        opFlag = false;
                        if(successFlag) {
                            $.xljUtils.tip("green","社保期间新增成功！");
                            $('#siCalculateList').GridUnload();//卸载garid
                            initList();
                        }else {
                            pop_tip_open("blue",message);
                        }
                    }
                    opFlag = false;
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    opFlag = false;
                    pop_tip_open("red","社保期间新增失败");
                }
            });
        }
     },true);
    };


    //当前月报查看
    window.monthlyReportBtn = function(){
        if(calculateDate!=null&&calculateDate.accountStatus=='1') {
            localStorage.setItem('calculateDateId',JSON.stringify(calculateDate.id));
            window.location.href="../si_monthly_report/si_monthly_report.html";
        } else {
            pop_tip_open("blue","未归档，无法查看当前月报！");
        }
    };

    //历史月报
    window.historicalMonthlyBtn = function(){
        storageDate();
        window.location.href="../si_monthly_report/si_history_monthly_report.html";
    };

    //点击变动人员
    window.changePersonBtn = function() {
        storageDate();
        localStorage.setItem('payPeriodId',JSON.stringify(calculateDateId));
        localStorage.setItem('payPeriod',JSON.stringify(calculateDate));
        window.location.href="si_file_changeperson_list.html";
    };

    //点击导入
    window.importBtn=function(){
        storageDate();
        localStorage.setItem('calculateDateId',calculateDateId);
        window.location.href="../si_calculate/si_calculate_upload.html";
    };

    //点击设置
    window.setBtn=function () {
        storageDate();
        window.location.href="../si_rule/social_fund_rule_list.html";

    };

    //删除人员
    window.delBtnClick=function (){
        var rowIds=$('#siCalculateList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","请选择要删除的人员！");
            return;
        }else{
            pop_text_open("blue",'确定要删除'+rowIds.length+'条数据吗？',function(){
                $.ajax({
                    type: "POST",
                    url:hostUrl+ "si/siFile/deleteBatchFromCalculateList",
                    data: JSON.stringify({personIds:rowIds}),
                    dataType: "JSON",
                    async:false,
                    contentType:"application/json",
                    success: function(resultData){
                        if(resultData!=null) {
                            var successFlag = resultData.success;
                            var result = resultData.result;
                            var message = resultData.message;
                            if (successFlag) {
                                $.xljUtils.tip("green", "删除成功！");

                                calculateFlag = true;

                                //刷新前先去除冻结列
                                $('#siCalculateList').jqGrid('destroyFrozenColumns');

                                //刷新聚焦处理开始
                                var w = $.hrUtils.focusNode(rowIds);
                                focusW = w;
                                if (w == null){
                                    var queryData = {
                                        datatype:'json',
                                        page:1
                                    };
                                    $('#siCalculateList').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                                }else {
                                    $('#siCalculateList').jqGrid('setGridParam',{
                                        gridComplete:function () {
                                            if (w != null && w != ""){
                                                $('#siCalculateList').setSelection(w);
                                            }
                                            w = "";
                                        }
                                    }).trigger("reloadGrid");
                                }
                                //刷新聚焦处理结束
                                queryRedData();//人数统计刷新
                            } else {
                                pop_tip_open("blue", message);
                            }
                        }
                    }
                });
            },true);

        }
    };

    //查询在缴、在职、离职数据
    window.queryRedData = function() {
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: "POST",
            url:hostUrl+ "si/siFile/queryRedData",
            data: JSON.stringify({startDay:startDay,endDay:endDay,updateTime:new Date().getTime()}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        $("#inpay").text(result.inpay);
                        $("#increase").text(result.increase);
                        $("#depletion").text(result.depletion);
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","社保户口性质下拉列表初始化失败！");
            }
        });
    };

    //初始化户口性质
    window.getSocialPayArea=function (codeSetId) {
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: "POST",
            url:hostUrl+ "sys/sysCodeItem/getCodeMesBySetId",
            data: JSON.stringify({code_set_id:codeSetId}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                      //  $("#socialPayArea").empty();
                        for (var i = 0; i < result.length; i++) {
                            $("#socialPayArea").append("<option value=" + result[i].id + ">" + result[i].name + "</option>");
                        }
                        return;
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","社保户口性质下拉列表初始化失败！");
            }
        });
    };

    //归档
    window.siFiling = function () {

        var title = "您确认归档该月报表吗？";

        //获取当前期间的信息
        if(calculateDate!=null&&calculateDate!=''&&calculateDate.id!=null&&calculateDate.id!='') {
            var tempCalculateId = calculateDate.id;

            if(opFlag) {
                pop_tip_open("blue","上个操作请求未完成，请稍后执行操作！");
                return;
            }else{
                opFlag = true;
                $.ajax({
                    type:'get',
                    url:hostUrl +"/si/siCalculateDate/get/"+calculateDate.id,
                    success: function(data) {
                        if(data.success&&data.result!=null) {
                            calculateDate = data.result;
                            calculateDate.id = tempCalculateId;//因为get后，后台的id变为sid
                            if(calculateDate.accountStatus=="2") { //已经审批完成
                                opFlag = false;
                                pop_tip_open("blue","该月报表已成历史报表，请刷新页面重新进入！");
                                return false;
                            }
                            if(calculateDate.accountStatus=="1") { //已归档
                                title = "该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？";
                            }
                            pop_text_open("blue", title, function () {
                                $.ajax({
                                    url: hostUrl + "si/siCalculateDate/siFiling",
                                    type: 'post',
                                    dataType: 'JSON',
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        calculateDateId : calculateDateId,
                                        startDay:startDay,
                                        endDay:endDay
                                    }),
                                    success: function (resultData) {
                                        if (resultData) {
                                            var successFlag = resultData.success;
                                            var result = resultData.result;
                                            var message = resultData.message;
                                            if (successFlag) {
                                                pop_tip_open("green", "社保归档成功！");
                                                if(calculateDate!=null&&calculateDate!='') {
                                                    //更新期间状态
                                                    calculateDate.accountStatus = '1';

                                                    $("#NewFileBtn").attr("disabled", false);

                                                }
                                            } else {
                                                opFlag = false;
                                                pop_tip_open("blue", "社保归档失败！" + message);
                                            }
                                        }
                                        opFlag = false;
                                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        opFlag = false;
                                        pop_tip_open("red", "数据修改保存请求失败");
                                    }

                                });
                            }, true);
                            opFlag = false;
                        }else {
                            opFlag = false;
                            pop_tip_open("blue","当前期间信息为空，请刷新页面！");
                        }
                    },error:function(XMLHttpRequest, textStatus, errorThrown){
                        opFlag = false;
                        pop_tip_open("red","初始化当前期间信息请求失败");
                    }
                });
            }
        } else {
            opFlag = false;
            pop_tip_open("blue","当前期间信息为空，请刷新页面！");
        }
    };

    //显示状态
    window.personTypeFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == null || cellvalue=='') {
            return "在职";
        }else {
            return cellvalue;
        }
    };

    //显示状态反格式化，用于数据获取
    window.unPersonTypeFmatter = function(cellvalue, options, rowObject) {
        if(cellvalue == "在职") {
            return '';
        }
    };


    $(function () {

        focusId = localStorage.getItem('personId');
        if (focusId != null && focusId != '' && focusId != 'undefined') {
            focusId = JSON.parse(focusId);
        }
        localStorage.removeItem('personId');

        queryAuth();//查询用户权限

//        resizeHeight();
        getSocialPayArea(socialPayAreaSetId);
        resizeGrid();

        //是否带查询条件

        var queryFlag = $.xljUtils.getUrlParam("queryFlag");
        if (queryFlag == "01") {
            storageShow();
        }
        initList();

        $('#socialPayArea').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "户口性质",
            minimumCountSelected: 10
        });
        $('#empType').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('#valueEmpty1').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

        $('html').bind('click blur', function(e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "") { //if a row is selected for edit
                if ($(e.target).closest('#siCalculateList').length == 0) { //and the click is outside of the grid //save the row being edited and unselect the row
                    $("#siCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });

        $('html').keyup(function (e) {//自动保存
            lastTime = e.timeStamp;
            setTimeout(function () {
                if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                    $("#siCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }, 1000);
        });
    });


    window.buildTree= function (parentNode, datas) {
        for (var key in datas) {
            var data = datas[key];
            if (data.parentId == parentNode.id) {
                var node = {text: data.name, id: data.id, nodes: [], selectable: true};
                parentNode.nodes.push(node);
                buildTree(node, datas);
            }
        }

        if (parentNode.nodes.length == 0) {
            delete parentNode.nodes;
        }
    };

    window.hideDIV=function () {
        $("#hideDiv").hide();
    };


    //查询条件记录
    window.storageDate = function () {

        var nameOrMobile = $("#nameOrMobile").val();
        var orgIds = $("#orgId").val();
        var orgNames = $("#orgName").val();
        //社保缴纳地
        var siAreaIds = $("#siAreaId").val();
        var siAreaNames = $("#siAreaName").val();
        //公积金缴纳地
        var fundPayAreaIds = $("#fundAreaId").val();
        var fundAreaNames = $("#fundAreaName").val();
        // 户口性质
        var socialPayAreaShow = $(".ms-drop").eq(0).html();
        var socialPayAreaName = $(".ms-choice").eq(0).find("span").text();
        var socialPayAreaIds = $("#socialPayArea").val();
        //显示状态  add by tangsq since 20180607
        var empType = $("#empType").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        localStorage.setItem("nameOrMobile", nameOrMobile);
        localStorage.setItem("orgId", orgIds);
        localStorage.setItem("orgNames", orgNames);
        localStorage.setItem("siPayArea", siAreaIds);
        localStorage.setItem("siAreaNames", siAreaNames);
        localStorage.setItem("fundPayArea", fundPayAreaIds);
        localStorage.setItem("fundAreaNames", fundAreaNames);
        localStorage.setItem("socialPayAreaShow", socialPayAreaShow);
        localStorage.setItem("socialPayAreaName", socialPayAreaName);
        localStorage.setItem("socialPayArea", socialPayAreaIds);
        localStorage.setItem("queryCalculateStatus", queryCalculateStatus);
        localStorage.setItem("empType", empTypeStr);
    };

    //查询条件回显
    window.storageShow = function () {
        var nameOrMobile = localStorage.getItem("nameOrMobile");
        var orgIds = localStorage.getItem("orgId");
        var orgNames = localStorage.getItem("orgNames");
        var siAreaIds = localStorage.getItem("siPayArea");
        var siAreaNames = localStorage.getItem("siAreaNames");
        var fundPayAreaIds = localStorage.getItem("fundPayArea");
        var fundAreaNames = localStorage.getItem("fundAreaNames");
        var socialPayAreaShow = localStorage.getItem("socialPayAreaShow");
        var socialPayAreaIds = localStorage.getItem("socialPayArea");
        var socialPayAreaNames = localStorage.getItem("socialPayAreaName");
        var empTypeStr = localStorage.getItem("empType");
        queryCalculateStatus = localStorage.getItem("queryCalculateStatus");

        var socialPayAreaId = [];
        if (socialPayAreaIds != null) {
            socialPayAreaId = socialPayAreaIds.split(",");
        }

        $("#nameOrMobile").val(nameOrMobile);
        $("#orgId").val(orgIds);
        $("#orgName").val(orgNames);
        $("#siAreaId").val(siAreaIds);
        $("#siAreaName").val(siAreaNames);
        $("#fundAreaId").val(fundPayAreaIds);
        $("#fundAreaName").val(fundAreaNames);
        $(".ms-drop").eq(0).html(socialPayAreaShow);
        $(".ms-choice").eq(0).find("span").text(socialPayAreaNames);
        $("#socialPayArea").val(socialPayAreaId);
        $("#empType").val(empTypeStr);
    };


})(jQuery, window, document);