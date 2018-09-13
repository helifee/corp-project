<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>功能授权</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/mask.css" />

<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script language="javascript" type="text/javascript" src="page/FuncAuth/FuncAuth-rolesFuncBtnList.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
</head>
<body>

<form id="frm" name="frm" action="FuncAuth!rolesFuncBtnList.do" method="post">
        <input type="hidden" id="start" name="start" value="${start }"/>
        <input type="hidden" id="roleId" name="roleId" value="${roleIds }"/>
        <input type="hidden" id="roleIds" name="roleIds"/>
        <s:hidden name="systemCode" id="systemCode"></s:hidden>
        
		<div class="t_title">
		  <div class="hh">
		    <ul>
		      <li class="current"><a href="FuncAuth!rolesFuncBtnList.do?systemCode=${systemCode }">授权</a></li>
		    </ul>
		  </div>
		  <div class="clear"></div>
		</div>

		<div class="t_title">
		  <div class="hh">权限列表(${roleNames })</div>
		  <div class="tool">
		  		<a href="#" onclick="selectRole(1);" class="t_new">引用其他标准角色权限</a>
		  		<a href="#" onclick="save(1);" class="t_save">保存</a>
		  </div>
		  <div class="clear"></div>
		</div>
        
        
		<table width="100%" cellpadding="0" cellspacing="1" id="tab" class="wd_tablelist01">
			<tr>
				<th style="width:150px">业务模块</th>
				<th style="width:150px">功能模块</th>
	
				<th>菜单/按钮</th>
			</tr>
			
			<s:iterator value="#request.appMap" var="val" status = "ap" >
			       <tr onclick="clickThisRow('m_${value.id}');" >
						<td>
						<%-- <s:set id="isExistValue" value="isExistRM(roleId, #val.id)"></s:set> --%>
						<input type="checkbox" class="m_${value.id}" id="m_${value.id}" name="moduleIds" value="${value.id}" onclick="clickThisRow('m_${value.id}');" />&nbsp;&nbsp;
						<img src="images/icon_add01.png" style="display: none" 
                                    onclick="showOrHideApp('${key}',true);" id="app_img_${key}_show" width="13" height="13" border="0" align="absmiddle"/>
                                    
                                <img src="images/icon_s01.png" 
                                          
                                onclick="showOrHideApp('${key}',false);" id="app_img_${key}_hide" width="13" height="13" border="0" align="absmiddle"/>
						${value.name}
						</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				<s:iterator value="page.items" var="pfm" status="i">
				    <s:if test="key eq #pfm.systemCode">
					<tr class="tr_m_${key }" onclick="clickThisRow('m_${value.id}_${pfm.id}');">
						<td>&nbsp;</td>
						<td>
						    <input type="checkbox" class="m_${value.id}_${pfm.id}" id="m_${value.id}_${pfm.id}" name="moduleIds" value="${pfm.id }" <s:if test="isExistPRM">checked="checked"</s:if> onclick="clickThisRow('m_${value.id}_${pfm.id}');" />&nbsp;<!-- img src="images/icon_dot.gif" border="0" align="absmiddle"/-->&nbsp;

                                <img src="images/icon_add01.png" 
                                    <s:if test="#i.index == 0">
	                                    style="display: none" 
                                    </s:if>
                                    onclick="showOrHideFunc('${pfm.id}',true);" id="img_${pfm.id}_show" width="13" height="13" border="0" align="absmiddle"/>
                                    
                                <img src="images/icon_s01.png"   
                                
                                    <s:if test="#i.index > 0">
                                        style="display: none" 
                                    </s:if>
                                                                    
                                onclick="showOrHideFunc('${pfm.id}',false);" id="img_${pfm.id}_hide" width="13" height="13" border="0" align="absmiddle"/>

						    ${pfm.name }
						</td>
						<td>&nbsp;</td>
					</tr>
					
				    <s:iterator value="#pfm.childModuleList" var="cfm">
				    
					    <tr class="tr_${pfm.id} tr_m_${key }" onclick="clickThisRow('m_${value.id}_${pfm.id}_${cfm.id}');"
					       <s:if test="#i.index > 0">
					           style="display: none"
					       </s:if>
					    >
					    <td>&nbsp;</td>
		                 <td>&nbsp;</td>
		                    <td><input type="checkbox" class="m_${value.id}_${pfm.id}_${cfm.id}" id="m_${value.id}_${pfm.id}_${cfm.id}" name="moduleIds" value="${cfm.id}" onclick="clickThisRow('m_${value.id}_${pfm.id}_${cfm.id}');" />&nbsp;<!-- img src="images/icon_dot.gif" border="0" align="absmiddle"/-->&nbsp;${cfm.name }</td>
		                </tr>
		                
		                <s:if test="#cfm.buttonList != null && #cfm.buttonList.size() > 0">
			                    <tr class="tr_${pfm.id} tr_m_${key }"
		                           <s:if test="#i.index > 0">
		                               style="display: none"
		                           </s:if>
			                    >
			                    <td>&nbsp;</td>
			                        <td>&nbsp;</td>
			                        <td style="text-align:left;padding-left:40px;padding-top:10px;"  >
						                
						                <s:iterator value="#cfm.buttonList" var="btn" status="s">
						                
				                           <input type="checkbox" class="m_${value.id}_${pfm.id}_${cfm.id}_${btn.id}" name="btnIds" value="${btn.id}"  onclick="clickMe(this);"/>&nbsp;&nbsp;${btn.name }
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				                           <s:if test="#s.count % 4 == 0"><br></s:if>
						                </s:iterator>
			                        </td>
			                    </tr>	                
		                </s:if>
		                
		                
				    </s:iterator>	
					</s:if>
			    </s:iterator>
			     </s:iterator>
		</table>
		
	</form>
</body>

</html>