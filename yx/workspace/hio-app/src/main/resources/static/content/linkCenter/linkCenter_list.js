var rowData;//当前选中数据
var rowDataBefore;
var urlParamJson = $.xljUtils.getUrlParams();
$(function(){
	var linkCenterOpenWin = urlParamJson.linkCenterOpenWin;
	//判断是否显示bar条
	if(linkCenterOpenWin == 'true'){
		$('.xj-form-header').show();
        $('.xj-font').css({'padding-top':'60px'});
		$('.btns-group button').hide();
	}
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid();
    $("#LinkSearchname").inputPlaceholder();
$("#LinkSearchname").keyup(function(event){
	if(event.keyCode ==13){
		 searchDate();
	}
});
$('#closeBtn').on('click',function () {
	newwin = window.open("","_parent","");  
    newwin.close();
});
});  

function pageInit(){
	getlinkCenterData();
	
}
function searchDate(){
	var name=$("#LinkSearchname").getInputVal();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name},page:1}).trigger("reloadGrid");
 	getlinkCenterData();
}



/**
 * author:liuf
 * describe:查询列表数据
 * param: null
 */
function getlinkCenterData(){
    jQuery("#list2").jqGrid(
            {
                url: serviceUrl+'oa/sys/sysLinkCenter/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
               // multiboxonly:true,
               // multiselect:true,
                autowidth:true,
                rownumbers:true,
                postData:{name:""},
                jsonReader : {
                	//root:"result.list",
                    repeatitems: false
                },
                colModel : [ 
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '名称',align : "center",cellattr: addCellAttr},
                    {name : 'parentName',label : '父级名称',align : "center",formatter:function(parentName){
                    	if(parentName=="请选择"){
                    		return "";
                    	}else{
                    		return parentName;
                    	}
                    }},
                    {name : 'code',label : '编号',align : "center"},
                    {name : 'state',label : '状态',align : "center",formatter:function(state){
                    	if(state=="0"){
                    		return "禁用";
                    	}else if(state=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    },cellattr: addCellAttr},
                //    {name : 'sort',label : '序号',align : "center"},
                    {name : 'icon',label : '图标',align : "center",formatter:function(icon){
                    	if(icon){
                    		return '<img src="data:image/jpeg;base64,'+icon+'" style="width:30px;height:30px">';
                    	}else{
                    		return "";
                    	}
                    }},
                    {name : 'url',label : '链接地址',align : "center"},
                    {name : 'parentId',label : 'parentId',hidden:true,align : "center"}
                ],
                rowNum : 20,
                rowList : [ 20, 50, 100,200 ],
                pager : '#pager2',
                ondblClickRow:function(rowid){
                	 toupdate();
                },
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#list2').jqGrid("getGridParam","selrow");
        		      rowData = $('#list2').jqGrid('getRowData',rowId);
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                gridComplete:function(){
               	/* if(userOnId){
            		 $(this).jqGrid("setSelection",userOnId);
            	 }*/
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
                	rowDataBefore = rowData;
                        if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        	//添加回显选中行样式
                        	$('#list2').setSelection(rowDataBefore.id,true);
                        	$('#list2'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                        }
              	   var i=0;
              	   var arr = jQuery("#list2").jqGrid('getRowData');
              	   for(var o in arr){
              		   if(!arr[o].parentId){
              			   if(arr[o].state=="启用"){
              				   i+=1;
              			   }
              		   }
              	   }
              	   if(i>4){
              		 pop_tip_open("blue","前台页面只能维护4列！请将多余父级名称为空的数据设置为禁用状态"); 
              	   }
                 }
            });
    	    
}
/**
 * author:liuf
 * describe:删除数据
 * param: null
 */
function deletelinkCenter(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prvid=$("#"+ids).prev().attr("id");
		if(ids&&ids!='') {
			  pop_text_open("blue",'确认要删除这条数据吗？',function(){
					$.ajax({
						url:serviceUrl+"oa/sys/sysLinkCenter/deletePseudo/"+ids,
						type:'DELETE',
						dataType:'JSON',
						success:function (resultData ) {
							if (resultData&&resultData.success) {
								 rowData = {id:prvid};
								$('#list2').jqGrid().trigger("reloadGrid");
								pop_tip_open("green","删除成功！");
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
 * describe:修改状态
 * param: e(1 启用 0 禁用)
 */
function  updateStatus(e){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改状态的行！");
		return;
	}
	var rowData = $("#list2").jqGrid("getRowData",ids);
	var  dataStatus="";
	if(rowData.state=="启用"){
		dataStatus=1;
	}else if(rowData.state=="禁用"){
		dataStatus=0;
	}
	if(e==dataStatus){
		return;
	}else{
	$.ajax({
		url:serviceUrl+"oa/sys/sysLinkCenter/updateStatus/"+ids,
		type:'PUT',
		dataType:'JSON',
		 contentType : "application/json",  
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				$('#list2').jqGrid().trigger("reloadGrid");
				pop_tip_open("green","修改成功！");
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
 * describe:修改状态
 * param: e(1 上移 2 下移)
 */
function updateSort(e){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要排序的行！");
		return;
	}
	if(ids){
		var sortType="";
		if(e=="1"){
			sortType="1";
		}else if(e=="2"){
			sortType="2";
		}
		$.ajax({
			url:serviceUrl+"oa/sys/sysLinkCenter/updateSort/"+ids,
			type:'put',
			dataType:'JSON',
			contentType:"application/json",
			data:'{"sortType":'+sortType+'}',
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					$('#list2').jqGrid().trigger("reloadGrid");
				/*	userOnId=ids;*/
					pop_tip_open("green","排序成功！");
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
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改的行！");
		return;
	}
	var rowData = $("#list2").jqGrid("getRowData",ids);
	var parentId=rowData.parentId;
	window.open("linkCenter_edit.html?type=edit&id="+ids+"&parentId="+parentId);
}
/**
 * author:liuf
 * describe:跳转新增页面
 * param: null
 */
function toadd(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	var rowData = $("#list2").jqGrid("getRowData",ids);
	var parentId=rowData.parentId;
	window.open("linkCenter_edit.html?type=add&id="+ids+"&parentId="+parentId);
}
/**
 * author:liuf
 * describe:变色
 * param: null
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.state == "0" ){
        return "style='color:red'";
    }
}
/**
 * author:liuf
 * describe:展示portal页面
 * param: null
 */
function showPortal(){
	window.open("linkCenter_portal.html");
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	jQuery("#list2").jqGrid("setGridParam",{postData:{id:id},page:1}).trigger("reloadGrid");
}