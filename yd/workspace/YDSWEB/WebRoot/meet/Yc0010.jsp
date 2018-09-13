<%--
 * @(#)Yc0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室管理画面（主页面JSP）
 * 
 * @author mengxiaoyan
 * @version 1.00 2010/07/21
--%>

<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>  

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>	
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/meet/Yc0010.js"></script>
	<title>会议室信息</title>
</head>
<body onload="init();" class="none">
<s:include value="../common/commonPage.jsp"></s:include>
<div id="content" class="ydscontainer position_rel">
	<div class="span-24 text_center">
		<div id="metRoomMap" class="hysMap float_l">
		</div>
	</div>
	<hr class="space"/>	
	<div class="span-24">
		<div class="span-12 text_left">
			<s:label value="总计：" />
			<s:label id="metInfosCnt" name="metInfosCnt" />
			<s:label value="间" />	
		</div>
		<div class="span-12 text_right last">		
			<input type="button" id="sortBtn" name="sortBtn" value="排 序"
				class="btn span-2" onclick="sortMetRoomInfoList()"  />
			<input type="button" id="creatBtn" name="creatBtn" value="新 建"
				class="btn span-2" onclick="createMetRoom()"/>
		</div>	
	</div>	
	<div class="span-24 bd_1s52  box_border margin_top_4">
		<table class="datagrid2">
			<tr class="none" id="dataLine">
				<td class="percent_8 text_center"></td>
				<td></td>
				<td class="percent_12"></td>				
				<td class="percent_8 text_right"></td>
				<td class="percent_18"></td>
				<td class="percent_10 text_right"></td>
				<td class="percent_8 text_center"></td>		
				<td class="percent_12 text_center">
					<span class="padding_right_9 margin_right_9">
						<s:a href="#this" onclick="modifyMetRoom(this);">修改</s:a>
					</span>
				</td>
				<td class="percent_0"></td>											
			</tr>
			<tr>
				<th class="percent_8">会议室ID</th>
				<th >会议室名称</th>
				<th class="percent_12">会议室略称</th>				
				<th class="percent_8">容员(人)</th>
				<th class="percent_18">设备名称</th>
				<th class="percent_10">网线接口(个)</th>
				<th class="percent_8">电话</th>				
				<th class="percent_12">操作</th>				
			</tr>
		</table>
		<div class="span-24  overflow_scr_y">
			<div class="span-24 ">
				<table class="datagrid2 font_simsun" id="metRoomListTable">
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="metRoomListTitle">会议室详细</div>
	<div id="metRoomInfoList" class="line_h span-12 padding_top_10 padding_bottom_10">
		<s:form id="metRoomInfoListForm" action="yc0010UpdateMetRoom" namespace="/meet" method="post"  validate="true" >
			<div class="span-12 last" >
				<div class="span-2 text_right">会议室名称<span class="color_red">*</span></div>
				<div class="span-4"><s:textfield  cssClass="span-4"  id="metNm" name="metRoomInfo.metNm" maxlength="34"/></div>
				<div class="span-2 text_right">会议室略称<span class="color_red">*</span></div>
				<div class="span-3 last"><s:textfield  cssClass="span-2" id="metRnm" name="metRoomInfo.metRnm" maxlength="5"/></div>
			</div>
			<div class="span-12 margin_top_4 last" >
				<div class="span-2 text_right">容员<span class="color_red">*</span></div>
				<div class="span-4"><s:textfield  cssClass="span-1 text_right" id="containCnt" name="metRoomInfo.containCnt" maxlength="3"/>&nbsp;人</div>
				<div class="span-2 text_right"><label>网线接口</label><span class="color_red">*</span></div>
				<div class="span-4 last"><s:textfield  cssClass="span-1 text_right" id="netInterface" name="metRoomInfo.netInterface" maxlength="3"/>&nbsp;个</div>
			</div>
			<div class="span-12 margin_top_4 last" >
				<div class="span-2 text_right">电话</div>
				<div class="span-4"><s:textfield  cssClass="span-1" id="tel" name="metRoomInfo.tel" maxlength="4"/></div>
				<div class="span-2 text_right"><label>启用</label></div>
				<div class="span-4 last"><s:checkbox id="metState" name="metRoomInfo.metState" fieldValue="1"></s:checkbox></div>
			</div>
			<div class="span-12 margin_top_4 last">
				<div class="span-2 text_right">设备名称</div>
				<div class="span-8 last"><s:textfield  cssClass="span-8" id="equipment" name="metRoomInfo.equipment" maxlength="255"/></div>
			</div>
   		    <div class="span-12 margin_top_4 last">
				<div class="span-2 text_right position_rel">坐标<span class="color_red">*</span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="drawBar" class="img_opt opt_Edit position_abs cur_pointer" onclick="drawLayer();" title="绘制区域"></span></div>
				<div class="span-10 last">
					<s:textfield  cssClass="span-1 text_right" id="imagefromx" name="metRoomInfo.imagefromx" maxlength="4"/>
					<s:textfield  cssClass="span-1 text_right" id="imagefromy" name="metRoomInfo.imagefromy" maxlength="4"/>（起点）
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<s:textfield  cssClass="span-1 text_right" id="imagetox" name="metRoomInfo.imagetox" maxlength="4"/>
					<s:textfield  cssClass="span-1 text_right" id="imagetoy" name="metRoomInfo.imagetoy" maxlength="4"/>（终点）
				</div>
			</div>
			<div class="span-12 last">
				<s:hidden id="metId" name="metRoomInfo.metId"></s:hidden>
				<s:hidden id="sortId" name="metRoomInfo.sortId"></s:hidden>
			</div>
		<div class="span-12 margin_top_10 text_center last">
			<input type="button" value="保存" class="btn span-2" onclick="submitMetRoom();" />	
		</div>
	</s:form> 		
	</div>
	<div id="metRoomTip" class="hysToolTip">
		<table>
			<tr>
				<td class="text_right percent_24">名称：</td>
				<td id="tipMetRnm" class="text_left"></td>
			</tr>
			<tr>
				<td class="text_right">人数：</td>
				<td id="tipContainCnt" class="text_left"></td>
			</tr>
			<tr>
				<td class="text_right">设备：</td>
				<td id="tipEquipment" class="text_left"></td>
			</tr>
			<tr>
				<td class="text_right">网线：</td>
				<td id="tipNetInterface" class="text_left"></td>
			</tr>
			<tr>
				<td class="text_right">电话：</td>
				<td id="tipTel" class="text_left"></td>
			</tr>
		</table>
	</div>
	<div id="newMetRoomLayer" class="hysLayerNew"></div>
	<!-- 会议室排序信息 -->
	<div id="div_meetRoom_sort" class="none"></div>	
	<s:fielderror></s:fielderror>
</div>
</body>
</html>