var rowData;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid();

});  

function pageInit(){
//	getSupplierData();//加载主表数据
	getCompany();//加载筛选条件
	//getBaseRegionData(); 
	//getProject();
	$("#selectCompany").change(function(){
		 $("#selectProject").empty();
	  getProject();
	})   
}

/**
 * author:liuf
 * describe:查询所有公司数据 
 * param:null
 */
function getCompany(){
	$.ajax({
        type:'post',
        url:serviceUrl+'pl/plCompany/queryList',
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 for(var o in company){
        				 $("#selectCompany").append("<option value='"+company[o].companyId+"'>"+company[o].name+"</option>")
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        },
        complete:function(){
        	getProject();
        }
	}) 
}
/**
 * author:liuf
 * describe:装载所属项目
 * param:null
 */
function getProject(){
	var companyId=$("#selectCompany").val();
	var data={companyId:companyId};
	$.ajax({
        type:'post',
        url:serviceUrl+'pl/projectOption/queryProjectByCompanyId',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(data),
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var project=data.result;
        		    if(project.length>0){
        		    	for(var o in project){
        		    		$("#selectProject").append("<option value='"+project[o].projectId+"'>"+project[o].projectName+"</option>")
        		    	}
        		    }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 
}

/**
 * author:liuf
 * describe:装载过滤查询的条件
 * param:null
 */
function searchDate(){
	var name=$("#Corname").val();
	var companyname=$("#selectCompany option:selected").val();
	var provicename=$("#selectProvice option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,companyname:companyname,provicename:provicename}}).trigger("reloadGrid");
 	getSupplierData();
}
/**
 * author:liuf
 * describe:查询列表主表数据 
 * param:name,companyname,provincename
 */



function getSupplierData(){
    jQuery("#list2").jqGrid(
            {
                url:serviceUrl+'sys/base/baseSupplier/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                postData:{name:"",companyname:"",provicename:""},
               // multiboxonly:true,
               // multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                	  repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                 //   {name : 'name',label : '供方名称',align : "center",cellattr: addCellAttr},
                    {name : 'code',label : '供方编码',align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    },cellattr: addCellAttr},
               //     {name : 'companyName',label : '所属公司',align : "center"},
                    {name : 'representative',label : '法人',align : "center"},
                    {name : 'provinceName',label : '所在省',align : "center"},
                    {name : 'cityName',label : '所在市',align : "center"},
                    {name : 'relationPerson',label : '联系人',align : "center"},
                    {name : 'phone',label : '联系电话',align : "center"}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
    /*            onSelectRow:function(rowid){
                	jQuery("#list3").jqGrid("setGridParam",{postData:{id:rowid}}).trigger("reloadGrid");
                },
    */            ondblClickRow:function(rowid){
                	window.open("supplier_edit.html?type=edit&id="+rowid);
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
                /*	 if(userOnId){
                		 $(this).jqGrid("setSelection",userOnId);
                	 }*/
				//	 $.xljUtils.resizeNestedGrid();
                	 $.xljUtils.addGridScroll();
					 $.xljUtils.gridResizeFn();
                		rowDataBefore = rowData;
                        if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        	//添加回显选中行样式
                        	$('#list2').setSelection(rowDataBefore.id,true);
                        	$('#list2'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                        }
                 }

            });
}

/**
 * author:liuf
 * describe:删除  伪删除 
 * param:null
 */
function deleteSupplier(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var next=$("#"+ids).next().attr("id");
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"sys/base/baseSupplier/delete/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						/*userOnId=next;*/
						$('#list2').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","删除成功！");
						//$('#list3').clearGridData();
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




function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}
//grid 自适应宽度
$(window).resize(function(){
	$.xljUtils.gridResizeFn();
});
