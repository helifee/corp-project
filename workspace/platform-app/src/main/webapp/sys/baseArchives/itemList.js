//主表ID
var mainId=null;
$(function () {
	$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
		var r = window.location.search.substr(1).match(reg);
		if (r!=null ){
			return unescape(r[2]);
		}
		return null;     
	};
	
    var id = $.getUrlParam('id');
    mainId=id;
    if(id){
    	$.ajax({
    		type:'get',
    		url:mainUrl+'/sys/base/customArchives/get/'+id,
    		success: function(data) {
    			var customArchivesDto=data.result;
    			$("#itemTitle").html(customArchivesDto.name);
    		}
    	});
    	  
    	//查询当前档案下有无子项（1：正常显示 0：添加一空行）
    	$.ajax({
	        type:'post',
	        url:mainUrl+'/sys/base/customArchivesItem/queryList',
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
        				addCountOld();
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
});	

/**
 * 构建原数据HTML
 */
function addCountOld(){
	var row=$('<tr>'
	         +'<td><input type="checkbox" name="check" ></td>'
	         +'<td></td>'
	         +'<td><input type="text" name="code"  class="form-control"><input type="hidden" name="id" value=""><input type="hidden" name="mainId" value=""></td>'
	         +'<td><input type="text" name="name"  class="form-control"></td>'
	         +'<td>'
	         +'<select name="status" class="mar_b_20 form-control select2">'
	         +'<option value="1">是</option>'
	         +'<option value="0">否</option>'
	         +'</select>'
	         +'</td>'
	         +'<td>'
	         +'<input type="text" name="description" class="form-control" >'
	         +'</td>'
	         +'</tr>');
		     $("#countForm").append(row);
			 reNum();
}

/**
 * 添加新行HTML
 */
function add(){
	$.ajax({
        type:'get',
        url:'/platform-app/generator/getGuuid',
        success: function(data) {
        	var guuid=data.result;
        	var row=$('<tr>'
		         +'<td><input type="checkbox" name="check" ></td>'
		         +'<td></td>'
		         +'<td><input type="text" name="code"  class="form-control"><input type="hidden" name="id" value="'+guuid+'"><input type="hidden" name="mainId" value="'+mainId+'"></td>'
		         +'<td><input type="text" name="name"  class="form-control"></td>'
		         +'<td>'
		         +'<select name="status" class="mar_b_20 form-control select2">'
		         +'<option value="1">是</option>'
		         +'<option value="0">否</option>'
		         +'</select>'
		         +'</td>'
		         +'<td>'
		         +'<input type="text" name="description" class="form-control" >'
		         +'</td>'
		         +'</tr>');
			     $("#countForm").append(row);
				 reNum();
        }
	});
}

/**
 * 重置行号
 */
function  reNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}

/**
 * 删除
 */
function del(){
	var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
	checkedTrObjs.remove();
	reNum();
}

/**
 * 保存
 */
function save(){
	var custArchivesItemsDto={};
	var data=[];
	var errorMsg="";
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			var index=i;
			var jsonDataArr =$(this).find(":input").serializeArray();
			var jsonData = {};
			jsonData.delflag=0;
			for(var i in jsonDataArr){
				jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
			}
			if(jsonData.name=="" || jsonData.name==null){
				errorMsg+="第"+index+"行：名称不能为空！";
				errorMsg+="\n";
			}
			if(jsonData.code=="" || jsonData.code==null){
				errorMsg+="第"+index+"行：编码不能为空！";
				errorMsg+="\n";
			}
			data.push(jsonData);
		}
	});
	if(errorMsg){
		alert(errorMsg);
		return;
	}
	
	custArchivesItemsDto.customItemList=data;
	custArchivesItemsDto.delflag=0;
	$.ajax({
	   url: mainUrl+"/sys/base/customArchivesItem/saveList",
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
                   alert('数据保存成功！');
                   window.close();
               }else {
                   alert('数据保存失败！');
               }
           }
       }
   });
}
