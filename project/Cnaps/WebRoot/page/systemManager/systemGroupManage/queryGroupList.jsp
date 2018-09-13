<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
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
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
</head>
<body>
<html:form method="post" action="systemManage/systemGroupManageAction.do?method=querySystemGroup">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;系统管理&nbsp;->&nbsp;用户组管理&nbsp;->&nbsp;系统用户组管理</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
   <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
            <table width="95%" height="30" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td><div align="center"><span class="text_blue2">查询条件</span></div></td>
                </tr>
            </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;" >
                <tr>
                  <td width="90" height="40" class="text_tablehead_b">名称：</td>
                  <td width="90"><div align="left">
                   <html:text property="teamname"></html:text>
                  </div></td>
                  <td width="90" height="40" class="text_tablehead_b">拼音码：</td>
                  <td width="90"><div align="left">
                   <html:text property="phoneticizecode"></html:text>
                  </div></td>
                  <td width="120" height="40" class="text_tablehead_b">用户组级别：</td>
                  <td width="90"><div align="left">
                   <html:select property="namecode">
							    <logic:notMatch value="0000" name="orgentity" property="parentidentifier">
							    <html:option value="00">支行</html:option>
							    </logic:notMatch>
								<logic:equal value="00004" name="orgentity" property="parentidentifier">
								<html:option value="01">分行</html:option>
								<html:option value="00">支行</html:option>
								 </logic:equal>
								 <logic:equal value="00001" name="orgentity" property="parentidentifier">
								<html:option value="02">省行(总部)</html:option>
								<html:option value="01">分行</html:option>
								<html:option value="00">支行</html:option>
								</logic:equal>
							</html:select>	
                  </div></td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                </tr>  
                <tr>
                <td  colspan="6" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="querySystemGroup()"/> 
                      <logic:equal value="00001" name="orgentity" property="parentidentifier">
                     <input name="addButton" type="button" class="button" value="新 增" onClick="addSystemGroupView()"/>
                       </logic:equal>
                  </td>
                </tr> 
            </table>
              <br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                <td   align="center" class="text_listhead">ID号</td>
                  <td   align="center" class="text_listhead">用户组名称</td>
                  <td   align="center" class="text_listhead">用户组级别</td>
                   <logic:equal value="admin" name="user" property="englishname">
                   <td   align="center" class="text_listhead">用户组类别</td>
                  </logic:equal>
                  <td   align="center" class="text_listhead">拼音码</td>
                  <td   align="center" class="text_listhead">角色</td>
                  <logic:equal value="00001" name="orgentity" property="parentidentifier">
                  <td   align="center" class="text_listhead">数据操作</td>
                  </logic:equal>
                </tr> 
             
                <logic:present name="groupList">
				  <logic:iterate id="group" name="groupList">
				  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
                  <td  class="text_list">${group.teamid }</td>
                  <td  class="text_list">${group.teamname }</td>
                  <td  class="text_list">${group.namecode }</td>
                   <logic:equal value="admin" name="user" property="englishname">
                   <td  class="text_list">${group.englishname }</td>
                   </logic:equal>
                  <td  class="text_list">${group.phoneticizecode }</td>
                   <td  class="text_list">${group.systemrolesmanage.name }</td>
	                  <logic:equal value="00001" name="orgentity" property="parentidentifier">
	                 <td  class="text_list"><div align="center"><span class="text_list">
	                 		<a href="#" onClick="querySystemGroupByIndentifier('${group.teamid }')"><u>修改</u></a>
	                 		<a href="#" onClick="systemGroupDetail('${group.teamid }')"><u>明细</u></a>
	                 		<a href="#" onClick="deleteSystemGroup('${group.teamid }')"><u>删除</u></a>    
	                      </span></div></td>
	                  </logic:equal>
                  </tr>               
                  </logic:iterate>                
                </logic:present>               </table></td>
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
   <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
   
  </tr>  
</table>

</html:form>
</body>
</html>
