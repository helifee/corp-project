<%--
 * @(#)ManageGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>    
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript">
	function init() {
		if(!$('more') && $$('.text').length>0){
			setHeight($$('.text').length * 26 + 12);
		}else if($$('.text').length==0){
			setHeight(38);
		}else{
			setHeight(164);
		}
	}
	</script>
	
	<!-- 画面用js -->
	<style type="text/css">
	.info{
		position:relative;
		width:100%;
		height:26px;
	}
	
	.info .image{
		position:absolute;
		left:8px;
		top:3px;
	}
	
	.info .text{
		position:absolute;
		left:26px;
	}
	.more{
		position:absolute;
		right:20px;
		
	}
	
	</style>
<base target="main"> 
<title>审批办公桌</title>
</head>
<body  onload="init();" scroll="no">
<div id="content" class="text_center padding_top_6 padding_bottom_6 position_rel">
<div>
	<s:if test="aprvlGadgetInfoList.size==0">
		<div>暂无审批信息！</div>
	</s:if>
	<s:else>
		<s:iterator value="aprvlGadgetInfoList" status="stat">
			<s:if test="#stat.index<5">
				<div class="info">
					<img class="image" src="../images/activeDesk/notice.gif"> 
					<span class="text">				
						${msgTitle}					
					</span>
	    		</div>
    		</s:if>
		</s:iterator>
	</s:else>		 
</div>
<s:if test="aprvlGadgetInfoList.size>5">
	<a class="more" id="more" href="http://www.yds.yd/kaoqin/MAIL_NEW.jsp?flag=0">更多&gt;&gt;</a>
</s:if>
</div>
</body>
</html>