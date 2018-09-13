/**
 * Created by ciic on 2017/6/16.
 */

var row_data = window.opener.row_data;
var saveType = window.opener.saveType;
init();
function init(){
    if(saveType=="update"){
        $('title').text("修改社保规则");
        $(".xj-form-title").text("修改社保规则");
        $("#siPayArea").val(row_data.siPayArea);
        $("#siPayArea_name").val(row_data.siPayAreaName);
        $("#siPayArea").attr("disabled","disabled");
        $("#siPayArea_name").attr("disabled","disabled");
        $("#siBtn1").hide();
        $("#siBtn2").hide();
        $("#socialPayArea").val(row_data.socialPayArea);
        $("#socialPayArea_name").val(row_data.socialPayAreaName);
        $("#socialPayArea").attr("disabled","disabled");
        $("#socialPayArea_name").attr("disabled","disabled");
        $("#socialBtn1").hide();
        $("#socialBtn2").hide();
        $("#injuryUnitScale").val(row_data.injuryUnitScale.substring(0,row_data.injuryUnitScale.length -1));
        $("#endowmentEmpScale").val(row_data.endowmentEmpScale.substring(0,row_data.endowmentEmpScale.length -1));
        $("#endowmentUnitScale").val(row_data.endowmentUnitScale.substring(0,row_data.endowmentUnitScale.length -1));
        $("#medicalEmpScale").val(row_data.medicalEmpScale.substring(0,row_data.medicalEmpScale.length -1));
        $("#medicalUnitScale").val(row_data.medicalUnitScale.substring(0,row_data.medicalUnitScale.length -1));
        $("#outworkEmpScale").val(row_data.outworkEmpScale.substring(0,row_data.outworkEmpScale.length -1));
        $("#outworkUnitScale").val(row_data.outworkUnitScale.substring(0,row_data.outworkUnitScale.length -1));
        $("#birthUnitScale").val(row_data.birthUnitScale.substring(0,row_data.birthUnitScale.length -1));
       $("#fundEmpScale").val(row_data.fundEmpScale);
       $("#illnessEmpCost").val(row_data.illnessEmpCost);
        $("#illnessUnitCost").val(row_data.illnessUnitCost);
        $("#empCostNumberLength").val(row_data.empCostNumberLength);
        $("#unitCostNumberLength").val(row_data.unitCostNumberLength);
    }
    if(saveType=="add"){
        initUuid();
    }
}
function save(){
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

    if(saveType=="add"){ // 如果是新增的情况
        var dto = {id:id,siPayArea:siPayArea,socialPayArea:socialPayArea,injuryUnitScale:injuryUnitScale,
            endowmentEmpScale:endowmentEmpScale,endowmentUnitScale:endowmentUnitScale,
            medicalEmpScale:medicalEmpScale,medicalUnitScale:medicalUnitScale,
            outworkEmpScale:outworkEmpScale,outworkUnitScale:outworkUnitScale,
            birthUnitScale:birthUnitScale,illnessEmpCost:illnessEmpCost,illnessUnitCost:illnessUnitCost,
            empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength};
        $.ajax({
            type: "POST",
            url:serviceUrl+ "si/socialRule/save",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                //刷新父页面表格数据
                window.opener.focusRuleBack(dto.id);
                window.opener.jqGridRule_social.jqGrid().trigger("reloadGrid");
                window.close();
            }
        });
    }
    if(saveType=="update") {
        var dto = {siPayArea:siPayArea,socialPayArea:socialPayArea,injuryUnitScale:injuryUnitScale,endowmentEmpScale:endowmentEmpScale,
            endowmentUnitScale:endowmentUnitScale,medicalEmpScale:medicalEmpScale,medicalUnitScale:medicalUnitScale,outworkEmpScale:outworkEmpScale,
            outworkUnitScale:outworkUnitScale,birthUnitScale:birthUnitScale,illnessEmpCost:illnessEmpCost,illnessUnitCost:illnessUnitCost,
            empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength};
        $.ajax({
            type: "PUT",
            url: serviceUrl + "/si/socialRule/update/" + row_data.id,
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                //刷新父页面表格数据
                window.opener.focusRuleBack(row_data.id);
                window.opener.jqGridRule_social.jqGrid().trigger("reloadGrid");
                window.close();
            }
        });
    }
}

function initUuid(){
    var uBody = "sys/uuid/generator/getGuuid"+"?time="+Math.random();
    var uAll = serviceUrl + uBody;
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
}

function forselect(){
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
}
function forsiselect(){
    var siPayArea = $("#siPayArea").val();
    var siPayAreaNmae = $("#siPayArea_name").val();
    var socialPayArea = $("#socialPayArea").val();
    var socialPayAreaNmae = $("#socialPayArea_name").val();
    for(var i=0;i<row_data.length;i++){
        if(row_data[i].siPayArea==siPayArea && row_data[i].socialPayArea==socialPayArea){
            pop_tip_open("blue",siPayAreaNmae+"-"+socialPayAreaNmae+"已有规则！");
            $("#siPayArea").val("");
            $("#siPayArea_name").val("");
            return;
        }
    }
}
function closeWindow(){
   // window.opener.jqGridRule_social.jqGrid().trigger("reloadGrid");
    window.close();
}

function emptySocial() {
    $("#socialPayArea_name").val("");
    $("#socialPayArea").val("");
}
function emptySi() {
    $("#siPayArea_name").val("");
    $("#siPayArea").val("");
}