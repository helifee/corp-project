<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- Head -->
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible"content="IE=8;IE=10">
  	<meta name="renderer" content="webkit">
    <%--<link rel="shortcut icon" href="assets/img/favicon.png" type="image/x-icon">--%>
    <!--Basic Styles-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
	<link href="assets/css/font-awesome.min.css" rel="stylesheet" />
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	
    <!--Beyond styles-->
    <link id="beyond-link" href="assets/css/beyond.min.css" rel="stylesheet" />
	<link href="page/FlowInstanceApprove/FlowInstanceApprove.css" rel="stylesheet" />
   <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	%>
   <style>
   	#file_upload{
   		display:inline-block;
   	}
   	
   	#url_upload{
   		height:36px;
   		line-height:36px;
   		display:inline-block;
   		margin-right:10px;
   		cursor:pointer;
   	}

   </style>
</head>
<!-- /Head -->
<!-- Body -->
<body>
    <!-- Main Container -->
    <div class="main-container container-fluid">
        <!-- Page Container -->
        <div class="page-container">
            <!-- Page Sidebar -->
            <!--<div class="page-sidebar" id="sidebar">
            </div>-->
            <!-- /Page Sidebar -->
            <!-- Page Content -->
            <div class="page-content">
                <!-- Page Header -->
                <div class="page-header position-relative print-dispaly">
                    <!--Header Buttons-->
                    <div class="header-buttons">
                        <div class="btn-group">
                        	<s:if test="(#request.xbhf_result == false  && #request.isRunningFi == 1 )">
                        		<button type="button" data-action="recycleCoHost.do" data-alertMsg="您确定要收回协办吗？" data-isReload="true" class="btn btn-default" data-isRequestServer="true"><i class="fa fa-reply"></i> 收回协办</button>
                        	</s:if>
                        	<s:if test="(#request.isStartUser == true && #request.isRunningFi == 1 )">	
	                            <button type="button" class="btn btn-default" data-action="cbFlowInstanceStepWorkTask.do" data-hasten="true"><i class="fa fa-clock-o"></i> 催办</button>  
	                        </s:if>   
	                             <s:if test="(#request.isStartUser == true && #request.isRunningFi == 1 )">	
	                            <button type="button" class="btn btn-default" data-action="chFlowInstanceStepWorkTask.do"  data-alertMsg="您确定要撤回流程？" data-isRequestServer="true"><i class="fa fa-reply-all"></i>撤回流程</button>  
	                        </s:if>   
	                        
	                         <s:if test="(#request.isBackStart == true && #request.isRunningFi == 1 )">	
	                                  <button type="button" onclick="openEditWind();" class="btn btn-default"><i class="glyphicon glyphicon-file"></i>编辑单据</button> 
	                            
	                        </s:if>   
	                        
                        	<s:if test="(#request.isAdmin == true  && #request.isRunningFi == 1 )">
                        	    <button type="button" class="btn btn-default" data-action="conclusionFlowInstanceStepWorkTask.do" data-isRequestServer="true"><i class="glyphicon glyphicon-road"></i>一键审结</button>
                        	    <button type="button" class="btn btn-default" data-action="jumpFlowInstanceStepWorkTask.do" data-isRequestServer="true"><i class="glyphicon glyphicon-road"></i> 跳过当前环节</button>
                        	    <button type="button" class="btn btn-default" data-action="replaceFlowInstanceStepWorkTask.do" data-replaceCurrentApproval="true"><i class="fa fa-exchange"></i> 替换当前审批人</button>
                        	       
                            </s:if>
                            <s:if test="#request.isAdmin == true && (#request.isRunningFi == 1)">
                            	<button type="button" class="btn btn-default" data-action="overFlowInstanceStepWorkTask.do" data-alertMsg="您确定要作废流程？" data-isRequestServer="true"><i class="glyphicon glyphicon-remove"></i> 作废流程</button>
                            </s:if>
                               <s:if test="#request.isAdmin == true && (#request.isRunningFi == 1 || #request.isRunningFi == 2)">
                               <button type="button" class="btn btn-default" data-action="additionalFlowInstanceStepWorkTask.do" data-hasten="true"><i class="fa fa-clock-o"></i> 补遗</button>  
                               </s:if>
                            <s:if test="#request.isRunningFi == 2">
                            	<button type="button" class="btn btn-default" data-action="csFlowInstanceStepWorkTask.do" data-selectUser="true" data-isRequestServer="true"><i class="glyphicon glyphicon-transfer"></i> 传阅</button>
                            </s:if> 
                        
                             <s:if test="#request.EX_MATTERASK == 'EX_MATTERASK'">
                               <button type="button" onclick="openCopyWind();" class="btn btn-default"><i class="glyphicon glyphicon-file"></i>单据复制</button>
                            </s:if>
                     
                            <s:if test="#request.isRunningFi == 1 ">  
                              <button type="button" class="btn btn-default" data-action="forwardAddCurrentApprovalPerson.do" data-addCurrentApprovalPerson="true"><i class="fa fa-exchange"></i> 添加审批人</button>
                            </s:if> 
                            
                            
                            
                            
                            <button type="button" onclick="pageWindowPrint();" class="btn btn-default"><i class="glyphicon glyphicon-print"></i> 打印</button>
						</div>
                    </div>
                    <!--Header Buttons End-->
                </div>
                <!-- /Page Header -->
                <!-- Page Body -->
                <div id="pageBody" class="page-body">
                	<form class="form-horizontal" role="form" id="opForm">
                	<div class="row">
                		<div class="col-md-9 col-sm-9 col-xs-9">
                			<s:if test="#request.isStart == false">
                				<div class="row-title">${fiName}</div>
                			</s:if>
                			<s:else>
                				<input name="fiName" type="text" class="form-control" value=${fiName } />
                			</s:else>
                		</div>
                	</div>
                	<div class="row row-ex">
                        <div class="vertical-line" id="fiContent">
                            <div class="tabbable">
                                <ul class="nav nav-tabs" id="approveTab">
                                    <li class="active tab-red">
                                       
                                        <a data-toggle="tab" href="#bizInfo">业务信息</a>
                                    </li><%--
                                    <li class="tab-red">
                                        <a data-toggle="tab" href="#flowInfo">流程信息</a>
                                    </li>
                                    <li class="tab-red">
                                        <a data-toggle="tab" href="#flowLog">流转日志</a>
                                    </li>
                                    <li class="tab-red">
                                        <a data-toggle="tab" href="#readLog">阅读记录</a>
                                    </li>
                                --%></ul>
                                <div class="tab-content">

                                    <div id="bizInfo" class="tab-pane in active">
                                        <!-- 业务基本信息 -->
                                        <%--<div class="well with-header well-border">
                                            <div class="header bordered-bottom bordered-platinum">业务表单</div>
                                            <div id="bizBasicInfo">
                                            </div>
                                        </div>--%>
                                        <div id="bizBasicInfo">
                                        </div>
                                        <!-- 业务表单附件 
                                        <div id="bizAttachment" class="well with-header well-border">
                                            <div class="header bordered-bottom bordered-platinum">附件</div>
                                        </div>-->
                                        <!-- 审批历史 -->
                                        <div id="approvalHistory" style="display:none" class="well with-header well-border">
                                            <div class="header bordered-bottom bordered-platinum">审批记录</div>
                                            <table id="flowInstanceHistory" class="table table-bordered">
										    <thead>
										        <tr>
											        <th style="width:6%;text-align:center;">序号</th>
											        <th style="width:9%;text-align:center;;">节点名称</th>
											        <th style="width:30;text-align:center;%">岗位</th>
											        <th style="width:10;text-align:center;%">责任人</th>
											        <th style="width:6%;text-align:center;">操作</th>
											        <th style="width:29%;text-align:center;">处理意见</th>
											        <th style="width:10%;text-align:center;">处理时间</th>
										    	</tr>
										    </thead>
										    <tbody id="approvalHistoryHtml">
										    </tbody>
										    	<s:if test="(#request.isRunningFi == 7 )">
											    <tfoot>
											       <tr>
												        <th style="width:100%;text-align:center;" colspan="7">流程已经被作废</th>
												      
											    	</tr>
											    </tfoot>
											   </s:if>
											   
										    </table>
                                        </div>
                                    </div><%--

                                    <div id="flowInfo" class="tab-pane">
                                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.</p>
                                    </div>

                                    <div id="flowLog" class="tab-pane">
                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.</p>
                                    </div>

                                    <div id="readLog" class="tab-pane">
                                        <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin.</p>
                                    </div>
                                --%></div>
                            </div>
                        </div>
                        <div id="approvalOp" class="vertical-line print-dispaly">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="widget">
                                        <div class="widget-header bordered-bottom bordered-platinum">
                                            <span class="widget-caption">审批操作</span>
                                        </div>
                                        <div class="widget-body">
                                        		<s:if test="#request.isStart == false">
	                                                <div style="display:none" class="form-group">
	                                                    <label id="tranctionLabel" class="col-md-3 col-sm-3 col-xs-4 control-label no-padding-right">即将流向</label>
	                                                    <div class="col-md-9 col-sm-9 col-xs-8">
	                                                        <p id="tranctionUserIds" class="form-control-static" style="border:1px solid #ddd;padding:6px 12px"></p>
	                                                    </div>
	                                                </div>
                                                </s:if>
                                                <s:if test="#request.isStart == false && #request.xbhf_result == true">
	                                                <hr class="wide" style="display:none">
	                                                <div class="form-group">
	                                                    <label id="opLabel" class="col-md-3 col-sm-3 col-xs-4 control-label no-padding-right" style="margin-top:8px">操作</label>
	                                                    <div class="col-md-9 col-sm-9 col-xs-8">
	                                                        <div id="wellAdditional" class="well well-additional">
	                                                            <div class="row">
	                                                                <div class="col-md-12">
	                                                                	<input id="opCode" name="fiTask.opCode" type="hidden">
	                                                                    <dl id="operation" class="type">
	                                                                        <s:iterator value="lstRelationIns" var="opRelation">
																				<dd  data-code="${opRelation.opCode }" data-note="${opRelation.note}" data-noteType="${opRelation.noteType}" data-value="${opRelation.opName }">
	                                                                            	<a href="javascript:;"><b></b>${opRelation.opName }</a>
	                                                                            </dd>
																			</s:iterator>
	                                                                    </dl>
	                                                                </div>
	                                                            </div>
	                                                            <div class="row" style="display:none">
	                                                                <div class="col-md-12">
	                                                                    <div class="input-group input-group-additional">
	                                                                        <input type="hidden" class="form-control" id="dealUserIds" name="userIds">
	                                                                        <input type="text" class="form-control" disabled id="dealUserNames" name="dealUserNames">
                                                                            <span class="input-group-btn">
                                                                                <button id="userSelect" class="btn btn-default shiny" type="button">选择操作人</button>
                                                                            </span>
	                                                                    </div>
	                                                                </div>
	                                                            </div>
	                                                            <div class="row backApprove" style="display:none">
	                                                                <div class="col-md-12">
	                                                                    <div class="input-group input-group-additional">
	                                                                        <span class="input-group-addon">打回到</span>
	                                                                        <select id="backStepId" name="backStepId" class="select">
				                                                            	<s:iterator value="lstFlowInstanceStepTaskBackDto" var="flowInstanceStepTaskBack">
				                                                            		<s:if test="#flowInstanceStepTaskBack.isStart == 1">
				                                                            			<option value="${flowInstanceStepTaskBack.stepId}" data-taskId="${flowInstanceStepTaskBack.taskId}" data-type="${flowInstanceStepTaskBack.isStart}">${flowInstanceStepTaskBack.displayName}</option>
				                                                            		</s:if>
				                                                            		<s:if test="#flowInstanceStepTaskBack.isStart != 1">
				                                                            			<option value="${flowInstanceStepTaskBack.stepId}" data-taskId="${flowInstanceStepTaskBack.taskId}" data-type="${flowInstanceStepTaskBack.isStart}">${flowInstanceStepTaskBack.displayName}【${flowInstanceStepTaskBack.complete_user_name }】</option>
				                                                            		</s:if>
																				</s:iterator>
				                                                        	</select>
	                                                                    </div>
	                                                                </div>
	                                                            </div>
	                                                            <div class="row backApprove" style="display:none">
	                                                                <div class="col-md-12">
	                                                                    <label>
	                                                                           <input name="backTaskId" style="margin-bottom:5px" id="backTaskId" type="hidden" /> 
																	          <input name="isReApprove" style="margin-bottom:5px" id="isReApprove" type="checkbox" value="true"/> 重走流程
																	    </label>
	                                                                </div>
	                                                            </div>
	                                                        </div>
	                                                    </div>
	                                                </div>
                                                </s:if>
                                                <s:else>
                                                	<s:if test="#request.isReStart == false">
														<input id="opCode" name="fiTask.opCode" value="TJSP;发起" data-noteType="${opRelationIns.noteType}" type="hidden">
													</s:if>
													<s:else>
														<input id="opCode" name="fiTask.opCode" value="TJSP;重新发起" data-noteType="${opRelationIns.noteType}" type="hidden">
													</s:else>
												</s:else>
												<s:if test="#request.isStart == false">
													<hr class="wide">
													<div class="form-group" style="margin-top:15px;">
												</s:if>
												<s:else>
													<div class="form-group">
												</s:else>
                                                    <label style="padding-top:0;" class="col-md-3 col-sm-3 col-xs-4 control-label no-padding-right">常见意见<br><a id="customOpinion" href="javascript:;">自定义</a></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-8">
                                                    	<select id="commonOpinion" name="commonOpinion" class="select">
                                                            <option value="" >请选择</option>
                                                           	<s:iterator value="#request.lstCommonOpinion" var="commonOpinion">
																<option value="${commonOpinion.note}" >${commonOpinion.note}</option>
															</s:iterator>
                                                       	</select>
                                                    </div>
                                                </div>
                                                <hr class="wide">
                                                <s:if test="#request.isStart == false">
                                                	<div class="form-group" style="margin-bottom:5px">
                                                </s:if>
                                                <s:else>
                                                	<div class="form-group">
                                                </s:else>
                                                    <label style="margin-top:30px;" class="col-md-3 col-sm-3 col-xs-4 control-label no-padding-right">处理意见</label>
                                                    <div class="col-md-9 col-sm-9 col-xs-8">
                                                    	<s:if test="#request.opRelationIns != null">
	                                                    	<textarea class="form-control" rows="3" <s:if test="#request.opRelationIns.noteType==2">style="display:inline-block;width:93%"</s:if> name="fiTask.userNote" id="userNote" placeholder="请填写处理意见">${opRelationIns.note}</textarea>
	                                                    	<%--如果为意见为必填项 显示必填符号--%>
	                                                    	<s:if test="#request.opRelationIns.noteType==2">
	                                                    		<i style="color:#e74b37" class="fa fa-asterisk"></i>
	                                                    	</s:if>
                                                    	</s:if>
                                                    	<s:else>
                                                    		<textarea class="form-control" rows="3" name="fiTask.userNote" id="userNote" data-assignerUserName="${assignerUserName}" data-defaultPlaceholder="请填写处理意见" placeholder="请填写处理意见"></textarea>
                                                    		<i id="requiredUserNote" style="color:#e74b37;display:none;" class="fa fa-asterisk"></i>
                                                    	</s:else>
                                                    </div>
                                                </div>
                                                <input id="urlBizEdit" name="urlBizEdit" type="hidden" value="${urlBizEdit}"/>
                                                <input id="bizUrl" name="bizUrl" type="hidden" value="${bizUrl}"/>
                                                <input id="bizType" name="bizType" type="hidden" value="${bizType}"/>
                                               	<input id="bizId" name="bizId" type="hidden" value="${bizId}"/>
                                               	<input id="flowCode" name="flowCode" type="hidden" value="${flowCode}"/>
                                               	<input id="tokenId" name="tokenId" type="hidden" value="${tokenId}"/>
                                               	<input id="flId" name="flId" type="hidden" value="${flId}"/>
                                               	<input id="tId" name="tId" type="hidden" value="${tId}"/>
                                               	<input id="fiId" name="fiId" type="hidden" value="${fiId}"/>
                                               	<input id="isReStart" name="isReStart" type="hidden" value="${isReStart}"/>
                                                <s:if test="#request.isStart == true">
	                                                <hr class="wide">
	                                                <div class="form-group select-group">
	                                                    <label class="col-md-3 col-sm-3 col-xs-4 control-label no-padding-right">发起岗位</label>
	                                                    <div class="col-md-9 col-sm-9 col-xs-8">
	                                                        	<select id="startPostId" name="startPostId" class="select">
		                                                            <option value="" >请选择</option>
	                                                            	<s:iterator value="lstPost" var="post">
																		<option value="${post.id}" >${post.namefix}</option>
																	</s:iterator>
	                                                        	</select>
	                                                    </div>
	                                                </div>
                                                </s:if>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="uploadBizAttachment">
                                <div class="col-md-12">
                                    <div class="widget">
                                        <div class="widget-header bordered-bottom bordered-platinum">
                                            <span class="widget-caption">附件列表</span>
                                            <div class="widget-buttons">
                                            	<input type="file" id="file_upload" />
                                                <div id="url_upload">
                                                    <i class="glyphicon glyphicon-link glyphicon-lg"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget-body">
                                            <table class="table table-bordered table-condensed">
                                                <thead>
	                                                <tr>
	                                                    <th style="text-align:center;">文件名称</th>
	                                                    <th style="text-align:center;width:80px;">文件类型</th>
	                                                    <th style="text-align:center;width:50px;">操作</th>
	                                                </tr>
                                                </thead>
                                                <tbody id="flowInstanceFileQueue">
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 text-align-center btn-margin">
                                	<s:if test="#request.xbhf_result == true">
	                                	<s:if test="#request.isStart == true">
	                                    	<input id="completeWork" type="button" style="width: 50%" data-action="submitForStart.do" data-validate="startValidate" class="btn btn-danger" value="提交">
	                                    </s:if>
	                                    <s:else>
	                                    	<input id="completeWork" type="button" style="width: 50%" data-action="submitForApprove.do" data-validate="approveValidate" class="btn btn-danger" value="提交">
	                                    </s:else>
                                    </s:if>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <!-- /Page Body -->
            </div>
            <!-- /Page Content -->
        </div>
        <!-- /Page Container -->
        <!-- Main Container -->
		
    </div>

    <!--Basic Scripts-->
    <script src="js/jquery.js"></script>
    <script>
    $(window).resize(function(){
    	$('#fiContent').width($(window).width() - $('#approvalOp').width() - 17);
    	$('#pageBody').height($(window).height());
        $('.vertical-line').height($(window).height() -  90);
    });

    $(window).resize();
    $(function(){
    	$('#startPostId').val(null);
    	smFlowInstance.sessionId='<%=session.getId()%>';
    	var isStart = "${isStart}",isReStart = "${isReStart}";
    	if(isStart === 'true' || isReStart === 'true'){
    		$('#uploadBizAttachment').hide();
    	}else{
    		smFlowInstance.callBack.fire('<%=basePath%>');
    	}
        $('#operation').click(function(ev){
            var $target = $( ev.target ).closest("dd");
            // 获取操作编码
            var opCode = $target.data('code');
            // 获取操作名称
            var opValue = $target.data('value');
            // 清除其他操作编码的选择
            $target.addClass('selected').siblings().removeClass('selected');
            // 设置默认placeholder属性
            $('#userNote').attr('placeholder',$('#userNote').data('defaultplaceholder'));
            // 清除常用意见
 			$('#commonOpinion').val(null);
            // 设置默认意见
 			var defaultUserNoteVal = $target.data('note');
            $('#userNote').val(defaultUserNoteVal);
            
            // 判断处理意见是否为必填项
            var noteType = $target.data('notetype');
            if(noteType == 2){ //必填项
            	$('#userNote').css({width:'93%',display:'inline-block'}).next().show();
            }else{
            	$('#userNote').css('width','100%').next().hide();
            } 
            
            switch (opCode){
                case "XB":
                	smFlowInstance.maxUserCount = null;
                	$("input[id^='dealUserIds']").val("${assignerId}");
                	$("input[id^='dealUserNames']").val("${assignerName}");
                    $('.well-additional>.row:eq(1)').show().next().hide().next().hide();
                    $('#opLabel').css('marginTop',35).parent().css('marginBottom','15px');
                    $('#userNote,#commonOpinion').closest('.form-group').show().prev('.wide').show();
                    break;
                case "ZB":
                	$("input[id^='dealUser']").val("");
                	smFlowInstance.maxUserCount = 1;
                    $('.well-additional>.row:eq(1)').show().next().hide().next().hide();
                    $('#opLabel').css('marginTop',35).parent().css('marginBottom','15px');
                    $('#userNote,#commonOpinion').closest('.form-group').show().prev('.wide').show();
                    break;
                case "BH":
                    $('.well-additional>.row:eq(1)').hide().siblings().show();
                    $('#opLabel').css('marginTop',35).parent().css('marginBottom','15px');
                    var isStart = $('#backStepId').find('option:selected').data('type');
                    /**
                    if(isStart == 1){
                    	//$('#isReApprove').closest(".backApprove").hide();
                    	$("#isReApprove").attr("checked",false);
                    }
                    **/
                    
                    $('#userNote,#commonOpinion').closest('.form-group').show().prev('.wide').show();
                    break;
                case "WYY":
                	/**
                	$('.well-additional>.row').not(':first').hide();
                	$('#userNote,#commonOpinion').val('').closest('.form-group').hide().prev('.wide').hide();
                	$('#opLabel').css('marginTop',15).parent().css('marginBottom','3px');
                	**/
                	$('.well-additional>.row').not(':first').hide();
                	$('#opLabel').css('marginTop',15).parent().css('marginBottom','15px');
                	$('#userNote,#commonOpinion').closest('.form-group').show().prev('.wide').show();
                	break;
                default:
                	if(opCode === 'HF'){
                		var assignerUserName = $('#userNote').data('assignerusername');
                    	if(assignerUserName){
                    		$('#userNote').attr('placeholder','【'+opValue+'：'+assignerUserName+'】'+"意见：");
                    	}
                	}
                	$('.well-additional>.row').not(':first').hide();
                	$('#opLabel').css('marginTop',15).parent().css('marginBottom','15px');
                	$('#userNote,#commonOpinion').closest('.form-group').show().prev('.wide').show();
                	break;
            }
            $('#opCode').val(opCode+';'+opValue);
        });
        
        $("#customOpinion").click(function(){
        	smFlowInstance.openCustomOpinion();
        });
 
        
        function removeFileAttchment(){
           $("a[name='removeUploadFile']").each(function(){
	           var delFileName = $(this).data('name');
			   $.post("File!delete.do",{id:$(this).data('id')},function(data){
				var swfuploadify = $("#file_upload").data('uploadify');
				var queueFiles = swfuploadify.queueData.files;
				for (var n in queueFiles) {
					file = queueFiles[n];
					if(file.name == delFileName){
						delete queueFiles[n];
					}
				}
	  		  });
           })
        
        }
 
        
        $("#startPostId").on('change',function(){
           //移除里面的附件：
        	var $this = $(this);
        	$.post('FlowInstanceApprove!selectPost.do',
    				$('#opForm').serialize(),
    				function(data){
    					if(!data){
    						$('#approvalHistoryHtml').empty();
    						$('#tId,#fiId').val('');
    					}else{
    						var result = data.split('|&|');
    						if(result[0]){
    							$('#approvalHistory').css('display','block');
    						}
        					$('#approvalHistoryHtml').html(result[0]);
        					$('#tId').val(result[1]);
        					$('#fiId').val(result[2]);
    		      			var demo = new mergeRowsCell('flowInstanceHistory');
    		      		    demo.merge(0,0);
    		      		    demo.merge(0,1);
    		      		    demo.merge(0,2);
    		      		    $('#fiContent').animate({scrollTop:$(window).height()},500);
    		      		        $("#flowInstanceFileQueue").html("");
    					}
    					smFlowInstance.callBack.fire('<%=basePath%>');
    		        	if($this.val()){
    		        		$('#uploadBizAttachment').show();
    		        	}else{
    		        		$('#uploadBizAttachment').hide();
    		        	}
    		});
    	});
    	
        $("#commonOpinion").on('change',function(){
    		$('#userNote').val($(this).val());
    	});
        
    	$("#backStepId").on('change',function(){
    		var isStart = $(this).find('option:selected').data('type');
    		var backTaskId=$(this).find('option:selected').data('taskid');
    		if(isStart == 1){
    			$('#isReApprove').closest(".backApprove").hide();
    			$('#backTaskId').val(backTaskId);
    		}else{
    			$('#isReApprove').closest(".backApprove").show();
    			$('#backTaskId').val(backTaskId);
    		}
    	});

        $('#completeWork').click(function(){
        	
        	var action = $(this).data('action');
        	if(!action){
        		return;
        	}
        		
        	if(!smFlowInstance[$(this).data('validate')].call(this)){
        		return;
        	}
        	
        	var assignerUserName = $('#userNote').data('assignerusername');
        	var opCode = $('#operation dd.selected').data('code');
        	if(assignerUserName && opCode == 'HF'){
        		$('#userNote').val($('#userNote').attr('placeholder')+$('#userNote').val());
        	}
        	$.post('FlowInstanceApprove!'+ action,$('#opForm').serialize(),
        			function(data){
        				if(!!(data.success)){
        					if(!data.isStart){
        						try{
    								smFlowInstance.refreshParentWin(window.opener);
        						}catch(ex){
    							}
    						}else{
    							try{
    								if(window.opener && window.opener.spCallBack && data.isStart){
        							    window.opener.spCallBack();
    							    }
    							}catch(ex){
    							}
        					}
        					var refreshParentWinTimer = setTimeout(function(){
        						window.location.href = data.redirectUrl;
        						if(refreshParentWinTimer){
        							refreshParentWinTimer = null;
        						}
        					},0);
        				}else{
        					if(data.msg){
        						alert(data.msg);
        					}
        				}
      				},'json');
        });
        
        $('#userSelect').click(function(){
        	smFlowInstance.selectParticipantByDomOp(1,"dealUserIds","dealUserNames");
        });
        
        $(document).on('click',"a[name='addParticipants']",function(){
        	var participantsId = $(this).data('participantsid');
        	var participantsName = $(this).data('participantsname');
        	var stepId = $(this).data('stepid');
        	var result=smFlowInstance.selectParticipantByDomOp(null,participantsId,participantsName,true);
        	$.post('FlowInstanceApprove!addSelectWorkParticipant.do',{'participantsId':$('#'+participantsId).val(),'stepId':$('#'+stepId).val(),'tokenId':$('#tokenId').val()}, function(data){
				if(data && data.msg){
					if(result!='' && result){
				       alert(data.msg);
				    }
				}
			});
    	});
    });
    


    </script>
    <!-- 重新发起操作获审批操作时显示历史记录 -->
    <s:if test="#request.fiId != null || #request.isReStart == true">
    	<script>
    		$(function(){
    			(function($){
                	$('#approvalHistoryHtml').load('FlowInstanceApprove!history.do',{
                		'fiId':$('#fiId').val(),
                		'tokenId':$('#tokenId').val()
                	},function(){
                		$('#approvalHistory').css('display','block');
                		var demo = new mergeRowsCell('flowInstanceHistory');
                		demo.merge(0,2);
                		demo.merge(0,1);
                		demo.merge(0,0);
                	});
    	    	})(jQuery);
    	    	
    	    	
    			
    			$.post('FlowInstanceApprove!getTranstionUser.do',{'tId':$('#tId').val(),'fiId':$('#fiId').val()}, function(data){
    				if(data){
    				    var text=data.msg;
    				    if(!text){
    				    	$('#tranctionUserIds').closest('.form-group').hide().next('.wide').hide();
    				    	$('#wellAdditional').css({'marginTop':0});
    				    	return;
    				    }
    				    $('#opLabel').css({'marginTop':15});
    					$('#tranctionUserIds').html(text).closest('.form-group').show().next('.wide').show();
    					$('#tranctionLabel').css('paddingTop',$('#tranctionUserIds').height()/2);
    				}
    			});
    		});
    		
    		//复制单据
    function openCopyWind(){
			var id = $('#bizId').val();
			$.ajax({
				type:"POST",
				 contentType:"application/x-www-form-urlencoded; charset=UTF-8",
				 url : "/ex/expensexecute/matterask/matterask!copyMatterask.do?id="+id,
				 success:function(data){
					 if(data.success){
						 var url = '/ex/expensexecute/matterask/matterask!addOrUpdateCont.do?id='+data.id+"&type=update&";
						 window.open(url);
					 } else {
						 showmsg("提示信息","复制失败",5);
					 }
				 }
			});			
    	//var url = $("#urlBizCopy").val()+ $('#bizId').val();
    	//window.open(url);
    }
    		//
    function openEditWind(){
		var id = $('#bizId').val();
    	var url = $("#urlBizEdit").val()+"?id="+ $('#bizId').val()+"&flowCode="+ $('#flowCode').val();
    	openwindowdesk(url,"修改单据",null,null);
	//var url = $("#urlBizCopy").val()+ $('#bizId').val();
	//window.open(url);
   }
    		
	function openwindowdesk(url, name, iWidth, iHeight) {
		if (!iWidth){
			iWidth = 0;
		}
		if (!iHeight){
			iHeight = 0;
		}
		if(iHeight==0){
			iHeight = window.screen.availHeight - 100;
		}
		if(iWidth==0){
			iWidth = window.screen.availWidth - 100;
		}
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2 - 10; // 获得窗口的垂直位置;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 - 10; // 获得窗口的水平位置;
		
		iHeight=window.screen.availHeight;
		iWidth=window.screen.availWidth;
		window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no');
	}
	
    
    	</script>
    </s:if>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="js/respond.min.js"></script>
    <script src="js/jquery.loadmask.min.js"></script>
    <script src="js/mergeRowsCell.js"></script>
    <script src="page/FlowInstanceApprove/FlowInstanceApprove.js"></script>
    <script type="text/javascript" src="js/jquery.progressbar.min.js"></script>
  	<script type="text/javascript" src="js/jquery.uploadify.js"></script>
  	<script src="page/FlowInstanceApprove/print.js"></script>
    </body>
<!--  /Body -->
</html>
