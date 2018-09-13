/**
 * author:zhangfangzhi
 * date:20170322
 */
//主表mainId
var mainId=null;
var iTemdataList = [];
$(function () {
	//参数过滤
	var id = $.xljUtils.getUrlParam('id'); 
    mainId=id;
    if(id){
    	//查询档案名称
    	$.ajax({
    		type:'get',
    		url:hostUrl+'/sys/base/customArchives/get/'+id+'?time='+Math.random(),
    		success: function(data) {
    			var customArchivesDto=data.result;
    			$("#itemTitle").html(customArchivesDto.name);
    		}
    	});
    	  
    	//查询当前档案下有无子项（1：正常显示 0：添加一空行）
    	$.ajax({
	        type:'post',
	        url:hostUrl+'/sys/base/customArchivesItem/queryList',
	        data:JSON.stringify({
	        	"mainId":mainId
	        }),
	        contentType:'application/json',
	        dataType:'JSON',
	        success: function(data) {
	        	var resultData=data.result;
	        	if(resultData.length>0){
        			var countLength=1;
        			for(var o in resultData){
        				addCountOld();//回写行数据 
        				var record=$("#countForm").find("tr").eq(countLength);
        				record.find("input[name='name']").val(resultData[o].name);
        				record.find("input[name='code']").val(resultData[o].code);
        				record.find("input[name='id']").val(resultData[o].id);
        				record.find("input[name='mainId']").val(resultData[o].mainId);
        				record.find("select[name='status']").val(resultData[o].status);
        				record.find("input[name='description']").val(resultData[o].description);
        				countLength++;
        			}
        		}else{
        			add();
        		}
	        }
  	  	});
     }
    
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
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
 * 构建原数据HTML
 */
function addCountOld(){
	var row=$('<tr>'
	         +'<td><input type="checkbox" name="check" ></td>'
	         +'<td></td>'
	         +'<td><input type="text" name="code" data-html="true" class="form-control"><input type="hidden" name="id" value=""><input type="hidden" name="mainId" value=""></td>'
	         +'<td><input type="text" name="name" data-html="true" class="form-control"></td>'
	         +'<td>'
	         +'<select name="status" class="mar_b_20 form-control select2">'
	         +'<option value="1">是</option>'
	         +'<option value="0">否</option>'
	         +'</select>'
	         +'</td>'
	         +'<td>'
	         +'<input type="text" name="description" data-html="true" class="form-control" >'
	         +'</td>'
	         +'</tr>');
		     $("#countForm").append(row);
			 resetNum();
}

/**
 * 添加新行HTML
 */
function add(){
	$.ajax({
        type:'get',
        url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
        success: function(data) {
        	var guuid=data.result;
        	var row=$('<tr>'
		         +'<td><input type="checkbox" name="check" ></td>'
		         +'<td></td>'
		         +'<td><input type="text" name="code" data-html="true" class="form-control"><input type="hidden" name="id" value="'+guuid+'"><input type="hidden" name="mainId" value="'+mainId+'"></td>'
		         +'<td><input type="text" name="name" data-html="true" class="form-control"></td>'
		         +'<td>'
		         +'<select name="status" class="mar_b_20 form-control select2">'
		         +'<option value="1">是</option>'
		         +'<option value="0">否</option>'
		         +'</select>'
		         +'</td>'
		         +'<td>'
		         +'<input type="text" name="description" data-html="true" class="form-control" >'
		         +'</td>'
		         +'</tr>');
			     $("#countForm").append(row);
				 resetNum();
        }
	});
}

/**
 * 重置行号
 */
function  resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}

/**
 * 返选操作
 */
$("#checkAll").click(function() {
	if($(this).prop("checked")){
		$("input[name='check']").each(function() {
			$(this).prop("checked", "true");
		});
	}else{
		$("input[name='check']").each(function() {
			$(this).removeAttr("checked");
		});
	}
	
}) 

/**
 * 删除
 */
function del(){
	var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
	if(checkedTrObjs.length>0){
		for(var k=0;k<checkedTrObjs.length;k++){
			var delDatas =	$(checkedTrObjs[k]).find(":input").serializeArray();
			var jsonData = {};
			for(var i in delDatas){
				jsonData[delDatas[i].name]=delDatas[i].value;
			}
			jsonData.delflag=1;
			delete jsonData.check;
			iTemdataList.push(jsonData);
		}
		checkedTrObjs.remove();
		resetNum();
	}else{
		pop_tip_open("blue","请选择一行！");
	}
	
}

/**
 * 保存
 */
function save(){
	var custArchivesItemsDto={};
	var errorMsg="";
	var errorLengthMsg="";
	var indexStr="";
	var indexLengthStr="";
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			var flag=false;
			var lengthFlag=false;
			var index=i;
			var jsonDataArr =$(this).find(":input").serializeArray();
			var jsonData = {};
			jsonData.delflag=0;
			for(var i in jsonDataArr){
				jsonData[jsonDataArr[i].name]=$.trim(jsonDataArr[i].value);
			}
			if(indexStr!=""){
				indexStr+=",";
			}
			if(indexLengthStr!=""){
				indexLengthStr+=",";
			}
			if(jsonData.name=="" || jsonData.name==null){
				flag=true;
			}
			if(jsonData.name && jsonData.name.length>100){
				lengthFlag=true;
			}
			if(jsonData.code=="" || jsonData.code==null){
				flag=true;
			}
			if(jsonData.code && jsonData.code.length>100){
				lengthFlag=true;
			}
			if(jsonData.description && jsonData.description.length>1000){
				lengthFlag=true;
			}
			if(flag){
				indexStr+=index;
			}
			if(lengthFlag){
				indexLengthStr+=index;
			}
			iTemdataList.push(jsonData);
		}
	});
	errorMsg="第"+indexLengthStr+"行,";
	errorMsg+="\n";
	errorMsg+="名称、编码或描述超长！"
	if(indexLengthStr){
		iTemdataList = [];
		pop_tip_open("blue",errorMsg);
		return;
	}
	
	errorMsg="第"+indexStr+"行,";
	errorMsg+="\n";
	errorMsg+="编号或名称不能为空！"
	if(indexStr){
		iTemdataList = [];
		pop_tip_open("blue",errorMsg);
		return;
	}
	custArchivesItemsDto.customItemList=iTemdataList;
	custArchivesItemsDto.delflag=0;
	iTemdataList = [];
	$.ajax({
	   url: hostUrl+"/sys/base/customArchivesItem/saveList",
       data:JSON.stringify(custArchivesItemsDto),
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
                       window.close();
            	   }else{
            		   pop_tip_open("blue","名称或编码重复,请重新输入！");
            	   }
               }else {
                   pop_tip_open("red","数据保存失败！");
               }
           }
       }
   });
}
