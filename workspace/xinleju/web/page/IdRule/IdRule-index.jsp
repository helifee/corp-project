<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>编号规则</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript">
	function del(url,id) {
	    if (confirm("确认删除吗?")) {
	        try {
	                var sendData = {'id':id,'now':new Date()};
	                $.ajax({
	                    type:"post",
	                    url:url,
	                    async:false,
	                    data:sendData,
	                    dataType:"json",
	                    success:function(jsonvalue){
	                        var result = jsonvalue.result;
	                        alert("删除成功!");
	                        document.location.reload();
	                    },
	                    error:function(){}
	                });
	        } catch(e) {}
	    }
	}
</script>
</head>
<body>
	<s:set id="year" value="@com.xinleju.erp.frame.models.IdRule@TYPE_YEAR"></s:set>
	<s:set id="month" value="@com.xinleju.erp.frame.models.IdRule@TYPE_MONTH"></s:set>
	<s:set id="day" value="@com.xinleju.erp.frame.models.IdRule@TYPE_DAY"></s:set>
	<s:set id="no" value="@com.xinleju.erp.frame.models.IdRule@TYPE_NO"></s:set>
	<s:set id="statusY" value="@com.xinleju.erp.frame.models.IdRule@STATUS_Y"></s:set>
	<s:set id="statusN" value="@com.xinleju.erp.frame.models.IdRule@STATUS_N"></s:set>
	<!-- 路径导航
    <div class="path">
        我的位置：首页&gt;&gt; <a href="#">流程管理</a>
    </div> -->
	<form id="frm" name="frm" action="IdRule!index.do" method="post">
        <input type="hidden" id="start" name="start" value="${start }"/>
        
        
         <!-- 查询条件 -->
		<div class="s1_searchWrap">
			  <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAll()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      	<s:if test="#request.statusMap.get(idRuleDto.status) != null">
			        	<li id="statusLi">
			        		<a href="javascript:void(0)" onclick="clearCurrent(this)">状态：${statusMap[idRuleDto.status]}</a>
			        		<s:hidden name="idRuleDto.status"></s:hidden>
			        	</li>
			      	</s:if>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
			 
			  <div class="sl-wrap">
			    <div class="sl-key"><span>状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq idRuleDto.status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectCond('状态：${value}','${key}','statusLi','idRuleDto.status')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>
		</div>
		
		
		<!-- 标题 -->
		<div class="t_title">
		  <div class="hh">编码规则列表</div>
		  <div class="t_title_input">
		    <input type="text" name="idRuleDto.keyword" id="keyword" placeholder="名称，编码"  value="${idRuleDto.keyword }"/>
		  </div>
		  <div class="t_title_input">
		  	<a href="#" title="查询" onclick="javascript:document.frm.submit();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
		  </div>
		  <div class="tool">
		  		<a target="_blank" href="IdRule!editUI.do" class="t_new">创建编号规则</a>
		  </div>
		  <div class="clear"></div>
		</div>
		
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			<tr>
				<th width="10%">序号</th>
				<th width="10%">编号规则名称</th>
				<th width="10%">编码</th>
				<th width="10%">流水号期间</th>
				<th width="10%">流水号位数</th>
				<th width="10%">当前流水号</th>
				<th width="10%">状态</th>
				<th width="10%">创建时间</th>
				<th width="10%">修改时间</th>
				<th width="10%">操作</th>
			</tr>
			<s:iterator value="page.items" var="item" status="s">
				<tr>
					<td align="center">${s.count }</td>
					<td align="center">${item.name }</td>
					<td align="center">${item.code }</td>
					<td align="center">${item.type eq year ? '按年度' : item.type eq month ? '按月份' : item.type eq day ? '按天' : '无限期'}</td>
					<td align="center">${item.len }</td>
					<td align="center"><s:property value="getSeq(#item.len, #item.count)" /></td>
					<td align="center">${item.status eq statusY ? '启用' : '禁用'}</td>
					<td align="center"><s:date name="#item.createDate" format="yyyy-MM-dd" /></td>
					<td align="center"><s:date name="#item.updateDate" format="yyyy-MM-dd" /></td>
					<td align="center"><a target="_blank" href="IdRule!editUI.do?idRule.id=${item.id }">编辑</a>&nbsp;<a href="javascript:void(0);" onclick="del('IdRule!del.do','${item.id }');">删除</a></td>
				</tr>
			</s:iterator>
		</table>
		<div class="page">
			<app:PageTag actionName="IdRule!index.do"></app:PageTag>
		</div>
	</form>
</body>
</html>
