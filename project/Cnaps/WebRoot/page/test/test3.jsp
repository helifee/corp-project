<%@ page contentType="text/html; charset=gbk" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>无标题文档</title>

<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/systemManager/systemRoleManage/queryRole.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
</head>
<body>
<html:form method="post" action="systemManage/systemRoleManageAction.do?method=querySystemRole">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%" height="22" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2">查询条件</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                <tr>
                  <td height="40" class="text_tablehead_b">角色名称：</td>
                  <td>
                    <html:text property="name"></html:text>
                  </td>  
              
                   <td  >
                  <input name="Submit23" type="button" class="button" value="查 询" onClick="querySystemRole()" />
                  <logic:equal value="00001" name="orgentity" property="parentidentifier">
                  <input name="Submit232" type="button" class="button" value="新  增" onClick="addSystemRoleView()"/>
                 </logic:equal>
                  </td>   
                </tr>            
              </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                  <td align="center" class="text_listhead">编号</td>
                  <td align="center" class="text_listhead">角色名称</td>
                  <td align="center" class="text_listhead">拼音码</td>
                   <td align="center" class="text_listhead">状态</td>
                 
                <logic:equal value="00001" name="orgentity" property="parentidentifier">
                  <td width="260" align="center" class="text_listhead">数据操作</td>
                  </logic:equal>
                </tr>
                <logic:present name="roleList">
                <logic:iterate id="role" name="roleList">
                <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='#E6E6E6'" bgcolor="#E6E6E6">
                  <td height="33"  class="text_list">${role.identifier}</td>
                  <td  class="text_list">${role.name}</td>
                  <td  class="text_list">${role.phoneticizecode}</td>
                  <td  class="text_list">${role.isactivity }</td>
                 
                <logic:equal value="00001" name="orgentity" property="parentidentifier">
                  <td  class="text_list">
                      <div align="center">
                      <span class="text_list"> 
                        <a href="#" onClick="distributionSystemAuthor('${role.identifier}','${role.name}');"><u>分配权限</u></a> 
                        <a href="#" onClick="querySystemRoleByIndentifier('${role.identifier}');"><u>修改</u></a> 
                        <a href="#" onClick="deleteSystemRole('${role.identifier}');"><u>删除</u></a> 
                        <a href="#" onClick="systemRoleDetail('${role.identifier}');"><u>明细</u></a>   
                        <!-- 
                        <a href="#" onClick="('')"><u>授权修改</u></a>   
                         -->        
                      </span>
                      </div>
                 </td>
                 </logic:equal>
                </tr>
				</logic:iterate>
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>
</html:form>
</body>
</html>
