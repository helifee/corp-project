/**
 * Created by ciic on 2017/6/16.
 */

var row_data = localStorage.getItem('row_data');
var editId =localStorage.getItem('editId');//var row_data = window.opener.row_data;
var saveType = localStorage.getItem('saveType');//var saveType = window.opener.saveType;
;
(function ($, window, document, undefined) {

window.init=function () {
    if (saveType == "update") {
        if (editId != null && editId != '' && editId != 'undefined') {
            editId = JSON.parse(editId);
            $.ajax({
                type: 'get',
                url: hostUrl + "si/fundRule/get/" + editId,
                success: function (data) {
                    $("#hide_id").val(data.result.sid);
                    $('title').text("修改公积金缴费规则");
                    $(".xj-form-title").text("修改公积金缴费规则");
                    $("#fundArea").val(data.result.fundArea);
                    $("#fundArea_name").val($.hrUtils.getHRRegionNameById(data.result.fundArea));
                    $("#fundBtn").hide();
                    $("#fundEmpScale").val(data.result.fundEmpScale);
                    $("#fundUnitScale").val(data.result.fundUnitScale);
                    $("#empCostNumberLength").val(data.result.empCostNumberLength);
                    $("#unitCostNumberLength").val(data.result.unitCostNumberLength);
                    $("#mantissaProcessingRule option[value='" + data.result.mantissaProcessingRule + "']").attr("selected", "selected");
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "初始化薪资项请求失败");
                }
            });
        }
    }
    if (saveType == "add") {
            initUuid();
    }
    localStorage.setItem('gotoTab',JSON.stringify("fund"));//跳转指定页签
};

window.save = function (){
    var id = $("#hide_id").val();
    var fundArea = $("#fundArea").val();
    var fundEmpScale = $("#fundEmpScale").val();
    var fundUnitScale = $("#fundUnitScale").val();
    var empCostNumberLength = $("#empCostNumberLength").val();
    var unitCostNumberLength = $("#unitCostNumberLength").val();
    var mantissaProcessingRule=$("#mantissaProcessingRule").val();
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
    if(mantissaProcessingRule==""){
        pop_tip_open("blue","请选择位数处理规则！");
        return;
    }
    if(saveType=="add"){ // 如果是新增的情况
        var num;
        //防重复校验
        var paramMap = {fundArea:fundArea};
        $.ajax({
            type:'POST',
            url:hostUrl+ "si/fundRule/queryCheckFund",
            data: JSON.stringify(paramMap),
            dataType:'json',
            contentType:'application/json',
            async : false,
            success: function(data){
                num = data.result;
                var message = data.message;
                if(data.success && num==0){

                }else{
                    pop_tip_open("blue","已存在该城市公积金缴费规则！请重新选择公积金缴纳地！");
                }
            },error:function (e) {
                pop_tip_open("red","防重复验证请求失败！");
            }
        });
        if(num==0){
            var dto = {id:id,sid:id,fundArea:fundArea,fundEmpScale:fundEmpScale,fundUnitScale:fundUnitScale,empCostNumberLength:empCostNumberLength,
                unitCostNumberLength:unitCostNumberLength,mantissaProcessingRule:mantissaProcessingRule,delflag:0};
            $.ajax({
                type: "POST",
                url:hostUrl+ "si/fundRule/save",
                data: JSON.stringify(dto),
                dataType: "JSON",
                contentType:"application/json",
                success: function(data){
                    if(data.success){
                        pop_tip_open("green",data.message);
                        localStorage.removeItem('editId');
                        localStorage.setItem('editId',JSON.stringify(id));//聚焦显示
                        // window.history.go(-1);
                        goBack();
                    }else {
                        pop_tip_open("blue",data.message);
                    }
                },error:function (e) {
                    pop_tip_open("red","保存请求失败");
                }
            });
        }
    }
    if(saveType=="update"){
        var dto = {fundArea:fundArea,fundEmpScale:fundEmpScale,fundUnitScale:fundUnitScale,
            mantissaProcessingRule:mantissaProcessingRule,empCostNumberLength:empCostNumberLength,unitCostNumberLength:unitCostNumberLength}
        $.ajax({
            type: "PUT",
            url:hostUrl+ "/si/fundRule/update/"+editId,
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                if(data.success) {
                    pop_tip_open("green",data.message);
                    //刷新父页面表格数据
                    localStorage.removeItem('editId');
                    localStorage.setItem('editId',JSON.stringify(editId));//聚焦显示
                    // window.history.go(-1);
                    goBack();
                }else {
                    pop_tip_open("blue",data.message);
                }
            },error:function (e) {
                pop_tip_open("red","更新数据请求失败");
            }
        });
    }
    //要手动remove
    // localStorage.removeItem('editId');
    // localStorage.removeItem('saveType');

};

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
        var fundArea = $("#fundArea").val();
        var fundAreaName = $("#fundArea_name").val();
        for(var i=0;i<row_data.length;i++){
            if(row_data[i].fundArea==fundArea){
                pop_tip_open("blue",fundAreaName+"已有规则！");
                $("#fundArea").val("");
                $("#fundArea_name").val("");
                // localStorage.removeItem('row_data');
                return;
            }
        }
    };

    window.emptyFund=function () {
        $("#fundArea_name").val("");
        $("#fundArea").val("");
    };

    window.goBack=function(){
        window.location.href="social_fund_rule_list.html?queryFlag=01";
    };

    $(function () {
        init();
    });

})(jQuery, window, document);
