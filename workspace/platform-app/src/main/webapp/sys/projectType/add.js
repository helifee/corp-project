$(function () {
	  $.getUrlParam = function(name){
          var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
          var r = window.location.search.substr(1).match(reg);
          if (r!=null ){
              return unescape(r[2]);
          }
          return null;     
      };
		$.ajax({
	        type:'get',
	        url:'/platform-app/generator/getGuuid',
	        success: function(data) {
	         var guuid=data.result;
		    $("#baseProjectType").find("input[name='id']").val(guuid);
	     }
		})
		var code=$.getUrlParam('code')=="undefined"?"":$.getUrlParam('code'); 
		var name=decodeURI($.getUrlParam('name'))=="undefined"?"":decodeURI($.getUrlParam('name')); 
		var parentsCode=decodeURI($.getUrlParam('parentsCode'))=="undefined"?"":decodeURI($.getUrlParam('parentsCode')); 
		var parentId=$.getUrlParam('parentId');
		$("#parentName").val(name);
		$("#parentCode").val(code);
		$("#parentIdLabel").html(parentsCode);
		if(parentId){
			$("#parentId").val(parentId);
		}

    });


function saveForm(op){
	var baseProjectType= $("#baseProjectType").serializeArray();
	var baseProjectTypeDto={};
		for(var i in baseProjectType){
			if(baseProjectType[i].name=="disabledDate"||"createDate"==baseProjectType[i].name||"updateDate"==baseProjectType[i].name){
				baseProjectTypeDto[baseProjectType[i].name]=new Date().getTime();;
			}else{
				if(baseProjectType[i].name=="parentId"&&baseProjectType[i].value=="null"){
					  
				}else{
					baseProjectTypeDto[baseProjectType[i].name]=baseProjectType[i].value;
				}
			}
		}
		baseProjectTypeDto.delflag=0;
   $.ajax({
       url:"/platform-app/sys/base/baseProjectType/save",
       data:JSON.stringify(baseProjectTypeDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               toastr.success('数据保存成功！');
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   if(op=="over"){
                	   window.opener.location.href = window.opener.location.href;
                	 window.close();
                   }else if(op=="continue"){
                	   $("#baseProjectType")[0].reset();
                   }
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
