
var itemId;
var itemCode;
var leaveCode;
var fType;
var correspond;

;(function ($,window,document,undefined) {

    //接收传过来的三个参数值
    itemId = localStorage.getItem('editId');
    itemCode = localStorage.getItem('itemCode');
    leaveCode = localStorage.getItem('leaveCode');
    fType = localStorage.getItem('fType');
    correspond = localStorage.getItem('correspond');

    if (itemId && itemId != undefined && itemId != 'undefined' && itemId != null) {
        itemId = JSON.parse(itemId);
    }
    if (itemCode && itemCode != undefined && itemCode != 'undefined' && itemCode != null) {
        itemCode = JSON.parse(itemCode);
    }
    if (leaveCode && leaveCode != undefined && leaveCode != 'undefined' && leaveCode != null) {
        leaveCode = JSON.parse(leaveCode);
    }
    if (fType && fType != undefined && fType != 'undefined' && fType != null) {
        fType = JSON.parse(fType);
    }
    if (correspond && correspond != undefined && correspond != 'undefined' && correspond != null) {
        correspond = JSON.parse(correspond);
    }
    //要手动remove
    // localStorage.removeItem('itemId');
    // localStorage.removeItem('itemCode');
    // localStorage.removeItem('leaveCode');
    // localStorage.removeItem('fType');
    // localStorage.removeItem('correspond');
    var correspondName = $.hrUtils.getHRInfoNameById('hr_wage_salary_info',correspond);
    var itemRemark = $.hrUtils.getRemarkBySetNameItemCode('hr_wage_salary_info',itemCode);
    var itemRemarks = itemRemark.split(";");
    //计算表格高度
    window.resizeHeight = function() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧只有一个列表 高一点
        //表示con-table 下的mytable1
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

    //公式模板切换
    window.formulaSel = function () {
        var temp = $("#formulaSelect").val();
        if(temp==0) { //显示公式模板
            document.getElementById('formulaMouldDiv').style.display = 'block';//设置为显示
            document.getElementById('editFormulaDiv').style.display = 'none';//设置为隐藏
        }else if(temp==1) { //显示公式编辑器
            document.getElementById('editFormulaDiv').style.display = 'block';//设置为显示
            document.getElementById('formulaMouldDiv').style.display = 'none';//设置为隐藏
        }
    };

    //公式模板增加行记录
    window.addFormulaMoudle = function() {
        $("#formulaMouldTable").append(
            ' <tr class="form-tr" style="height:50px; margin-top:10px; line-height:50px; background: #FFFFFF;border: 1px solid #E4F2FF; display:block;">' +
            '   <td style="display:block;">' +
            '       <span class="form-label">'+correspondName+'>' +
            '           <input style="width:80px; height:30px; background: #FFFFFF; border: 1px solid #E1E1E1; border-radius: 3px;" name="item_num" type="text" onchange="updateMinNum();" >' +
            '           <span>'+itemRemarks[0]+'</span>' +
            '           <span>，按每</span>' +
            '           <input style="width:80px; height:30px; background: #FFFFFF; border: 1px solid #E1E1E1; border-radius: 3px;" name="item_type" type="text" value="'+itemRemarks[0]+'" readonly >' +
            '           <span>'+itemRemarks[1]+'扣款</span>' +
            '           <input style="width:80px; height:30px; background: #FFFFFF; border: 1px solid #E1E1E1; border-radius: 3px;" name="item_money" type="text" >' +
            '           <span>'+itemRemarks[2]+'。</span>' +
            '       </span>' +
            '       <button style="width:50px; height:24px; margin-top:10px; float:right; margin-right:24px; font-family: MicrosoftYaHei; font-size: 13px;color: #46A7FF;letter-spacing: 0; line-height: 13px; background: #FFFFFF; border: 1px solid #D6D6D6; border-radius: 3px;" type="button" title="删除" onclick="delFormulaMoudle(this)">' +
            '           删除' +
            '       </button>'+
            '   </td>' +
            '</tr>'
        );
    };

    //每次设置迟到次数的时候，更新下面的最小值
    window.updateMinNum = function() {
        var itemNum = document.getElementsByName("item_num");
        var minVal = itemNum[0].value;;
        for(var i = 0; i < itemNum.length -1; i ++) {
            if(itemNum[0+1].value < minVal){
                minVal = itemNum[0+1].value;
            }
        }
        document.getElementById("minuteEarly").value = minVal;
    };

    //刪除行記錄
    window.delFormulaMoudle = function (obj) {
        var i = obj.parentNode.parentNode.rowIndex;
        document.getElementById('formulaMouldTable').deleteRow(i);
        updateMinNum();
    };


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
                                $("#saveFormulaFirstBtn").show();//保存
                                $("#formulaSaveBtn2").show();//保存
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
        //功能权限控制
        queryAuth();
        //初始化高度
        resizeHeight();
        //初始化页面左上角名字
        initPageName();
        //初始化页面的值
        initVal();
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
        localStorage.setItem('gotoTab',JSON.stringify("kqItemList"));//跳转至薪资项目设置页签
        localStorage.setItem('editId', JSON.stringify(itemId));//修改主键ID
        window.location.href="wage_basics_setting.html";
    };

    //公式保存js方法
    window.saveFormulaFirst = function(){
        //校验是否可以保存
        var itemNum = document.getElementsByName("item_num");
        if(itemNum.length > 1){
            for(var i = 1; i < itemNum.length; i ++) {
                if(parseInt(itemNum[i].value)<parseInt(itemNum[i-1].value)){
                    pop_tip_open("blue", "次数必须为依次递增,保存失败！");
                    return false;
                }
            }
        }
        //sign默认值为1,1为保存，2为修改
        var sign =  $("#sign").val();
        var data = "";
        var myTable = document.getElementById('formulaMouldTable');
        var rows = myTable.rows;
        for (var i=0; i<rows.length; i++) {
            var row = rows[i];
            data = data + row.cells[0].getElementsByTagName('input')[0].value;
            data = data + "#" + row.cells[0].getElementsByTagName('input')[1].value;
            data = data + "#" + row.cells[0].getElementsByTagName('input')[2].value + "@";
        }
        data = data + ";" + fType + ";" + itemId + ";" + itemCode + ";" + correspond + ";" + leaveCode;
        if(sign=="1"){
            var uBody = "wage/wageFormula/save";
            $("#sign").val("2");
        }else if(sign=="2"){
            var uBody = "wage/wageFormula/updateFormula";
        }
        var uAll = hostUrl + uBody;
        $.ajax({
            url: uAll,
            type: 'post',
            dataType: 'text',
            data: data,
            success: function (resultData) {
                if (resultData) {
                    var json2map=JSON.parse(resultData);
                    var successFlag = json2map.success;
                    var message = json2map.message;
                    if (successFlag) {
                        if (sign == 1) {//保存并新增
                            pop_tip_open("green", "数据保存成功！");
                        }else if (sign == 2) {//保存并修改
                            pop_tip_open("green", "数据修改成功！");
                        }
                        // goBack();
                    } else {
                        pop_tip_open("red", "数据保存失败！" + message);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据保存请求失败");
            }
        });
    };

    window.initPageName = function () {
        var uFormulaBody = "wage/wageSalaryItem/querySalaryItem";
        var uFormulaAll = hostUrl + uFormulaBody;
        // var itemIds = [itemId];
        $.ajax({
            url: uFormulaAll,
            type: 'post',
            dataType:'JSON',
            contentType:'application/json',
            data: JSON.stringify({"itemIds":itemId}),
            success: function (formulRresultData) {
                var successFlag = formulRresultData.success;
                if (successFlag) {
                    resultVal = formulRresultData.result;
                    pageName = resultVal[0].name;
                    $("#itemName").html(pageName);
                    $("#itemName1").html(pageName);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据获取请求失败");
            }
        });
    };

    window.initVal = function(){
        //获取传过来的参数
        $("#itemId").val(itemId);
        $("#itemCode").val(itemCode);
        $("#leaveCode").val(leaveCode);
        $("#fType").val(fType);
        $("#correspond").val(correspond);
            //根据ID查询是否存在已经配置过的公式，区分是显示模板还是显示编辑器
            $.ajax({
                type:'get',
                url:hostUrl +"/wage/wageFormula/get/"+itemId,
                success: function(resultData) {
                    if(resultData.result!=null) { //存在历史公式
                        if(resultData.result.modelOrEditor=="0"){//公式模板
                            //根据itemCode查询数据库是否存在记录，如果存在，设置sign为2，即点击保存执行修改方法；
                            var uFormulaBody = "wage/wageFormula/queryList";
                            var uFormulaAll = hostUrl + uFormulaBody;
                            var formulaResultVal =new Array();
                            $.ajax({
                                url: uFormulaAll,
                                type: 'post',
                                dataType:'JSON',
                                contentType:'application/json',
                                data: JSON.stringify({"itemCode":itemCode}),
                                success: function (formulRresultData) {
                                    if (formulRresultData) {
                                        var successFlag = formulRresultData.success;
                                        var message = formulRresultData.message;
                                        if (successFlag) {
                                            //循环显示表格数据
                                            formulaResultVal = formulRresultData.result;
                                            //如果根据code找到已经存在数据，则修改sign为2，即点击保存执行修改操作；
                                            if(formulaResultVal.length!=0){
                                                //设置为修改标识
                                                $("#sign").val("2");
                                                //如果为公式模板则默认显示模板，如果为公式编辑器，则默认显示公式编辑器
                                                modelOrEditor = formulaResultVal[0].modelOrEditor;
                                                $("#formulaSelect").val("0");
                                                formulaSel();
                                                //并且查找数据库，反显记录数据
                                                var uBody = "wage/wageFormulaDetail/queryList";
                                                var uAll = hostUrl + uBody;
                                                var resultVal =new Array();
                                                $.ajax({
                                                    url: uAll,
                                                    type: 'post',
                                                    dataType:'JSON',
                                                    contentType:'application/json',
                                                    data: JSON.stringify({"itemId":formulaResultVal[0].sid}),
                                                    success: function (resultData) {
                                                        if (resultData) {
                                                            var successFlag = resultData.success;
                                                            var message = resultData.message;
                                                            if (successFlag) {
                                                                //循环显示表格数据
                                                                resultVal = resultData.result;
                                                                for(num in resultVal){
                                                                    var obj = resultVal[num];
                                                                    leaveType = obj.leaveType;
                                                                    leaveMoney = obj.leaveMoney;
                                                                    leaveNum = obj.leaveNum;
                                                                    $("#formulaMouldTable").append(
                                                                        ' <tr class="form-tr" height="40px">' +
                                                                        '   <td>' +
                                                                        '       <span class="form-label">'+correspondName+'>' +
                                                                        '           <input name="item_num" type="text" value="'+leaveNum+'" onchange="updateMinNum();">' +
                                                                        '           <span>'+itemRemarks[0]+'</span>' +
                                                                        '           <span>，按每</span>' +
                                                                        '           <input name="item_type" type="text" value="'+leaveType+'" readonly >' +
                                                                        '           <span>'+itemRemarks[1]+'扣款</span>' +
                                                                        '           <input name="item_money" type="text" value="'+leaveMoney+'" >' +
                                                                        '           <span>'+itemRemarks[2]+'。</span>' +
                                                                        '       </span>' +
                                                                        '       <button type="button" title="删除" onclick="delFormulaMoudle(this)">' +
                                                                        '           删除' +
                                                                        '       </button>'+
                                                                        '   </td>' +
                                                                        '</tr>'
                                                                    );
                                                                }
                                                                updateMinNum();
                                                            } else {
                                                                pop_tip_open("red", "数据获取失败！" + message);
                                                            }
                                                        }
                                                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                        pop_tip_open("red", "数据获取请求失败");
                                                    }
                                                });
                                            }else{
                                                addFormulaMoudle();
                                            }
                                        } else {
                                            pop_tip_open("red", "数据获取失败！" + message);
                                        }
                                    }
                                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    pop_tip_open("red", "数据获取请求失败");
                                }
                            });
                        }else if(resultData.result.modelOrEditor=="1"){//公式编辑器
                            // saveFlag = 1;//修改保存
                            $("#sign").val("2");
                            $("#id").val(itemId);
                            $("#itemCode").val(resultData.result.itemCode);
                            $("#formulaSelect").val("1");
                            formulaSel();
                            document.all('show').insertAdjacentHTML('BeforeEnd', resultData.result.formulaContentHtml);
                            document.all("exp").insertAdjacentHTML('BeforeEnd', resultData.result.formulaExpressionHtml);
                        }
                    }else { //不存在初始化信息
                        addFormulaMoudle();
                        // saveFlag = 0;//新增保存
                        $("#sign").val("1");
                        $("#id").val(itemId);
                        var uFormulaBody = "wage/wageSalaryItem/querySalaryItem";
                        var uFormulaAll = hostUrl + uFormulaBody;
                        // var itemIds = [itemId];
                        $.ajax({
                            url: uFormulaAll,
                            type: 'post',
                            dataType:'JSON',
                            contentType:'application/json',
                            data: JSON.stringify({"itemIds":itemId}),
                            success: function (formulRresultData) {
                                var successFlag = formulRresultData.success;
                                if (successFlag) {
                                    resultVal = formulRresultData.result;
                                    // var tempValue = resultVal[0].name_en + "."+ resultVal[0].code;
                                    // var tempCode = resultVal[0].setName + "."+ resultVal[0].name;
                                    // spanBeginOperation(tempValue,tempCode);
                                    // spanBeginOperation('=','=');
                                }
                            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                pop_tip_open("red", "数据获取请求失败");
                            }
                        });
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","公式初始化请求失败");
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
        salaryItemId = itemId;

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
                                    // saveFlag = 1;//修改保存
                                    $("#sign").val("2");
                                    $("#id").val(salaryItemId);
                                    $("#itemCode").val(resultData.result.itemCode);
                                    // document.all('show').insertAdjacentHTML('BeforeEnd', resultData.result.formulaContentHtml);
                                    // document.all("exp").insertAdjacentHTML('BeforeEnd', resultData.result.formulaExpressionHtml);
                                }else { //不存在初始化信息
                                    // saveFlag = 0;//新增保存
                                    $("#sign").val("1");
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
        $("#projectType7").css("color","#4A4A4A");
        $("#projectType7").css("border-bottom","1px solid #D6D6D6");

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
        var dto = {itemType:type,status:'1',time:new Date()};

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
            dto.id = $("#id").val();
            dto.sid = $("#id").val();
            dto.itemCode = itemCode;
            debugger;
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
                            // goBack();
                            // localStorage.setItem('gotoTab',JSON.stringify(itemGrid));//跳转至个税页签
                            // localStorage.setItem('editId',JSON.stringify($("#id").val()));//修改主键ID
                            // window.location.href="wage_basics_setting.html";
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

    //为公式计算内置等号及其左边部分
    window.spanBeginOperation = function (value, name) {
        var randomName = Math.random();
        var showSpan = "<span id='show_" + value +'_'+ randomName + "'>" + name + "</span>"
        var expSpan = "<span id='exp_" + value +'_'+ randomName + "'>" + value + "</span>"
        document.all('show').insertAdjacentHTML('BeforeEnd', showSpan);
        document.all("exp").insertAdjacentHTML('BeforeEnd', expSpan);
        actStatus = "";
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
    }

})(jQuery, window, document);