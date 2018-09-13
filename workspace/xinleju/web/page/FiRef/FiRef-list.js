var ok = function(keylable,namefield,isMutil){
	var checked = null;
	if(isMutil != 'true'){
		 checked = $('input:radio[name="'+keylable+'"]:checked');
	}else{
		 checked = $('input:checkbox[name="'+keylable+'"]:checked');
	}
	if(checked.val() == undefined){
		alert('请选择内容!');
		return;
	}
	var returnValue = new Array(checked.length); 
	for(var i = 0 ; i < checked.length  ; i++){
		returnValue[i] = checked[i].value + "," + $('td:[id="'+namefield+'.'+checked[i].value+'"]')[0].innerText; 
	}
	window.returnValue =returnValue;
	window.close();
};

