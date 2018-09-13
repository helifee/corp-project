

/*
 * 添加事件
 * @param 
 *        obj 文本框对象
 *        key 对应正则表达式的KEY
 *        count 小数的保留位数（除了处理小数以外可以省略不传）
 */
function addEvent(obj,key,count) {
	
	var reg = choiceRegExpre(obj,key,count);
	obj.onkeypress = function() {
		return regInput(this, reg, String.fromCharCode(event.keyCode));
	}
	obj.onpaste = function() {
		return regInput(this, reg, window.clipboardData.getData('Text'));
	}
	obj.ondrop = function() {
		return regInput(this, reg, window.clipboardData.getData('Text'));
	}
}

/*
 * 添加事件
 * @param 
 *        obj 文本框对象
 *        reg 正则表达式
 *        ime 关闭输入法，禁止切换中英文
 */
function addEventReg(obj,reg,ime) {
	
	if (ime == 'Disabled') {
		obj.style.imeMode = "Disabled";
	}
	
	obj.onkeypress = function() {
		return regInput(this, reg, String.fromCharCode(event.keyCode));
	}
	obj.onpaste = function() {
		return regInput(this, reg, window.clipboardData.getData('Text'));
	}
	obj.ondrop = function() {
		return regInput(this, reg, window.clipboardData.getData('Text'));
	}
}
	
/*
 * 选择需要的正则表达式 Regular Expressions	
 * @param 
 *        obj 文本框对象
 *        key 对应正则表达式的KEY
 *        count 小数的保留位数（除了处理小数以外可以省略不传）
 */
function choiceRegExpre(obj,key,count){
	
	switch (key) {
	
		// 仅允许输入字母
		case 'Letter':
		
			// 关闭输入法，禁止切换中英文
			obj.style.imeMode = "Disabled"; 
			return /^[a-z]*$/i;
			
		// 仅允许输入小写字母
		case 'SmallLetter':
			obj.style.imeMode = "Disabled";
			return /^[a-z]*$/;
		
		// 仅允许输入大写字母	
		case 'BigLetter':
			obj.style.imeMode = "Disabled";
			return /^[A-Z]*$/;
		
		// 仅允许输入数字
		case 'Number':
			obj.style.imeMode = "Disabled";
			return /^[0-9]*$/;
			
		// 限制N位小数
		case 'Decimal':
			obj.style.imeMode = "Disabled";
			return DecimalNo(count);
			
		// 仅允许输入大小写字母和数字
		case 'LetterAndNumber':
			obj.style.imeMode = "Disabled";
			return /^[a-z0-9]*$/i;
			
		// 仅输入大写字母和数字 yry 06/28
		case 'BigLetterAndNumber':
			obj.style.imeMode = "Disabled";
			return /^[A-Z0-9]*$/;
			
		// 禁止@
		case 'Char':
			return /^[^@]*$/;	
	
		// 允许输入汉字	
		case 'Chinese':
			return /^[\u4E00-\u9FA5]*$/;	
		
		// 不做任何限制
		default:
	}	
}		

/*
 * 获取限制N位小数位数的正则表达式	
 * @param 
 *        count 小数的保留位数（count为空表示不限制小数位数）
 */
function DecimalNo(count){

	switch(count){
		case 1:
			return /^\d*\.?\d{0,1}$/;
		case 2:
			return /^\d*\.?\d{0,2}$/;
		case 3:
			return /^\d*\.?\d{0,3}$/;
		case 4:
			return /^\d*\.?\d{0,4}$/;
		case 5:
			return /^\d*\.?\d{0,5}$/;
		case 6:
			return /^\d*\.?\d{0,6}$/;
		case 7:
			return /^\d*\.?\d{0,7}$/;
		case 8:
			return /^\d*\.?\d{0,8}$/;
		case 9:
			return /^\d*\.?\d{0,9}$/;
		case 10:
			return /^\d*\.?\d{0,10}$/;
		default:
			return /^\d*\.?\d{0,}$/;
	}
}

// 输入限制 主处理
function regInput(obj, reg, inputStr){
	var docSel	= document.selection.createRange()
	if (docSel.parentElement().tagName != "INPUT")	return false
	oSel = docSel.duplicate()
	oSel.text = ""
	var srcRange = obj.createTextRange()
	oSel.setEndPoint("StartToStart", srcRange)
	var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length)
	return reg.test(str)
}	
	
