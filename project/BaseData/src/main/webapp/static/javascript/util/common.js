
// 根据url的key获取value

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
		r = window.location.search.substr(1).match(reg);
		
	if(r != null) {
		return decodeURI(r[2]);
	}

	return null;
}