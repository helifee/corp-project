;(function ($,window,document,undefined) {

    var spanValue;//进行公式配置时，实际结果
    var actStatus;//设置公式的操作状态，如：插入、删除、替换
    var backGrid;//返回的grid名称
    var salaryItemId;//薪资项结果Id
    var salaryItemDto;//结果薪资项相关信息
    var saveFlag ;//0 新增保存  1 修改保存
    var itemGrid;//返回需要刷新的grid表格

    //计算表格高度
    window.resizeHeight = function() {
        var w_h = $(window).height();
        $(".con-table .mytable1").height((w_h - 90) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width()-1, true);
        $.xljUtils.gridResizeFn();
    };

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });


    //查询用户功能权限
    window.queryAuth=function(){
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
                                $("#formulaSaveBtn").show();//保存
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };


    //薪资项数据回显
    window.initSalaryItem = function () {
        //先清除内容
        document.all("exp").innerHTML = "";
        document.all('show').innerHTML = "";
        spanValue = null;
        actStatus = "";
        spanValue = $("#show").val();

        //打开方式：0新增，1修改
        salaryItemId = localStorage.getItem('editId');
        if (salaryItemId && salaryItemId != undefined && salaryItemId != 'undefined' && salaryItemId != null) {
            salaryItemId = JSON.parse(salaryItemId);
        }

        //返回需要刷新的grid表格
        itemGrid = localStorage.getItem('gotoTab');
        if (itemGrid && itemGrid != undefined && itemGrid != 'undefined' && itemGrid != null) {
            itemGrid = JSON.parse(itemGrid);
        }

        //要手动remove
        // localStorage.removeItem('editId');
        // localStorage.removeItem('gotoTab');

        if (salaryItemId != null && salaryItemId != '' && salaryItemId != 'undefined') {
            var dto = {itemIds:salaryItemId};
            //根据信息项ID获取薪资项相关信息
            $.ajax({
                type: "POST",
                url:hostUrl+'wage/wageSalaryItem/querySalaryItem',//创建完成之后请求数据的url
                data: JSON.stringify(dto),
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                contentType:"application/json",
                success: function(data) {
                    if(data!=null&&data.result!=null&&data.result.length>0) { //存在历史公式
                        salaryItemDto = data.result[0];

                        //根据ID查询是否存在已经配置过的公式
                        $.ajax({
                            type:'get',
                            url:hostUrl +"/wage/wageFormula/get/"+salaryItemId,
                            success: function(resultData) {
                                if(resultData.result!=null) { //存在历史公式
                                    saveFlag = 1;//修改保存
                                    $("#id").val(salaryItemId);
                                    $("#itemCode").val(resultData.result.itemCode);
                                    document.all('show').insertAdjacentHTML('BeforeEnd', resultData.result.formulaContentHtml);
                                    document.all("exp").insertAdjacentHTML('BeforeEnd', resultData.result.formulaExpressionHtml);
                                }else { //不存在初始化信息
                                    saveFlag = 0;//新增保存
                                    $("#id").val(salaryItemId);

                                    //薪资项编码
                                    var itemCode = localStorage.getItem('itemCode');
                                    if (itemCode && itemCode != undefined && itemCode != 'undefined' && itemCode != null) {
                                        itemCode = JSON.parse(itemCode);
                                    }
                                    $("#itemCode").val(itemCode);
                                    // localStorage.removeItem('itemCode');
                                    var tempValue = salaryItemDto.name_en + "."+ salaryItemDto.code;
                                    var tempCode = salaryItemDto.setName + "."+ salaryItemDto.name;
                                    spanBeginOperation(tempValue,tempCode);
                                    spanBeginOperation('=','=');
                                }
                            },error:function(XMLHttpRequest, textStatus, errorThrown){
                                pop_tip_open("red","公式初始化请求失败");
                            }
                        });
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","公式初始化请求失败");
                }
            });
        } else {
            pop_tip_open("blue","公式初始化失败!");
        }
    };

    //根据项目类型选择相关的账套薪资项
    window.typeClick = function (type) {
        //清除代码项的值
        $("#codeMes").empty();
        $("#projectType9").css("color","#4A4A4A");
        $("#projectType9").css("border-bottom","1px solid #D6D6D6");

        //切换选中的项目的背景颜色
        for(var i=1;i<10;i++) {
            var tempId = '#projectType'+i;
            if(i==type) {
                $(tempId).css("color","#46A7FF");
                $(tempId).css("border-bottom","1px solid #ffffff");
            }else{
                $(tempId).css("color","#4A4A4A");
                $(tempId).css("border-bottom","1px solid #D6D6D6");
            }
        }
        var allurl = "wage/wageSalaryItem/querySalaryItem";
        var dto = {itemType:type,status:'1',time:new Date()};//此项目类型下所有启用项目

        //根据项目类型获取具体的薪资项
        $.ajax({
            type: "POST",
            url:hostUrl+allurl,
            dataType: "JSON",
            data: JSON.stringify(dto),
            contentType:"application/json",
            success: function(data){
                $("#itemByType").empty();
                if(data!=null&&data.result!=null&&data.result.length>0) {
                    for(var i= 0;i<data.result.length;i++){
                        var tempValue = "'" + data.result[i].name_en + "."+ data.result[i].code+"'";
                        var tempCode = "'" +data.result[i].setName + "."+ data.result[i].name+"'";
                        $("#itemByType").append('<a href="#" id="'+data.result[i].id+'" ondblclick="spanOperation('+tempValue+','+tempCode+')"><p>'+data.result[i].name+'</p></a>')
                    }
                    itemByTypeScroll();//增加细滚动条
                }
            }
        });
    };

    //项目类型为人员基本信息子集，初始化数据
    window.initPersonInfo = function () {
        for(var i=1;i<9;i++) {
            var tempId = '#projectType'+i;
            $(tempId).css("color","#4A4A4A");
            $(tempId).css("border-bottom","1px solid #D6D6D6");
        }
        $("#projectType9").css("color","#46A7FF");
        $("#projectType9").css("border-bottom","1px solid #ffffff");
        $.ajax({
            type: "POST",
            url:hostUrl+ "sys/sysInfoItem/getPersonBaseMes",
            data: JSON.stringify({}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data){
                $("#itemByType").empty();
                for(var i= 0;i<data.result.length;i++){
                    var tempValue = "'" + data.result[i].name_en+"."+ data.result[i].code+"'";
                    var tempCode = "'"+ data.result[i].setName+"."+ data.result[i].name+"'";
                    $("#itemByType").append('<a href="#" id="'+data.result[i].id+'" ondblclick="spanOperation('+tempValue+','+tempCode+')"  onclick="toShowCodeMes('+data.result[i].codeSetId+')"><p>'+data.result[i].name+'</p></a>')
                }
                itemByTypeScroll();//增加细滚动条
            }
        });
    };

    //加载代码项
    window.toShowCodeMes = function(codeSetId) {
        if(codeSetId==null||codeSetId==""){
            $("#codeMes").empty();
            return;
        }
        $.ajax({
            type: "POST",
            url:hostUrl+ "sys/sysCodeItem/getCodeMesBySetId",
            data: JSON.stringify({code_set_id:codeSetId}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data){
                $("#codeMes").empty();
                for(var i= 0;i<data.result.length;i++){
                    var tempValue = "'"+ data.result[i].id+"'";
                    var tempCode = "'"+ data.result[i].name+"'";
                    $("#codeMes").append('<a href="#" id="'+data.result[i].id+'" ondblclick="spanOperation('+tempValue+','+tempCode+')"><p>'+data.result[i].name+'</p></a>')
                }
                codeMesScroll();//为代码详情设置滚动条
            }
        });
    };


    //公式保存
    window.updateSaveByFormula = function() {
        if(salaryItemDto!=null&&salaryItemId!=null&&salaryItemId!='') {

            //清除表达式的样式（颜色）
            var showDiv = document.getElementById("show");//内容解析
            for (var i=0;i<showDiv.children.length;i++) {
                oChild = showDiv.children[i];
                oChild.style.color = "black";
                oChild.style.fontWeight = "normal";
            }

            //检查公式是否正确
            var expSpan = document.all("exp").innerHTML;//包含所有的span标签——实际内容
            var expValue = document.all("exp").innerText;//去除标签获取的所有值——实际内容
            var expDiv = document.getElementById("exp");//内容解析

            var showSpan = document.all("show").innerHTML;//包含所有的span标签——表达式
            var showValue = document.all("show").innerText;//去除标签获取的所有值——表达式

            //公式的所有span标签第一个应该是薪资项的结果存放处，第二个应该是等号
            if(expDiv.children.length < 3) {
                pop_tip_open("blue","公式设置格式不对，请重新设置");
                return;
            }

            //公式左侧必须是账套薪资项
            if(expDiv.children[0].innerText.split(".")[0]!="hr_wage_salary_info") {
                pop_tip_open("blue","公式左侧必须为薪资项，请重新设置");
                return
            }

            //公式配置的第二个必须是“=”
            if(expDiv.children[1].innerText!="=") {
                pop_tip_open("blue","公式设置不完整，请重新设置");
                return
            }

            //解析出公式的最后结果存放项，进行保存设置
            var tempSalaryItemCode = expDiv.children[0].innerText.split(".")[1];
            if(tempSalaryItemCode==undefined||tempSalaryItemCode==null||tempSalaryItemCode=='') {
                pop_tip_open("blue","公式设置不完整，请重新设置");
                return
            }
            //保存公式设置
            var tempDto;//需要保存修改的账套薪资项ID
            var dto = {};
            dto.sid = $("#id").val();
            dto.id = $("#id").val();
            dto.itemCode = $("#itemCode").val();
            dto.formulaExpression = expValue;//公式的实际内容
            dto.formulaContent = showValue;//公式表达式
            dto.formulaExpressionHtml = expSpan;//带标签的公式实际内容
            dto.formulaContentHtml = showSpan;//带标签的公式表达式
            dto.modelOrEditor = $("#modelOrEditor").val();//存储公式类型
            //公式实际内容按照，单独存储至备注中，方便后面进行解析
            var remark = '';
            for(var i=0;i<expDiv.children.length;i++) {
                remark = remark + expDiv.children[i].innerText;
                if(i!=expDiv.children.length-1) {
                    remark = remark + ',';
                }
            }
            dto.remark = remark;
            dto.delflag = 0;

            $.ajax({
                type:'POST',
                dataType:'JSON',
                contentType:'application/json',
                url:hostUrl+ "wage/wageFormula/updateSaveByFormula/",
                data: JSON.stringify(dto),
                success: function (xhr, textStatus) {
                    console.log(xhr);
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","公式保存成功！");
                            // localStorage.setItem('gotoTab',JSON.stringify(itemGrid));//跳转至个税页签
                            // localStorage.setItem('editId',JSON.stringify($("#id").val()));//修改主键ID
                            // // window.history.go(-1);
                            // window.location.href="wage_basics_setting.html";
                            // goBack();
                        }else{
                            $.xljUtils.tip("blue",xhr.message);
                            return;
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
        }else {
            pop_tip_open("blue","没有设置薪资结果项，无法保存!");
        }
    };

    //选择公式的具体项，并进行颜色切换
    window.iclick = function() {
        var div1 = document.getElementById("show");
        var count = div1.children.length;
        var oChild;
        for (var i=0;i<count;i++) {
            oChild = div1.children[i];
            oChild.style.color = "black";
            oChild.style.fontWeight = "normal";
        }
        event.srcElement.style.color = "red";
        event.srcElement.style.fontWeight = "bold";
        spanValue = event.srcElement;
    };

    //为公式计算内置等号及其左边部分
    window.spanBeginOperation = function (value, name) {
        var randomName = Math.random();
        var showSpan = "<span id='show_" + value +'_'+ randomName + "'>" + name + "</span>"
        var expSpan = "<span id='exp_" + value +'_'+ randomName + "'>" + value + "</span>"
        document.all('show').insertAdjacentHTML('BeforeEnd', showSpan);
        document.all("exp").insertAdjacentHTML('BeforeEnd', expSpan);
        actStatus = "";
    };

    //公式具体项删除操作
    window.removeSpan = function() {
        if (spanValue == null || spanValue=='') {
            pop_tip_open("blue","请选择公式项后再进行操作");
            return;
        } else {
            var name = spanValue.id.substring(5, spanValue.id.length);
            document.all('show').removeChild(spanValue);
            document.all("exp").removeChild(document.all["exp_" + name]);
            spanValue = null;
        }
    };

    //公式输入
    window.spanOperation = function(value, name) {
        if (actStatus == 'insert') {    //执行插入操作
            var randomName = Math.random();
            var expSpan = "<span id='show_" + value +'_'+ randomName + "' onclick=iclick()>" + name + "</span>";
            spanValue.insertAdjacentHTML("BeforeBegin", expSpan);

            var showSpan = "<span id='exp_" + value +'_'+ randomName + "'>" + value + "</span>";
            var spanname = spanValue.id.substring(5, spanValue.id.length);
            document.all["exp_" + spanname].insertAdjacentHTML("BeforeBegin", showSpan);

            spanValue.removeAttribute("style");
            spanValue = null;
            actStatus = "";
            return;
        } else if (actStatus == 'replace') { //执行替换操作
            spanValue.innerText = name;
            var spanname = spanValue.id.substring(5, spanValue.id.length);
            document.all["exp_" + spanname].innerText = value;
            spanValue.removeAttribute("style");
            spanValue = null;
            actStatus = "";
            return;
        } else {        //在show中添加span元素
            var randomName = Math.random();
            var showSpan = "<span id='show_" + value +'_'+ randomName + "' onclick=iclick()>" + name + "</span>"
            var expSpan = "<span id='exp_" + value +'_'+ randomName + "'>" + value + "</span>"
            document.all('show').insertAdjacentHTML('BeforeEnd', showSpan);
            document.all("exp").insertAdjacentHTML('BeforeEnd', expSpan);
            actStatus = "";
        }
    };

    //公式配置中的替换操作
    window.setActStatus = function(status) {
        if (spanValue == null || spanValue == '') {
            pop_tip_open("blue","请选择具体公式项后再进行操作");
            return;
        }
        //设置操作状态
        actStatus = status;
    };

    //公式清除
    window.clearText = function() {
        pop_text_open("blue",'是否确定清除公式？',function(){
            document.all("exp").innerHTML = "";
            document.all('show').innerHTML = "";
            spanValue = null;
            actStatus = "";
            spanValue = $("#show").val();

            //显示对应公式
            var tempValue = salaryItemDto.name_en + "."+ salaryItemDto.code;
            var tempCode = salaryItemDto.setName + "."+ salaryItemDto.name;
            spanBeginOperation(tempValue, tempCode);
            spanBeginOperation('=', '=');
        },true);
    };

    //初始化主键ID
    window.initUuid = function () {
        $.ajax({
            type:'get',
            url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#id").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };

    //为参考项目增加细滚动条
    window.itemByTypeScroll = function () {
        $("#itemByType").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
        $("#itemByType").getNiceScroll().show().resize();
    };

    //为代码详情增加细滚动条
    window.codeMesScroll = function () {
        $("#codeMes").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
        $("#codeMes").getNiceScroll().show().resize();
    };


    $(function () {

        queryAuth();//功能权限设置

        //初始化高度
        resizeHeight();

        initSalaryItem();

        //禁用所有按钮的默认行为，即刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });


    //返回上一级
    window.goBack = function () {
        localStorage.setItem('gotoTab',JSON.stringify(itemGrid));//跳转至个税页签
        localStorage.setItem('editId',JSON.stringify($("#id").val()));//修改主键ID
        window.location.href="wage_basics_setting.html";
    };

})(jQuery, window, document);