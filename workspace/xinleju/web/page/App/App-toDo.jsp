<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>鑫乐居ERP-首页</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=9" />
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="css/hp_index.css" />
    <link href="css/mask.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="page/App/App-hpIndex.js"></script>
    
    <style type="text/css">
		iframe {
			margin-left: -40px;
			margin-top: -12px;
			border: 0px;
		}
	</style>
    
</head>

<body>

<div id="daiban" class="fill" style="width:98%">
    <table class="fill border1">
        <tr>
            <td class="tab selected"><span class="hide tabIndex">0</span>待审（<font color='#ff0000' id="db_count"></font>）</td>
            <td class="tab unselected"><span class="hide tabIndex">1</span>待阅（<font color='#ff0000' id="dy_count"></font>）</td>
            <td class="tab unselected"><span class="hide tabIndex">2</span>已处理</td>
            <td class="tab unselected"><span class="hide tabIndex">3</span>我的发起</td>
            <td class="unselected" ></td>
        </tr>
        <tr>
            <td class="tabContent" id="tabContent" colspan="5">
                <ul class="tabContent tab0 item" title="App!desktop1.do"><!--待审-->
                	<iframe id="d1" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="220" marginwidth="0" scrolling="no" src="App!desktop1.do" onreadystatechange="setClientHeight('d1',this)" onload="setClientHeight('d1',this)"></iframe>
                </ul>
                <ul class="tabContent tab1 item hide" title="App!desktop2.do"><!--待阅-->
                    <iframe id="d2" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="220" marginwidth="0" scrolling="no" src="App!desktop2.do" onreadystatechange="setClientHeight('d2',this)" onload="setClientHeight('d2',this)"></iframe>
                </ul>
                <ul class="tabContent tab2 item hide" title="App!desktop3.do"><!--已处理-->
                    <iframe id="d3" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="220" marginwidth="0" scrolling="no" src="App!desktop3.do" onreadystatechange="setClientHeight('d3',this)" onload="setClientHeight('d3',this)"></iframe>
                </ul>
                <ul class="tabContent tab3 item hide" title="App!desktop4.do"><!--我的发起-->
                    <iframe id="d4" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="220" marginwidth="0" scrolling="no" src="App!desktop4.do" onreadystatechange="setClientHeight('d4',this)" onload="setClientHeight('d4',this)"></iframe>
                </ul>
            </td>
        </tr>
    </table>
</div>

<script type="text/javascript">
	$('#tabContent').mask("数据加载中...");
	function setClientHeight(iframeID, _iframe) {
		var IS_IE = 0 <= navigator.userAgent.indexOf("MSIE");
		if ((IS_IE && _iframe.readyState == "complete" || !IS_IE)) {
			$('#tabContent').unmask();
		}
	}


	$(".tabContent iframe").bind("load", function() {
	 
		$("#tabContent").unmask();
	});

	$(".item iframe").each(function() {
		var that = this;
		that.onreadystatechange = function() {
			if (that.readyState == "interactive") {
				$("#tabContent").unmask();
			}
		};
	});
</script>
</body>
</html>