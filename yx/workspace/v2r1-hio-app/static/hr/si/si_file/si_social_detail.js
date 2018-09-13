/**
 * Created by qimi.it on 2017/12/29.
 */
/**
 * Created by ciic on 2017/6/16.
 */

;(function ($, window, document, undefined) {
    var lastrow;//社保grid-最后修改行号先定义一个全局变量
    var lastcell;//社保grid-最后修改列号
    var lastrowFund;//公积金grid-最后修改行号先定义一个全局变量
    var lastcellFund;//公积金grid-最后修改列号
    var row_data = localStorage.getItem('rowData');
    var personId =localStorage.getItem('personId');
    var calculateDateId=localStorage.getItem('calculateDateId');
    var tempCalculateId=localStorage.getItem('tempCalculateId');
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号
    var lastVaule;//编辑前获取单元格内容
    var flag="0";//单元格校验是否通过标志


    window.initForm=function () {
        if (personId != null && personId != '' && personId != 'undefined') {
                personId = JSON.parse(personId);
                calculateDateId=JSON.parse(calculateDateId);
                $("#personId").val(personId);
                var queryDto = {personId:personId,calculateDateId:calculateDateId};
                $.ajax({
                    type: "POST",
                    url:hostUrl+ "si/siCalculate/getListDetail",
                    dataType: "JSON",
                    data: JSON.stringify(queryDto),
                    contentType:"application/json",
                    success: function(data){
                        if(data.success){
                            if(data.result!=null){
                                $("#id").val(data.result.id);
                                $('title').text("编辑社保详情");
                                var empInfoValue=data.result.empInfoValue;
                                $("#companyNameTitle").html(empInfoValue.prefixName);
                                $("#personNameTitle").html(empInfoValue.realName);
                                $("#name").val(empInfoValue.realName);
                                $("#phone").val(empInfoValue.mobile);
                                $("#entryTime").val(empInfoValue.entryTime);
                                $("#leaveTime").val(empInfoValue.leaveTime);
                                $("#siAreaId").val(empInfoValue.siPayArea);
                                $("#siAreaName").val(empInfoValue.siPayAreaName);
                                $("#fundAreaId").val(empInfoValue.fundPayArea);
                                $("#fundAreaName").val(empInfoValue.fundPayAreaName);
                                $("#socialUnitTotal").val(empInfoValue.social_unit_total);
                                $("#socialEmpTotal").val(empInfoValue.social_emp_total);
                                $("#socialPayArea option[value='" + empInfoValue.socialPayArea + "']").attr("selected", "selected");
                                $("#fundUnitTotal").val(empInfoValue.fund_unit_total);
                                $("#fundEmpTotal").val(empInfoValue.fund_emp_total);
                            }else{
                                pop_tip_open("red", "初始化请求失败");
                            }
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "初始化请求失败");
                    }
                });
        }
    };

    //加载社保表格
    window.initSiTable= function(){
        //列头
       jqGridSiTable= jQuery("#siTableList").jqGrid({
            url : hostUrl+'si/siCalculate/querySiTableList',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            postData: {calculateDateId:calculateDateId,personId:personId},
            width: $('.mytable').width(),
            // height: $('.mytable').height() + 240,
            height: 'auto',
            colModel :[
                {name: 'groupName', label : '缴纳项目', width: 100, editable: false, sortable: false,align:'center'},
                {name: 'base', label : '缴费基数', width: 100, editable: true, sortable: false,align:'center'},
                {name: 'unit_scale',label : '单位比例', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'unit_cost',label : '单位缴费', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'emp_scale', label : '个人比例', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'emp_cost', label : '个人缴费', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'unit_bj', label : '单位补缴', width: 100,  editable: true, sortable: false,align:'center'},
                {name: 'emp_bj', label : '个人补缴', width: 100,  editable: true, sortable: false,align:'center'}

            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
           // multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            cellEdit: true,//是否开启单元格的编辑功能
            cellsubmit : "clientArray",//不提交
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            // gridComplete: function () { //滚动条
            //     $. xljUtils.addGridScroll();
            // },
           beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
              lastrow = iRow;  //给全局变量赋值
              lastcell = iCol;
              lastVaule = v;//记录编辑前的单元格内容
            }
        });
    }

    //加载公积金表格
    window.initFundTable= function(){
        //列头
        jqGridFundTable = jQuery("#fundTableList").jqGrid({
            url : hostUrl+'si/siCalculate/queryFundTableList',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            postData: {calculateDateId:calculateDateId,personId:personId},
            width: $('.mytable').width(),
            height: 'auto',
            colModel :[
                {name: 'groupName', label : '缴纳项目', width: 100, editable: false, sortable: false,align:'center'},
                {name: 'base', label : '缴费基数', width: 100, editable: true, sortable: false,align:'center'},
                {name: 'unit_scale',label : '单位比例', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'unit_cost',label : '单位缴费', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'emp_scale', label : '个人比例', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'emp_cost', label : '个人缴费', width: 100,  editable: false, sortable: false,align:'center'},
                {name: 'unit_bj', label : '单位补缴', width: 100,  editable: true, sortable: false,align:'center'},
                {name: 'emp_bj', label : '个人补缴', width: 100,  editable: true, sortable: false,align:'center'}
                ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            //multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            cellEdit: true,//是否开启单元格的编辑功能
            cellsubmit : "clientArray",//修改内容后用getChangedCells获取
            jsonReader : {
                root:"result",
                repeatitems : false
            },
            // gridComplete: function () { //滚动条
            //     $. xljUtils.addGridScroll();
            // },
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                lastrowFund = iRow;  //给全局变量赋值
                lastcellFund = iCol;
            }
        });
    };

    window.saveBtn = function(){

        $('#siTableList').jqGrid("saveCell", lastrow, lastcell);  //当前单元格退出编辑模式
        var siTableValue = [];//存储社保表格变动数据
        var fundTableValue = [];//存储公积金表格变动数据
       var updateSiDate = $("#siTableList").getChangedCells('dirty');
        if (updateSiDate != null && updateSiDate.length > 0) {
            //根据行号获取记录,  此处获取的只是ID，已经被修改值
            for (var tempData in updateSiDate) {
                var id = updateSiDate[tempData].id;//此处id就是行号
                var base=updateSiDate[tempData].base;
                var unit_bj=updateSiDate[tempData].unit_bj;
                var emp_bj=updateSiDate[tempData].emp_bj;
                if (base) {
                    if(!vail('base',base,'siTableList',id,2)){//列名，单元格值，grid名，行号，列号
                        return ;
                    }
                }if (unit_bj) {
                    if(!vail('unit_bj',unit_bj,'siTableList',id,7)){
                        return ;
                    }
                }
                if (emp_bj) {
                    if(!vail('emp_bj',emp_bj,'siTableList',id,8)){
                        return ;
                    }
                }
                siTableValue.push(updateSiDate[tempData]);
            }
        }
        $('#fundTableList').jqGrid("saveCell", lastrowFund, lastcellFund);  //当前单元格退出编辑模式
        var updateFundDate = $("#fundTableList").getChangedCells('dirty');
        if (updateFundDate != null && updateFundDate.length > 0) {
            //根据行号获取记录,  此处获取的只是ID，已经被修改值
            for (var tempData in updateFundDate) {
                var id = updateFundDate[tempData].id;//此处id就是行号
                var base=updateFundDate[tempData].base;
                var unit_bj=updateFundDate[tempData].unit_bj;
                var emp_bj=updateFundDate[tempData].emp_bj;
                if (base) {
                    if(!vail('base',base,'fundTableList',id,2)){//列名，单元格值，grid名，行号，列号
                            return ;
                        }
                }if (unit_bj) {
                    if(!vail('unit_bj',unit_bj,'fundTableList',id,7)){
                        return ;
                    }
                }
                if (emp_bj) {
                    if(!vail('emp_bj',emp_bj,'fundTableList',id,8)){
                       return ;
                    }
                }
                fundTableValue.push(updateFundDate[tempData]);
            }
        }

        //人员信息
        var siPayArea = $("#siAreaId").val();
        var fundPayArea = $("#fundAreaId").val();
        var socialPayArea = $("#socialPayArea").val();
        if(siPayArea == null && siPayArea==""){
            pop_tip_open("blue","请选择社保缴纳地！");
            return;
        }
        if(socialPayArea == null && socialPayArea==""){
            pop_tip_open("blue","请选择户口性质！");
            return;
        }
        if(fundPayArea == null && fundPayArea==""){
            pop_tip_open("blue","请选择公积金缴纳地！");
            return;
        }if(tempCalculateId==null && tempCalculateId=="" && personId ==null && personId=="" ){
            pop_tip_open("blue","参数错误，请刷新重试或者联系管理员！");
            return;
        }
        tempCalculateId=JSON.parse(tempCalculateId);
        var dto = {tempCalculateId:tempCalculateId,personId:personId,siPayArea:siPayArea,socialPayArea:socialPayArea,
            fundPayArea:fundPayArea,siTableValue:siTableValue,fundTableValue:fundTableValue};
        $.ajax({
            type: "post",
            url:hostUrl+ "/si/siCalculate/updateSiTableValue",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                if(data.success) {
                    setTimeout(function () {
                        pop_tip_open("blue","保存成功!");
                        goBack();
                    }, 300);
                }
            },error:function (e) {
                pop_tip_open("red","更新数据请求失败");
            }
        });
    };

    window.vail = function(fieldName,fieldValue,tableName,iRow,iCol){//列名，单元格值，grid名，行号，列号
        var reg = /^-?\d+(\.\d+)?$/;
        var length=20;
        var itemPerce=4;
        var tableName="#"+tableName;
        if(!reg.test(fieldValue)){
            pop_tip_open("blue", "数据格式不对，请输入数字！");
            $(tableName).editCell(iRow,iCol,true);
            return false;
        }
        var value1=fieldValue.split(".");
        if(value1.length==1){
            if(value1[0].length>length){
                pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                $(tableName).editCell(iRow,iCol,true);
                return false;
            }
        }else if(value1.length==2) {
            if(value1[0].length>length){
                pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                $(tableName).editCell(iRow,iCol,true);
                return false;
            }
            if(value1[1].length>itemPerce){
                pop_tip_open("blue", "输入的数字小数位长度不能大于"+itemPerce+"！");
                $(tableName).editCell(iRow,iCol,true);
                return false;
            }
        }
        return true;
    };

    window.forselect=function (){
        var fundArea = $("#fundAreaId").val();
        var fundAreaName = $("#fundAreaName").val();

    };

    window.emptyFund=function () {
        $("#fundAreaName").val("");
        $("#fundAreaId").val("");
    };
    window.forsiselect=function (){
        var siPayArea = $("#siAreaId").val();
        var siPayAreaName = $("#siAreaName").val();
        var socialPayArea = $("#socialAreaId").val();
        var socialPayAreaName = $("#socialPayAreaName").val();

    };

    window.forFundselect=function (){
        var fundPayArea = $("#fundAreaId").val();
        var fundPayAreaName = $("#fundAreaName").val();
    };

    window.emptySi=function () {
        $("#siAreaName").val("");
        $("#siAreaId").val("");
    };

    window.closeWindow=function (){
        window.close();
    };
    window.emptyFund=function () {
        $("#fundAreaName").val("");
        $("#fundAreaId").val("");
    };

    window.goBack = function(){
        window.location.href="si_file.html?queryFlag=01"
    };

    //初始化户口性质
    window.getSocialPayArea=function(codeSetId) {
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
                        $("#socialPayArea").append("<option value=''></option>");
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
                            if(key=="code"&&value[key]=="2"){//编辑保存权限
                                $("#saveButton").show();//保存
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    $(function () {
        //权限处理
        queryAuth();
        getSocialPayArea(socialPayAreaSetId);
        initForm();//人员基础信息
        initSiTable();//社保表格信息
        initFundTable();//公积金表格信息
        //单元格修改保存
        $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                if ($(e.target).closest('#siTableList').length == 0) {
                    $("#siTableList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });
    });

})(jQuery, window, document);
