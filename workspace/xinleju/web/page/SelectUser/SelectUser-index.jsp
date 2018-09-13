<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="page/SelectUser/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="page/SelectUser/zTree_v3/css/zTreeStyle/zTreeStyle.css" />
<script type="text/javascript" src="page/SelectUser/zTree_v3/js/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="page/SelectUser/SelectUser-index.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />  
</head>
<body>
	<s:form id="frm" action="SelectUser!index" method="post">
		<table width="100%">
			<tr style="background-color:#0000FF;height: 30px" id="t1">
				<td align="center"><p style="font-size:16px; color:white;">请选择转办人</p></td>
			</tr>
			<tr id="t2">
				<td >
					<div id="demo" class="demolayout">
						<ul id="demo-nav" class="demolayout">
							<li><a class="active" href="#" onclick="javascript:queryDept()" id="one">本部门</a></li>
							<li><a class="" href="#" onclick="javascript:queryAll()" id="all">全集团</a></li>
						</ul>
						<div class="clear"></div>
					</div>
				</td>
			</tr>
			<tr >
				<td style="vertical-align: top;">
					<div id="dept" style="display:block; margin-left:2%; height:400px;" class="demoUser">
						<ul class="demoUser">
							<s:iterator value="page.items" id="item">
								<li><a id="${item.id}" value="${item.id}" calss="" href="#" onclick="javascript:selectedUser(${item.id})">
										<p style="font-size:14px;">${item.realName}</p>
								</a></li>
							</s:iterator>
						</ul>
					</div>
					<div id="userTree" name="userTree" style="vertical-align: top;overflow-x:scroll; display:none;" class="ztree"></div>
				</td>
			</tr>
			<tr id="t3">
				<td align="center"><input type="button" value="取消" onclick="javascript:window.close()" /> <input type="button" value="确定 " onclick="javascript:ensureSelected()" style="" /></td>
			</tr>
		</table>
	</s:form>
</body>
</html>
