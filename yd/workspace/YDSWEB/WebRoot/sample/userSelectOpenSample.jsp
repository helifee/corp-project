<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>选择人员Sample(Open方式)</title>
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/sample/userSelectOpenSample.js"></script>
</head>
<body>
<input type="button" value="选择人员" onclick="userSelect()">
<ul id="users"></ul>
共<label id="number">0</label>人
<h2>要调用人员选择页面，你的页面需要实现：</h2>
<ul>
	<li>
		<p>定义一个User类，具体参考代码。</p>
	</li>
	<li>
		<p>实现display(users)方法。你可以随意选择标签，用于显示所选择的人员，参数为User数组。具体参考消息代码。</p>
	</li>
	<li>
		<p>实现prepareInitUsers方法。
		此方法用来将你的页面中已选择人员以User数组的形式返回，具体参考代码。</p>
	</li>
	<li>
		<p>实现选择人员事件处理方法：如此Sample中的userSelect。此方法可完全copy,但你可通过修改此方法中的sFeatures变量以调整打开窗口的具体特征。</p>
	</li>
</ul>
<br />
</body>
</html>