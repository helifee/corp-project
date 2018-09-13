<%--
 * @(#)k060071_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试详细（管理）的所选考试一览
 * 
 * @author zhangaijun
 * @version 1.00 2010/04/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>	
<%@ taglib prefix="s" uri="/struts-tags"%>
                <!-- 所选试卷一览 -->
                <div class="span-23 overflow_hd margin_top_6 prepend-h ">
                	<div class="span-23 ">
	                    <table class="datagridtt">
	                        <tr>
	                            <th class="percent_8">试卷ID</th>
	                            <th class="percent_12">试卷标题</th>
	                            <th class="percent_8">随机题标识</th>
	                            <th class="percent_16">试卷分类</th>
	                            <th class="percent_8">试卷总分</th>
	                            <th class="percent_8">答题时间</th>
	                            <th class="percent_10">更新日期</th>
	                            <th class="percent_8">状态</th>
                                <th class="percent_8">更新者</th>
	                            <th class="percent_14">操作</th>
	                        	<th class="none">自动判题区分</th>
	                        </tr>
	                    </table>
                    </div>
	                <div class="span-23">
		                <div class="span-23">
		                
			            <table class="datagridtt ellipsis" id="table_paperList">
			            	<tbody>
			            	<s:if test="testPaperInfoList.size > 0">
			                  	<s:iterator value="testPaperInfoList" status="stat">
			                  		<tr>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="paperId"/>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperId" name="testPaperInfoList[%{#stat.index}].paperId" ></s:hidden>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperVersionNo" name="testPaperInfoList[%{#stat.index}].paperVersionNo"></s:hidden>
			                  			</td>
			                  			<td class="percent_12">
			                  				<s:property value="paperTitle"/>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTitle" name="testPaperInfoList[%{#stat.index}].paperTitle" ></s:hidden>
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="randomBigquestFlgNM"/>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].randomBigquestFlgNM" name="testPaperInfoList[%{#stat.index}].randomBigquestFlgNM" ></s:hidden>
			                  			</td>
			                  			<td class="percent_16">
			                  				<s:property value="categoryName" />
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].categoryName" name="testPaperInfoList[%{#stat.index}].categoryName" ></s:hidden>
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:label id="paperTotalScore" name="paperTotalScore" /><s:label  value="分"/>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTotalScore" name="testPaperInfoList[%{#stat.index}].paperTotalScore" ></s:hidden>
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:label id="paperTime" name="paperTime" /><s:label  value="分钟"/>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTime" name="testPaperInfoList[%{#stat.index}].paperTime"></s:hidden>
			                  			</td>
			                  			<td class="percent_10 text_center">
			                  				<s:property value="updateTime" />
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].updateTime" name="testPaperInfoList[%{#stat.index}].updateTime"></s:hidden>
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="paperStatusName" />
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperStatusName" name="testPaperInfoList[%{#stat.index}].paperStatusName"></s:hidden>
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperStatus" name="testPaperInfoList[%{#stat.index}].paperStatus"></s:hidden>
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="updateUserName" />
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].updateUserName" name="testPaperInfoList[%{#stat.index}].updateUserName"></s:hidden>
			                  			</td>
			                  			<td class="percent_14 text_center">
			                  				<!--编辑模式且在编辑中可见-->
                							<s:if test="operatMode == 2 && examineInfo.examineStatus == 1">
			                  				<s:a href="#" onclick="removeSelectedPaper(this)" >移除</s:a>
			                  				</s:if>
				                  			<s:a href="#" onclick="viewSelectedPaper('%{paperId}','%{paperVersionNo}')">查看</s:a>
			                  			</td>
			                  			<td class="none">
			                  				<s:hidden id="testPaperInfoList[%{#stat.index}].autoMarkFlg" name="testPaperInfoList[%{#stat.index}].autoMarkFlg"></s:hidden>
			                  			</td>
			                  		</tr>
			                  	</s:iterator>
			                </s:if>
			            </tbody>        	
			            </table>
			          </div>
		           </div>
               </div>
               
            
