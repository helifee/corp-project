/**
 * Created by jh on 2017/7/20.
 */
;(function($, window, document, undefined){
    /*全局变量*/

    /*确定  查询按钮*/
    window.jump = function () {
        var obj = new Object();
        var orgId = $("#orgId").val();
        var name = $("#name").val();
        var examSort = $("#replacePayEdit input:radio[name='stt']:checked").val();
        var stratDate = $("#stratDate").val();
        var endDate = $("#endDate").val();
        if(!examSort){
            pop_tip_open("red","请选择查询类别！");
            return;
        }
        if(examSort == '1'){
            if(!orgId){
                pop_tip_open("red","请填写机构！");
                return;
            };
            //obj.orgId = orgId;
        }else {
            if(!name){
                pop_tip_open("red","请填写培训课程！");
                return;
            };
            //obj.name = name;
        }
        obj.stratDate = stratDate;
        obj.endDate = endDate;
        var a = $("#asd").val();
        if (a == "1") {
            //window.open("ojt_summary_b01.html?obj=" + JSON.stringify(obj));
            window.open("ojt_summary_b01.html?orgId=" + orgId + "&name=" + name + "&stratDate=" + stratDate + "&endDate=" + endDate);
        }
        if (a == "2") {
            //window.open("ojt_summary_b02.html?obj=" + JSON.stringify(obj));
            window.open("ojt_summary_b02.html?orgId=" + orgId + "&name=" + name + "&stratDate=" + stratDate + "&endDate=" + endDate);
        }
        if (a == "3") {
            //window.open("ojt_summary_b03.html?obj=" + JSON.stringify(obj));
            window.open("ojt_summary_b03.html?orgId=" + orgId + "&name=" + name + "&stratDate=" + stratDate + "&endDate=" + endDate);
        }
    }
    //清空组织机构
    window.emptyOrg = function () {
        $("#replacePayEdit").find("input[id='orgId']").val("");
        $("#replacePayEdit").find("input[id='orgName']").val("");
    }
    /**
     *  获取机构信息
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);

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
    var j =false;
    var vStatus1;
    var vStatus2;
    //初始化日期控件
    function initDatetimepicker(){
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        }).on('mousedown',function (ev) {
            /*if (!j){
                j = true;
                vStatus1 = $(this);
            }else {
                //$("#replacePayEdit tr").eq(3).find("span").trigger("click");
                $(vStatus1).click();
            }*/
        });
        var picker = $('.datetimepicker2').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        }).on('mousedown',function (ev) {
        });
        //时分
        $('.datetimepicker3').datetimepicker({
            language: 'zh-CN',
            format: 'hh:ii',
            startView:1,
            autoclose: true
        });

        //只选择年月
        $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });

        //只选择年
        $('.datetimepickerY').datetimepicker({
            format: 'yyyymm',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 4,
            forceParse: false,
            language: 'zh-CN'
        });
    }
    $(function () {
        resizeHeight();
        resizeGrid();
        initUuid();
        initDatetimepicker();
    });

})(jQuery, window, document);