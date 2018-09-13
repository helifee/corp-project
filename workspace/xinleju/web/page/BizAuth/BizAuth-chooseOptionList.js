function SelectionControl(){
	this.checkOne = function(check){
		if(check.name == "r_role"){
			if(check.checked == false){
				$("#r_check_all").attr({checked:false});	
			}else{
				var checked = true;
				$("input[name=r_role]").each(function(i){
	   				if(this.checked == false) checked = false;
	 			});
	 			$("#r_check_all").attr({checked:checked});
			}
		}
	}
	this.checkAll = function(checkAll){
		if(checkAll.name=="r_check_all"){
			$("input[name=r_role]").each(function(i){
   				this.checked = checkAll.checked;
   			});
		}
	}
	this.addRole = function(code,name,isLeaf){
		var tc = new TableController();
		tc.addTr(code,name,isLeaf);
	},
	this.removeRole = function(){
		var tc = new TableController();
		$("input[name=r_role]").each(function(i){
			if(this.checked){
				tc.removeTr(this.value);
			}
		});
		$("#r_check_all").attr({checked:false});
	},
	this.removeAll = function(){
		var tc = new TableController();
		tc.removeAllTr();
		$("#r_check_all").attr({checked:false});
	},
	this.initRoleIds = function(){
		$("#roleIds").val("");
		$("input[name=r_role]").each(function(i){
	   		$("#roleIds").val($("#roleIds").val()+ this.value + ",");
	 	});
	}
}


var sc = new SelectionControl();
function TableController(){
	
}
TableController.prototype = {
	addTr:function(id,name,isLeaf){
		var info = new Array();
		info[0] = id;
		var str1 = name;
		str1.replace(/<[^>].*?>/g,"");
		str1 = str1.replace(/\s+/g,"");
 		info[1] = str1;
 		this.addTr2Table(info);
	},
	addTr2Table:function(info){
		var trExist = false;
		$("#r_table tr").each(function(i){
			if(this.id == info[0]){
				trExist = true;
			}
		});
		if(!trExist){
			$str='';
        	$str+="<tr id='" + info[0] + "'>";
        	$str+="<td align='center'><input type='checkbox' name='r_role' value='" + info[0] + "' onclick='javascript:sc.checkOne(this);' alt='"+info[1]+"'/></td>";
        	$str+="<td align='left'>" + info[1] + "</td>";
        	$str+="</tr>";
        	$("#addTr").append($str);
        	$("#roleIds").val($("#roleIds").val()+ info[0] + ",");
        	$("#objId").val(""+info[0]);
        	$("#objName").val(""+info[1]);
		}
	},
	removeTr:function(id){
		$("#r_table tr").each(function(i){
			if(this.id == id){
				$(this).remove();
				$("#roleIds").val($("#roleIds").val().replace(id+",",""));
			}
		});
	},
	removeAllTr:function(){
		
		var ids = "";
		var names = "";
		
		$("#r_table tr").each(function(i){
			if(this.id != ""){
				$(this).remove();   
			}
		});
		
		$("input[name='r_role']").each(function(i) {
			ids += $(this).val() + ",";
			names += $(this).attr("title") + ",";
		});
		
		$("#roleIds").val("");
	}
}

$(document).ready(function(){
  	sc.initRoleIds();
});