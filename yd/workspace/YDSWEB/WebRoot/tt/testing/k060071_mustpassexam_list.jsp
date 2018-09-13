<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:select id="sltExamineInfo" name="sltExamineId" list="examineInfoList" size="8"
		listKey="examineId" listValue="examineName" cssClass="span-7" multiple="true"/>
<div id="iteExamineInfo" class="none">
	<s:iterator value="examineInfoList" status="stat">
		<s:hidden id="examineInfoList[%{#stat.index}].examineId" name="examineInfoList[%{#stat.index}].examineId"/>
		<s:hidden id="examineInfoList[%{#stat.index}].examineName" name="examineInfoList[%{#stat.index}].examineName"/>
	</s:iterator>
</div>	