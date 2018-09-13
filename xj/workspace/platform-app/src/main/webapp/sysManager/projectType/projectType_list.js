var rowDataCurr;//当前选中数据
var rowDataBefore;
var ProjectTypeAllData=null;
var descData=null;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid(); 
    $("#pName").inputPlaceholder();
    $("#pName").keypress(function(e){
    	jQuery("#list2").jqGrid("clearGridData");
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
        	searchProjectDate();
        }
 })
 $('.ui-jqgrid-bdiv').bind("scroll", function (event){  
 	addGridPage();
 });
 
});  
/**
 * 
 */
function pageInit(){
	getProjectTypeData();
}

/**
 * author:liuf
 * describe: 过滤查询
 * param: null
 */
//初始化数据
var pageFlag=true;
var limit=50;//每页条数，更改只需更改此参数
var start=limit;//下拉分页初始条数
function addGridPage(){
	   var pstatus=$("#status").val();//获取状态
	   var name=$("#pName").getInputVal();// 获取名称
	var gridH=$('#ascrail2000');
	var gridHight=$('#ascrail2000').height();
	var scroll=gridH.find('div')[0];
	var top=$(scroll).css('top').replace('px','');
	var rowDatas=$("#list2").jqGrid("getDataIDs");
	var rowDataCurrId=rowDatas[rowDatas.length-1];
	var sH=$('#ascrail2000 div').height();
	if(gridHight-top-sH<=30 && pageFlag){
		pageFlag=false;
		var queryDataUser=new Object();
		queryDataUser.start=start;
		queryDataUser.limitNum=limit;
		queryDataUser.name=name;
		queryDataUser.pstatus=pstatus;
		queryDataUser.beforeStatusId=rowDataCurrId;
		//请求数据
		var ubody = "sys/base/baseProjectType/getTypetree";
		var uall = hostUrl+ubody;
		$.ajax({
			type:'POST',
			url:uall,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryDataUser),
			success: function(json) {
				if(json.success == true){
					var dataRow=json.result;
					if(dataRow.length>0){
						$("#list2").jqGrid("addRowData",start+1, dataRow, "last");
						try {$("#list2").jqGrid("setTreeNode", start+1, start+limit+1);} catch (e) {}
						$.xljUtils.gridResizeFn();
						pageFlag=true;
						start=start+limit;
					}
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","查询列表请求失败");
			}
		})
	}
}
function searchProjectDate(){
/*	var status=$("#status").find("option:selected").text();
	if(status){
	var arr =ProjectTypeAllData;
	descData=new Array();
	var deflag=null;
	for(var i=arr.length-1;i>0;i--){
		var o=arr[i];
		if(deflag!=null){
		//	console.log(deflag.sort+"=="+o.sort);
			//console.log(deflag.sort.indexOf(o.sort));
			if(deflag.sort.indexOf(o.sort)>=0){
				descData.push(o);
				continue ;
			}
		}
		if(o.status==status){
			descData.push(o);
			deflag=o;
		}
		
	}
	var ascData=new Array();
	for(var i=descData.length-1;i>0;i--){
		var o=descData[i];
		ascData.push(o);
	}
	}else{
		ascData=ProjectTypeAllData;
	}*/
	//$("#list2").jqGrid('clearGridData');  //清空表格
	   var pstatus=$("#status").val();//获取状态
	   var name=$("#pName").getInputVal();// 获取名称
	 jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,pstatus:pstatus,start:1,limitNum:50}}).trigger("reloadGrid");   
	 getProjectTypeData();
}
/**
 * author:liuf
 * describe: 加载页面数据
 * param: null
 */

function getProjectTypeData(){

	//var data=null;
	// jQuery("#list2").jqGrid('clearGridData');
	   jQuery("#list2").jqGrid({
		    url: hostUrl+'sys/base/baseProjectType/getTypetree',
           ajaxGridOptions: { contentType: 'application/json' },
           mtype : "POST",  
           treeGrid: true,
           treeGridModel: "adjacency", 
           ExpandColumn:"name",
           datatype : "json", 
           subGrid:true,
           autowidth:true,
           postData:{start:1,limitNum:50,pstatus:"",name:"",beforeStatusId:""},
           jsonReader : {
         /*      root:function(data){
            	   var pstatus=$("#status").val();//获取状态
            	   var name=$("#pName").val();// 获取名称
            	   var array=new Array();
            	   var arr=data.result;
	             	if(pstatus){//有状态的时候
		            		   if(name){//名称存在时
		            			   for(var o in arr){
		            				   if(arr[o].status==pstatus&&(arr[o].name.indexOf(name)>-1)){
		            					   array.push(arr[o].sort);
		            				   }
		            			   }
		            		   }else{
		            			   for(var o in arr){
		            				   if(arr[o].status==pstatus){
		            					   array.push(arr[o].sort);
		            				   }
		            			   }
		            		   }

		            	   if(array.length>0){
		            		  for(var d in array){
		            			  for(var i in arr){
		            				  if(arr[i].isrepat==true){
		            				  if(array[d].indexOf(arr[i].sort)>-1){
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
            	   }else{//没状态的时候
            		  if(name){
            			  for(var o in arr){
           				   if(arr[o].name.indexOf(name)>-1){
           					   array.push(arr[o].sort);
           				   }
            			  }
            			   if(array.length>0){
 		            		  for(var d in array){
 		            			  for(var i in arr){
 		            				  if(arr[i].isrepat==true){
 		            				  if(array[d].indexOf(arr[i].sort)>-1){
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


            	 }
               },*/
        	   root:"result",
               repeatitems : false  
           },
           colModel : [ 
            /*   {name:'id', label:'单选框', width: 20, align:'center', formatter:function(id){
               	return "<input name='myradio' type='radio'  value="+id+" >";
               }, formatoptions:{disabled:false}},hidden:true,*/
              {name : 'id',label : 'id',hidden:true,align : "center"},
               {name : 'name',label : '产品类型名称',align : "left",editable: true,cellattr: addCellAttr},
               {name : 'code',label : '产品类型编码',align : "center"},
               {name : 'status',label : '状态',align : "center",formatter:function(status){
               	if(status=="0"){
               		return "禁用";
               	}else if(status=="1"){
               		return "启用";
               	}else{
               		return "";
               	}
               },cellattr: addCellAttr},
               {name : 'sort',label : '排序',hidden:true,align : "center"},
               {name : 'remark',label : '备注',align : "center"},
               {name : 'parentId',label : '父级Id',align : "center",hidden:true,},
               {name : 'expanded',label : '是否展开',hidden:true,align : "center"}

           ],
           rowNum:-1,
           treeReader:{
           		   level_field: "level",
           		   parent_id_field: "parentId",
           		   leaf_field: "isLeaf",
           		   expanded_field: "expanded"
           		},
          ondblClickRow:function(id,iRow,iCol,e){//双击回显页面 除了名字列以外(名字列双击编辑)
       	    if(iCol==1){
       	    	return;
       	    }
       	 toupdate();
/*       		var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
       		var rowDataOnly = jQuery("#list2").jqGrid('getRowData',rowid);
       		var parentId=rowDataOnly.parentId;
       		var rowData = jQuery("#list2").jqGrid('getRowData',parentId);
       		var addcode="";
       		var parentsCode=getcodeValue(parentId,addcode);
       	    var name=rowData.name;
       	   window.open(encodeURI(encodeURI("projectType_edit.html?type=edit&id="+rowid+"&name="+name+"&parentsCode="+parentsCode)));*/
             },
            
           onCellSelect:function(){
        	 	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		//重新选择行时清除上一次选中行的样式
            		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
           },
           onSelectRow: function () {
           	var rowId=$('#list2').jqGrid("getGridParam","selrow");
           	rowDataCurr = $('#list2').jqGrid('getRowData',rowId);
           },
           pager : '#pager2',
           loadError:function(jqXHR, textStatus, errorThrown){
        	   $.xljUtils.getError(jqXHR.status);
           },
           gridComplete:function(){
        	   $.xljUtils.addGridScroll();
			   $.xljUtils.gridResizeFn();
     /*        var arrdata=jQuery("#list2").jqGrid('getRowData');   
             for(var o in arrdata){
            	 if(arrdata[o].expanded=="false"){
            		 $("#"+arrdata[o].id).hide();
            	 }
             }*/
             rowDataBefore = rowDataCurr;
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
function deleteProjectType(){
var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
if(!ids) {
	pop_tip_open("blue","请选择一条数据");
	return;
}
var prev=$("#"+ids).prev().attr("id");
	if(ids&&ids!='') {
		  pop_text_open("blue",'确认要删除该产品类型及该类型下面的所有类型吗？',function(){
				$.ajax({
					url:hostUrl+"sys/base/baseProjectType/deleteBatch/"+ids,
					type:'DELETE',
					dataType:'JSON',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							rowDataCurr={id:prev}
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
 * describe: 打开重命名
 * param: null
 */
function toUpdateName(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	    jQuery("#list2").jqGrid('editRow',rowid);
	    $("#listButton").hide();
	    $("#renameButton").show();
}

/**
 * author:liuf
 * describe: 重命名产品类型
 * param: null
 */
function updateName(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	
	jQuery("#list2").jqGrid('saveRow',rowid);
   	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
   	var updateName=rowData.name;
   	if(!updateName){
   		pop_tip_open("blue","产品类型名称不能为空");
 	   $("#listButton").show();
	   $("#renameButton").hide();
	  $('#list2').jqGrid().trigger("reloadGrid");
		return;
   	}
   			var postdata={
   					name:updateName
   			}
   			$.ajax({
   				url:hostUrl+"sys/base/baseProjectType/updateName/"+rowid,
   				type:'PUT',
   				dataType:'JSON',
   				contentType:"application/json",	
   				data:JSON.stringify(postdata),
   				success:function (resultData) {
   					if(resultData.success){
   						$('#list2').jqGrid().trigger("reloadGrid");
   						$("#listButton").show();
   						$("#renameButton").hide();
   					}else{
   						pop_tip_open("red",resultData.msg);
   						$('#list2').jqGrid().trigger("reloadGrid");
   						$("#listButton").show();
   						$("#renameButton").hide();
   					}
   				},
   			});
}
/**
 * author:liuf
 * describe: 重命名产品类型
 * param: null
 */
function cancelUpdateName(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	 jQuery("#list2").jqGrid('restoreRow', rowid);
	   $("#listButton").show();
	 $("#renameButton").hide();
}
/**
 * author:liuf
 * describe:修改状态 启用禁用 (当节点禁用时候  其子节点 以及所有孙子节点都禁用  当节点启用时 其父节点也相应的启用)
 * param: e(1是启用 0是禁用)
 */
function  updateStatus(e){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");

	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	var  dataStatus="";
	if(rowData.status=="启用"){
		dataStatus=1;
	}else if(rowData.status=="禁用"){
		dataStatus=0;
	}
	if(e==dataStatus){
		return;
	}else{
		var isChildren = false;
		if(e==1&&rowData.isLeaf=="false"){//启用
			$.xljUtils.confirm("blue", "是否同时启用所有下级节点", function () {
				isChildren = true;
			},function () {
				isChildren = false;
			},"启用", function () {
				$.ajax({
					url:hostUrl+"sys/base/baseProjectType/updateStatus/"+rowid,
					type:'PUT',
					dataType:'JSON',
					data:JSON.stringify({'id':rowid,'isChildren':isChildren}),
					async:false,
					contentType:"application/json",
					success:function (resultData) {
						if (resultData&&resultData.success) {
							/*	if(rowData.status=="启用"){
							 rowData.status=0;
							 }else{
							 rowData.status=1;
							 }
							 $("#list2").jqGrid('setRowData',ids, rowData);*/
							$('#list2').jqGrid().trigger("reloadGrid");
							pop_tip_open("green","修改状态成功");
						}else{
							pop_tip_open("red",resultData.msg);
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
					}
				});
			});
		}else{
			$.ajax({
				url:hostUrl+"sys/base/baseProjectType/updateStatus/"+rowid,
				type:'PUT',
				dataType:'JSON',
				async:false,
				data:JSON.stringify({'id':rowid,'isChildren':isChildren}),
				contentType:"application/json",
				success:function (resultData) {
					if (resultData&&resultData.success) {
						/*	if(rowData.status=="启用"){
						 rowData.status=0;
						 }else{
						 rowData.status=1;
						 }
						 $("#list2").jqGrid('setRowData',ids, rowData);*/
						$('#list2').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","修改状态成功");
					}else{
						pop_tip_open("red",resultData.msg);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
				}
			});
		}
	}
}

/**
 * author:liuf
 * describe:修改排序 上移 下移 置顶 置底
 * param: (1是上移 2是下移 3是置顶 4是置底)
 */
function updateSort(e){
	var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!ids) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	if(ids){
		var sortType="";
		if(e=="1"){
			sortType="1";
		}else if(e=="2"){
			sortType="2";
		}else if(e=="3"){
			sortType="3";
		}else if(e=="4"){
			sortType="4";
		}
		$.ajax({
			url:hostUrl+"sys/base/baseProjectType/updateSort/"+ids,
			type:'put',
			dataType:'JSON',
			contentType:"application/json",
			data:'{"sortType":'+sortType+'}',
			async:false,
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					pop_tip_open("green","排序成功");
					$('#list2').jqGrid().trigger("reloadGrid");
				}else{
					pop_tip_open("red",resultData.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
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
	/*	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentIdCode="";
	var parentsCode=getcodeValue(rowid,parentIdCode)
	$("#parentId").val(rowData.parentId);
	$("#parentCode").val(parentsCode);
	$("#parentName").val(rowData.name);
	alert($("#parentName").val());*/
	//var name=rowData.name;
	window.open("projectType_edit.html?type=add&parentId="+rowid);
	
}
function getParamsToAdd(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentIdCode="";
	var parentsCode=getcodeValue(rowid,parentIdCode);
	var data={};
	data.name=rowData.name
	data.parentId=rowid;
	data.parentsCode=parentsCode;
	return data;
}
function getParamsToUpdate(){
	var rowid = jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowDataOnly = jQuery("#list2").jqGrid('getRowData',rowid);
	var code=rowDataOnly.code;//  父节点代码
	var parentId=rowDataOnly.parentId;//  父节点id
	var rowData = jQuery("#list2").jqGrid('getRowData',parentId);
	var addcode="";
	var parentsCode=getcodeValue(parentId,addcode);
     parentsCode=parentsCode+"."+code;
	var data={};
	data.name=rowData.name
	data.parentId=rowData.parentId;
	data.parentsCode=parentsCode;
	return data;
}
/**
 * author:liuf
 * describe:拼接参数 添加修改页面上的  所有的父级代码 自己体会吧 点到为止
 * param: rowid,parentIdCode 
 */
function getcodeValue(rowid,parentIdCode){
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);  
	var code=rowData.code;
	var parentId=rowData.parentId;
	if(!parentIdCode){
		parentIdCode=code;
	}else{
		parentIdCode=code+"."+parentIdCode;
	}
	
	if(parentId&&parentId!=''&&parentId!=null){
		parentIdCode = getcodeValue(parentId,parentIdCode);
	}
	return parentIdCode;
}
/**
 * author:liuf
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);  
	var parentId=rowData.parentId;
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	window.open("projectType_edit.html?type=edit&id="+rowid+"&parentId="+parentId);
}

function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}