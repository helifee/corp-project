var rowDataNow;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid(); 
    $("#pName").inputPlaceholder();
    $("#pName").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
        	searchPayTypeData();
        }
 })
});  
/**
 * 
 */
function pageInit(){
	getPayTypeData();
}

/**
 * author:liuf
 * describe: 过滤查询
 * param: null
 */

function searchPayTypeData(){
	$("#list2").jqGrid().trigger("reloadGrid");
}
/**
 * author:liuf
 * describe: 加载页面数据
 * param: null
 */

function getPayTypeData(){
	   jQuery("#list2").jqGrid({
		    url: serviceUrl+'sys/base/baseRegion/getTypetree',
           ajaxGridOptions: { contentType: 'application/json' },
           mtype : "POST",  
           treeGrid: true,
           treeGridModel: "adjacency", 
           ExpandColumn:"name",
           datatype : "json", 
           subGrid:true,
           autowidth:true,
           jsonReader : {
               root:function(data){
            	   var name=$("#pName").getInputVal();// 获取名称
            	   var array=new Array();
            	   var arr=data.result;
            		  if(name){
            			  for(var o in arr){
           				   if(arr[o].name.indexOf(name)>-1){
           					   array.push(arr[o].prefixId);
           				   }
            			  }
            			   if(array.length>0){
 		            		  for(var d in array){
 		            			  for(var i in arr){
 		            				  if(arr[i].isrepat==true){
 		            				  if(array[d].indexOf(arr[i].prefixId)>-1){
 		            					  arr[i].expanded=true;
 		            					  arr[i].isrepat=false;
 		            				  }else{
 		            					  arr[i].expanded=false;
 		            					  arr[i].isrepat=true;
 		            				  }
 		            				  }
 		            			  }
 		            		  } 
 		            		   return arr;
 		            		 }else{
 		            			 return null; 
 		            		 }
            		  }else{
            			  return data.result; 
            		  }
               },
               repeatitems : false  
           },
           colModel : [ 
               {name : 'id',label : 'id',hidden:true,align : "center"},
               {name : 'name',label : '名称',align : "center"},
               {name : 'code',label : '编码',align : "center"},
               {name : 'level',label : 'level',hidden:true,align : "center"},
               {name : 'parentId',label : 'parentId',hidden:true,align : "center"},
               {name : 'expanded',label : '是否展开',hidden:true,align : "center"}

           ],
           rowNum:-1,
           treeReader:{
           		   level_field: "level",
           		   parent_id_field: "parentId",
           		   leaf_field: "isLeaf",
           		   expanded_field: "false"
           		},
           	  ondblClickRow:function(id,iRow,iCol,e){//双击回显页面 除了名字列以外(名字列双击编辑)
             	    if(iCol==1){
             	    	return;
             	    }
              	toupdate();
              },
           onCellSelect:function(){
        	 	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
           },
           onSelectRow: function () {
           	var rowId=$('#list2').jqGrid("getGridParam","selrow");
           	rowDataNow = $('#list2').jqGrid('getRowData',rowId);
           },
           pager : '#pager2',
           loadError:function(jqXHR, textStatus, errorThrown){
        	   $.xljUtils.getError(jqXHR.status);
           },
           gridComplete:function(){
        	   $.xljUtils.addGridScroll();
			   $.xljUtils.gridResizeFn();
             var arrdata=jQuery("#list2").jqGrid('getRowData');   
             for(var o in arrdata){
            	 if(arrdata[o].expanded=="false"){
            		 $("#"+arrdata[o].id).hide();
            	 }
             }
             rowDataBefore = rowDataNow;
             if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	 //添加回显选中行样式
            	 $('#list2').setSelection(rowDataBefore.id,true);
            	 $("#"+rowDataBefore.id).addClass("ui-state-highlight"); 
             }
           }
       });
}

/**
 * author:liuf
 * describe: 删除产品类型
 * param: null
 */
function deletePayType(){
var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
if(!ids) {
	pop_tip_open("blue","请选择一条数据");
	return;
}
var prev=	$("#"+ids).prev().attr("id");
	if(ids&&ids!='') {
		  pop_text_open("blue",'确认要删除该区域下面的所有区域吗？',function(){
				$.ajax({
					url:serviceUrl+"sys/base/baseRegion/deletePseudo/"+ids,
					type:'DELETE',
					dataType:'JSON',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							rowDataNow={id:prev};
							$('#list2').jqGrid().trigger("reloadGrid");
							pop_tip_open("green","删除成功");
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
 * author:liuf
 * describe:跳转添加页面  其中选中一行后 添加的新数据为该节点的子节点  不选 默认为根目录
 * param: null
 */
function toAdd(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(rowid){
		window.open("region_edit.html?type=add&parentId="+rowid);
	}else{
		window.open("region_edit.html?type=add");
	}
}
function gerParentName(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	return rowData.name;
}

/**
 * author:liuf
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	window.open("region_edit.html?type=edit&id="+rowid);
}


function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowDataNow={id:id};
	 $('#list2').jqGrid().trigger("reloadGrid");
}