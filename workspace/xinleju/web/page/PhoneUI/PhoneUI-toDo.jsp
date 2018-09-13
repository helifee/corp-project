<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>鑫乐居ERP-首页</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<META name=viewport content="width=device-width, initial-scale=1">
	<meta http-equiv="x-ua-compatible" content="ie=9" />
	<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css">
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/PhoneUI.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="page/PhoneUI/PhoneUI-toDo.js"></script>
	
	<style type="text/css">
	iframe {
		margin-left: -40px;
		margin-top: -12px;
		border: 0px;
	}
	</style>
	
</head>

<body>

<div id="daiban" class="fill" style="width:100%;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh5">
		<tr>
			<td>
				<div class="divh5_title">
					<ul id="tabnav_new" class="convention_tab_new">
						<li class="current_tabsr" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(1);"><span class="hide tabIndex">0</span>待审（<font color='#ff0000' id="db_count"></font>）</a></li>
						<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(2);"><span class="hide tabIndex">1</span>待阅（<font color='#ff0000' id="dy_count"></font>）</a></li>
						<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(3);"><span class="hide tabIndex">2</span>已处理</a></li>
						<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(4);"><span class="hide tabIndex">3</span>我的发起</a></li>
					</ul>
				</div>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table02" style="margin-bottom: 10px;border:1px solid #ccc;">
	<tr>
		<td>
			<div id="cardarea_new">
				<div class="item" id="mask_1">
					<!-- 审批信息 -->
					<iframe id="d1" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="PhoneUI!desktop1.do" onload="try{iframeChangeSize('d1',10);}catch(e){};"></iframe>
				</div>
				<div class="item display_none" id="mask_2">
					<iframe id="d2" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="try{iframeChangeSize('d2',10);}catch(e){};"></iframe>
				</div>
				<div class="item display_none" id="mask_3">
					<iframe id="d3" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="try{iframeChangeSize('d3',10);}catch(e){};"></iframe>
				</div>
				<div class="item display_none" id="mask_4">
					<iframe id="d4" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="try{iframeChangeSize('d4',10);}catch(e){};"></iframe>
				</div>
			</div>
		</td>
	</tr>
</table>
<input type="hidden" id="kp_OtherRegional" value="tabnav_new,li,cardarea_new,item,current_tabsr" title="这个必不可少" />
<script type="text/javascript" src="js/tabjs.js"></script>
<script type="text/javascript">
	function goUrl(iframeId, url) {
		$('#' + iframeId).attr('src', url);
	}

	function maskClick(type) {
		if (type == 1) {
			goUrl("d1", "PhoneUI!desktop1.do&t=" + new Date().getTime());
		} else if (type == 2) {
			goUrl("d2", "PhoneUI!desktop2.do&t=" + new Date().getTime());
		} else if (type == 3) {
			goUrl("d3", "PhoneUI!desktop3.do&t=" + new Date().getTime());
		} else if (type == 4) {
			goUrl("d4", "PhoneUI!desktop4.do&t=" + new Date().getTime());
		}
	}
</script>
</body>
</html>