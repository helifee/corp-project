<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css">
    <link href="css/mask.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="css/hp_index.css" />
     
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="page/App/App-hpIndex.js"></script>

    <title>鑫乐居ERP-首页</title>
    <style type="text/css">
		td.menuIcon {
			width:115px;
			height:119px;
		}
	</style>
</head>

<body style="margin: 0px;">
<div id="kuaijiecaidan" class="fill" style="width:98%">
    <table class="fill border1">
        <tr>
            <td class="tab selected" style="border-bottom:0px;">快捷菜单</td>
            <td class="unselected">&nbsp;</td> 
        </tr>
     </table>  
     <table class="fill border2" style='height:245px'>
              <s:iterator value="#request.shortCutFunc" var="item" status="index">
              		 <s:if test="#index.count*2%5 == 1}"><tr></s:if>
		<td class="menuIcon" title="${item.funcModule.name}">
		  <div>
            <a href="javascript:window.parent.location.href='${appMap[item.funcModule.systemCode].depUrl}/${item.funcModule.funcUrl}'">
               <img class="menuIcon"  onclick="javascript:window.parent.parent.getMenuId('${item.funcModule.name}');" src="images/${index.index}.png"/>
            </a>
          </div>
          <div>
          <a href="javascript:window.parent.location.href='${appMap[item.funcModule.systemCode].depUrl}/${item.funcModule.funcUrl}'"
             onclick="javascript:window.parent.parent.getMenuId('${item.funcModule.name}');">
               <app:TruncateTag size="8" src="${item.funcModule.name}" >
               </app:TruncateTag> 
            </a>
          </div>
       </td>
		<s:if test="#index.isLast() && #index.count%5 != 0">
			<s:iterator begin="1" end="5-#index.count%5">
				<td class="menuIcon">&nbsp;</td>
			</s:iterator>
		</s:if>
		<s:if test="#index.count%5 == 0 || #index.isLast()"></tr></s:if>
              </s:iterator>
              <s:if test="#request.shortCutFunc.size() <= 5">
		          <tr>
					<td class="menuIcon">&nbsp;</td>
					<td class="menuIcon">&nbsp;</td>
					<td class="menuIcon">&nbsp;</td>
					<td class="menuIcon">&nbsp;</td>
					<td class="menuIcon">&nbsp;</td>
			      </tr>
              </s:if>
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

	function more(url) {
		window.location.href = url;
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