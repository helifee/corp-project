<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<base target="_self"/>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="js/ext/resources/css/ext-all.css" rel="stylesheet" type="text/css" />
	<script src="js/ext/adapter/ext/ext-base.js"></script>
	<script src="js/ext/ext-all.js"></script><!-- 
	<script type="text/javascript" src="js/ext/ux/ux-all.js"></script> -->
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
	
</head>
<body>
	<div id="wrapper">
		<form id="frm" name="frm" action="CateMgr!index.do" method="post">
		<s:hidden id="dealType" name="dealType"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="100" valign="top"  style="background:#f0f9fd;">
					<!-- <div id="cardarea_new">
						<div id="tree" style="height:350px;overflow-y:auto;"></div>
					</div> -->
					
					<dl class="leftmenu" style="padding-bottom: 0px;">
					  <dd>
					    <div class="title"><span><img src="images/leftico01.png" /></span>操作类型 </div>
					    <ul class="menuson">
					      <li class="active"><cite></cite><a href="#" onclick="redirectContentIframe('TurnOverDeal!flList.do','DealType_1');return false;">流程模板信息列表</a><i></i></li>
					      <li><cite></cite><a href="#" onclick="redirectContentIframe('TurnOverDeal!wiList.do','DealType_2');return false;">流程任务信息列表</a><i></i></li>
					    </ul>
					  </dd>
					</dl>
				</td>
				<td width="6" valign="top">&nbsp;</td>
				<td valign="top">
					<!-- 标题 -->
					<iframe id="objList" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="TurnOverDeal!flList.do?t=<%=System.currentTimeMillis()%>" height="525px"></iframe>
				</td>
			</tr>
		</table>
		</form>
	</div>
</body>
<script type="text/javascript" src="page/TurnOverDeal/TurnOverDeal-index.js?t=<%=System.currentTimeMillis()%>"></script>
</html>
