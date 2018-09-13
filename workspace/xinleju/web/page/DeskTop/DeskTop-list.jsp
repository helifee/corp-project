<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/DeskTop/DeskTop-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="DeskTop!list" method="post">
			<s:hidden name="start"></s:hidden>
	
			 <!-- 查询条件 -->
			<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      	 <s:if test="#request.typeMap.get(#request.type) != null">
			        	<li id="typeLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">类型：${typeMap[type]}</a>
			        		<s:hidden name="type" value="%{#request.type}"></s:hidden>
			        	</li>
			      	</s:if> 
			      	<s:if test="#request.statusMap.get(#request.status) != null">
			        	<li id="statusLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[status]}</a>
			        		<s:hidden name="status" value="%{#request.status}"></s:hidden>
			        	</li>
			      	</s:if> 
			      </ul> 
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>类型:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.typeMap">
			        	<li class="${key eq type ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','typeLi','type')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','status')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> 
		</div>
		
		
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">桌面</div>
			  <div class="t_title_input">
			    <input type="text" name="keyword" id="title" placeholder="名称"  value="${keyword}"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="javascript:document.frm.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
			  		<a href="#" onclick="javascript:editDeskTop()">新增</a>
			  		<a href="#" onclick="javascript:enable()" class="t_more">启用</a>
				    <a href="#" onclick="javascript:unable()" class="t_del">禁用</a>
			  </div>
			  <div class="clear"></div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','status')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> 
			</div>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll(this)" />
					</th>
					<th width="180px">
						名称
					</th>
					<th width="120px">
						类型
					</th>
					<th width="100px">
						说明
					</th>
					<th width="100px">
						状态
					</th>
					<th width="180px">
						创建时间
					</th>
					<th width="180px">
						编辑时间
					</th>
					<th width="120px">
						操作
					</th>
					
				</tr>
				<s:iterator value="page.items" id="item">
				<s:if test="#item.status == 1">
					<tr class="redTr">
				</s:if>
				<s:else>
					<tr>
				</s:else>
						<td align="center">
							<input name="id" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							${item.name}
						</td>
						<td align="center">
							${typeMap[item.type]}
						</td>
						<td align="center">
							${item.remark }
						</td>
						<td align="center">
							${statusMap[item.status] }
						</td>
						<td align="center">
							<s:date name="#item.createDate" format="yyyy-MM-dd HH:mm:ss"/> 
						</td>
						<td align="center">
							<s:date name="#item.editDate" format="yyyy-MM-dd HH:mm:ss"/> 
						</td>
						<td align="center">
							<a href="#" onclick="javascript:editDeskTop('${item.id}')">编辑</a>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="DesktopComponent!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
