<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<html>
<head>
<title>组管理画面</title>
<sx:head debug="true" />
</head>
<script language="JavaScript" type="text/javascript" src="js/application.js"></script>
<script language="JavaScript" type="text/javascript" src="js/prototype.js"></script>
<script language="javascript">
function showName(id,name){
		document.getElementById("textfield2").value = name;
		document.getElementById("textfield2").name = id;
		if(document.forms[0].textfield2.disabled == false)
		{
			document.forms[0].textfield2.disabled = true;
			InitHumian();
		}
        document.forms[0].textfield2.disabled = true; 
        
        document.forms[0].xiugai.disabled = false; 
        document.forms[0].shanchu.disabled = false; 
	return false;
}
function updatezu()
{//利用对话框返回的值 （true 或者 false）
    if(confirm("你确信要更新这个组吗？"))
    {//如果是true ，那么就把页面转向thcjp.cnblogs.com
        var id = document.getElementById("textfield2").name;
    	document.forms[0].textfield2.disabled = false; 
		targetForm = document.forms[0];
    	targetForm.action = "updatezu.action?zbid=" +id;
    	targetForm.submit();
   }
    else
    {
    }
/*
    document.forms[0].textfield2.disabled = false; 
	document.forms[0].zuid.disabled = false;
	document.forms[0].renming.disabled = false;  
	document.forms[0].xiugai.disabled = false; 
	document.forms[0].form_leftname.disabled = false; 
	document.forms[0].shanchu.disabled = false; 
	document.forms[0].form_rightname.disabled = false;
	document.forms[0].form_siyou1.disabled = false; 
	document.forms[0].form_siyou2.disabled = false; 
	document.forms[0].form_siyou3.disabled = false;
	*/ 
}
/*
function deletezu()
{//利用对话框返回的值 （true 或者 false）
    if(confirm("你确信要删除这个组吗？"))
    {//如果是true ，那么就把页面转向thcjp.cnblogs.com
        var id = document.getElementById("textfield2").name;
        var url = "deletezu.action?zbid="+id;    
    	new Ajax.Updater (    
        'div_hy_group_manage.jsp',    
        url,     
	        {    
	            onLoading:function (){    
	            },    
	            onSuccess:function (request) {    
	                alert('删除成功');    
	            },     
	            onFailure:function (request) {    
	                alert("服务器故障，请稍候重试");    
	            }    
	        }    
    	); 

		//targetForm = document.forms[0];
    	//targetForm.action = "deletezu.action?zbid=" +id;
    	//targetForm.submit();
   }
    else
    {
    }
}
*/
function InitHumian(){
    document.forms[0].textfield2.disabled = true; 
    document.forms[0].zuid.disabled = true;
    document.forms[0].renming.disabled = true;  
    document.forms[0].xiugai.disabled = true; 
    document.forms[0].form_leftname.disabled = true; 
    document.forms[0].shanchu.disabled = true; 
    document.forms[0].form_rightname.disabled = true;
    document.forms[0].form_siyou1.disabled = true; 
	document.forms[0].form_siyou2.disabled = true; 
	document.forms[0].form_siyou3.disabled = true; 
	document.getElementsByTagName("input").item(8).diabled = true;
	document.getElementsByTagName("input").item(9).diabled = true;
	document.getElementsByTagName("input").item(10).diabled = true;
	document.getElementsByTagName("input").item(11).diabled = true;
	document.getElementsByTagName("input").item(12).diabled = true;
	
return false;
}
</script>
<body bgcolor="#ecf6ff" onload="InitHumian()">
<script language="JavaScript" type="text/javascript" src="js/Group.js"></script>
<table align="center" width="944" height="672" border="0"
	cellpadding="0" cellspacing="0">
	<tr>
		<td width="101" height="72"></td>
		<td width="728" height="53">
		<p align="center"><font size="5" color="green"><strong>组管理画面</strong></font></p>
		</td>
		<td width="101" height="53"></td>
	</tr>
	<tr>
		<td height="553"></td>
		<td align="center"><s:form id="form" name="form" method="post"
			action="hygroupmanage" theme="simple">
			<div align="center">
			<TABLE style="BORDER-COLLAPSE: collapse" width="515" border="0"
				cellPadding="0" cellSpacing="1" bordercolor="#000000" rules="none">
				<TR>
					<TD width="700" align="left">
					<TABLE style="BORDER-COLLAPSE: collapse" width="515" border="1"
						cellpadding="1" cellspacing="1" bordercolor="#111111">

						<TR height="5">
							<TD width="135" bgColor="#6c95d0"><span class="STYLE11"><FONT
								size="2">组名 </FONT></span></TD>
							<TD width="50" bgColor="#6c95d0"><span class="STYLE11"><FONT
								size="2">成员数 </FONT></span></TD>
							<TD width="222" bgColor="#6c95d0"><span class="STYLE11"><FONT
								size="2">成员 </FONT></span></TD>
							<TD width="85" bgColor="#6c95d0"><span class="STYLE11"><FONT
								size="2">属性</FONT></span></TD>
						</TR>
					</TABLE>
					</TD>
				</TR>
				<TR>
					<TD width="700" align="left">
					<div
						style="OVERFLOW-y: scroll; WIDTH: 100%; HEIGHT: 150px; text-align: left; background: #FFFFE0">
					<table style="BORDER-COLLAPSE: collapse" bordercolor="#111111"
						cellspacing="2" cellpadding="2" width="515" border="1">
						<s:if test="groupinfos.size > 0">
							<s:iterator value="groupinfos" id="hyif">
								<tr height="10" align="center" bgcolor="#ffffd9">
									<td width="136"><FONT size="2"> 
									<!-- 
									<input
										type="button" id="<s:property value="zbid" />"
										value="<s:property value="zzwmc" />"
										onClick="showName('<s:property value="zbid" />','<s:property value="zzwmc" />');"
										style="width: 120px">
										 -->
										 <s:a href="http://www.aaa.com" onclick="showName('%{#hyif.zbid}','%{#hyif.zzwmc}'); return false">
										<s:property value="zzwmc" />
										</s:a>
									</FONT></td>
									<td width="49"><font size="2"> <s:property
										value="cygs" /></font></td>
									<td width="225"><font size="2"> <s:property
										value="cymingzi" /></font></td>
									<td width="83"><font size="2"> <s:property
										value="zbqfmz" /></font></td>
								</tr>
							</s:iterator>
						</s:if>
					</table>
					</div>
					</TD>
				</TR>
			</TABLE>

			<br />
			<table width="533" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="252" align="left">
					<fieldset style="height: 65px; width: 250px">
					<table width="250px" height="60px" border="0px">
						<tr>
							<td>组名： <s:textfield id="textfield2" theme="simple" name="textfield2"
								size="18" theme="simple" readonly="false" 
								cssStyle="WIDTH: 165px; HEIGHT: 20px; vertical-align:middle" />
							</td>
						</tr>
						<tr>
							<td><input name="Submit" type="button" id="Submit"
								value="新建" style="width: 65px; height: 25px" /> &nbsp;&nbsp; 
								<sx:submit name ="xiugai" id="xiugai" value="修改" cssStyle="width: 65px; height: 25px"
								href="javascript:updatezu()" />&nbsp;&nbsp; 
								<sx:submit id="shanchu" name = "chanchu" value="删除" cssStyle="width: 65px; height: 25px"
								onclick="deletezu()"/>
								</td>
						</tr>
					</table>
					</fieldset>
					</td>
					<td width="281"></td>
				</tr>
			</table>
			<br />
			<table width="531" height="320" border="2" cellpadding="0" id = "gaibianzu"
				cellspacing="0" rules="none" >
				<tr align="center">
					<td width="221" align="left" >组名： <s:select name="zuid"
						label="" theme="simple" theme="simple" list="zmList"
						listKey="zuid" listValue="zumc" headerKey="0" headerValue =""
						onchange="getrenyuanmz()">
					</s:select> <br>
					人名： <s:textfield id="renming" theme="simple" name="userID"
						size="18" theme="simple" maxlength="6" /></td>

					<td colspan="2" align="center">
					<fieldset style="height: 50px; width: 270px"><legend
						style="color: #000000"> 组属性</legend>
						<s:radio list="#{1 : '私有'}" name="siyou"></s:radio>
						<s:radio list="#{2 : '组内公开'}" name="siyou"></s:radio> 
						<s:radio list="#{3 : '全员公开'}" name="siyou"></s:radio>  
						<!-- 
						<input type="radio"	name="radiobutton" value="radiobutton" /> 私有 
						<input type="radio"	name="radiobutton" value="radiobutton" /> 组内公开 
						<input type="radio" name="radiobutton" value="radiobutton" /> 全员公开
						 -->
						 </fieldset>
					</td>
				</tr>
				<tr>
					<td colspan="2"><s:optiontransferselect theme="ajax"
						name="leftname" doubleName="rightname" leftTitle="组员列表"
						rightTitle="参加会议人员列表" addToLeftLabel="<向左移动"
						addToRightLabel="向右移动>" addAllToLeftLabel="<全部左移"
						addAllToRightLabel="全部右移>" selectAllLabel="-全部选择-"
						cssStyle="width:150px;height:250px;"
						doubleCssStyle="width:150px;height:250px;" buttonCssStyle=""
						list="pinfos" listKey="empid" listValue="empmc" 
						emptyOption="false" multiple="true" allowUpDownOnLeft="false"
						doubleList="iaList_in" doubleListKey="auditorid"
						doubleListValue="name" doubleEmptyOption="false"
						doubleMultiple="true" allowUpDownOnRight="false" theme="simple" />
					</td>
				</tr>
			</table>
</div>
			<table width="523" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="217"></td>
					<td width="83"></td>
					<td width="223">&nbsp;&nbsp;&nbsp;&nbsp;<input name="Submit32"
						type="submit" style="width: 85px; height: 25px" value="确认" /> <input
						name="Submit22" type="button" style="width: 85px; height: 25px"
						onclick="javascript:history.go(-1);" value="返回" /></td>
				</tr>
			</table>
		</s:form></td>
		<td></td>
	</tr>
	<tr>
		<td width="123" height="47"></td>
		<td></td>
		<td width="93"></td>
	</tr>
</table>

</body>
</html>
