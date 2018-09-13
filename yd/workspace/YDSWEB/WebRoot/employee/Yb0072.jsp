<%--
 * @(#)Yb0072.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 组内容一览画面
 * 
 * @author fangjiayuan
 * @version 1.00 2010/08/13
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="span-24">
	<div class="span-10 text_left">
		<s:label value="总计：" />
		<s:label id="teamInfosCnt" name="teamInfosCnt" />
		<s:label value="个" />
	</div>
	<div class="span-14 text_right last">
		<input type="button" id="createBtn" name="createBtn" value="新建" class="btn span-2" onclick="createTeamInfo();"/>
	</div>
</div>
<div class="span-24">
	<div class="span-24 box_border overflow_hd margin_top_4">
		<div class="span-24 ">
			<table id="table_teamListHead" class="datagrid2">
				<tr>
					<th class="percent_10">组名</th>
					<th class="percent_6" >组长</th>
					<th class="percent_4">人数</th>
					<th class="percent_26">成员</th>
					<th class="percent_6">属性</th>
					<th class="percent_8">操作</th>
					<th class="percent_8">申请</th>
				</tr>
			</table>
		</div>
		<div id="table_team" class="span-24 overflow_scr_y">
			<div class="span-24 last">
				<table id="table_teamList" class="datagrid2">
					<tbody>
					<s:if test="teamInfoList.size > 0">
						<s:iterator value="teamInfoList" status="stat">
							<tr>
								<td class="percent_10"><s:property value="teamNm" /><s:hidden id="teamId%{#stat.index}" name="teamId" theme="simple"/></td>
								<td class="percent_6 text_center"><s:property value="teamLeaderNm" /><s:hidden id="joinApplyFlg%{#stat.index}" name="joinApplyFlg" theme="simple"/></td>
								<td class="text_right percent_4"><s:property value="userCnt" /></td>
								<td class="percent_26"><s:label id="teamUserNm%{#stat.index}" name="teamUserNm" title="%{teamUserNm}" cssClass="teamUser" /></td>
								<td class="text_center percent_6"><s:property value="teamDiffNm" /></td>
								<td class="percent_8">
									<s:if test="permitFlg == 1">
										<span class="padding_left_4 margin_left_4">
											<s:a href="#this" onclick="modifyTeamInfo(this);">修改</s:a>
										</span>
										<span class="margin_left_4">	
											<s:a href="#this" onclick="deleteTeamInfo(this);">删除</s:a>
										</span>
									</s:if>	
								</td>
								<td class="text_center percent_8">
									<s:if test="applyFlg == 0">
										<span>												
											<input type="button" id="quitBtn${stat.index}" name="quitBtn" value="退出" class="btn span-2" onclick="quitUser(this);"/>
										</span>
									</s:if>
									<s:if test="applyFlg == 3">
										<span>												
											<input type="button" id="quitingBtn${stat.index}" name="quitingBtn" value="退出中" class="btn span-2 disabled" />
										</span>
									</s:if>
									<s:if test="applyFlg == 4">
										<span>												
											<input type="button" id="joiningBtn${stat.index}" name="joiningBtn" value="加入中" class="btn span-2 disabled" />
										</span>
									</s:if>									
									<s:if test="applyFlg == 1">
										<span>	
											<input type="button" id="joinBtn${stat.index}" name="joinBtn" value="加入" class="btn span-2" onclick="joinUser(this);"/>
										</span>
									</s:if>																							
								</td>
							</tr>
						</s:iterator>
					</s:if>		
			        </tbody>
				</table>
			</div>
		</div>
	</div>
</div>
