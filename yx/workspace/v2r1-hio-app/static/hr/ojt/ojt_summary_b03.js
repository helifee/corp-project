/**
 * Created by jh on 2017/7/20.
 */
function closeWindow() {
    //关闭本页面
    window.close();
}
;(function($, window, document, undefined){
    /*全局变量*/
    var obj;

    //导出excel
    $("#exportBtn").click(function () {
        exportInfo();
    });
    function exportInfo() {
        //表格数据
        rowData = $('#listPlannedPerson').jqGrid('getRowData');
        var urlBody = "ojt/hrOjtExamPapers/exportSummaryB03";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
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
                        form.attr('action',hostUrl + "ojt/hrOjtExamPapers/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type','hidden');
                        input1.attr('name',"path");
                        input1.attr('value',path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "导出成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }

    /*页面查询  按钮*/
    $("#queryDat").on('click',function () {
        var annualTraining = $("#annualTraining option:checked").val();
        var quarterTraining = $("#quarterTraining option:checked").val();
        var o = JSON.parse(obj);
        o.annualTraining=annualTraining;
        o.quarterTraining=quarterTraining;
        obj = JSON.stringify(o);
        $("#listPlannedPerson").jqGrid('setGridParam',{datatype:'json',postData:{"obj":obj}}).trigger('reloadGrid');
    });
    /*培训类别分析表页面的展示*/
    /*初始化进行页面的展示*/
    function listPaperList(){
        var ubody = "/ojt/hrOjtExamPapers/queryTrainListByCondition";
        var uall = hostUrl+ubody;
        //创建jqGrid组件
        jqGridRule_social = jQuery("#listPlannedPerson").jqGrid(
            {
                url: uall,
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                datatype : "json",
                postData: {"obj": obj},
                width:$('.mytable').width()-10,
                height:$('.mytable').height()-45,
                jsonReader : {
                    root:"result"
                },
                rownumbers: true,
                //multiselect: true,
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
                    {name : 'orgName',label : '机构',width : 55,align : "center"},
                    {name : 'postName',label : '岗位',width : 55,align : "center"},
                    {name : 'personName',label : '姓名',width : 55,align : "center"},
                    // {name : 'courseType',label : '课程类别',width : 55,align : "center"},
                    {name : 'totalTrainingNum',label : '合计课程数',width : 55,align : "center"},
                    {name : 'totalTime',label : '合计培训课时',width : 55,align : "center",
                        formatter: timeFmatter}
                ],
                rowNum : -1,//一页显示多少条 -1全部
                sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",//排序方式,可选desc,asc
                loadError:function(xhr,status,error){
                    pop_tip_open("red","初始化人员列表请求失败");
                },
                viewrecords : true,
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }

            });
        var w_h = $(window).height();
        $("#gview_listPlannedPerson .ui-jqgrid-bdiv").height((w_h-145)+"px");
    }

    function timeFmatter(cellvalue,options,rowObject){
        var time = (cellvalue/60);
        return time.toFixed(2);
    }


    /**
     * 新增-初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                //$("#ids").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    $("#openNewWindow").on('click',function () {
        window.open("ojt_paper_add2.html?type=add");
    });

    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h-350)+"px");
        $(".tableStyle").css("height",(w_h-111)+"px");
    }
    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }
    //grid 自适应宽度
    $(window)
        .resize(function(){
            resizeHeight();
            resizeGrid();
        });
    //关闭页面
    function closePage() {
        //重新加载父页面
        if(window.opener.location!=undefined) {
            window.opener.location.reload();
        }
        //关闭本页面
        window.close();
    }
    //初始化页面中的代码项列表
    function initCodeSelect(code_set_id,selectId){
        var pam = {};
        pam.code_set_id = code_set_id;
        var urlBody = "/sys/sysCodeItem/getSysCodeItemById";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: 'POST',
            url: urlAll,
            data: JSON.stringify(pam),
            dataType: 'json',
            success: function (json) {
                var retDt = json.result;
                if(undefined != retDt){
                    $.each(retDt,function(i,item){
                        $("#"+selectId).append("<option value='" + item.id + "'>" + item.name + "</option>")
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }
    $(function () {
        resizeHeight();
        resizeGrid();
        initUuid();
        // initCodeSelect("1124","annualTraining");/*培训年度*/
        // initCodeSelect("1126","quarterTraining");/*培训季度*/
        /*obj = $.xljUtils.getUrlParam("obj");
        listPaperList(obj);*/
        var name = $.xljUtils.getUrlParam("name");
        var stratDate = $.xljUtils.getUrlParam("stratDate");
        var endDate = $.xljUtils.getUrlParam("endDate");
        var orgId = $.xljUtils.getUrlParam("orgId");
        var obj1 = new Object();
        obj1.orgId = orgId;
        obj1.stratDate = stratDate;
        obj1.endDate = endDate;
        obj1.name = name;
        obj = JSON.stringify(obj1);
        listPaperList();
    });

})(jQuery, window, document);
