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
		<script type="text/javascript" src="page/LogRecord/LogRecord-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript">
		function sub_type(typeid){
			document.getElementById("typ").value=typeid;
			document.getElementById("frm").submit();
		};
		</script>
	</head>
	<body>
		<s:form id="frm" action="LogRecord!list.do">
			<s:hidden name="start"></s:hidden>
			<s:hidden name="logRecordQueryDTO.type" id="typ"></s:hidden>
			 <!-- 查询条件 -->
				<div class="s1_searchWrap">
					<div class="t_title">
					<div class="hh">
						<ul>
							<li  class="current"><a href="LogRecord!list.do?type=4">普通用户操作日志</a></li>
							<li  ><a href="AdminLog!list.do">管理员操作日志</a></li>
						</ul>
					</div>
					<div class="clear"></div>
				</div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>操作员:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>
				        	<input  type="text" name="logRecordQueryDTO.loginName" style="width:100px" value="${logRecordQueryDTO.loginName}" />
				        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>所属模块:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>
				        	<select name="logRecordQueryDTO.moduleCode" style="width:100px">
				        	       <option value="">--请选择--</option>
				        	       <option value="HP" <s:if test="#request.logRecordQueryDTO.moduleCode =='HP'">selected="selected"</s:if>>首页</option>
				        	       <option value="PT" <s:if test="#request.logRecordQueryDTO.moduleCode =='PT'">selected="selected"</s:if>>系统设置</option>
				        	       <option value="MD" <s:if test="#request.logRecordQueryDTO.moduleCode =='MD'">selected="selected"</s:if>>主数据系统</option>
				        	       <option value="PL" <s:if test="#request.logRecordQueryDTO.moduleCode =='PL'">selected="selected"</s:if>>计划系统</option>
				        	       <option value="EX" <s:if test="#request.logRecordQueryDTO.moduleCode =='EX'">selected="selected"</s:if>>费用系统</option>
				        	       <option value="QU" <s:if test="#request.logRecordQueryDTO.moduleCode =='QU'">selected="selected"</s:if>>工程质量</option>
				        	       <option value="ZB" <s:if test="#request.logRecordQueryDTO.moduleCode =='ZB'">selected="selected"</s:if>>招采系统</option>
				        	</select>
				        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>所属公司:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>
				          <select name="logRecordQueryDTO.company" style="width:100px">
				        	<option value="">--请选择--</option>
						          <s:iterator value="#request.companyList" id="item" status="stat">
						        	       <option value="${item }" ${logRecordQueryDTO.company eq item? 'selected="selected"' : ''}>${item }</option>
						         </s:iterator>
				        	</select>
				        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>操作时间:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>开始时间：
				        	<input name="logRecordQueryDTO.visitDateBegin" value="${logRecordQueryDTO.visitDateBegin}" style="width: 80px;" id="d4322" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'d4321\',{d:-1});}'})"/>
				        </li>
				        <li>
				                                  结束时间：
				        	<input name="logRecordQueryDTO.visitDateEnd" value="${logRecordQueryDTO.visitDateEnd}" style="width: 80px;" id="d4321" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d4322\',{d:1});}'})"/>
				        </li>
			      </ul>
			    </div>
			          <div class="m_searchWrap" style="margin-left:470px"><input type="button" value="查询" onclick="queryFrm()"/></div>
			   <div class="clear"></div>
			  </div>
		</div>
		<!-- 标题 -->
			<div class="t_title">
			  <div class="hh">普通用户操作日志</div>
					<div class="t_title" >
					<div class="tool">
						<a href="javascript:void(0)" onclick=";" class=t_import>导出</a>
						<a href="javascript:void(0)" onclick="batchDel();" id="flagDisable" class="t_del">删除</a>
		
					</div>
					<div class="clear"></div>
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
					<th width="5%">序号</th>
					<th width="10%">登录名 </th>
					<th width="10%">姓名</th>
					<th width="15%">所在公司</th>
					<th width="10%">登录IP</th>
					<th width="15%">操作时间</th>
					<th width="10%">操作类型</th>
					<th width="10%">操作节点</th>
					<th width="15%">操作内容</th>
				</tr>
				<s:iterator value="page.items" id="item" status="stat">
					<tr>
						<td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td>
						<td align="center">${stat.index+1 }</td>
						<td align="center">${item.loginName }</td>
						<td align="center">${item.createUserName }</td>
						<td align="center">${item.company }</td>
						<td align="center">${item.ipAddress }</td>
						<td align="center">	<app:date dateTime="${item.createDate}" style="yyyy-MM-dd HH:mm:ss"></app:date></td>
						<td align="center">
							<s:if test="#item.sign==1">查询</s:if>
							<s:elseif test="#item.sign==2">新增</s:elseif>
							<s:elseif test="#item.sign==3">修改</s:elseif>
							<s:elseif test="#item.sign==4">删除</s:elseif>
							<s:else>增删改查</s:else>
						</td>
						<td align="left">${appMap[item.moduleCode].name }-${item.funcName }</td>
						<td align="left">${item.logInfo }</td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<app:PageTag actionName="LogRecord!list.do"></app:PageTag>
			</div>
		</s:form>
	</body>
</html>
