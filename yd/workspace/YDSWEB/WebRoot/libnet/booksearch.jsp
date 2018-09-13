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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
<title>远东工会书屋--图书一览</title>
</head>
<body class="nobg" onload="init(); document.onkeydown();">
	<div class="ydscontainer">
		<div class="span-24 head">
				<div class="span-15">
			        <label id="head_title" class="title_1">远东工会书屋图书一览</label>
			    </div>
		</div>
		<div class="span-24">
			<div id="head_message" class="introsearch">
				<div class="botintrosearch">
					<div class="midintrosearch">
						<s:label>您好，看看工会书屋有什么好书，然后赶快去借吧！！</s:label>
					</div>
				</div>
			</div>
		</div>

	    <s:form id="booksearch" theme="simple">
		    <div id="search_t" class="span-14 margin_top_20 margin_left_20" >
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="ISBN号:  "/>
		    		</div>
		    		<div class="span-4 text_left">
		    			<s:textfield id="isbn" name="isbn" cssClass="span-3" maxlength="13"/>
		    			<s:hidden id="isbn_h" name="isbn"></s:hidden>
		    		</div>
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书名称:"/>
		    		</div>
		    		<div class="span-3 text_left">
		    			<s:textfield id="bookname" name="bookname" cssClass="span-3" maxlength="40"/>
		    			<s:hidden id="bookname_h" name="bookname"></s:hidden>
		    		</div>
		    	</div>
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书类型:"/>
		    		</div>
		    		<div class="span-4 text_left">
		    			<s:select id="bookclass" name="bookclass" cssClass="span-4" list="booksortlist" listKey="classid" listValue="classname"/>	
		    			<s:hidden id="bookclass_h" name="00"></s:hidden>
		    		</div>
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书状态:"/>
		    		</div>
		    		<div class="span-3 text_left">
		    			<s:select id="bookstate" name="bookstate" cssClass="span-3" list="#{'0':'','1':'借出','2':'空闲'}"/>	
		    			<s:hidden id="bookstate_h" name="0"></s:hidden>
		    		</div>
		    	</div>
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label  value="捐书人ID:"/>
		    		</div>
		    		<div class="span-8 text_left">
					    <s:textfield id="idInput" name="idInput"  cssClass="span-2"></s:textfield>
					    <s:hidden id="idInput_h" name="idInput"></s:hidden>
		    			<s:label>&nbsp;&nbsp;&nbsp;&nbsp;姓名</s:label>
		    			<s:textfield id="nameInput" name="nameInput"  cssClass="span-2"></s:textfield>
		    		</div>
		    	</div>
		    </div>
		    
		    <div class="span-6 margin_top_20 ">
			    <div class="span-6 margin_top_20">
			    	<s:label id="a" name="a"></s:label>
			    </div>
			    <div class="span-6 margin_top_20">
			    	<s:label id="b" name="b"></s:label>
			    </div>
			    <div id="searchbtn1" class="bttnsearch span-2 text_center" onclick="searchclick();"> 
          			<a><span>检       索 </span></a> 
	          	</div>
		    </div>

			<div class="span-23 margin_top_20">
			    <s:label id="a" name="a" value=""></s:label>
			</div>
		    <div id="managetable" class="box_border span-24 margin_top_4"> 
		    	<s:include value="managetable.jsp"></s:include>
		    </div>
	 	<script type="text/javascript" src="<%=basePath %>js/libnet/booksearch.js"></script>
	    </s:form>
	</div>
</body>
</html>