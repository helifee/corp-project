<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<div class="text_left prepend-1 span-23 last">
	<div id="myTab0_Content0">
		<div id="con_radDisM_1" class="span-20 bd_1s52">
		<table class="datagrid2">
			<tr>
				<th class="text_center span-6">会议室名称</th>
				<s:if test="sdf.size > 0">
					<s:iterator value="sdf" id="sdf">
						<th class="text_center span-2">
						<s:if
							test="#sdf.fieldName != ''">
							<s:property value="fieldName" />
						</s:if> <s:else>合计</s:else></th>
					</s:iterator>
				</s:if>
			</tr>
			<s:if test="staShows.size > 0">
				<s:iterator value="staShows" id="aaa">
					<tr >
						<td class="text_left" ><s:property
							value="hysMc" /></td>
						<s:iterator value="sdlist" id="bbb">
							<td  class="text_right" ><s:if
								test="#bbb.staValue != 0">
								<s:property value="staValue" />
							</s:if> <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</div>
		<div id="con_radDisM_2" class="span-20 none bd_1s52">
		<table class="datagrid2">
			<tr>
				<s:if test="sdfLV.size > 0">
					<th class="text_center span-6">会议室名称</th>
					<s:iterator value="sdfLV" id="sdfLV">
						<th  class="text_center span-2"><s:if
							test="#sdfLV.fieldName != ''">
							<s:property value="fieldName" />
						</s:if> <s:else>合计</s:else></th>
					</s:iterator>
				</s:if>
			</tr>
			<s:if test="staShows.size > 0">
				<s:iterator value="staShows" id="aaa">
					<tr>
						<td  class="text_left" ><s:property
							value="hysMc" /></td>
						<s:iterator value="sdlistE" id="ccc">
							<td  class="text_right"><s:if
								test="#ccc.staValue != 0">
								<s:property value="staValue" />
							</s:if> <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</div>
	</div>
	<div id="myTab0_Content1" class="none">
		<div id="con_radDisY_1" class="span-10 bd_1s52">
		<table class="datagrid2">
			<tr>
				<th  class="text_center span-6"><font >会议室名称</font></th>
				<s:iterator value="stafdis" id="YBYL">
					<th  class="text_center span-2"><s:property
						value="fieldName" />年</th>
				</s:iterator>
			</tr>
			<s:if test="staBNInfos.size > 0">
				<s:iterator value="staBNInfos" id="sbnis">
					<tr>
						<td  class="text_left "><s:property
							value="hysMc" /></td>
						<s:iterator value="sdlist" id="sds">
							<td  class="text_right"><s:if test="#sds.staValue != 0">
								<s:property value="staValue" />
							</s:if> <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</div>
		<div id="con_radDisY_2" class="span-10 bd_1s52">
		<table class="datagrid2">	
			<tr>
				<th  class="text_center span-6"><font >会议室名称</font></th>
				<s:iterator value="stafdis" id="YBYL">
					<th  class="text_center span-2"><s:property
						value="fieldName" />年</th>
				</s:iterator>
			</tr>
			<s:if test="staBNInfos.size > 0">
				<s:iterator value="staBNInfos" id="sbnis">
					<tr>
						<td  class="text_left"><s:property
							value="hysMc" /></td>
						<s:iterator value="sdlistE" id="sdse">
							<td  class="text_right"><s:if test="#sdse.staValue != 0">
								<s:property value="staValue" />
							</s:if> <s:else>&nbsp;</s:else></td>
						</s:iterator>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</div>
	</div>
	<div id="myTab0_Content2" class="none">
		<div id="con_radDisV_1"><img id="pieImage"  src="<s:property value="pieImagepath"/>" height="528" width="740" /></div>	
		<div id="con_radDisV_2"><img id="zImage"    src="<s:property value="zImagepath"/>" height="528" width="740" /></div>
		<div id="con_radDisV_3"><img id="lineImage" src="<s:property value="xImagepath"/>" height="528" width="740" /></div>
	</div>
</div>









