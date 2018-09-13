<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String code = request.getParameter("code");
String path = request.getContextPath();
String menu = request.getParameter("menu");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>鑫乐居ERP移动审批</title>

<script src="js/jquery-1.11.3.min.js"></script>

<script type="text/javascript">
	$(function() {
		getUserId();
	});
	function getUserId() {
        var userUrl = "<%=path %>/weixin/getUserId?code=<%=code %>";
          $.ajax({
            type: "GET",
            url: userUrl,
            dataType: "json",
            success:function(msg){
            	$("#userId").val(msg.userId);
            	  setTimeout(function() {
        window.location.href = "<%=path %>/weixin/todo_<%=menu %>.html?"+msg.userId;
          	                         },1000);
            }
        });
    }

</script>
</head>
<body>
<input type="hidden" id="userId">
</body>
<script type="text/javascript">
window.onload=function(){
	if($("#userId").val()){
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.call('closeWindow');
		});
    	}else{
    		return;
    	}
};
</script>
</html>