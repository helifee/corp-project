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
    <link href="css/xy_data.css" rel="stylesheet" type="text/css" />

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
    <script type="text/javascript">
            function saveAddFlowNodes(){
               var selectPreNode=$("input[type='radio'][name='selectPreNode']:checked");
               var addRadioNode=$("input[type='radio'][name='addRadio']:checked");
              //  alert(selectPreNode);
               if(selectPreNode.length==0){
                  alert("请选需要添加的节点");
                  return ;
               }
               var workId= selectPreNode.data("workid");
               var approverUserId=$("#approverUserId").val();
      
               var nodeType=addRadioNode.val();
               if(!approverUserId){
                  alert("请选需要添加的人员");
                  return ;
               }
               $.post('FlowInstanceManager!addFlowApprovalPersonSave.do',
    			{"workId":workId,"approverUserId":approverUserId,"nodeType":nodeType,"fiId":$("#fiId").val()},
    			function(data){
    				 alert(data.msg);
    				    loadHistory();
    				
    		   });
            
            }
            
            function colseFlowNodes(){
              window.close();
            }
    
    </script>

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
            	 <div class="page-header position-relative print-dispaly" style="padding-left: 0px;">
                    <!--Header Buttons-->
                    <div class="header-buttons">
                        <div class="btn-group">
                             <button type="button" onclick="saveAddFlowNodes();" class="btn btn-default"><i class="glyphicon glyphicon-print"></i> 确定</button>
                              <button type="button" onclick="colseFlowNodes();" class="btn btn-default"><i class="glyphicon glyphicon-print"></i> 关闭</button>
						</div>
                    </div>
                    <!--Header Buttons End-->
                </div>
                <!-- Page Body -->
                <div class="page-body">
	                <div class="row">
	            		<div class="col-lg-12 col-sm-12 col-xs-12 row-title">
	            			添加审批人
	            		</div>
	            	</div>   
					<div class="row" style="margin-top: 10px;margin-bottom: 10px;">
						<div class="col-xs-12">
							<span style="margin-right: 10px;">选择审批人</span>
							<input class="opt" id="approverUserName" value="" onclick="chooseApprovalPersonWindow('approverUserId','approverUserName');" type="text" readonly="true" style="width: 554px; background-color: White"/>
							<input type="hidden" value="" id="approverUserId"/>
							<input name="addRadio" type="radio" value="2" checked="checked" style="position: absolute; right: 190px !important">
							<span style="position: absolute;right: 120px !important">节点前添加</span>	
							<input name="addRadio" type="radio" value="1" style="position: absolute; right: 90px !important">
							<span style="position: absolute;right: 20px !important">节点内添加</span>	
						</div>
					</div>  	            	             
                    <div class="row" style="margin-top:3px;">
                        <div class="col-lg-12 col-sm-12 col-xs-12">
                        <input id="fiId" name="fiId" type="hidden" value="${fiId }">
                           	<input id="tokenId" name="tokenId" type="hidden" value="${tokenId}"/>
                            <div class="tabbable">
                                <div class="tab-content">
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
											        <th style="width:20%;text-align:center;">处理意见</th>
											        <th style="width:10%;text-align:center;">处理时间</th>
											        <th style="width:19%;text-align:center;">前置添加节点</th>
										    	</tr>
										    </thead>
										    <tbody id="approvalHistoryHtml">
										    </tbody>
										    </table>
                                        </div>
                                    </div>
									
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
    <script type="text/javascript" src="js/App.js"></script>
    <!--Page Related Scripts-->
    <script type="text/javascript">
    
   


     $(function(){
         loadHistory();
         
     });
      function loadHistory(){
         	$('#approvalHistoryHtml').load('FlowInstanceApprove!historyUpdate.do',{
         		'fiId':$('#fiId').val(),
         		'tokenId':$('#tokenId').val()
         	},function(){
         		var demo = new mergeRowsCell('flowInstanceHistory');
     		    demo.merge(0,0);
     		    demo.merge(0,1);
     		    demo.merge(0,2);
         	});
         }
        
	//选择审批人
	function chooseApprovalPersonWindow(userIdDomId, userNameDomId){
    	var selectedUserIds = $("#"+userIdDomId).val();
    	var url = "Orgn!index.do";
    	var dto = {
    		"maxCount":smFlowInstance.maxUserCount,
    		"needBackUserInfo" : 1,
    		"selectedUserQueryMethod":"findByRoleId",
    		"selectedUserIds" : selectedUserIds
    	}
    	var sFeatures = {
    		dialogWidth : 1000,
    		dialogHeight : 600
    	};
    	
    	url += "?paramJsonStr=" + encodeURI(JSON.stringify(dto));
    	var rv = smFlowInstance.showModalDialogOverride(url, window, sFeatures);
    	if(rv){
    		var result = $.parseJSON(decodeURI(rv));
    		getUserInfo(userIdDomId, userNameDomId,result);
    	}
    	
    	return result;
    }	
    
    function getUserInfo(userIdDomId, userNameDomId,userInfo) {
    	var selectIds = "";
    	var selectNames = "";
    	if(userInfo && userInfo.length>0){
    		for(var i=0;i<userInfo.length;i++){
    			selectIds += userInfo[i].userid + ((i == userInfo.length-1) ? "" : ",");
    			selectNames += userInfo[i].username + ((i == userInfo.length-1) ? "" : ";");
    		}
    	}
    	if (selectIds){
    		$("#"+userIdDomId).val(selectIds);
 			$("#"+userNameDomId).val(selectNames);
    	}else{
    		$("#"+userIdDomId).val(selectIds);
   			$("#"+userNameDomId).val(selectNames);
    	}
    }    	       
</script>
</body>
<!--  /Body -->
</html>
