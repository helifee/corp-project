<%--
 * 试题新建修改画面(答案内容设置部分)
 * 
 * @author wanqiuhong
 * @version 1.00 2010/06/8
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div id="setAnswer" class="bgclr_fff span-10 none">
	
	<!--答题设置-->                        
	<div class="span-10">
		<div class="span-2 text_right">试题题型：</div>
		<div class="span-3">
			<s:select id="answerKindList"  list="answerKindList" name="answerKindList"
			listKey="diffNo" listValue="diffName"  onchange="showdiv(this.value)" />&nbsp;
		</div>
		<div class="span-2 text_right">试题数：</div>
		<div class="span-2 last">
			<s:textfield id="questionNum" name="questionNum" cssClass="span-1 im_disabled" maxlength = "1" />&nbsp;
		</div>
	</div>
	<div class="span-10">
		<div class="span-2 text_right">试题分数：</div>
		<div class="span-2">
			<s:textfield id="answerScore1" maxlength="2" name="answerScore " cssClass="span-1 im_disabled"/> 分
		</div>
		<%--
			<div class="span-3 text_right">题号编辑：</div>
			<div class="span-3 last">
				<s:textfield id="answerQuesNoL" name="answerList.answerQuesNoL" cssClass="span-1"/>
				<s:textfield id="answerQuesNoC" name="answerList.answerQuesNoC" cssClass="span-1"/>
				<s:textfield id="answerQuesNoR" name="answerList.answerQuesNoR" cssClass="span-1"/>
			</div>
		--%>
	</div>
	<div class="span-10 bd_b_1sccc margin_top_4 margin_bottom_4" style="height:1px"></div>
	
	<!--单选题-->
	<div id="setDive1" class="span-10">	
		<div class="span-2 text_right">选项数：</div>
		<div class="span-2">
			<select id="optionNumber1" name="optionNumber">
				<option value="2">2个</option>
				<option value="3">3个</option>
				<option value="4">4个</option>
				<option value="5">5个</option>
				<option value="6">6个</option>
				<option value="7">7个</option>
				<option value="8">8个</option>
				<option value="9">9个</option>
				<option value="10">10个</option>
			</select>&nbsp;
		</div>
		<div class="span-2 text_right">选项表示：</div>
		<div class="span-4 text_left last">
			<s:select id="chooseOptionTypeList1" cssClass="span-4"  list="chooseOptionTypeList" name="chooseOptionTypeList1"
			listKey="diffNo" listValue="diffName" />
		</div>   
	</div>
	
	<!--多选题-->
	<div id="setDive2" class="span-10 none">
		<div class="span-2 text_right">选项数：</div>
		<div class="span-2">
			<select id="optionNumber2" name="optionNumber">
				 <option value="2">2个</option>
				 <option value="3">3个</option>
				 <option value="4">4个</option>
				 <option value="5">5个</option>
				 <option value="6">6个</option>
				 <option value="7">7个</option>
				 <option value="8">8个</option>
				 <option value="9">9个</option>
				 <option value="10">10个</option>
			</select>&nbsp;
		</div>
		<div class="span-2 text_right">选项表示：</div>
		<div class="span-4 text_left last">
			<s:select id="chooseOptionTypeList2" cssClass="span-4"  list="chooseOptionTypeList" name="chooseOptionTypeList2"
			listKey="diffNo" listValue="diffName" />
		</div>   
	</div> 
	                       
	<!--判断题-->
	<div id="setDive3" class="span-10 none">
		<div class="span-2 text_right">选项表示：</div>
		<div class="span-2">
			<s:select id="judgeOptionTypeList"  list="judgeOptionTypeList" name="judgeOptionTypeList"
			listKey="diffNo" listValue="diffName" />
		</div>
	</div>      
	                  
	<!--填空题-->
	<div id="setDive4" class="span-10 none">
		<div class="span-2 text_right">填空数：</div>
		<div class="span-2">
			<select id="blankNumber1" name="blankNumber">
				<option value="1">1个</option>
				<option value="2">2个</option>
				<option value="3">3个</option>
				<option value="4">4个</option>
				<option value="5">5个</option>
				<option value="6">6个</option>
				<option value="7">7个</option>
				<option value="8">8个</option>
				<option value="9">9个</option>
				<option value="10">10个</option>
			</select>
		</div>
	</div>
	
	<!--问答题-->
	<div id="setDive5" class="span-10 none">
	</div>
	
	<!--上传题-->
	<div id="setDive6" class="span-10 none">
	</div>
	<div class="span-11 text_center">
	<input type="button" id="btnChoose" value="确定" onclick="setdiv()" class="btn span-2"/>
	<input type="button" id="btnChoose" value="取消" onclick="closediv()" class="btn span-2"/>
	</div>
</div>
		
			