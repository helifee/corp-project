<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<TABLE style="BORDER-COLLAPSE: collapse" width="520" border="0"
cellpadding="1" cellspacing="1" rules="none" 
	bordercolor="#000000" >
	<TR>
		<TD width="700" align="left">
		<TABLE style="BORDER-COLLAPSE: collapse" width="520" border="0"
			cellpadding="1" cellspacing="1" rules="none" >

			<TR height="5" align="center">
				<TD width="139" bgColor="#6c95d0"><span class="STYLE11"><FONT
					size="2">组名 </FONT></span></TD>
				<TD width="50" bgColor="#6c95d0"><span class="STYLE11"><FONT
					size="2">成员数 </FONT></span></TD>
				<TD width="231" bgColor="#6c95d0"><span class="STYLE11"><FONT
					size="2">成员 </FONT></span></TD>
				<TD width="87" bgColor="#6c95d0"><span class="STYLE11"><FONT
					size="2">属性</FONT></span></TD>
			</TR>
		</TABLE>
		</TD>
	</TR>
	<TR>
		<TD width="700" align="left">
		<div
			style="OVERFLOW-y: scroll; WIDTH: 100%; HEIGHT: 127px; text-align: left;background: #ffffd9">
		<table style="BORDER-COLLAPSE: collapse" cellspacing="0" cellpadding="4" width="520" border="1" >
			<s:if test="groupinfos.size > 0">
				<s:iterator value="groupinfos" id="hyif">
					<tr height="10" bgcolor="#ffffd9">
						<td width="132" align="left" ><FONT size="2"> <s:a
							href="#"
							onclick="showName('%{#hyif.zbid}','%{#hyif.zzwmc}'); return false">
							<s:property value="zzwmc" />
						</s:a> </FONT></td>
						<td width="43" align="center" ><font size="2"> <s:property
							value="cygs" /></font></td>
						<td width="223" align="left" ><font size="2"> <s:property
							value="cymingzi" /></font></td>
						<td width="80" align="left" ><font size="2"> <s:property
							value="zbqfmz" /></font></td>
					</tr>
				</s:iterator>
			</s:if>
		</table>
		</div>
		</TD>
	</TR>
</TABLE>

