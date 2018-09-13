function SelectionControl(){
	this.checkOne = function(check){
		if(check.name == "l_user"){
			if(check.checked == false){
				$("#l_check_all").attr({checked:false});	
			}else{
				var checked = true;
				$("input[name=l_user]").each(function(i){
	   				if(this.checked == false) checked = false;
	 			});
	 			$("#l_check_all").attr({checked:checked});
			}
		}else if(check.name == "r_user"){
			if(check.checked == false){
				$("#r_check_all").attr({checked:false});	
			}else{
				var checked = true;
				$("input[name=r_user]").each(function(i){
	   				if(this.checked == false) checked = false;
	 			});
	 			$("#r_check_all").attr({checked:checked});
			}
		}
	}
	this.checkAll = function(checkAll){
		if(checkAll.name=="l_check_all"){
			$("input[name=l_user]").each(function(i){
   				this.checked = checkAll.checked;
   			});	
		}else if(checkAll.name=="r_check_all"){
			$("input[name=r_user]").each(function(i){
   				this.checked = checkAll.checked;
   			});
		}
	}
	this.additionUser = function(){
		var tc = new TableController();
		$("input[name=l_user]").each(function(i){
			if(this.checked){
				tc.addTr(this.value);
				this.checked = false;
				$("#l_check_all").attr({checked:false});
			}
		});
	},
	this.additionUserSingle = function(id){
		var tc = new TableController();
		tc.addTr(id);
	},
	this.removeUser = function(){
		var tc = new TableController();
		$("input[name=r_user]").each(function(i){
			if(this.checked){
				tc.removeTr(this.value);
			}
		});
		$("#r_check_all").attr({checked:false});
	},
	this.removeUserSingle = function(id){
		var tc = new TableController();
		tc.removeTr(id);
	},
	this.removeAll = function(){
		var tc = new TableController();
		tc.removeAllTr();
		$("#r_check_all").attr({checked:false});
	},
	this.initUserIds = function(){
		$("#userIds").val("");
		$("input[name=r_user]").each(function(i){
	   		$("#userIds").val($("#userIds").val()+ this.value + ",");
	 	});
	}
}
var sc = new SelectionControl();
function TableController(){
	
}
TableController.prototype = {
	addTr:function(id){
		var info = new Array();
		$("#l_table tr").each(function(i){
			if(this.id == id){
				info[0] = id;
				var str1 = this.cells[1].innerHTML;
				str1.replace(/<[^>].*?>/g,"");
				str1 = str1.replace(/\s+/g,"");
	     		info[1] = str1;
	     		var str2 = this.cells[2].innerHTML;
	     		str2.replace(/<[^>].*?>/g,"");
	     		str2 = str2.replace(/\s+/g,"");
	     		info[2] = str2;
			}
		});
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
        	$str+="<tr id='" + info[0] + "'  ondblclick='javascript:sc.removeUserSingle(" + info[0] + ");return false;'>";
        	$str+="<td align='center'><input type='checkbox' name='r_user' value='" + info[0] + "' onclick='javascript:sc.checkOne(this);'/></td>";
        	$str+="<td align='align'>" + info[1] + "</td>";
        	//$str+="<td align='center'>" + info[2] + "</td>";
        	$str+="</tr>";
        	$("#addTr").append($str);
        	$("#userIds").val($("#userIds").val()+ info[0] + ",");
        	$("#objId").val(""+info[0]);
        	$("#objName").val(""+info[1]);
		}
	},
	removeTr:function(id){
		$("#r_table tr").each(function(i){
			if(this.id == id){
				$(this).remove();
				$("#userIds").val($("#userIds").val().replace(id+",",""));
			}
		});
	},
	removeAllTr:function(){
		$("#r_table tr").each(function(i){
			if(this.id != ""){
				$(this).remove();   
			}
		});
		$("#userIds").val("");
	}
}

function PageOperation(){			
	this.closePage = function(aObj){
		self.close(); 
		window.close();
	}	
	this.queryDepsAndUserName = function (){
		$("#allSearch").val("true");
		$("#frm").submit();
		return true;
	}
	
	this.pressEnter = function (event){
		if(event.keyCode == 13){
			$("#allSearch").val("true");
			$("#frm").submit();
			return true;
		}
	}
}
var po = new PageOperation();
$(document).ready(function(){
  	sc.initUserIds();
});
