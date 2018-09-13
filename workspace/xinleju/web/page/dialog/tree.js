 var baseParams;
 $(function(){
	 var  componentId=$('#componentId').val();
	 baseParams=JSON.parse($("#baseParams_"+componentId,parent.document).val());
	 var initIds=baseParams.initIds;
	 var initArray=new Array();
	 if(initIds){
		 initArray=initIds.split(",");
	 }
	  //baseParams是弹窗获取的参数，用于进行条件过滤
	  var options={
    		 cascadeCheck:false,
    		 lines:true,
    		 animate:true,
    		 url : contextPath+'/FiRef!load.do',
    		 onBeforeLoad:function(node){
    			 //选中节点时候调用
    				 $('#tree').tree('options').url=contextPath+"/FiRef!load.do?model="+$('#model').val();
    				 
    				 for(var i in baseParams.queryParams){
    					 $('#tree').tree('options').url += '&'+i+'='+baseParams.queryParams[i];
    				 }
    		 }
      };
	  if(baseParams&&baseParams.single=='false'){
		  options =$.extend(options,{checkbox:true});
	  }
	  $('#tree').tree(options);
 }) 
 
 //执行方法确认
 function   okCallback(){
	  var checkedData="";
	  if(baseParams&&baseParams.single=='false'){
		   checkedData= $('#tree').tree('getChecked');
	  }else{
		   checkedData= $('#tree').tree('getSelected'); 
	  }
	 return checkedData;
 }
 
 //取消执行方法
 function cancelCallback(){
	 
 }