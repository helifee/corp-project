<%--
 * 题库检索画面（视图部分JSP）
 * 
 * @author liangkezhen
 * @version 1.00 2010/03/22
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
	<s:form id="questionForm" action="k040011GetQuestionList" validate="true">
		<div class="span-24 margin_top_6">
			<!--试题类型-->
			<div class="span-2 text_right">试题类型：</div>
			<div class="span-2 text_left">
				<s:select id="qbtList" cssClass="span-2" name="searchInfo.questionType" list="questionTypeList"
					listKey="diffNo" listValue="diffName" />
			</div>
			<!--分类-->
			<div class="span-2 text_right">试题分类：</div>
			<div class="span-9 text_left">
				<select id="sltCategory1" name="category1Id1" type="category1Id" class="span-3" defaultValue="${category1Id}" accesskey="${sltCategory1Enable}" onchange="getKeyword(this.value)">
				</select>
				<select id="sltCategory2" name="category2Id1" type="category2Id" class="span-3" defaultValue="${category2Id}" accesskey="${sltCategory2Enable}">
				</select>
				<select id="sltCategory3" name="category3Id1" type="category3Id" class="span-3" defaultValue="${category3Id}" accesskey="${sltCategory3Enable}">
				</select>
			</div>
			<!--关键字-->
			<div class="span-2 text_right">关键字：</div>
			<div class="span-6 text_left">
				<s:textfield id="keyword"  name="searchInfo.keyword" cssClass="span-3" maxlength="200" />
				<!--  <input type="button" id="btnKeyChoose" class="span-2 btn"  value="选择" onclick="keywordChoose();"  /> -->
			</div>

			<div class="clear_both"></div>
		</div>
		<div class="span-24 margin_top_6">
			<!--核对状态-->
			<div class="span-2 text_right">核对状态：</div>
			<div class="span-2 text_left">
				<s:select id="cfList" cssClass="span-2" name="searchInfo.checkFlg" list="checkFlgList" listKey="diffNo" listValue="diffName" />
			</div>
			<!--试题题型：-->
			<div class="span-2 text_right">试题题型：</div>
			<div class="span-2 text_left">
				<s:select id="qkList" cssClass="span-2" name="searchInfo.questionKind" list="questionKindList" listKey="diffNo" listValue="diffName" />
			</div>
			<!--试题难度-->
			<div class="span-2 text_right">试题难度：</div>
			<div class="span-2 text_left">
				<s:select id="qdList" cssClass="span-2" name="searchInfo.questionDifficulty" list="questionDifficultyList" listKey="diffNo" listValue="diffName"/>
			</div>
			<!--试题分数：-->
			<div class="span-2 text_right">试题分数：</div>
			<div class="span-4 text_left">
				<s:textfield id="scoreDown" name="searchInfo.scoreDown" maxlength="3" cssClass="span-1"/>分 ～
				<s:textfield id="scoreUp" name="searchInfo.scoreUp" maxlength="3" cssClass="span-1" />分
			</div>
			<div class="clear_both"></div>
		</div>
		<div class="span-24 margin_top_6">
			<div class="span-2 text_right">创建者：</div>
			<!--创建者-->
			<div class="span-5 text_left">
				<s:textfield id="createUserId" name="searchInfo.createUserId" 
					maxlength="6" cssClass="span-2"/>
				<s:textfield id="createUserNm" 
					maxlength="30" cssClass="span-2"/>
			</div>
			<div class="span-2 text_right">更新者：</div>
			<!--更新者-->
			<div class="span-5 text_left">
				<s:textfield id="updateUserId" name="searchInfo.updateUserId" 
					maxlength="6" cssClass="span-2"/>
				<s:textfield id="updateUserNm" 
					maxlength="30" cssClass="span-2"/>
			</div>
			<div class="span-8 text_right">
				<input type="button" id="refer" class="span-2 btn" name="refer" value="检索" onclick="getQuestionInfo();"/>
				<input type="button" id="btnClear" class="span-2 btn" name="clear" value="清空" onclick="clearItems();"/>
			</div>
			<div class="clear_both"></div>
		</div>
		<s:hidden id="questionUiModel" name="questionUiModel" ></s:hidden>
		<s:hidden id="questionType" name="questionType" ></s:hidden>
	</s:form>