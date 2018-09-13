  
$(function(){	
	 var componentId=$('#componentId').val();
	 var queryParams=JSON.parse($("#baseParams_"+componentId,parent.document).val());
	 if(queryParams){
		 queryParams.model = $('#model').val();
		 queryParams.page = 1;
		 queryParams.rows = 1;
	 }else{
		 queryParams = {"model":$('#model').val(),'page':1,'rows':1};
	 }
	 
	$.post(contextPath+'/FiRef!openRef.do',queryParams,function(data){
		
		if(data.success == false){
			  alert(data.mes);
			  return;
		  }
		
		var showFields = data.showFields;
		var showNames = data.showNames;
		var columns = new Array();
		columns.push({
         field : 'ck',
         checkbox:true
     });
		for(var i = 0,length = showFields.length;i<length;i++){
			columns.push( {field: showFields[i],
	                title: showNames[i],
	                width: 150,
	                align: 'center'});
		}
		initGrid(columns,data.keyField,data.nameField,data.title,data.isMutil);
	})
})

 
 

       
         
 //执行方法确认
function   okCallback(){
	 var checkedData;
 	   if( !$('#businessObject_grid').datagrid('options').singleSelect){
 		  checkedData=$('#businessObjected_grid').datagrid("getData").rows;
      }else{
      	 checkedData=$('#businessObject_grid').datagrid("getSelected");
      }
  	 return checkedData;
}
 
 //取消执行方法
function cancelCallback(){
	 
}
     
 
 function loadbusinessObjectGrid(){
    //已经带有参数
	//var param=$('#businessObject_grid').datagrid('options').queryParams.jsonData;
	//var param={};
    //$('#businessObject_grid').datagrid('options').queryParams ={"jsonData":JSON.stringify(param)};
    //$('#businessObject_grid').datagrid('reload');
 }


var baseParams;
/**
 * 初始化datagrid控件
 * @param columns 表头
 * @param keyField
 * @param nameField
 * @param title
 * @param isMutil
 */
function initGrid(columns,keyField,nameField,title,isMutil){
	 var  componentId=$('#componentId').val();
	 baseParams=JSON.parse($("#baseParams_"+componentId,parent.document).val());
	 var singleSelect = !isMutil;
	 
	  $('#businessObject_grid').datagrid({
		  fit:true,
		  url : contextPath+'/FiRef!load.do?model='+$('#model').val(),
		  fitColumns : true,
		  queryParams : baseParams,
		  singleSelect : singleSelect,
		 // toolbar: '#tb',
          columns : [columns],
    	  pagination : true,
    	  pageSize : 10,
    	  pageList : [10, 20, 30, 40],
    	  onLoadSuccess : function(data){
    		  if(data.success == false){
    			  alert(data.mes);
    		  }
    	  },
    	  onLoadError : function(){
    		  alert("数据加载异常");
    	  }
	  });
	  
	  
	  var p = $('#businessObject_grid').datagrid('getPager');
	    $(p).pagination({
	        beforePageText: '第',
	        afterPageText: '共{pages}页',
	        displayMsg: '显示{from}到{to},共{total}记录'
	    });
	  
    if(!singleSelect){
     var select = function (rowIndex,rowData){
   	  var getData=$('#businessObjected_grid').datagrid("getData");
   	  if(getData&&getData.rows){
   		  var rows=getData.rows;
   			  var flag=true;
   			  $.each(rows,function(){
       			  if(this[keyField] == rowData[keyField]){
       		 		flag=false;
       		 		return ;
       			  }
       		  });
   			  if(flag){
   				  $('#businessObjected_grid').datagrid('appendRow',rowData);
   			  }
   	  }else{
   		  $('#businessObjected_grid').datagrid('appendRow',rowData);
   	  }
     }
    	
    	
     	  $('#businessObject_grid').datagrid("options").onClickRow = select;
     	  
     	 $('#businessObject_grid').datagrid("options").onCheck = select ;
    	  
    }
 
  
  $('#businessObject_layout').layout({
	  fit:true
  });   
  
  

  
  
  
  if(!singleSelect){
	  $('#businessObjected_grid').datagrid({
		  fit:true,
		  singleSelect : false,
		  idField : keyField,
          columns : [[ {
         	  field : keyField,
        	  checkbox:true
          },{field: nameField,
  	                title: title,
	                width: 100,
	                align: 'center'}]],
	                toolbar:[{
	        			  id:"remove",
	        			  text:"删除",
	        			  iconCls:"icon-remove",
	        			  handler: function(){
	        				  
	        				  var checkedData=$('#businessObjected_grid').datagrid('getSelections');
	        				  var AllData=$('#businessObjected_grid').datagrid("getData").rows;
	        				  var data=new Array();
	        				  if(checkedData&&checkedData.length>0){
		        				  $.each(AllData,function(index,row){
		        					  var flag=true;
		        					  $.each(checkedData,function(){
		             					 if(row.id == this.id){
		             						 flag=false;
		             						 return ;
		             					 }
		            				  }) ;
		            				  if(flag){
		                				 data.push(row);
		            				  }
		        				    }) ;
	        				  }
	        
	        			      var copyRows=new Array();
	        			      for ( var j= 0; j < checkedData.length; j++) {       
	        			    	  copyRows.push(checkedData[j]);        			
	        			       }
	        			      for(var i=0;i<copyRows.length;i++){
	        			    	  var rowIndex=$('#businessObjected_grid').datagrid('getRowIndex',copyRows[i]);
	        					  $('#businessObjected_grid').datagrid('deleteRow',rowIndex);

	        			      }
	        				  $("#businessObjected_grid").datagrid("clearSelections");
	        				 
	        			  }
	        		  }],
          
	});
  }else{
	  $('#businessObject_layout').layout("remove","east");   
  }
}