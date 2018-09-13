<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/application.js"></script>
<meta name="viewport" content="width=device-width" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="page/Form/Form_relationHref.js"></script>
<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table_fj2" id="todoTable" style="line-height:100%" id="relationTable">
	<tr id="relation_title_row">
		<th style="text-align: center;font-weight: bold">名称</th>
		<th width="90px" style="text-align: center;font-weight: bold">链接</th>
		<th width="60px" style="text-align: center;font-weight: bold"><a href="javascript:void(0)" onclick="addRow('relation');"><img src="images/icon_add.png" width="16" height="16" /></a></th>
	</tr>
	<s:if test="null != relationHrefList && relationHrefList.size() > 0">
		<s:iterator value="spRelationHrefList" var="item" status="stat">
			<tr class="relation_row">
				<td>
					<input class="relation_name" style="width:98%;" value="${item.hrefName}"/>
				</td>
				<td>
					<input class="relation_href" style="width:98%;" value="${item.hrefStr}"/>
					<input type="hidden" class="relation_sort" value="" />
				</td>
				<td  align="left">
					<a href="javascript:void(0)" onclick="deleteRow('relation',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
				</td>
			</tr>
		</s:iterator>
	</s:if>
	<s:else>
		<tr class="relation_row">
			<td>
				<input class="relation_name" style="width:98%;" value=""/>
			</td>
			<td>
				<input class="relation_href" style="width:98%;" value=""/>
				<input type="hidden" class="relation_sort" value="" />
			</td>
			<td align="right">
				<a href="javascript:void(0)" onclick="deleteRow('relation',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
			</td>
		</tr>
	</s:else>
</table>