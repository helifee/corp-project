<%--
 * @(#)Ye0051.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *      SubSystem: 考勤系统
--%>

<%--
 * 考勤更正一览画面
 * 
 * @author pengchuan
 * @version 1.00 2010/12/03
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="span-24">
	<div  class="span-24">
			<div class="span-4 text_left">
				<span>总计：</span><s:label id="cnt" name="cnt"/><span>&nbsp;件</span>
			</div>
			<s:hidden id="loginId" value="%{#session.userinfo.userId}"></s:hidden>
			<div class="last text_right">
					<input type="button" value="考勤更正" class="span-2 btn color_blue" onclick="herfAttCorrect()" />
			</div>
	</div>
	<div  class="span-24 box_border">
		<div class="span-24">
			<table id="table_attCorInfoHead" class="datagrid5">
			 <tr>
					<th rowspan="2" class="percent_6">申请人</th>
					<th rowspan="2" class="percent_6">部门</th>
					<th rowspan="2" class="percent_8">项目组</th>
					<th rowspan="2" class="percent_8">考勤日期</th>
					<th rowspan="2" class="percent_12">打卡时间</th>
					<th colspan="2" class="percent_24">考勤时间</th>
					<th rowspan="2" class="percent_10">理由</th>
					<th colspan="2" class="percent_8">意见</th>
					<th rowspan="2" class="percent_6">结论</th>
					<th rowspan="2" class="percent_12">操作</th>
			</tr>
			<tr>
					  <th class="">变更前</th>
					  <th class="">变更后</th>
					  <th class="">组长</th>
					  <th class="">部长</th>
			</tr>
			</table>
		</div>	
		<div class="span-24 overflow_scr_y">
		  <div class="span-24">
			<table id="table_attCorInfoList" class="datagrid2 text_center">	
				<s:if test="attCorInfoList.size > 0">
					<s:iterator value="attCorInfoList" >
						<tr>
						    <td  class="text_left percent_6"><s:property value="appEmpNm" /></td>
							<td  class="text_left percent_6 "><s:property value="orgNm" />
								<s:hidden name="appId"></s:hidden>
								<s:hidden name="appEmpId"></s:hidden>
								<s:hidden name="aftStartTimeDate"></s:hidden>
								<s:hidden name="aftEndTimeDate"></s:hidden>
							</td>
							<td  class="text_left percent_8"><s:property value="proNm" /> </td>
							<td  class="percent_8"><s:property value="attTime" /></td>
							<s:if test="cardStartTime !='' && cardEndTime !=''">
								<td  class="text_left percent_12 ">
									<s:if test="cardStartTime.substring(8,10) == attTime.substring(8,10) && cardEndTime.substring(8,10) == attTime.substring(8,10)">
										<s:property value="cardStartTime.substring(10,16)" />&nbsp;&nbsp;～
									    <s:property value="cardEndTime.substring(10,16)" />
									</s:if>
									<s:elseif test="cardStartTime.substring(8,10) == attTime.substring(8,10) && cardEndTime.substring(8,10) != attTime.substring(8,10)">
										  <s:property value="cardStartTime.substring(10,16)" />&nbsp;&nbsp;～
										  <s:property value="cardEndTime.substring(10,16)" /><span class=" color_red">*</span>
									</s:elseif>
									<s:elseif test="cardStartTime.substring(8,10) != attTime.substring(8,10) && cardEndTime.substring(8,10) != attTime.substring(8,10)">
										  <s:property value="cardStartTime.substring(10,16)" /><span class=" color_red">*</span>～ 
										  <s:property value="cardEndTime.substring(10,16)" /><span class=" color_red">*</span>
									</s:elseif>
								</td>
							</s:if>
							<s:elseif test="cardStartTime !='' && cardEndTime ==''">
								<td  class="text_left percent_12 ">
									<s:if test="cardStartTime.substring(8,10) != attTime.substring(8,10)">
										<s:property value="cardStartTime.substring(10,16)" /><span class=" color_red">*</span>～ 
									</s:if>
									<s:else>
										<s:property value="cardStartTime.substring(10,16)" />&nbsp;&nbsp;～
									</s:else>
								</td>
							</s:elseif>
							<s:elseif test="cardStartTime =='' && cardEndTime ==''">
								<td  class="percent_12"><span>～ </span>&nbsp;&nbsp;&nbsp;</td>
							</s:elseif>
							<s:if test="befStartTime !='' && befEndTime !=''">
								<td  class="text_left percent_12">
									<s:if test="befStartTime.substring(8,10) == attTime.substring(8,10) && befEndTime.substring(8,10) == attTime.substring(8,10)">
										<s:property value="befStartTime.substring(10,16)" />&nbsp;&nbsp;～
									    <s:property value="befEndTime.substring(10,16)" />
									</s:if>
									<s:elseif test="befStartTime.substring(8,10) == attTime.substring(8,10) && befEndTime.substring(8,10) != attTime.substring(8,10)">
										  <s:property value="befStartTime.substring(10,16)" />&nbsp;&nbsp;～
										  <s:property value="befEndTime.substring(10,16)" /><span class=" color_red">*</span>
									</s:elseif>
									<s:elseif test="befStartTime.substring(8,10) != attTime.substring(8,10) && befEndTime.substring(8,10) != attTime.substring(8,10)">
										  <s:property value="befStartTime.substring(10,16)" /><span class=" color_red">*</span>～ 
										  <s:property value="befEndTime.substring(10,16)" /><span class=" color_red">*</span>
									</s:elseif>
								</td>
							</s:if>
							<s:elseif test="befStartTime !='' && befEndTime ==''">
								<td  class="text_left percent_12 ">
									<s:if test="befStartTime.substring(8,10) != attTime.substring(8,10)">
										<s:property value="befStartTime.substring(10,16)" /><span class=" color_red">*</span>～ 
									</s:if>
									<s:else>
										<s:property value="befStartTime.substring(10,16)" />&nbsp;&nbsp;～
									</s:else>
								</td>
							</s:elseif>
							<s:else>
								<td  class="percent_12"><span>～ </span>&nbsp;&nbsp;&nbsp;</td>
							</s:else>
							<td  class="text_left percent_12">
									<s:if test="aftStartTime.substring(8,10) == attTime.substring(8,10) && aftEndTime.substring(8,10) == attTime.substring(8,10)">
										 <s:if test="aftStartTime.substring(0,16) != cardStartTime.substring(0,16)">
											<span class="color_red"><s:property value="aftStartTime.substring(10,16)" /></span>
										 </s:if>
										 <s:else><span><s:property value="aftStartTime.substring(10,16)" />&nbsp;</span></s:else>&nbsp;&nbsp;～
									     <s:if test="aftEndTime.substring(0,16) != cardEndTime.substring(0,16)">
											<span class="color_red"><s:property value="aftEndTime.substring(10,16)" /></span>
										 </s:if>
										<s:else><span><s:property value="aftEndTime.substring(10,16)" /></span></s:else>
								   </s:if>
								   <s:elseif test="aftStartTime.substring(8,10) == attTime.substring(8,10) && aftEndTime.substring(8,10) != attTime.substring(8,10)">
										  <s:if test="aftStartTime.substring(0,16) != cardStartTime.substring(0,16)">
											<span class="color_red"><s:property value="aftStartTime.substring(10,16)" /></span>
										  </s:if>
										  <s:else><span><s:property value="aftStartTime.substring(10,16)" />&nbsp;</span></s:else>&nbsp;&nbsp;～
										  <s:if test="aftEndTime.substring(0,16) != cardEndTime.substring(0,16)">
											 <span class="color_red"><s:property value="aftEndTime.substring(10,16)" /></span>
										  </s:if>
										  <s:else><span><s:property value="aftEndTime.substring(10,16)" /></span></s:else><span class=" color_red">*</span>
								  </s:elseif>
								  <s:elseif test="aftStartTime.substring(8,10) != attTime.substring(8,10) && aftEndTime.substring(8,10) != attTime.substring(8,10)">
										 <s:if test="aftStartTime.substring(0,16) != cardStartTime.substring(0,16)">
											<span class="color_red"><s:property value="aftStartTime.substring(10,16)" /></span>
										 </s:if>
										 <s:else><span><s:property value="aftStartTime.substring(10,16)" /></span>&nbsp;</s:else><span class=" color_red">*</span>～
										 <s:if test="aftEndTime.substring(0,16) != cardEndTime.substring(0,16)">
											<span class="color_red"><s:property value="aftEndTime.substring(10,16)" /></span>
										 </s:if>
										<s:else><span><s:property value="aftEndTime.substring(10,16)" /></span>&nbsp;</s:else><span class=" color_red">*</span>
								</s:elseif>
					        </td>
							<td  class="text_left percent_10">
							         <s:if test="correctReason.length() >= 6">
										<s:property value="correctReason.substring(0,5)" />
									  </s:if>
									  <s:else><s:property value="correctReason" /></s:else>
							</td>
							<td  class="percent_4">
								<s:if test='appStatus == "1" ||appStatus == "2" '>
									<s:if test='attExaminList.size == "1"'>
											<s:if test='attOrg == "prjt" || attOrg==null'>待</s:if>
											<s:else>—</s:else>
									</s:if>
									<s:else>
										<s:if test='attExaminList[0].exaResult == null'>待</s:if>
										<s:else>
											<s:if test='attExaminList[0].exaResult == "0"'>否</s:if>
											<s:elseif test='attExaminList[0].exaResult == "1"'>批</s:elseif>
											<s:else>
												<s:property value="attExaminList[0].exaResult" />
											</s:else>
										</s:else>	
									</s:else>
								</s:if>
								<s:else>
										<s:if test='attExaminList.size == "1"'>
											<s:if test='attOrg == "prjt" || attOrg==null'>
												<s:if test='attExaminList[0].exaResult == "0"'>否</s:if>
												<s:elseif test='attExaminList[0].exaResult == "1"'>批</s:elseif>
												<s:else>
													<s:property value="attExaminList[0].exaResult" />
												</s:else>
											</s:if>
											<s:else>—</s:else>
										</s:if>
										<s:else>
											<s:if  test='attExaminList[0].exaResult != null'>
												<s:if test='attExaminList[0].exaResult == "0"'>否</s:if>
												<s:elseif test='attExaminList[0].exaResult == "1"'>批</s:elseif>
												<s:else>
													<s:property value="attExaminList[0].exaResult" />
												</s:else>
										    </s:if>
											<s:else>—</s:else>
										</s:else>	
								</s:else>
							</td>
							<td  class="percent_4">
								<s:if test='appStatus == "1" ||appStatus == "2" '>
									<s:if test='attExaminList.size == "1"'>
											<s:if test='attOrg == "dept" || attOrg==null'>待</s:if>
											<s:else>—</s:else>
									</s:if>
									<s:else>
										<s:if test='attExaminList[0].exaResult != null'>待</s:if>
										<s:if test='attExaminList[1].exaResult != null'>
											<s:if test='attExaminList[1].exaResult == "0"'>否</s:if>
											<s:elseif test='attExaminList[1].exaResult == "1"'>批</s:elseif>
											<s:else>
												<s:property value="attExaminList[1].exaResult" />
											</s:else>
										</s:if>		
									</s:else>
								</s:if>
								<s:else>
										<s:if test='attExaminList.size == "1"'>
												<s:if test='attOrg == "dept" || attOrg==null'>
													<s:if test='attExaminList[0].exaResult == "0"'>否</s:if>
													<s:elseif test='attExaminList[0].exaResult == "1"'>批</s:elseif>
													<s:else>
														<s:property value="attExaminList[0].exaResult" />
													</s:else>
												</s:if>
												<s:else>—</s:else>
										</s:if>
										<s:else>
											<s:if test='attExaminList[1].exaResult != null'>
												<s:if test='attExaminList[1].exaResult == "0"'>否</s:if>
												<s:elseif test='attExaminList[1].exaResult == "1"'>批</s:elseif>
												<s:else>
													<s:property value="attExaminList[1].exaResult" />
												</s:else>
											</s:if>
											<s:else>—</s:else>
										</s:else>	
								</s:else>
							</td>
							<td class="percent_6">
								<s:property value="appStatusNm" />
							</td>
							<td class="text_left percent_12">
							 <s:a href="#this" onclick="display(this)">查看</s:a>
							 <s:if test='attPermitFlag == "1"'>
								 <s:if test='appStatus == "1"'>
									 <s:if test='attExaminList.size == "1"'>
										<s:if test='attFlag == "1"'>
											<s:a href="#this" onclick="agreeMent(this)">同意</s:a>
								            <s:a href="#this" onclick="disAgreeMent(this)">不同意</s:a>
									   </s:if>
									</s:if>
									<s:else>
										<s:if test='attFlag == "1"'>
											 <s:a href="#this" onclick="agreeMent(this)">同意</s:a>
											 <s:a href="#this" onclick="disAgreeMent(this)">不同意</s:a>
										</s:if>
									</s:else>
								 </s:if>
								 <s:else>
									 <s:if test='appStatus == "2"'>
									     <s:if test='attFlag == "1"'>
											<s:a href="#this" onclick="agreeMent(this)">同意</s:a>
								            <s:a href="#this" onclick="disAgreeMent(this)">不同意</s:a>
									   </s:if>
									 </s:if>
								 </s:else>
							 </s:if>
							</td>
						</tr>
					</s:iterator>			
				</s:if>
			</table>
		 </div>
	  </div>
	</div>
	<div  class="span-24">
		<div class="last text_right">
			<s:label name="notations" value="带*表示翌日时刻"/>
		</div>
	</div>
	<s:hidden id="appEmpNm"></s:hidden>
	<s:form id="attCorInfo"> 
	  <s:hidden id="attAppId" name="attCorrect.appId"></s:hidden>
	  <s:hidden id="attEmpId" name="attCorrect.appEmpId"></s:hidden>
	  <s:hidden id="year" name="attCorrect.year"></s:hidden>
	  <s:hidden id="month" name="attCorrect.month"></s:hidden>
	  <s:hidden id="day" name="attCorrect.day"></s:hidden>
	  <s:hidden id="flag" name="flag"></s:hidden>
	  <s:hidden id="rstartTime" name="attCorrect.aftStartTimeDate"></s:hidden>
	  <s:hidden id="rendTime" name="attCorrect.aftEndTimeDate"></s:hidden>
	  <s:hidden id="exaReason" name="attCorrect.exaReason"></s:hidden>
	</s:form>
</div>



