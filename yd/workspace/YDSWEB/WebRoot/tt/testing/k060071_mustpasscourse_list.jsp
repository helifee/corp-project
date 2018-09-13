<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:select id="sltCourseInfo" name="sltCourseId" list="courseInfoList" size="8"
		listKey="courseId" listValue="courseName" cssClass="span-7" multiple="true"/>
<div id="iteCourseInfo" class="none">
	<s:iterator value="courseInfoList" status="stat">
		<s:hidden id="courseInfoList[%{#stat.index}].courseId" name="courseInfoList[%{#stat.index}].courseId"/>
		<s:hidden id="courseInfoList[%{#stat.index}].courseName" name="courseInfoList[%{#stat.index}].courseName"/>
	</s:iterator>
</div>