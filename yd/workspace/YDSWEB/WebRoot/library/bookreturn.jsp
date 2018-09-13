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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	
	<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>	
<title>远东工会图书馆--图书归还</title>

</head>
<body onload="init();">
	<div class="container">
	    <s:include value="head.jsp"></s:include>
	     
        <div class="span-15 margin_top_10">
		  <s:form id="bookreturn" theme="simple">
			 <div class="span-22 last " >
			 	<table id="bookreturnmxtbl" class=" text_center midintro grid ellipsis">
			 		  <tr>
			          <th class="percent_14">ISBN号</th>
			          <th class="percent_35">图书名称</th>
			          <th class="percent_20">作者</th>
			          <th class="percent_20">出版社</th>
			          <th class="percent_10">是否归还</th>
			          </tr>
			          <s:iterator value="bookreturninfo">
			    		<tr>
			    			<td title="${isbn}"><s:property value="isbn"/></td>
			    			<td title="${bookname}"><s:property value="bookname"/></td>
			    			<td title="${bookauthor}"><s:property value="bookauthor"/></td>
			    			<td title="${bookpublisher}"><s:property value="bookpublisher"/></td>
			    			<td><input type="checkbox" id="loanlist" name="loanlist" value="<s:property value="loanid"/>"> </td>
			    		</tr>
			    	  </s:iterator>
			 	</table>
			 </div>
			 <s:include value="commonLoading.jsp"></s:include>	
			<script type="text/javascript" src="<%=basePath %>js/library/bookreturn.js"></script>
		  </s:form>
        </div> 
		<div class="span-23 margin_top_20 margin_left_20">
	    	 <div class="span-10 margin_top_2 margin_left_20">
	              <s:label id="b" name="b" theme="simple" value=""/>
	         </div> 
	         <div class="span-2 margin_top_2  ">
	         	  <div class="bttn span-2 margin_top_2" > 
	         	  <a onclick="submitclick();"><span>提交</span></a> 
	         	  </div>
	         </div> 
	    </div>
        <div id="distconfirm" class="span-6 margin_top_2 margin_left_20 text_center none" >
        
		    	<div id="distconfirmTitle" class=" span-6">
				      <s:label value="员工密码确认:" cssClass="font_weight_b"/>
				</div>
				  <div class="span-6 color_bl font_weight_b">
						<s:label id="mingc" name="mingc" value="请输入您的密码："></s:label>
		  	      </div>
		  	       <div class="span-6 text_center padding_left_10">
						<s:password id="password" name="xxx.mima" cssClass="span-4" onkeyup="passwordEnter();" value="" maxlength="11"/>
		  	      </div>
			      
			      <div id="okbtn" class="bttn span-3 text_right " onclick="passwordSubmit();"> 
          				<a><span>确定 </span></a> 
          		</div>
				<div id="cancelbtn" onclick="cancelmimaHys();" class=" bttn span-2 text_left"> 
          				<a><span>取消 </span></a> 
          		</div>		    
		 </div> 
	</div>
</body>
</html>