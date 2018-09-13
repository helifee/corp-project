<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>	
	<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/ttTesting/k050051.js"></script>
	
	<title>试卷查看</title>
</head>
<body onload="initPage()" onunload="closeAllSubwin()">
<div class="container">
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd">
		<s:include value="../manager/navigator.jsp" />
			<div class="container showgrid">
			<div class="span-24 padding_top_8 title_tt">
				<h2>试卷查看</h2>
			</div>
			<s:form id="K050051Form" action="" >
						
				<div class="span-23">
					<!--试卷状态-->
					<div class="span-3 text_right">
						<s:label id="paperStatus" value="状态："/>
					</div>
					<div class="span-10 text_left">
						<s:property value="testPaperInfo.paperStatusName"/>
					</div>
				</div>
				<div class="span-23">
					<!--试卷ID-->
					<div class="span-3 text_right">
						<s:label id="paperId" value="试卷ID："/>
					</div>
					<div class="span-10 text_left">
						<s:label id="testPaperInfo.paperId" name="testPaperInfo.paperId"/>
					</div>
				</div>
				<div class="span-23">
					<!--试卷标题-->
					<div class="span-3 text_right">
						<s:label id="paperTitle" value="试卷标题："/>
					</div>
					<div class="span-10 text_left">
						<s:property value="testPaperInfo.paperTitle"/>
					</div>
				</div>
				<div class="span-23">
					<!--试卷说明-->
					<div class="span-3 text_right">
						<s:label id="paperComment" value="试卷说明："/>
					</div>
					<div class="span-10 text_left">
						<s:textarea cssClass="span-9" rows="2" readonly="true" name="testPaperInfo.paperComment"/>
					</div>
				</div>
				<div class="span-23">
                    <!--试卷概要-->
                    <div class="span-3 text_right">
                    	<s:label id="paperTime" value="试卷概要："/>
                    </div>
                    <div class="span-10 text_left">
                        <s:textarea cssClass="span-9" rows="2" readonly="true" name="testPaperInfo.paperDescription"/>
                    </div>
                </div>
				<div class="span-23">
					<!--试卷类型-->
                    <div class="span-3 text_right">
                    	<s:label id="paperType" value="试卷类型："/>
                    </div>
                    <div class="span-5 text_left">
                    	<s:property value="testPaperInfo.paperTypeName"/>
                    </div>
				</div>
				<div class="span-23">
					<!--试卷分类-->
					<div class="span-3 text_right">
						<s:label id="paperCategory" value="试卷分类："/>
					</div>
					<div class="span-10 text_left">
						<s:property value="testPaperInfo.categoryName"/>
					</div>
				</div>
                <div class="span-23">
                    <div class="span-3 text_right">
                    	<s:label id="paperTotalScore" value="试卷总分："/>
                    </div>
                    <div class="span-1 text_center">
                    	<s:property value="testPaperInfo.paperTotalScore"/>
                    </div>
                    <div class="span-1 text_left">
						<s:label id="points" value="分"/>
					</div>
                </div>
                <div class="span-23">
                    <div class="span-3 text_right">
                    	<s:label id="paperTime" value="答题时间："/>
                    </div>
                    <div class="span-1 text_center">
                     	<s:property value="testPaperInfo.paperTime"/>
                    </div>
                    <div class="span-1 text_left">
		           		<s:label id="minutes" value="分钟"/> 
		 			</div>
                </div>
                <!--画面隐藏项目-->
                <s:hidden id= "hidMode" name="mode"></s:hidden>
                <s:hidden id= "hidPaperType" name="testPaperInfo.paperType"></s:hidden>
                <s:hidden id= "hidPaperStatus" name="testPaperInfo.paperStatus"></s:hidden>
                <s:hidden id ="paperSize" name ="paperBigQueInfo.size" />
                <s:iterator value="paperBigQueInfo" status="stat">
              		<s:hidden id ="queInfoSize_%{#stat.index}" name ="stableQueInfoList.size" />
                	<s:hidden name="bigquestionSerialNo"></s:hidden>
                	<div class="none span-23 margin_top_6 prepend-h module_ii listColor_ii" id="module_1">
                	<s:if test="bigquestionType == 1">
                    	<div class="moduleHeader_ii" id="module_1_head" onclick="resize1('${stat.index}')">
                    		<a id="modifyIcon1${stat.index}" class="img_opt opt_FillDown"></a>
							<span class="text_left" id="module_1_text">
                        		题型：<s:property value="questionKindName"/>   
                      			标题：<s:property value="bigquestionTitle"/>    
                      			数量：<s:property value="questionNum"/>    
                      		 	总分：<s:property value="bigquestionTotalScore"/>   
                      			 大题类别：<s:property value="bigquestionTypeName"/>    
                      		</span>
                       	</div> 
                    	<div class="module_body_ii" id="module_1_body${stat.index}"> 
                        	<div class="span-20 overflow_scr_y">
                            	<table class="datagridtt">
                                	<tr>
                                    	<th class="percent_10"><span>试题ID</span></th>
										<th class="percent_16"><span>分类</span></th>
										<th class="percent_10"><span>关键字</span></th>
										<th class="percent_8"><span>试题难度</span></th>
										<th class="percent_8"><span>试题数</span></th>
										<th class="percent_8"><span>试题分数</span></th>
										<!-- <th class="percent_8"><span>出题次数</span></th> -->
										<!-- <th class="percent_6"><span>正确率</span></th> -->
										<th class="percent_10"><span>更新时间</span></th>
										<th><span>试题内容</span></th>
										<!-- <th class="" colspan="2"><span>功能按钮</span></th> -->
                                	</tr>
                            	</table>
							</div>
                        	<div class="clear_both"></div>
                         	<div class="overflow_scr_y">
                            	<div class="span-20 line6">
                                	<table class="datagridtt ellipsis" id="tbl">
                                		<s:if test="stableQueInfoList.size > 0">
                                		<s:iterator value="stableQueInfoList" status="stat1">
                                    		<tr>
												<td class="percent_10 text_center">
                                        			<s:property value="questionId"/>
                                        			<s:hidden id="questionId[%{#stat1.index}]" name="questionId"/>
												</td>
                                        		<td class="percent_16 text_left">
                                        			<s:label title="%{categoryName}" name="categoryName"/>
                                        		</td>
                                        		<td class="percent_10 text_left">
                                        			<s:label title="%{keyword}" name="keyword"/>
                                        		</td>
                                        		<td class="percent_8 text_center">
                                        			<s:property value="questionDifficultyName"/>
                                        		</td>
                                        		<td class="percent_8 text_right">
                                        			<s:property value="questionNumber"/>
                                        		</td>
                                        		<td class="percent_8 text_right"> 
                                        			<s:property value="questionScore"/>
                                        		</td>
                                        		<!--   <td class="percent_8 text_right">
                                        			<s:property value="questionTimes"/>
                                        		</td> -->
                                       	 		<!--  <td class="percent_6 text_right">
                                        			<s:property value="rightTimes"/>
                                        		</td> -->
                                        		<td class="percent_10 text_center">
                                        			<s:property value="updateTime"/>
                                        		</td>
                                        		<td class="text_left">
                                        			<div id="rtfContent${stat1.index}" class="none">${questionContent}</div>
													<s:label title="content" name="questionContent"/>
                                        		</td>
                                        		<!--
                                        		<s:if test="pictureFlg == 2">
													<td class="percent_2"><img src="../../images/tt/practice.bmp" style="width:15px; height:15px"/></td>
												</s:if>
												<s:else>
													<td class="percent_2"><div style="width:15px; height:15px"></div></td>
												</s:else>
												<s:if test="mediaFlg == 2">
													<td class="percent_2"><img src="../../images/tt/yinpin.gif" style="width:15px; height:15px"/></td>
												</s:if>
												<s:else>
													<td class="percent_2"><div style="width:15px; height:15px"></div></td>
												</s:else>
												<s:if test="attachFlg == 2">
													<td class="percent_2"><img src="../../images/tt/fujian.gif" style="width:15px; height:15px"/></td>
												</s:if>
												<s:else>
													<td class="percent_2"><div style="width:15px; height:15px"></div></td>
												</s:else>
												-->
                                    		</tr> 
                                     	</s:iterator>
                   					 	</s:if> 
                                	</table>
                            	</div>
                        	</div>
                    	</div>
                    </s:if> 
                </div> 
                <div class="none span-23 margin_top_6 prepend-h module_ii listColor_ii" id="module_2">
                <s:if test="bigquestionType == 2">
                    <div class="none moduleHeader_ii" id="module_2_head"  onclick="resize2('${stat.index}')"> 
                        <a id="modifyIcon2${stat.index}" class="img_opt opt_FillDown"></a>
							<span class="text_left" id="module_1_text">
                        		题型：<s:property value="questionKindName"/>   
                      			标题：<s:property value="bigquestionTitle"/>    
                      			数量：<s:property value="questionNum"/>    
                      		 	总分：<s:property value="bigquestionTotalScore"/>   
                      			 大题类别：<s:property value="bigquestionTypeName"/>    
                      		</span> 
                    </div> 
                    <div class=" none module_body_ii" id="module_2_body${stat.index}"> 
                        <div class="span-20 overflow_scr_y">
                            <table class="datagridtt">
                                <tr>
                                    <th class="percent_8">序号</th>
                                    <th class="percent_30">试题分类</th>
                                    <th class="percent_20">关键字</th>
                                    <th class="percent_8">试题难度</th>
                                    <th class="percent_8">试题数量</th>
                                    <th class="percent_8">出题数量</th>
                                    <th class="">试题分数</th>
                                </tr>
                            </table>
                        </div>
                        <div class="clear_both"></div>
                        <div class="overflow_scr_y">
                            <div class="span-20 line3">
                                <table class="datagridtt" id="tbl">
                                <s:if test="randomQueInfoList.size > 0">
                				<s:iterator value="randomQueInfoList" status="stat2">
                                    <tr>
                                        <td class="percent_8 text_center">
                                        	<s:property value="conditionSerialNo"/>
                                        </td>
                                        <td class="percent_30 text_left">
                                        	<s:label title="%{categoryName}" name="categoryName"/>
                                        </td>
                                        <td class="percent_20 text_left">
                                        	<s:label title="%{keyword}" name="keyword"/>
                                        </td>
                                        <td class="percent_8 text_center">
                                        	<s:property value="questionDifficultyName"/>
                                        </td>
                                        <td class="percent_8 text_right">
                                        	<s:property value="questionNum"/>
                                        </td>
                                        <td class="percent_8 text_right">
                                        	<s:property value="questionNum"/>
                                        </td>
                                        <td class="text_right">
                                        	<s:property value="questionScore"/>
                                        </td>
                                    </tr> 
                                    </s:iterator>
                    				</s:if> 
                                </table>
                            </div>
                        </div>
                    </div> 
                    </s:if> 
                </div>
				</s:iterator>
				<s:if test="testPaperInfo.mode == 8">
	                <div class="span-23  margin_top_6">
	                    <div class="span-3 text_right">不批准理由：</div>
	                    <!--不批准理由-->
	                    <div class="span-18 text_left">
	                    	<s:textarea id="txtRefuseReason"cssClass="span-12" rows="3" name="testPaperInfo.refuseReason"/>
	                    </div>
	                </div>
                </s:if>
                <div class="clear_both"></div>
    			<s:hidden name="testPaperInfo.mode" value="testPaperInfo.mode"></s:hidden>
                <div class="span-23 prepend-h margin_top_6 text_center">
                    <input type="button" class="span-2 btn" 
                        onclick="testPreview();"  value="试卷预览"/>

                    <s:if test="testPaperInfo.mode == 8 && testPaperInfo.paperStatus == 2">
                    <input type="button"  class="span-2 btn" onclick="approve();" value="批准"/>
                    <input type="button"  class="span-2 btn" onclick="disApprove()" value="不批准"/>
                    </s:if>
                    <s:if test="testPaperInfo.mode == 3">
                    <input type="button"  class="span-2 btn" onclick="deleteTestPager();" value="删除试卷"/>
                    </s:if>
                </div>
                <s:hidden id="hidPaperId" name="testPaperInfo.paperId"></s:hidden>
                <s:hidden id="hidPaperVersionNo" name="testPaperInfo.paperVersionNo"></s:hidden>
            </s:form>
			<div class="clear_both"></div>
			<div class="span-23 prepend-h margin_top_6 margin_bottom_10 err text_left">
				<!--error区域-->
            </div>
		</div>
	</div>
	</div>
	<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>
