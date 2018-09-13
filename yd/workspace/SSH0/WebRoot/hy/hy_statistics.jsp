<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<table width="1220" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td width="170" height="22"></td>
		<td>
		<div class="Menubox">
		<ul>
			<s:if test="dsFlag == 0">
				<li id="stat1" value="1"
					onClick="dFlagChange(); setTab('stat',1,2);" class="hover"><s:property
					value="staticsyear" />年</li>
				<li id="stat2" value="2" onClick="sFlagChange(); setTab('stat',2,2);">前<s:property value="beNyear" />年</li>
			</s:if>
			<s:else>
				<li id="stat1" value="1"
					onClick="dFlagChange(); setTab('stat',1,2);"><s:property
					value="staticsyear" />年</li>
				<li id="stat2" value="2" onClick="sFlagChange(); setTab('stat',2,2);" class="hover">前<s:property value="beNyear" />年</li>
			</s:else>
		</ul>
		</div>
		</td>
		<td width="700" height="22">
		   <!-- 当年统计饼状视图 -->
		   <s:url action="jFreeChart" id="jFreeChartd1">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="%{viewEnum1}"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChartd1}" target="_blank" title="会议室利用情况统计" name="会议室利用情况统计">当年统计饼状视图</s:a>
		   
		   <!-- 当年统计柱状视图 -->
		   <s:url action="jFreeChart" id="jFreeChartd2">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="%{viewEnum2}"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChartd2}" target="_blank" >当年统计柱状视图</s:a>
		   
		   <!-- 当年统计线状视图-->
		   <s:url action="jFreeChart" id="jFreeChartd3">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="%{viewEnum3}"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChartd3}" target="_blank" >当年统计线状视图</s:a>
	<!--    
		   <s:url action="jFreeChart" id="jFreeChart">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="q1"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChart}" target="_blank" >前<s:property value="beNyear" />年统计饼状视图</s:a>
		   
		   <s:url action="jFreeChart" id="jFreeChart">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="q2"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChart}" target="_blank" >前<s:property value="beNyear" />年统计柱状视图</s:a>
		   
		   <s:url action="jFreeChart" id="jFreeChart">
		     <s:param name="staticsyear" value="%{staticsyear}"></s:param>
		     <s:param name="viewType" value="q3"></s:param>
		   </s:url>
		   <s:a href="%{jFreeChart}" target="_blank" >前<s:property value="beNyear" />年统计线状视图</s:a>
	 -->		   
		</td>
	</tr>
</table>
<table width="1220" border="0" cellspacing="0" cellpadding="0">
	<tr align="left" valign="top">
		<td width="170" align="left" valign="top">
		<table width="170">
			<tr>
				<td height="20"></td>
			</tr>
			<tr>
				<td height="30"></td>
			</tr>
			<s:if test="staShows.size > 0">
				<s:iterator value="staShows" id="aaa">
					<tr valign="center">
						<td width="170" height="50" align="center"><s:property
							value="hysMc" /></td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</td>
		<td align="left" valign="top">
		<div class="Contentbox"><s:if test="dsFlag == 0">
			<div id="con_stat_1">
			<table  border="1" cellspacing="0" bordercolor="#6c95d0">
				<tr bgcolor="#6c95d0">
					<td height="20" colspan="<s:property value="csc" />" align="center"><font
						color="#FFFFFF">次数</font></td>
					<td width="50" align="center"><font color="#FFFFFF">合计</font></td>
					<td colspan="<s:property value="lyvc" />" align="center"><font color="#FFFFFF">利用率(%)</font></td>
					<td width="70" align="center"><font color="#FFFFFF">合计(%)</font></td>
				</tr>
				<tr bgcolor="#D0DDF0">
					<s:if test="sdf.size > 0">
						<s:iterator value="sdf" id="sdf">  
						 <td width="40" height="30" align="center">
						   <s:if test="#sdf.fieldName != ''"><s:property value="fieldName" /></s:if>
					       <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</s:if>
					
					<s:if test="sdfLV.size > 0">
						<s:iterator value="sdfLV" id="sdfLV">  
						 <td width="40" height="30" align="center">
						   <s:if test="#sdfLV.fieldName != ''"><s:property value="fieldName" /></s:if>
					       <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</s:if>
				</tr>
				<s:if test="staShows.size > 0">
					<s:iterator value="staShows" id="aaa">
						<tr align="right" bgcolor="#ffffd9">
						   <s:iterator value="sdlist" id="bbb">
							<td height="50" " align="right">
							  <s:if test="#bbb.staValue != 0"><s:property value="staValue" /></s:if> 
							  <s:else>&nbsp;</s:else>
							</td>
							</s:iterator>
							<s:iterator value="sdlistE" id="ccc">
								<td height="50" " align="right">
								  <s:if test="#ccc.staValue != 0"><s:property value="staValue" /></s:if> 
								  <s:else>&nbsp;</s:else>
								</td>
							</s:iterator>
						</tr>
					</s:iterator>
				</s:if>
			</table>
			</div>
			<div id="con_stat_2" style="display: none">
			<table  border="1" cellspacing="0" bordercolor="#6c95d0">
				<tr bgcolor="#6c95d0">
					<td height="20" colspan="<s:property value="stabyc" /> " align="center"><font
						color="#FFFFFF">次数</font></td>
					<td colspan="<s:property value="stabyc" />" align="center"><font color="#FFFFFF">利用率（%）</font></td>
				</tr>
				<tr bgcolor="#D0DDF0">	
					<s:iterator value="stafdis" id="YBYL">
					  <td width="83" height="30" align="center"><s:property value="fieldName" />年</td>
					</s:iterator>
					<s:iterator value="stafdis" id="YBYL">
					  <td width="83" height="30" align="center"><s:property value="fieldName" />年</td>
					</s:iterator>
				</tr>
				<s:if test="staBNInfos.size > 0">
					<s:iterator value="staBNInfos" id="sbnis">
						<tr align="right" bgcolor="#ffffd9">
						   <s:iterator value="sdlist" id="sds">
							 <td height="50" width="82">
							   <s:if test="#sds.staValue != 0"><s:property value="staValue" /></s:if>
                               <s:else>&nbsp;</s:else>
                             </td>
						   </s:iterator>
						    <s:iterator value="sdlistE" id="sdse">
							 <td height="50" width="82">
							   <s:if test="#sdse.staValue != 0"><s:property value="staValue" /></s:if>
                               <s:else>&nbsp;</s:else>
                             </td>
						   </s:iterator>
						</tr>
					</s:iterator>
				</s:if>
			</table>
			</div>
		</s:if> <s:else>
			<div id="con_stat_1" style="display: none">
			<table  border="1" cellspacing="0" bordercolor="#6c95d0">
				<tr bgcolor="#6c95d0">
					<td height="20" colspan="<s:property value="csc" />" align="center"><font
						color="#FFFFFF">次数</font></td>
					<td width="50" align="center"><font color="#FFFFFF">合计</font></td>
					<td colspan="<s:property value="lyvc" />" align="center"><font color="#FFFFFF">利用率(%)</font></td>
					<td width="70" align="center"><font color="#FFFFFF">合计(%)</font></td>
				</tr>
				<tr bgcolor="#D0DDF0">
					<s:if test="sdf.size > 0">
						<s:iterator value="sdf" id="sdf">  
						 <td width="40" height="30" align="center">
						   <s:if test="#sdf.fieldName != ''"><s:property value="fieldName" /></s:if>
					       <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</s:if>
					
					<s:if test="sdfLV.size > 0">
						<s:iterator value="sdfLV" id="sdfLV">  
						 <td width="40" height="30" align="center">
						   <s:if test="#sdfLV.fieldName != ''"><s:property value="fieldName" /></s:if>
					       <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</s:if>
				</tr>
				<s:if test="staShows.size > 0">
					<s:iterator value="staShows" id="aaa">
						<tr align="right" bgcolor="#ffffd9">
						   <s:iterator value="sdlist" id="bbb">
							<td height="50" " align="right">
							  <s:if test="#bbb.staValue != 0"><s:property value="staValue" /></s:if> 
							  <s:else>&nbsp;</s:else>
							</td>
							</s:iterator>
							
							<s:iterator value="sdlistE" id="ccc">
								<td height="50" " align="right">
								  <s:if test="#ccc.staValue != 0"><s:property value="staValue" /></s:if> 
								  <s:else>&nbsp;</s:else>
								</td>
							</s:iterator>
						</tr>
					</s:iterator>
				</s:if>
			</table>
			</div>
			<div id="con_stat_2">
			<table  border="1" cellspacing="0" bordercolor="#6c95d0">
				<tr bgcolor="#6c95d0">
					<td height="20" colspan="<s:property value="stabyc" /> " align="center"><font
						color="#FFFFFF">次数</font></td>
					<td colspan="<s:property value="stabyc" />" align="center"><font color="#FFFFFF">利用率（%）</font></td>
				</tr>
				<tr bgcolor="#D0DDF0">	
					<s:iterator value="stafdis" id="YBYL">
					  <td width="83" height="30" align="center"><s:property value="fieldName" />年</td>
					</s:iterator>
					<s:iterator value="stafdis" id="YBYL">
					  <td width="83" height="30" align="center"><s:property value="fieldName" />年</td>
					</s:iterator>
				</tr>
				<s:if test="staBNInfos.size > 0">
					<s:iterator value="staBNInfos" id="sbnis">
						<tr align="right" bgcolor="#ffffd9">
						   <s:iterator value="sdlist" id="sds">
							 <td height="50" width="82">
							   <s:if test="#sds.staValue != 0"><s:property value="staValue" /></s:if>
                               <s:else>&nbsp;</s:else>
                             </td>
						   </s:iterator>
						    <s:iterator value="sdlistE" id="sdse">
							 <td height="50" width="82">
							   <s:if test="#sdse.staValue != 0"><s:property value="staValue" /></s:if>
                               <s:else>&nbsp;</s:else>
                             </td>
						   </s:iterator>
						</tr>
					</s:iterator>
				</s:if>
			</table>
			</div>
		</s:else></div>
		</td>
	</tr>
</table>







