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
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript" src="page/BizAuth/BizAuth-BizBtnList.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>

<form id="frm" name="frm" action="BizAuth!authList.do" method="post">
        <input type="hidden" id="roleId" name="roleId" value="${roleId }"/>
        <input type="hidden" id="systemCode" name="systemCode" value="${systemCode }"/>
        <input type="hidden" id="roleIds" name="roleIds"/>
        
        <div class="t_title">
		  <div class="hh">
		    <ul>
		      <li><a href="BizAuth!bizBtnList.do?systemCode=${systemCode }&roleId=${roleId }">授权</a></li>
		      <li class="current"><a href="">已授权查询</a></li>
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
			        	<li class="${key eq systemCode ? 'current' :''}"><a href="BizAuth!authList.do?systemCode=${key}&roleId=${roleId }" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
		</div>
		
		<!-- 标题 -->
		<div class="t_title">
			 <!-- <div class="hh">权限列表</div>
			 <div class="tool">
			  		<input type="text"/><a href="#">查询</a>
			 </div>
			 <div class="clear"></div> -->
	  		<div class="hh">权限列表</div>
			<div class="t_title_input">
				<input type="text" name="name" id="name" placeholder="控制点" value="${name}" />
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:doSearch();">
					<img src="images/icon_search.png" width="24" height="24" align="bottom" />
				</a>
			</div>
		</div>
        
		<table width="100%" cellpadding="0" cellspacing="1" id="tab" class="wd_tablelist01">
			<tr>
				<th style="width:150px">控制点</th>
				<th style="width:150px">维度</th>
				<th>范围</th>
			</tr>
			
			<s:iterator value="page.items" var="item" status="i">
				<tr>
					<td style="text-align:center">${item[0] }</td>
					<td style="text-align:center">${item[1] }</td>
					<td style="text-align:center">${item[2] }<s:if test="#item[3] != null && #item[3] != ''">(${item[3] })</s:if></td>
				</tr>
			</s:iterator>
		</table>
		
		<div class="page">
            <app:PageTag actionName="BizAuth!authList.do"></app:PageTag>
        </div>
	</form>
</body>
</html>