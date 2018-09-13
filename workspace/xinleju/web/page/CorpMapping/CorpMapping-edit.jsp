<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>财务系统注册</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>

		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="page/CorpMapping/CorpMapping-edit.js?t=<%=System.currentTimeMillis() %>"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>
			<script>
				var contextPath = '${pageContext.request.contextPath}';
				if(contextPath.length==1){
					contextPath = '';
				}
					<s:iterator value="#request.refs" var="map">
					    var ${map.key} = ${map.value};
					</s:iterator>
				</script>
	</head>
	<body style="margin: 0px;padding: 0px;">
		<s:form action="CorpMapping!save" id="frm">
			<s:token/>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							公司对照编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">提交</a>
							<a href="#" onclick="parent.closeDialog('newDialog');">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>财务系统:
								</td>
								<td width="29%"   align="left">
								<input id="fisysinfoName" style="width:98%" readonly="readonly" />
								<s:hidden id="fisysinfoid" name="corpMapping.fisysinfoid"></s:hidden>
								</td>
								<td align="right" class="sd" width="19%" >
									<font color=red>*</font>使用系统:
								</td>
								<td width="29%"   align="left">
								<input id="beusedsysName" style="width:98%"/>
								<s:hidden id="beusedsys" name="corpMapping.beusedsys"></s:hidden>
								</td>
							</tr>
							  <tr align = center>
							  <td align="right" class="sd" width="19%">
									<font color=red>*</font>财务系统公司:
								</td>
								<td width="29%" align="left" >
								<input id="targsyscorpName" style="width:98%" readonly="readonly" />
								<s:hidden id="targsyscorpid" name="corpMapping.targsyscorpid"></s:hidden>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>主数据公司:
								</td>
								<td width="29%"   align="left"  >
								<input id="mdcorpName" style="width:98%" />
								<s:hidden id="mdcorpid" name="corpMapping.mdcorpid"></s:hidden>
								</td>
								
							</tr>			  
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>主数据类型:
								</td>
								<td width="29%">
								<input id="frm_corpMapping_mddatatype" name="corpMapping.mddatatype"  value="${corpMapping.mddatatype}"/>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>主数据信息:
								</td>
								<td width="29%" align="left" >
								<input id="mddataName" style="width:98%"/>
								<s:hidden id="mddataid" name="corpMapping.mddataid"></s:hidden>
								</td>
							</tr>
						
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="corpMapping.createDate"></s:hidden>
			<s:hidden name="corpMapping.status"></s:hidden>
			<s:hidden name="corpMapping.id"></s:hidden>
		</s:form>
	</body>
</html>
