<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/ydb.css">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/library/common/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/inputLimit.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>
	
	
	<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>	

<title>远东工会图书馆--图书登陆</title>

</head>


<body onload="init();">
<!-- 页面头部DIV -->
<div id="titleDiv"></div>

<s:form id ="booklogingm" name="booklogingm" method ="post" theme="simple" >
<div class="container">
<s:include value="head.jsp" />
	<!-- 隐藏用户信息 -->
         <div class="none">
              <s:textfield id="titleuser" name="titleuser" theme="simple" value="%{nameInput}"/>
          </div> 
			<!-- 条件栏的DIV定义 -->
		<div class="span-23 margin_top_2 margin_left_20">
<!-- head部分-->

		    <div class=" span-23 margin_top_2 margin_left_20"  id="submitdiv">
<!--		    画面左半部分-->
				<div id="bookShelfdiv" class=" span-5">
					<s:include	value="bookinsertleft.jsp"/>
				</div>	
<!--		    画面右半部分-->		  	    	
				<div class="span-17 last text_center "> 
					    <div class=" span-15  margin_left_2 ">
					      	<div class=" span-5  margin_left_2 font_weight_b font_size_18 text_right">
						           <s:hidden id="bkuserid" name="bkuserid"  value="%{idInput}"></s:hidden>			               
					               <s:label id="jsrid" name="jsrid" value="捐书人ID："></s:label>
									<s:if test="userpermit == 1">
							 			<s:textfield id="idInput" name="idInput"  cssClass="span-2" value="%{idInput}"></s:textfield>
									</s:if>	
									<s:else>
							 			<s:textfield id="idInput" name="idInput"  onfocus="this.blur();" cssClass="span-2 textnoused" value="%{idInput}"></s:textfield>
									</s:else>										
													               		              
					         </div>
					      	<div class=" span-8  margin_left_2 font_weight_b font_size_18 text_left">
					               <s:label id="jsrnm" name="jsrnm" value="姓名："></s:label>
					               <s:if test="userpermit == 1">
					               		<s:textfield id="nameInput" name="nameInput"  cssClass="span-2" value="%{nameInput}"></s:textfield>
					               </s:if>	
									<s:else>
							 			<s:textfield id="nameInput" name="nameInput"  onfocus="this.blur();" cssClass="span-2 textnoused" value="%{nameInput}"></s:textfield>
									</s:else>	
					               <s:label id="bixuname" name="bixuname" cssClass="color_red" value="*"></s:label>
					         </div>						         	
					     </div>
<!--					    <div class=" span-6 margin_top_20  text_right ">					     -->
<!--					      <s:radio id="Xtype" name="Xtype" list="#{'1':' 只有一册','2':' 有上下册或更多'}" value="1" onfocus="this.blur();"/>-->
<!--					    </div>-->

		  	    </div>	
		  	     <div id="bookmxdiv" class="introbooklendingimg margin_top_20 span-15 margin_left_40 ">
		  	    		<s:include	value="bookinsertright.jsp"/>
		  	    </div>			  	    		    
		    </div>		
	 </div>    
 </div>
 	<s:include value="commonLoading.jsp"></s:include>	
 	<script type="text/javascript" src="<%=basePath %>js/library/bookinsert.js"></script>	
</s:form>
</body>
</html>