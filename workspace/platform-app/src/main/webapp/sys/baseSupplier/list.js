$(function(){
    //页面加载完成之后执行
    pageInit();
});  

function pageInit(){
	getSupplierData();

    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
   // jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
/*	    jQuery("#list3").jqGrid({
   		 	url: '/platform-app/sys/base/baseSupplierAccont/getAccontBySupplierId',
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            datatype : "json", 
            autowidth:true,
            rownumbers:true,
            postData:{id:""},
            jsonReader : {
                root:"result"
            },
            colModel : [ 
                {name : 'id',label : '序号',hidden:true,align : "center"},
                {name : 'bankName',label : '开户银行',align : "center"},
                {name : 'bankCode',label : '银行账号',align : "center"},
                {name : 'proviceName',label : '银行所在省',align : "center"},
                {name : 'cityName',label : '银行所在市',align : "center"},
                {name : 'address',label : '银行地址',align : "center"},
                {name : 'isDefault',label : '是否默认',align : "center",formatter:function(isDefault){
                	if(isDefault=="0"){
                		return "否";
                	}else if(isDefault=="1"){
                		return "是";
                	}else{
                		return "";
                	}
                }},
                {name : 'remark',label : '备注',align : "center"}
            ],
            pager : '#pager3',
            viewrecords : true
   	});
	    */
		$.ajax({
	        type:'post',
	        url:'/platform-app/sys/org/orgnazation/queryListCompany',
	        dataType:'json',
	        contentType:'application/json',
	        data:"{}",
	        success: function(data) {
	        	if(data.success){
	        		 if(data.result){	
	        			 var company=data.result;
	        			 for(var o in company){
	        				 $("#selectCompany").append("<option value='"+company[o].value+"'>"+company[o].label+"</option>")
	        			 }
	        		 }
	        	}else{
	        		return data.msg
	        	}
	     }
		}) 
	    
		  $.ajax({
	          type:'POST',
	          url:'/platform-app/sys/base/baseRegion/getBaseRegionData',
	          dataType:'json',
	          contentType:'application/json',
	          async:false,
	          data:"{}",
	          success: function(json) {
	        	  if(json.success){
	        		  data=json.result;
	        		  //window.data({"region",data});
	        		  var bodyData = {};
	        		  for (var o in data){
	        			  if(data[o].parentId){
	        				  continue;
	        			  }else{
	        				  $("#selectProvice").append("<option value='"+data[o].id+"'>"+data[o].label+"</option>")  
	        			  }
	        		
	        		  }
	        	  }
	          }
	      });  
	    
}


function searchDate(){
	var name=$("#Corname").val();
	var companyname=$("#selectCompany option:selected").val();
	var provicename=$("#selectProvice option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,companyname:companyname,provicename:provicename}}).trigger("reloadGrid");
 	getSupplierData();
}
function getSupplierData(){
    jQuery("#list2").jqGrid(
            {
                url: '/platform-app/sys/base/baseSupplier/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                height:"auto",
                postData:{name:"",companyname:"",provicename:""},
                multiboxonly:true,
                multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                    root:"result.list"
                },
               // colNames : [ 'id', '供方名称', '供方编码', '状态', '法人',"所在省","所在市","联系人","联系方式" ],//jqGrid的列显示名字
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '供方名称',align : "center"},
                    {name : 'code',label : '供方编码',align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    }},
                    {name : 'companyName',label : '所属公司',align : "center"},
                    {name : 'representative',label : '法人',align : "center"},
                    {name : 'provinceName',label : '所在省',align : "center"},
                    {name : 'cityName',label : '所在市',align : "center"},
                    {name : 'relationPerson',label : '联系人',align : "center"},
                    {name : 'phone',label : '联系电话',align : "center"}
                ],
                rowNum : 10,//一页显示多少条
                rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
    /*            onSelectRow:function(rowid){
                	jQuery("#list3").jqGrid("setGridParam",{postData:{id:rowid}}).trigger("reloadGrid");
                },
    */            ondblClickRow:function(rowid){
                	window.open("detail.html?id="+rowid);
                },
                //sortname : 'id',//初始化的时候排序的字段
               // sortorder : "desc",//排序方式,可选desc,asc
           //     mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                viewrecords : true
            });
}
function deleteSupplier(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		toastr.warning("请选择要删除的行！");
		return;
	}
		ids = ids.join(",");
		if(ids&&ids!='') {
		if(confirm("确认删除数据吗？")){
			$.ajax({
				url:"/platform-app/sys/base/baseSupplier/deleteBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						//toastr.success("数据删除成功！");
						$('#list2').jqGrid().trigger("reloadGrid");
						$('#list3').clearGridData();
					}else{
						toastr.error("删除数据失败！");
					}
				}
			});
		}
	}
}

function  updateStatus(e){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		toastr.warning("请选择要修改状态的行！");
		return;
	}
	if(ids.length>1){
		toastr.warning("请选择一行！");
		return;
	}
	var rowData = $("#list2").jqGrid("getRowData",ids);
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
		url:"/platform-app/sys/base/baseSupplier/updateStatus/"+ids,
		type:'PUT',
		dataType:'JSON',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				toastr.success("修改状态成功！");
				$('#list2').jqGrid().trigger("reloadGrid");
			}else{
				toastr.error("修改状态失败！");
			}
		}
	});
	}
}
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		toastr.warning("请选择要修改的行！");
		return;
	}
	if(ids.length>1){
		toastr.warning("请选择一行！");
		return;
	}
	window.open("update.html?id="+ids);
}
function toadd(){
	window.open("add.html");
}