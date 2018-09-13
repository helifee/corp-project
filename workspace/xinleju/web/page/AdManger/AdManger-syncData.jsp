<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  	<head>
  		<meta http-equiv="X-UA-Compatible" content="IE=edge">
  		<meta name="renderer" content="webkit">
  		<style>
  			html,body:before,.page-content,.page-container{
  				background-color:#fff !important;
  			}
  			.page-body{
  				background-color:#fff !important;
  				padding:18px 20px 0 !important;
  			}
  			html{
  				overflow-y:hidden !important;
  				position:static !important;
  			}
  			.widget{
  				border:1px solid #eee;
  			}
  			
  			.widget-body{
  				background-color:#fff !important;
  			}
  			
  			.form-control{
  				background-color:#fff !important;
  			}
  		</style>
    	<link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css">
    	<link rel="stylesheet" href="css/beyond.min.css">
    	<script type="text/javascript" src="js/jquery.js"></script>
    	<script type="text/javascript">
    	    function changeSynAd(obj){
    	        var id=$(obj).val();
    	        var text=$(obj).text();
	    	    $.ajax({
					type:"POST",
					 contentType:"application/x-www-form-urlencoded; charset=UTF-8",
					 url : "/AdManger!getAdSettingById.do?id="+id,
					 success:function(data){
						 if(data.success){
						      var ad = eval('(' + data.result + ')');
						      $("#orgPath").val(ad.orgPath);
						      $("#extendName").val(ad.extendName);
                              $("#domainName").val(ad.domainName);
                              $("#catalogName").val(ad.catalogName);
                              $("#scurityAuthentiction").val(ad.scurityAuthentiction);
                              $("#scurityPrincipal").val(ad.scurityPrincipal);
                              $("#scurityCredentials").val(ad.scurityCredentials);
                              $("#providerUrl").val(ad.providerUrl);
               
                              
						 } else {
							 showmsg("提示信息","切换失败",5);
						 }
					 }
				});			
    	    
    	    
    	    }
    	</script>
	</head>
	

	
	<body>
		<div class="page-container">
		<div id="sidebar" class="page-sidebar hide">
		</div>
		<div class="page-content">
                <!-- Page Body -->
                <div class="page-body">
                    <div class="row">
                        <div class="col-lg-12">
	                           <div class="widget">
                                    <div class="widget-header bordered-bottom bordered-lightred">
                                        <span class="widget-caption">AD域基本信息</span>
                                    </div>
                                    <div class="widget-body">
                                        <div id="horizontal-form">
                                            <form id="form" role="form" class="form-horizontal">
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label no-padding-right" for="catalogName">组织机构路径</label>
                                                    <div class="col-sm-10">
                                                        <input type="hidden" id="extendName"  name="adSetting.extendName"   value="${adRoot.extendName}"> 
                                                         <input type="hidden" id="orgPath"  name="adSetting.orgPath"   value="${adRoot.orgPath}"> 
                                                        <input type="hidden" id="initialContextFactory"  name="adSetting.initialContextFactory"   value="${adRoot.initialContextFactory}">
                                                        <!--  
                                                        <input type="text" id="catalogName" required name="adSetting.orgPath" class="form-control"  value="中国住宅物业/人员架构/香港置地">
                                                        -->
                                                        <select id="orgPathSelect" required  class="form-control" onchange="changeSynAd(this)">
                                                               <s:iterator var="adSetting" value="#request.adSettings" status="statu">  
                                                                  <option id="${adSetting.id }" value="${adSetting.id }"  >${adSetting.orgPath }</option>
                                                               </s:iterator>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label no-padding-right" for="domainName">域名</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="domainName" required name="adSetting.domainName" class="form-control" value="${adRoot.domainName}">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label no-padding-right" for="catalogName">目录名</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="catalogName" required name="adSetting.catalogName" class="form-control"  value="${adRoot.catalogName}">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                	<label class="col-sm-2 control-label no-padding-right" for="scurityAuthentiction">域认证</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="scurityAuthentiction" value="${adRoot.scurityAuthentiction}" name="adSetting.scurityAuthentiction" class="form-control" >
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                	<label class="col-sm-2 control-label no-padding-right" for="scurityPrincipal">域账号</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="scurityPrincipal" value="${adRoot.scurityPrincipal}" name="adSetting.scurityPrincipal" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                	<label class="col-sm-2 control-label no-padding-right" for="scurityCredentials">域密码</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="scurityCredentials"  value="${adRoot.scurityCredentials}" name="adSetting.scurityCredentials" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                	<label class="col-sm-2 control-label no-padding-right" for="providerUrl">域路径</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" id="providerUrl" value="${adRoot.providerUrl}" name="adSetting.providerUrl" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-sm-offset-2 col-sm-10">
                                                        <a id="syncZbRoot" class="btn btn-default" href="javascript:void(0);" data-action="AdManger!syncZbRoot.do">同步总部</a>
                                                        <a id="syncCompany" class="btn btn-default" href="javascript:void(0);" data-action="AdManger!syncCompany.do">同步公司</a>
                                                        <a id="syncDept" class="btn btn-default" href="javascript:void(0);" data-action="AdManger!syncDept.do">同步部门</a>
                                                        <a id="syncUser" class="btn btn-default" href="javascript:void(0);" data-action="AdManger!syncUser.do">同步用户</a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                   </div>
                <!-- /Page Body -->
            </div>
        </div>
        <script type="text/javascript" src="js/respond.min.js"></script>
		<script>
			$(function(){
				
				$("a").click(function(){
					var action = $(this).data('action');
					var curObjName = $(this).html();
					
					if(action){
						$.ajax({
						    type: "POST",
						    dataType: "text",
						    url:action,
						    data:$('#form').serialize()
						}).done(function(msg){
							alert(msg);
						}).fail(function(jqXHR, textStatus, errorThrown){
							alert(curObjName + "数据失败！");
							if(console && console.log){
								console.log(jqXHR, textStatus, errorThrown);
							}
						});
					}else{
						if(console && console.log){
							console.log("请求路径为空！");
						}
					}
				});
				
			});
		</script>
	</body>
</html>
