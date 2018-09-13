function upItemFi(opType,obj){
	var tr = $(obj).parents('tr.'+opType+'_row');
	if(tr.prev().hasClass(opType+'_row')){
		tr.prev().before(tr);
	}
}

function downItemFi(opType,obj){
	var tr = $(obj).parents('tr.'+opType+'_row');
	if(tr.next().hasClass(opType+'_row')){
		tr.next().after(tr);
	}
}

function addRowFi(opType,obj){
	var selectOpValueStr = '';
	var html = '<tr class="'+opType+'_row">'
		+'<td><input type="hidden" class="'+opType+'_sort" value="" /><input class="'+opType+'_name" style="width:98%;" readonly="readonly" disabled="disabled" value="' + selectOpValueStr + '"/><input type="hidden" class="'+opType+'_id" value="" /></td>'
		+'<td align="right">'
		+'<a href="javascript:void(0)" onclick="deleteRowFi(\''+opType+'\',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>'
// +'<a href="javascript:void(0)" onclick="addRowFi(\''+opType+'\',this)"><img
// src="images/icon_add.png" width="16" height="16" ></a>'
		+'</td></tr>';
	if(obj){
		$(obj).parents('.'+opType+'_row').after(html);
	}else{
		$('#'+opType+'_title_row').after(html);
	}
}
function addRowFiWithVal(opType, obj, nameVal, idVal){
	var selectOpValueStr = '';
	var html = '<tr class="'+opType+'_row">'
		+'<td><input type="hidden" class="'+opType+'_sort" value="" /><input class="'+opType+'_name" style="width:98%;" readonly="readonly" disabled="disabled" value="' + nameVal + '"/><input type="hidden" class="'+opType+'_id" value="' + idVal + '" /></td>'
		+'<td align="right">'
		+'<a href="javascript:void(0)" onclick="deleteRowFi(\''+opType+'\',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>'
// +'<a href="javascript:void(0)" onclick="addRowFi(\''+opType+'\',this)"><img
// src="images/icon_add.png" width="16" height="16" ></a>'
		+'</td></tr>';
	if(obj){
		$(obj).parents('.'+opType+'_row').after(html);
	}else{
		$('#'+opType+'_title_row').after(html);
	}
	
	var thei=$("#todoTable").height();
	if(parseInt(thei)<=400){
		$("#all").css("height",parseInt(thei)+"px");
	}else{
		$("#all").css("height",400+"px");
	}
	
		
}
function deleteRowFi(opType,obj){
	$(obj).parents('.'+opType+'_row').remove();
	if($('.'+opType+'_row').length==0){
		// addRow(opType);
	}
}
function initSpRelationFis(){
	var complete = true;
	var index = 0;
	$('tr.relation_fi_row').each(function(){
		$(this).find('.relation_fi_id').attr('name','relationFiList['+index+'].relationFiId');
		$(this).find('.relation_fi_sort').val(index+1).attr('name','relationFiList['+index+'].sort');
		index++;
	});
	return complete;
}

function singleChooseSp(opType, obj){
	var url = "Form!singleSelectList.do";
	var width = 1270;
	var height = 600;
	var scroll = "yes";
	url += "?t=" + (new Date()).getTime();
	var rv = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
	if (rv) {
		var value = rv;
		var idStr = '';
		var nameStr = '';
		if (value && value.id && value.name) {
			idStr = value.id;
			nameStr = value.name;
		}
		addRowFiWithVal(opType, obj, nameStr, idStr);
	}
}