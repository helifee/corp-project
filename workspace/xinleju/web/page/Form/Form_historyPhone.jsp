<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!-- 基本信息 -->
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
	<tr>
		<td>
			<div class="divh3_title">
				<a href="#" onclick="showOrHide('jbxxTable','jbxxTableShowOrHide');">基本信息<img title="点击隐藏" id="jbxxTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
			</div>
		</td>
	</tr>
</table>
<div  id="jbxxTable" style="width:100%;">
<iframe id="d2" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!fiInfo.do?fiId=${fiId}" onload="try{iframeChangeSize('d2',-20);}catch(e){};"></iframe>
</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
	<tr>
		<td>
			<div class="divh3_title">
				<a href="#" onclick="showOrHide('ywTable','ywTableShowOrHide');">业务信息<img title="点击隐藏" id="ywTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
			</div>
		</td>
	</tr>
</table>
<div  id="ywTable" style="width:100%;">
<iframe id="d1" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!redirectView.do?fiId=${fiId}" onload="try{iframeChangeSize('d1',0);}catch(e){};"></iframe>
</div>