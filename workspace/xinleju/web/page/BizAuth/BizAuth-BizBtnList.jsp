<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>数据授权</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script language="javascript" type="text/javascript" src="page/BizAuth/BizAuth-BizBtnList.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
</head>
<body>

<form id="frm" name="frm" action="BizAuth!bizBtnList.do" method="post">
        <input type="hidden" id="roleId" name="roleId" value="${roleId }"/>
        <input type="hidden" id="systemCode" name="systemCode" value="${systemCode }"/>
        <input type="hidden" id="roleIds" name="roleIds"/>
        <div class="t_title">
		  <div class="hh">
		    <ul>
		      <li class="current"><a href="#">授权</a></li>
		      <li><a href="BizAuth!authList.do?systemCode=${systemCode }&roleId=${roleId }">已授权查询</a></li>
		    </ul>
		  </div>
		  <div class="clear"></div>
		</div>
		 
        <!-- 查询条件 -->
		<div class="s1_searchWrap">
			  <div class="sl-wrap" style="min-width: 0px;">
			    <div class="sl-key"><span>业务模块:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.appMap">
			        	<li class="${key eq systemCode ? 'current' :''}"><a href="#" onclick="loadData('${key}')" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
		</div>
		
		<!-- 标题 -->
		<div class="t_title">
		  <div class="hh">权限列表(${roleName })</div>
			<div class="t_title_input">	
			</div>
			<div class="t_title_input">
				
			</div>
		  <div class="tool">
		  		<a href="#" onclick="selectRole(1);" class="t_new">引用其他角色权限</a>
		  		<a href="#" onclick="save(1);" class="t_save">保存</a>
		  </div>
		  <div class="clear"></div>
		</div>
        
		<table width="100%" cellpadding="0" cellspacing="1" id="tab" class="wd_tablelist01">
			<tr>
				<th style="width:150px">控制点</th>
				<th style="width:150px">维度</th>
				<th>范围</th>
			</tr>
			
			<s:iterator value="bizAuthListDTOs" var="bzl" status="i">
				<tr>
					<td style="text-align:center">${bzl.dataCtrlName }</td>
					<td style="text-align:center">${bzl.dataFieldName }</td>
					<td>
					 <table>
					  <tr>  
						<s:iterator value="#bzl.dataScopeList" var="dsl">
						<td style="width:95px">
						 <input type="radio" id="${dsl.dataScopeId}" name="scopeIds_${bzl.dataFieldId }" onclick="hasChange = true;" value="${dsl.dataScopeId}<s:if test="#dsl.dataScopeUrl != null && #dsl.dataScopeUrl != '' && #dsl.otherOptions != null && #dsl.otherOptions != ''">-${dsl.otherOptions}</s:if>"
							<s:if test="#dsl.isSelected == 1"> checked="checked" </s:if>/>
							   ${dsl.dataScopeName}
					     </td>
					     
						</s:iterator>
						<td width="55px">
					       <s:iterator value="#bzl.dataScopeList" var="dsl">
					          <s:if test="#dsl.dataScopeUrl != null && #dsl.dataScopeUrl != ''">
								&nbsp;<a href="#" onclick="selectOptions('${dsl.dataScopeId}')" style="color:blue">选择分类</a>
							</s:if>
					       </s:iterator>
					     </td> 
					</tr>
					</table>
					</td>
				</tr>
			</s:iterator>
		</table>
	</form>
</body>
</html>