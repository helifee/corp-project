
/**
 * 王亮 路径处理助手函数
 * @return {}
 */
function getRootPath() {
	// 完整路径
	var strFullPath = window.document.location.href;
	// 完整路径中不包含http://localhost:8080的路径
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	// 前缀路径：http://localhost:8080
	var prePath = strFullPath.substring(0, pos);
	// 上下文路径：/zhiNengT
	var postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
	// 上下文路径：http://localhost:8080/zhiNengT
//	return (prePath + postPath);
	return postPath;
}

