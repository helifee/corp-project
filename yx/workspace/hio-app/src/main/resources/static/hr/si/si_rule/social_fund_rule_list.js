/**
 * Created by ciic on 2017/6/14.
 */


var rowData;//当前选中数据
var rowDataBefore;//上一次选中数据

var saveType;//保存方式
var row_data;
var focusId;

var jqGridRule_social;

var jqGridRule_fund;

$("#fund").hide();
$("#soc").show();
$("#fundSelectArea").hide();
$("#siSelectArea").show();
$("#socialSelectArea").show();
resizeHeight();
listRule_social();
listRule_fund();
resizeGrid();

$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('byuser') > 0) {
        $("#dayDiv").css("display", "block");//按考勤日明细的display属性设置为block（显示）
        $("#monthDiv").css("display", "none");//按考勤月结果的display属性设置为none（隐藏）
    } else {
        $("#dayDiv").css("display", "none");//按考勤日明细的display属性设置为none（隐藏）
        $("#monthDiv").css("display", "block");//按考勤月结果的display属性设置为block（显示）
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});
$('.btn').click(function(e) {
    e.preventDefault();
});
$("#fund").hide();
function ss(){
    $("#judge").val(1);
    $("#fund").hide();
    $("#soc").show();
    $("#fundSelectArea").hide();
    $("#siSelectArea").show();
    $("#socialSelectArea").show();
    focusId=null;
}
function ss1(){
    $("#judge").val(2);
    $("#fund").show();
    $("#soc").hide();
    $("#fundSelectArea").show();
    $("#siSelectArea").hide();
    $("#socialSelectArea").hide();
    focusId=null;
}
function add(){
    var e  =  $("#judge").val();
    if(e==1){
        // openNewWindow("soc_rule_add.html");
        var ids = $('#listRule_social').getDataIDs();//返回数据表的ID数组["66","39"..]
        var socialPayArea = new Array();
        if(ids.length>0){
            for(var i =0;i<ids.length;i++){
                var rowData = $("#listRule_social").jqGrid('getRowData',ids[i]);
                socialPayArea[i]=rowData;
            }
        }
        row_data = socialPayArea;
        saveType = "add";
        window.open("social_rule_edit.html");
    }
    if(e==2){
        var ids = $('#listRule_fund').getDataIDs();//返回数据表的ID数组["66","39"..]
        var fundarea = new Array();
        if(ids.length>0){
            for(var i =0;i<ids.length;i++){
                var rowData = $("#listRule_fund").jqGrid('getRowData',ids[i]);
                 fundarea[i]=rowData;
            }
        }
        row_data = fundarea;
        saveType = "add";
        window.open("fund_rule_edit.html");
    }

}
//回调函数
window.focusRuleBack = function (editId) {
    focusId = editId;
};
function  del(){
    var model = $("#judge").val();
    if(model=="2"){
        var rowIds=$('#listRule_fund').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","请选择要删除的记录！");
            return;
        }
        pop_text_open("blue",'确定删除选中的公积金缴费规则？',function(){
            $.ajax({
                type: "DELETE",
                url:serviceUrl+ "/si/fundRule/deleteBatch/"+rowIds,
                dataType: "JSON",
                contentType:"application/json",
                success: function(data){
                    /*  $('#listRule_fund').setSelection($("#hide_id").val(),true);
                     $('#listRule_fund '+'#'+$("#hide_id").val()).find("td").addClass("ui-state-highlight");*/
                    pop_tip_open("green","删除成功！");
                    var w = $.hrUtils.focusNode(rowIds);
                    focusIdCallBack(w);
                    $('#listRule_fund').jqGrid().trigger("reloadGrid");
                }
            });
        },true);
    }

 if(model=="1"){
     var rowIds=$('#listRule_social').jqGrid("getGridParam","selarrrow");
     if(rowIds.length==0){
         pop_tip_open("blue","请选择要删除的记录！");
         return;
     }
     pop_text_open("blue",'确定删除选中的社保缴费规则？',function(){
         $.ajax({
             type: "DELETE",
             url:serviceUrl+ "/si/socialRule/deleteBatch/"+rowIds,
             dataType: "JSON",
             contentType:"application/json",
             success: function(data){
                 /*  $('#listRule_fund').setSelection($("#hide_id").val(),true);
                  $('#listRule_fund '+'#'+$("#hide_id").val()).find("td").addClass("ui-state-highlight");*/
                 pop_tip_open("green","删除成功！");
                 var w = $.hrUtils.focusNode(rowIds);
                 focusIdCallBack(w);
                 $('#listRule_social').jqGrid().trigger("reloadGrid");
             }
         });
     },true);
 }
}
//返回
function goBack(){
    window.history.go(-1);
}

//计算高度
function resizeHeight(){
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h-90)+"px");
    //右侧table
    $(".con-table .mytable").height((w_h-125)+"px");
}
//计算表格宽度
function resizeGrid(){
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-65);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
    $.xljUtils.gridResizeFn();
}
//grid 自适应宽度
$(window).resize(function(){
    resizeHeight();
    resizeGrid();
});
function openNewWindow(src) {
    window.open(src,'width=' + (window.screen.availWidth - 180)+',height='+ (window.screen.availHeight - 60) + ',top=0, left=90');
}

function listRule_social(){
   var ubody = "si/socialRule/queryListBySocial";
    var uall = serviceUrl+ubody;
    //创建jqGrid组件
    jqGridRule_social = jQuery("#listRule_social").jqGrid(
        {
            url: uall,//uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            datatype : "json",
            width:$('.mytable').width(),
            height:$('.mytable').height()-50,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                // {name : 'siPayArea',label : '社保缴纳地',width : 160,align : "center", formatter: fmatter},
                // {name : 'socialPayArea',label : '社保缴纳户口类型',width : 160,align : "center", formatter: fmatter},
                {name : 'siPayAreaName',label : '社保缴纳地',width : 100,align : "center"},
                {name : 'siPayArea',label : '社保缴纳地代码项',align : "center",hidden : true},
                {name : 'socialPayAreaName',label : '户口性质',width : 160,align : "center"},
                {name : 'socialPayArea',label : '户口性质',align : "center",hidden : true},
                {name : 'endowmentEmpScale',label : '养老保险个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'endowmentUnitScale',label : '养老保险公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'medicalEmpScale',label : '医疗保险个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'medicalUnitScale',label : '医疗保险公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'outworkEmpScale',label : '失业保险个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'outworkUnitScale',label : '失业保险公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'injuryUnitScale',label : '工伤保险公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'birthUnitScale',label : '生育保险公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'illnessEmpCost',label : '大病个人缴费金额',width : 150,align : "right", formatter:percentFormatter2},
                {name : 'illnessUnitCost',label : '大病单位缴费金额',width : 150,align : "right", formatter:percentFormatter2},
             //   {name : 'unitFixedPay',label : '大病公司固定金额',width : 164,align : "right"},
                {name : 'empCostNumberLength',label : '社保个人缴费额小数位数',width : 195,align : "center"},
                {name : 'unitCostNumberLength',label : '社保公司缴费额小数位数',width : 195,align : "center"},
                {name : 'mantissaProcessingRule',label : '尾数处理规则',width : 150,align : "center"}
            ],
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            ondblClickRow: function () {
                //跳转编辑页
                // var rowId = $('#listRule_social').jqGrid("getGridParam", "selrow");
                // var rowData = $('#listRule_social').jqGrid('getRowData', rowId);
                // window.open("ojt_theme_add.html?type=update&id=" + rowData.id);
                foredit();
            },
            gridComplete: function(){
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //添加回显选中行样式
                    $('#listRule_social').setSelection(rowDataBefore.id,true);
                    $('#listRule_social '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                }
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listRule_social").setSelection(focusId);
                }
            },
            loadError:function(xhr,status,error){
                pop_tip_open("red","初始化社保缴费规则列表请求失败");
            },
            viewrecords : true
        });
}
function listRule_fund(){
   var ubody = "si/fundRule/queryListByFund";
    var uall = serviceUrl+ubody;
    //创建jqGrid组件
    jqGridRule_fund = jQuery("#listRule_fund").jqGrid(
        {
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
          //  postData:{"orgId":"","includelow":"0"},
            datatype : "json",
            width:$('.mytable').width(),
            height:$('.mytable').height()-45,
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                // {name : 'fundArea',label : '公积金缴纳地',width : 90,align : "center",editable:false, formatter: fmatter},
                {name : 'fundAreaName',label : '公积金缴纳地',width : 90,align : "center",editable:false},
                {name : 'fundArea',label : '公积金缴纳地代码项',align : "center",hidden : true},
                {name : 'fundEmpScale',label : '公积金个人比例',width : 164,align : "center",editable:true, formatter:percentFormatter},
                {name : 'fundUnitScale',label : '公积金公司比例',width : 164,align : "center",editable:true, formatter:percentFormatter},
                {name : 'empCostNumberLength',label : '公积金个人缴费额小数位数',width : 110,align : "center",editable:true},
                {name : 'unitCostNumberLength',label : '公积金公司缴费额小数位数',width : 110,align : "center",editable:true},
                {name : 'mantissaProcessingRule',label : '尾数处理规则',width : 110,align : "center"}
            ],
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            onCellSelect: function(){
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //重新选择行时清除上一次选中行的样式
                    $('#listRule_fund '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                }
            },
            ondblClickRow: function () {
                //跳转编辑页
                foredit();
            },
            gridComplete: function(){
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //添加回显选中行样式
                    $('#listRule_fund').setSelection(rowDataBefore.id,true);
                    $('#listRule_fund '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                }
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listRule_fund").setSelection(focusId);

                }
            },
            loadError:function(xhr,status,error){
                pop_tip_open("red","初始化公积金缴费规则列表请求失败");
            },
            viewrecords : true
        });
}
//回调函数
function focusIdCallBack(editId) {
    focusId = editId;
}

//防止按钮刷新页面
$('.btn').click(function(e) {
    e.preventDefault();
});

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

function foredit(){
    var model = $("#judge").val();
    if(model=="2"){
        var rowId=$('#listRule_fund').jqGrid("getGridParam","selarrrow");
        if(rowId.length!=1){
            pop_tip_open("blue","请选择一条您要编辑的记录！");
            return;
        }
        row_data = $("#listRule_fund").jqGrid('getRowData',rowId[0]);
        saveType="update";
        window.open("fund_rule_edit.html");
    }
    if(model=="1"){
        var rowId=$('#listRule_social').jqGrid("getGridParam","selarrrow");
        if(rowId.length!=1){
            pop_tip_open("blue","请选择一条您要编辑的记录！");
            return;
        }
        row_data = $("#listRule_social").jqGrid('getRowData',rowId[0]);
        saveType="update";
        window.open("social_rule_edit.html");
    }
}
//导出excel
function exportInfo() {

    var e  =  $("#judge").val();
    var siPayArea = $("#siPayArea").val();
    var socialPayArea = $("#socialPayArea").val();
    var fundArea = $("#fundArea").val();
    //表格数据查询条件
    var rowData = {};
    var uAll;
    if(e==1){
        rowData = {socialPayArea:socialPayArea,siPayArea:siPayArea};
        var ubody = "si/socialRule/exportInfo";
        uAll = serviceUrl + ubody;
    }
    if(e==2) {
        rowData = {fundArea:fundArea};
        var ubody = "si/fundRule/exportInfo";
        uAll = serviceUrl + ubody;
    }
    $.ajax({
        type: 'POST',
        url: uAll,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(rowData),
        async : false,
        success: function (json) {
            if (json.success == true) {
                var path = json.result;
                if(undefined != path && "" != path){
                    var form = $("<form>");   //定义一个form表单
                    form.attr('style','display:none');   //在form表单中添加查询参数
                    form.attr('target','exportTarget');
                    form.attr('method','post');
                    form.attr('action',serviceUrl + "si/fundRule/exportInfoClient");
                    //添加后台导出参数
                    var input1 = $('<input>');
                    input1.attr('type','hidden');
                    input1.attr('name',"path");
                    input1.attr('value',path);

                    $('body').append(form);  //将表单放置在web中
                    form.append(input1);   //将查询参数控件提交到表单上
                    form.submit();   //表单提交
                    pop_tip_open("green", "导出成功");
                }
            } else {
                pop_tip_open("blue", json.msg);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "导出失败");
        }
    })

}

/**
 *  代码项
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {string}
 */
function fmatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHRCodeNameById(cellvalue);
}
// 根据社保缴纳地户籍类型和公积金缴纳地来查询
$("#searchBtn").click(function(){
    var e  =  $("#judge").val();
    if(e==1){
        var socialPayArea = $("#socialPayArea").val();
        var siPayArea = $("#siPayArea").val();
        if((socialPayArea!=null && socialPayArea!="") || (siPayArea!=null && siPayArea!="")){
            jQuery("#listRule_social").jqGrid('setGridParam', { postData : {socialPayArea:socialPayArea,siPayArea:siPayArea}}).trigger('reloadGrid');
        }else{
            /*
             * 先清空条件
             * jqgrid postData setGridParam 调用多次时查询条件会累加
             */
            var postData = $('#listRule_social').jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            jQuery("#listRule_social").jqGrid().trigger('reloadGrid');
        }
    }
    if(e==2){
        var fundArea = $("#fundArea").val();
        if(fundArea!=null && fundArea!=""){
            jQuery("#listRule_fund").jqGrid('setGridParam', { postData : {fundArea:fundArea}}).trigger('reloadGrid');
        }else{
            var postData = $('#listRule_fund').jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            jQuery("#listRule_fund").jqGrid().trigger('reloadGrid');
        }
    }
})

function codeChange(){
    $("#searchBtn").click();
}
function emptySi() {
    $("#siPayArea_name").val("");
    $("#siPayArea").val("");
}
function emptySocial() {
    $("#socialPayArea_name").val("");
    $("#socialPayArea").val("");
}
function emptyFund() {
    $("#fundArea_name").val("");
    $("#fundArea").val("");
}
function percentFormatter (cellvalue, options, rowObject) {
    if(cellvalue!=null){
        return cellvalue+'%';
    }
    return "";
}

function percentFormatter2 (cellvalue, options, rowObject) {
    if(cellvalue!=null&&cellvalue!=''){
        var temp = parseFloat(cellvalue);
            return temp.toFixed(2);
    }
    return 0;
}

