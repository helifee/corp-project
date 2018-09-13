;
(function ($, window, document, undefined) {
/**
 * 列字段显示设置js
 */
var id;
//手动的调整窗口时
//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});
//计算表格的高度	1
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h - 100) + "px");
    //右侧table 2个列表
    $(".con-table .mytable").height((w_h - 180) / 2 + "px");
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 200) + "px");
}
//计算表格宽度
function resizeGrid() {
    //右边两个列表
    //设置table的高度比mytable高度小一点
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    $.xljUtils.gridResizeFn();
}
//上来就执行
$(function () {
    //初始化高度
    resizeHeight();
    initData();
    //todo 关闭窗口
    $("#closeBtn").click(function(){
        window.close();
    });
    $("#saveBtn").click(function(){
        var ids="";
        var names="";
        $("input[type='checkbox']:checked").each(function(){
            ids+=","+$(this).val();
            names += ","+$(this).attr("name");
        })
        if(ids != ""){
            ids = ids.substr(1,ids.length);
            names = names.substr(1,names.length);
        }
        var hrSysQueryDto = {};
        hrSysQueryDto.selectValue = ids;//指标项ID
        hrSysQueryDto.id=id;
        hrSysQueryDto.selectName = names;//指标项的名称
        //更新选择列表
        $.ajax({
            url:baseUrl+'sys/hrSysQuery/update/'+id,
            type:'PUT',
            data:JSON.stringify(hrSysQueryDto),
            dataType:"json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success:function(data) {
                window.close();
                console.info("success");
            },
            error:function(){
                alert("查询失败！");
            }
        });



    });

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });

    //树加滚动条
    setTimeout(function(){
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
    },300);
    //在加载完表格后，设置表格的宽度
    resizeGrid();
});

function initData(){
    //加载列数据
    $.ajax({
        url:baseUrl+'sys/sysInfoItem/queryList',
        type:'post',
        data:JSON.stringify({"setId":'a3ef96bad9ea4318ba469a2ffbc8fef9'}),
        dataType:"json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success:function(data){
            var result = jQuery.isEmptyObject(data.result)
            console.info(JSON.stringify(data));
            if(!result){
                for(var i in data.result){
                    if(i%8==0){
                        $("<br>").appendTo("#items");
                    }
                    if(data.result[i].name == 'id'){
                        $('<input />',{
                            type:"checkbox",
                            style:'margin-left: 90px;margin-top: 30px;display: none',
                            checked:true,
                            val:data.result[i].id,
                            name:data.result[i].name
                        }).appendTo("#items");
                        $('<span style="margin-left: 10px;margin-top: 30px;display: none">'+data.result[i].name+'</span>').appendTo("#items");
                    }else if(data.result[i].name == '入职审批号'){
                        $('<input />',{
                            type:"checkbox",
                            style:'margin-left: 90px;margin-top: 30px;display: none',
                            checked:true,
                            val:data.result[i].id,
                            name:data.result[i].name
                        }).appendTo("#items");
                        $('<span style="margin-left: 10px;margin-top: 30px;display: none">'+data.result[i].name+'</span>').appendTo("#items");
                    }else if(data.result[i].name == '员工照片'){
                        continue;
                    }else{
                        $('<input />',{
                            type:"checkbox",
                            style:'margin-left: 50px;margin-top: 30px;',
                            val:data.result[i].id,
                            name:data.result[i].name
                        }).appendTo("#items");
                        $('<span style="margin-left: 10px;margin-top: 30px;">'+data.result[i].name+'</span>').appendTo("#items");
                    }

                }
            }
            $.ajax({
                url:baseUrl+'sys/hrSysQuery/queryList',
                type:'post',
                data:JSON.stringify({"code":'emp_list'}),
                dataType:"json",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success:function(data) {
                    var seletedString = data.result[0].selectValue;
                    id = data.result[0].id;
                    var rsult = jQuery.isEmptyObject(seletedString);
                    if(!result){
                         var seletedItems = seletedString.split(",");
                         for(var i in seletedItems){
                         $('input:checkbox[value='+seletedItems[i]+']').attr('checked', 'true');
                         }
                    }
                },
                error:function(){
                    alert("查询失败！");
                }
            });
        },
        error:function(){
            alert("查询失败！");
        }
    });
}
})(jQuery, window, document);