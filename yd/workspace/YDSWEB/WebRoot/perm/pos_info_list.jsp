<%--
 * @(#)pos_info_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>
<%--
 * 部门管理画面（一览部分JSP）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/03/15
 --%>
<%@ page language="java" contentType="text/html; charset=iso8859-1"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
</style>
<div class="span-24 ">
<div class="span-12"><s:label>
	<s:label id="posInfosCnt" value="职位总数:"></s:label>
	<s:label id="posInfoListCnt" name="posInfosCnt"></s:label>
</s:label></div>

<div class="span-12 text_right last "><input
	type="button" id="newBuild" name="newBuild" value="新建"
	class="btn span-2" onclick="AddRow($('table_posList'))" /> <input
	type="button" id="moveUp" name="moveUp" value=" ↑ " class="btn span-2"
	onclick="moveUpRow();" /> <input type="button" id="moveDown"
	name="moveDown" value=" ↓ " class="btn span-2" onclick="moveDownRow();" />
</div>
</div>
<div class="span-24">
<table id="table" class="datagrid2 span-24">
	<tr>
		<th class="percent_8 ">NO</th>
		<th class="percent_8 ">职位ID</th>
		<th class="percent_20 ">职位名称</th>
		<th class="percent_20 ">上级职位</th>
		<th>职位描述</th>
		<th class="percent_8">有效</th>
		<th class="percent_12">操作</th>
	</tr>
</table>
</div>
<div  id="myScoll" class = "overflow_scr_y span-24" style="height:313px">
<table class="none">
	<tr id="cloneTr">
		<td class="text_center percent_8"><s:div id="a1%{#stat.index}">
			<s:property value="#stat.index+1 " />
		</s:div> <s:div id="a2%{#stat.index}" cssClass="none">
			<s:textfield disabled="true" name="p%{#stat.index}"
				id="p%{#stat.index}" cssClass="span-1 text_center" maxlength="4"
				theme="simple" value="#stat.index+1">
			</s:textfield>
		</s:div></td>
		<td class="text_center percent_8"><s:div id="a3%{#stat.index}"
			cssClass="">
			<s:property value="posId" />
		</s:div> <s:div id="a4%{#stat.index}" cssClass="none">
			<s:textfield disabled="true" name=""
				id="posInfoList[%{#stat.index}].posId" cssClass="span-1 text_center"
				maxlength="3" theme="simple" value="%{posId}">
			</s:textfield>
		</s:div></td>
		<td class="text_center percent_20" id="txtName"><s:div
			id="a5%{#stat.index}" cssClass="">
			<s:property value="posName" />
		</s:div> <s:div id="a6%{#stat.index}" cssClass="none">
			<s:textfield disabled="true" name=""
				id="posInfoList[%{#stat.index}].posName"
				cssClass="span-5 text_center" maxlength="20" theme="simple"
				value="%{posName}">
			</s:textfield>
		</s:div></td>
		<td class="text_center percent_20"><s:div id="a7%{#stat.index}"
			cssClass="">
			<s:property value="parentName" />
		</s:div> <s:div id="a8%{#stat.index}" cssClass="none">
			<s:select disabled="true" id="posInfoList[%{#stat.index}].parentPos"
				name="" list="posInfoList" listKey="%{posId}" listValue="%{posName}"
				headerKey="0" headerValue="-----请选择-----">
			</s:select>
		</s:div></td>
		<td class="text_center"><s:div id="a9%{#stat.index}" cssClass="">
			<s:property value="posDesc" />
		</s:div> <s:div id="a10%{#stat.index}" cssClass="none">
			<s:textfield disabled="true" name=""
				id="posInfoList[%{#stat.index}].posDesc"
				cssClass="span-3 text_center" maxlength="200" theme="simple"
				value="%{posDesc}">
			</s:textfield>
			<s:textfield disabled="true" name=""
				id="posInfoList[%{#stat.index}].displaySeq"
				cssClass="none" theme="simple" value="%{#stat.index+1}" >
			</s:textfield>
			<s:textfield disabled="true" name=""
				id="posInfoList[%{#stat.index}].flag"
				cssClass="none" theme="simple" value="0"></s:textfield>
		</s:div></td>
		<td class="text_center percent_8"><s:div cssClass="none">
			<s:textfield disabled="true"
				id="posInfoList[%{#stat.index}].posState" name=""
				cssClass="none" theme="simple"
				value="%{posState}">
			</s:textfield>
		</s:div> <s:if test="posState == 1">
			<s:checkbox disabled="true" id="m%{#stat.index}"
				name="m%{#stat.index}" fieldValue="%{posState}" value="1"
				onclick="selectCheckbox('%{#stat.index}')">
			</s:checkbox>
		</s:if> <s:else>
			<s:checkbox disabled="true" id="m%{#stat.index}"
				name="m%{#stat.index}" fieldValue="%{posState}" value="0"
				onclick="selectCheckbox('%{#stat.index}')">
			</s:checkbox>
		</s:else></td>
		<td class="text_center percent_12"><s:a href="#this"
			onclick="modifyPosInfo('%{#stat.index}')">修改 </s:a></td>
	</tr>
</table>
<table id="table_posList" class="datagrid2 span-24">
	<tbody>
		<s:if test="posInfoList.size > 0">
			<s:iterator value="posInfoList" status="stat">
				<s:if test="posId == posInfoId">
					<tr class="bgclr_f96">
						<td class="text_center percent_8"><s:div
							id="a1%{#stat.index}">
							<s:property value="#stat.index + 1" />
						</s:div> <s:div id="a2%{#stat.index}" cssClass="none">
							<s:textfield disabled="true" name="p%{#stat.index}"
								id="p%{#stat.index}" cssClass="span-1 text_center" maxlength="4"
								theme="simple" value="#stat.index + 1">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_8"><s:div
							id="a3%{#stat.index}" cssClass="">
							<s:property value="posId" />
						</s:div> <s:div id="a4%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posId"
								id="posInfoList[%{#stat.index}].posId"
								cssClass="span-1 text_center" maxlength="3" theme="simple"
								value="%{posId}">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_20" id="txtName"><s:div
							id="a5%{#stat.index}" cssClass="">
							<s:property value="posName" />
						</s:div> <s:div id="a6%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posName"
								id="posInfoList[%{#stat.index}].posName"
								cssClass="span-5 text_center" maxlength="20" theme="simple"
								value="%{posName}">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_20"><s:div
							id="a7%{#stat.index}" cssClass="">
							<s:property value="parentName" />
						</s:div> <s:div id="a8%{#stat.index}" cssClass="none">
							<s:select disabled="true"
								id="posInfoList[%{#stat.index}].parentPos"
								name="posInfoList[%{#stat.index}].parentPos" list="posInfoList"
								listKey="%{posId}" listValue="%{posName}" headerKey="0"
								headerValue="-----请选择-----">
							</s:select>
						</s:div></td>
						<td class="text_center"><s:div id="a9%{#stat.index}"
							cssClass="">
							<s:property value="posDesc" />
						</s:div> <s:div id="a10%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posDesc"
								id="posInfoList[%{#stat.index}].posDesc"
								cssClass="span-3 text_center" maxlength="200" theme="simple"
								value="%{posDesc}">
							</s:textfield>
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].displaySeq"
								id="posInfoList[%{#stat.index}].displaySeq"
								cssClass="none" theme="simple"
								value="%{#stat.index+1}">
							</s:textfield>
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].flag"
								id="posInfoList[%{#stat.index}].flag"
								cssClass="none" theme="simple" value="0">
							</s:textfield>
							
						</s:div></td>
						<td class="text_center percent_8"><s:div
							cssClass="none">
							<s:textfield disabled="true"
								id="posInfoList[%{#stat.index}].posState"
								name="posInfoList[%{#stat.index}].posState"
								cssClass="none" theme="simple"
								value="%{posState}">
							</s:textfield>
						</s:div> <s:if test="posState == 1">
							<s:checkbox disabled="true" id="m%{#stat.index}"
								name="m%{#stat.index}" fieldValue="%{posState}" value="1"
								onclick="selectCheckbox('%{#stat.index}' )">
							</s:checkbox>
						</s:if> <s:else>
							<s:checkbox disabled="true" id="m%{#stat.index}"
								name="m%{#stat.index}" fieldValue="%{posState}" value="0"
								onclick="selectCheckbox('%{#stat.index}')">
							</s:checkbox>
						</s:else></td>
						<td class="text_center percent_8"><s:a href="#this"
							onclick="modifyPosInfo('%{#stat.index}')">修改 </s:a></td>
					</tr>
				</s:if>
				<s:else>
					<tr>
						<td class="text_center percent_8"><s:div
							id="a1%{#stat.index}">
							<s:property value="#stat.index + 1" />
						</s:div> <s:div id="a2%{#stat.index}" cssClass="none">
							<s:textfield disabled="true" name="p%{#stat.index}"
								id="p%{#stat.index}" cssClass="span-1 text_center" maxlength="4"
								theme="simple" value="#stat.index + 1">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_8"><s:div
							id="a3%{#stat.index}" cssClass="">
							<s:property value="posId" />
						</s:div> <s:div id="a4%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posId"
								id="posInfoList[%{#stat.index}].posId"
								cssClass="span-1 text_center" maxlength="3" theme="simple"
								value="%{posId}">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_20" id="txtName"><s:div
							id="a5%{#stat.index}">
							<s:property value="posName" />
						</s:div> <s:div id="a6%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posName"
								id="posInfoList[%{#stat.index}].posName"
								cssClass="span-5 text_center" maxlength="20" theme="simple"
								value="%{posName}">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_20"><s:div
							id="a7%{#stat.index}" >
							<s:property value="parentName" />
						</s:div> <s:div id="a8%{#stat.index}" cssClass="none">
							<s:select disabled="true"
								id="posInfoList[%{#stat.index}].parentPos"
								name="posInfoList[%{#stat.index}].parentPos" list="posInfoList"
								listKey="%{posId}" listValue="%{posName}" headerKey="0"
								headerValue="-----请选择-----">
							</s:select>
						</s:div></td>
						<td class="text_center"><s:div id="a9%{#stat.index}">
							<s:property value="posDesc" />
						</s:div> <s:div id="a10%{#stat.index}" cssClass="none">
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].posDesc"
								id="posInfoList[%{#stat.index}].posDesc"
								cssClass="span-3 text_center" maxlength="200" theme="simple"
								value="%{posDesc}">
							</s:textfield>
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].displaySeq"
								id="posInfoList[%{#stat.index}].displaySeq"
								cssClass="none" theme="simple"
								value="%{#stat.index+1}">
							</s:textfield>
							<s:textfield disabled="true"
								name="posInfoList[%{#stat.index}].flag"
								id="posInfoList[%{#stat.index}].flag"
								cssClass="none" theme="simple" value="0">
							</s:textfield>
						</s:div></td>
						<td class="text_center percent_8"><s:div
							cssClass="none">
							<s:textfield disabled="true"
								id="posInfoList[%{#stat.index}].posState"
								name="posInfoList[%{#stat.index}].posState"
								cssClass="none" theme="simple"
								value="%{posState}">
							</s:textfield>
						</s:div> <s:if test="posState == 1">
							<s:checkbox disabled="true" id="m%{#stat.index}"
								name="m%{#stat.index}" fieldValue="%{posState}" value="1"
								onclick="selectCheckbox('%{#stat.index}')">
							</s:checkbox>
						</s:if> <s:else>
							<s:checkbox disabled="true" id="m%{#stat.index}"
								name="m%{#stat.index}" fieldValue="%{posState}" value="0"
								onclick="selectCheckbox('%{#stat.index}')">
							</s:checkbox>
						</s:else></td>
						<td class="text_center percent_12"><s:a href="#this"
							onclick="modifyPosInfo('%{#stat.index}')">修改 </s:a></td>
					</tr>
				</s:else>
			</s:iterator>
		</s:if>
	</tbody>
</table>
</div>
<div class="prepend-20 span-4 "><input type="button"
	id="refer" name="refer" value="提交" class="btn span-2"
	onclick="submitPosInfo()" /> <input type="button" id="cancle"
	name="cancle" value="取消" class="btn span-2" onclick="cancel()" /></div>