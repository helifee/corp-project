$(function(){
    //页面加载完成之后执行
    loadGridData();//加载表格数据

    $.xljUtils.resizeNestedGrid();

});
/**
 * author:liuf
 * describe:删除供方信息  伪删除  包括字表 账号  支持批量删除
 * param: name companyname provincename
 */
function loadGridData(){
    jQuery("#list").jqGrid(
        {
            url: serviceUrl+'sys/middeleware_topic/mqTopic/page',
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            datatype : "json",
            postData:{delflag:false},
            multiselect:true,
            autowidth:true,
            rownumbers:true,
            jsonReader : {
                repeatitems: false
            },
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'id',hidden:true,align : "center"},
                {name : 'topic',label : '主题',align : "center"},
                {name : 'consumerBeanName',label : '消费者bean名称',align : "center"},
                /**
                {name : 'consumerClass',label : '消费者beanClass路径',align : "center"},
                {name : 'rollBackBeanName',label : '回调beanName',align : "center"},
                {name : 'testRollbackTime',label : '回调调用时间',align : "center"},
                {name : 'testRollbackBeanRestlt',label : '回调调用结果',align : "center"},
                {name : 'validateBeanName',label : '验证beanName',align : "center"},
                {name : 'testValidateTime',label : '验证调用时间',align : "center"},
                {name : 'testValidateRestlt',label : '验证调用结果',align : "center"},
                */
                {name : 'createDate',label : '创建时间',align : "center"}
            ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
            pager : '#pager',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){

            },
            viewrecords : true
        });
};
/**
 * 新增按钮触发函数
 */
function toadd(){
    window.open("topic_edit.html?type=add");
}
/**
 * author:liuf
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
    var ids=jQuery("#list").jqGrid('getGridParam',"selarrrow");
    if(!ids || ids.length == 0 ) {
        pop_tip_open("blue","请选择要修改的行！");
        return;
    }else if(  ids.length >= 2) {
        pop_tip_open("blue","只能选择一行进行修改！");
        return;
    }
    var rowid=jQuery("#list").jqGrid('getGridParam',"selrow");
    if(!rowid){
        //toastr.error("请选择一行修改！");
        return;
    }
    window.open("topic_edit.html?type=edit&id="+rowid);//跳转查看页面
}
/**
 * author:xubaoyong
 * describe: 删除主题
 * param: null
 */
function deleteFn(){
    var ids=jQuery("#list").jqGrid('getGridParam',"selarrrow");
    if(!ids||ids.length==0) {
        pop_tip_open("blue","请选择要删除的行！");
        return;
    }else {
        pop_text_open("blue",'确认要删除这'+ids.length+'条数据吗？',function(){
            ids=ids.length==1?ids[0]:ids.join(",");
            $.ajax({
                url:serviceUrl+'sys/middeleware_topic/mqTopic/deletePseudoBatch/'+ids,
                type:'DELETE',
                dataType:'JSON',
                success:function (resultData ) {
                    var successFlag = resultData.success;
                    if (resultData && successFlag) {
                        $('#list').jqGrid('setGridParam',{
                            d:new Date().getTime()
                        }).trigger("reloadGrid");
                    }else{
                        pop_tip_open("red",resultData.msg);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.xljUtils.getError(jqXHR.status);
                }
            });
        },function(){
            return;
        });
    }
}
/**
 * author:xubaoyong
 * describe:装载过滤查询的条件
 * param:null
 */
function searchData(){
    var topic_name=$.trim($("#topic_name").val());
    jQuery("#list").jqGrid("setGridParam",{postData:{topic:topic_name,delflag:false}}).trigger("reloadGrid");

}
/**
 * 验证回滚
 */
function testRollbackFn(){
    pop_tip_open("red","待补充");
}
/**
 * 测试验证方法
 */
function testValidateFn(){
    pop_tip_open("red","待补充");
}