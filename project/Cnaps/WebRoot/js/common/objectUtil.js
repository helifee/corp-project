/**
 * ���� ��Ԫ�����ƻ�ñ�Ԫ�ض�������ֺ���
 * @param {} form
 * @param {} name
 * @return {}
 */
function getObjectByName(form,name) {
	if (form) {
		var elementsObj = form.elements;
		var obj;
		if (elementsObj) {
			for (var i = 0; i < elementsObj.length; i += 1) {
				obj = elementsObj[i];
				if (obj.name != undefined && obj.name != "") {
                     if(obj.name==name){
                     return obj;
                     }
				}
			}
		}
		else {
			alert("û��elements����!");
			return null;
		}
	}
	else {
		return null;
	}
	return null;
}