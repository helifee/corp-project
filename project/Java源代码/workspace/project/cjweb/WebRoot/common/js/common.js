
//只能输入数字(小数点也不能输入)
function onlyEnterNumbers(obj){
	obj.val(obj.val().replace(/\D/g,''));
}

//只能输入数字和小数点
function numbersAndPoint(obj) {
	obj.val(obj.val().replace(/[^\d\.]/g,''));
}

//浏览器类型是ie
function isIe()
{
	var i=navigator.userAgent.toLowerCase().indexOf("msie");
	return i>=0;
}

//浏览器类型是火狐
function isFireFox()
{
	var i=navigator.userAgent.toLowerCase().indexOf("firefox");
    return i>=0;
}