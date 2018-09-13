<%--
 * @(#)J030021_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 教育考试系统
--%>

<%--
 * 教材一览画面（一览部分JSP）
 * 
 * @author sundefu
 * @version 1.00 2010/03/23
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-23">
    <s:if test="mode == 2">
    	<s:if test="courseManager == true">
        <div class="span-23 append-18 margin_top_4">       
			<input type="button" id="createBook" name="createBook" value="新建教材" onclick="createNewBook()" class="span-2 btn"/>
 		</div>
        </s:if>
    </s:if>
    <div class="span-20 text_center margin_top_4">
	<table id="pagerCommonList" class="datagridtt ellipsis">
	     <tr>
		     <s:if test="mode == 1">
		         <th class="percent_4">
			         	<input id="selectAll" type="checkbox" onclick="selectAllBooks()"/>
		         </th>
		     </s:if>
	         <th class="percent_8">教材ID</th>
	         <th class="">教材名称</th>
	         <th class="percent_16">教材分类</th>
	         <s:if test="mode == 2">
	         	<th class="percent_8">教材状态</th>
	         </s:if>
	         <th class="percent_8">创建者</th>
	         <th class="percent_8">更新者</th>
	         <th class="percent_10">更新日期</th>
	         <s:if test="mode == 2">
	         	<th class="percent_16">操作</th>
	         </s:if>
	         
	    </tr>
	    <s:hidden id="itemCount" value="%{bookInfoList.size}"></s:hidden>
        <s:if test="bookInfoList.size > 0">
			<s:iterator value="bookInfoList" status="stat">
				<tr class="">
					<s:if test="mode == 1">
						<td class="text_center"><input id="itemSelected${stat.index}" name="bookSelected" type="checkbox" onClick="selectOneItem(${stat.index})"/></td>
					</s:if>
					<s:if test="bookIdShowFlg == 1">
						<td class="text_center" id="itemId${stat.index}"><s:a href="#" onclick="openBook('%{bookId}')"><s:property value="bookId"/></s:a></td>
					</s:if>
					<s:if test="bookIdShowFlg != 1">
						<td class="text_center" id="itemId${stat.index}"><s:property value="bookId" /></td>
					</s:if>					
					<td class="text_left">
						<s:label title="%{bookName}" name="bookName"/>
					</td>
					<td class="text_left">
						<s:label title="%{categoryName}" name="categoryName"/>
					</td>
					<s:if test="mode == 2">
						<td class="text_center"><s:property value="statusName" /></td>
					</s:if>
					<td class="text_center"><s:property value="createUserName" /></td>
					<td class="text_center"><s:property value="updateUserName" /></td>
					<td class="text_center"><s:property value="updateTime" /></td>					
					<s:if test="mode == 2">
	                    <td class="text_center">
	                    	<s:if test="manageFlg == 1">
								<s:a href="#" onclick="manageBook('%{bookId}')">管理</s:a> 
							</s:if>
							<s:if test="manageFlg != 1">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</s:if>
	                    	<s:if test="editFlg == 1">
	                    		<s:a href="#" onclick="editBook('%{bookId}')">编辑</s:a>
	                    	</s:if>
	                    	<s:if test="editFlg != 1">
	                    		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	                    	</s:if>
							<s:if test="approveFlg == 1">
								<s:a href="#" onclick="approveBook('%{bookId}')">审批</s:a>
							</s:if>
							<s:if test="approveFlg == 0">
								<s:a href="#" onclick="approveBook('%{bookId}')">查看</s:a>
							</s:if>
							<s:if test="approveFlg != 0 && approveFlg != 1">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</s:if>
							<s:if test="deleteFlg == 1">
								<s:a href="#" onclick="deleteBook('%{bookId}')">删除</s:a>
							</s:if>
							<s:if test="deleteFlg != 1">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</s:if>
						</td>
	                </s:if> 
				</tr>
			</s:iterator>
		</s:if>
	</table>
	</div>
	<div class="span-2 last">
	</div>
	<s:if test="mode == 1">
		<div class="span-23" >
           	<input type="button" id="addToCourse" name="addToCourse" value="加入课程" onclick="addToCourse()" class="span-2 btn"/>
        </div>
   	</s:if>
    <div class="span-23 text_center">
		<s:include	value="../../common/pagerNavigation.jsp" />
	</div>
<div id="errorMessage" class="prepend-2 span-20">
	<s:fielderror></s:fielderror>
</div>
</div>