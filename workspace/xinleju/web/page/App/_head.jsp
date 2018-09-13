<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<div id="header_disabled">
	<!-- 用户信息 -->
	<div id="userbox" style="display:none">
		<span class="tody_box">您好:</span> <span class="user_name"><s:property
				value="getSessionUser().getUserName()" /> </span> <span class="tody_box"><s:property
				value="getDateString()" /> </span> <span class="tools_box"><a
			href="#" onclick="revisePasssord();return false;"><img
				src="images/password.png" border="0" align="absmiddle" />&nbsp;修改密码</a>
		</span> <span class="tools_box"><a href="#"
			onclick="checkOut();return false;"><img src="images/logout.png"
				border="0" align="absmiddle" />&nbsp;退出</a> </span>
	</div>
	<!--菜单文件-->
	<div id="nav">
		<div id="slidemenu" class="slidetabsmenu">
			<ul class="level1">
				<li>
					<a href="#" onclick="loadFrame('Frame!desktop.do?request_time=<%=System.currentTimeMillis() %>');return false;"><span>首页</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu1_c" onclick="javascript:loadFrame('TodoFi!allFiList.do');"><span>流程中心</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu2_c" onclick="javascript:loadFrame('Msg!index.do');"><span>消息中心</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu3_c" onclick="javascript:void(0);"><span>通知公告</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu4_c" onclick="javascript:lvoid(0);"><span>快捷收藏</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu5_c" onclick="javascript:void(0);"><span>组织用户权限</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu6_c" onclick="javascript:void(0);"><span>工作流管理</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu7_c" onclick="javascript:void(0);"><span>公告管理</span></a>
				</li>
				<li>
					<a href="javascript:void(0)" rel="dropmenu8_c" onclick="javascript:void(0);"><span>平台设置</span></a>
				</li>
			</ul>
		</div>
		<div id="dropmenu1_c" class="dropmenudiv_c">
			<a href="#" onclick="loadFrame('TodoFi!allFiList.do');return false;">流程中心</a>
			<a href="#" onclick="loadFrame('Fi!list.do');return false;">流程实例</a>
			<a href="#" onclick="loadFrame('Todo!listDb.do');return false;">待办</a>
			<a href="#" onclick="loadFrame('Todo!listYb.do');return false;">已办</a>
			<a href="#" onclick="loadFrame('Todo!listDy.do');return false;">待阅</a>
			<a href="#" onclick="loadFrame('Todo!listYy.do');return false;">已阅</a>
			<a href="#" onclick="loadFrame('Todo!listAll.do');return false;">所有</a>
		</div>
		<div id="dropmenu2_c" class="dropmenudiv_c">
			<a href="#" onclick="loadFrame('Msg!index.do?flag=1');return false;">消息中心</a>
		</div>
		<div id="dropmenu3_c" class="dropmenudiv_c">
		</div>
		<div id="dropmenu4_c" class="dropmenudiv_c">
		</div>
		<div id="dropmenu5_c" class="dropmenudiv_c">
			<a href="#" onclick="loadFrame('Orgn!showCase.do');return false;">组织用户管理</a>
			<a href="#" onclick="loadFrame('FuncAuth!index.do');return false;">功能授权</a>
			<a href="#" onclick="loadFrame('BizAuth!index.do');return false;">数据授权</a>
		</div>
		<div id="dropmenu6_c" class="dropmenudiv_c">
			<a href="#" onclick="loadFrame('Ct!index.do');return false;">流程管理</a>
			<a href="#" onclick="loadFrame('Op!list.do');return false;">流程操作定义</a>
			<a href="#" onclick="loadFrame('OpGroup!list.do');return false;">审批类型定义</a>
			<a href="#" onclick="loadFrame('BizParticipant!list.do');return false;">业务参与人注册</a>
			<a href="#" onclick="loadFrame('CateMgr!index.do');return false;">工作流条件参数设置</a>
			<a href="#" onclick="loadFrame('OutCodeMgr!index.do');return false;">工作流外部编码设置</a>
			<a href="#" onclick="loadFrame('FlowEvent!list.do');return false;">事件查询</a>
			<a href="#" onclick="loadFrame('TurnOverDeal!index.do');return false;">离职处理</a>
		</div>
		<div id="dropmenu7_c" class="dropmenudiv_c">
		</div>
		<div id="dropmenu8_c" class="dropmenudiv_c">
			<a href="#" onclick="loadFrame('IdRule!index.do');return false;">编号规则</a>
			<a href="#" onclick="loadFrame('Triggers!list.do');return false;">系统任务</a>
			<a href="#" onclick="loadFrame('AdminLog!index.do');return false;">系统日志</a>
		</div>
		<script type="text/javascript">
			tabdropdown.init("slidemenu")
		</script>
	</div>
</div>