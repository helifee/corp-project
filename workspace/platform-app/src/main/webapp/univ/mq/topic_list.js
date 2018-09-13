$(function(){
    //页面加载完成之后执行
    loadGridData();//加载表格数据

    $.xljUtils.resizeNestedGrid();

});

/**
 * 加载主题分页数据
 * @returns
 */
function loadGridData(){
	
	// 创建jqGrid组件
	$.xljUtils.initJqGrid({
		gridSelecter:'#list',
		url : hostUrl + 'univ/mq/topic/page?random='+Date.now(),
		postData : {delflag:false},
		colNames :['主键', '主题', '消费者bean名称', '创建时间'],
		colModel : [ // jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
			{ name : 'id',  index : 'id', align : "center", hidden : true },
			{ name : 'topic',index : 'topic', align : "left" },
			{ name : 'consumerBeanName',index : 'consumerBeanName', align : "center"},
			
			 /**
            {name : 'consumerClass',label : '消费者beanClass路径',align : "center"},
            {name : 'rollBackBeanName',label : '回调beanName',align : "center"},
            {name : 'testRollbackTime',label : '回调调用时间',align : "center"},
            {name : 'testRollbackBeanRestlt',label : '回调调用结果',align : "center"},
            {name : 'validateBeanName',label : '验证beanName',align : "center"},
            {name : 'testValidateTime',label : '验证调用时间',align : "center"},
            {name : 'testValidateRestlt',label : '验证调用结果',align : "center"},
            */
			{ name : 'createDate', index : 'createDate',align : "center"}
		],
		multiselect:true,
		viewrecords:true,
		pager : '#pager',//表格页脚的占位符(一般是div)的id
		sortname : 'createDate',// 初始化的时候排序的字段
		sortorder : "desc",// 排序方式,可选desc,asc
	});
	
};
/**
 * 新增按钮触发函数
 */
function toadd(){
    window.open("topic_edit.html?type=add&random="+Date.now());
}

/**
 * 跳转修改页面
 * 
 * @returns
 */
function toupdate(){
    var ids=jQuery("#list").jqGrid('getGridParam',"selarrrow");
    if(!ids || ids.length == 0 ) {
    	$.xljUtils.tip("blue", "请选择要修改的行！");
        return;
    }else if(  ids.length >= 2) {
    	$.xljUtils.tip("blue", "只能选择一行进行修改！");
        return;
    }
    var rowid=jQuery("#list").jqGrid('getGridParam',"selrow");
    if(!rowid){
        //toastr.error("请选择一行修改！");
        return;
    }
    window.open("topic_edit.html?type=edit&id="+rowid + "&random="+Date.now());//跳转查看页面
}

/**
 * 删除主题
 * 
 * @returns
 */
function deleteFn(){
    var ids=jQuery("#list").jqGrid('getGridParam',"selarrrow");
    if(!ids||ids.length==0) {
    	$.xljUtils.tip("blue","请选择要删除的行！");
        return;
    }else {
    	$.xljUtils.confirm("blue",'确认要删除这'+ids.length+'条数据吗？',function(){
            ids=ids.length==1?ids[0]:ids.join(",");
            $.xljUtils.xljAjax({
            	url: hostUrl+'univ/mq/topic/deletePseudoBatch/'+ids,
                type:'DELETE'
            }, function(data){
        	 $('#list').jqGrid('setGridParam', {
					d : new Date().getTime()
				}).trigger("reloadGrid");
            });
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
	$.xljUtils.tip("red","待补充");
}
/**
 * 测试验证方法
 */
function testValidateFn(){
	$.xljUtils.tip("red","待补充");
}