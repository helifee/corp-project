<%@ page contentType="text/html;charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<base href="<%=basePath%>">
	<title>菜单编辑</title>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext2.2.1/resources/css/ext-all.css">
	<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
    <script type="text/javascript" src="<%=basePath%>/ext2.2.1/ext-base.js"></script>
    <script type="text/javascript" src="<%=basePath%>/ext2.2.1/ext-all.js"></script>
	<script type="text/javascript">
		function checkForm(form){
		var nums=16;
		var numsbz=200;
			if(form.parentidentifier.value == "" || form.isactivity.value == ""){
				Ext.Msg.alert("错误提示","表单信息不健全！");
				return false;
			}
			if(form.name.value == ""){
				Ext.Msg.alert("错误提示","标题不能为空！");
				return false;
			}
	       if(form.namecode.value.length>=nums){
				Ext.Msg.alert("错误提示","代码不能超过"+nums+"个字符！");
				return false;
			}
			
			  if(form.phoneticizecode.value.length>=nums){
				Ext.Msg.alert("错误提示","拼音码不能超过"+nums+"个字符！");
				return false;
			}
		     if(form.commcon.value.length>=numsbz){
				Ext.Msg.alert("错误提示","备注不能超过"+numsbz+"个字符！");
				return false;
			}
		}
	</script>
</head>
<body style="background-color: white">
	<br/><br/>
	<form action="<%=basePath%>/systemManage/systemMenusManage/SystemmenusmanageAction.do?method=saveNodes" method="post" onsubmit="return checkForm(this)">
		<input type="hidden" name="indentifier" value="${obj.indentifier}"/>
		<input type="hidden" name="parentidentifier" value="${obj.parentidentifier}"/>
		<input type="hidden" name="isactivity" value="${obj.isactivity}"/>
	  <input type="hidden" name="num" value="${obj.num}"/> 
		<table align="center">
			<tr><td width="60">标题：</td>
				<td><input type="text" name="name" value="${obj.name}"/></td></tr>
				
			 <tr><td width="60">类别：</td> <td>
			 <select name="namecode" value="${obj.namecode}" style="width: 150px">
                 				<option value="cdt">普通柜员</option>
                 				<option value="znt">业务主管</option>
                 				<option value="ggx">公共项</option>
                 				<option value="admin">管理员</option>
                 </select>
			<!--  <input type="text" name="namecode" value="${obj.namecode}" maxlength="16"/>
			</td></tr>
			 <tr><td width="60">拼音码：</td> <td><input type="text" name="phoneticizecode" value="${obj.phoneticizecode}" maxlength="16" /></td></tr>
			 -->
			  <tr><td width="60">备注：</td> <td> <textarea rows="10" cols="20" name="commcon"  maxlength="200" >${obj.commcon}</textarea>    </td></tr>
			  
			<c:if test="${obj.isactivity==1}">
			<tr><td>URL：</td>
				<td><input type="text" name="linkurl" value="${obj.linkurl}"/></td></tr>
			</c:if>
			<tr><td colspan="2" align="center">
					<br/>
					<input type="submit" name="submit" value="保存"/>
					&nbsp;&nbsp;
					<input type="reset" name="reset" value="重置"/>
					&nbsp;&nbsp;
					<input type="button" name="button" value="取消" onclick="window.parent.FormEditWin.close();">
				</td></tr>
		</table>
	</form>
</body>
</html>
