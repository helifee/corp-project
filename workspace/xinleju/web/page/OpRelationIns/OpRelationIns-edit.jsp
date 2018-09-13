<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>招标采购首页</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
</head>
<body style="margin: 0px;padding: 0px;">
	<s:form action="OpRelationIns!save" id="frm">
	<s:token/>
		<s:hidden name="id"></s:hidden>
		<s:hidden name="flowCode"></s:hidden>
		<s:hidden name="flowVersion"></s:hidden>
		<s:hidden name="nodeId"></s:hidden>
		<s:set id="showTypeYb" value="@com.telehot.flow.models.OpRelation@SHOW_TYPE_YB"></s:set>
		<table width="100%" border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01_2">
			<tr>
				<td align="left" class="sd" width="25%">经办人:<br />
					注：流程流转到当前节点时，<br />经办人可执行的操作。
				</td>
				<td>
					<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="qcrTable">
						<tr id="qcr_title_row">
							<th width="200px">操作类型</th>
							<th>操作名称</th>
							<th width="80px">仅已办显示</th>
						</tr>
						<s:iterator value="qcrOpRelationInsList" var="item" status="stat">
						<tr class="qcr_row">
							<td>
								<select disabled="disabled"  class="qcr_type" style="width:120px;">
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
								<input disabled="disabled"  class="qcr_name" style="width:98%;" value="${item.name}"/>
								<input type="hidden" class="qcr_sort" value="" />
							</td>
							<td align="center">
								<input disabled="disabled" class="qcr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
							</td>
						</tr>
						</s:iterator>
					</table>
				</td>
			</tr>
			<tr>
				<td align="left" class="sd">处理人:<br />
					注：流程流转到当前节点时，<br />当前处理人可执行的操作。
				</td>
				<td>
					<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="clrTable">
						<tr id="clr_title_row">
							<th width="200px">操作类型</th>
							<th>操作名称</th>
							<th width="80px">仅已办显示</th>
						</tr>
						<s:iterator value="clrOpRelationInsList" var="item" status="stat">
						<tr class="clr_row">
							<td>
								<select disabled="disabled" class="clr_type" style="width:120px;">
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
								<input disabled="disabled" class="clr_name" style="width:98%;" value="${item.name}"/>
								<input type="hidden" class="clr_sort" value="" />
							</td>
							<td align="center">
								<input disabled="disabled" class="clr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
							</td>
						</tr>
						</s:iterator>
					</table>
				</td>
			</tr>
			<tr>
				<td align="left" class="sd">协办人:<br />
					注：流程流转到当前节点时，<br />当前协办人可执行的操作。
				</td>
				<td>
					<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01_2" id="xbrTable">
						<tr id="xbr_title_row">
							<th width="200px">操作类型</th>
							<th>操作名称</th>
							<th width="80px">仅已办显示</th>
						</tr>
						<s:iterator value="xbrOpRelationInsList" var="item" status="stat">
						<tr class="xbr_row">
							<td>
								<select disabled="disabled"  class="xbr_type" style="width:120px;">
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
								<input disabled="disabled"  class="xbr_name" style="width:98%;" value="${item.name}"/>
								<input type="hidden" class="xbr_sort" value="" />
							</td>
							<td align="center">
								<input disabled="disabled" class="xbr_showType" name="" <s:if test="#item.showType == #showTypeYb">checked="checked"</s:if> type="checkbox" value="${showTypeYb}"/>
							</td>
						</tr>
						</s:iterator>
					</table>
				</td>
			</tr>
		</table>
	</s:form>
	<script type="text/javascript">
		var selectOpQcrStr = "";
		var selectOpClrStr = "";
		var selectOpXbrStr = "";
	</script>
	<s:iterator value="qcrOpList" var="qcrOp" status="stat">
		<s:if test="#stat.index == 0">
			<script type="text/javascript">
				selectOpQcrStr = '<option value="${qcrOp.id}" selected="selected">${qcrOp.name}</option>';
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
			if(opType == "qcr") {
	        	selectOpStr = selectOpQcrStr;
	        }else if(opType == "clr") {
	        	selectOpStr = selectOpClrStr;
	        }else{
	        	selectOpStr = selectOpXbrStr;
	        }
			var html = '<tr class="'+opType+'_row">'
				+'<td><select class="'+opType+'_type" style="width:120px;">' +selectOpStr +'</select></td>'
				+'<td><input class="'+opType+'_name" style="width:98%;" validate="{required:true,maxlength:20}"/><input type="hidden"  class="'+opType+'_sort" value="" /></td>'
				+'</tr>';
			if(obj){
				$(obj).parents('.'+opType+'_row').after(html);
			}else{
				$('#'+opType+'_title_row').after(html);
			}
			
			
			$("#opRelationIns",parent.document).height($(document.body).height());
		}
		
		function deleteRow(opType,obj){
			$(obj).parents('.'+opType+'_row').remove();
			if($('.'+opType+'_row').length==0){
				//addRow(opType);
			}
		}
		function frmSubmit(){
			var complete = true;
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
				$(this).find('.qcr_name').attr('name','qcrOpRelationInsList['+index+'].name');
				$(this).find('.qcr_type').attr('name','qcrOpRelationInsList['+index+'].opId');
				$(this).find('.qcr_sort').val(index+1).attr('name','qcrOpRelationInsList['+index+'].sort');
				index++;
				hasOp = true;
			});
			index = 0;
			$('tr.clr_row').each(function(){
				$(this).find('.clr_name').attr('name','clrOpRelationInsList['+index+'].name');
				$(this).find('.clr_type').attr('name','clrOpRelationInsList['+index+'].opId');
				$(this).find('.clr_sort').val(index+1).attr('name','clrOpRelationInsList['+index+'].sort');
				index++;
				hasOp = true;
			});
			index = 0;
			$('tr.xbr_row').each(function(){
				$(this).find('.xbr_name').attr('name','xbrOpRelationInsList['+index+'].name');
				$(this).find('.xbr_type').attr('name','xbrOpRelationInsList['+index+'].opId');
				$(this).find('.xbr_sort').val(index+1).attr('name','xbrOpRelationInsList['+index+'].sort');
				index++;
				hasOp = true;
			});
			if(!complete || !hasOp){
				alert('请完善操作明细表单后再提交！');
				return false;
			}
			$.ajax({
	            cache: true,
	            type: "POST",
	            url:"OpRelationIns!save.do",
	            data:$("#frm").serialize(),// 你的formid
	            async: false,
	            error: function(request) {
	            },
	            success: function(data){
	            }
	        });
		}
	</script>
</body>
</html>
