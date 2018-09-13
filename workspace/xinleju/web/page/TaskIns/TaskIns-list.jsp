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
		<script type="text/javascript" src="page/TaskIns/TaskIns-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="TaskIns!list">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="ifShowMore" id="ifShowMore"></s:hidden>
			<!-- 路径导航
			<div class="path">
				我的位置：首页&gt;&gt;
				<a href="#">注册参与人</a>
			</div> -->
			<!-- 主区域工具栏 start
			<div class="top_tool_box">
			</div>-->
			
			
			<!-- 查询条件 -->
			<div class="s1_searchWrap">
				  <div class="s2">
				    <div class="sl-key"><span>已选条件:</span></div>
				    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
				    <div class="s2-value">
				      <ul id="selectedCond">
				      	<s:if test="#request.appMap.get(taskInsDto.moduleCode) != null">
				        	<li id="moduleCodeLi">
				        		<a href="javascript:void(0)" onclick="clearCurrent(this)">所属模块：${appMap[taskInsDto.moduleCode].name}</a>
				        		<s:hidden name="taskInsDto.moduleCode"></s:hidden>
				        	</li>
				      	</s:if>
				      	<s:if test="#request.statusMap.get(taskInsDto.status) != null">
					        <li id="statusLi">
					        		<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[taskInsDto.status]}</a>
					        		<s:hidden name="taskInsDto.status"></s:hidden>
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
				        	<li class="${key eq taskInsDto.moduleCode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('所属模块：${value.name}','${key}','moduleCodeLi','taskInsDto.moduleCode')" id="${key}">${value.name}</a></li>
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
				        	<li class="${key eq taskInsDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}',${key},'statusLi','taskInsDto.status')" id="${key}">${value}</a></li>
				        </s:iterator>
				      </ul>
				    </div>
				    <div class="clear"></div>
				  </div>
				  
				  
				  <div class="sl-wrap" id="box2" style="${ifShowMore eq 1 ? 'display:' : 'display:none' }">
				    <div class="sl-key"><span>运行时间:</span></div>
				    <div class="sl-value">
				      <ul>
				        <li>
				        	<input name="taskInsDto.startAtBegin" value="${taskInsDto.startAtBegin}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
				        </li>
				        <li>-</li>
				        <li>
				        	<input name="taskInsDto.startAtEnd" value="${taskInsDto.startAtEnd}" style="width: 80px;" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
				        </li>
				      </ul>
				    </div>
				    <div class="clear"></div>
				    <div class="m_searchWrap"><input type="button" value="确定" onclick="queryFrm()"/></div>
				  </div>
				  <s:if test="ifShowMore == 1">
					  <div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛运行时间｝ ','显示更多筛选条件｛运行时间｝')">隐藏更多筛选条件｛运行时间｝ </a></div>
				  </s:if>
				  <s:else>
				  	  <div class="m_searchWrap"><a href="#" onclick="openShutManager(this,'box2',false,'隐藏更多筛选条件｛运行时间｝ ','显示更多筛选条件｛运行时间｝')">显示更多筛选条件｛运行时间｝ </a></div>
				  </s:else>
			</div>
			
			
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">系统任务日志</div>
			  <div class="t_title_input">
			    <input type="text" name="taskInsDto.keyword" id="title" placeholder="名称、编码"  value="${taskInsDto.keyword }"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="javascript:document.frm.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
			  </div>
			  <div class="clear"></div>
			</div>
			

			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
				<tr>
					<th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th>
					<th >
						任务名称
					</th>
					<th width="100px">
						任务编码
					</th>
					<th>
						所属模块
					</th>
				<%--<th width="180">
						创建时间
					</th> --%>	
					<th width="180px;">
						运行时间
					</th>
					<th  width="50">
						运行状态
					</th>
					<%--<th width="180px;">
						执行结束时间
					</th>--%>	
					<th  width="180">
						日志
					</th>
					<th  width="50">
						耗时
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
							${appMap[item.moduleCode].name}
						</td>
						<%--<td align="center">
							<app:date dateTime="${item.createAt }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td> --%>
						<td align="center">
							<app:date  dateTime="${item.startAt }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<%--<<td align="center">
							<app:date  dateTime="${item.finishAt }" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>--%>
						<td align="center">
							${statusMap[item.status]}
						</td>
						<td align="center" title="${item.failureNote }">
							<app:TruncateTag size="60" src="${item.failureNote }"></app:TruncateTag>
						</td>
						<td align="center">
							<s:if test="#item.finishAt != null && #item.startAt !=null">
								<s:property value="(#item.finishAt.getTime()-#item.startAt.getTime())/1000"/>s
							</s:if>
							<s:else>
								-
							</s:else>
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="TaskIns!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>