function deleteObj(url){
    var dt = new Date();
    var id = getSelectedId('data_table');
    if(isEmpty(id)){
        alert("请选择需要删除的数据！");
        return false;
    }
    var childrenNum = $('tr[itemId=' + id + ']').attr('childrenNum');
	var msg;
	if(childrenNum != 0) {
		msg = '当前数据存在下级类别，您确定要删除所选择的记录吗？';
	} else {
		msg = '您确定要删除所选择的记录吗？';
	}
	if(!confirm(msg)) {
		return false;
	}
     $.ajax({
        url:url,
        type:"post",
        dataType : "json",
        data:{id:id,dt:dt.getTime()},
        dataType : "json",
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		},
        success:function(data){
        	if(data && data.success == 'true'){
//				alert('删除成功！');
				window.form.submit();
			}else{
				if(data.msg && data.msg == 'miss_param') {
					alert('参数丢失，请刷新后重试！');
				} else if ( data.msg ) {
					alert(data.msg);
				} else {
					alert('未知错误！');
				}
			}
        }
    });
}
/**
 * 打开编辑页面,创建
 */
function openCreate(url){
	var id = getSelectedId('data_table');
	var level = $("tr[id='"+id+"']").attr("itemLevel");
	if( level >= 3){
		alert("层级不可超过三层！");
		return ;
	}
    OpenWin(url+"?parentId="+id);
}
/**
 * 新建无父子关系的数据
 */
function createNoParent(url){
	OpenWin(url);
}
/**
 * 打开编辑页面，编辑
 */
function openEdit(url){
	var id = getSelectedId('data_table');
	if(id != null && id.split("_").length > 1){
		id = id.split("_")[1];
	} 
	if(isEmpty(id)){
		alert("请选择需要编辑的数据！");
		return;
	}
    OpenWin(url+"?id="+id);
}
/**
 * 检查code,避免重复
 */
function checkCode(tag,url){
	var id = $("#"+tag).val();
	var code = $("#code").val();
	$.ajax({
	    url:url,
	    method:"post",
	    dataType:'json',
	    data:{code:code,id:id},
	    success:function(data){
	        if(data.succcess == "false"){
	            alert(data.msg);
	            $("#code").val('');
	            $("#code").focus();
	            }
	        }
    });
}
