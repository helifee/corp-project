<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>招标采购首页</title>
    <link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
    <script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
    <link href="css/mask.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
	<script type="text/javascript" src="js/search.js"></script>
	<script type="text/javascript" src="page/CateMgr/CateMgr-index.js?t=<%=System.currentTimeMillis()%>"></script>
</head>
<body>
	<div id="wrapper">
		<form id="frm" name="frm" action="CateMgr!index.do" method="post">
		<input type="hidden" id="cateMgrDtoCtId" name="cateMgrDto.ctId" value="${null != cateMgrDto ? cateMgrDto.ctId : ''}"/>
		<input type="hidden" value="${selectPath}" id="selectPath"/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="280" valign="top">
					<div id="cardarea_new">
						<div id="tree" style="height:350px;overflow-y:auto;"></div>
					</div>
				</td>
				<td width="6" valign="top">&nbsp;</td>
				<td valign="top">
					 <!-- 查询条件 -->
					<div class="s1_searchWrap">
						<div class="s2">
							<div class="sl-key">
								<span>已选条件:</span>
							</div>
							<div class="s2-clear">
								<a href="javascript:void(0)" onclick="clearAll()">清除条件</a>
							</div>
							<div class="s2-value">
								<ul id="selectedCond">
									<s:if test="#request.statusMap.get(cateMgrDto.status) != null">
										<li id="statusLi">
											<a href="javascript:void(0)" onclick="clearCurrent(this)">判定条目状态：${statusMap[cateMgrDto.status]}</a> <s:hidden name="cateMgrDto.status"></s:hidden>
										</li>
									</s:if>
									<s:if test="#request.valStatusMap.get(cateMgrDto.valStatus) != null">
										<li id="valStatusLi">
											<a href="javascript:void(0)" onclick="clearCurrent(this)">条目取值状态：${valStatusMap[cateMgrDto.valStatus]}</a> <s:hidden name="cateMgrDto.valStatus"></s:hidden>
										</li>
									</s:if>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
						<div class="sl-wrap">
							<div class="sl-key">
								<span>判定条目状态:</span>
							</div>
							<div class="sl-value">
								<ul>
									<s:iterator value="#request.statusMap">
										<li class="${key eq cateMgrDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('判定条目状态：${value}','${key}','statusLi','cateMgrDto.status')" id="${key}">${value}</a>
										</li>
									</s:iterator>
								</ul>
							</div>
							<div class="clear"></div>
							<div class="sl-key">
								<span>条目取值状态:</span>
							</div>
							<div class="sl-value">
								<ul>
									<s:iterator value="#request.valStatusMap">
										<li class="${key eq cateMgrDto.valStatus ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('条目取值状态：${value}','${key}','valStatusLi','cateMgrDto.valStatus')" id="${key}">${value}</a>
										</li>
									</s:iterator>
								</ul>
							</div>
							<div class="clear"></div>
						</div>
					</div>
					<!-- 标题 -->
					<div class="t_title">
						<div class="hh">取值列表</div>
						<div class="t_title_input">
							<input type="text" name="cateMgrDto.keyword" id="keyword" placeholder="取值名称" value="${cateMgrDto.keyword }" />
						</div>
						<div class="t_title_input">
							<a href="#" title="查询" onclick="javascript:query();">
								<img src="images/icon_search.png" width="24" height="24" align="bottom" />
							</a>
						</div>
						<div class="tool">
							<a href="#" onclick="javascript:void(0);" id="disOrUnDis">启用判定条目</a>
							<a href="#" onclick="javascript:newCate()" class="t_new" id="addPdTm">新建判定条目</a>
							<a href="#" onclick="javascript:editCate()" class="t_edit" id="editPdTm">编辑判定条目</a>
							<a href="#" onclick="javascript:updateCateVal();" class="t_submit">启用取值</a>
							<a href="#" onclick="javascript:updateCateVal(1);" class="t_del">禁用取值</a>
							<a href="#" onclick="javascript:newCateVal();" class="t_new">新增取值</a>
							<a href="#" onclick="javascript:editCateVal();" class="t_edit" >编辑取值</a>
						</div>
						<div class="clear"></div>
					</div>
					<div>
						<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
							<tr>
								<th width="5%"><input id="checker" type="checkbox" value="" onclick="AutoCheckAll('ids',event)" /></th>
								<th>名称</th>
								<th width="25%">取值</th>
								<th width="35%">所属分类（编码）</th>
								<th width="40px">状态</th>
							</tr>
							<s:iterator value="page.items" id="item">
								<s:if test="#item.isDisabled == 1">
								<tr class="redTr">
								</s:if>
								<s:else>
								<tr>
								</s:else>
									<td align="center"><input name="ids" type="checkbox" value="${item.id}" /></td>
									<td><s:property value="#item.name" /></td>
									<td><s:property value="#item.val" /></td>
									<td><s:property value="#item.cate.name" />（<s:property value="#item.cate.code" />）</td>
									<td align="center"><s:if test="#item.isDisabled == 1">禁用</s:if><s:else>启用</s:else></td>
								</tr>
							</s:iterator>
						</table>
						<div class="page">
							<div style="float: left;">
								&nbsp;
							</div>
							<jdt:pager url="CateMgr!index.do"></jdt:pager>
						</div>
					</div>
				</td>
			</tr>
		</table>
		</form>
	</div>
</body>
<script>
	function Resize(){
		iframeChangeSize('cateTree',null);
	}
</script>
</html>
