
/**
 * ���� ·���������ֺ���
 * @return {}
 */
function getRootPath() {
	// ����·��
	var strFullPath = window.document.location.href;
	// ����·���в�����http://localhost:8080��·��
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	// ǰ׺·����http://localhost:8080
	var prePath = strFullPath.substring(0, pos);
	// ������·����/zhiNengT
	var postPath = strPath.substring(0, strPath.substr(1).indexOf("/") + 1);
	// ������·����http://localhost:8080/zhiNengT
//	return (prePath + postPath);
	return postPath;
}

