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
		<script type="text/javascript" src="page/AdminLog/AdminLog-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
	</head>
	<body>
		<s:form id="frm" action="AdminLog!list">
			<s:hidden name="start"></s:hidden>
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
			      	<s:if test="#request.appMap.get(adminLogQueryDTO.moduleCode) != null">
			        	<li id="moduleCodeLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">所属模块：${appMap[adminLogQueryDTO.moduleCode].name}</a>
			        		<s:hidden name="adminLogQueryDTO.moduleCode"></s:hidden>
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
			        	<li class="${key eq adminLogQueryDTO.moduleCode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('所属模块：${value.name}','${key}','moduleCodeLi','adminLogQueryDTO.moduleCode')" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>操作时间:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>
				        	<input name="adminLogQueryDTO.visitDateBegin" value="${adminLogQueryDTO.visitDateBegin}" style="width: 80px;" id="d4322" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'d4321\',{d:-1});}'})"/>
				        </li>
				        <li>-</li>
				        <li>
				        	<input name="adminLogQueryDTO.visitDateEnd" value="${adminLogQueryDTO.visitDateEnd}" style="width: 80px;" id="d4321" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d4322\',{d:1});}'})"/>
				        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
		</div>
		
		
			<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">管理者日志</div>
			  <div class="t_title_input">
			    <input type="text" name="adminLogQueryDTO.keyword" id="title" placeholder="操作者、功能模块"  value="${adminLogQueryDTO.keyword}"/>
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
					<th width="180px">
						操作时间
					</th>
					<th width="120px">
						ip地址
					</th>
					<th width="100px">
						操作者
					</th>
					<th width="180px">
						所属模块
					</th>
					<th width="180px">
						功能模块
					</th>
					<th>
						url
					</th>
					<th>
						操作
					</th>
				</tr>
				<s:iterator value="page.items" id="item">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">
							<app:date dateTime="${item.visitDate}" style="yyyy-MM-dd HH:mm:ss"></app:date>
						</td>
						<td align="center">
							${item.ipAddress }
						</td>
						<td align="center">
							${item.visitLoginName }
						</td>
						<td align="center">
							${appMap[item.moduleCode].name }
						</td>
						<td align="center">
							${item.funcName }
						</td>
						<td align="center">
							${item.url }
						</td>
						<td align="center">
							${item.actionName }
						</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="AdminLog!list"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
