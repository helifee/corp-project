$(function () {
	  $.getUrlParam = function(name){
          var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
          var r = window.location.search.substr(1).match(reg);
          if (r!=null ){
              return unescape(r[2]);
          }
          return null;     
      };
		var code=$.getUrlParam('code')=="undefined"?"":$.getUrlParam('code'); 
		var name=decodeURI($.getUrlParam('name'))=="undefined"?"":decodeURI($.getUrlParam('name')); 
		var parentsCode=decodeURI($.getUrlParam('parentsCode'))=="undefined"?"":decodeURI($.getUrlParam('parentsCode')); 
		var parentId=$.getUrlParam('parentId')=="undefined"?"":$.getUrlParam('parentId'); 
	
		var id=$.getUrlParam('id'); 
		$("#parentName").val(name);
		$("#parentCode").val(code);
		$("#parentIdLabel").html(parentsCode);
		$("#parentId").val(parentId);
		$.ajax({
	        type:'get',
	        url:'/platform-app/sys/base/baseProjectType/get/'+id,
	        success: function(data) {
	        	var baseProjectType=data.result;
	        		$("input[name='parentId']").val(baseProjectType.parentId);
	        		$("input[name='id']").val(baseProjectType.id);
	        		$("input[name='sort']").val(baseProjectType.sort);
	        		$("input[name='name']").val(baseProjectType.name);
	        		$("input[name='code']").val(baseProjectType.code);
	        		$("input[name='status']").val(baseProjectType.status).attr("checked",true);
	        		$("textarea[name='remark']").val(baseProjectType.remark);
	        		$("input[name='createPersonId']").val(baseProjectType.createPersonId);
	        		$("input[name='createPersonName']").val(baseProjectType.createPersonName);
	        		$("input[name='createDate']").val(baseProjectType.createDate);
	        		$("input[name='updatePersonId']").val(baseProjectType.updatePersonId);
	        		$("input[name='updatePersonName']").val(baseProjectType.updatePersonName);
	        		$("input[name='updateDate']").val(baseProjectType.updateDate);
	        		$("input[name='disabledId']").val(baseProjectType.disabledId);
	        		$("input[name='disabledDate']").val(baseProjectType.disabledDate);
	        	}
		});

    });

function saveForm(){
	var ids=$("input[name='id']").val();
	var baseProjectType= $("#baseProjectType").serializeArray();
	var baseProjectTypeDto={};
		for(var i in baseProjectType){
			if(baseProjectType[i].name=="disabledDate"||"createDate"==baseProjectType[i].name||"updateDate"==baseProjectType[i].name){
				baseProjectTypeDto[baseProjectType[i].name]=new Date().getTime();;
			}else{
				baseProjectTypeDto[baseProjectType[i].name]=baseProjectType[i].value;
			}
		}
		baseProjectTypeDto.delflag=0;
   $.ajax({
       url:"/platform-app/sys/base/baseProjectType/update/"+ids,
       data:JSON.stringify(baseProjectTypeDto),
       type:'put',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData) {
           if(resultData) {
               toastr.success('数据保存成功！');
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   toastr.success('数据保存成功！');
            	   window.opener.location.href = window.opener.location.href;
                	   window.close();
               }else {
                   toastr.success('数据保存失败！');
               }
           }
       }
   });
	
}


function Tolist(){
	   window.opener.location.href = window.opener.location.href;
	   window.close();
}
