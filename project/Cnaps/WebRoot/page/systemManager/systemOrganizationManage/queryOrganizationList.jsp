<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta   http-equiv="Pragma"   content="no-cache"/>   
<meta   http-equiv="Cache-Control"   content="no-cache"/> 
<meta   http-equiv="Expires"   content="0"/>
<title>无标题文档</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"
			media="screen,projection" />	
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemOrganizationManage/querySystemOrganization.js"></script>
</head>
<body>
<html:form method="post" action="systemManage/systemOrganizationManageAction.do?method=querySystemOrganization">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">
								<!--  &nbsp;系统管理&nbsp;->&nbsp;机构管理&nbsp;->&nbsp;系统机构管理--></h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td ></td>
	<td >
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
              <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td><div class="text_title"><span class="text_blue2">查询条件</span></div></td>
                </tr>
            </table>
            
			 <table width="95%" class="table_head" >
               <tr><td colspan="4"> &nbsp;</td></tr>
                <tr>
                  <td  class="text_tablehead_b">机构名称</td>
                  <td ><div align="left">
                    <html:text property="name"/>
                  </div></td>
                  <td  class="text_tablehead_b">机构代码</td>
                  <td ><div align="left">
                     <html:text property="namecode"/>
                  </div></td>
                  <td  class="text_tablehead_b">机构级别</td>
                  <td >
                    <div align="left">
                   <html:select property="levelCode" >
																	     <logic:equal value="00001" name="orgentity" property="parentidentifier">
																	     <logic:present name="organizationCodeSet">
																         <logic:iterate id="organizationCode" name="organizationCodeSet">
																		  <html:option value="${organizationCode}">
																		  	<c:if test="${organizationCode eq '01'}">总行</c:if>
														                  	<c:if test="${organizationCode eq '02'}">分行</c:if>
														                  	<c:if test="${organizationCode eq '03'}">支行</c:if>
																		  </html:option>
																	      </logic:iterate>
																          </logic:present>
																	     </logic:equal>
																	     <logic:equal value="00004" name="orgentity" property="parentidentifier">
																	     <html:option value="02">分行</html:option>
																	     <html:option value="03">支行</html:option>
																	     </logic:equal>
																	     <logic:notMatch value="0000" name="orgentity" property="parentidentifier">
																	     <html:option value="03">支行</html:option>
																	     </logic:notMatch>
																	</html:select>
                  </div>
                  </td>
                </tr>   
               
                <tr>
                <td colspan="6" align="center">
                       <input name="queryButton" type="button" class="button" value="查 询"  onclick="querySystemOrganization()"/>
                       <logic:equal value="00001" name="orgentity" property="parentidentifier">
                       <input name="addButton" type="button" class="button" value="新 增" onClick="addSystemOrganizationView()"/>
                       </logic:equal>
                  </td>     
                </tr>
                <tr><td colspan="4"> &nbsp;</td></tr>       
            </table>
              <br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                <td   align="center" class="text_listhead">ID号</td>
                  <td  align="center" class="text_listhead">机构名称</td>
                  <td   align="center" class="text_listhead">机构代码</td>
                  <td   align="center" class="text_listhead">机构级别</td>
                  <td  align="center" class="text_listhead">上级机构</td>
                   <td  align="center" class="text_listhead">参与机构号</td>
                  <td  align="center" class="text_listhead">数据操作</td>
                </tr> 
             
                <logic:present name="organizationList">
				  <logic:iterate id="organization" name="organizationList">
				  <tr  class="text_list" onMouseOver="this.bgColor='#CE4C56';" onMouseOut="this.bgColor='#F2F2F2'" bgcolor="#F2F2F2">	
				  <td  class="text_list">${organization.indentifier}</td>	
                  <td  class="text_list">${organization.name}</td>
                  <td  class="text_list">${organization.namecode}</td>
                  <td  class="text_list">
                  	<c:if test="${organization.levelCode eq '01'}">总行</c:if>
                  	<c:if test="${organization.levelCode eq '02'}">分行</c:if>
                  	<c:if test="${organization.levelCode eq '03'}">支行</c:if>
                  </td>
                  <td  class="text_list">${organization.parentidentifier}</td>
                  <td  class="text_list">${organization.bankNumber}</td>
	                 <td  class="text_list"><div align="center"><span class="text_list">
	                 		 <logic:equal value="00001" name="orgentity" property="parentidentifier">
	                 		<a href="#" onClick="querySystemOrganizationByIndentifier('${organization.indentifier}')"><u>修改</u></a>
	                 		
	                 		<c:choose>
	                 			<c:when test="${organization.levelCode eq '02'&& organization.levelCode ne orgentity.levelCode}">
	                 				<a href="#" onClick="deleteSystemOrganization('${organization.indentifier}')"><u>删除</u></a> 
	                 			</c:when>
	                 			<c:when test="${organization.levelCode eq '03'&& organization.levelCode ne orgentity.levelCode}">
	                 				<a href="#" onClick="deleteSystemOrganization('${organization.indentifier}')"><u>删除</u></a> 
	                 			</c:when>
	                 			<c:otherwise></c:otherwise>
	                 		</c:choose>
	                 		 </logic:equal>
	                 		<a href="#" onClick="systemOrganizationDetail('${organization.indentifier}')"><u>明细</u></a>    
	                      </span></div></td>
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
    </tr>  
</table>
</html:form>
</body>
</html>
