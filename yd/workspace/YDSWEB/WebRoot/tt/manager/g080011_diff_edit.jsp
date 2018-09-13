<%--
 * @(#)g080011_diff_edit.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理
--%>

<%--
 * 系统维护画面（区分编辑JSP）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/05/13
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<s:form id="diffEditForm"  method="post" >
<div class="span-10 title_3 text_center ">
	<s:label cssClass=" title_2" value="区分详细"/>
</div>

<div class="span-10 margin_top_6 last">
	<div class="span-2 text_right">
		<s:label value="区分ID" />
	</div>
	<div class="span-8 last">
		<s:property value="typeId"/>
		<s:hidden id="typeId" name="typeId"/>
	</div>
</div>
<div class="span-10 last">
	<div class="span-2 text_right">
		<s:label value="区分名称" />
	</div>
	<div class="span-8 last">
		<s:property value="typeName"/>
		<s:hidden name="typeName"/>
	</div>
</div>
<div class="span-10last">
	<div class="span-2 text_right">
		<s:label value="可选项" />
	</div>
	<div class="span-8 last" >
		<table id="table_diffItem"  class="datagridtt inputTp ellipsis" >
		
			<s:if test="diffList.size > 0" >
				<s:iterator value="diffList" status="sta">
					<tr>
						
						<td class="percent_80 ">
							<s:hidden name="diffNo"/>
							<s:if test='editAutority == 1 && editableFlag'>
								<s:textfield  name="diffName" onchange="changFlag = changFlag + 1;" id="text%{#sta.index}" maxlength="100"   />
							</s:if>
							<s:else>
								<s:hidden name="diffName"/>
								<s:label title="%{diffName}" name="diffName" />
							</s:else>
						</td>
						<td class="percent_20 text_center">
							<s:if test='editAutority == 1 && editableFlag'>
								<input type="button" id="delBtn" class="span-2 btn" value="删除" onclick=""  />
							</s:if>
						</td>
						
					</tr>
				</s:iterator>
			</s:if>
			
		</table>
	</div>
</div>
<s:if test='editAutority == 1'>
<div class="span-10 text_center margin_top_6 last">
	<div class="prepend-2 span-8 last">
		
		<div class="span-1">
			<span class=" img_opt opt_CurUp cur_pointer"
				 onclick="moveDiffUp();" title="上移"></span>
		</div>
		<div class="span-1 ">
			<span class="img_opt opt_CurDown cur_pointer"
				 onclick="moveDiffDown();" title="下移"></span>
		</div>
		<div class="span-2 last">
			<s:if test='typeId.substring(0,1) == "E"'>
			<input  class="span-2 btn" id="createChildBtn" type="button" 
				value="添加" onclick="addNewItem();"/>
			</s:if>
		</div>
	</div>
</div>
<div class="span-10 text_center margin_top_20 last">
	<input class=" span-2 btn" id="createChildBtn" type="button" 
				 onclick="save();" value="保存"/>
	<input class=" span-2 btn" id="createChildBtn" type="button" 
				 onclick="quitEdit();" value="退出"/>
</div>
</s:if>
</s:form>