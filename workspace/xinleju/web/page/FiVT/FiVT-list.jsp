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
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/FiVT/FiVT-list.js"></script>
<script>
	var contextPath = '${pageContext.request.contextPath}';
	if(contextPath.length==1){
		contextPath = '';
	}
</script>
</head>
<body>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<!-- <div data-options="region:'west',split:true,title:'财务系统公司'" style="width: 200px; padding: 5px; background: #eee;">
			<input id="sysSearch" style="width: 180px" type="text" />
			<input id="fisysinfoid" style="display:none;" type="text" />
			<ul id="tree"></ul>
		</div> -->

		<div data-options="region:'center',title:'凭证模板设置'" style="padding: 5px; background: #eee;">

			<div class="easyui-layout" data-options="border:false,fit:true">
				<div data-options="region:'west',split:true,title:'业务类型'" style="width: 200px; padding: 5px; background: #eee;">
					<ul id="tree1"></ul>
				</div>

				<div data-options="region:'center',border:false" style="padding: 5px; background: #eee;">
					 <div class="easyui-layout" data-options="border:false,fit:true">
								<div data-options="region:'north',height:'auto',border:false">
									<div id="tb1" class="t_title">
										<div class="hh">业务类型对应的凭证模板</div>
										<div class="tool">
											<a href="#" id="save" onclick="javascript:save()" class="t_save" style="display:none;">保存</a>
										</div>
										<div class="clear"></div>
									</div>
									<form action="FiVT!save" id="frm">
									<s:token/>
										<table width="100%" border="0" cellspacing="1" cellpadding="0">
											<tr>
												<td>
													<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01">
														<tr align=center>
															<td align="right"   class="sd"  width="25%">业务类型:</td>
															<td width="30%" align="left">
																<input id="bmid" name="voucherTemplate.bmid" style="width: 98%" value="" type="hidden"/>
																<label id="bmid_name" ></label>
															</td>
															<td align="right" >状态:</td>
															<td width="26%" align="left">
																<input type="radio" name="voucherTemplate.status" value="1"/>
																启用
																<input type="radio" name="voucherTemplate.status" value="0"/>
																禁止
															</td>
														</tr>
														<tr align=center>
															<td align="right" class="sd" width="25%">业务类型说明:</td>
															<td colspan="3" align="left">
																<input id="note" name="voucherTemplate.note" style="width: 98%" value=""/>
															</td>
														</tr>
														<tr>
															<td align="right" class="sd"  width="25%">
																<font color=red>*</font>
																业务对象:
															</td>
															<td colspan="3">
															<input id="boid_name" style="width: 180px" type="text" value=""/>
															<input id="boid" name="voucherTemplate.boid" style="display:none;" type="text" value=""/>
															</td>
														</tr>
														<tr>
															<td align="right" class="sd"  width="25%">
																<font color=red>*</font>
																业务对象筛选条件:
															</td>
															<td colspan="3">
															<textarea id="condition" name="voucherTemplate.filter" rows="4" cols="100" readonly onclick="openExpression();"></textarea>
															</td>
														</tr>
														<tr>
															<td align="right" class="sd" width="25%" >
																<font color=red>*</font>
																凭证字:
															</td>
															<td colspan="3">
															<input id="flag" name="voucherTemplate.flag" style="width: 30px" type="text" vlaue=""/>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<input id="boFieldInfoList" name="boFieldInfoList" value="" type="hidden"/>
										<input id="boFieldInfoList_delete" name="boFieldInfoList_delete" value="" type="hidden"/>
										<input id="id" name="voucherTemplate.id" value="" type="hidden"/>
									</form>
								</div>
						
								<div data-options="region:'center',border:false">
									<div id="tb2" class="t_title">
										<div class="hh">
											凭证模板
										</div>
										<div class="tool">
											<a href="#" onclick="javascript:addVoucherEntry()">增加分录</a>
											<a href="#" onclick="javascript:delVoucherEntry()" class="t_del">删除分录</a>
										</div>
										<div class="clear"></div>
									</div>
						
									<table id="grid"></table>
								</div>
							</div>
						
							<div id="newDialog"></div>

				</div>
			</div>

		</div>
	</div>

	<div id="newDialog"></div>
<div id="rightclickdiv" class="easyui-menu" style="width: 115px;">
		<div data-options="iconCls:'icon-add',name:'001'">添加</div>
		<div data-options="iconCls:'icon-edit',name:'002'">修改</div>
		<div data-options="iconCls:'icon-remove',name:'003'">删除</div>
	</div>
</body>
</html>
