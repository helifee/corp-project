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
		<script type="text/javascript" src="page/Notice/Notice-list.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="Notice!list">
			<s:hidden name="start"></s:hidden>
			<!-- 路径导航
			<div class="path">
				我的位置：首页&gt;&gt;
				<a href="#">注册参与人</a>
			</div> -->
			<!-- 主区域工具栏 start-->
			
			 <!-- 查询条件 -->
			<div class="s1_searchWrap">
				  <div class="s2">
				    <div class="sl-key"><span>已选条件:</span></div>
				    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
				    <div class="s2-value">
				      <ul id="selectedCond">
				      	<s:if test="#request.statusMap.get(#request.status) != null">
				        	<li id="statusLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">包含下级：${statusMap[status]}</a>
				        		<s:hidden name="status"></s:hidden>
				        	</li>
				      	</s:if>
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
			  <div class="hh">公告列表</div>
			  <div class="t_title_input">
			    <input type="text" name="keyword" id="keyword" placeholder="标题"  value="${keyword }"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="javascript:queryFrm()"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
				  <a href="#" onclick="javascript:editNotice()">发布公告</a>
			  </div>
			  <div class="clear"></div>
			</div>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th >
						公告标题
					</th>
					<th>
						创建人
					</th>
					<th>
						创建时间
					</th>
					<th>
						发布时间
					</th>
					<th>
						点击率
					</th>
					<th>
						状态
					</th>
					<th width="100">
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							${item.title }
						</td>
						<td align="center">
							${item.createUser.realName}
						</td>
						<td align="center">
							<app:date dateTime="${item.createTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<td align="center">
							<app:date dateTime="${item.publishTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<td align="center">
							${item.clickCount}
						</td>
						<td align="center">
							${statusMap[item.status]}
						</td>
						<td align="center">
							<a href="javascript:void(0)" onclick="javascript:delNotice('${item.id}')">删除</a>
							<a href="javascript:void(0)" onclick="javascript:editNotice('${item.id}')">编辑</a>
							<a href="javascript:void(0)" onclick="javascript:publishNotice('${item.id}')">发布</a>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="Notice!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
