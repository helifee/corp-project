<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<table 
	<s:if test="grid.id!=null">
		id=<s:property value="grid.id"/>
	</s:if>
	<s:if test="grid.style!=null">
	style=<s:property value="grid.style"/>
	</s:if>
	<s:if test="grid.width!=null">
	width=<s:property value="grid.width"/>
	</s:if>
	<s:if test="grid.height!=null">
	height=<s:property value="grid.height"/>
	</s:if>
	<s:if test="grid.border!=null">
	border=<s:property value="grid.border"/>
	</s:if>
	<s:if test="grid.cellspacing!=null">
	cellspacing=<s:property value="grid.cellspacing"/>
	</s:if>
	<s:if test="grid.cellpadding!=null">
	cellpadding=<s:property value="grid.cellpadding"/>
	</s:if>
	<s:if test="grid.align!=null">
	align=<s:property value="grid.align"/>
	</s:if>
	<s:if test="grid.bordercolor!=null">
	bordercolor=<s:property value="grid.bordercolor"/>
	</s:if>
	<s:if test="grid.bgcolor!=null">
	bgcolor=<s:property value="grid.bgcolor"/>
	</s:if>
>
	<tr height = <s:property value="grid.headHight"/> >
		<s:if test="grid.checkAll == 'checkbox'">
			<td align="center" bgColor="#6c95d0" width="60"><font
				color="#FFFFFF"> <input type="checkbox" name="checkall"
				id="checkall"/> 全选 </font></td>
		</s:if>
		<s:if test="grid.checkAll == 'radio'">
			<td align="center" bgColor="#6c95d0" width="60"></td>
		</s:if>
		<s:if test="grid.head.size > 0">
			<s:iterator value="grid.head">
				<td 
					<s:if test="align!=null">
						align=<s:property value="align"/>
					</s:if>
					<s:if test="bgColor!=null">
						bgColor=<s:property value="bgcolor"/>
					</s:if>
					<s:if test="width!=null">
						width=<s:property value="width"/>
					</s:if>
					><s:property
					value="content" /></td>
			</s:iterator>
		</s:if>
	</tr>
	<s:if test="grid.body.size > 0">
		<s:iterator value="grid.body">
			<tr 
				<s:if test="align!=null">
					align=<s:property value="align"/>
				</s:if>
				<s:if test="hight!=null">
					hight=<s:property value="hight"/>
				</s:if>
			>
			<s:if test="checkRadio=='checkbox'">
			<td align="center" bgColor="#6c95d0" width="60"><font
				color="#FFFFFF"> <input type="checkbox" name="checkboxrow"
				id="checkboxrow"/>  </font></td>
			</s:if>	
			<s:if test="checkRadio=='radio'">
			<td align="center" bgColor="#6c95d0" width="60"><font
				color="#FFFFFF"> <input type="radio" name="radiorow"
				id="radiorow"/>  </font></td>
			</s:if>	
				<s:if test = "gridTd">
					<s:iterator value="gridTd">
						<td
							<s:if test="align!=null">
								align=<s:property value="align"/>
							</s:if>
							<s:if test="bgColor!=null">
								bgColor=<s:property value="bgcolor"/>
							</s:if>
							<s:if test="width!=null">
								width=<s:property value="width"/>
							</s:if>
							><s:if test= "hasURL">
								<a href=<s:property value="url"/>>
								<s:property value="content"/>
								</a>
							</s:if>
							<s:if test= "!hasURL">
								<s:property value="content"/>
							</s:if>
						</td>
					</s:iterator>
				</s:if>
			</tr>
		</s:iterator>
	</s:if>
</table>


