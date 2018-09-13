<%--
 * @(#)j030121_testlist.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
--%>

<%--
 * 插入练习画面（子页面JSP）
 * 
 * @author shiyanyan
 * @version 1.00 2010/05/14
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<div class="span-20 showgrid">
	<s:form id="TestForm" method="post"  >
        <!--插入练习一览-->
        <table class="datagridtt ellipsis">
	  		<tr>
        		<th class="percent_10 text_center"><span>练习ID</span></th>
            	<th class="percent_24 text_center"><span>练习名称</span></th>
            	<th class="percent_20 text_center"><span>练习分类</span></th>
            	<th class="percent_10 text_center"><span>更新日期</span></th>
            	<th class="percent_10 text_center"><span>更新者</span></th>
            	<th class="text_center" colspan="3"><span>操作</span></th>
        	</tr>
	    	<!-- 练习一览 -->		   
	    	<s:iterator value="testPaperInfos" status="stat">
	    		<tr>
	    			<td class="text_center">
	    				<s:url action="../testing/k060031InitPracticeViewMode?ifViewChange=0&" id="gotoPageActionUrl">
							<s:param name="paperId" value="%{paperId}"></s:param>
						</s:url>
       				 	<s:a href="%{gotoPageActionUrl}" target="_blank"><s:property value="paperId"/></s:a>
	    			</td>
	    			<td><s:label title="%{paperTitle}" name="paperTitle"/></td>
	    			<td><s:label title="%{categoryName}" name="categoryName"/></td>
	    			<td><s:property value="updateTime"/></td>
	    			<td class="text_center"><s:property value="updateUserName"/></td>
	    			<td class="text_center"><a href="#" onclick="deleteTest('${paperId}','${paperVersionNo}')">删除</a></td>
	    			<td class="text_center"><a href="#" onclick="editTest('${paperId}')">编辑</a></td>
	    			<td class="text_center"><a href="#" onclick="recommendTest('${paperId}','${paperTitle}')">引用</a></td>
	    		</tr>
	    	</s:iterator>
	  </table>      
	</s:form>	
</div>  
