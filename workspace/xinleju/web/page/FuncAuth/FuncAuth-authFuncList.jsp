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
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript" src="page/FuncAuth/FuncAuth-funcBtnList.js?t=<%=System.currentTimeMillis()%>"></script>
<script language="javascript" type="text/javascript">
	function loadAuthFuncList(sysCode, rId) {
// 		window.parent.loadAuthData(sysCode);
		var dt = new Date();
		$("#roleId").attr("value", rId);
		$("#systemCode").attr("value", sysCode);
// 		alert(sysCode + "---" + $("#systemCode").attr("value"));
// 		window.location.ref = "FuncAuth!funcBtnList.do?roleId=" + rId + "&systemCode=" + sysCode + "&dt=" + dt;
// 		window.location.reload();
		$("#frm").submit();
// 		                         "FuncAuth!funcBtnList.do?roleId=" + node.id+"&systemCode="+systemCode+"&dt="+dt;
	}
</script>


</head>
<body>

<form id="frm" name="frm" action="FuncAuth!authFuncList.do" method="post">
        <input type="hidden" id="start" name="start" value="${start }"/>
        <input type="hidden" id="roleId" name="roleId" value="${roleId }"/>
        <input type="hidden" id="roleIds" name="roleIds"/>
        <s:hidden name="systemCode" id="systemCode"></s:hidden>
        
		<div class="t_title">
		  <div class="hh">
		    <ul>
		      <li><a href="FuncAuth!funcBtnList.do?systemCode=${systemCode }&roleId=${roleId}">授权</a></li>
		      <li  class="current"><a href="FuncAuth!authFuncList.do?systemCode=${systemCode }&${roleId}">已授权查询</a></li>
		    </ul>
		  </div>
		  <div class="clear"></div>
		</div>
		 
        <!-- 查询条件 -->
		 <div class="s1_searchWrap">
			  <div class="sl-wrap">
			    <div class="sl-key"><span>业务模块:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.appMap">
			        	<li class="${key eq systemCode ? 'current' :''}"><a href="javascript:void(0)" onclick="loadAuthFuncList('${key}', '${roleId}');" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
		</div> 
		
		<!-- 标题 -->
		<div class="t_title">
		  <div class="hh">权限列表</div>
		  <div class="tool">
		  </div>
		  <div class="clear"></div>
		</div>
        
        
		<table width="100%" cellpadding="0" cellspacing="1" id="tab" class="wd_tablelist01">
			<tr>
				<th style="width:150px">功能模块</th>
	
				<th>菜单/按钮</th>
			</tr>
			
				<s:iterator value="page.items" var="pfm" status="i">
				    
					<tr>
						<td>
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
						<td></td>
					</tr>
					
				    <s:iterator value="#pfm.childModuleList" var="cfm">
				    
				        <s:set id="isExistCRM" value="isExistRM(roleId, #cfm.id)"></s:set>
				        
					    <tr class="tr_${pfm.id}"
					       <s:if test="#i.index > 0">
					           style="display: none"
					       </s:if>
					    >
		                    <td></td>
		                    <td><!-- img src="images/icon_dot.gif" border="0" align="absmiddle"/-->&nbsp;${cfm.name }</td>
		                </tr>
		                
		                <s:if test="#cfm.buttonList != null && #cfm.buttonList.size() > 0">
			                    <tr class="tr_${pfm.id}"
		                           <s:if test="#i.index > 0">
		                               style="display: none"
		                           </s:if>
			                    >
			                        <td></td>
			                        <td style="text-align:left;padding-left:40px;padding-top:10px;"  >
						                
						                <s:iterator value="#cfm.buttonList" var="btn" status="s">
				                           	<!-- img src="images/icon_dot2.jpg" border="0" align="absmiddle"/-->&nbsp;${btn.name }
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				                           <s:if test="#s.count % 4 == 0"><br></s:if>
						                </s:iterator>
			                        </td>
			                    </tr>	                
		                </s:if>
		                
		                
				    </s:iterator>	
					
			    </s:iterator>
		</table>
		
        <div class="page">
            <app:PageTag actionName="FuncAuth!funcBtnList.do"></app:PageTag>
        </div>		
	</form>
</body>

</html>