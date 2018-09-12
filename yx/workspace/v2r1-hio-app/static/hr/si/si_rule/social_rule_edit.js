/**
 * Created by ciic on 2017/6/16.
 */

var editId =localStorage.getItem('editId'); //window.opener.row_data;
var saveType = localStorage.getItem('saveType');//window.opener.saveType;
var row_data=localStorage.getItem('row_data');
;(function ($,window,document,undefined) {

    window.init  = function (){
        if(saveType=="update"){//如果为修改
            //var editId = localStorage.getItem('editId');
            if (editId != null && editId != '' && editId != 'undefined') {
                editId = JSON.parse(editId);
                $.ajax({
                    type:'get',
                    url:hostUrl +"si/socialRule/get/"+editId,
                    success: function(data) {
                        $("#hide_id").val(data.result.sid);
                        $("#setId").val(data.result.setId);
                        $('title').text("修改社保规则");
                        $(".xj-form-title").text("修改社保规则");
                        $("#siPayArea").val(data.result.siPayArea);
                        $("#siPayArea_name").val($.hrUtils.getHRRegionNameById( data.result.siPayArea));
                        $("#siBtn").hide();
                        $("#socialPayArea option[value='"+data.result.socialPayArea+"']").attr("selected","selected");
                        $("#socialPayArea").attr("disabled","disabled");
                        $("#injuryUnitScale").val(data.result.injuryUnitScale);//.substring(0,data.result.injuryUnitScale.length -1)
                        $("#endowmentEmpScale").val(data.result.endowmentEmpScale);//.substring(0,data.result.endowmentEmpScale.length -1)
                        $("#endowmentUnitScale").val(data.result.endowmentUnitScale);//.substring(0,data.result.endowmentUnitScale.length -1)
                        $("#medicalEmpScale").val(data.result.medicalEmpScale);//.substring(0,data.result.medicalEmpScale.length -1)
                        $("#medicalUnitScale").val(data.result.medicalUnitScale);//.substring(0,data.result.medicalUnitScale.length -1)
                        $("#outworkEmpScale").val(data.result.outworkEmpScale);//.substring(0,data.result.outworkEmpScale.length -1)
                        $("#outworkUnitScale").val(data.result.outworkUnitScale);//.substring(0,data.result.outworkUnitScale.length -1)
                        $("#birthUnitScale").val(data.result.birthUnitScale);//.substring(0,data.result.birthUnitScale.length -1)
                        $("#fundEmpScale").val(data.result.fundEmpScale);
                        $("#illnessEmpCost").val(data.result.illnessEmpCost);
                        $("#illnessUnitCost").val(data.result.illnessUnitCost);
                        $("#empCostNumberLength").val(data.result.empCostNumberLength);
                        $("#unitCostNumberLength").val(data.result.unitCostNumberLength);
                        $("#mantissaProcessingRule option[value='"+data.result.mantissaProcessingRule+"']").attr("selected","selected");
                    },error:function(XMLHttpRequest, textStatus, errorThrown){
                        pop_tip_open("red","初始化薪资项请求失败");
                    }
                });
            } else {
                pop_tip_open("blue","数据初始化失败!");
            }
        }
        if(saveType=="add"){
            initUuid();
        }
        localStorage.setItem('gotoTab',JSON.stringify("soc"));//跳转指定页签
    };

    window.saveBtn = function (){
        var id = $("#hide_id").val();
        var siPayArea = $("#siPayArea").val();
        var socialPayArea = $("#socialPayArea").val();
        var endowmentEmpScale = $("#endowmentEmpScale").val();
        var endowmentUnitScale = $("#endowmentUnitScale").val();
        var medicalEmpScale = $("#medicalEmpScale").val();
        var medicalUnitScale = $("#medicalUnitScale").val();
        var outworkEmpScale = $("#outworkEmpScale").val();
        var outworkUnitScale = $("#outworkUnitScale").val();
        var birthUnitScale =  $("#birthUnitScale").val();
        var injuryUnitScale =  $("#injuryUnitScale").val();
        //  var illnessUnitScale = $("#illnessUnitScale").val();
        // var empFixedPay = $("#empFixedPay").val();
        //  var unitFixedPay = $("#unitFixedPay").val();
        var empCostNumberLength =$("#empCostNumberLength").val();
        var unitCostNumberLength =$("#unitCostNumberLength").val();

        var illnessEmpCost =$("#illnessEmpCost").val();
        var illnessUnitCost =$("#illnessUnitCost").val();
        var mantissaProcessingRule=$("#mantissaProcessingRule").val();

        var for_dto = [[endowmentEmpScale,"养老保险个人比例格式不正确！"],[endowmentUnitScale,"养老保险公司比例格式不正确!"],[medicalEmpScale,"医疗保险个人比例格式不正确!"],
            [medicalUnitScale,"医疗保险公司比例格式不正确！"],[outworkEmpScale,"失业保险个人比例格式不正确"],[outworkUnitScale,"失业保险公司比例格式不正确"],
            [birthUnitScale,"生育保险公司比例格式不正确"],[injuryUnitScale,"工伤保险公司比例格式不正确！"]/*,[illnessEmpCost,"大病个人缴费金额格式不正确"],[illnessUnitCost,"大病单位缴费金额格式不正确"]*/];

        var for_dto1 = [[endowmentEmpScale,"请填写养老保险个人比例格式！"],[endowmentUnitScale,"请填写养老保险公司比例格式!"],[medicalEmpScale,"请填写医疗保险个人比例格式!"],
            [medicalUnitScale,"请填写医疗保险公司比例格式！"],[outworkEmpScale,"请填写失业保险个人比例格式"],[outworkUnitScale,"请填写失业保险公司比例格式"],
            [birthUnitScale,"请填写生育保险公司比例格式"],[injuryUnitScale,"请填写工伤保险公司比例格式！"]/*,[illnessEmpCost,"大病个人缴费金额格式不正确"],[illnessUnitCost,"大病单位缴费金额格式不正确"]*/];

        var re_1 = /^[1-9]{1,1}[0-9]{0,1}$/;
        var re_2=/^[1-9]{1,1}[0-9]{0,1}\.[0-9]{1,2}$/;
        var re_3=/^[0]{1,1}$/; //当输入0时
        var re_4=/^[0]{1,1}\.[0-9]{1,2}$/; //当输入0.00样式时
        var re_0 = /^[1-9]{0,1}[0-9]{1,1}$/;
        var re_money = /^(?=([0-9]{1,7}$|[0-9]{1,7}\.))(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/;
        if(siPayArea==""){
            pop_tip_open("blue","请选择社保缴纳地！");
            return;
        }
        if(socialPayArea==""){
            pop_tip_open("blue","请选择户口性质！");
            return;
        }
        for(var i=0;i<for_dto.length;i++){
            if(for_dto[i][0]==""){
                pop_tip_open("blue",for_dto1[i][1]);
                return;
            }
            if(!re_1.test(for_dto[i][0])&&!re_2.test(for_dto[i][0])&&!re_3.test(for_dto[i][0])&&!re_4.test(for_dto[i][0])){
                pop_tip_open("blue",for_dto[i][1]);
                return;
            }
        }
        if(empCostNumberLength==""){
            pop_tip_open("blue","请填写社保个人缴费额小数位数！");
            return;
        }
        if(!re_0.test(empCostNumberLength)){
            pop_tip_open("blue","社保个人缴费额小数位数格式不正确！");
            return;
        }else if(parseInt(empCostNumberLength)>3||parseInt(empCostNumberLength)<0){
            pop_tip_open("blue","社保个人缴费额小数位数只能是0到3之间！");
            return;
        }
        if(unitCostNumberLength==""){
            pop_tip_open("blue","请填写社保公司缴费额小数位数！");
            return;
        }
        if(!re_0.test(unitCostNumberLength)){
            pop_tip_open("blue","社保公司缴费额小数位数格式不正确！");
            return;
        }else if(parseInt(unitCostNumberLength)>3||parseInt(unitCostNumberLength)<0){
            pop_tip_open("blue","社保公司缴费额小数位数只能是0到3之间！");
            return;
        }
        if(illnessEmpCost==""||illnessEmpCost==null){
            pop_tip_open("blue","请填写大病个人缴费金额！");
            return;
        }
        if(illnessUnitCost==""||illnessUnitCost==null){
            pop_tip_open("blue","请填写大病单位缴费金额！");
            return;
        }
        if(!re_money.test(illnessEmpCost)){
            pop_tip_open("blue","大病个人缴费金额格式不正确！");
            return;
        }
        if(!re_money.test(illnessUnitCost)){
            pop_tip_open("blue","大病单位缴费金额格式不正确！");
            return;
        }
        if(mantissaProcessingRule==""){
            pop_tip_open("blue","请选择尾数处理规则！");
            return;
        }

        if(saveType=="add"){ // 如果是新增的情况
            var num;
            //防重复校验
            var paramMap = {siPayArea:siPayArea,socialPayArea:socialPayArea};
            $.ajax({
                type: "POST",
                url:hostUrl+ "si/socialRule/queryCheckSocial",
                data: JSON.stringify(paramMap),
                dataType: "JSON",
                contentType:"application/json",
                async : false,
                success: function(data){
                    num = data.result;
                    var message = data.message;
                    if(data.success && num==0){

                    }else{
                        pop_tip_open("blue","已存在该城市社保缴费规则！请重新选择社保缴纳地！");
                    }
                },error:function (e) {
                    pop_tip_open("red","防重复验证请求失败！");
                }
            });
            if(num==0){
                var dto = {id:id,sid:id,siPayArea:siPayArea,socialPayArea:socialPayArea,injuryUnitScale:injuryUnitScale,
                    endowmentEmpScale:endowmentEmpScale,endowmentUnitScale:endowmentUnitScale,
                    medicalEmpScale:medicalEmpScale,medicalUnitScale:medicalUnitScale,
                    outworkEmpScale:outworkEmpScale,outworkUnitScale:outworkUnitScale,
                    birthUnitScale:birthUnitScale,illnessEmpCost:illnessEmpCost,illnessUnitCost:illnessUnitCost,
                    empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength,
                    mantissaProcessingRule:mantissaProcessingRule,delflag:0};

                $.ajax({
                    type: "POST",
                    url:hostUrl+ "si/socialRule/save",
                    data: JSON.stringify(dto),
                    dataType: "JSON",
                    contentType:"application/json",
                    success: function(data){
                        var message = data.message;
                        if(data.success){
                            //刷新父页面表格数据
                            localStorage.removeItem('editId');
                            localStorage.setItem('editId',JSON.stringify(id));//聚焦显示
                            // window.history.go(-1);
                            goBack();
                        }else{
                            pop_tip_open("blue",message);
                        }
                    },error:function (e) {
                        pop_tip_open("red","保存请求失败！");
                    }
                });
            }
        }
        if(saveType=="update") {
            var dto = {siPayArea:siPayArea,socialPayArea:socialPayArea,injuryUnitScale:injuryUnitScale,endowmentEmpScale:endowmentEmpScale,
                endowmentUnitScale:endowmentUnitScale,medicalEmpScale:medicalEmpScale,medicalUnitScale:medicalUnitScale,outworkEmpScale:outworkEmpScale,
                outworkUnitScale:outworkUnitScale,birthUnitScale:birthUnitScale,illnessEmpCost:illnessEmpCost,illnessUnitCost:illnessUnitCost,
                empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength,
                mantissaProcessingRule:mantissaProcessingRule};
            $.ajax({
                type: "PUT",
                url: hostUrl + "/si/socialRule/update/" + editId,
                data: JSON.stringify(dto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                   var message = data.message;
                    if(data.success){
                        //刷新父页面表格数据
                        localStorage.removeItem('editId');
                        localStorage.setItem('editId',JSON.stringify(editId));//聚焦显示
                        // window.history.go(-1);
                        goBack();
                    }else{
                        pop_tip_open("blue",message);
                    }
                }
            });
        }
        //要手动remove
        // localStorage.removeItem('editId');
        // localStorage.removeItem('saveType');
    };

    //初始化户口性质
    function getSocialPayArea(codeSetId) {
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
    }


    window.initUuid=function (){
        var uBody = "generator/getGuuid"+"?time="+Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type:'GET',
            async:false,
            url:uAll,
            success: function(data) {
                var guuid=data.result;
                $("#hide_id").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };

    window.forselect=function (){
        var siPayArea = $("#siPayArea").val();
        var siPayAreaNmae = $("#siPayArea_name").val();
        var socialPayArea = $("#socialPayArea").val();
        var socialPayAreaNmae = $("#socialPayArea_name").val();
        for(var i=0;i<row_data.length;i++){
            if(row_data[i].siPayArea==siPayArea && row_data[i].socialPayArea==socialPayArea){
                pop_tip_open("blue",siPayAreaNmae+"-"+socialPayAreaNmae+"已有规则！");
                $("#socialPayArea").val("");
                $("#socialPayArea_name").val("");
                return;
            }
        }
    };
    window.forsiselect=function (){
        var siPayArea = $("#siPayArea").val();
        var siPayAreaName = $("#siPayArea_name").val();
        var socialPayArea = $("#socialPayArea").val();
        var socialPayAreaName = $("#socialPayArea_name").val();
        for(var i=0;i<row_data.length;i++){
            if(row_data[i].siPayArea==siPayArea && row_data[i].socialPayArea==socialPayArea){
                pop_tip_open("blue",siPayAreaName+"-"+socialPayAreaName+"已有规则！");
                $("#siPayArea").val("");
                $("#siPayArea_name").val("");
                return;
            }
        }
    };
    window.closeWindow=function (){
       // window.opener.jqGridRule_social.jqGrid().trigger("reloadGrid");
        window.close();
    };

    window.emptySocial=function () {
        $("#socialPayArea_name").val("");
        $("#socialPayArea").val("");
    };

    window.emptySi=function () {
        $("#siPayArea_name").val("");
        $("#siPayArea").val("");
    };


    //返回上一级
    window.goBack = function () {
        // window.history.go(-1);
        window.location.href="social_fund_rule_list.html?queryFlag=01";
    };

    $(function () {
        getSocialPayArea(socialPayAreaSetId);
        init();
    });

})(jQuery,window,document);
