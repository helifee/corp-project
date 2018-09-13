<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>查询用户列表</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpspartyalterdetailAction.do?method=findList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="8" height="48" background="<%=path%>/image/content_table_TL.jpg"></td>
    <td background="<%=path%>/image/content_table_TM.jpg"><table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="360" background="<%=path%>/image/content_table_bar_L.jpg">
        <img src="<%=path%>/image/sys_arrow1.jpg" width="15" height="15" /> </td>
        <td width="194" background="<%=path%>/image/content_table_bar_L.jpg"></td>
        <td width="270" background="<%=path%>/image/content_table_bar_R.jpg"></td>
      </tr>
    </table></td>
    <td width="8" background="<%=path%>/image/content_table_TR.jpg"></td>
  </tr>
  <tr valign="top">
    <td background="<%=path%>/image/content_table_line_L.jpg"></td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#B9E3F5);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center"><%--
            <table width="95%" height="30" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td><div align="center"><span class="text_blue2">查询条件</span></div></td>
                </tr>
            </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="normalline">
                <tr>
                  <td  height="40" class="text_tablehead_b">用户名称：</td>
                  <td ><div align="left">
                   <html:text property="username" style="width:180px"></html:text>
                  </div></td>
                  <td  height="40" class="text_tablehead_b">用户状态：</td>
                  <td> 
                  	<div align="left"> 
                  		<html:select property="userisactivity" style="width:180px">
                  					<html:option value="">全部</html:option>
                  					<html:option value="01">激活</html:option>
                  					<html:option value="02">冻结</html:option>
                  		</html:select>
                  	</div>
                  </td>
                   <td  height="40" class="text_tablehead_b">用户组：</td>
                  <td >
                    <div align="left">
                    <html:select property="usergrouptype" style="width:180px">
                    	<html:option value="">全部</html:option>
                    	<logic:present name="userGroupList">
                    	<logic:iterate id="userGroup" name="userGroupList">
                    		<html:option value="${userGroup.teamid}">${userGroup.teamname}</html:option>
                    	</logic:iterate>
                    </logic:present>
                    </html:select>
                  </div>
                  </td>
                  </tr>
                  <tr>
                   <td  height="40" class="text_tablehead_b">所属机构：</td>
                  <td ><div align="left">
                    <html:select property="organizationindentifier" style="width: 180px">
																		<logic:present name="organizationList">
																			<logic:iterate id="organization" name="organizationList">
																					<html:option value="${organization.namecode }">
																		                  	${organization.name }															                  	
																						</html:option>
																			</logic:iterate>
																		</logic:present>
					</html:select>
                  </div></td>
                  <td colspan="4" align="center">
                    <input name="queryList" id="queryList" style="cursor:pointer" type="button" class="button" value="查 询"  onclick="queryUserList()"/>               
                    <input name="addUser" id="addUser" type="button" style="cursor:pointer" class="button" value="新 增" onClick="prepareAddUser()"/>
                  </td>
                </tr>   
            </table>
              --%><br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                   <td  align="center" class="text_listhead">序号</td>
                   <td  align="center" class="text_listhead">关联序号</td>
                   <td  align="center" class="text_listhead">变更类型</td>
                   <td  align="center" class="text_listhead">参与机构号</td>
                   <td  align="center" class="text_listhead">参与机构名称</td>
                   <td  align="center" class="text_listhead">参与机构别名</td>
                   <td  align="center" class="text_listhead">行别代码</td>
                   <td  align="center" class="text_listhead">参与机构类型</td>
                   <td  align="center" class="text_listhead">代理清算参与机构号</td>
                  <td  align="center" class="text_listhead">生效日期</td>
                  <td  align="center" class="text_listhead">工作日期</td>
                
                </tr> 
                <logic:present name="queryList">
				  <logic:iterate id="po" name="queryList">
				  <tr onMouseOver="this.bgColor='#B4FFFF';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
                  <td  class="text_list"><div class="gridCell_standard">${po.Id }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ParentId }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ChgTp }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.PtyId }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.BankName }</td>
                    <td  class="text_list"><div class="gridCell_standard">${po.BankAliaseName }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.BkCtgyCd }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.PtyTp }</td>   
                  <td  class="text_list"><div class="gridCell_standard">${po.SttlmAgtId }</td>     
                  <td  class="text_list"><div class="gridCell_standard">${po.EffDate }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.workdate }</td>   
                   
                  </tr>               
                  </logic:iterate>                
                </logic:present></table></div></div></td>
         </tr>
			<tr>  
	       <td></td>      
	       <td>
	       <table width="100%" border="0" cellpadding="0" cellspacing="0">
        	<tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
          </tr>
         </table></td>
	      <td></td>
	      </tr>
    </table></td>
    <td background="<%=path%>/image/content_table_line_R.jpg"></td>
  </tr>  
</table>
</html:form>
</body>
</html>
