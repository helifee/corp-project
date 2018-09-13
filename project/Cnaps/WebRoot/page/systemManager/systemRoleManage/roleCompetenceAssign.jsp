<%@ page language="java" pageEncoding="GBK"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>角色权限分配</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" type="text/css" />
		<link rel="stylesheet" href="<%=path%>/css/roleTrees.css" type="text/css" />
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
		<script src="<%=path%>/js/common/pathUtil.js" type="text/javascript"></script>
		<script src="<%=path%>/ext2.2.1/ext-base.js" type="text/javascript"></script>
		<script src="<%=path%>/ext2.2.1/ext-all.js" type="text/javascript"></script>
		
		<script type="text/javascript"
			src="<%=path%>/js/common/treeCheckBoxNodeUI.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/systemRoleManage/authoratyTree.js" 
			defer="true"></script>
	</head>
	<body>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
 
  <tr valign="top">
    <td ></td>
   <td ><br />
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
       
        <tr>
          <td >&nbsp;</td>
            <td>
            	
            <div align="center">
            	<table width="95%" border="0" cellpadding="0" cellspacing="0">
            		 <tr>
						<td  >
							<div  class="text_title"><span class="text_blue2">角色权限分配</span></div>
						</td>
					</tr>
            	</table>
              <table width="95%" class="table_body">
                
                <tr>
                  <td ><div align="left" class="table_content">
                  <div id="tree"></div>
		          <div id="tree2"></div>
                  </div></td>
                </tr>
              </table>
            </div></td>
        </tr>
    </table></td>
   <td ></td>
   
  </tr>
</table>
		<!-- 角色标识符 -->
		<input id="rolueIdentifier" type="hidden"
			value="${entity.roleindentifier }">
		<!-- 角色中文名称 -->
		<input id="rolename" type="hidden" value="${entity.rolename }">
		<!-- 角色名称代码 -->
		<input id="rolenamecode" type="hidden" value="${entity.rolenamecode }">
		<!-- 权限标识符 -->
		<input id="indentifier" type="hidden" value="${entity.indentifier }">
	</body>
</html>
