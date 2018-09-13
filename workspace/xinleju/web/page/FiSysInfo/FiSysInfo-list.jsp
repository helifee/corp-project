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
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css" />
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/FiSysInfo/FiSysInfo-list.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
				<script>
				var contextPath = '${pageContext.request.contextPath}';
				//var vtype_ref = ${vtype_ref}; 
					<s:iterator value="#request.refs" var="map">
					    var ${map.key} = ${map.value};
					</s:iterator>
				</script>
	</head>
	<body>
	
	<div class="easyui-layout" data-options="fit:true,border:false" id="northpanel">
	<div data-options="region:'north',height:'auto',border:false">
	<s:form id="frm" action="FiSysInfo!list">
			<s:hidden name="start"></s:hidden>
			 <!-- 查询条件 -->
			<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAllParam()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
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
		</div>
		</s:form>
	</div>
	<div data-options="region:'center',border:false">
	<!-- 标题 -->
			<div id="aa" class="t_title">
			  <div class="t_title_input">
			    <input type="text" name="keyword" id="title" placeholder="财务系统名称"  value="${keyword}"/>
			  </div>
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="query();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
			  		<a href="#" onclick="javascript:newFiSysInfo()">新增</a>
			  		<a href="#" onclick="javascript:del()" class="t_del">删除</a>
			  		<!-- <a href="#" onclick="javascript:enable()" class="t_more">启用</a>
				    <a href="#" onclick="javascript:unable()" class="t_qxsz">禁用</a> -->
			  </div>
			  <div class="clear"></div>
			</div>
			<table id="grid"></table>
	</div>
	</div>
	
	<div id="newDialog"></div>
	<div id="editDialog" class="easyui-dialog" data-options="
		title:'编辑',
		resizable:true,
		closed:true,
		buttons:[{
				text:'保存',
				handler:save,
				plain:true,
				iconCls:'icon-save'
			},{
				text:'关闭',
				plain:true,
				iconCls:'icon-cancel',
				handler:function(){
					$('#editDialog').dialog('close');
				}
			}]
	">
	<s:form id="frm2" method="post">
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									财务系统标识:
								</td>
								<td width="29%"   align="left"  >
									<s:textfield cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" name="fiSysInfo.fiSysCode" cssStyle="width:98%"></s:textfield>			
								</td>
								<td align="right" class="sd" width="19%">
									财务系统名称:
								</td>
								<td width="29%" align="left" >
									<s:textfield name="fiSysInfo.fiSysName" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" cssStyle="width:98%"></s:textfield>									
								</td>
							</tr>			  
							<tr>
								<td align="right" class="sd" width="19%">
									接口类型:
								</td>
								<td width="29%">
									<input id="frm_fiSysInfo_vtype" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" name="fiSysInfo.type"  value="${fiSysInfo.vtype}"/>
								</td>
								<td align="right" class="sd" width="19%">
										业务系统在财务系统中的标识:
								</td>
								<td width="29%">
									<s:textfield name="fiSysInfo.bizSysCode" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
							<tr>
								<td align="right" class="sd" width="19%">
									发送方:
								</td>
								<td width="29%">
									<input id="frm_fiSysInfo_type" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" name="fiSysInfo.sender"  value="${fiSysInfo.sender}"/>
								</td>
								<td align="right" class="sd" width="19%">
								    财务系统webservice地址
								</td>
								<td width="29%">
								    <s:textfield id="frm_fiSysInfo_weburl" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,50]'" name="fiSysInfo.webUrl" cssStyle="width:98%"></s:textfield>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="fiSysInfo.createDate"></s:hidden>
			<s:hidden name="fiSysInfo.status"></s:hidden>
			<s:hidden name="fiSysInfo.id"></s:hidden>
		</s:form>
	</div>	
</body>
</html>
