$(function(){
    //页面加载完成之后执行
    pageInit();
    
  //查询按钮事件  
    $("#searchBtn").off().on("click",function(){
    	var customArchivesDto={};
    	customArchivesDto.code=null;
    	customArchivesDto.name=null;
//    	customArchivesDto.showType=null;
    	if($("#serarchCode").val()){
    		customArchivesDto.code=$("#serarchCode").val();	
    	}
    	if($("#serarchName").val()){
    		customArchivesDto.name=$("#serarchName").val();
    	}
//    	if($("#serarchType").val()){
//    		customArchivesDto.showType=$("#serarchType").val();
//    	}
    	console.log(customArchivesDto);
    	$("#list2").jqGrid('setGridParam',{postData:customArchivesDto}).trigger('reloadGrid'); 
});  
});  

/**
 * 查询方法
 */
function search11(){
	var customArchivesDto={};
	customArchivesDto.code=null;
	customArchivesDto.name=null;
//	customArchivesDto.showType=null;
	if($("#serarchCode").val()){
		customArchivesDto.code=$("#serarchCode").val();	
	}
	if($("#serarchName").val()){
		customArchivesDto.name=$("#serarchName").val();
	}
//	if($("#serarchType").val()){
//		customArchivesDto.showType=$("#serarchType").val();
//	}
	$("#list2").jqGrid('setGridParam',{postData:customArchivesDto}).trigger('reloadGrid'); 
}

/**
 * 初始化表格
 */
function pageInit(){
    jQuery("#list2").jqGrid(
    {
        url: mainUrl+'/sys/base/customArchives/queryList',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",  
//            postData:JSON.stringify(customArchivesDto),
        contentType : "application/json",  
        datatype : "json", 
        height:220,
        multiboxonly:true,
        multiselect:true,
        autowidth:true,
        rownumbers:true,
        jsonReader : {
            root:"result"
        },
        colModel : [
            {name : 'id',label : 'id',hidden:true,align : "center"},
            {
            	label: '类型编码',
                name: 'code',
                width: 75,
                editable: true
            },
            {
            	label: '类型名称',
                name: 'name',
                width: 75,
                editable: true
            },
            {
				label : '类型',
                name: 'showType',
                width: 140,
                editable: true, // must set editable to true if you want to make the field editable
                edittype: "select",
                editoptions: { value: "列表:列表;树型:树型" }
//                	,
//                    formatter: function(cellValue, options, rowObject) {  
//                    	console.log(typeof(cellValue));
//                    	console.log(cellValue);
//                        return cellValue == '2' ? "树型" : "列表";  
//                    }
            },
            {
				label: '是否预置',
                name: 'isDefault',
                width: 100,
                editable: false, // must set editable to true if you want to make the field editable
                edittype: "select",
                editoptions: {value: "是:是;否:否"}
//                ,
//                    formatter: function(cellValue, options, rowObject) {  
//                        return cellValue == 1 ? "是" : "否";  
//                    }  
            },
            {
            	label:'操作',
            	name:'sort',   
            	width: 80,    
            	editable: false,
            	align:"center",
            	formatter: operateFormatter
            }
        ]
    });
}

/**
 * 刷新表格
 */
function reloadList(){
	$('#list2').jqGrid().trigger("reloadGrid");
}

//跳转编辑子项页面(按钮)
function toEditChild(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	var rowData = $("#list2").jqGrid('getRowData',id);
	if(rowData.showType=='列表'){
		window.open("itemList.html?id="+id);
	}else if(rowData.showType=='树型'){
		window.open("itemTree.html?id="+id);
	}
}

//跳转编辑子项页面（表格）
function toEditChild2(id,showType){
	if(showType=='列表'){
		window.open("itemList.html?id="+id);
	}else if(showType=='树型'){
		window.open("itemTree.html?id="+id);
	}
}

/**
 * 新增
 */
function toAdd(){
	var dataRow = {    
        id: "",  
        code:"",  
        name:"",  
        showType:'',  
        isDefault:'' 
    }; 
	$.ajax({
        type:'get',
        url:mainUrl+'/sys/uuid/generator/getGuuid',
        success: function(data) {
	        var guuid=data.result;
	        dataRow.id=guuid;
	        //将新添加的行插入到第一列  
	        $("#list2").jqGrid("addRowData", guuid, dataRow);
	        $("#list2").setColProp("showType",{editable:true});  
	        $("#list2").jqGrid('editRow',guuid,true);
	        $("#listButton").hide();
	        $("#addButton").show();
	        $("#editButton").hide();
	    }
	});
}

/**
 * 保存
 */
function toSave(){
	var custArchivesDto={};
	var ids = $("#list2").jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
    	$("#list2").jqGrid('saveRow', ids[i]);
    }
	var obj = jQuery("#list2").jqGrid().getRowData();//读取表格所有数据
	var errorMsg="";
	var data=[];
	jQuery(obj).each(function(index){
		var jsonData = {};
		jsonData.delflag=0;
		jsonData.id=this.id;
		jsonData.code=this.code;
		jsonData.name=this.name;
		jsonData.showType=this.showType;
		jsonData.isDefault=this.isDefault;
		
		if(jsonData.name=="" || jsonData.name==null){
			errorMsg+="第"+(index+1)+"行：名称不能为空！";
			errorMsg+="\n";
		}
		if(jsonData.code=="" || jsonData.code==null){
			errorMsg+="第"+(index+1)+"行：编码不能为空！";
			errorMsg+="\n";
		}
		data.push(jsonData);
    });
	
	if(errorMsg){
		alert(errorMsg);
		$("#listButton").show();
        $("#addButton").hide();
        $("#editButton").hide();
		return;
	}
	
	custArchivesDto.customArchivesList=data;
	custArchivesDto.delflag=0;
	$.ajax({
	   url: mainUrl+"/sys/base/customArchives/saveList",
       data:JSON.stringify(custArchivesDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   alert('数据保存成功！');
                   $('#list2').jqGrid().trigger("reloadGrid");
               }else {
                   alert('数据保存失败！');
               }
               $("#listButton").show();
               $("#addButton").hide();
               $("#editButton").hide();
           }
       }
   });
}

/**
 * 修改
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids!=null && ids.length>0){
		for(var i=0;i<ids.length;i++){
			$("#list2").setColProp("showType",{editable:false});  
			$("#list2").jqGrid('editRow',ids[i],true);
		}
		$("#listButton").hide();
        $("#addButton").hide();
        $("#editButton").show();
	}
}

/**
 * 删除
 */
function toDelete(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		alert("请选择要删除的行！");
		return;
	}
	for(var i=0;i<ids.length;i++){
		var rowData = $('#list2').jqGrid('getRowData',ids[i]);
		if(rowData.isDefault=='是'){
			alert("不能删除预置数据！");
			return;
		}
	}
	var idsArray=new Array();
	for(var i=0;i<ids.length;i++){
		idsArray[i]=ids[i];
	}
	
	ids = ids.join(",");
	if(ids&&ids!='') {
		if(confirm("确认删除数据吗？")){
			$.ajax({
				url:mainUrl+"/sys/base/customArchives/deleteBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						if(ids!=null){
							for(var s=0;s<idsArray.length;s++){
								$("#list2").jqGrid('delRowData',idsArray[s],true);
							}
						}
					}else{
						toastr.error("删除数据失败！");
					}
				}
			});
		}
	}
}

/**
 * 取消
 */
function cancel(){
	$('#list2').jqGrid().trigger("reloadGrid");
	$("#listButton").show();
    $("#addButton").hide();
    $("#editButton").hide();
}

/**
 * 构造编辑按钮
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function operateFormatter(cellvalue, options, rowObject){
	return "<a style=\"color: blue;\" onclick=\"toEditChild2('"+rowObject.id+"','"+rowObject.showType+"')\" href=\"###\" >编辑内容</a>";
}