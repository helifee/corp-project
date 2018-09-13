<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:form action="setUserTheme" target="_top" name="setUserTheme" theme="simple" namespace="/common">
 	<s:iterator value="themeList" var="themeListInfo"> 
		<s:if test="#themeListInfo.themeId == 001">
 			<span id="clrBlck1" class="themeColor1 themeSize bd_w cur_pointer " title="${themeListInfo.themeName}" onclick="if(confirm('切换主题将迁移到主页，确认更改主题？')){$('themeId').value='${themeListInfo.themeId}';$('setUserTheme').submit();}"></span>
 		</s:if>
 		<s:if test="#themeListInfo.themeId == 002">
 			<span id="clrBlck2" class="themeColor2 themeSize bd_w cur_pointer"  title="${themeListInfo.themeName}" onclick="if(confirm('切换主题将迁移到主页，确认更改主题？')){$('themeId').value='${themeListInfo.themeId}';$('setUserTheme').submit();}"></span>
 		</s:if>
		<s:if test="#themeListInfo.themeId == 003">
 			<span id="clrBlck3" class="themeColor3 themeSize bd_w cur_pointer"  title="${themeListInfo.themeName}" onclick="if(confirm('切换主题将迁移到主页，确认更改主题？')){$('themeId').value='${themeListInfo.themeId}';$('setUserTheme').submit();}"></span>
 		</s:if> 	
	</s:iterator> 	
 	<s:hidden name="themeInfo.themeId" id="themeId"  value=""/>
 	<s:hidden name="themeInfo.userId" value="%{#session.userinfo.userId}"/>
</s:form>