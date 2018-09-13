<%--
 * 试题新建修改画面(答案设置模板部分)
 * 
 * @author wanqiuhong
 * @version 1.00 2010/06/8
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!--答案模板-->
<div class="none">
	<div id="answerDiv" class="span-24">
		<div class="span-3">
		<!--答案复选框-->
		<input type="checkbox" id="asCheckbox" name="asCheckbox"/>								
		<!--答案编号-->
		<s:label id="answerSerialNo" name="answerSerialNo" cssClass="span-1"  />.
		<!--答案题号-->	
		<!-- <s:textfield id="answerQuesNo" name="answerQuesNo" cssClass="span-1" /> -->
		<!--答案分数-->
		<s:label id="answerScore" name="answerScore" cssClass="span-1"/>分     
		</div>
	</div>
	<div>
		<!--单选题-->
		<div id="radioDiv" class="span-2">
			<!--画面端选项表示方式-->
			<s:label id="opType" name="opType" cssClass="span-1"/>.
			<!--单选按钮-->
			<span><input type="radio" name="radiobutton" value="radiobutton" class="span-1" /></span>                                     
		</div>
		
		<!--多选题-->
		<div id="multyDiv" class="span-2">
			<!--画面端选项表示方式-->
			<s:label id="opType" name="opType" cssClass="span-1"/>.
			<!--多选按钮-->
			<span><input type="checkbox" name="multySelected" value="multySelected" class="span-1" /></span>    
		</div>
		
		<!--填空题-->
		<div id="textDiv" class="span-4">
			<s:textfield id="answerText" name="answerText" cssClass="span-3 text_left" />
		</div>
		
		<!--问答题-->
		<div id="askDiv" class="span-10">
			<s:textarea cols="100" id="answerContext" name="answerContext" rows="5" />			                   	 	
			<input type="button" value="追加得分点" onclick="addPoint(this)" class="btn span-2"/>
			<input type="button" value="删除得分点" onclick="delPoint(this)" class="btn span-2"/>
			<s:hidden id="answerPointsize" name="answerPointsize"/>
			<div id="answerPointDiv" class="span-8 margin_top_2">
				<s:if test="answerList[%{#stat.index}].answerPointInfoList.size > 0">
					<s:iterator value="answerList" status="stat">
					</s:iterator>
				</s:if>
			</div>
		</div>
		
		<!--上传题-->
		<div id="upDiv" class="span-10">
			<div class="span-13">	
				<div class="span-11">
					<input type="file" id="attachFile" name="attachFile" onPropertyChange="$('filetext').value=this.value" class="jsFileInput cur_pointer" hidefocus />          
					<input id="filetext" name="filetext" class="span-11" readonly/>
				</div>
				<div class="span-2 last">
					<input type="button" id="btnUpload" value="浏览..." onmouseover="inputMouseover(event)" class="btn span-2"/>
				</div>
			</div>      
			<input type="button" value="追加得分点" onclick="addPoint(this)" class="btn span-2"/>
			<input type="button" value="删除得分点" onclick="delPoint(this)" class="btn span-2"/>
			<s:hidden id="answerPointsize" name="answerPointsize"/>
			<div id="answerPointDiv" class="span-8 margin_top_2">
				<s:if test="answerList[%{#stat.index}].answerPointInfoList.size > 0">
					<s:iterator value="answerList" status="stat">
					</s:iterator>
				</s:if>
			</div>      	
		</div>
		
		<!--分数及隐藏项-->
		<div id="otherDiv" class="percent_2">			             
			<!--答案题型-->
			<s:hidden id="answerType" name="answerType"/>
			<!--选项表示方式-->
			<s:hidden id="optionType" name="optionType"/>
			<!--选项数-->
			<s:hidden id="optionNumber" name="optionNumber"/>	                        	
			<!--填空数-->
			<s:hidden id="blankNumber" name="blankNumber"/>
			<!--字数限制-->
			<s:hidden id="wordLimits" name="wordLimits"/>
		</div>
	</div>	
	
	<!--得分点-->
	<div id="clonePointDiv">
		<!--得分点选框-->
		<input type="checkbox" id="poitCheckbox" name="poitCheckbox"/>
		<!--得分点内容-->				            
		<s:textfield id="pointC" name="pointC" cssClass="span-4" />
		<!--得分点分数-->				            
		<s:textfield id="pointS" name="pointS" cssClass="span-1" />% 
	</div>
</div>	        
	