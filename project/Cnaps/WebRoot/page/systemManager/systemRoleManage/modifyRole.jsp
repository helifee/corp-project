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
<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemRoleManage/modifyRole.js"></script>
<script language="javascript">
    	function closewin(){
    		window.parent.location.href="<%=path%>/systemManage/systemRoleManageAction.do?method=querySystemRole";
    	}
    </script>
</head>
<body>
	<html:form method="post" action="systemManage/systemRoleManageAction.do?method=modifySystemRole">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">
								
								</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
   <td></td>
	<td ><br />
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
            <td><div align="center">
            <table  width="95%" border="0" cellpadding="0" cellspacing="0">
            	 <tr>
					<td  >
						<div  class="text_title"><span class="text_blue2">角色信息修改</span></div>
					</td>
				</tr>
            </table>
              <table width="95%" height="30" border="0" cellpadding="0" cellspacing="0">
                
                <tr>
                  <td ><div align="center" class="table_content">
                    <table width="60%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                      <tr>
                      <td class="text_tablehead_b"><div align="right">ID号</div></td>
                      <td  class="text_list">
                        <div align="left">
                          <html:text property="identifier" value="${entity.identifier }" readonly="true" style="width:280px"/>
                          <span class="STYLE1">*</span></div></td>
                    </tr>
                  
 					<tr>
                        <td class="text_tablehead_b"><div align="right">角色名称:</div></td>
                        <td class="text_list">
                          <div align="left">
                            <html:text property="name" onblur="chinese2py(this)" value="${entity.name }" style="width:280px"/>
                            <span class="STYLE1">*</span></div>
                        </td>
                   </tr>
                      <tr>
						<td  class="text_tablehead" style="width:100px">
							<div align="right">
							<span class="text_tablehead_b">角色类别:</span>
								</div>
						</td>
						<td  class="text_list">
							<div align="left">
								<html:select property="roleType" style="width:280px">
									<html:option value="00">普通柜员</html:option>
									<html:option value="01">业务主管</html:option>
									<html:option value="02">普通管理员</html:option>
									<html:option value="admin">超级系统管理员</html:option>
								</html:select>																		
																	</div>
																</td>
															</tr>   
                    <tr>   
                        <td  class="text_tablehead_b"><div align="right">拼音码:</div></td>
                        <td  class="text_list">
                          <div align="left">
                            <html:text property="phoneticizecode" readonly="true"  value="${entity.phoneticizecode }" style="width:280px"/>
                            </div></td></tr>   
                            
                               <tr>
                        <td  class="text_tablehead_b"><div align="right">状态:</div></td>
                        <td  class="text_list">
                          <div align="left">
                           <html:select property="isactivity" style="width:280px">
								<html:option value="01">已激活</html:option>
								<html:option value="02">未激活</html:option>
							</html:select>	
                            </div></td></tr>   
							  
							  <tr>
                        <td  class="text_tablehead_b"><div align="right">角色描述:</div></td>
                        <td  class="text_list">
                          <div align="left">
                            <html:textarea rows="4" property="common" value="${entity.common }" style="width:280px"/>
                           </div></td></tr>
                  </table>
                  <span class="STYLE1">说明：*标注的为必填项</span><br />
                  <br />
                  <input name="modifyRole" type="button" class="button" value="保  存" onclick="modifySystemRole(document.forms[0])" />
                  <input name="backRole" type="button" class="button" value="返  回" onclick="closewin();" />
                  <br />
                          <br />
                </div>
             
            
            </td></tr>
    </table></td>
   <td ></td>
	
  </tr>
</table>
</td></tr></table></html:form>
</body>
</html>
