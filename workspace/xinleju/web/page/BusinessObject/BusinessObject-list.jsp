<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/BusinessObject/BusinessObject-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script>
		var contextPath = '${pageContext.request.contextPath}';
		if(contextPath.length==1){
			contextPath = '';
		}
			<s:iterator value="#request.refs" var="map">
			    var ${map.key} = ${map.value};
			</s:iterator>
		</script>
		
		 
	</head>
	<body>
	<div class="easyui-layout" data-options="fit:true,border:false" id="northpanel">
	<div data-options="region:'north',height:'auto',border:false">
		
		<s:form id="frm" action="BusinessObject!list">
			<s:hidden name="start"></s:hidden>
	
			 <!-- 查询条件 -->
			<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAllParam();">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			  <div class="sl-wrap">
			    <div class="sl-key"><span>所属系统:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.appMap">
			        	<li class="${key eq vsyscode ? 'current' :''}"><a href="javascript:void(0)" onclick="selectParam('所属模块：${value}','${key}','vsyscodeLi','vsyscode')" id="${key}">${value}</a></li>
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
			        	<li class="${key eq status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectParam('状态：${value}','${key}','statusLi','status')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> 
			  <div class="sl-wrap">
			    <div class="sl-key"><span>业务类型:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.botypeMap">
			        	<li class="${key eq vtype ? 'current' :''}"><a href="javascript:void(0)" onclick="selectParam('业务类型：${value}','${key}','botypeLi','vtype')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> 
		</div>
		</s:form>
		</div>
		
		<div data-options="region:'center',border:false">
		
		<div id="aa" class="t_title">
			  <div class="hh">业务对象</div>
			  <div class="t_title_input">
			    <input type="text" id="keyword" name="keyword" id="title" placeholder="名称"  value="${keyword}"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="query();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
			  		<a href="#" onclick="javascript:newBusinessObject()">新增</a>
			  		<a href="#" onclick="javascript:del()" class="t_del">删除</a>
			  		<a href="#" onclick="javascript:enable()" class="t_more">启用</a>
				    <a href="#" onclick="javascript:unable()" class="t_qxsz">禁用</a>
			  </div>
			  <div class="clear"></div>
			</div>
		
		<table id="grid">
			</table>
		</div>
	</div>
	<div id="newDialog"></div>
	</body>
</html>
