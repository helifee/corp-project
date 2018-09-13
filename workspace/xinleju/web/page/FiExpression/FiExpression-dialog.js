var boWindow;

var isIE = !(!document.all);  
function posCursor(){  
  var start=0,end=0;   
  var oTextarea = document.getElementById("expression");  
  if(isIE){  
   
    var sTextRange= document.selection.createRange();  

  
    if(sTextRange.parentElement()== oTextarea){  
    
      var oTextRange = document.body.createTextRange();  
   
      oTextRange.moveToElementText(oTextarea);  
        
   
      for (start=0; oTextRange.compareEndPoints("StartToStart", sTextRange) < 0; start++){   
        oTextRange.moveStart('character', 1);   
      }  
       
      for (var i = 0; i <= start; i ++){  
        if (oTextarea.value.charAt(i) == '\n'){   
          start++;   
        }  
      }   
  
      
      oTextRange.moveToElementText(oTextarea);   
      for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end ++){  
        oTextRange.moveStart('character', 1);  
      }  
      for (var i = 0; i <= end; i ++){  
        if (oTextarea.value.charAt(i) == '\n'){   
          end++;   
        }  
      }  
    }  
  }else{  
    start = oTextarea.selectionStart;  
    end = oTextarea.selectionEnd;  
  }  
  document.getElementById("start").value = start;   
  document.getElementById("end").value = end;  
}  

$(function(){
	init();
})

function init(){
	
	//业务对象数据集开窗
	boWindow = new TemplateWindow({
		"id":"boWindow",
		"title":'业务对象',
		"templateUrl":contextPath+"/page/dialog/grid.jsp?model=boDataRef",
		"baseParams":{},
		"width":500,
		"height":$(document).height(),
		"okCallback":function(data){
			tj(" "+$('#tree').tree('getSelected').id + " == \""+data.id+"\"");
		}
	});
	
	
	$('#west_grid').datagrid({
		  fit:true,
		  fitColumns : true,
		  singleSelect : true,
		 // toolbar: '#tb',
        columns : [
                   [{
						  width:300,
						  halign : 'center',
						  align : 'left',
						  field : 'name',
						  title : '公式'
					}]
                   ],
                   onDblClickRow: function(index){
                	   tj(" "+$('#west_grid').datagrid("getSelected").format);
                   },
  	  onLoadSuccess : function(data){
  		  if(data.success == false){
  			  alert(data.mes);
  		  }
  	  },
  	  onLoadError : function(){
  		  alert("数据加载异常");
  	  }
	  });
	
	/** 
	 * 运算符datagrid初始化
	 */
	$('#center_grid').datagrid({
		  fit:true,
		  fitColumns : true,
		  singleSelect : true,
		 // toolbar: '#tb',
		  columns : [[{
                	 	width:200,
                	 	halign : 'center',
                	 	align : 'left',
						field : 'name',
						title : '运算符'
					}]],
         onDblClickRow: function(index){//双击时将运算符打印到公式编辑框
        	  tj(" "+$('#center_grid').datagrid("getSelected").code);
         },
		 onLoadSuccess : function(data){
			  if(data.success == false){
				  alert(data.mes);
			  }
		 },
		 onLoadError : function(){
			 alert("数据加载异常");
		 }
	  });
	
	/**
	 * 右侧树
	 */
	var baseParams;
	$('#tree').tree({
		 cascadeCheck:false,
		 lines:true,
		 animate:true,
		 onSelect:function(node){
			 if(node.id == -1){
				 return;
			 }
			 //选中节点时候调用
			 if(node.vtype != 'enum'){
				  tj(" "+node.id);
			 }
		 },
		 onDblClick:function(node){
			 if(node.id == -1){
				 return;
			 }
			 //选中节点时候调用
			 if(node.vtype == 'enum'){
				 boWindow.baseParams = {boid:node.dsid};
				 boWindow.openWindow();	 
			 }
		 },
		 onBeforeExpand:function(node){
			 if(node.id == -1){
				 return;
			 }
			 //选中节点时候调用
			 if(node.vtype == 'enum'){
				 $('#tree').tree('options').url=contextPath+"/FiExpersson!loadBoTree.do?boid="+node.dsid+"&fieldkey="+node.fieldkey;
			 }
		 }
	  });
	
	
   	var  componentId=$('#componentId').val();
   	baseParams=JSON.parse($("#baseParams_"+componentId,parent.document).val());
	
   	$.post(contextPath+'/FiExpersson!load.do',{boid:baseParams.boid},function(data){
		//左侧“公式”数据
   		if(data['function']){
			$('#west_grid').datagrid("loadData",data['function']);
		}
   		//中间“运算符”数据
		if(data.operator){
			$('#center_grid').datagrid("loadData",data.operator);
		}
		//右侧""
		if(data.bofieldtree){
			$('#tree').tree("loadData",data.bofieldtree);
		}
	})
	
}

 

 //执行方法确认
         function   okCallback(){
        	return $('#expression').attr("value");
         }
         
         //取消执行方法
         function cancelCallback(){
        	 
         }
         
         
         function tj(str){
        	 var end =  parseInt(document.getElementById("end").value);  
 			var textarea = document.getElementById("expression").value;
 			var substring = textarea.substring(0,end);
 			textarea = substring+str+textarea.substring(end,textarea.length);
 			document.getElementById("end").value = end+str.length;
 			document.getElementById("expression").value = textarea;
 			document.getElementById("start").value = end+str.length;
         }
         