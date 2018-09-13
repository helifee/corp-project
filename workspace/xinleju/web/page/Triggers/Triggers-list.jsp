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
		<script type="text/javascript" src="page/Triggers/Triggers-list.js"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="Triggers!list">
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
				      	<s:if test="#request.appMap.get(#request.moduleCode) != null">
				        	<li id="moduleCodeLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">所属模块：${appMap[moduleCode].name}</a>
				        		<s:hidden name="moduleCode"></s:hidden>
				        	</li>
				      	</s:if>
				      </ul>
				    </div>
				    <div class="clear"></div>
				  </div>
				  <div class="sl-wrap">
				    <div class="sl-key"><span>所属模块:</span></div>
				    <div class="sl-value">
				      <ul>
				        <s:iterator value="#request.appMap">
				        	<li class="${key eq moduleCode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('所属模块：${value.name}','${key}','moduleCodeLi','moduleCode')" id="${key}">${value.name}</a></li>
				        </s:iterator>
				      </ul>
				    </div>
				    <div class="clear"></div>
				  </div>
				  
			</div>
			
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">任务管理</div>
			  <div class="t_title_input">
			    <input type="text" name="keyword" id="title" placeholder="名称、编码"  value="${keyword }"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="javascript:query(0)"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
				  <a href="#" onclick="javascript:newTrigger()">新增</a>
				  <a href="#" onclick="javascript:pauseTrigger()" class="t_del">暂停</a>
				  <a href="#" onclick="javascript:resumeTrigger()" class="t_submit">恢复</a>
				  <a href="#" onclick="javascript:removeTrigger()" class="t_excel">移除</a>
				  <a href="#" onclick="javascript:startNow()" class="t_more">立刻执行</a>
			  </div>
			  <div class="clear"></div>
			</div>

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th >
						名称
					</th>
					<th>
						编码
					</th>
					<th>
						所属应用
					</th>
					<th>
						运行时间
					</th>
					<%--<th width="180">
						上次执行时间
					</th> --%>
					<th width="180px;">
						下次执行时间
					</th>
					<th width="250px;">
						描述
					</th>
					<th width="40px;">
						状态
					</th>
					<%--<th width="80px;">
						触发器类型
					</th> 
					<th  width="180">
						开始时间
					</th>
					<th  width="180">
						结束时间
					</th>--%>
					<th width="50">
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id.triggerName}_${item.id.triggerGroup}" />
						</td>
						<td align="center">
							<s:property value="getValue(#item.id.triggerName,#item.id.triggerGroup,'name')"/>
						</td>
						<td align="center">
							<s:property value="getValue(#item.id.triggerName,#item.id.triggerGroup,'code')" />
						</td>
						<td align="center">
							<s:property value="getModuleName(#item.id.triggerName,#item.id.triggerGroup)" />
						</td>
						<td align="center">
							<s:property value="getCronExpression(#item.id.schedName,#item.id.triggerName,#item.id.triggerGroup)" />
						</td>
						<%--<td align="center">
							<s:if test="#item.prevFireTime == 0">
								－
							</s:if>
							<s:else>
								<app:date longTime="${item.prevFireTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
							</s:else>
						</td> --%>
						<td align="center">
							<s:if test="#item.nextFireTime == 0">
								－
							</s:if>
							<s:else>
								<app:date longTime="${item.nextFireTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
							</s:else>
						</td>
						<td align="center">
							<s:property value="getValue(#item.id.triggerName,#item.id.triggerGroup,'remark')"/>
						</td>
						<td align="center">
							${statusMap[item.triggerState]}
						</td>
					<%--	<td align="center">
							${item.triggerType}
						</td> 
						<td align="center">
							<s:if test="#item.startTime == 0">
								－
							</s:if>
							<s:else>
								<app:date  longTime="${item.startTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
							</s:else>
						</td>
						<td align="center">
							<s:if test="#item.endTime == 0">
								－
							</s:if>
							<s:else>
								<app:date  longTime="${item.endTime }" style="yyyy-MM-dd HH:mm:ss"></app:date>
							</s:else>
						</td>--%>
						<td align="center">
							<a href="javascript:void(0)" onclick="javascript:editTrigger('${item.id.triggerName}_${item.id.triggerGroup}')">编辑</a>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="Triggers!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
