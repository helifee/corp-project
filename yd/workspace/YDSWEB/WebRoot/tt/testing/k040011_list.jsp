<%--
 * 题库检索画面（一览部分JSP）
 * 
 * @author liangkezhen
 * @version 1.00 2010/03/22
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<table id="k040011List" class="datagridtt span-24 ellipsis">
	<tr>
		<s:if test="questionUiModel != 1">	
			<th class="percent_4 text_center"><input type="checkbox" name="checkboxAll" id="selAll" value="checkbox" onclick="selectAll();"></th>
		</s:if>
		<th class="percent_8">试题ID</th>
		<th class="percent_12">分类</th>
		<th class="percent_8">关键字</th>
		<th class="percent_20">题型/难度/题数/分数/参照ID</th>
		<th class="percent_6">创建者</th>
		<th class="percent_6">更新者</th>
		<th class="percent_8">更新日期</th>
		<th class="percent_14">试题内容</th>
		<th class="percent_6">状态</th>
		<s:if test="questionUiModel == 1">
			<th class="percent_12">操作</th>
		</s:if>
	</tr>
	<s:hidden id="itemCount" value="%{questLibrList.size}"></s:hidden>
	<s:if test="questLibrList.size > 0">
		<s:iterator value="questLibrList" status="stat" id="k411qll">
			<tr class="odd">
				<s:if test="questionUiModel != 1">	
					<td class="text_center">
						<input id="questionSelected${stat.index}" name="paperSelected" type="checkbox" onclick="selectOneItem(${stat.index})"/>
					</td>
				</s:if>
				<td  class=" text_center" id="questionId${stat.index}">
					<s:hidden name="questionId" />
					<s:if test="questionUiModel != 1">	
						<s:property  value="questionId"/>
					</s:if><s:else>
						<a href="#" onclick="initQuesViewAndCheckMode(this)">
							<s:property  value="questionId"/>
						</a>
					</s:else>
				</td>
				<td ><s:label title="%{categoryName}" name="categoryName"/></td>
				<td ><s:label title="%{keyword}" name="keyword"/></td>
				<td>
					<s:property value="questionKindName" />/
					<s:property value="questionDifficultyName" />/
					<s:property value="questionNumber" />/
					<s:if test="questionScore!=null">
						<s:property value="questionScore" />分
					</s:if>/
					<%--
					<s:if test="questionTimes!=null">
						<s:property value="questionTimes" />次
					</s:if>/
					<s:if test="rightPercent!=null">
						<s:property value="rightPercent" />%
					</s:if>/
					 --%>
					<s:property value="refQuestionId" />
				</td>
				<td class=" text_center">
					<s:property value="createUserName" />
				</td>
				<td class=" text_center">
					<s:property value="updateUserName" />
				</td>
				<td class=" text_center"><s:date name="updateTime" id="updateTimeFormat" format="yyyy-MM-dd"/>
					<s:property value="updateTime" />
				</td>
				<td class="">
					<div id="rtfContent${stat.index}" class="none">${questionContent}</div>
					<s:label id="content%{#stat.index}" name="questionContent" title="%{questionContent}"/>
				</td>
				<!-- <td class="percent_4">
					<s:if test="pictureFlg == 2">
						<img src="../../images/tt/image.gif" style="width:15px; height:15px"/>
					</s:if>
					<s:if test="mediaFlg == 2">
						<img src="../../images/tt/yinpin.gif" style="width:15px; height:15px"/>
					</s:if>
					<s:if test="attachFlg == 2">
						<img src="../../images/tt/fujian.gif" style="width:15px; height:15px"/>
					</s:if>
				</td> -->
				<td class=" text_center">
					<s:property value="checkFlagName" />
				</td>
				<s:if test="questionUiModel == 1">
					<td class="text_center">
						<s:url action="k040021InitReferenceQuesMode" id="k421ReferenceUrl">
							<s:param name="questionVersionNo" value="%{#k411qll.questionVersionNo}"></s:param>
							<s:param name="questionId" value="%{#k411qll.questionId}"></s:param>
						</s:url><s:a href="%{k421ReferenceUrl}">参照</s:a>
						<s:url action="k040021InitUpdateQuesMode" id="k421UpdateUrl">
							<s:param name="questionId" value="%{#k411qll.questionId}"></s:param>
							<s:param name="callScreenId" value="'K040011'"></s:param>
						</s:url><s:a href="%{k421UpdateUrl}">修改</s:a>
						<s:url	action="k040051InitQuesViewAndCheckMode" id="k451DeleteUrl">
							<s:param name="mode" value="3"></s:param>
							<s:param name="callScreenId" value="'K040011'"></s:param>
							<s:param name="queId" value="%{#k411qll.questionId}"></s:param>
						</s:url><s:a href="%{k451DeleteUrl}">删除</s:a>
						<s:if test="checkFlg == 1">
							<s:url action="k040051InitQuesViewAndCheckMode" id="k451CheckUrl">
								<s:param name="mode" value="2"></s:param>
								<s:param name="callScreenId" value="'K040011'"></s:param>
								<s:param name="queId" value="%{#k411qll.questionId}"></s:param>
							</s:url><s:a href="%{k451CheckUrl}">核对</s:a>
						</s:if><s:else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</s:else>
					</td>
				</s:if>
			</tr>
		</s:iterator>
	</s:if>
</table>
<div class="span-24 text_center">
	<s:include	value="../../common/pagerNavigation.jsp" />
</div>
<div id="errorMessage" class="prepend-2" >
	<s:fielderror cssClass="list_reset color_red"/>
</div>
<!--检索一览区域End-->
<div class="span-24 margin_top_6">
	<div class="text_center margin_top_6">
		<s:if test="questLibrList.size > 0 && questionUiModel != 1">
			<input type="button" id="btnLastChoose" class="span-2 btn"  value="选择" onclick="btnChooseClick();"/>				
		</s:if>
	</div>
</div>	
