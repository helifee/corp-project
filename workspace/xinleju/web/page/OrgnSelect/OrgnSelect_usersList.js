/**
 * iframe上面，点击checkbox(不包含全选)
 * @param check
 */
function checkOneList(check) {
	
	if($(window.parent.document).find("#chooseModel").html()==1){
		var isChecked = check.checked;
		if($("input[name=l_user]").length>1){
			$("input[name=l_user]").each(function(i){
				this.checked = false;
			});		
			$("#l_check_all").attr({checked:false});
			check.checked = isChecked;	
		}
	}
	
	if(check.checked == false){
		$("#l_check_all").attr({checked:false});	
	}else{
		var checked = true;
		$("input[name=l_user]").each(function(i){
				if(this.checked == false) {
					checked = false;
				}
			});
			$("#l_check_all").attr({checked:checked});
	}
}

/**
 * 全选按钮的控制
 * @param checkAll
 */
function checkAllList(checkAll) {
	
	//单选模式，且数据量超过1
	if($(window.parent.document).find("#chooseModel").html()==1){
		var isChecked = checkAll.checked;
		if($("input[name=l_user]").length>1 && isChecked == true){
			$("input[name=l_user]").each(function(i){
				this.checked = false;
			});		
			$("#l_check_all").attr({checked:false});
			alert("单选模式！");
		}
	}
	
	$("input[name=l_user]").each(function(i) {
		this.checked = checkAll.checked;
	});
}

/**
 * 双击将一行挪到另外一边去
 * @param id
 */
function additUserSingleList(id) {
	var $pwd = $(window.parent.document);	
	var chMo = $pwd.find("#chooseModel").html();
	if(chMo==1){
		removeAllLines();
	}
	addTrOne(id);	
}

/**
 * 将一行挪到另外一边去
 * @param id
 */
function addTrOne (id) {
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
	var $pwd = $(window.parent.document);		
	var trExist = false;
	$pwd.find("#r_table tr").each(function(i){
		if(this.id == info[0]){
			trExist = true;
		}
	});
	if(!trExist){
		$str='';
    	$str+="<tr id='" + info[0] + "'  ondblclick='javascript:removeUserSingleIndex(" + info[0] + ");return false;'>";
    	$str+="<td align='center'><input type='checkbox' name='r_user' value='" + info[0] + "' onclick='javascript:checkOneIndex(this);'/></td>";
    	$str+="<td >" + info[1] + "</td>";
    	$str+="<td >" + info[2] + "</td>";
    	$str+="</tr>";
    	$pwd.find("#addTr").append($str);
    	$pwd.find("#userIds").val($pwd.find("#userIds").val()+ info[0] + ",");
    	$("#objId").val(""+info[0]);
    	$pwd.find("#objName").val($pwd.find("#objName").val()+ info[2] + ",");
	}	
}

/**
 * 移除右边所有已经选中的数据
 */
function removeAllLines() {
	var $pwd = $(window.parent.document);			
	$pwd.find("#r_table tr").each(function(i){
		if(this.id != ""){
			$(this).remove();   
		}
	});
	$pwd.find("#userIds").val("");
	$pwd.find("#objName").val("");
	
}

/**
 * 按“选择”按钮，将选中的项都移动过去
 */
function additUserList() {
	var $pwd = $(window.parent.document);	
	var chMo = $pwd.find("#chooseModel").html();
	$("input[name=l_user]").each(function(i){
	if(this.checked){
		//如果是单选模式,此时比如有checkbox只选中了一个。这个在checkbox选择上控制
		if($(window.parent.document).find("#chooseModel").html()==1){
			removeAllLinesIndex();
		}		
		addTrOne(this.value);
		this.checked = false;
		$("#l_check_all").attr({checked:false});
		}
	});	
}

/**
 * 点击“移除”按钮，移除相应的项
 */
function removeUserList() {
	var $pwd = $(window.parent.document);	
	$pwd.find("input[name=r_user]").each(function(i){
		if(this.checked){
			removeTrIndex(this.value);
		}
	});
	$pwd.find("#r_check_all").attr({checked:false});	
}

/**
 * 移除右边某一行
 * @param id
 */
function removeTrIndex(id) {
	var $pwd = $(window.parent.document);		
	$pwd.find("#r_table tr").each(function(i){
		if(this.id == id){
			$(this).remove();
			$pwd.find("#userIds").val($pwd.find("#userIds").val().replace(id+",",""));
			var cell = this.cells[2].innerHTML;
			$pwd.find("#objName").val($pwd.find("#objName").val().replace(cell+",",""));
		}
	});
}


/**
 * 移除右侧选择的所有数据
 */
function removeAllLinesIndex() {
	var $pwd = $(window.parent.document);			
	$pwd.find("#r_table tr").each(function(i){
		if(this.id != ""){
			$(this).remove();   
		}
	});
	$pwd.find("#userIds").val("");
	$pwd.find("#objName").val("");	
}



