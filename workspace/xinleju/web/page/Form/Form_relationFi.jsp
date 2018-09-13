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
<script type="text/javascript" src="page/Form/Form_relationFi.js"></script>
<div id="all" style="overflow:auto;height: 50px;" >
<table width="100%"  border="0" cellspacing="1" cellpadding="0" class="table_fj2" id="todoTable" style="line-height:100%" id="relationFiTable">
	<tr id="relation_fi_title_row">
		<th style="text-align: center;font-weight: bold">流程名称</th>
		<th width="60px" style="text-align: center;font-weight: bold"><a href="javascript:void(0)" onclick="singleChooseSp('relation_fi');return false;"><img src="images/icon_add.png" width="16" height="16" /></a></th>
	</tr>
	<s:if test="null != relationFiList && relationFiList.size() > 0">
		<s:iterator value="relationFiList" var="item" status="stat">
			<tr class="relation_fi_row">
				<td>
					<input type="hidden" class="relation_fi_sort" value="" />
					<input class="relation_fi_name" style="width:98%;" readonly="readonly" disabled="disabled" value="${item.hrefName}"/>
				</td>
				<td  align="left">
					<a href="javascript:void(0)" onclick="deleteRowFi('relation_fi',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
				</td>
			</tr>
		</s:iterator>
	</s:if>
	<s:else>
		<!-- <tr class="relation_fi_row">
			<td align="right">
				<input type="hidden" class="relation_fi_sort" value=""/>
				<input class="relation_fi_name" style="width:98%;" readonly="readonly" disabled="disabled" value=""/>
				<input type="hidden" class="relation_fi_spId" value=""/>
			</td>
			<td align="right">
				<a href="javascript:void(0)" onclick="deleteRowFi('relation_fi',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
			</td>
		</tr> -->
	</s:else>
</table>
</div>