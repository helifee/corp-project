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
		<script type="text/javascript" src="page/FormDefine/FormDefine-list.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="FormDefine!list">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="formCtId" id="formCtId"></s:hidden>
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
				      	<s:if test="#request.ifIncludeNextLevelMap.get(#request.ifIncludeNextLevel) != null">
				        	<li id="ifIncludeNextLevelLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">包含下级：${ifIncludeNextLevelMap[ifIncludeNextLevel]}</a>
				        		<s:hidden name="ifIncludeNextLevel"></s:hidden>
				        	</li>
				      	</s:if>
				      	<s:if test="#request.statusMap.get(#request.status) != null">
				        	<li id="statusLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[status]}</a>
				        		<s:hidden name="status"></s:hidden>
				        	</li>
				      	</s:if>
				      </ul>
				    </div>
				    <div class="clear"></div>
				  </div>
				  <div class="sl-wrap">
				    <div class="sl-key"><span>包含下级:</span></div>
				    <div class="sl-value">
				      <ul>
				        <s:iterator value="#request.ifIncludeNextLevelMap">
				        	<li class="${key eq ifIncludeNextLevel ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('包含下级：${value}','${key}','ifIncludeNextLevelLi','ifIncludeNextLevel')" id="${key}">${value}</a></li>
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
			  <div class="hh">表单定义</div>
			  <div class="t_title_input">
			    <input type="text" name="keyword" id="title" placeholder="名称"  value="${keyword }"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="javascript:queryFrm()"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
				  <a href="#" onclick="javascript:newFormCt()">新增分类</a>
				  <a href="#" onclick="javascript:editFormCt('${formCtId}')" class="t_edit">编辑分类</a>
				  <a href="#" onclick="javascript:newFormDefine()">新增</a>
			  </div>
			  <div class="clear"></div>
			</div>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th >
						表单名称
					</th>
					<th>
						表单编码
					</th>
					<th>
						所属类别
					</th>
					<th>
						表单版本
					</th>
					<th width="150">
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							${item.name }
						</td>
						<td align="center">
							${item.code }
						</td>
						<td align="center">
							${item.formCt.name}
						</td>
						<td align="center">
							 ${item.formVersion}<a href="javascript:void(0)" onclick="toHistory('${item.code}')">更多版本</a>
						</td>
						<td align="center">
							<s:if test="#item.status == 0">
								<a href="javascript:void(0)" onclick="javascript:editFormDefine('${item.id}')">编辑</a>
							</s:if>
							<s:else>
								<a href="javascript:void(0)" onclick="javascript:checkOutFormDefine('${item.id}')">检出</a>
							</s:else>
							<a href="javascript:void(0)" onclick="javascript:viewFormDefine('${item.id}')">查看</a>
							<a href="javascript:void(0)" onclick="javascript:toWriteFormData('${item.code}')">填单</a>
							<a href="javascript:void(0)" onclick="javascript:formDataList('${item.code}')">数据</a>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="FormDefine!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
