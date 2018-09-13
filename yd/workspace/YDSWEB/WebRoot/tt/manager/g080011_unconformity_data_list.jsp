<%--
 * @(#)g080011_unconformity_data_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理
--%>

<%--
 * 系统维护画面（不整合数据一览JSP）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/05/17
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<table id=""  class="datagridtt ellipsis" >
		
	<s:if test="unconformityDataInfoList.size > 0" >
		<s:iterator value="unconformityDataInfoList" status="sta">
			<tr>
				<td class="percent_14 text_center">
					<s:property value="objectId"/>
				</td>
				<td class="percent_30 ellipsis">
					<s:label title="%{objectName}" name="objectName"/>
				</td>
				<td class="percent_10 text_center">
					<s:property value="objectType"/>
				</td>
				<td class="percent_30 ellipsis">
					<s:label title="%{categoryName}" name="categoryName"/>
				</td>
				<td class="percent_16 text_center">
					<s:date name="createTime" id="createTimeFormat" format="yyyy-MM-dd" />
					<s:property value="%{createTimeFormat}" />
				</td>
			</tr>
		</s:iterator>
	</s:if>
	
</table>

<div class="span-15 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>	