/**
 * Created by ciic on 2017/6/16.
 */

var row_data = window.opener.row_data;
var saveType = window.opener.saveType;
init();

function init(){
    if(saveType=="update"){
        $('title').text("修改公积金缴费规则");
        $(".xj-form-title").text("修改公积金缴费规则");
        $("#fundArea").val(row_data.fundArea);
        $("#fundArea_name").val($.hrUtils.getHRCodeNameById(row_data.fundArea));
        $("#fundArea").attr("disabled","disabled");
        $("#fundArea_name").attr("disabled","disabled");
        $("#fundBtn1").hide();
        $("#fundBtn2").hide();
         $("#fundArea").attr("disabled","disabled");
        $("#fundEmpScale").val(row_data.fundEmpScale.substring(0,row_data.fundEmpScale.length -1));
        $("#fundUnitScale").val(row_data.fundUnitScale.substring(0,row_data.fundUnitScale.length -1));
        $("#empCostNumberLength").val(row_data.empCostNumberLength);
        $("#unitCostNumberLength").val(row_data.unitCostNumberLength);
    }
    if(saveType=="add"){
        initUuid();
    }
}
function save(){
    var id = $("#hide_id").val();
    var fundArea = $("#fundArea").val();
    var fundEmpScale = $("#fundEmpScale").val();
    var fundUnitScale = $("#fundUnitScale").val();
    var empCostNumberLength = $("#empCostNumberLength").val();
    var unitCostNumberLength = $("#unitCostNumberLength").val();

    var re_1 = /^[1-9]{1,1}[0-9]{0,1}$/;
    var re_2=/^[1-9]{1,1}[0-9]{0,1}\.[0-9]{1,2}$/;
    var re_3=/^[0]{1,1}$/; //当输入0时
    var re_4=/^[0]{1,1}\.[0-9]{1,2}$/; //当输入0.00样式时
    var re_0 = /^[0-9]{1,1}[0-9]{0,1}$/;
    if(fundArea==""){
        pop_tip_open("blue","请选择公积金缴纳地！");
        return;
    }
    if(fundEmpScale==""){
        pop_tip_open("blue","请填写公积金个人比例！");
        return;
    }
    if(!re_1.test(fundEmpScale)&&!re_2.test(fundEmpScale)&&!re_3.test(fundEmpScale)&&!re_4.test(fundEmpScale)){
        pop_tip_open("blue","公积金个人比例格式不正确！");
        return;
    }
    if(fundUnitScale==""){
        pop_tip_open("blue","请填写公积金公司比例！");
        return;
    }
    if(!re_1.test(fundUnitScale)&&!re_2.test(fundUnitScale)&&!re_3.test(fundUnitScale)&&!re_4.test(fundUnitScale)){
        pop_tip_open("blue","公积金公司比例格式不正确！");
        return;
    }
    if(empCostNumberLength==""){
        pop_tip_open("blue","请填写公积金个人缴费额小数位数！");
        return;
    }
    if(!re_0.test(empCostNumberLength)){
        pop_tip_open("blue","公积金个人缴费额小数位数格式不正确！");
        return;
    }else if(parseInt(empCostNumberLength)>3||parseInt(empCostNumberLength)<0){
        pop_tip_open("blue","公积金个人缴费额小数位数只能是0到3之间！");
        return;
    }
    if(unitCostNumberLength==""){
        pop_tip_open("blue","请填写公积金公司缴费额小数位数！");
        return;
    }
    if(!re_0.test(unitCostNumberLength)){
        pop_tip_open("blue","公积金公司缴费额小数位数格式不正确！");
        return;
    }else if(parseInt(unitCostNumberLength)>3||parseInt(unitCostNumberLength)<0){
        pop_tip_open("blue","公积金公司缴费额小数位数只能是0到3之间！");
        return;
    }
    if(saveType=="add"){ // 如果是新增的情况
        var dto = {id:id,fundArea:fundArea,fundEmpScale:fundEmpScale,fundUnitScale:fundUnitScale,empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength};
        $.ajax({
            type: "POST",
            url:serviceUrl+ "si/fundRule/save",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                //刷新父页面表格数据
                window.opener.focusRuleBack(dto.id);
                window.opener.jqGridRule_fund.jqGrid().trigger("reloadGrid");
                window.close();
            }
        });
    }
    if(saveType=="update"){
        var dto = {fundArea:fundArea,fundEmpScale:fundEmpScale,fundUnitScale:fundUnitScale,empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength}
        $.ajax({
            type: "PUT",
            url:serviceUrl+ "/si/fundRule/update/"+row_data.id,
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                //刷新父页面表格数据
                window.opener.focusRuleBack(row_data.id);
                window.opener.jqGridRule_fund.jqGrid().trigger("reloadGrid");
                window.close();
            },error:function (e) {
                pop_tip_open("red","更新数据请求失败");
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
    var fundArea = $("#fundArea").val();
    var fundAreaName = $("#fundArea_name").val();
    for(var i=0;i<row_data.length;i++){
        if(row_data[i].fundArea==fundArea){
            pop_tip_open("blue",fundAreaName+"已有规则！");
            $("#fundArea").val("");
            $("#fundArea_name").val("");
            return;
        }
    }
}

function closeWindow(){
   // window.opener.jqGridRule_fund.jqGrid().trigger("reloadGrid");
    window.close();
}
function emptyFund() {
    $("#fundArea_name").val("");
    $("#fundArea").val("");
}