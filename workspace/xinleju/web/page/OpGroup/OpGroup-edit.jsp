<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>审批类型编辑</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="OpGroup!save" id="frm">
	<s:token/>
		<s:hidden name="opGroup.id"></s:hidden>
		<s:set id="showTypeYb" value="@com.telehot.flow.models.OpRelation@SHOW_TYPE_YB"></s:set>
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">审批类型编辑</div>
					<div class="wdtable_titletool" id="submitDiv">
						<a href="#" onclick="frmSubmit();">保存</a> <a href="#" onclick="window.close();">关闭</a>
					</div></td>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0"
			class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellpadding="0" cellspacing="1"
						class="wd_tablelist01_2">
						<tr>
							<td align="left" class="sd" width="20%"><span class="alertstar">*</span>节点类型编号:</td>
							<td width="80%"><s:textfield id="opGroupCode" name="opGroup.code" cssStyle="width:98%"></s:textfield></td>
						</tr>
						<tr>
							<td align="left" class="sd" width="20%"><span class="alertstar">*</span>节点类型名称:</td>
							<td width="80%"><s:textfield id="opGroupName" name="opGroup.name" cssStyle="width:98%"></s:textfield></td>
						</tr>
						<tr>
							<td align="left" class="sd" width="20%">该类型节点，发起人可撤回:</td>
							<td width="80%"><s:checkbox id="canWithdraw" name="opGroup.canWithdraw" fieldValue="1"/></td>
						</tr>
						<tr>
							<td align="left" class="sd" width="20%">经办人:<br />
								注：流程流转到当前节点时，<br />经办人可执行的操作。
							</td>
							<td width="80%">
								<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="qcrTable">
									<tr id="qcr_title_row">
										<th width="200px"><span class="alertstar">*</span>操作类型</th>
										<th><span class="alertstar">*</span>操作名称</th>
										<th width="80px">仅已办显示</th>
										<th width="100px"><a href="javascript:void(0)" onclick="addRow('qcr')"><img src="images/icon_add.png" width="16" height="16"></a></th>
									</tr>
									<s:iterator value="qcrOpRelationList" var="item" status="stat">
									<tr class="qcr_row">
										<td>
											<select class="qcr_type" onchange="changeOpValue(this)" style="width:120px;">
												<s:set id="isDelete" value="true"></s:set>
												<s:iterator value="qcrOpList" var="qcrOp" status="stat">
													<s:if test="#qcrOp.id == #item.opId ">
														<s:set id="isDelete" value="false"></s:set>
														<option value="${qcrOp.id}" selected="selected">
															${qcrOp.name}
														</option>
													</s:if>
													<s:else>
														<option value="${qcrOp.id}">
															${qcrOp.name}
														</option>
													</s:else>
												</s:iterator>
												<s:if test="#isDelete">
													<option value="${item.opId}" selected="selected">
														${item.op.name}<font color="red">(已禁用)</font>
													</option>
												</s:if>
											</select>
										</td>
										<td>
											<input class="qcr_name" style="width:98%;" value="${item.name}"/>
											<input type="hidden" class="qcr_sort" value="" />
										</td>
										<td align="center">
											<input class="qcr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
										</td>
										<td>
											<a href="javascript:void(0)" onclick="upItem('qcr',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem('qcr',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow('qcr',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow('qcr',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
										</td>
									</tr>
									</s:iterator>
								</table>
							</td>
						</tr>
						<tr>
							<td align="left" class="sd" width="20%">处理人:<br />
								注：流程流转到当前节点时，<br />当前处理人可执行的操作。
							</td>
							<td width="80%">
								<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="clrTable">
									<tr id="clr_title_row">
										<th width="200px">操作类型</th>
										<th>操作名称</th>
										<th width="80px">仅已办显示</th>
										<th width="100px"><a href="javascript:void(0)" onclick="addRow('clr')"><img src="images/icon_add.png" width="16" height="16"></a></th>
									</tr>
									<s:iterator value="clrOpRelationList" var="item" status="stat">
									<tr class="clr_row">
										<td>
											<select class="clr_type" onchange="changeOpValue(this)" style="width:120px;">
												<s:set id="isDelete" value="true"></s:set>
												<s:iterator value="clrOpList" var="clrOp" status="stat">
													<s:if test="#clrOp.id == #item.opId ">
														<s:set id="isDelete" value="false"></s:set>
														<option value="${clrOp.id}" selected="selected">
															${clrOp.name}
														</option>
													</s:if>
													<s:else>
														<option value="${clrOp.id}">
															${clrOp.name}
														</option>
													</s:else>
												</s:iterator>
												<s:if test="#isDelete">
													<option value="${item.opId}" selected="selected">
														${item.op.name}<font color="red">(已禁用)</font>
													</option>
												</s:if>
											</select>
										</td>
										<td>
											<input class="clr_name" style="width:98%;" value="${item.name}"/>
											<input type="hidden" class="clr_sort" value="" />
										</td>
										<td align="center">
											<input class="clr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
										</td>
										<td>
											<a href="javascript:void(0)" onclick="upItem('clr',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem('clr',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow('clr',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow('clr',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
										</td>
									</tr>
									</s:iterator>
								</table>
							</td>
						</tr>
						<tr>
							<td align="left" class="sd" width="20%">协办人:<br />
								注：流程流转到当前节点时，<br />当前协办人可执行的操作。
							</td>
							<td width="80%">
								<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="xbrTable">
									<tr id="xbr_title_row">
										<th width="200px">操作类型</th>
										<th>操作名称</th>
										<th width="80px">仅已办显示</th>
										<th width="100px"><a href="javascript:void(0)" onclick="addRow('xbr')"><img src="images/icon_add.png" width="16" height="16"></a></th>
									</tr>
									<s:iterator value="xbrOpRelationList" var="item" status="stat">
									<tr class="xbr_row">
										<td>
											<select class="xbr_type" onchange="changeOpValue(this)" style="width:120px;">
												<s:set id="isDelete" value="true"></s:set>
												<s:iterator value="xbrOpList" var="xbrOp" status="stat">
													<s:if test="#xbrOp.id == #item.opId ">
														<s:set id="isDelete" value="false"></s:set>
														<option value="${xbrOp.id}" selected="selected">
															${xbrOp.name}
														</option>
													</s:if>
													<s:else>
														<option value="${xbrOp.id}">
															${xbrOp.name}
														</option>
													</s:else>
												</s:iterator>
												<s:if test="#isDelete">
													<option value="${item.opId}" selected="selected">
														${item.op.name}<font color="red">(已禁用)</font>
													</option>
												</s:if>
											</select>
										</td>
										<td>
											<input class="xbr_name" style="width:98%;" value="${item.name}"/>
											<input type="hidden" class="xbr_sort" value="" />
										</td>
										<td align="center">
											<input class="xbr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
										</td>
										<td>
											<a href="javascript:void(0)" onclick="upItem('xbr',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem('xbr',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow('xbr',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow('xbr',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
										</td>
									</tr>
									</s:iterator>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
	<script type="text/javascript">
		var selectOpQcrStr = "";
		var selectOpClrStr = "";
		var selectOpXbrStr = "";
		var selectOpQcrValueStr = "";
		var selectOpClrValueStr = "";
		var selectOpXbrValueStr = "";
	</script>
	<s:iterator value="qcrOpList" var="qcrOp" status="stat">
		<s:if test="#stat.index == 0">
			<script type="text/javascript">
				selectOpQcrStr = '<option value="${qcrOp.id}" selected="selected">${qcrOp.name}</option>';
				selectOpQcrValueStr = "${qcrOp.name}";
			</script>
		</s:if>
		<s:else>
			<script type="text/javascript">
				selectOpQcrStr += '<option value="${qcrOp.id}">${qcrOp.name}</option>';
			</script>
		</s:else>
	</s:iterator>
	<s:iterator value="clrOpList" var="clrOp" status="stat">
		<s:if test="#stat.index == 0">
			<script type="text/javascript">
				selectOpClrStr = '<option value="${clrOp.id}" selected="selected">${clrOp.name}</option>';
				selectOpClrValueStr = "${clrOp.name}";
			</script>
		</s:if>
		<s:else>
			<script type="text/javascript">
				selectOpClrStr += '<option value="${clrOp.id}">${clrOp.name}</option>';
			</script>
		</s:else>
	</s:iterator>
	<s:iterator value="xbrOpList" var="xbrOp" status="stat">
		<s:if test="#stat.index == 0">
			<script type="text/javascript">
				selectOpXbrStr = '<option value="${xbrOp.id}" selected="selected">${xbrOp.name}</option>';
				selectOpXbrValueStr = "${xbrOp.name}";
			</script>
		</s:if>
		<s:else>
			<script type="text/javascript">
				selectOpXbrStr += '<option value="${xbrOp.id}">${xbrOp.name}</option>';
			</script>
		</s:else>
	</s:iterator>
	<script type="text/javascript">
		function upItem(opType,obj){
			var tr = $(obj).parents('tr.'+opType+'_row');
			if(tr.prev().hasClass(opType+'_row')){
				tr.prev().before(tr);
			}
		}
		
		function downItem(opType,obj){
			var tr = $(obj).parents('tr.'+opType+'_row');
			if(tr.next().hasClass(opType+'_row')){
				tr.next().after(tr);
			}
		}
		
		function addRow(opType,obj){
			var selectOpStr = '';
			var selectOpValueStr = '';
			if(opType == "qcr") {
	        	selectOpStr = selectOpQcrStr;
	        	selectOpValueStr = selectOpQcrValueStr;
	        }else if(opType == "clr") {
	        	selectOpStr = selectOpClrStr;
	        	selectOpValueStr = selectOpClrValueStr;
	        }else{
	        	selectOpStr = selectOpXbrStr;
	        	selectOpValueStr = selectOpXbrValueStr;
	        }
			var html = '<tr class="'+opType+'_row">'
				+'<td><select class="'+opType+'_type" style="width:120px;" onChange="changeOpValue(this)">' +selectOpStr +'</select></td>'
				+'<td><input class="'+opType+'_name" style="width:98%;" value="' + selectOpValueStr + '" validate="{required:true,maxlength:20}"/><input type="hidden" class="'+opType+'_sort" value="" /></td>'
				+'<td align="center"><input class="'+opType+'_showType" name="" type="checkbox" value="${showTypeYb}"/></td>'
				+'<td><a href="javascript:void(0)" onclick="upItem(\''+opType+'\',this)"><img src="images/icon_up1.png" width="16" height="16" /></a>'
				+'<a href="javascript:void(0)" onclick="downItem(\''+opType+'\',this)"><img src="images/icon_down1.png" width="16" height="16" /></a>'
				+'<a href="javascript:void(0)" onclick="addRow(\''+opType+'\',this)"><img src="images/icon_add.png" width="16" height="16" ></a>'
				+'<a href="javascript:void(0)" onclick="deleteRow(\''+opType+'\',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>'
				+'</td></tr>';
			if(obj){
				$(obj).parents('.'+opType+'_row').after(html);
			}else{
				$('#'+opType+'_title_row').after(html);
			}
		}
		
		function changeOpValue(obj){
			$(obj).parent().next("td").find("input").val(null != $(obj).find("option:selected").text() ? $(obj).find("option:selected").text().trim() : "");
		}
		
		function deleteRow(opType,obj){
			$(obj).parents('.'+opType+'_row').remove();
			if($('.'+opType+'_row').length==0){
				//addRow(opType);
			}
		}
		function frmSubmit(){
			var complete = true;
			if(isEmpty($('#opGroupCode').val())){
				complete = false;
				document.getElementById('opGroupCode').style.background='pink';
			}else{
				document.getElementById('opGroupCode').style.background='white';
			}
			if(isEmpty($('#opGroupName').val())){
				complete = false;
				document.getElementById('opGroupName').style.background='pink';
			}else{
				document.getElementById('opGroupName').style.background='white';
			}
			$('input.qcr_name').each(function(){
				if(!this.value){
					complete = false;
					this.style.background='pink';
				}else{
					this.style.background='white';
				}
			});
			$('input.clr_name').each(function(){
				if(!this.value){
					complete = false;
					this.style.background='pink';
				}else{
					this.style.background='white';
				}
			});
			$('input.xbr_name').each(function(){
				if(!this.value){
					complete = false;
					this.style.background='pink';
				}else{
					this.style.background='white';
				}
			});
			var hasOp = false;
			var index = 0;
			$('tr.qcr_row').each(function(){
				$(this).find('.qcr_name').attr('name','qcrOpRelationList['+index+'].name');
				$(this).find('.qcr_type').attr('name','qcrOpRelationList['+index+'].opId');
				$(this).find('.qcr_showType').attr('name','qcrOpRelationList['+index+'].showType');
				$(this).find('.qcr_sort').val(index+1).attr('name','qcrOpRelationList['+index+'].sort');
				index++;
				hasOp = true;
			});
			index = 0;
			$('tr.clr_row').each(function(){
				$(this).find('.clr_name').attr('name','clrOpRelationList['+index+'].name');
				$(this).find('.clr_type').attr('name','clrOpRelationList['+index+'].opId');
				$(this).find('.clr_showType').attr('name','clrOpRelationList['+index+'].showType');
				$(this).find('.clr_sort').val(index+1).attr('name','clrOpRelationList['+index+'].sort');
				index++;
				hasOp = true;
			});
			index = 0;
			$('tr.xbr_row').each(function(){
				$(this).find('.xbr_name').attr('name','xbrOpRelationList['+index+'].name');
				$(this).find('.xbr_type').attr('name','xbrOpRelationList['+index+'].opId');
				$(this).find('.xbr_showType').attr('name','xbrOpRelationList['+index+'].showType');
				$(this).find('.xbr_sort').val(index+1).attr('name','xbrOpRelationList['+index+'].sort');
				index++;
				hasOp = true;
			});
			if(!complete || !hasOp){
				alert('请完善表单后再提交！');
				return false;
			}
			//隐藏按钮
			$('body').mask("操作中...");
			$.ajax({
	            cache: true,
	            type: "POST",
	            url:"OpGroup!save.do",
	            data:$("#frm").serialize(),// 你的formid
	            async: false,
	            error: function(request) {
	            	$('body').unmask();
	            },
	            success: function(data){
	            	alert(data.msg);
	            	if(data.success){
	            		//刷新父亲页面
						$("#frm", window.opener.document).submit();
						window.close();
	            	}else{
		            	$('body').unmask();
	            	}
	            }
	        });
		}
	</script>
</body>
</html>
