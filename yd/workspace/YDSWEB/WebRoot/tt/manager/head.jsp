<%--
 * @(#)foot.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 共通
--%>

<%--
 * 共通头部
 * 
 * @author qianguorong
 * @version 1.00 2010/03/11
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24"><a href="../../tt/manager/g100011InitTopPage.action"><img src="../../images/tt/banner.png" alt="欢迎来到教育考试培训系统"></a></div>
<div class="span-24" id="tt_nav">
<div class="span-21">
	<ul class="clear">
		<li>
			<s:if test="#session.menuControl.menu1Flag == true">
	      		<a href="../../tt/training/j020021InitAction.action">课程管理</a>
			</s:if>
			<s:else><a href="#">课程管理</a></s:else> 
      	</li>
		<li>
	   		<s:if test="#session.menuControl.menu2Flag == true">
	      		<a href="../../tt/training/j030021InitShowListMode.action">教材管理</a>
			</s:if>
			<s:else><a href="#">教材管理</a></s:else> 
      	</li>
		<li>
	   		<s:if test="#session.menuControl.menu3Flag == true">
	      		<a href="../../tt/testing/k060051InitExamineList.action">考试管理</a>
			</s:if>
			<s:else><a href="#">考试管理</a></s:else> 
      	</li>
		<li>
	   		<s:if test="#session.menuControl.menu4Flag == true">
	      		<a href="../../tt/testing/k050021InitManageMode.action">试卷管理</a>
			</s:if>
			<s:else><a href="#">试卷管理</a></s:else> 
      	</li>      
		<li>
	   		<s:if test="#session.menuControl.menu5Flag == true">
	      		<a href="../../tt/testing/k040011InitQuesManageMode.action">题库管理</a>
			</s:if>
			<s:else><a href="#">题库管理</a></s:else> 
      	</li> 
		<li>
	   		<s:if test="#session.menuControl.menu6Flag == true">
				<a href="../../tt/testing/k070011_main.jsp">成绩管理</a>
			</s:if>
			<s:else><a href="#">成绩管理</a></s:else> 
      	</li> 
 		<li>
	   		<s:if test="#session.menuControl.menu7Flag == true">
				<a href="../../tt/manager/g080011InitSystemMaintain.action">系统维护</a>
			</s:if>
			<s:else><a href="#">系统维护</a></s:else> 
      	</li> 
		<li><a href="#" onclick="popPermManager()">权限管理</a>
      	</li> 
 		<li><a href="../../tt/manager/g100011InitPermRequest.action" target="_blank">权限申请</a>
      	</li> 
     </ul>  
  </div>
  <div class="span-3 color_wht padding_top_4 last">欢迎您：<s:property value="#session.userinfo.userName" />!</div>

  <div class="bgclr_fff span-10 none" id="permManager">
        <s:include value="permManager.jsp"></s:include>
  </div>
  
</div>
