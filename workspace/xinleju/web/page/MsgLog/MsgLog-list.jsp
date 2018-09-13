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
<script type="text/javascript" src="page/MsgLog/MsgLog-list.js"></script>
<script language="javascript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript">
		function sub_type(typeid){
			document.getElementById("typ").value=typeid;
			document.getElementById("frm").submit();
		};
		

		function sub_type1(typeid){
			document.getElementById("typ1").value=typeid;
			document.getElementById("frm").submit();
		};
		</script>
</head>
<body>
	<s:form id="frm" action="MsgLog!list.do">
		<s:hidden name="start"></s:hidden>
		<s:hidden name="msgLogQueryDTO.type" id="typ"></s:hidden>
		<s:hidden name="msgLogQueryDTO.opType" id="typ1"></s:hidden>
		<s:hidden name="msgId" id="msgId"></s:hidden>
		<!-- 查询条件 -->
		<div class="s1_searchWrap">
			<%--  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      	<s:if test="#request.appMap.get(logRecordQueryDTO.moduleCode) != null">
			        	<li id="moduleCodeLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">所属模块：${appMap[logRecordQueryDTO.moduleCode].name}</a>
			        		<s:hidden name="logRecordQueryDTO.moduleCode"></s:hidden>
			        	</li>
			      	</s:if>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> --%>
			<%-- <div class="sl-wrap">
			    <div class="sl-key"><span>所属模块:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.appMap">
			        	<li class="${key eq logRecordQueryDTO.moduleCode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('所属模块：${value.name}','${key}','moduleCodeLi','logRecordQueryDTO.moduleCode')" id="${key}">${value.name}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> --%>


			<div class="sl-wrap">
				<div class="sl-key">
					<span>OA返回状态:</span>
				</div>
				<div class="sl-value">
					<ul>
						<li class="${'' eq msgLogQueryDTO.type ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type('');" id="type0">全部</a></li>
						<li class="${'1' eq msgLogQueryDTO.type ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type('1');" id="type1">失败</a></li>
						<li class="${'2' eq msgLogQueryDTO.type ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type('2');" id="type2">成功</a></li>

					</ul>
				</div>
				<div class="clear"></div>
			</div>


			<div class="sl-wrap">
				<div class="sl-key">
					<span>消息操作类型:</span>
				</div>
				<div class="sl-value">
					<ul>
						<li class="${'' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('');" id="type0">全部</a></li>
						<li class="${'DB' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('DB');" id="type1">DB-待办</a></li>
						<li class="${'YB' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('YB');" id="type2">YB-已办</a></li>
						<li class="${'YD' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('YD');" id="type2">YD-已读</a></li>
						<li class="${'WD' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('WD');" id="type2">WD-未读</a></li>
						<li class="${'RM' eq msgLogQueryDTO.opType ? 'current' :''}"><a
							href="javascript:void(0)" onclick="sub_type1('RM');" id="type2">RM-删除</a></li>

					</ul>
				</div>
				<div class="clear"></div>
			</div>
			
			

			<%-- <div class="sl-wrap">
			    <div class="sl-key"><span>操作时间:</span></div>
			    <div class="sl-value">
			      <ul>
				        <li>
				        	<input name="logRecordQueryDTO.visitDateBegin" value="${logRecordQueryDTO.visitDateBegin}" style="width: 80px;" id="d4322" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'d4321\',{d:-1});}'})"/>
				        </li>
				        <li>-</li>
				        <li>
				        	<input name="logRecordQueryDTO.visitDateEnd" value="${logRecordQueryDTO.visitDateEnd}" style="width: 80px;" id="d4321" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d4322\',{d:1});}'})"/>
				        </li>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> --%>
		</div>


		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">OA推送日志</div>
			<div class="t_title_input">
				<input type="text" name="msgLogQueryDTO.visitLoginName" id="title" placeholder="对方登录名"  value="${msgLogQueryDTO.visitLoginName}"/>
			</div>
			<div class="t_title_input">
				<a href="#" title="查询" onclick="javascript:document.frm.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			</div>
			<div class="tool"></div>
			<div class="clear"></div>
		</div>

		<table width="100%" cellpadding="0" cellspacing="1"
			class="wd_tablelist01">
			<tr>
				<!-- <th width="5px;">
						<input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" />
					</th> -->
				<th width="100px">消息id</th>
				<th width="150px">标题</th>
				<th width="50px">对方登录名</th>
				<th width="120px">消息操作类型</th>
				<th width="220px">错误信息</th>
				<th width="100px">失败次数</th>
				<th width="100px">返回状态</th>
				<th width="100px">操作</th>
			</tr>
			<s:iterator value="page.items" id="item">
				<tr>
					<%-- <td align="center">
							<input name="ids" type="checkbox" value="${item.id}" />
						</td> --%>
					<td align="center"><a href="#"
						onclick="javascript:showFlow('${item.msg.url}')">${item.msgId
							}</a> <%-- <app:date dateTime="${item.createDate}" style="yyyy-MM-dd HH:mm:ss"></app:date> --%>
					</td>
					<td align="left">
						<a href="#"
							onclick="javascript:showFlow('${item.msg.url}')" title="${item.msg.title}"> <app:TruncateTag
									size="60" src="${item.msg.title }"></app:TruncateTag>
						</a>
					</td>

					<td align="left">
						${item.msg.loginName }
					</td>
					<td align="center"><s:if test="#item.opType=='DB'">${item.opType }-待办</s:if>
						<s:elseif test="#item.opType=='YB'">${item.opType }-已办</s:elseif>
						<s:elseif test="#item.opType=='YD'">${item.opType }-已读</s:elseif>
						<s:elseif test="#item.opType=='WD'">${item.opType }-未读</s:elseif>
						<s:elseif test="#item.opType=='RM'">${item.opType }-删除</s:elseif>
						<s:else>无</s:else></td>
					<td align="center">
						
							<app:TruncateTag size="90" src="${item.errorMsg}" ></app:TruncateTag>
						
					</td>
					<td align="center">${item.errorTimes }</td>
					<td align="center"><s:if test="#item.returnState==1">
							<font color='red'>失败</font>
						</s:if> <s:elseif test="#item.returnState==2">成功</s:elseif> <s:else>未操作</s:else>

					</td>
					<td align="center"><s:if test="#item.returnState==1">
							<a href="#" onclick="javascript:againPush(${item.msgId})">重新推送</a>
						</s:if></td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<app:PageTag actionName="MsgLog!list.do"></app:PageTag>
		</div>
	</s:form>
</body>
</html>
