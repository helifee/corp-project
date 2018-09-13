var rowData;//当前选中数据
var rowDataBefore;
$(function(){
	var menuArray = getOperationAuthorition();
	if($.inArray("addBtn", menuArray)>-1){
		$('#addBtn').show();
	}
	if($.inArray("updateBtn", menuArray)>-1){
		$('#updateBtn').show();
	}
	if($.inArray("delBtn", menuArray)>-1){
		$('#delBtn').show();
	}
	if($.inArray("startFlowBtn", menuArray)>-1){
		$('#startFlowBtn').show();
	}
	if($.inArray("startOverBtn", menuArray)>-1){
		$('#startOverBtn').show();
	}
	if($.inArray("trackFlowBtn", menuArray)>-1){
		$('#trackFlowBtn').show();
	}
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid();
    $("#pName").inputPlaceholder();
    $("#pName").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
     	   searchData();
        }
 })

});  

function pageInit(){
	getOfficeOutData();//加载主表数据
	    
}



/**
 * author:liuf
 * describe:装载过滤查询的条件
 * param:null
 */
function searchData(){
	var name=$("#pName").getInputVal();
	var status=$("#status option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,status:status},page:1}).trigger("reloadGrid");
 	getOfficeOutData();
}
/**
 * author:liuf
 * describe:查询列表主表数据 
 * param:name,companyname,provincename
 */



function getOfficeOutData(){
    jQuery("#list2").jqGrid(
            {
                url:serviceUrl+'/oa/officeOut/getOfficeOutpage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
              //  postData:{name:"",companyname:"",provicename:""},
               // multiboxonly:true,
               // multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                	  repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'instanceId',label : 'instanceId',hidden:true,align : "center"},
                    {name : 'theme',label : '主题',align : "center"},
                    {name : 'proposeUser',label : '申请人',align : "center"},
                    {name : 'proposeDept',label : '申请部门',align : "center"},
                    {name : 'code',label : '编码',hidden:true,align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "草稿";
                    	}else if(status=="1"){
                    		return "审批中";
                    	}else if(status=="2"){
                    		return "已完成";
                    	}else if(status=="3"){
                    		return "草稿";
                    	}else if(status=="4"){
                    		return "草稿";
                    	}else if(status=="7"){
                    		return "草稿";
                    	}else if(status=="9"){
                    		return "审批中";
                    	}
                    }},
                    {name : 'remark',label : '备注说明',align : "center"},
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
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
                	 $.xljUtils.addGridScroll(); 
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
 * describe: 伪删除 
 * param:null
 */
function deleteOfficeOut(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prvid=$("#"+ids).prev().attr("id");
	var rowDelData=$("#list2").jqGrid('getRowData',ids);
	var status=rowDelData.status;
	if(status!="草稿"){
		pop_tip_open("blue","不允许删除");
		return;
	}
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"/oa/officeOut/deletePseudo/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						rowData={id:prvid};
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

/**
 * author:liuf
 * describe:跳转修改
 * param:null
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择修改的行");
		return;
	}
	var rowUpdateData=$("#list2").jqGrid('getRowData',ids);
	var status=rowUpdateData.status;
	if(status!="草稿"){
		window.open("Out_viewPage.html?&businessId="+ids);
	}else{
		window.open("Out_edit.html?type=edit&id="+ids);
	}
}
/**
 * author:liuf
 * describe:跳转新增
 * param:null
 */
function toadd(){
	window.open("Out_edit.html?type=add");
}

function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 
	 rowData={id:id};
	 $('#list2').jqGrid().trigger("reloadGrid");
}

function startFlow(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id){
		var row = $('#list2').jqGrid('getRowData',id);
		if(row.status=='草稿'){
			window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode="+row.code+"&businessId="+row.id+"&time="+Math.random());
		}else{
			pop_tip_open("blue","请选择草稿状态发起审批！");
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}
function flowCallBack(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}
function trackFlow(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id){
		var row = $('#list2').jqGrid('getRowData',id);
		var  instanceId=row.instanceId;
		if(row.status=='草稿'){
			pop_tip_open("blue","未发起流程");
			return;
		}else if(!instanceId){
			pop_tip_open("blue","审结完成的没有流程");
			return;
		}else{
		/*	window.open("/platform-app/flow/runtime/approve/view.html?instanceId="+row.instanceId+"&requestSource=start&businessObjectCode="+row.code+"&businessId="+row.id+"&time="+Math.random());*/
			window.open("/platform-app/flow/runtime/approve/flow.html?businessId="+row.id+"&appId=OA");
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

function startOver(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id){
		var row = $('#list2').jqGrid('getRowData',id);
		if(row.status!='草稿'){
			pop_tip_open("blue","只允许草稿的数据审结");
			return;
		}else{
			var officeOut={
					businessId:id,
					beforeStatus:row.status,
					status:"2"
			}
			  $.ajax({
				  type: "post",
				  contentType: "application/json",
				  url: serviceUrl+"oa/officeOut/updateCountOver",
				  data:JSON.stringify(officeOut),
				  dataType:"JSON",
				  success: function (result) {
					  if(result && result.success) {
						  pop_tip_open("blue","审结完成！");
							rowData={id:id};
							$('#list2').jqGrid().trigger("reloadGrid");
					  }else {
						  $.xljUtils.tip('red', result.msg);
					  }
				  }
			  });
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=YPLY',
		dataType: 'json',
		//contentType: 'application/json',
		async: false,
		//data: JSON.stringify(postdata),
		success: function (data) {
			if (data.success) {
				menuList =  data.result;

			} else {
				$.xljUtils.tip('red', '获取按钮权限失败！');
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			$.xljUtils.tip('red', '获取按钮权限失败！');
		}
	});
	return menuList;
}