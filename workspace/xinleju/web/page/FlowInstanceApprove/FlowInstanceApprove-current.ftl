<#if flowInstance?? && flowInstance.lstFlowInstanceStep??>
	<#--遍历流程实例环节-->
	<#list flowInstance.lstFlowInstanceStep as flowInstanceStep>
	       <#-- 颜色活动不需要校验 -->
	      	<#if flowInstanceStep.status == 1>
        		  <#assign stepColor="background-color:#AFEEEE">
			<#elseif flowInstanceStep.status == 2>
				  <#assign stepColor="background-color:#FFF">
			<#elseif flowInstanceStep.status == 0>
				  <#assign stepColor="background-color:#EBEBEB">
			<#else>
	              <#assign stepColor="">
	        </#if>
             <#-- 自动活动不需要校验 -->
	        <#if flowInstanceStep.isAuto?? && flowInstanceStep.isAuto == 1>
				  <#assign isAuto="true">
			<#else>
	              <#assign isAuto="false">
	        </#if>
	        
	        
	        <#if flowInstanceStep.participantsSelectStrategy?? && flowInstanceStep.participantsSelectStrategy == 1 >
				  <#assign selectPersonStrategy="true">
			<#else>
	              <#assign selectPersonStrategy="false">
	        </#if>
	        
	        
	       		 
        <#if flowInstanceStep.lstFlowInstanceStepWork??&&(flowInstanceStep.lstFlowInstanceStepWork?size > 0)>
    		<#--遍历流程实例环节工作组-->
    		<#list flowInstanceStep.lstFlowInstanceStepWork as flowInstanceStepWork>
    			<#if flowInstanceStepWork.status == 1>
        		  <#assign workColor="background-color:#AFEEEE">
				<#elseif flowInstanceStepWork.status == 2>
					  <#assign workColor="background-color:#FFF">
				<#elseif flowInstanceStepWork.status == 0>
					  <#assign workColor="background-color:#EBEBEB">
				<#else>
		              <#assign workColor="">
		        </#if>

              
		        
    			<#if flowInstanceStepWork.lstFlowInstanceStepWorkTask??&&(flowInstanceStepWork.lstFlowInstanceStepWorkTask?size > 0)>
					<#--遍历流程实例环节工作组任务-->
	        		<#list flowInstanceStepWork.lstFlowInstanceStepWorkTask as flowInstanceStepWorkTask>
			             <#if flowInstanceStepWorkTask.status == 1>
		        		  <#assign taskColor="background-color:#AFEEEE">
						<#elseif flowInstanceStepWorkTask.status == 2>
							  <#assign taskColor="background-color:#FFF">
						<#elseif flowInstanceStepWorkTask.status == 0>
							  <#assign taskColor="background-color:#EBEBEB">
						<#else>
				              <#assign taskColor="">
				        </#if>
				        
				        <tr>
		        			<td style="text-align:center;${stepColor}" data-groupName = "${flowInstanceStep_index + 1}">${flowInstanceStep_index + 1}</td>
				        	<td style="text-align:left;${stepColor}" data-groupName = "${(flowInstanceStep_index + 1)!''}-${flowInstanceStep.displayName!''}-${flowInstanceStep.guid}">${flowInstanceStep.displayName}</td>
							<td  style="text-align:left;${workColor}" data-groupName = "${(flowInstanceStep_index + 1)!''}-${flowInstanceStep.displayName!''}-${flowInstanceStepWork.participantPostName!''}-${flowInstanceStepWork.guid}">
								<#if flowInstanceStepWork.participantPostName??>
									<#assign index = flowInstanceStepWork.participantPostName?last_index_of("/")>
									${flowInstanceStepWork.participantPostName?substring(0,index)}</br>
									${flowInstanceStepWork.participantPostName?substring(index+1)}
								</#if>
							</td>
							<#if flowInstanceStepWorkTask.status == 1>
					        	<td style="text-align:left;${taskColor}" data-participantsNameValidate="${isAuto}">${flowInstanceStepWorkTask.participantUserName!flowInstanceStepWorkTask.originParticipantName!}
					        	<#if flowInstanceStepWorkTask.flowBusinessType?? && flowInstanceStepWorkTask.flowBusinessType == '2' >
									  【代】
								</#if>
					        	</td>
					        <#elseif flowInstanceStepWorkTask.status == 2>
					        	<td style="text-align:left;${taskColor}" data-participantsNameValidate="${isAuto}"}>${flowInstanceStepWorkTask.completeUserName!flowInstanceStepWorkTask.originParticipantName!}
					        	<#if flowInstanceStepWorkTask.flowBusinessType?? && flowInstanceStepWorkTask.flowBusinessType == '2' >
									  【代】
								</#if>
					        	</td>
					        </#if>
					        <#if flowInstanceStepWorkTask.opCode??>
					        	<td style="text-align:left;${taskColor}" >${(flowInstanceStepWorkTask.opCode?split(";"))[1]!''} </td>
					        <#else>
					        	<td style="text-align:left;${taskColor}"></td>
					        </#if>
					        <td style="text-align:left;${taskColor}">
					        	<#if flowInstanceStepWorkTask.userNote?? && ((flowInstanceStepWorkTask.userNote)?length>0)>
					        		${flowInstanceStepWorkTask.userNote!''}<br/>
					        	</#if>
					        	<#if flowInstanceStepWorkTask.status == 2 && flowInstanceStepWorkTask.lstUpload?? &&(flowInstanceStepWorkTask.lstUpload?size > 0)>
					        		<form action="File!downloadChooseZip.do" id="frm_${flowInstanceStepWorkTask.guid}" method="post">
						        		<table class="table table-bordered table-condensed">
	                                        <thead>
	                                            <tr>
	                                                <th style="text-align:center;width:40px;"><input name="checkAll_${flowInstanceStepWorkTask.guid}" data-checkItem="checkItem_${flowInstanceStepWorkTask.guid}" type="checkbox"/></th>
	                                                <th><a href="javascript:;" data-checkItem="checkItem_${flowInstanceStepWorkTask.guid}" data-form="frm_${flowInstanceStepWorkTask.guid}" name="downloadAll_${flowInstanceStepWorkTask.guid}">打包下载</a></th>
	                                            </tr>
	                                        </thead>
	                                        <tbody>
	                                        	<#list flowInstanceStepWorkTask.lstUpload as upload>
		                                        	<tr>
			                                        	<td style="text-align:center;width:40px;">
			                                        		<#if upload.ext != 'url'>
			                                        			<input name="checkItem_${flowInstanceStepWorkTask.guid}" data-id="${upload.id}" data-checkAll="checkAll_${flowInstanceStepWorkTask.guid}" type="checkbox"/>
			                                        		</#if>
			                                        	</td>
			                                            <td>
			                                            	<#if upload.ext == 'url'>
												        		<a name="urlOpen" href="javascript:;" data-href="${upload.userLabel}" title="${upload.fileName}">${upload.fileName}</a>
												        	<#else>
												        		<a href="File!download.do?id=${upload.id}" name="download_${flowInstanceStepWorkTask.guid}" title="${upload.fileName}">${upload.fileName}</a>
												        	</#if>
			                                            </td>
		                                            </tr>
	                                            </#list>
	                                        </tbody>
	                                    </table>
	                                </form>
					        	</#if>
					        </td>
					        <td style="text-align:left;${taskColor}">${flowInstanceStepWorkTask.completeTime!''}</td>
				        </tr>
	        		</#list>
			    <#else>
			        <!-- 没有task-->
	        		<tr>
	        			<td style="text-align:center;${stepColor}" data-groupName = "${flowInstanceStep_index + 1}">${flowInstanceStep_index + 1}</td>
					    <td  style="text-align:left;${stepColor}" data-groupName = "${(flowInstanceStep_index + 1)!''}-${flowInstanceStep.displayName!''}-${flowInstanceStep.guid}">${flowInstanceStep.displayName}</td>
						<td  style="text-align:left;${workColor}" data-groupName = "${(flowInstanceStep_index + 1)!''}-${flowInstanceStep.displayName!''}-${flowInstanceStepWork.participantPostName!''}-${flowInstanceStepWork.guid!''}">
							<#if flowInstanceStepWork.participantPostName??>
								<#assign index = flowInstanceStepWork.participantPostName?last_index_of("/")>
								${flowInstanceStepWork.participantPostName?substring(0,index)}</br>
								${flowInstanceStepWork.participantPostName?substring(index+1)}
							</#if>
						</td>
				        <td style="max-width:200px;${workColor}" data-participantsNameValidate="${isAuto}">
				        	<#if flowInstanceStepWork.status == 0>
				        	
								<div class="participants-wrap">
									<label name="currentDealPerson"  style="clear:both\0; display:block\0; width:100px\0;">${flowInstanceStepWork.participantsDefineName!''}</label>
									<input id="participantsId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" type="hidden"/>
									<input id="stepId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" type="hidden" value="${flowInstanceStep.guid}"/>
									<label id="participantsName_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}"></label>
								</div>
							   <#if selectPersonStrategy=='true' >
								<a name="addParticipants" data-stepId="stepId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" data-participantsId="participantsId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" data-participantsName="participantsName_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" href="javascript:void(0);" class="btn btn-ext">选择</a>
							   </#if>
							<#else>
							
								<div class="participants-wrap">
								    <label name="currentDealPerson"  style="clear:both\0; display:block\0; width:100px\0;">${flowInstanceStepWork.participantsName!''}</label>
								    <input id="participantsId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" type="hidden" />
								    <input id="stepId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" type="hidden" value="${flowInstanceStep.guid}"/>
								    <label id="participantsName_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}"></label>
								 </div>
							  <#if selectPersonStrategy=="true" >
								 <a name="addParticipants" data-stepId="stepId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" data-participantsId="participantsId_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" data-participantsName="participantsName_${flowInstanceStep_index+1}_${flowInstanceStepWork_index+1}" href="javascript:void(0);" class="btn btn-ext">选择</a>
							   </#if>
							</#if>
				        </td>
				        <td style="text-align:left;${workColor}"></td>
				        <td style="text-align:left;${workColor}"></td>
				        <td style="text-align:left;${workColor}"></td>
			        </tr>
			    </#if>
			</#list>
		<#else>
    			<tr  style="text-align:center;${stepColor}">
        		<td style="text-align:center;${stepColor}">${flowInstanceStep_index + 1}</td>
		        <td style="text-align:left;${stepColor}">${flowInstanceStep.displayName}</td>
				<td></td>
		        <td data-participantsNameValidate="${isAuto}">
		        	          <div class="participants-wrap">
									<label name="currentDealPerson" style="clear:both\0; display:block\0; width:100px\0;"></label>
									
									<input id="participantsId_${flowInstanceStep_index+1}_" type="hidden"/>
									<input id="stepId_${flowInstanceStep_index+1}_" type="hidden" value="${flowInstanceStep.guid}"/>
									<label id="participantsName_${flowInstanceStep_index+1}_"></label>
								</div>
							   <#if selectPersonStrategy=='true' >
								    <a name="addParticipants" data-stepId="stepId_${flowInstanceStep_index+1}_" data-participantsId="participantsId_${flowInstanceStep_index+1}_" data-participantsName="participantsName_${flowInstanceStep_index+1}_" href="javascript:void(0);" class="btn btn-ext">选择</a>
							   </#if>
		        </td>
		        <td></td>
		        <td></td>
		        <td></td>
	        </tr>
        </#if>
    </#list>
</#if>