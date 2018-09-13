<%--
 * 试题新建修改画面(答案内容编辑部分)
 * 
 * @author wanqiuhong
 * @version 1.00 2010/06/8
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24">
	<div class="span-8 prepend-2 text_left">
		<input type="button" id="addAnswer" value="追加" onclick="pop()" class="btn span-2"/>
		<input type="button" id="deleteAnswer" value="删除" onclick="deleteDiv()" class="btn span-2"/>
    </div>
</div>
<div class="clear_both"></div>
<!--答案长度-->
<s:hidden id="answersize" name="answersize"/>
<div id="answerEditDiv" class="prepend-2"> 
	<s:if test="answerList.size > 0">	                	
		<s:iterator value="answerList" status="stat">
			<div id="answerDiv${stat.index}" class="span-24">
				<div class="span-3">
				<!--答案复选框-->
				<input type="checkbox" id="asCheckbox${stat.index}" name="asCheckbox${stat.index}"/>
				<!--答案编号-->
				<s:label id="answerList[%{#stat.index}].answerSerialNo" name="answerSerialNo" cssClass="span-1"/>. 
				<!--答案题号-->	 
				<!--<s:textfield id="answerQuesNo_%{#stat.index}" name="answerList[%{#stat.index}].answerQuesNo" cssClass="span-1" />-->
				<!--答案分数-->
          		<s:label id="answerList[%{#stat.index}].answerScore" name="answerScore" cssClass="span-1" keep="1"/>分    
     			</div>
     		
	       		<!--单选题-->
	   			<s:if test="answerType == 1 && answerContentList.size > 0">
					<s:iterator value="answerContentList" status="answerStat">
						<div id="radioDiv${stat.index}_${answerStat.index}" class="span-2">
	   						 <!--画面端选项表示方式-->
				             <s:label id="opType_%{#stat.index}" name="answerContentName" cssClass="span-1"/>.
				             <!--单选按钮-->
				             <span><input type="radio" id="answerContent_${answerStat.index}" name="answerList[${stat.index}].answerContent" value="${answerStat.index}"   class="span-1" 
	         
								<s:if test="answerContent == 1">
		               				 checked="checked"
		               			</s:if>
	               			/></span> 							                         
	      				</div>								                
					</s:iterator>															                						                	 
				</s:if>
	   
	      		<!--多选题-->
	      		<s:if test="answerType == 2 && answerContentList.size > 0">
					<s:iterator value="answerContentList" status="answerStat">
						<div id="multyDiv${stat.index}_${answerStat.index}" class="span-2">
						   	 <!--画面端选项表示方式-->
				             <s:label id="opType_%{#stat.index}" name="answerContentName" cssClass="span-1"/>.
				             <!--多选按钮-->
				             <span><input type="checkbox" id="answerContent_${answerStat.index}" name="answerList[${stat.index}].answerContent" value="${answerStat.index}"   class="span-1" 
	       
								<s:if test="answerContent == 1">
						              checked="checked"
						        </s:if>
						     /></span> 							                         
						      </div>								                
					</s:iterator>															                						                	 
				</s:if>	
	   
				<!--判断题-->
				<s:if test="answerType == 3 && answerContentList.size > 0">
					<s:iterator value="answerContentList" status="answerStat">
						<div id="radioDiv${stat.index}_${answerStat.index}" class="span-2">
							<!--画面端选项表示方式-->
							<s:label id="opType_%{#stat.index}" name="answerContentName" cssClass="span-1"/>.
							<!--单选按钮-->
							<span><input type="radio" id="answerContent_${answerStat.index}" name="answerList[${stat.index}].answerContent" value="${answerStat.index}" class="span-1" 
							         
							<s:if test="answerContent == 1">
				                checked="checked"
				               </s:if>
			               /></span> 							                         
						</div>								                
					</s:iterator>															                						                	 
				</s:if>
	     
				<!--填空题-->
				<s:if test="answerType == 4 && answerContentList.size > 0">
					<s:iterator value="answerContentList" status="answerStat">
						<div id="textDiv${stat.index}_${answerStat.index}" class="span-4 margin_top_2">
							<s:textfield id="answerContent_%{#answerStat.index}" name="answerList[%{#stat.index}].answerContentList[%{#answerStat.index}].answerContent" cssClass="span-3 text_left" />							                         
						</div>								                
					</s:iterator>															                						                	 
				</s:if>
	
				<!--问答题-->
				<s:if test="answerType == 5">
					<div id="askDiv${stat.index}" class="span-10 margin_top_4">
						<s:textarea cols="100" id="answerContent_%{#stat.index}" name="answerList[%{#stat.index}].answerContent" rows="5" />			                   	 	
						<input type="button" value="追加得分点" onclick="addPoint(this)" class="btn span-2"/>
						<input type="button" value="删除得分点" onclick="delPoint(this)" class="btn span-2"/>
						<s:hidden id="answerPointsize_%{#stat.index}" name="answerPointsize"/>
						<div id="answerPointDiv_${stat.index}" class="span-8 margin_top_2">
							<s:if test="answerPointInfoList.size > 0">
								<s:iterator value="answerPointInfoList" status="ptStat">
									<div id="clonePointDiv${stat.index}_${ptStat.index}">
										<!--得分点选框-->
										<input type="checkbox" id="poitCheckbox${stat.index}_${ptStat.index}" name="poitCheckbox"/>
										<!--得分点内容-->		
                                        <s:textfield id="pointContent" name="pointContent" cssClass="span-4" />	
										<!--得分点分数-->		     
										<s:textfield id="pointScore" name="pointScore" cssClass="span-1" />%
									</div>
								</s:iterator>
							</s:if>
						</div>
					</div>												                						                	 
				</s:if>
	
				<!--上传题-->
				<s:if test="answerType == 6">
					<div id="upDiv${stat.index}" class="span-10 margin_top_4">
						<a href="K060091.jsp"><s:property value="answerList[%{#stat.index}].attachFile"/></a>
						<div class="span-13">	
							<div class="span-11">
								<input type="file" id="attachFile_${stat.index}" name="answerList[${stat.index}].attachFile" onChange="$('filePath_${stat.index}').value=this.value" class="jsFileInput cur_pointer" hidefocus />          
								<s:textfield id="filePath_%{#stat.index}" name="answerList[%{#stat.index}].attachFilePath" cssClass="span-11" readonly="true" keep="1"/>
							</div>
							<div class="span-2 last">
								<input type="button" id="btnUpload" value="修改附件" onmouseover="inputMouseover(event)" class="btn span-2"/>
							</div>
						</div>  
						<input type="button" value="追加得分点" onclick="addPoint(this)" class="btn span-2"/>
						<input type="button" value="删除得分点" onclick="delPoint(this)" class="btn span-2"/>									            
						<s:hidden id="answerPointsize_%{#stat.index}" name="answerPointsize"/>
						<div id="answerPointDiv_${stat.index}" class="span-8 margin_top_2">
							<s:if test="answerPointInfoList.size > 0">
								<s:iterator value="answerPointInfoList" status="ptStat">
									<div id="clonePointDiv${stat.index}_${ptStat.index}">
										<!--得分点选框-->
										<input type="checkbox" id="poitCheckbox${stat.index}_${ptStat.index}" name="poitCheckbox"/>
										<!--得分点内容-->		
                                        <s:textfield id="pointContent" name="pointContent" cssClass="span-4" />	
										<!--得分点分数-->		     
										<s:textfield id="pointScore" name="pointScore" cssClass="span-1" />%
									</div>
								</s:iterator>
							</s:if>
						</div>
					</div>													                						                	 
				</s:if>
	
				<!--分数及隐藏项-->
				<div id="otherDiv${stat.index}" class="percent_2">			              
				<!--答案题型-->
				<s:hidden id="answerType_%{#stat.index}" name="answerList[%{#stat.index}].answerType"/>
				<!--选项表示方式-->
				<s:hidden id="optionType_%{#stat.index}" name="answerList[%{#stat.index}].optionType"/>
				<!--选项数-->
				<s:hidden id="optionNumber_%{#stat.index}" name="answerList[%{#stat.index}].optionNumber"/>	                        	
				<!--填空数-->
				<s:hidden id="blankNumber_%{#stat.index}" name="answerList[%{#stat.index}].blankNumber"/>
				<!--字数限制-->
				<s:hidden id="wordLimits_%{#stat.index}" name="answerList[%{#stat.index}].wordLimits"/>
				</div>				                 
			</div>							
		</s:iterator>	                	
	</s:if>
</div>  

	