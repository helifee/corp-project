<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>自定义常用意见</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
</head>
<body style="margin: 0px;padding: 0px;"  onkeypress="return disableEnterKey(event);">
	<s:form action="UserNote!save.do" id="frm">
	<s:token/>
		<s:hidden name="userId" value="%{#request.userId}"></s:hidden>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" style="background-color: #FBF3EA;">
			<tr id="upBtn">
				<td>
					<div class="wdtable_titleh">自定义常用意见</div>
					<div class="wdtable_titletool" id="submitDiv">
						<input type="button" class="dfbtn" onclick="frmSubmit();return false;" value="保存"/>
						<input type="button" class="dfbtn" onclick="window.close();return false;" value="关闭"/>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
			<tr>
				<td>
					<div class="divh3_title">自定义常用意见</div>
				</td>
			</tr>
		</table>
		<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist04" id="noteTable">
			<tr style="display: none;" id = "note_title_row">
				<td colspan="2"></td>
			</tr>
			<s:if test="null != userNotes && userNotes.size() > 0">
				<s:iterator value="userNotes" var="item" status="stat">
				<tr class="note_row">
					<td>
						<input class="note_name" style="width:98%;" value="${item.note}"/>
						<input type="hidden" class="note_sort" value="" />
					</td>
					<td width="120px">
						<a href="javascript:void(0)" onclick="upItem('note',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem('note',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow('note',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow('note',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
					</td>
				</tr>
				</s:iterator>
			</s:if>
			<s:else>
				<tr class="note_row">
					<td>
						<input class="note_name" style="width:98%;" value="${item.note}"/>
						<input type="hidden" class="note_sort" value="" />
					</td>
					<td width="120px">
						<a href="javascript:void(0)" onclick="upItem('note',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem('note',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow('note',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow('note',this)"><img src="images/icon_delete.png" width="16" height="16" /></a>
					</td>
				</tr>
			</s:else>
		</table>
	</s:form>
	<script type="text/javascript">
	  function disableEnterKey(e) {   
	         var key;   
	         if (window.event)   
	             key = window.event.keyCode; //IE   
	         else  
	             key = e.which; //firefox        
	   
	         return (key != 13);   
	     }   
	  
	  
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
			var html = '<tr class="'+opType+'_row">'
				+'<td><input class="'+opType+'_name" style="width:98%;" value=""/><input type="hidden" class="'+opType+'_sort" value="" /></td>'
				+'<td width="120px"><a href="javascript:void(0)" onclick="upItem(\'' + opType + '\',this)"><img src="images/icon_up1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="downItem(\'' + opType + '\',this)"><img src="images/icon_down1.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="addRow(\'' + opType + '\',this)"><img src="images/icon_add.png" width="16" height="16" /></a><a href="javascript:void(0)" onclick="deleteRow(\'' + opType + '\',this)"><img src="images/icon_delete.png" width="16" height="16" /></a></td>'
				+'</tr>';
			if(obj){
				$(obj).parents('.'+opType+'_row').after(html);
			}else{
				$('#'+opType+'_title_row').after(html);
			}
		}
		
		function deleteRow(opType,obj){
			$(obj).parents('.'+opType+'_row').remove();
			if($('.'+opType+'_row').length == 0){
				addRow(opType);
			}
		}
		function frmSubmit(){
			var complete = true;
			$('input.note_name').each(function(){
				if(!this.value){
					complete = false;
					this.style.background='pink';
				}else{
					this.style.background='white';
				}
			});
			var hasOp = false;
			var index = 0;
			$('tr.note_row').each(function(){
				$(this).find('.note_name').attr('name','userNotes['+index+'].note');
				$(this).find('.note_sort').val(index+1).attr('name','userNotes['+index+'].sort');
				index++;
				hasOp = true;
			});
			if(!complete || !hasOp){
				alert('请完善表单后再发起！');
				return false;
			}
			$.ajax({
	            cache: true,
	            type: "POST",
	            url:"UserNote!save.do",
	            data:$("#frm").serialize(),// 你的formid
	            success : function(result) {
	                if(result.success == "true"){
	                	alert('保存成功！');
	                    window.close();
	                }else{
	                	alert('保存失败');
	                }
	            },
	            error : function(){
	                alert('保存失败，请刷新后重试！');
	            }
	        });
		}
	
	</script>
</body>
</html>
