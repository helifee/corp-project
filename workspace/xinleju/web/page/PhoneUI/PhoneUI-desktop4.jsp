<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>新乐居云平台-首页</title>
    <link rel="stylesheet" type="text/css" href="css/PhoneUI.css" />
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
    <style type="text/css">
      li{
           list-style-type:none;
           margin-top:5px;
        }
    </style>
	<script type="text/javascript">
		$(function() {
			var total = '${dbCount}';
			if (!total) {
				total = 0;
			}
			$('#db_count', $(parent.document)).html(total);
		});
	</script>
</head>
<body>
	<s:set id="todoTypeGr" value="@com.xinleju.erp.flow.service.extend.dto.TodoFiDto@TODO_TYPE_GR"></s:set>
	<div class="tabContentDesk" id="tabContentDesk" style="margin-top: 5px;" >
		<ul class="tabContentDesk">
			<!--待阅-->
			<s:iterator value="page.items" var="item" status="stat">
				<li title="${item[3]}">
					<a href="#" onclick="eval('window.parent.showDetail(\'Form!dealIndex.do?fiId=${item[0]}&showModule=Phone\')');"><app:TruncateTag size="80" src="${item[3]}" ></app:TruncateTag></a>
				</li>
			</s:iterator>
		</ul>
	</div>
	<div class="tabContentDesk" id="tabContentDesk" >
	<form id="frm" name="frm" action="PhoneUI!desktop4.do" method="post">
		<s:hidden name="start"></s:hidden>
		<ul class="tabContentDesk">
			<li><app:PageTag actionName="PhoneUI!desktop4.do" ></app:PageTag></li>
		</ul>
	</form>
	</div>
</body>
</html>