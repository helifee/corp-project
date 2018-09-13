/**
 * Created by jh on 2017/7/18.
 */
;(function($, window, document, undefined){
    /*全局变量*/
    var type;
    /**
     *  根据试卷类别id获取试卷类别信息
     * @param typeId
     */
    function initUpdatePaperDat(typeId) {
        var uBody = "/ojt/hrOjtPaperType/get/" + typeId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtPaperTypeFrom").find("input[name='examTypeId']").val(data.result.id);
                $("#ojtPaperTypeFrom").find("input[name='name']").val(data.result.name);
                $("#ojtPaperTypeFrom").find("input[name='code']").val(data.result.code);
                $("#ojtPaperTypeFrom").find("textarea[name='remark']").val(data.result.remark);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化试题类别信息请求失败");
            }
        })
    }
    function saveInfo() {
        alert("11");
        var name = $("#name").val();
        var code = $("#code").val();
        var remark = $("#remark").val();
        var dto = {name:name,code:code,remark:remark};
        dto.id=$("#examTypeId").val();
        dto.delflag = 0;
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtPaperType/save",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
                pop_tip_open("blue","保存成功！");
                closePage();
            }
        });
    }
    //保存试卷表分类
    window.saveData_ = function (isSave) {
        var name = $("#name").val();
        var code = $("#code").val();
        var remark = $("#remark").val();
        var dto = {name:name,code:code,remark:remark};
        dto.id=$("#examTypeId").val();
        dto.delflag = 0;
        $.ajax({
            type: isSave == 1?'POST':'put',
            url:hostUrl+ (isSave == 1 ? "ojt/hrOjtPaperType/save" : ("ojt/hrOjtPaperType/update/" + dto.id)),
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
                pop_tip_open("blue","保存成功！");
                if(window.opener.reloadPaperTypeList!=undefined) {
                    window.opener.reloadPaperTypeList(dto.id);
                }
                closePage();
            }
        });
    }
    /*关闭窗口*/
    window.closeWindow = function() {
        window.close();
    }
    //关闭页面
    function closePage() {
        //重新加载父页面
        if(window.opener.reloadTypeList!=undefined) {
            window.opener.reloadTypeList();
        }
        //关闭本页面
        window.close();
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
                $("#examTypeId").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

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
    $("#saveBtn").on('click', function () {
        if (type == 'update'){
            $("#ojtPaperTypeFrom").attr("data-validate-success", "saveData_(0)");
            $("#ojtPaperTypeFrom").submit();
        }else{
            $("#ojtPaperTypeFrom").attr("data-validate-success", "saveData_(1)");
            $("#ojtPaperTypeFrom").submit();
        }
    });
    $(function () {
        type = $.xljUtils.getUrlParam("type");
        var typeId = $.xljUtils.getUrlParam("typeId");
        if (type == 'update'){
            $('title').text("试题类别-修改");
            $(".xj-form-title").text("试卷类别-修改");
            initUpdatePaperDat(typeId);
        }else{
            $('title').text("试题类别-新增");
            $(".xj-form-title").text("试卷类别-新增");
            //初始化申请单编号
            var examType = $.hrUtils.getApplyCodeByType('EXAMTYPE');
            var v= examType.split('-');
            var vv="";
            for (var i=0; i<v.length;i++){
                    vv =vv+v[i];
            }
            //alert(vv+"T");
            $("#code").val(vv+"T");
            $("#code").attr("readOnly",true);
        }
        initUuid();
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);

    });

})(jQuery, window, document);