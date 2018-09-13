$(function(){
    //页面加载完成之后执行
    pageInit();
});  

function pageInit(){
	   jQuery("#list2").jqGrid({
		    url: '/platform-app/sys/base/baseProjectType/getTypetree',
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            treeGrid: true,
            treeGridModel: "adjacency", 
            ExpandColumn:"name",
            datatype : "json", 
            height:"auto",
            subGrid:true,
            autowidth:true,
            jsonReader : {
                root:"result",
                repeatitems : false  
            },
            colModel : [ 
             /*   {name:'id', label:'单选框', width: 20, align:'center', formatter:function(id){
                	return "<input name='myradio' type='radio'  value="+id+" >";
                }, formatoptions:{disabled:false}},*/
               {name : 'id',label : 'id',hidden:true,align : "center"},
                {name : 'name',label : '产品类型名称',align : "center",editable: true},
                {name : 'code',label : '产品类型编码',align : "center"},
                {name : 'status',label : '状态',align : "center",formatter:function(status){
                	if(status=="0"){
                		return "禁用";
                	}else if(status=="1"){
                		return "启用";
                	}else{
                		return "";
                	}
                }},
                {name : 'remark',label : '备注',align : "center"}
            ],
            treeReader:{
            		   level_field: "level",
            		   parent_id_field: "parentId",
            		   leaf_field: "isLeaf",
            		   expanded_field: "expanded",
            		   left_field:"lft",
            		   right_field: "rgt"
            		},
           ondblClickRow:function(id,iRow,iCol,e){
        	    if(iCol==1){
        	    	return;
        	    }
        		var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
        		var rowDataOnly = jQuery("#list2").jqGrid('getRowData',rowid);
        		var parentId=rowDataOnly.parentId;
        		var rowData = jQuery("#list2").jqGrid('getRowData',parentId);
        		var addcode="";
        		var parentsCode=getcodeValue(parentId,addcode);
        		var code=rowData.code;
        	    var name=rowData.name;
        	   window.open(encodeURI(encodeURI("detail.html?id="+rowid+"&code="+code+"&name="+name+"&parentsCode="+parentsCode)));
              },
            onCellSelect:function(){
            /*	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
            	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
            			var postdata={
            					name:updateName
            			}
            			$.ajax({
            				url:"/platform-app/sys/base/baseProjectType/updateName/"+rowid,
            				type:'PUT',
            				dataType:'JSON',
            				contentType:"application/json",	
            				data:JSON.stringify(postdata),
            				success:function (resultData) {
            					$('#list2').jqGrid().trigger("reloadGrid");
            				}
            			});*/
            },
            pager : '#pager2'
        });
	    $(function(){  
	        //on方法对动态元素绑定click事件  
	        $("#list2").on("dbclick", ".mark_data", function(){  
	           return;
	        });  
	    });  
}

function deleteProjectType(){
var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!ids||ids.length==0) {
		toastr.warning("请选择要删除的行！");
		return;
	}
	if(ids&&ids!='') {
		if(confirm("确认删除数据吗？")){
			$.ajax({
				url:"/platform-app/sys/base/baseProjectType/deleteBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						//toastr.success("数据删除成功！");
						$('#list2').jqGrid().trigger("reloadGrid");
					}else{
						toastr.error("删除数据失败！");
					}
				}
			});
		}
	}
}
function updateName(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	    jQuery("#list2").jqGrid('editRow',rowid);

}
//修改状态 启用禁用 
function  updateStatus(e){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	if(!rowData||rowData.length==0) {
		toastr.warning("请选择要修改状态的行！");
		return;
	}
	if(rowData.length>1){
		toastr.warning("请选择一行！");
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
	$.ajax({
		url:"/platform-app/sys/base/baseProjectType/updateStatus/"+rowid,
		type:'PUT',
		dataType:'JSON',
		contentType:"application/json",
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				$('#list2').jqGrid().trigger("reloadGrid");
			}
		}
	});
	}
}

//上移1 下移2 置顶 3 置底4
function updateSort(e){
	var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
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
			url:"/platform-app/sys/base/baseProjectType/updateSort/"+ids,
			type:'put',
			dataType:'JSON',
			contentType:"application/json",
			data:'{"sortType":'+sortType+'}',
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					$('#list2').jqGrid().trigger("reloadGrid");
				}else{
				}
			}
		});
	}

}
//添加页面 
function toAdd(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentId=rowData.parentId;
	var parentIdCode="";
	var parentsCode=getcodeValue(rowid,parentIdCode)
	var code=rowData.code;
	var name=rowData.name;
	window.open(encodeURI(encodeURI("add.html?code="+code+"&name="+name+"&parentId="+rowid+"&parentsCode="+parentsCode)));
	
}

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
function toupdate(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!rowid){
		toastr.error("请选择一行修改！");
		return;
	}
	var rowDataOnly = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentId=rowDataOnly.parentId;
	var rowData = jQuery("#list2").jqGrid('getRowData',parentId);
	var addcode="";
	var parentsCode=getcodeValue(parentId,addcode);
	var code=rowData.code;
    var name=rowData.name;
	window.open(encodeURI(encodeURI("update.html?code="+code+"&name="+name+"&parentId="+parentId+"&parentsCode="+parentsCode+"&id="+rowid)));
}