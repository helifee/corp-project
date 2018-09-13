<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>

<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemRoleManage/modifyRole.js"></script>
<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemRoleManageAction.do?method=querySystemRole";
    	}
    </script>
</head>
<body>
	<html:form method="post" action="systemManage/systemRoleManageAction.do?method=xxx">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
 
  <tr valign="top">
    <td  ></td>
	 <td ><br />
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td >&nbsp;</td>
            <td><div align="center">
              <table width="60%" height="30" border="0" cellpadding="0" cellspacing="0">
               <tr>
                					<td colspan="2">
                						<div  class="text_title"><span class="text_blue2">角色信息明细</span></div>
                					</td>
                				</tr>
                <tr>
                  <td >
                  
                  <div class="table_body">
                    <table class="table_content" >
                     <tr>
                      <td class="text_details_L"><div align="right">ID号</div></td>
                      <td  class="text_details_R">
                        <div align="left">
                          <html:text property="identifier" value="${entity.identifier }" readonly="true" style="width:180px"/>
                          </div></td>
                    </tr>
                  
 <tr>
                        <td class="text_details_L"><div align="right">角色名称</div></td>
                        <td class="text_details_R">
                          <div align="left">
                            <html:text property="name" value="${entity.name }" readonly="true" style="width:180px"/>
                            </div></td></tr>
                        
                            
                             <tr>
                        <td  class="text_details_L"><div align="right">拼音码</div></td>
                        <td  class="text_details_R">
                          <div align="left">
                            <html:text property="phoneticizecode"  value="${entity.phoneticizecode }" readonly="true" style="width:180px"/>
                            </div></td></tr>   
                            
                               <tr>
                        <td  class="text_details_L"><div align="right">状态</div></td>
                        <td  class="text_details_R">
                          <div align="left">
                           <html:text property="isactivity" value="${entity.isactivity }" style="width:180px" readonly="true"></html:text>	
                            </div></td></tr>   
						
							  <tr>
                        <td  class="text_details_L"><div align="right">角色描述</div></td>
                        <td  class="text_details_R">
                          <div align="left">
                            <html:textarea rows="4" property="common" value="${entity.common }" readonly="true" style="width:180px"/>
                           </div>
                           	  
                           </td></tr>
                           <tr>
                           	<td colspan="2">
                           		<div class="table_content" align="center">
										    		<br />
													<input name="backRole" type="button" class="button" value="返  回" onclick="closewin();" />
													<br />
													<br />
													
													</div>
                           	</td>
                           </tr>
                  </table>
                
                  
                  <br />
                          <br />
                </div>
             
            
            </td></tr>
    </table></td>
  <td></td>
	
  </tr>
</table>
</td></tr></table></html:form>
</body>
</html>
