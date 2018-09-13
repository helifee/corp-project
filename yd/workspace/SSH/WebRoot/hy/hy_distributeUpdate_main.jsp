<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>会议室管理</title>
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/prototype.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/hyDistributeUpdate.js"></script>
</head>
<body onload="init();" class="none">
<div id="content" class="container position_rel">
	<div class="span-24 title">
		<h2>会议室管理</h2>
	</div>
	<div class="span-24 text_center">
		<div id="hysMap" class="hysMap float_l"></div>
	</div>
	<hr class="space"/>
	<div class="span-24 margin_bottom_4">
		<div class="imgBtn1 float_r" onclick="createHys();">新建</div>
	</div>
	<div class="span-24 bd_1s52">
		<table class="datagrid2">
			<tr class="none" id="dataLine">
				<td class="percent_10 text_center"></td>
				<td class="percent_20"></td>
				<td class="percent_10 text_center"></td>
				<td class=""></td>
				<td class="percent_10 text_center"></td>
				<td class="percent_10 text_center"></td>
				<td class="percent_12 text_center">
					<span class="padding_right_10 margin_right_10">
						<s:a href="#this" onclick="modifyHys(this);">更改</s:a>
						<s:a href="#this" onclick="deleteHys(this);">删除</s:a>
					</span>
				</td>
			</tr>
			<tr>
				<th class="percent_10">顺序</th>
				<th class="percent_20">会议室名</th>
				<th class="percent_10">容纳人数</th>
				<th>设备名称</th>
				<th class="percent_10">网线接口</th>
				<th class="percent_10">电话</th>
				<th class="percent_12">操作</th>
			</tr>
		</table>
		<div class="span-24 last">
			<div class="span-24 last">
				<table class="datagrid2 font_simsun" id="hysListTable">
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="distInfoTitle">新建会议室</div>
	<div id="distInfo" class="line_h span-14 padding_top_10 padding_bottom_10">
		<form id="hysInfoForm">
			<div class="span-9">
				<div class="span-3 margin_bottom_4">
					<div class="span-2 text_right">会议室ID</div>
					<div class="span-1 last"><input type="text" class="span-1" name="hysId" maxlength="2"/></div>
				</div>
				<div class="span-6 last margin_bottom_4">
					<div class="span-2 text_right">会议室名称</div>
					<div class="span-4 last"><input type="text" class="span-4" name="hysMc" maxlength="34"/></div>
				</div>
				<div class="span-3 margin_bottom_4">
					<div class="span-2 text_right">容纳人数</div>
					<div class="span-1 last"><input type="text" class="span-1" name="hysRs" maxlength="3"/></div>
				</div>
				<div class="span-6 last margin_bottom_4">
					<div class="span-2 text_right">设备名称</div>
					<div class="span-4 last"><input type="text" class="span-4" name="hysSb" maxlength="255"/></div>
				</div>
				<div class="span-3 margin_bottom_4">
					<div class="span-2 text_right"><label>网线接口</label></div>
					<div class="span-1 last"><input type="text" class="span-1" name="hysJs" maxlength="3"/></div>
				</div>
				<div class="span-6 last margin_bottom_4">
					<div class="span-2 text_right">电话</div>
					<div class="span-4 last"><input type="text" class="span-4" name="hysDh" maxlength="4"/></div>
				</div>
				<div class="span-3">
					<div class="span-2 text_right">排列顺序</div>
					<div class="span-1 last"><input type="text" class="span-1" name="hysPx" maxlength="2"/></div>
				</div>
				<div class="span-6 last">
					<div class="span-2 text_right">会议室报告</div>
					<div class="span-4 last">
						<input type="radio" value="1" name="hysBg"/>需要&nbsp;
						<input type="radio" value="0" name="hysBg" checked="true"/>不需要
					</div>
				</div>
			</div>
			<div class="span-5 last">
				<div class="span-5 last margin_bottom_4">
					<div class="span-3 text_right">
						图像起点X坐标
					</div>
					<div class="span-2 last position_rel">
						<input type="text" class="span-2" name="hysQx" maxlength="4"/>
						<span id="drawBar" class="img_opt opt_Edit position_abs cur_pointer" onclick="drawLayer();" title="绘制区域"></span>
					</div>
				</div>
				<div class="span-5 last margin_bottom_4">
					<div class="span-3 text_right">图像起点Y坐标</div>
					<div class="span-2 last"><input type="text" class="span-2" name="hysQy" maxlength="4"/></div>
				</div>
				<div class="span-5 last margin_bottom_4">
					<div class="span-3 text_right">图像终点X坐标</div>
					<div class="span-2 last"><input type="text" class="span-2" name="hysZx" maxlength="4"/></div>
				</div>
				<div class="span-5 last margin_bottom_4">
					<div class="span-3 text_right">图像终点Y坐标</div>
					<div class="span-2 last"><input type="text" class="span-2" name="hysZy" maxlength="4"/></div>
				</div>
			</div>
		</form>
		<div class="span-14 text_right">
			<div class="imgBtn1 float_r" onclick="cancelHys();">取消</div>
			<div class="imgBtn1 float_r margin_right_10" onclick="submitHys();">提交</div>
		</div>
	</div>
	<div id="newHysLayer" class="hysLayerNew">
	</div>
	<div id="hysToolTip" class="hysToolTip">
		<table>
			<tr>
				<td class="text_right">名称：</td>
				<td id="tipMc" class="span-3"></td>
			</tr>
			<tr>
				<td class="text_right">人数：</td>
				<td id="tipRs"></td>
			</tr>
			<tr>
				<td class="text_right">设备：</td>
				<td id="tipSb"></td>
			</tr>
			<tr>
				<td class="text_right">网线：</td>
				<td id="tipJk"></td>
			</tr>
			<tr>
				<td class="text_right">电话：</td>
				<td id="tipDh"></td>
			</tr>
		</table>
	</div>
</div>
</body>
</html>