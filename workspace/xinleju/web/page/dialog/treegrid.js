  
$(function(){
	
			 var  componentId=$('#componentId').val();
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
       				initGrid(columns,data.keyField,showFields[0],data.title,data.isMutil);
       			})
       		})

 
 

       
         
         //执行方法确认
         function   okCallback(){
        	 var checkedData;
         	   if( !$('#tree_grid').treegrid('options').singleSelect){
         		  checkedData=$('#tree_grid').treegrid("getSelections");
              }else{
              	 checkedData=$('#tree_grid').treegrid("getSelected");
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
         function initGrid(columns,keyField,nameField,title,isMutil){
        	 var  componentId=$('#componentId').val();
        	 baseParams=JSON.parse($("#baseParams_"+componentId,parent.document).val());
        	 var singleSelect = !isMutil;
        	 
        	  $('#tree_grid').treegrid({
        		  fit:true,
        		  url : contextPath+'/FiRef!load.do?model='+$('#model').val(),
        		  fitColumns : true,
        		  idField:keyField,    
        		  treeField:nameField,
        		  queryParams : baseParams,
        		  singleSelect : singleSelect,
        		 // toolbar: '#tb',
		          columns : [columns],
	        	  onLoadSuccess : function(data){
	        		  if(data){
	        			  if(data.success == false){
		        			  alert(data.mes);
		        		  }  
	        		  }
	        		  
	        	  },
	        	  onLoadError : function(){
	        		  alert("数据加载异常");
	        	  }
        	  });
        	  
            	  
         
          
          $('#treegrid_layout').layout({
        	  fit:true
          });   
          
          
     	}