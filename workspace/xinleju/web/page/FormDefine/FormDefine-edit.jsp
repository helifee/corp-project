<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>表单编辑</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="FormDefine!save" id="frm">
		<s:token/>
			<s:hidden name="formDefine.formCtId"></s:hidden>
			<s:hidden name="formDefine.id"></s:hidden>
			<s:hidden name="formDefine.formVersion"></s:hidden>
			<s:hidden name="formDefine.status" id="status"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							表单编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:formDesign.fnCheckForm(0);">保存</a>
							<a href="#" onclick="javascript:formDesign.fnCheckForm(1);">发布</a>
							<a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
					
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
							<tr>
								<td align="right" class="sd" width="20%">
									表单名称:
								</td>
								<td width="30%">
									<s:textfield name="formDefine.name" id="formName" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									类别名称:
								</td>
								<td width="30%">
									${formDefine.formCt.name}
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="20%">
									表单编码:
								</td>
								<td>
									<s:if test="formDefine.id != null">
										<s:textfield name="formDefine.code" id="formCode" cssStyle="width:98%" readonly="true"></s:textfield>
									</s:if>
									<s:else>
										<s:textfield name="formDefine.code" id="formCode" cssStyle="width:98%" ></s:textfield>
									</s:else>
								</td>
								<td align="right" class="sd" width="20%">
									表单版本:
								</td>
								<td>
									${formDefine.formVersion}
								</td>
							</tr>
							<tr>
								<td colspan="4">
									 <!-- 加载编辑器的容器 -->
   									 <script id="formEditor" name="formDefine.originalHtml" type="text/plain"  style="width:100%;height:450px;">${formDefine.originalHtml}</script>
								</td>
							</tr>
						</table>
						
					</td>
				</tr>
			</table>
		</s:form>
		<script type="text/javascript" charset="utf-8" src="js/ueditor1_4_3/ueditor.config.js"></script>
		<script type="text/javascript" charset="utf-8" src="js/ueditor1_4_3/ueditor.all.js"></script>
		<script type="text/javascript" charset="utf-8" src="js/ueditor1_4_3/lang/zh-cn/zh-cn.js"></script>
		<!--Fromdesign扩展--->
		<script type="text/javascript" charset="utf-8" src="js/ueditor1_4_3/formdesign/formdesign.v4.js"></script>
		<script type="text/javascript" src="page/FormDefine/FormDefine-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	</body>
</html>
