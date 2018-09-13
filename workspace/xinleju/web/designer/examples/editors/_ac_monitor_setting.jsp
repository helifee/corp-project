<%@ page contentType="text/html;charset=UTF-8" language="java"%>
   <style>
   	#ac_setting-div{
   		margin: 0px;
   		font-size: 12px;
   	}
   	#ac_assigner-div{
		margin-bottom: 5px;
		padding:10px; 
		border:1px solid #9BC2E1;
   	}  
   	#ac_assigner-div div{
		margin-left: 23px;
		margin-top: 10px;
   	}   	
   	#ac_assigner-div input{
		height: 20px; 
		vertical-align: middle; 
		text-align: center;
   	}     	
   	#ac_assigner-leader-div{
		margin-bottom: 5px;
		padding:10px; 
		border:1px solid #9BC2E1;
   	}   
   	#ac_assigner-leader-div div{
		margin-left: 23px;
		margin-top: 10px;
   	}     
   	#ac_assigner-leader-div input{
		height: 20px; 
		vertical-align: middle; 
		text-align: center;
   	}    		   		 	 
   </style>
<div id="ac_setting-div" class="x-hidden">
	<div style="margin-bottom: 5px;">审批人超时提醒：
	</div>
	<div style="text-align: right;margin-bottom: 5px;">超时提醒设置：
		<input name="ac_status" type="radio" value="1">&nbsp;&nbsp;按模板默认&nbsp;&nbsp;
		<input name="ac_status" type="radio" value="0">&nbsp;&nbsp;不提醒&nbsp;&nbsp;
		<input name="ac_status" type="radio" value="2">&nbsp;&nbsp;自定义设置			
	</div>
	<div id="ac_assigner-div">提醒审批人：<br>
		<div>超时时间：超时
			<input id="ac_approverOvertime" type="number" size="10" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">&nbsp;小时提醒审批人
		</div>
		<div>提醒频率：
			<input name="ac_approverRate" type="radio" value="0">&nbsp;&nbsp;提醒一次&nbsp;&nbsp;&nbsp;&nbsp;
			<input name="ac_approverRate" type="radio" value="1">&nbsp;&nbsp;每天重复提醒
		</div>
	</div>
	<div id="ac_assigner-leader-div">提醒审批人领导：<br>
		<div>超时时间：超时
			<input id="ac_leaderOvertime" type="number" size="10" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">&nbsp;小时提醒审批人领导
		</div>
		<div>审批人领导：
			<input id="ac_leaderId" type="text" hidden="hidden">
			<input id="ac_leaderName" type="text" size="50" readonly="readonly" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">
			<input type="button" value="选择" class="btn_q" onclick="showLeaderWin('ac');" style="padding: 1px 3px 1px 3px;">
		</div>
		<div>提醒频率：
			<input name="ac_leaderRate" type="radio" value="0">&nbsp;&nbsp;提醒一次&nbsp;&nbsp;&nbsp;&nbsp;
			<input name="ac_leaderRate" type="radio" value="1">&nbsp;&nbsp;每天重复提醒		
		</div>	
	</div>
</div>
