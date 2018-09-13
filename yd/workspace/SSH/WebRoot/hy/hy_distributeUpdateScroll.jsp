<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@page import="org.apache.struts2.ServletActionContext"%>

	
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>

<table width="895" border="0" cellpadding="2" cellspacing="2"
	rules="all">
	<tr>
		<td align="right"><s:a href="#"
			onclick=" xinjianXianshiTable(%{nextMessage.getNextHysid()} , %{nextMessage.getNextHyspx()});">
			<font size="3">新建</font>
		</s:a>&nbsp; <s:a href="#" onclick="distributeUpdateAction()">
			<font size="3">刷新</font>
		</s:a>&nbsp; <s:a href="#" onclick="distributeAction();">
			<font size="3">返回</font>
		</s:a></td>
	</tr>
</table>
<fieldset style="height: 100px; width: 887px"  >
<legend style="color: #000000" align="center"><font size="4"
	color="#6c95d0"><strong>新建/变更会议室</strong></font></legend>
<table width="887" border="0" id="xinjiangenggaiTable" cellpadding="2"
	cellspacing="2" rules="all">
	<tr>
		<td colspan="6" align="center"></td>
	</tr>

	<tr height="10">
		<td align="left" width="110">会议室ID</td>
		<td width="120">
          <s:textfield name="hysId" id="hysId" label="会议室ID:" cssStyle="WIDTH: 80px; HEIGHT: 20px" disabled="true" maxlength="2" theme="simple"></s:textfield>
		</td> 
		<td align="left" width="180">会议室名称:</td>
		<td width="250">
		 <s:textfield name="hysMc" id="hysMc" label="会议室名称:" cssStyle="WIDTH: 150px; HEIGHT: 20px" disabled="true" maxlength="34" theme="simple"></s:textfield>
		</td>
		<td width="147" align="left">图像起点X坐标：</td>
		<td width="90">
		 <s:textfield name="hysQx"  id="hysQx" label="图像起点X坐标:" cssStyle="WIDTH: 60px; HEIGHT: 20px" disabled="true" maxlength="4" theme="simple"></s:textfield>
		</td>
	</tr>
	<tr>
		<td align="left">容纳人数:</td>
		<td>
		  <s:textfield name="hysRs"  id="hysRs" label="容纳人数:" cssStyle="WIDTH: 80px; HEIGHT: 20px" disabled="true" maxlength="3" theme="simple"></s:textfield>
		</td>
		<td align="left">网线接口数量:</td>
		<td>
		  <s:textfield name="hysJs" id="hysJs" label="网线接口数量:" cssStyle="WIDTH: 80px; HEIGHT: 20px" disabled="true" maxlength="3" theme="simple"></s:textfield>
	    </td>

		<td align="left">图像起点Y坐标：</td>
		<td>
		  <s:textfield name="hysQy" id="hysQy" label="图像起点Y坐标:" cssStyle="WIDTH: 60px; HEIGHT: 20px" disabled="true" maxlength="4" theme="simple"></s:textfield>
		</td>
	</tr>
	<tr>
		<td align="left">排列顺序：</td>
		<td>
		  <s:textfield name="hysPx" id="hysPx" label="排列顺序:" cssStyle="WIDTH: 80px; HEIGHT: 20px" disabled="true" maxlength="2" theme="simple"></s:textfield>
		</td>

		<td align="left">是否需要会议室报告：</td>
		<td>
	 		<select name="hysBg" style="WIDTH: 80px; HEIGHT: 20px"	id="hysBg" disabled="true">
				<option value="0" selected="selected">否</option>
				<option value="1">是</option>
			</select>
		</td>
		<td>图像终点X坐标：</td>
		<td>
		  <s:textfield name="hysZx" id="hysZx" label="图像终点X坐标：" cssStyle="WIDTH: 60px; HEIGHT: 20px" disabled="true" maxlength="4" theme="simple"></s:textfield>
		</td>
	</tr>
	<tr>
		<td align="left">电话:</td>
		<td>
		  <s:textfield name="hysDh" id="hysDh" label="电话:" cssStyle="WIDTH: 80px; HEIGHT: 20px" disabled="true" maxlength="4" theme="simple"></s:textfield>
		</td>
		<td align="left">设备名称:</td>
		<td>
		  <s:textfield name="hysSb" id="hysSb" label="设备名称:" cssStyle="WIDTH: 220px; HEIGHT: 20px" disabled="true" maxlength="255" theme="simple"></s:textfield>
		</td>

		<td>图像终点Y坐标：</td>
		<td>
		  <s:textfield name="hysZy" id="hysZy" label="图像终点Y坐标：" cssStyle="WIDTH: 60px; HEIGHT: 20px" disabled="true" maxlength="4" theme="simple"></s:textfield>
		</td>
	</tr>

	
	<tr>
		<td></td>
		<td align="right"></td>
		<td align="center"></td>
		<td></td>
		<td align="right"><input type="button" name="tijiao" value="提交"
			id="tijiao" style="WIDTH: 60px; HEIGHT: 24px"
			onclick="submitTypeDistributeScroll(); " disabled="disabled" /></td>
		<td align="left"><input type="button" name="quxiao" value="取消"
			id="quxiao" style="WIDTH: 60px; HEIGHT: 24px"
			onclick="cancleDistribute();" disabled="disabled" /></td>
	</tr>
</table>
</fieldset>

 
<br />
<br />
<div>
<table width="898" border="0" cellpadding="2" cellspacing="1"
	rules="none">
	<tr align="center">
		<td><font size="4" color="#6c95d0"><strong>会议室信息表</strong></font></td>
	</tr>
</table>
<table width="915" border="0" cellpadding="1" cellspacing="1"
	rules="none">
	<tr bgcolor="#6c95d0" align="center">
		<td width="34"><font color="#FFFFFF" size="2">ID</font></td>
		<td width="150"><font color="#FFFFFF" size="2">会议室名</font></td>
		<td width="63"><font color="#FFFFFF" size="2">容纳人数</font></td>
		<td width="99"><font color="#FFFFFF" size="2">网线接口数量</font></td>
		<td width="40"><font color="#FFFFFF" size="2">电话</font></td>
		<td width="418"><font color="#FFFFFF" size="2">设备名称</font></td>
		<td bgcolor="#6c95d0" width="45"><font color="#FFFFFF" size="2">更改</font></td>
		<td bgcolor="#6c95d0" width="62"><font color="#FFFFFF" size="2">删除</font></td>
	</tr>
</table>
<div
	style="OVERFLOW-Y: scroll; WIDTH: 905; HEIGHT: 300px; background-color: #CEE8FF"
	align="center" id="myScoll"  onclick="">
<table width="898"  id="xianshiTable"
	cellpadding="1" cellspacing="1" rules="none" border="0" >
	
	<s:if test="distributes.size > 0">
		<% 
		    long a = 0 ; 
		    Long rowindex = (Long)request.getAttribute("rowindex");
		    
		%>
		
		<s:iterator value="distributes">
		<% 
		  
		 if( rowindex.longValue() == a){
        %>   
            
         	               
			 <tr bgcolor="#99CC33" height="20"
			    onmouseover="getRowAndColumn( <%=rowindex %>);"
				onmouseout="getRowAndColumn( <%=rowindex %>);">
				<td width="34" align="center">
				
				<font size="2"><s:property
					value="id" /></font></td>	
			    <td width="150"><font size="2"><s:property value="hysmc" /></font></td>
				<td width="63" align="right"><font size="2"><s:property
					value="rnrs" /></font></td>
				<td width="99" align="right"><font size="2"><s:property
					value="wxjk" /></font></td>
				<td width="40" align="center"><font size="2"><s:property
					value="dh" /></font></td>
				<td width="418"><font size="2"><s:property value="sb" /></font></td>
	 			<td width="45" align="center">
	          <a href="#"
					onclick=" genggaiXianshiTable(<%=a %> , <s:property value="id" /> , '<s:property value="hysmc" />' , <s:property value="rnrs" /> , '<s:property value="dh" />' , '<s:property value="sb" />' , <s:property value="wxjk" /> , <s:property value="hybgbz" /> ,
              <s:property value="imagefromx" /> , <s:property value="imagefromy" /> , <s:property value="imagetox" /> , <s:property value="imagetoy" /> , <s:property value="sortid" />);">
					<font size="2">更改</font>
				</a></td>		
				<td width="45" align="center"><a href="#"
					onclick="distributeDeleteActionScroll(<%=a %> , <s:property value="id" />);">
					<font size="2">删除</font>
				</a></td>
			</tr>
			
			<%
            }
            else{
            %>
			 
			 <tr bgcolor="#ffffd9" height="20"
			    onmouseover="getRowAndColumn( <%=rowindex %>);"
				onmouseout="getRowAndColumn( <%=rowindex %>);">
				<td width="34" align="center"><font size="2"><s:property
					value="id" /></font></td>	
			<td width="150"><font size="2"><s:property value="hysmc" /></font></td>
				<td width="63" align="right"><font size="2"><s:property
					value="rnrs" /></font></td>
				<td width="99" align="right"><font size="2"><s:property
					value="wxjk" /></font></td>
				<td width="40" align="center"><font size="2"><s:property
					value="dh" /></font></td>
				<td width="418"><font size="2"><s:property value="sb" /></font></td>
	 			<td width="45" align="center">
	          <a href="#"
					onclick=" genggaiXianshiTable(<%=a %> , <s:property value="id" /> , '<s:property value="hysmc" />' , <s:property value="rnrs" /> , '<s:property value="dh" />' , '<s:property value="sb" />' , <s:property value="wxjk" /> , <s:property value="hybgbz" /> ,
              <s:property value="imagefromx" /> , <s:property value="imagefromy" /> , <s:property value="imagetox" /> , <s:property value="imagetoy" /> , <s:property value="sortid" />);">
					<font size="2">更改</font>
				</a></td>
				
				
				
				<td width="45" align="center"><a href="#"
					onclick="distributeDeleteActionScroll(<%=a %> , <s:property value="id" />);">
					<font size="2">删除</font>
				</a></td>
			</tr>
		  	
		  	
            
		  	
	    <%
            }
	      a++; 
		%>
		
		</s:iterator>

	</s:if>
</table>


</div>
<input name="rowindex"  id="rowindex" type="hidden"  value="<s:property value="rowindex" />"/>
</div>



