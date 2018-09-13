<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=path %>/js/ttTesting/k040051.js"></script>
	
	<title>试题预览核对删除</title>
</head>
<body>
	<div class="container">
		<s:if test="mode == 2 || mode == 3 || mode == 4 || mode == 5">
		<s:include value="../manager/head.jsp" />
		</s:if>
		<div class="span-24 margin_top_2">
			<div class="tt_module padding_bottom_4 overflow_hd">
			<s:if test="mode == 2 || mode == 3 || mode == 4 || mode == 5">
				<s:include value="../manager/navigator.jsp" />
			</s:if>
			<div class="padding_top_8 title_tt span-24">
			<s:if test="mode == 1 || mode == 6 || mode == 7">
				<h2>试题预览</h2>
			</s:if>
			<s:elseif test="mode == 4 || mode == 8 || mode == 9 || mode == 10 || mode == 11">
				<h2>试题确认</h2>
			</s:elseif>
			<s:elseif test="mode == 2 || mode == 5">
				<h2>试题核对</h2>
			</s:elseif>
			<s:elseif test="mode == 3">
				<h2>试题删除</h2>
			</s:elseif>
			</div>
			<div><s:actionerror/></div>
			<s:form id="K040051Form" action="" >
				<s:hidden id="itemSize" value="%{questionInfo.size}"/>
				<s:hidden id="jsonQueIdList" name="jsonQueIdList"/>
				<s:hidden id="queId" name="queId"/>
				<s:hidden id="mode" name="mode"/>
				<s:hidden id="paperId" name="paperId"/>
				<s:hidden id="callScreenId" name="callScreenId"/>
				<s:if test="questionInfo.size > 0">
					<s:iterator value="questionInfo" status="stat">
					<div class="span-24 margin_top_6">
	                	<div class="span-1 text_right">
	                		<s:if test="questionInfo.size > 1"><s:property value="#stat.index+1"/></s:if>
	                		<s:else>&nbsp;</s:else>
	                	</div>
	                    <div class="span-22 bd_1sb4"><!--
	                    	<div class="span-2 title_3">试题属性</div>
	                        -->
	                        <div class="span-22">
	                            <div class="span-2 text_right">试题ID：</div>
	                            <!--试题ID-->
	                            <div class="span-2 text_left">
	                            	<s:property value="questionId"/>
								</div>
	                            <div class="span-2 text_right">参照试题ID：</div>
	                            <!--参照试题ID-->
	                            <div class="span-2 text_left">
	                            	<s:label id="refQuestionId" name="refQuestionId"/>
	                            	&nbsp;
	                            </div>
	                         	<div class="span-2 text_right">分类：</div>
	                            <!--分类-->
	                            <div class="span-7 text_left ellipsis">
	                            	<s:label name="categoryName" title="%{categoryName}"/>
	                            </div>
	                        </div>
	                        <div class="span-22  margin_top_2">
	                            <div class="span-2 text_right">试题来源：</div>
	                            <!--试题来源-->
	                            <div class="span-6 text_left ellipsis">
	                            	<s:label name="questionSource" title="%{questionSource}"/>
	                            	&nbsp;
	                            </div>
	                            <div class="span-2 text_right">关键字：</div>
	                            <!--关键字-->
	                            <div class="span-7 text_left ellipsis">
	                            	<s:label name="keyword" title="%{keyword}"/>
	                            </div>
	                        </div>
	                        <div class="span-22 margin_top_2">
	                        	<div class="span-2 text_right">试题状态：</div>
	                            <!--试题状态-->
	                            <div class="span-2 text_left">
	                            	<s:label id="changeDiv%{#stat.index}" name="checkFlagName"/>
	                            </div>
	                            <div class="span-2 text_right">试题类型：</div>
	                            <!--试题类型-->
	                            <div class="span-2 text_left">
	                            	<s:property value="questionTypeName"/>
	                            </div>
	                            <div class="span-2 text_right">试题难度：</div>
	                            <!--试题难度-->
	                            <div class="span-2 text_left">
	                            	<s:property value="questionDifficultyName"/>
	                            </div>
	                            <div class="span-2 text_right">试题分数：</div>
	                            <!--试题分数-->
	                            <div class="span-2 text_left">
	                            	<s:property value="questionScore"/><s:label>分</s:label>
	                            </div>
	                        </div>
	                        <div class="span-22 margin_top_2">
	                            <div class="span-2 text_right">创建者：</div>
	                            <!--创建者-->
	                            <div class="span-2 text_left">
	                            	<s:property value="createUserName"/>
	                            </div>
	                            <div class="span-2 text_right">创建日期：</div>
	                            <!--创建时间-->
	                            <div class="span-2 text_left">
	                            	<!-- <s:date name="createTime" format="yyyy/MM/dd" /> -->
	                            	<s:property value="createTime"/>
	                            </div>
	                            <div class="span-2 text_right">更新者：</div>
	                            <!--更新者-->
	                            <div class="span-2 text_left">
	                            	<s:property value="updateUserName"/>
	                            </div>
	                            <div class="span-2 text_right">更新日期：</div>
	                            <!--更新时间-->
	                            <div class="span-2 text_left">
	                            	<!--<s:date name="updateTime" format="yyyy/MM/dd" />-->
	                            	<s:property value="updateTime"/>
	                            </div>
	                        </div>
	                        <div class="span-21 margin_left_10 bd_b_1s666 bdwd_b_thick"></div>
	                    	<div class="span-2 title_3">试题内容</div>
	                        <!--试题1-->
	                        <div class="span-20 prepend-1">
	                        	${questionContent}
	                        </div>
	                        <div class="span-21 margin_left_10 bd_b_1s666 bdwd_b_thick"></div>
	                    	<div class="span-2 title_3">试题答案</div>
	                    	<div class="span-22">
	                            <div class="span-2 text_center">题号</div>
	                            <div class="span-5 text_center">答案</div>
	                            <div class="span-2 text_center">分值</div>
	                            <div class="span-2 text_center">题型</div>
	                            <div class="span-2 text_center">选项数</div>
	                            <div class="span-2 text_center">填空数</div>
	                            <div class="span-3 text_center">选项类型</div>
	                            <div class="span-3 text_center">得分点</div>
	                        </div>
	                        <s:iterator value="answerInfoList" status="stat1">
		                        <div class="span-22 margin_top_2">
		                        <s:hidden name="questionInfo[%{#stat.index}].answerInfoList
		                        	[%{#stat1.index}].answerSerialNo"></s:hidden>
		                        <div class="span-2 text_center">
		                        	<s:property value="answerSerialNo"/>
								</div>
		                        <div class="span-5 text_center">
		                        	<s:if test="answerContentView == '' || null == answerContentView">
		                            	<s:label>-</s:label>
		                            </s:if>
		                            <s:else>
		                            	<s:if test="answerType == 6">
			                  				<input type="button"  value="下载标准答案" 
												class="btn" onclick="downloadFile('${answerContentView}')" />
		                            	</s:if>
		                            	<s:else>
		                            		<s:property value="answerContentView" escape="false"/>
		                            	</s:else>
		                            </s:else>
		                        </div>
		                        <div class="span-2 text_center">
		                            <s:property value="answerScore"/><s:label>分</s:label>      
								</div>
								<div class="span-2 text_center">
									<s:if test="answerTypeName == null">
		                            	<s:label>-</s:label>
		                            </s:if>
		                            <s:else>
		                            	<s:property value="answerTypeName"/>  
		                            </s:else>
		                        </div>
		                        <div class="span-2 text_center">
		                        	<!--单选或多选时才显示-->
		                            <s:if test="answerType == 1 || answerType == 2 ">
		                            	<s:property value="optionNumber"/>
		                            </s:if>
		                            <s:else>
		                            	<s:label>-</s:label>
		                            </s:else>
		                        </div>
		                        <div class="span-2 text_center">
		                        	<!--填空时才显示-->
		                            <s:if test="answerType == 4">
		                            	<s:property value="blankNumber"/>
		                            </s:if>
		                             <s:else>
		                            	<s:label>-</s:label>
		                            </s:else>
		                        </div>
		                        <div class="span-3 text_center">
		                        <s:if test="optionTypeName == null">
		                            	<s:label>-</s:label>
		                            </s:if>
		                            <s:else>
		                            	<s:property value="optionTypeName"/>
		                            </s:else>
		                        </div>
		                        <div class="span-3 text_center">
		                            <s:if test="answerPointInfoList.size > 0">
		                            <s:iterator value="answerPointInfoList" status="stat2">
		                            	<s:if test="pointContent != null">
				                            <s:property value="pointContent"/>
				                            <s:label> </s:label>
				                            <s:property value="pointScore"/>
				                            <s:label>%</s:label>
				                            <br>
			                            </s:if>
			                            <s:else>
		                            		<s:label>-</s:label>
		                            	</s:else>
		                            </s:iterator>
		                            </s:if>
		                            <s:else>
		                            	<s:label>-</s:label>
		                            </s:else>
		                        </div>
		                    </div>
		                </s:iterator>
					<div class="span-21 margin_left_10 bd_b_1s666 bdwd_b_thick"></div>
	                <div class="span-22 margin_top_10 margin_bottom_10 text_center">
                    	<s:if test=" mode == 2 || mode == 5 ">
                        	<input type="button" id="ckPass${stat.index}" value="核对通过" 
								class="btn span-2" onclick="checkPass('${stat.index}')" />
						</s:if>
						<%--
							<s:if test=" mode == 2">
								<input type="button"  value="修改" 
									class="btn span-2" onclick="updateQuestion('${stat.index}')" />
							</s:if>
						--%>
	               	</div>
	                </div>
				</div>
				<s:hidden id="questionId%{#stat.index}" name="questionInfo[%{#stat.index}].questionId"></s:hidden>
	            <s:hidden id="newFlg%{#stat.index}" name="questionInfo[%{#stat.index}].newFlg"></s:hidden>
	            <s:hidden id="questionVersionNo%{#stat.index}" name="questionInfo[%{#stat.index}].questionVersionNo"></s:hidden>
	            <s:hidden id="questionTimes%{#stat.index}" name="questionInfo[%{#stat.index}].questionTimes"></s:hidden>
	            <s:hidden id="checkFlg%{#stat.index}" name="questionInfo[%{#stat.index}].checkFlg"></s:hidden>             
	            <s:hidden id="updateTime%{#stat.index}" name="questionInfo[%{#stat.index}].updateTimeFlag"></s:hidden>
	        </s:iterator>
			</s:if>
			</s:form>
			<div class="span-24 margin_top_10 text_center">
				<s:if test=" mode == 4 || mode == 8 || mode == 9 || mode == 10 || mode == 11 || mode == 5">
	                <input type="button"  value="确认" 
						class="btn span-2" onclick="confirmBtn()" />
				</s:if>
				<s:if test=" mode == 3">
	            	<input type="button"  value="删除" 
						class="btn span-2" onclick="deleteBtn()" />
					</s:if>
	            </div>
		</div>
		</div>
	<s:if test="mode == 2 || mode == 3 || mode == 4 || mode == 5">
	<s:include value="../manager/foot.jsp" />
	</s:if>
		</div>
	</body>
</html>