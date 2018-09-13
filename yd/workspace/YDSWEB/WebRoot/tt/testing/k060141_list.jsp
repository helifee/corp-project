<%--
 * @(#) k060141_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 课程选择一览画面（一览部分JSP）
 * @author liyanrui
 * @version 1.00 2010/03/30
--%>

<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<table id="pagerList" class="datagridtt overflow_auto margin_top_10 ellipsis">
	<s:fielderror cssClass="text_left"/>
	<tr>
		<th class="percent_4">
			<input id="selectAll" type="checkbox" onclick="selectAll()" />
		</th>
		<th class="percent_10">课程ID</th>
		<th class="percent_30">课程名称</th>
		<th class="percent_20">课程分类</th>
		<th>课程简介</th>
	</tr>
	<s:hidden id="itemCount" value="%{searchInfoList.size}"></s:hidden>
	<s:if test="searchInfoList.size > 0">
		<s:iterator value="searchInfoList" status="stat">
			<tr class="odd">    
				<td class="text_center">
					<input id="itemSelected${stat.index}" name="testSelected" type="checkbox" onClick="selectOneItem(${stat.index})"/>
				</td>
				<td  class="text_center">
				<s:label  id="courseId%{#stat.index}" name="courseId"/>
				</td>
				<td class="text_left">
					<s:label title="%{courseName}" id="courseName%{#stat.index}" name="courseName"/>
				</td>
				<td class="text_left">
					<s:label title="%{categoryName}" id="categoryName" name="categoryName"/>
				</td>
				<td class="text_left">
					<s:label title="%{courseAbstract}" id="courseAbstract" name="courseAbstract"/>
				</td>
			</tr>
		</s:iterator>
	</s:if>
</table>
<div class="span-20 margin_top_6 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>
<div class="span-20 margin_top_6 text_center">
	<input type="button"  value="选择" 
		class="btn span-2 text_center" onclick="addCourse();"/>
</div>
