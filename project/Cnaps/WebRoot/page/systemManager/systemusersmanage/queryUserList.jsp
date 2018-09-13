<%@ page contentType="text/html; charset=GBK" language="java" %>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>��ѯ�û��б�</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"
			media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemUserManage/queryUserList.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
</head>
<body>
<html:form  method="post" action="systemManage/systemUserManage/systemUserManageAction.do?method=queryUserList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  
  <tr valign="top">
    <td  ></td>
	<td >
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
          <br/>
            <div align="center">
           <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td  ><div class="text_title"><span class="text_blue2">��ѯ����</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" class="table_head">
                <tr><td colspan="4"> &nbsp;</td></tr>
                <tr>
                  <td  class="text_tablehead_b">�û����ƣ�</td>
                  <td ><div align="left">
                   <html:text property="username" style="width:180px"></html:text>
                  </div></td>
                  <td   class="text_tablehead_b">�û�״̬��</td>
                  <td> 
                  	<div align="left"> 
                  		<html:select property="userisactivity" style="width:180px">
                  					<html:option value="">ȫ��</html:option>
                  					<html:option value="01">����</html:option>
                  					<html:option value="02">����</html:option>
                  		</html:select>
                  	</div>
                  </td>
                   <td   class="text_tablehead_b">������ɫ��</td>
                  <td >
                    <div align="left">
                    <html:select property="usergrouptype" style="width:180px">
                    	<html:option value="">ȫ��</html:option>
                    	<logic:present name="userGroupList">
                    	<logic:iterate id="userGroup" name="userGroupList">
                    		<html:option value="${userGroup.identifier}">${userGroup.name}</html:option>
                    	</logic:iterate>
                    </logic:present>
                    </html:select>
                  </div>
                  </td>
                  </tr>
                  <tr>
                   <td   class="text_tablehead_b">����������</td>
                  <td ><div align="left">
                    <html:select property="organizationindentifier" style="width: 180px">
                    <html:option value="">ȫ��</html:option>
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
                    <input name="queryList" id="queryList" style="cursor:pointer" type="button" class="button" value="�� ѯ"  onclick="queryUserList()"/>               
                    <input name="addUser" id="addUser" type="button" style="cursor:pointer" class="button" value="�� ��" onClick="prepareAddUser()"/>
                  </td>
                </tr>
                 <tr><td colspan="4"> &nbsp;</td></tr>   
            </table>
              <br><div align="center">
              <table width="95%" class="tbcolor">
                <tr  class="text_listhead">
                   <td >��ʵ����</td>
                   <td >��½����</td>
                  <td >�û�״̬</td>
                  
                  <td >����</td>
                   <td >��ɫ</td>
                  <td >���ݲ���</td>
                </tr> 
                <logic:present name="userList">
				  <logic:iterate id="userBean" name="userList">
				  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='#F2F2F2'" style="cursor: hand;" bgcolor="#F2F2F2">		
                  <td  class="text_list"><div >${userBean.realname }</div></td>
                  <td  class="text_list"><div >${userBean.username }</div></td>
                  <td  class="text_list"><div >${userBean.userisactivity }</div></td>
                 
                  <td  class="text_list"><div >${userBean.systemorganizationsmanage.name }</div></td>
                  <td  class="text_list"><div >${userBean.systemRole.name }</div></td>
	              <td  class="text_list">
	              
	              <div ><span class="text_list">
	              
	             <c:choose>
	             	<c:when test="${userBean.systemorganizationsmanage.levelCode eq '01'
	             		&& userBean.systemRole.roleType eq 'admin'}"></c:when>
	             	<c:otherwise>
	             	 <a href="#" onClick="modifyByKey('${userBean.userindetifier }')"><u>�޸�</u></a>
	             	</c:otherwise>
	             </c:choose>
	              <a href="#" onClick="viewByKey('${userBean.userindetifier }')"><u>��ϸ</u></a>
	               <c:choose>
	             	<c:when test="${userBean.systemorganizationsmanage.levelCode eq '01'
	             		&& userBean.systemRole.roleType eq 'admin'}"></c:when>
	             	<c:otherwise>
	             	<a href="#" onClick="deleteByKey('${userBean.userindetifier }')"><u>ɾ��</u></a>
	             	</c:otherwise>
	             </c:choose>
	               
	               <a href="#" onClick="modifyPasswordByKey('${userBean.userindetifier }')"><u>�޸�����</u></a> 
	                
	              <a href="#" onClick="resetPasswordByKey('${userBean.userindetifier }')"><u>��������</u></a>    
	              </span></div></td>
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
   <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
	
  </tr>  
</table>
</html:form>
</body>
</html>
