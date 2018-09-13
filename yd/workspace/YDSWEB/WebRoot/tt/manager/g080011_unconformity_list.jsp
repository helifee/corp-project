<%--
 * @(#)g080011_unconformity_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理
--%>

<%--
 * 系统维护画面（不整合统计JSP）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/04/21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:hidden id="newChildId" name="newChildId"/>
<s:if test="unconformityCountList.size > 0">
	<table class="datagridtt ellipsis">
		<s:iterator value="unconformityCountList">
			<tr>
				<td class="percent_40 ellipsis">
					<s:label title="%{categoryName}" name="categoryName"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="authority"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="course"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="book"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="exam"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="paper"/>
				</td>
				<td class="percent_10 text_right">
					<s:property value="question"/>
				</td>
			</tr>
		</s:iterator>
	</table>
</s:if>
