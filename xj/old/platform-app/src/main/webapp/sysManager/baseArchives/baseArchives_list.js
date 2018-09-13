/**
 * author:zhangfangzhi
 * date:20170322
 */
var saveOrUpdate="";
var rowData;
var rowDataBefore;
var newAddIdsStr="";
var editId="";
$(function(){
    //页面加载完成之后执行
    pageInit();
    
    //隐藏添加修改状态按钮组
    $("#addButton").hide();
    $("#editButton").hide();
    
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    
    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){ 
    	if(event.keyCode==13){
    		$("#searchKey").click(); 
    	} 
    }); 
    
    //所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
	            case 403:
	                pop_tip_open("red","系统拒绝。");
	                break;
	            case 404:
	                pop_tip_open("red","您访问的资源不存在。");
	                break;
	            case 500:
	                pop_tip_open("red","服务器异常。");
	                break;
	        }
        }
    );
});  

/**
 * 查询
 */
function search(){
	var customArchivesDto={};
	customArchivesDto.name=null;
	if($("#serarchName").val()){
		customArchivesDto.name=$("#serarchName").getInputVal()
	}
	$("#list2").jqGrid('setGridParam',{postData:customArchivesDto}).trigger('reloadGrid'); 
}

/**
 * 初始化表格
 */
function pageInit(){
    jQuery("#list2").jqGrid(
    {
        url: hostUrl+'/sys/base/customArchives/queryList',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",  
        contentType : "application/json",  
        datatype : "json", 
//        multiboxonly:true,
//        multiselect:true,
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
                editable: true,
                cellattr: addCellAttr
            },
            {
				label : '类型',
                name: 'showType',
                width: 140,
                editable: true,
                edittype: "select",
                editoptions: { value: "列表:列表;树型:树型" }
            },
            {
				label: '是否预置',
                name: 'isDefault',
                width: 100,
                editable: false,
                edittype: "select",
                editoptions: {value: "是:是;否:否"}
            },
            {
				label: '状态',
                name: 'status',
                width: 100,
                formatter:function(status){
                 	if(status=="0"){
                 		return "禁用";
                 	}else if(status=="1"){
                 		return "启用";
                 	}else{
                 		return "";
                 	}
                 },
                 cellattr: addCellAttr
            },
            {
            	label:'操作',
            	name:'sort',   
            	width: 80,    
            	editable: false,
            	align:"center",
            	formatter: operateFormatter
            }
        ],
        ondblClickRow:function(rowid){
//        	toupdate();
        },
        onCellSelect: function(){
        	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
        		$('#list2 '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        onSelectRow: function () {
        	var rowId=$('#list2').jqGrid("getGridParam","selrow");
		      rowData = $('#list2').jqGrid('getRowData',rowId);
        },
        gridComplete: function () {
        	$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
        	rowDataBefore = rowData;
            if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	$('#list2').setSelection(rowDataBefore.id,true);
            	$('#list2 '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
            }
        },
        loadError: function(xhr, status, error){
        },
        rowNum : -1
    });
}

/**
 * 改变行字段颜色
 */
function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.status=="0"){
        return "style='color:red'";
    }
}

/**
 * 刷新表格
 */
function reloadList(){
	$('#list2').jqGrid().trigger("reloadGrid");
}

/**
 * 跳转编辑子项页面(按钮)
 */
function toEditChild(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id){
		var rowData = $("#list2").jqGrid('getRowData',id);
		if(rowData.showType=='列表'){
			window.open("baseArchives_column_edit.html?id="+id);
		}else if(rowData.showType=='树型'){
			window.open("baseArchives_tree_list.html?id="+id);
		}
	}else{
		pop_tip_open("blue","请选择一行！");
	}
	
}

/**
 * 跳转编辑子项页面
 * @param id
 * @param showType
 */
function toEditChildByColumn(id,showType){
	if(showType=='列表'){
		window.open("baseArchives_column_edit.html?id="+id);
	}else if(showType=='树型'){
		window.open("baseArchives_tree_list.html?id="+id);
	}
}

/**
 * 新增(行内)
 */
function toAdd(){
	saveOrUpdate="add";
	var dataRow = {    
        id: "",  
        code:"",  
        name:"",  
        showType:'',  
        isDefault:'' 
    }; 
	$.ajax({
        type:'get',
        url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
        success: function(data) {
	        var guuid=data.result;
	        dataRow.id=guuid;
	        if(newAddIdsStr!=""){
	        	newAddIdsStr+=",";
	        }
	        newAddIdsStr+=guuid;
	        //将新添加的行插入到第一列  
	        $("#list2").jqGrid("addRowData", guuid, dataRow);
	        $("#list2").setColProp("showType",{editable:true});  
	        $("#list2").setColProp("code",{editable:true});
	        $("#list2").jqGrid('editRow',guuid,true);
	        $("#listButton").hide();
	        $("#addButton").show();
	        $("#editButton").hide();
	        $.xljUtils.resizeNestedGrid();
	        $.xljUtils.gridResizeFn();
	    }
	});
}

/**
 * 保存数据
 */
function toSave(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	var custArchivesDto={};
	custArchivesDto.id=id;
	var ids = $("#list2").jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
    	var nameValue=$("#list2").jqGrid("getCell",ids[i],"name");
    	var codeValue=$("#list2").jqGrid("getCell",ids[i],"code");
    	if($(nameValue) && $(nameValue).attr("id")){
    		$("#list2").find("#"+$(nameValue).attr("id")).attr("data-html",true);
    	}
    	if($(codeValue) && $(codeValue).attr("id")){
    		$("#list2").find("#"+$(codeValue).attr("id")).attr("data-html",true);
    	}
    	$("#list2").jqGrid('saveRow', ids[i]);
    }
	var obj = jQuery("#list2").jqGrid().getRowData();//读取表格所有数据
	var lastRowId;
	if(obj && obj.length>0){
		lastRowId=obj[obj.length-1].id;
	}
	var errorMsg="";
	var errorIds=new Array();
	var errorLengthIds=new Array();
	var errorSpecialIds=new Array();
	var data=[];
	var indexStr="";
	var indexLengthStr="";
	var indexSpecialStr="";

	jQuery(obj).each(function(index){
		if(saveOrUpdate=="edit" && id!=this.id){
			return true;
		}
		if(saveOrUpdate=="add" && index+1!=obj.length){
			return true;
		}
		var flag=false;
		var lengthFlag=false;
		var specialFlag=false;

		var jsonData = {};
		jsonData.delflag=0;
		jsonData.id=this.id;
		jsonData.code=$.xljUtils.htmlEncode($.trim(this.code));

		jsonData.name=$.xljUtils.htmlEncode($.trim(this.name));


		jsonData.showType=this.showType;
		jsonData.isDefault=this.isDefault;

		var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
			regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

		if(indexLengthStr!=""){
			indexLengthStr+=",";
		}
		if(indexStr!=""){
			indexStr+=",";
		}
		if(indexSpecialStr!=""){
			indexSpecialStr+=",";
		}

		if(jsonData.name=="" || jsonData.name==null){
			flag=true;
			errorIds.push(jsonData.id);
		}
		if(jsonData.name && jsonData.name.length>100){
			lengthFlag=true;
			errorLengthIds.push(jsonData.id);
		}


		if(regEn.test(jsonData.name) || regCn.test(jsonData.name)) {
			specialFlag=true;
			errorSpecialIds.push(jsonData.id);

		}

		if(jsonData.code=="" || jsonData.code==null){
			flag=true;
			errorIds.push(jsonData.id);
		}
		if(jsonData.code && jsonData.code.length>100){
			lengthFlag=true;
			errorLengthIds.push(jsonData.id);
		}

		if(regEn.test(jsonData.code) || regCn.test(jsonData.code)) {

			specialFlag=true;
			errorSpecialIds.push(jsonData.id);

		}

		if(flag){
			indexStr+=(index+1);
		}
		if(lengthFlag){
			indexLengthStr+=(index+1);
		}
		if(specialFlag){

			indexSpecialStr+=(index+1);
		}

		data.push(jsonData);
    });
	errorMsg="第"+indexLengthStr+"行,";
	errorMsg+="\n";
	errorMsg+="名称或编码超长！"
		
	if(indexLengthStr){
		pop_tip_open("blue",errorMsg);
		for(var s=0;s<errorLengthIds.length;s++){
			if(newAddIdsStr.indexOf(errorLengthIds[s])!=-1){
				$("#list2").jqGrid('editRow',errorLengthIds[s],true);
			}
		}
		return;
	}
		
	errorMsg="第"+indexStr+"行,";
	errorMsg+="\n";
	errorMsg+="名称或编码不能为空！"
		
	if(indexStr){
		pop_tip_open("blue",errorMsg);
		for(var s=0;s<errorIds.length;s++){
			if(newAddIdsStr.indexOf(errorIds[s])!=-1){
				$("#list2").jqGrid('editRow',errorIds[s],true);
			}
		}
		return;
	}

	errorMsg="第"+indexSpecialStr+"行,";
	errorMsg+="\n";
	errorMsg+="名称或编码不能包含特殊字符！"

	if(indexSpecialStr){
		pop_tip_open("blue",errorMsg);
		for(var s=0;s<errorSpecialIds.length;s++){
			if(newAddIdsStr.indexOf(errorSpecialIds[s])!=-1){
				$("#list2").jqGrid('editRow',errorSpecialIds[s],true);
			}
		}
		return;
	}


	
	if(saveOrUpdate==""){
		return;
	}else{
		custArchivesDto.saveOrUpdate=saveOrUpdate;
	}
	
	custArchivesDto.customArchivesList=data;
	custArchivesDto.delflag=0;
	$.ajax({
	   url: hostUrl+"/sys/base/customArchives/saveList",
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
            	   if("true"==result){
            		   pop_tip_open("green","数据保存成功！");
                       $('#list2').jqGrid().trigger("reloadGrid");
                       $("#listButton").show();
                       $("#addButton").hide();
                       $("#editButton").hide();
                       if(saveOrUpdate=="add"){
                    	   $('#list2').setSelection(lastRowId,true);
	               	   }
            	   }else{
            		   pop_tip_open("blue","编码重复,请重新输入！");
            		   changeToEdit();
            		   return;
            	   }
               }else {
                   pop_tip_open("red","数据保存失败！");
                   $("#listButton").show();
                   $("#addButton").hide();
                   $("#editButton").hide();
               }
           }
       }
   });
}

/**
 * 编码重复恢复编辑状态
 */
function changeToEdit(){
	if(newAddIdsStr!=null && newAddIdsStr!=""){
		var ids=newAddIdsStr.split(",");
		for(var i=0;i<ids.length;i++){
			$("#list2").jqGrid('editRow',ids[i],true);
		}
	}
}

/**
 * 修改
 */
function toupdate(){
	saveOrUpdate="edit";
	editId=$('#list2').jqGrid('getGridParam','selrow');
	if(editId){
		//添加判断如果档案子项不存在展现形式可更改
		$.ajax({
	        type:'get',
	        url:hostUrl+'/sys/base/customArchives/queryIsHaveChild/'+editId+'?time='+Math.random(),
	        success: function(resultData) {
	        	if(resultData) {
	                var successFlag = resultData.success;
	                var result = resultData.result;
	                if(successFlag) {
	                	$("#list2").setColProp("code",{editable:false});
	                	if(result=="0"){
	                		$("#list2").setColProp("showType",{editable:true});  
	                	}else{
	                		$("#list2").setColProp("showType",{editable:false});  
	                	}
	                	$("#list2").jqGrid('editRow',editId,true);
	                }
	        	}
	        }
		});
		$("#listButton").hide();
        $("#addButton").hide();
        $("#editButton").show();
	}else{
		pop_tip_open("blue","请选择一行！");
	}
}

/**
 * 删除
 */
function toDelete(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	var prevId =$("#list2 #" + id).prev()[0].id;
	if(!id) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var rowData = $('#list2').jqGrid('getRowData',id);
	if(rowData.isDefault=='是'){
		pop_tip_open("blue","不能删除预置数据！");
		return;
	}
	
	if(id) {
		pop_text_open("blue","确认删除数据吗？",function(){
			$.ajax({
				url:hostUrl+"/sys/base/customArchives/deletePseudo/"+id,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData) {
					if (resultData&&resultData.success) {
//						$('#list2').jqGrid().trigger("reloadGrid");
						$("#list2").jqGrid("delRowData", id);
						$('#list2').setSelection(prevId,true);
//		            	$('#list2 '+'#'+prevId).find("td").addClass("ui-state-highlight"); 
					}else{
						pop_tip_open("red","删除数据失败！");
					}
				}
			});
		},true);
	}
}

/**
 * 启用禁用
 */
function enableOrNot(st){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	
	if(id!=null && id!=""){
		var rowData = $("#list2").jqGrid('getRowData',id);
		var status=rowData.status;
		if(status=="启用"){
			status="1";
		}else{
			status="0";
		}
		if(status!=st){
			$.ajax({
		       url:hostUrl+"/sys/base/customArchives/enableOrNot",
		       data:JSON.stringify({'id':id,'status':st}),
		       type:'POST',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		           if(resultData) {
		               var successFlag = resultData.success;
		               var result = resultData.result;
		               var msg = resultData.msg;
		               if(successFlag) {
		            	   //刷新表格
		            	   jQuery("#list2").trigger("reloadGrid");
		               }else {
		                   pop_tip_open("red","状态更新失败！");
		               }
		           }
		       }
			});
		}
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
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
	return "<a style=\"color: blue;\" onclick=\"toEditChildByColumn('"+rowObject.id+"','"+rowObject.showType+"')\" href=\"###\" >编辑内容</a>";
}