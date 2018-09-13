/**
 * Created by ciic on 2017/6/28.
 */
var JQsiFileList;
var account_id;
var org_id;
var account_data=[];
var focusId;//聚焦
    initAccount();
    resizeHeight();
    siFileList();
    resizeGrid();

/* 2017-12-27    开始 */
//清空组织机构
window.emptyOrg=function() {
    $("#orgId").val("");
    $("#orgName").val("");
}
window.orgCallback=function(data) {
    $("#orgId").val(data.id);
    $("#orgName").val(data.name);
}

/* 2017-12-27    开始 */




function initAccount(){
    $.ajax({    //查询所有的账套列表
        type: "POST",
        url:serviceUrl+ "/si/socialFundAccount/querySiAccountListForShow",
        data: JSON.stringify({}),
        dataType: "JSON",
        async:false,
        contentType:"application/json",
        success: function(data) {
            account_data = data.result;
            var result = data.result;
            for (var i = 0; i < result.length; i++) {
                $("#accountSelect").append(' <option value="'+result[i].id+'">'+result[i].orgName+'-'+result[i].name+'</option>');
            }
            account_id = result[0].id;
            org_id = result[0].orgId;
        }
    });
}

function siFileList(){
      var ubody = "si/siFile/queryListForShow";
     var uall = serviceUrl + ubody;
     //创建jqGrid组件

    JQsiFileList = jQuery("#siFileList").jqGrid(
        {
            url: uall,//uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{accountId:account_id,nameOrCode:""},
          //  contentType : "application/json",
            datatype : "json",
            jsonReader : {
              root:"result"
            },
            colNames: [ '姓名','拼音','手机号','所属机构','入职时间','离职时间','户口性质',
                '社保缴纳地','公积金缴纳地','养老保险基数','医疗保险基数','失业保险基数','工伤保险基数','生育保险基数',
                '养老保险单位缴费比例','养老保险个人缴费比例','失业保险单位缴费比例','失业保险个人缴费比例','医疗保险单位缴费比例','医疗保险个人缴费比例','工伤保险单位缴费比例',
                '生育保险单位缴费比例'],//jqGrid的列显示名字
            /*,'重大疾病保险单位缴费比例','残保金保险单位缴费比例','公积金单位缴费比例','公积金个人缴费比例','养老保险单位补缴',
             '养老保险个人补缴','失业保险单位补缴','失业保险个人补缴','医疗保险单位补缴','医疗保险个人补缴',
             '工伤保险单位补缴','生育保险单位补缴','重大疾病保险单位补缴','残保金保险单位补缴','公积金缴费基数','社保企业补缴',
             '社保个人补缴','公积金单位补缴','公积金个人补缴','社保公积金单位缴费合计','社保公积金个人缴费合计'*/
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                /* {name: 'id', index: 'id', width: 100, align: "center"},*/
                {name: 'name',  width: 170, align: "center"},
                {name: 'py',  width: 290, align: "center"},
                {name: 'sjh',  width: 350, align: "center"},
                {name: 'ssjg',  width: 240, align: "center"},
                {name: 'rhsj',  width: 300, align: "center"},
                {name: 'lzsj',  width: 270, align: "center"},
                {name: 'hkxz',  width: 270, align: "center"},
                {name: 'sbjnd',  width: 170, align: "center"},
                {name: 'gjjjnd',  width: 170, align: "center"},
                {name: 'ylbxjs',  width: 270, align: "center"},
                {name: 'yilbxjs',  width: 270, align: "center"},
                {name: 'sybxjs',  width: 270, align: "center"},
                {name: 'gsbxjs',  width: 270, align: "center"},
                {name: 'shybxjs',  width: 270, align: "center"},
                {name: 'ylbxdwbl',  width: 170, align: "center"},
                {name: 'ylbxgrbl',  width: 170, align: "center"},
                {name: 'sybxdwbl',  width: 170, align: "center"},
                {name: 'sybxgrbl',  width: 170, align: "center"},
                {name: 'yilbxdwbl',  width: 170, align: "center"},
                {name: 'yilbxgrbl',  width: 170, align: "center"},
                {name: 'gsbxdwbl',  width: 170, align: "center"},
                {name: 'shybxdwbl',  width: 170, align: "center"}
            ],
            loadComplete:function(data){
            },
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'id',//初始化的时候排序的字段
            multiselect: true,
            multiboxonly: true,
            rownumbers: true,
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#siFileList").setSelection(focusId);
                }
            },ondblClickRow: function (rowid) {
            //跳转编辑页
            rowData = $('#hrEmpSetList').jqGrid('getRowData', rowid);
            var winObjEI = window.location.href="si_social_detail.html";
            //?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum);
        },
        });

    //创建jqGrid组件
    var mydata = [
        {
            name:"韦天磊",
            py:"wei tian lei",
            sjh:"18289767222",//葛雅畅 411222197708257097,温鉴苏 370882197811107818 ,费德辉 350502199003238550 ,费德辉 350502199003238550
            ssjg:"三亚公司",
            rhsj:"2015-05-09",
            lzsj:"",
            hkxz:"本市城镇",
            sbjnd:"三亚",
            gjjjnd:"三亚",
            ylbxjs:"15642.00",
            yilbxjs:"15642.00",
            sybxjs:"15642.00",
            gsbxjs:"15642.00",
            shybxjs:"15642.00",
            ylbxdwbl:"19%",
            ylbxgrbl:"8%",
            sybxdwbl:"0.5%",
            sybxgrbl:"0.5%",
            yilbxdwbl:"8%",
            yilbxgrbl:"2%",
            gsbxdwbl:"0.4%",
            shybxdwbl:"0.5%"
        },
        {
            name:"葛雅畅",
            py:"ge ya chang",
            sjh:"18789392333",//温鉴苏 370882197811107818 ,费德辉 350502199003238550 ,费德辉 350502199003238550
            ssjg:"三亚公司",
            rhsj:"2015-02-09",
            lzsj:"",
            hkxz:"本市城镇",
            sbjnd:"三亚",
            gjjjnd:"三亚",
            ylbxjs:"13333.00",
            yilbxjs:"13333.00",
            sybxjs:"13333.00",
            gsbxjs:"13333.00",
            shybxjs:"13333.00",
            ylbxdwbl:"19%",
            ylbxgrbl:"8%",
            sybxdwbl:"0.5%",
            sybxgrbl:"0.5%",
            yilbxdwbl:"8%",
            yilbxgrbl:"2%",
            gsbxdwbl:"0.4%",
            shybxdwbl:"0.5%"
        },
        {
            name:"温鉴苏",
            py:"wen jian su",
            sjh:"18708099696",// 费德辉 350502199003238550 ,任清怡 650101198604183434
            ssjg:"三亚公司",
            rhsj:"2016-03-03",
            lzsj:"",
            hkxz:"本市城镇",
            sbjnd:"三亚",
            gjjjnd:"三亚",
            ylbxjs:"13145.00",
            yilbxjs:"13145.00",
            sybxjs:"13145.00",
            gsbxjs:"13145.00",
            shybxjs:"13145.00",
            ylbxdwbl:"19%",
            ylbxgrbl:"8%",
            sybxdwbl:"0.5%",
            sybxgrbl:"0.5%",
            yilbxdwbl:"8%",
            yilbxgrbl:"2%",
            gsbxdwbl:"0.4%",
            shybxdwbl:"0.5%"
        },
        {
            name:"费德辉",
            py:"fei de hui",
            sjh:"18889116444",// 费德辉 350502199003238550 ,任清怡 650101198604183434
            ssjg:"三亚公司",
            rhsj:"2016-07-10",
            lzsj:"",
            hkxz:"本市城镇",
            sbjnd:"三亚",
            gjjjnd:"三亚",
            ylbxjs:"15145.00",
            yilbxjs:"15145.00",
            sybxjs:"15145.00",
            gsbxjs:"15145.00",
            shybxjs:"15145.00",
            ylbxdwbl:"19%",
            ylbxgrbl:"8%",
            sybxdwbl:"0.5%",
            sybxgrbl:"0.5%",
            yilbxdwbl:"8%",
            yilbxgrbl:"2%",
            gsbxdwbl:"0.4%",
            shybxdwbl:"0.5%"
        },
        {
            name:"任清怡",
            py:"ren qing yi",
            sjh:"18889572233",
            ssjg:"三亚公司",
            rhsj:"2016-05-08",
            lzsj:"",
            hkxz:"本市城镇",
            sbjnd:"三亚",
            gjjjnd:"三亚",
            ylbxjs:"12050.00",
            yilbxjs:"12050.00",
            sybxjs:"12050.00",
            gsbxjs:"12050.00",
            shybxjs:"12050.00",
            ylbxdwbl:"19%",
            ylbxgrbl:"8%",
            sybxdwbl:"0.5%",
            sybxgrbl:"0.5%",
            yilbxdwbl:"8%",
            yilbxgrbl:"2%",
            gsbxdwbl:"0.4%",
            shybxdwbl:"0.5%"
        }
    ];
    for (var i = 0; i <= mydata.length; i++) {
        jQuery("#siFileList").jqGrid('addRowData', i + 1, mydata[i]);
    }
}
//回调函数
function focusIdCallBack(editId) {
    focusId = editId;
}
$("#accountSelect").change(function(){
   account_id = $("#accountSelect").val();
    for(var i=0;i<account_data.length;i++){
        if(account_data[i].id==account_id){
            org_id = account_data[i].orgId;
            break;
        }
    }
    jQuery("#siFileList").jqGrid('setGridParam', {url : serviceUrl+"si/siFile/queryListForShow", postData : {accountId:account_id  }}).trigger('reloadGrid');
});

//点击变动人员
window.changePersonBtn = function() {
    window.location.href="si_file_changeperson_list.html";
}

//点击导入
window.importBtn=function(){
    window.location.href="../si_calculate/si_calculate_upload.html";
}

//点击设置
window.setBtn=function () {
    window.location.href="../si_rule/social_fund_rule_list.html";

}

$("#addBtn").click(function(){
     window.open("si_file_addperson_list.html");
 });
//回调函数
window.focusAddpersonBack = function (editId) {
    focusId = editId;
    //聚焦
    $('#siFileList').jqGrid().trigger("reloadGrid");
    /*$('#listRule_fund').jqGrid("setGridParam", {
     gridComplete:function(){
     if(editId != null && editId != ""){
     $("#listRule_fund").setSelection(editId);
     }
     }
     }).trigger("reloadGrid");*/
};
/*$("#changeBtn").click(function(){
    window.open("si_file_changeperson_list.html");
})*/

$("#delBtn").click(function(){
    var rowIds=$('#siFileList').jqGrid("getGridParam","selarrrow");
    if(rowIds.length==0){
        pop_tip_open("blue","请选择要删除的人员！");
        return;
    }
    //审批中  1
    var tempAccountStatus = new Array();
    tempAccountStatus.push("1");
    $.ajax({    //查询账套是否在审批中
        type: "POST",
        url:serviceUrl+ "/si/siCalculateDate/queryStatusByAccount",
        data: JSON.stringify({accountId:account_id,accountStatus:tempAccountStatus}),
        dataType: "JSON",
        contentType:"application/json",
        success: function(data) {
            var result = data.result;
            if(result.length!=null && result.length>0){
                //该账套在审批中
                pop_tip_open("blue","该账套在审批中，不能删除人员！");
            }else{//该账套不在审批中
                pop_text_open("blue",'确定删除选中的人员？',function(){
                    delBtnClick();
                },true);
            }
        }
    });
})
function delBtnClick(){
    var rowIds=$('#siFileList').jqGrid("getGridParam","selarrrow");
    $.ajax({
        type: "DELETE",
        url:serviceUrl+ "/si/siFile/deleteBatch/"+rowIds,
        dataType: "JSON",
        contentType:"application/json",
        success: function(data){
            /*  $('#listRule_fund').setSelection($("#hide_id").val(),true);
             $('#listRule_fund '+'#'+$("#hide_id").val()).find("td").addClass("ui-state-highlight");*/
            pop_tip_open("green","删除成功！");
            var w = $.hrUtils.focusNode(rowIds);
            focusIdCallBack(w);
            $('#siFileList').jqGrid().trigger("reloadGrid");
        }
    });
}
$("#searchBtn").click(function(){
    var nameOrCode = $("#nameOrCode").val();
    jQuery("#siFileList").jqGrid('setGridParam', {url : serviceUrl+"si/siFile/queryListForShow", postData : {accountId:account_id ,nameOrCode:nameOrCode},page:1}).trigger('reloadGrid');
})


//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".con-table .mytable").height((w_h - 70)+ "px");
    //xj-main-grid grid-container
}
//计算表格宽度
function resizeGrid() {
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-60);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
    $.xljUtils.gridResizeFn();
}
//grid 自适应宽度
/*$(window).resize(function () {
 resizeHeight();
 resizeGrid();
 });*/
$('.btn').click(function(e) {
    e.preventDefault();
});

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