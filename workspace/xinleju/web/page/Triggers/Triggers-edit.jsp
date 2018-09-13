<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>任务管理</title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="page/Triggers/Triggers-edit.js?t=<%=System.currentTimeMillis() %>"></script>
	    <script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	    <script type="text/javascript" src="js/common.js"></script>
		<%@ include file="/validate.jsp"%>
		<script type="text/javascript" >
			$(function() {

				var type = "second";
				var once = 1;
				var date = 1;
				var isShow = false;
				
				var cron = $("#cronTxt").val();
				if ( !cron ) {
					$("#execDiv").hide();
				} else {
					var array = cron.split(" ");
					if ( array[4] != "*" ) { // 月份选择
						type = "month";
						once = findOnce(array[4]);
						date = array[3];
						isShow = true;
					} else if ( array[3] != "*" && array[3] != "?" ) {
						type = "day";
						once = findOnce(array[3]);
					} else if ( array[2] != "*" ) {
						type = "hour";
						once = findOnce(array[2]);
					} else if ( array[1] != "*" ) {
						type = "minute";
						once = findOnce(array[1]);
					} else if ( array[0] != "*" ) {
						type = "second";
						once = findOnce(array[0]);
					}
				}
				
				$("#typeSel").val(type);
				$("#ever_cron").val(once);
				$("#execDate").val(date);
				if ( !isShow ) {
					$("#execDiv").hide();
				}
				 
			});
			
			function findOnce(onceTxt) {
				return onceTxt.split("/")[1];
			}
			  /*文本框只能输入数字校验--开始*/
			  function getEvent() {    
					if (document.all) {        
						return window.event; //for ie   
				    }    
					func = getEvent.caller;    
					while (func != null) 
					{        
						var arg0 = func.arguments[0];        
						if (arg0)
						 {            
							if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) 
							{                
								return arg0;            
							}        
						 }        
						func = func.caller;   
					 }    
					return null;
				}
			
			
			function doit(){ 
				$("#errormes").html("");
				var ev = getEvent();    
				if((ev.keyCode < 48 && ev.keyCode != 8) || ev.keyCode > 57) 
				{	
					$("#errormes").html("只能输入数字");
					return false;
				}
				else
				{  
				     return true;
				}
			}
			
			//检查时间表达式输入规则
            function checknum(val)
            {
            	if($("#typeSel").val() == "month")
       		    {

       		      if(parseInt(val) <1 || parseInt(val) > 31)
    		      {
     		    		$("#errormes").html("日只能输入介于1-31之间的数字");
     		    		$("#execDate").val("1"); 
     		    		chgCron();
     	           	   	return false;
    		      } 
       		   }
               return true;
            }
			
		</script>
	</head>

	<body style="margin: 0px;padding: 0px;">
		<s:form action="Triggers!save" id="frm">
		<s:token/>
			<s:hidden name="triggersDto.triggerName"></s:hidden>
			<s:hidden name="triggersDto.group"></s:hidden>
			<s:hidden name="act"></s:hidden>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
				<tr>
					<td>
						<div class="wdtable_titleh">
							任务编辑
						</div>
						<div class="wdtable_titletool">
							<a href="#" onclick="javascript:save()">提交</a><a href="#" onclick="window.close();">关闭</a>
						</div>
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0"
							class="divh3">
							<tr>
								<td>
									<div class="divh3_title">
										<a href="#">任务编辑</a>
									</div>
								</td>
							</tr>
						</table>
						<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
							<tr>
								<th width="160">
									<span class="alertstar">*</span>名称:
								</th>
								<td>
									<s:textfield name="triggersDto.name" cssStyle="width:80%"></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									<span class="alertstar">*</span>编码:
								</th>
								<td>
									<s:textfield name="triggersDto.code" cssStyle="width:80%" datatype="/^[0-9a-zA-Z]+$/" errormsg = "请输入字母和数字!"></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									<span class="alertstar">*</span>所属模块:
								</th>
								<td>
									<s:select list="#request.appMap" listKey="key" listValue="value.name"  name="triggersDto.moduleCode" headerKey="" headerValue="请选择" cssStyle="width:80%"></s:select>
								</td>
							</tr>
							<tr>
								<s:hidden name="triggersDto.jobName" value="assignJobDetail"></s:hidden>
								<th width="160">
									<span class="alertstar">*</span>时间表达式:
								</th>
								<td>
									<div id="cron" class="cron">
				                        <select id="typeSel" name="typeSel" onchange="chgCron()" >
						                    <option value="second">秒</option>
						                    <option value="minute">分</option>
						                    <option value="hour">时</option>
						                    <option value="day">日</option>
						                    <option value="month">月</option>
						                </select>
						                &nbsp;
										间隔 <input style="width: 60px;" data-options="min:1,max:59" value="1" id="ever_cron" name="ever_cron" validate="{number:true}" onblur="chgCron()" onkeydown="return doit()" >&nbsp;<span id="mark">秒</span>
										&nbsp;	
										<div id="execDiv" style="display:inline">，每月 <input name="execDate" value="1" style="width:20px" id="execDate" onblur="chgCron()" validate="{number:true}" onkeydown="return doit()" onkeyup="return checknum(this.value);" /> 号执行</div>
										<span id="errormes" style="color:red"></span>
				                    </div>
									<s:textfield name="triggersDto.cronExpression" id="cronTxt" cssStyle="width:80%" ></s:textfield>
								</td>
							</tr>
							<tr>
								<th width="160">
									<span class="alertstar">*</span>任务接口:
								</th>
								<td>
									<s:select  name="triggersDto.serviceId" list="#request.interfaceMap" listKey="key" listValue="value" cssStyle="width:80%"></s:select>
								</td>
							</tr>
							<tr>
								<th width="160">
									描述:
								</td>
								<td colspan="1">
									<s:textarea cols="70" rows="5" name="triggersDto.remark" cssStyle="width:80%"></s:textarea>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</s:form>
	</body>
</html>
