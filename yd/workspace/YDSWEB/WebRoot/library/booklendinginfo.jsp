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
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/inputLimit.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>
	

	<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
	
	
<title>远东工会图书馆--借阅信息</title>

</head>
<body onload="init();">
	<div class="container">
	<s:include value="head.jsp" />
	<s:form id ="bookjieinfo" name="bookjieinfo" method ="post" theme="simple" >
	  <div class="span-14 margin_top_2 margin_left_20">
	         <div class="span-12 margin_left_20 ">
	          	<div class="span-11  margin_left_20 text_right font_weight_b ">
	         		<s:label id="useridl" value="ISBN号："/>  
	               <s:textfield id="bookIsbn" name="bookIsbn" cssClass="span-4 padding_left_2" theme="simple" value="" />
	          	</div>
	          	<div class="span-11  margin_left_20 text_right font_weight_b ">
	         		<s:label id="booknm" value="图书名称："/>  
	               <s:textfield id="bookname" name="bookname" cssClass="span-4 padding_left_2" theme="simple" value="" />
	          	</div>	          	
	         </div> 
	         <div class="span-15  margin_left_20 ">	         
	         	<div class="span-9  margin_left_20 text_right font_weight_b ">
	         		<s:label id="bookjieuser" value="借书人ID："/>  
	              <s:textfield id="idInput" name="idInput"  cssClass="span-2 padding_left_2" value="%{idInput}"></s:textfield>
	          	</div>
	          	<div class="span-4  margin_left_20  font_weight_b ">
	         		<s:label id="bookjieusername" value="姓名："/>  
	               <s:textfield id="nameInput" name="nameInput"  cssClass="span-2 padding_left_2" value="%{nameInput}"></s:textfield>
	          	</div>	

			</div>

	         <div class="span-14  margin_left_20 ">			
	          	<div class="span-10 text_right margin_left_10" > 
	              <s:checkbox id="bookoverflg" name="bookoverflg" onclick="sercthbklendinfo();"  onfocus="this.blur();"/>只显示逾期图书<br>
	          	</div>	
			</div> 					          	
	       
	  </div>
	  	<div class="span-2   margin_top_35">	  
				<div class="bttn span-2 " onclick="sercthbklendinfo();" > 
					<a><span>检索 </span></a> 
				</div>
 		 </div>
<!--明细部分    -->
	  <div class=" span-23" id="">
			<div id="lendmxdiv" class="span-22 last "  >
				<s:include	value="booklendinginfomx.jsp"/>
	  	      </div>			    
	   </div>		
		    <div id="distconfirm" class="span-6 margin_top_2 margin_left_20 text_center">
		    	<div id="distconfirmTitle" class=" span-6">
				      <s:label value="员工密码确认:" cssClass="font_weight_b"/>
				</div>
				  <div class="span-6">
						<s:label id="mingc" name="mingc" value="请输入您的密码：" cssClass="color_bl font_weight_b"></s:label>
		  	      </div>
		  	       <div class="span-6 text_center padding_left_10">
						<s:password id="password" onkeyup="mimaclick();" cssClass="span-4   " name="xxx.mima" value="" maxlength="11"></s:password>
		  	      </div>
			      
			      <div id="tanchubtn" class="bttn span-3 text_right    " onclick="sumitreturn();"> 
          				<a><span>确定 </span></a> 
          		</div>
				<div id="tanchubtnqx" onclick="cancelmimaHys();" class=" bttn span-2 text_right  "> 
          				<a><span>取消 </span></a> 
          		</div>
	
          		
		    </div>	
		     	<s:include value="commonLoading.jsp"></s:include>
		     	<script type="text/javascript" src="<%=basePath %>js/library/booklendinginfo.js"></script>	    	     
    </s:form>
    </div>
</body>
</html>