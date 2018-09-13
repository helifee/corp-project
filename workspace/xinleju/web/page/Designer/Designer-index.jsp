<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
	<head>
		<title>工作流设计器</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<script type="text/javascript">
			mxBasePath = 'designer/src';
		</script>

		<script type="text/javascript" src="designer/src/js/mxClient.js"></script>
		<script type="text/javascript" src="js/mxApplication.js"></script>

		<link rel="stylesheet" href="css/icon.css" type="text/css" />
		<link rel="stylesheet" href="js/ext/resources/css/ext-all.css" type="text/css" />
		<link rel="stylesheet" href="js/ext/resources/css/xtheme-blue.css" type="text/css" />
		<link rel="stylesheet" href="js/ext/ext-patch.css" type="text/css" />
		<script src="js/ext/adapter/ext/ext-base.js"></script>
		<script src="js/ext/ext-all.js"></script>
		<script src="js/ext/TreeCheckNodeUI.js"></script>
		<script src="js/ext/examples/ux/CheckColumn.js"></script>
		<script src="js/jquery/jquery-1.7.1.js"></script>

	
		
		<link rel="stylesheet" href="js/ext/lovcombo/css/Ext.ux.form.LovCombo.css" type="text/css" />
		<script src="js/ext/lovcombo/js/Ext.ux.form.LovCombo.js"/></script>   



		<script type="text/javascript">
			Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
			var pageMode = '<%=request.getParameter("pageMode")%>';
			var act = '<%=request.getParameter("act")%>';
			var flowId = '<%=request.getParameter("flowId")%>';
			var ctId = '<%=request.getParameter("ctId")%>';
		</script>

		<script type="text/javascript" src="Designer!metaInfo.ajax"></script>
		<script type="text/javascript" src="designer/examples/editors/Teleflow.js"></script>
		<script type="text/javascript" src="designer/examples/editors/FlowWindow.js"></script>
		<script type="text/javascript" src="designer/examples/editors/ActivityWindow.js"></script>
		<script type="text/javascript" src="designer/examples/editors/TrWindow.js"></script>
		<script type="text/javascript" src="designer/examples/editors/Designer.js"></script>
		<link rel="stylesheet" href="designer/examples/editors/designer.css" type="text/css" />
		
		<script src="js/App.js"/></script>   
	</head>
	<body>
		<div id="graph" class="base">
		</div>
		<div id="status" class="base" align="right">
		</div>
		<jsp:include page="/designer/examples/editors/_ac_basic.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_paticipant.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_flow.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_trigger.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_free.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_back.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_ac_sub.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_flow_basic.jsp"></jsp:include>
		<jsp:include page="/designer/examples/editors/_flow_trigger.jsp"></jsp:include>
		
		<jsp:include page="/designer/examples/editors/_tr_basic.jsp"></jsp:include>
		
	</body>
</html>
