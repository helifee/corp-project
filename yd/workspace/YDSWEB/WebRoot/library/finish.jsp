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
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	
	<script type="text/javascript" src="<%=basePath %>js/library/finish.js"></script>
<title>远东工会图书馆--系统登录</title>
<base href="<%=basePath%>">

</head>
<body>
	<div class="container">
	    <div class="span-23 margin_top_2 margin_left_20">
	    	  <div class="span-11 margin_top_10 margin_left_20 ">
	    		<s:label id="second" name="second" theme="simple" value="30" cssClass="font_size_18 font_weight_b"/>
	    		<s:label id="back" name="back" theme="simple" cssClass="font_size_18 font_weight_b" value="秒钟之后自动退出系统" />
	    	  </div>
	          <div class="span-6 margin_top_2 margin_left_20">
	          	  <a href="<%=basePath%>library/userlogout.action" onfocus="this.blur()"><font size=5><u>操作完成并退出系统</u></font></a>

	          </div> 
	          <div class="span-4 margin_top_2 margin_left_20">
	                 <a href="<%=basePath%>library/returncommon.action" onfocus="this.blur()"><font size=5><u>返回继续操作</u></font></a>
	          </div> 
	    </div>
	    <div class="span-23 margin_top_20 margin_left_20">
              <s:label id="a" name="a" theme="simple" value=""/>
	    </div>
	    <div class="span-23 margin_top_20 margin_left_20">
              <s:label id="a" name="a" theme="simple" value=""/>
	    </div>
	  <div class="span-4 margin_top_10 margin_left_20">
              <s:label id="a" name="a" theme="simple" value=""/>
	    </div>
	    <div class="span-14 margin_top_10  text_center">
	            <s:label id="message" name="message" theme="simple" cssClass="font_size_18 font_weight_b" value="%{finishheadinfo.neirong}"/>
	    </div>    	    
	    <div class="span-14 margin_top_20 margin_left_180">
	    	<table id="finishmxtbl " class="griddiv1 ellipsis tablegriddivheight">
	    		<tr>
			         <th class="percent_18 text_center"><font size=3>ISBN号</font></th><th class="percent_30 text_center"><font size=3>图书名称</font></th>
			    </tr>
	    		<s:iterator value="finishinfo" status="sta">
	    		
	    			<tr >
	    				<td class="text_center" ><font size=3><s:property value="isbn"/></font></td>
	    				<td  class="text_center" title="<s:property value="bookname" />" ><font size=3><s:property value="bookname"/></font></td>
	    			</tr>
	    		</s:iterator>
	    	</table>
	    </div>

	</div>
</body>
</html>