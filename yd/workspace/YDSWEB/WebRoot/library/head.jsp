<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="span-24 head">
	<div class="span-15">
        <label id="head_title" class="title_1"></label>
    </div>
    <div id="head_reserve2" class="span-2 text_right">
		&nbsp
    </div> 
    <div id="head_reserve1" class="span-2 text_right">
		&nbsp
    </div>   
    <div id="head_logout" class="span-2 text_right">
    	  <a href="<%=basePath%>library/userlogout.action" onfocus="this.blur()"><u>退出系统</u></a>

    </div> 
    <div id="head_return" class="span-2 text_right">
         <a href="<%=basePath%>library/returncommon.action" onfocus="this.blur()"><u>返回首页</u></a>
    </div> 
</div>
<div class="span-24">
	<div id="head_message" class="intro1">
		<div class="botintro">
			<div class="midintro">
				<s:hidden id="user_info" name="userInfo"></s:hidden>
				<s:label id="head_info"></s:label>
				<s:label id="head_info2"></s:label>
				<span id="cur" style="background: #FFFFFF;">&nbsp&nbsp</span>
			</div>
		</div>
	</div>
	
	<!-- 操作状态消息 -->
 	<s:hidden id="operateTip"></s:hidden>
</div>