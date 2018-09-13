<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
	<head>
		<title>工作流设计器</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<script type="text/javascript">
			mxBasePath = '../../src';
		</script>

		<script type="text/javascript" src="../../src/js/mxClient.js"></script>
		<script type="text/javascript" src="js/mxApplication.js"></script>

		<link rel="stylesheet" href="../../../css/icon.css" type="text/css" />
		<link rel="stylesheet" href="../../../js/ext/resources/css/ext-all.css" type="text/css" />
		<script src="../../../js/ext/adapter/ext/ext-base.js"></script>
		<script src="../../../js/ext/ext-all.js"></script>
		<script src="../../../js/ext/TreeCheckNodeUI.js"></script>
		<script src="../../../js/ext/examples/ux/CheckColumn.js"></script>

		<script src="../../../js/jquery.js"></script>

		<link href="../../../css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="../../../js/ext/lovcombo/css/Ext.ux.form.LovCombo.css" type="text/css" />
		<script src="../../../js/ext/lovcombo/js/Ext.ux.form.LovCombo.js"/></script>   
		


		<script type="text/javascript">
			Ext.BLANK_IMAGE_URL = '../../../js/ext/resources/images/default/s.gif';
			var pageMode = '<%=request.getParameter("pageMode")%>';
			var act = '<%=request.getParameter("act")%>';
			var flowId = '<%=request.getParameter("flowId")%>';
			var ctId = '<%=request.getParameter("ctId")%>';
			var serviceObjectDefineId = '<%=request.getParameter("serviceObjectDefineId")%>';
		</script>

		<script type="text/javascript" src="../../../Designer!metaInfo.ajax"></script>
		<script type="text/javascript" src="Teleflow.js"></script>

		<script type="text/javascript" src="FlowWindow.js"></script>
		<script type="text/javascript" src="ActivityWindow.js"></script>
		<script type="text/javascript" src="TrWindow.js"></script>
		<script type="text/javascript" src="FlowTemplateWindow.js"></script>
		
		<script type="text/javascript" src="_tr_basic.js"></script>
		<script type="text/javascript" src="Designer.js"></script>
		<link rel="stylesheet" href="designer.css" type="text/css" />
		
		<script src="../../../js/App.js"/></script>   
		
		<script type="text/javascript" src="MonitorSetting.js"></script>
		
	</head>
	<body>
		<div id="graph" class="base">
		</div>
		<div id="status" class="base" align="right">
		</div>
		<jsp:include page="/designer/examples/editors/_ac_basic.jsp"></jsp:include>
		<!-- 参与人  -->
		<jsp:include page="/designer/examples/editors/_ac_paticipant.jsp"></jsp:include>
		<!-- 自动抄送 -->
		<jsp:include page="/designer/examples/editors/_ac_cs.jsp"></jsp:include>
		<!-- 流转控制 -->
		<jsp:include page="/designer/examples/editors/_ac_flow.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_trigger.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_free.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_back.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_sub.jsp"></jsp:include>
		<!--可阅人员  -->
		<jsp:include page="/designer/examples/editors/_flow_readPaticipant.jsp"></jsp:include>
		<!--发起人员  -->
		<jsp:include page="/designer/examples/editors/_flow_fqPaticipant.jsp"></jsp:include>
		<!--基础属性  -->
		<jsp:include page="/designer/examples/editors/_flow_basic.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_flow_trigger.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_flow_template.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_opRelationIns.jsp"></jsp:include>
		
		<jsp:include page="/designer/examples/editors/_tr_basic.jsp"></jsp:include>
		<!--逾期设置  -->
		<jsp:include page="/designer/examples/editors/_fl_monitor_setting.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_monitor_setting.jsp"></jsp:include>
		
	</body>
</html>
