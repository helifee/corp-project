<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	

		<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>			
	
<!-- 共通CSS -->
<link href="<%=basePath%>css/ydb.css" rel="stylesheet" type="text/css">
	
	<title>远东工会图书室</title>
	<script type="text/javascript">
</script>
</head>
<body onload="init();"> 
<s:form id ="indexgm" name="bookjiegm" method ="post" theme="simple" >


<div class="container">

		

<s:include value="head.jsp" />
	<!-- 隐藏用户信息 -->
         <div class="none">
              <s:textfield id="titleuser" name="titleuser" theme="simple" value="%{userName}"/>
              </div> 
		<div class="span-23">
			<div class="span-11 h_250  margin_left_70" >
				<div class="span-11 last text_center">
					<a class="cur_pointer"><img class="icon" onmousemove="biger(this,'jieshu');" onclick="changepage(1);" onmouseout="smaller(this,'jieshu');" alt="" src="<%=basePath %>images/borrow.png">
					</a>
				</div>
				<div id="jieshu" onclick="changepage(1);" class="span-2 menu margin_left_170 text_center">
					借书
				</div>
			</div>
			
			<div class="span-8 h_250 prepend-2 last  padding_left_2" >
				<div class="span-6 last padding_left_10">
					<a class="cur_pointer"><img class="icon" alt="" onmousemove="biger(this,'huanshu');" onclick="changepage(2);" onmouseout="smaller(this,'huanshu');" src="<%=basePath %>images/return.png">
					</a>
				</div>
				<div id="huanshu" onclick="changepage(2);" class="span-6 menu">
					还书
				</div>
			</div>
			<div class="span-11 margin_top_20  margin_left_70" >
				<div class="span-11 last text_center">
					<a class="cur_pointer"><img class="icon" alt="" onmousemove="biger(this,'tushudenglu');" onclick="changepage(3);" onmouseout="smaller(this,'tushudenglu');" src="<%=basePath %>images/checkin.png">
					</a>
				</div>
				<div id="tushudenglu" onclick="changepage(3);" class="span-4 margin_left_140 menu">
					图书登录
				</div>
			</div>
			
			<div class="span-8 prepend-2 margin_top_20 last  padding_left_2" >
				<div class="span-6 last padding_left_10">
					<a class="cur_pointer"><img class="icon" alt="" onmousemove="biger(this,'tushuguanli');" onclick="changepage(4);" onmouseout="smaller(this,'tushuguanli');" src="<%=basePath %>images/manage.png">
					</a>
				</div>
				<div id="tushuguanli" onclick="changepage(4);" class="span-6 menu" >
					图书管理
				</div>
			</div>
		</div>  
	
</div>
 	<s:include value="commonLoading.jsp"></s:include>	
 		<script type="text/javascript" src="<%=basePath %>js/library/index.js"></script>
</s:form>
<s:hidden id="errorId" name="errorId" value="%{errormsg}"/>
</body>
</html>