<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>新建目录</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="page/Ct/Ct-edit.js?t=<%=System.currentTimeMillis() %>"></script>
<%@ include file="/validate.jsp"%>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="Cate!save.do" id="frm">
	<s:token/>
		<s:hidden name="ct.id"></s:hidden>
		<s:hidden name="ct.parentId"></s:hidden>
		<s:hidden name="ct.createTime"></s:hidden>
		<s:hidden name="ct.editTime"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">目录编辑</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:dealSave()">提交</a><a href="#" onclick="window.close();">关闭</a>
					</div></td>
			</tr>
		</table>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
			<tr>
				<td align="right" class="sd" width="20%"><span class="alertstar">*</span>名称:</td>
				<td width="30%"><s:textfield name="ct.name" cssStyle="width:98%" datatype="*1-50"></s:textfield></td>
				<td align="right" class="sd" width="20%">编码:</td>
				<td><s:textfield name="ct.code" cssStyle="width:98%"></s:textfield></td>
			</tr>
			<tr>
				<td align="right" class="sd" width="20%">排序:</td>
				<td><s:textfield name="ct.position" cssStyle="width:98%"></s:textfield></td>
				<td align="right" class="sd">&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td align="right" class="sd" width="20%">说明:</td>
				<td colspan="3">
					<s:textarea name="ct.remark" rows="5"  cssStyle="width:99%"></s:textarea><br/>
					<s:radio list="#{1:'显示',0:'不显示'}" name="ct.isShowRemark"></s:radio>
				</td>
			</tr>
			<tr>
				<td align="right" class="sd" width="20%">创建时间:</td>
				<td><s:date name="ct.createTime" format="yyyy-MM-dd HH:mm"/>
				</td>
				<td align="right" class="sd" width="20%">修改时间:</td>
				<td><s:date name="ct.editTime" format="yyyy-MM-dd HH:mm"/>
				</td>
			</tr>
	</table>
	</s:form>
</body>
</html>
