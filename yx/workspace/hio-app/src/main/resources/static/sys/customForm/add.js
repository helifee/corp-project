var zTreeObj;
$(function () {
	$.ajax({
        type:'get',
        url:serviceUrl+'/sys/uuid/generator/getGuuid',
        success: function(data) {
	        var guuid=data.result;
		    $("#custForm").find("input[name='id']").val(guuid);
	    }
	});
		
	$.getUrlParam = function(name){
          var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
          var r = window.location.search.substr(1).match(reg);
          if (r!=null ){
              return unescape(r[2]);
          }
          return null;     
    };
    
    var id = $.getUrlParam('id'); 
  	$.ajax({
        type:'get',
        url:serviceUrl+'/sys/base/customFormGroup/get/'+id,
        success: function(data) {
        	var customFormGroupDto=data.result;
        	$("#custForm").find("input[name='parentName']").val(customFormGroupDto.name);
        	$("#custForm").find("input[name='parentId']").val(customFormGroupDto.id);
        }
	});
	
  	/**
  	 * 分类替换绑定方法
  	 */
  	$('#replaceGroupModal').on('show.bs.modal', function (e) {
		getOrgGroupTree();
	});
});

/**
 * 保存方法校验
 * @returns {Boolean}
 */
function validateField(){
	var code=$.trim($("#custForm").find("input[name='code']").val());
	if(!code){
		$("#custForm").find("input[name='code']").parent().addClass("has-error has-feedback");
		$("#custForm").find("input[name='code']").attr("data-original-title","请输入编码");
		return false;
	}
	var name=$.trim($("#custForm").find("input[name='name']").val());
	if(!name){
		$("#custForm").find("input[name='name']").parent().addClass("has-error has-feedback");
		$("#custForm").find("input[name='name']").attr("data-original-title","请输入名称");
		return false;
	}
	return true;
}

/**
 * 表单保存
 * @param op
 */
function saveForm(op){
	var flag=validateField();
	if(!flag){
		return;
	}
	var custFormArr= $("#custForm").serializeArray();
	var custFormDto={};
	for(var i in custFormArr){
		if("createDate"==custFormArr[i].name||"updateDate"==custFormArr[i].name|| "disabledDate"==custFormArr[i].name){
			custFormDto[custFormArr[i].name]=new Date().getTime();
		}else{
			custFormDto[custFormArr[i].name]=custFormArr[i].value;
		}
	}
	custFormDto.delflag=false;
	$.ajax({
       url:mainUrl+"/sys/base/customForm/save",
       data:JSON.stringify(custFormDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
            	   if(result.codeExist){
            		   //code重复
            		   $("#custForm").find("input[name='code']").parent().addClass("has-error has-feedback");
		           	   $("#custForm").find("input[name='code']").attr("data-original-title","编码重复请重新输入");
            	   }else{
            		   $("#custForm").find("input[name='code']").parent().removeClass("has-error has-feedback");
		           	   $("#custForm").find("input[name='code']").attr("data-original-title","");
            	   }
            	   if(result.nameExist){
            		   //name重复
            		   $("#custForm").find("input[name='name']").parent().addClass("has-error has-feedback");
		           	   $("#custForm").find("input[name='name']").attr("data-original-title","名称重复请重新输入");
            	   } else{
            		   $("#custForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
		           	   $("#custForm").find("input[name='name']").attr("data-original-title","");
            	   }
            	   if(result.codeExist==false && result.nameExist==false){
            		   window.opener.reloadList();
	                   alert('数据保存成功！');
	                   window.close();
            	   }
               }else {
                   alert.error('数据保存失败！');
               }
           }
       }
    });
}

//递归树匹配节点icon
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].parentId == '0') {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/main.png";
		}else {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
	    } 
	}
}

//替换分类树
function getOrgGroupTree() {
    urlAll = serviceUrl + "/sys/base/customFormGroup/getTree";
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'showAll':true}),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeReplace"), setting, zNodes);
            zTreeObj.expandAll(true); 
        }
    })
}

//替换所属分类
function saveGroupTree(){
	var treeObj = $.fn.zTree.getZTreeObj("treeReplace");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
    	$("#custForm").find("input[name='parentName']").val(nodes[0].name);
		$("#custForm").find("input[name='parentId']").val(nodes[0].id);
		$('#replaceGroupModal').modal('hide');
	}else{
		alert("请选中操作结点！");
	}
}
