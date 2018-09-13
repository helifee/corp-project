<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>新乐居云平台-首页</title>
    <link rel="stylesheet" type="text/css" href="css/hp_index.css" />
	<script type="text/javascript" src="js/application.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<style type="text/css">
      li{
         list-style-type:none;
         margin-top:5px;
       }
    </style>
    <script type="text/javascript">
        function openwindowdesk(url, name, iWidth, iHeight) {
			if (isEmpty(iWidth)){
				iWidth = 0;
			}
			if (isEmpty(iHeight)){
				iHeight = 0;
			}
			if(iHeight==0){
				iHeight = window.screen.availHeight - 100;
			}
			if(iWidth==0){
				iWidth = window.screen.availWidth - 100;
			}
			var iTop = (window.screen.availHeight - 30 - iHeight) / 2 - 10; // 获得窗口的垂直位置;
			var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 - 10; // 获得窗口的水平位置;
			
			iHeight=window.screen.availHeight;
			iWidth=window.screen.availWidth;
			window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no');
		}



   </script>
</head>
<body>
	<s:set id="msgDb" value="@com.xinleju.erp.frame.models.Msg@MSG_TYPE_TZ"></s:set>
	<s:set id="opTypeYb" value="@com.xinleju.erp.frame.models.Msg@OP_TYPE_YB"></s:set>
	<div class="tabContentDesk" id="tabContentDesk" style="min-height: 180px">
		<ul class="tabContentDesk">
			<!--待阅-->
			<s:iterator value="page.items" var="item" status="stat">
				<li title="${item.title}">
					<a href="#" onclick="openwindowdesk('<s:property value="#request.urlMap[#item.id]"/>','edit_project_wi')"><app:TruncateTag size="80" src="${item.title}" ></app:TruncateTag></a>
				</li>
			</s:iterator>
<!-- 			<li><a href="#" onclick="window.parent.parent.location.href='Msg!index.do?msgDto.msgType=${msgDb}&msgDto.opType=${opTypeDb}'">更多...</a></li> -->
		</ul>
	</div>
	<div class="tabContentDesk" id="tabContentDesk">
		<ul class="tabContentDesk">
			<s:if test="page.items!=null && !page.items.isEmpty()">
			<li><a href="#" onclick="window.parent.parent.location.href='Msg!index.do?msgDto.msgType=${msgDb}&msgDto.opType=${opTypeYb}'">更多...</a></li>
			</s:if>
		</ul>
	</div>
</body>
</html>