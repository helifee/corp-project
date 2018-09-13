function upItem(opType,obj){
	var tr = $(obj).parents('tr.'+opType+'_row');
	if(tr.prev().hasClass(opType+'_row')){
		tr.prev().before(tr);
	}
}

function downItem(opType,obj){
	var tr = $(obj).parents('tr.'+opType+'_row');
	if(tr.next().hasClass(opType+'_row')){
		tr.next().after(tr);
	}
}

function addRow(opType,obj){
	var selectOpStr = '';
	var selectOpValueStr = '';
	var html = '<tr class="'+opType+'_row">'
		+'<td><input class="'+opType+'_name" style="width:98%;" value="' + selectOpValueStr + '"/></td>'
		+'<td><input class="'+opType+'_href" style="width:98%;" value="' + selectOpValueStr + '"/><input type="hidden" class="'+opType+'_sort" value="" /></td>'
		+'<td align="right">'
		+'<a href="javascript:void(0)" onclick="deleteRow(\''+opType+'\',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>'
		+'</td></tr>';
	if(obj){
		$(obj).parents('.'+opType+'_row').after(html);
	}else{
		$('#'+opType+'_title_row').after(html);
	}
}

function deleteRow(opType,obj){
	$(obj).parents('.'+opType+'_row').remove();
	if($('.'+opType+'_row').length==0){
		//addRow(opType);
	}
}
function initSpRelationHrefs(){
	var complete = true;
	var index = 0;
	$('tr.relation_row').each(function(){
		$(this).find('.relation_name').attr('name','relationHrefList['+index+'].hrefName');
		$(this).find('.relation_href').attr('name','relationHrefList['+index+'].hrefStr');
		$(this).find('.relation_sort').val(index+1).attr('name','relationHrefList['+index+'].sort');
		index++;
	});
	return complete;
}