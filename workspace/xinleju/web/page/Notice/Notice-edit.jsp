<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>任务管理</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Notice/Notice-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="Notice!save" id="frm">
		<s:token/>
		<s:hidden name="start"></s:hidden>
			<s:hidden name="notice.id"></s:hidden>
			<s:hidden name="notice.clickCount"></s:hidden>
			<s:hidden name="notice.createTime"></s:hidden>
			<s:hidden name="notice.publishTime"></s:hidden>
			<s:hidden name="notice.createUserId"></s:hidden>
			<s:hidden name="notice.status"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							公告编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">保存</a><a href="#" onclick="window.close();">关闭</a>
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
									标题:
								</td>
								<td width="30%">
									<s:textfield name="notice.title" cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="20%">
									模板:
								</td>
								<td width="30%">
									<input type="text" value="${notice.noticeTemplate.name}" id="noticeTemplateName"/>
									<s:hidden name="notice.noticeTemplateId" id="noticeTemplateId" ></s:hidden>
									<a href="javascript:selectTemplate()">选择模板</a>
								</td>
							</tr>
							<tr>
								<td colspan="4">
										<!-- 加载编辑器的容器 -->
										<script id="container" name="notice.content" type="text/plain" style="width:100%;height:450px;">
      										${notice.content}
   										</script>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
	    <!-- 配置文件 -->
	    <script type="text/javascript" src="js/ueditor1_4_3/ueditor.config.js"></script>
	    <!-- 编辑器源码文件 -->
	    <script type="text/javascript" src="js/ueditor1_4_3/ueditor.all.js"></script>
	    <!-- 实例化编辑器 -->
	    <script type="text/javascript">
	        var ue = UE.getEditor('container');
	    </script>
</html>
