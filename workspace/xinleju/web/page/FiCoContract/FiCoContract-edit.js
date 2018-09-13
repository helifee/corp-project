var businessObjectWindow;//选择业务对象对话框
/**
 * 保存业务对象
 */ 
function save() {
   $('body').mask("数据保存中...");
   $("#frm").form('submit',{
		url:"FiCoContract!save.do",
		onSubmit:function(){
			return $(this).form('validate');
		},
		success:function(result){
			var result=eval('('+result+')');
			if(result.success){
				$('body').unmask();
				parent.query();
		        parent.closeDialog('newDialog');
			}else{
				$.messager.show({
					title:'出错信息',
					msg:result.msg
				});
			}
		}
	});
};
