<%@ page contentType="text/html; charset=GBK" language="java"%>
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
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>无标题文档</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemRoleManage/addRole.js"></script>
	<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemRoleManageAction.do?method=querySystemRole";
    	}
    </script>
</head>

<body>
<html:form method="post" action="systemManage/systemRoleManageAction.do?method=addSystemRole">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  
  <tr valign="top">
    <td  ></td>
	<td ><br />
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
            <td><div align="center">
            <table width="95%" border="0" cellpadding="0" cellspacing="0">
               
                 <tr>
					<td  >
						<div  class="text_title"><span class="text_blue2">新增角色信息</span></div>
					</td>
				</tr>
				</table>
              <table width="95%" class="table_body">
               
                <tr>
                  <td ><div align="center"  >
                    <table width="60%" >
                    
                      <tr>
                        <td class="text_tablehead"><div align="right">角色名称</div></td>
                        <td class="text_list">
                          <div align="left">
                            <html:text property="name" onblur="chinese2py(this)" />
                            <span class="STYLE1">*</span></div></td></tr>
                            <!--  
                         <tr>
                        <td  class="text_tablehead_b"><div align="right">角色级别:</div></td>
                        <td  class="text_list">
                          <div align="left">
                             <html:select property="namecode" style="width:280px">
								<html:option value="00">支行</html:option>
								<html:option value="01">分行</html:option>
								<html:option value="02">总行(总部)</html:option>
							</html:select>	
                            <span class="STYLE1">*</span></div></td></tr>  
                             -->
                     
                        <tr>
                        	<td  class="text_tablehead" >
								<div align="right"><span >角色类别</span></div>
							</td>
							<td  class="text_list">
								<div align="left">
									<html:select property="roleType" >
									<html:option value="admin">超级系统管理员</html:option>
									<html:option value="00">普通柜员</html:option>
									<html:option value="01">业务主管</html:option>
									</html:select>																		
								</div>
							</td>
						</tr>   									
													 
                        <tr>
	                        <td  class="text_tablehead"><div align="right">拼音码</div></td>
	                        <td  class="text_list">
	                          <div align="left">
	                            <html:text property="phoneticizecode" readonly="true"/>
	                            </div>
	                       </td>
	                   </tr> 
                       <tr>
	                        <td  class="text_tablehead"><div align="right">状态</div></td>
	                        <td  class="text_list">
	                          <div align="left">
	                           <html:select property="isactivity" >
									<html:option value="01">已激活</html:option>
									<html:option value="02">未激活</html:option>
								</html:select>	
	                            </div>
	                        </td>
                      </tr>   
					<tr>
							    <%-- 
                        <td  class="text_tablehead_b"><div align="right">角色类型:</div></td>
                        <td  class="text_list">
                          <div align="left">
                           <html:select  property="type" style="width:280px">
							<logic:present name="roletypeList">
									<logic:iterate id="roletype" name="roletypeList">
										<option value="${roletype.indentifier} ">
											${roletype.name} 
										</option>
									</logic:iterate>
							</logic:present>
							</html:select>	
                            </div></td></tr>   
                             --%>
							  <tr>
                        <td  class="text_tablehead"><div align="right">角色描述</div></td>
                        <td  class="text_list">
                          <div align="left">
                            <html:textarea rows="4" property="common" />
                           </div></td></tr>
                        
                    </table>
                    <table>
                                                    	
                                                    	<tr>
                                                    		<td >
                                                    			 <input name="addRoleButton" type="button" class="button" value="保  存" onclick="addSystemRole(document.forms[0])" />
														&nbsp;</td>
                                                    		
                                                    	</tr>
                                                    	<tr><td >&nbsp;</td></tr>
                                                    	<tr>
                                                    		
                                                    		<td  >
																<span class="STYLE1">说明：红色*标注项为必填项</span>
															</td>
                                                    	</tr>
                                                    	<tr><td colspan="2">&nbsp;</td></tr>
                                                    </table>
                    <br />
                  </div></td>
                </tr>
              </table>
             
            </div></td>
        </tr>
    </table></td>
  <td ></td>
	
  </tr>
</table></html:form> 
</body>
</html>
