<%@ page contentType="text/html;charset=UTF-8" language="java"%>
   <style>
   	#setting-div{
   		margin: 0px;
   		font-size: 12px;
   	}
   	#assigner-div{
		margin-bottom: 5px;
		padding:10px; 
		border:1px solid #9BC2E1;
   	}  
   	#assigner-div div{
		margin-left: 23px;
		margin-top: 10px;
   	}   	
   	#assigner-div input{
		height: 20px; 
		vertical-align: middle; 
		text-align: center;
   	}     	
   	#assigner-leader-div{
		margin-bottom: 5px;
		padding:10px; 
		border:1px solid #9BC2E1;
   	}   
   	#assigner-leader-div div{
		margin-left: 23px;
		margin-top: 10px;
   	}     
   	#assigner-leader-div input{
		height: 20px; 
		vertical-align: middle; 
		text-align: center;
   	}    		   		 	 
   </style>
<div id="setting-div" class="x-hidden">
	<div style="margin-bottom: 5px;">审批人超时提醒：
	</div>
	<div style="text-align: right;margin-bottom: 5px;">启用状态：
		<input name="status" type="radio" value="1">&nbsp;&nbsp;是&nbsp;&nbsp;
		<input name="status" type="radio" value="0">&nbsp;&nbsp;否		
	</div>
	<div id="assigner-div">提醒审批人：<br>
		<div>超时时间：超时
			<input id="approverOvertime" type="number" size="10" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">&nbsp;小时提醒审批人
		</div>
		<div>提醒频率：
			<input name="approverRate" type="radio" value="0">&nbsp;&nbsp;提醒一次&nbsp;&nbsp;&nbsp;&nbsp;
			<input name="approverRate" type="radio" value="1">&nbsp;&nbsp;每天重复提醒
		</div>
	</div>
	<div id="assigner-leader-div">提醒审批人领导：<br>
		<div>超时时间：超时
			<input id="leaderOvertime" type="number" size="10" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">&nbsp;小时提醒审批人领导
		</div>
		<div>审批人领导：
			<input id="leaderId" type="text" hidden="hidden">
			<input id="leaderName" type="text" size="50" readonly="readonly" style="border-left: 0px;border-right: 0px;border-top: 0px;border-bottom: 1px solid #000000">
			<input type="button" value="选择" class="btn_q" onclick="showLeaderWin('fl');" style="padding: 1px 3px 1px 3px;">
		</div>
		<div>提醒频率：
			<input name="leaderRate" type="radio" value="0">&nbsp;&nbsp;提醒一次&nbsp;&nbsp;&nbsp;&nbsp;
			<input name="leaderRate" type="radio" value="1">&nbsp;&nbsp;每天重复提醒		
		</div>	
	</div>
</div>
