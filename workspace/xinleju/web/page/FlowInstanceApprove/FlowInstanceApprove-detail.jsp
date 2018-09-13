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

    <!--Basic Styles-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link id="bootstrap-rtl-link" href="" rel="stylesheet" />
    <link href="assets/css/font-awesome.min.css" rel="stylesheet" />
    <link href="assets/css/weather-icons.min.css" rel="stylesheet" />
    <link href="css/mask.css" rel="stylesheet" type="text/css" />

    <!--Fonts-->

    <!--Beyond styles-->
    <link id="beyond-link" href="assets/css/beyond.min.css" rel="stylesheet" />
	<link href="page/FlowInstanceApprove/FlowInstanceApprove.css" rel="stylesheet" />
    <style>

        html,body,.page-content,.page-container,.main-container {
		    overflow: auto !important;
		}
		.page-header ,.page-body{
			border:1px solid #ddd;
		}
		body:before{
			background-color: #fff !important;
		}
		
		.main-container{
			width:80%;
			min-width:950px;
		}
		
		@media Print {
			*{
				font-size:10px !important;
			}
			.main-container{
				min-width:none !important;
			}
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
            <!-- Page Content -->
            <div class="page-content">
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
	                            <button type="button" class="btn btn-default" data-action="chFlowInstanceStepWorkTask.do"  data-alertMsg="您确定要撤回流程？" data-isRequestServer="true" data-isColse="true"><i class="fa fa-reply-all"></i>撤回流程</button>  
	                        </s:if>   
                        	<s:if test="(#request.isAdmin == true  && #request.isRunningFi == 1 )">
                        	    <button type="button" class="btn btn-default" data-action="conclusionFlowInstanceStepWorkTask.do" data-isRequestServer="true"><i class="glyphicon glyphicon-road"></i>一键审结</button>
                        	    <button type="button" class="btn btn-default" data-action="jumpFlowInstanceStepWorkTask.do" data-isReload="true" class="btn btn-default" data-isRequestServer="true"><i class="glyphicon glyphicon-road"></i> 跳过当前环节</button>
                        	    <button type="button" class="btn btn-default" data-action="replaceFlowInstanceStepWorkTask.do" data-replaceCurrentApproval="true"><i class="fa fa-exchange"></i> 替换当前审批人</button>
                        	
                            </s:if>
                            <s:if test="#request.isAdmin == true">
                            	<button type="button" class="btn btn-default" data-action="overFlowInstanceStepWorkTask.do" data-alertMsg="您确定要作废流程？" data-isRequestServer="true"><i class="glyphicon glyphicon-remove"></i> 作废流程</button>
                            </s:if>
                             <s:if test="#request.isAdmin == true && (#request.isRunningFi == 1 || #request.isRunningFi == 2)">
                               <button type="button" class="btn btn-default" data-action="additionalFlowInstanceStepWorkTask.do" data-isRequestServer="true"><i class="fa fa-clock-o"></i> 补遗</button>  
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
                <!-- Page Body -->
                <div class="page-body">
                	<div class="row">
                		<div class="col-lg-12 col-sm-12 col-xs-12 row-title">
                			${fiName }
                		</div>
                	</div>
                    <div class="row" style="margin-top:3px;">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                            <div class="tabbable">
                                <ul class="nav nav-tabs" id="approveTab">
                                    <li class="active tab-red">
                                        <a data-toggle="tab" href="#bizInfo">业务信息</a>
                                        <input id="fiId" name="fiId" type="hidden" value="${fiId }">
                                    </li>

                                    <%--<li class="tab-red">
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
                                            <input id="bizUrl" name="bizUrl" type="hidden" value="${bizUrl}"/>
                                            	<input id="flowCode" name="flowCode" type="hidden" value="${flowCode}"/>
                                            <input id="bizId" name="bizId" type="hidden" value="${bizId}"/>
                                            <input type="hidden" id="dealUserIds" name="userIds">
                                        <!-- 业务表单附件 -->
                                        <%--<div id="bizAttachment" class="well with-header well-border">
                                            <div class="header bordered-bottom bordered-platinum">附件</div>
                                            
                                        </div>
                                        --%><!-- 审批历史 -->
                                        <div id="approvalHistory" class="well with-header well-border">
                                            <div class="header bordered-bottom bordered-platinum">审批记录</div>
                                            <table id="flowInstanceHistory" class="table table-bordered">
										    <thead>
										        <tr>
											        <th style="width:6%;text-align:center;">序号</th>
											        <th style="width:9%;text-align:center;">节点名称</th>
											        <th style="width:30%;text-align:center;">岗位</th>
											        <th style="width:10%;text-align:center;">责任人</th>
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
                                    </div>
									<%--<div id="flowInfo" class="tab-pane">
                                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.</p>
                                    </div>

                                    <div id="flowLog" class="tab-pane">
                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.</p>
                                    </div>

                                    <div id="readLog" class="tab-pane">
                                        <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin.</p>
                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>
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
    <script src="assets/js/bootstrap.min.js"></script>
    <!--Beyond Scripts-->
    <%--<script src="assets/js/beyond.min.js"></script>
    --%><script src="js/respond.min.js"></script>
    <%--<script src="assets/js/custominput.js"></script>
    --%><script src="js/mergeRowsCell.js"></script>
    <script src="js/jquery.loadmask.min.js"></script>
    <script src="page/FlowInstanceApprove/FlowInstanceApprove.js"></script>
        <script src="page/FlowInstanceApprove/print.js"></script>
    <!--Page Related Scripts-->

    <script>
    
    function openCopyWind(){
	    	//ex/expensexecute/matterask/matterask!addOrUpdateCont.do?type=update&id=
	    	//var url = $("#urlBizCopy").val()+ $('#bizId').val();
			
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
			
	    	//window.open(url);
	    }
       
        $(function(){
            loadHistory();
            function loadHistory(){
            	$('#approvalHistoryHtml').load('FlowInstanceApprove!history.do',{
            		'fiId':$('#fiId').val()
            	},function(){
            		var demo = new mergeRowsCell('flowInstanceHistory');
        		    demo.merge(0,0);
        		    demo.merge(0,1);
        		    demo.merge(0,2);
            	});
            }
        });
    </script>
</body>
<!--  /Body -->
</html>
