<%@ page contentType="text/html;charset=UTF-8" language="java"%>

	<link rel="stylesheet" href="../../../css/icon.css" type="text/css" />
	<link rel="stylesheet" href="../../../js/ext/resources/css/ext-all.css" type="text/css" />
	<link rel="stylesheet" href="designer.css" type="text/css" />
	<link rel="stylesheet" href="../../../css/cfldcn_style.css"  type="text/css" />
	<link rel="stylesheet" href="../../../js/ext/lovcombo/css/Ext.ux.form.LovCombo.css" type="text/css" />	
	<script src="../../../js/ext/adapter/ext/ext-base.js"></script>
	<script src="../../../js/ext/ext-all.js"></script>
	<script src="../../../js/ext/ux/ux-all.js"></script>
	<script src="../../../js/ext/TreeCheckNodeUI.js"></script>
	<script src="../../../js/jquery.js"></script>
	<script src="MonitorSetting.js"></script>
	<script src="../../../js/App.js"/></script>	
	
	<script type="text/javascript">
       $(function init(){
       		$("#leaderList").empty(); 
            var options = window.parent.getByDefualtOptions();
	        if (!isEmpty(options)) {
	        	var option = options.split(":"); 
				var ids = option[0].split(";");
				var vals = option[1].split(";");					
		        for (var i = 0; i < ids.length - 1; i++) {
		        	$("#leaderList").append("<option value='" + ids[i] + "'>" + vals[i] + "</option>");
		        	}
			}
       })

  </script>
		
<div id="leader-select-div">
	<table width="100%" border="0" cellpadding="1" cellspacing="1" class="wd_tablelist01_2">
		<tr>
			<td width="10%"  align="center">
				可选择人员:
			</td>
			<td style="width: 40%;vertical-align: top;">
				<div>查询条件：<input id="leader_tree_qk" style="width: 120px">
				&nbsp;<input id="btn_q" class="btn_q" type="button" value=" 查 询 " onclick="query_leader_tree();"></div>
				<input id="objectId" name="objectId" value="" type="hidden"></input>
				<div id="leader_tree" style="background: red;margin-top:5px;"></div>
			</td>
			<td style="width: 10%;" align="center">
				<input type="button" value="选择>>"  onclick="selectToLeaderList()" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
				<BR>
				<input type="button" value="<<移除" onclick="removeFromLeaderList('leaderList');" class="btn_q" style="padding: 1px 3px 1px 3px;margin-bottom: 5px;"/>
			</td>
			<td>
				<select id="leaderList" multiple="multiple" style="height: 290px; width: 100%;" class="select13" onclick="showLeaderDetail(this.value,'rDetailInfo')">
				</select>
				<textarea rows="3" style="width: 100%;overflow-y:hidden;font-size: 12px;font-family: 'Microsoft Yahei', 微软雅黑, 宋体, Helvetica, Tahoma, Arial,Helvetica, STHeiti;" id="rDetailInfo" disabled="disabled"></textarea>
			</td>
		</tr>
	</table>
</div>