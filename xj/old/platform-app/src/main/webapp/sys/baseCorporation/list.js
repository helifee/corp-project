$(function(){
    //页面加载完成之后执行
    pageInit();
});  

function pageInit(){
	getCorporationData();
	//getAccontData();
	    
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
				url:"/platform-app/sys/base/baseCorporation/deleteBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						toastr.success("数据删除成功！");
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
function searchDate(){
	var name=$("#Corname").val();
	var companyname=$("#selectCompany option:selected").val();
	var provicename=$("#selectProvice option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,companyname:companyname,provicename:provicename}}).trigger("reloadGrid");
	getCorporationData();
}
function getCorporationData(){
    jQuery("#list2").jqGrid(
            {
                url: '/platform-app/sys/base/baseCorporation/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                height:"auto",
                postData:{name:"",companyname:"",provicename:""},
                multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                    root:"result.list"
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '法人名称',align : "center"},
                    {name : 'code',label : '法人代表',align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    }},
                    {name : 'provinceName',label : '所在省',align : "center"},
                    {name : 'cityName',label : '所在市',align : "center"},
                    {name : 'companyName',label : '所属公司',align : "center"},
                    {name : 'remark',label : '备注',align : "center"}
                ],
                rowNum : 10,//一页显示多少条
                rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	window.open("detail.html?id="+rowid);
                },
                viewrecords : true
            });
}
function getAccontData(){
    jQuery("#list3").jqGrid({
		 url: '/platform-app/sys/base/baseCorporationAccont/getAccontByCorporationId',
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
            {name : 'id',label : 'id',hidden:true,align : "center"},
            {name : 'bankName',label : '开户银行',align : "center"},
            {name : 'bankCode',label : '银行账号',align : "center"},
            {name : 'provinceName',label : '银行所在省',align : "center"},
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
            }
            },
            {name : 'remark',label : '备注',align : "center"}
        ],
        pager : '#pager3',
        viewrecords : true
	});
    
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
			url:"/platform-app/sys/base/baseCorporation/updateStatus/"+ids,
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