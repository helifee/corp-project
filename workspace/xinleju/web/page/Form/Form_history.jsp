<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<meta name="viewport" content="width=device-width" />
<script type="text/javascript" src="page/Form/Form_history.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	var mateType = Browser.mateType();
	var isMaskClick = false;
	var onLoad_d1 = false;
//	var onLoad_frameInfo = false;
//	var onLoad_spFileView = false;
//	var onLoad_spRelatioinFiView = false;
	var onLoad_frameInfo = true;
	var onLoad_spFileView = true;
	var onLoad_spRelatioinFiView = true;
	function dealMask(maskId, onLoadIframeId) {
		if('mask_1' == maskId){
			if("d1" == onLoadIframeId){
				onLoad_d1 = true;
			}else if("frameInfo" == onLoadIframeId){
				onLoad_frameInfo = true;
			}else if("spFileView" == onLoadIframeId){
				onLoad_spFileView = true;
			}else if("spRelatioinFiView" == onLoadIframeId){
				onLoad_spRelatioinFiView = true;
			}
		}
		$('body').mask("数据加载中...");
	}
	function dealUnmask(maskId, onLoadIframeId) {
		if (isNotEmpty(onLoadIframeId)){
			if("d1" == onLoadIframeId){
				onLoad_d1 = true;
			}else if("frameInfo" == onLoadIframeId){
				onLoad_frameInfo = true;
			}else if("spFileView" == onLoadIframeId){
				onLoad_spFileView = true;
			}else if("spRelatioinFiView" == onLoadIframeId){
				onLoad_spRelatioinFiView = true;
			}
			if (onLoad_d1 && onLoad_frameInfo && onLoad_spFileView && onLoad_spRelatioinFiView){
				try {
					if(Browser.isIE6() || Browser.isIE7()){
						$('body').unmask();
					}else{
						$('body',window.document).unmask();
					}
				}catch(e){};
			}
		} else {
			try {
				if(Browser.isIE6() || Browser.isIE7()){
					$('body').unmask();
				}else{
					$('body',window.document).unmask();
				}
			}catch(e){};
		}
	}
	function goUrl(maskId,iframeId,url) {
		dealMask(maskId, iframeId);
		$('#' + iframeId).attr('src',url);
	}
	
	function maskClick(type) {
		if ( type == 1 ) {
			isMaskClick = true;
			goUrl("mask_1","d1","Form!redirectView.do?fiId=${fiId}&mateType=" + mateType +"&t="+ new Date().getTime());
			/* goUrl("mask_1","frameInfo","Form!historyInfo.do?fiId=${fiId}&t="+new Date().getTime()); */
			goUrl("mask_1","spFileView","Form!fiFileView.do?fiId=${fiId}"+"&t="+new Date().getTime());
			
			goUrl("mask_1","spRelatioinFiView","Form!relationFiView.do?fiId=${fiId}"+"&t="+new Date().getTime());
		} else if ( type == 2 ) {
			goUrl("mask_2","d2","Form!fiInfo.do?fiId=${fiId}&t="+new Date().getTime());
		} else if ( type == 3 ) {
			goUrl("mask_3","d3","Form!abList.do?fiId=${fiId}&t="+new Date().getTime());
		} else if ( type == 4 ) {
			goUrl("mask_4","d4","Form!readLogList.do?fiId=${fiId}&t="+new Date().getTime());
		}
	}
</script>
<style>
	.divh5{
		top: 45px;
	}
	.table02{
		margin-top:45px;
	}
	.spttt{
		font-size:16px !important;
	}
</style>
<table id="tabTitle" width="99%" border="0" cellspacing="0" cellpadding="0" class="divh5">
	<tr>
		<td>
			<div class="divh5_title">
				<ul id="tabnav_new" class="convention_tab_new">
					<li class="current_tabsr" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(1);">业务信息</a></li>
					<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(2);">流程信息</a></li>
					<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(3);">流转日志</a></li>
					<li class="" style="line-height: 30;font-family: 'Microsoft Yahei',微软雅黑,宋体,Helvetica,Tahoma,Arial;font-size:14px;"><a href="javascript:void(0)" onclick="javascript:maskClick(4);">阅读记录</a></li>
				</ul>
			</div>
		</td>
	</tr>
</table>
<table width="99%" border="0" cellpadding="0" cellspacing="1" class="table02" style="margin-bottom: 10px;border:1px solid #ccc;">
	<tr>
		<td>
			<div id="cardarea_new">
				<div class="item" id="mask_1">
					<!-- 审批信息 -->
					<!-- modify by liuhm 去掉高度限制，防止单据内容显示不全 -->
<!-- 					<iframe id="d1" allowTransparency="true" style="height:500px" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="try{iframeChangeSize('d1',10);dealUnmask('mask_1','spFileView');}catch(e){};"></iframe> -->
					<iframe id="d1" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src=""></iframe>
					<script type="text/javascript">
						goUrl('mask_1','d1','Form!redirectView.do?fiId=${fiId}&mateType=' + mateType + '&t=' + (new Date()).getTime());
					</script>
					<!-- 审批附件-->
					
	 				<s:if test="#request.spUploadsMap !=null && #request.spUploadsMap.size() > 0">
						<iframe id="spFileView" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!fiFileView.do?fiId=${fiId}&t=1" onload="iframeChangeSize('spFileView');dealUnmask('mask_1','spFileView');"></iframe>
					</s:if>
					<!-- 相关审批-->
					<s:if test="#request.relationFiList !=null && #request.relationFiList.size() > 0">
						<iframe id="spRelatioinFiView" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="Form!relationFiView.do?fiId=${fiId}&t=1" onload="iframeChangeSize('spRelatioinFiView');dealUnmask('mask_1','spRelatioinFiView');"></iframe>
					</s:if>
					<!-- 审批记录 -->
					<!-- <iframe id="frameInfo" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="iframeChangeSize('frameInfo',10);dealUnmask('mask_1','frameInfo');"></iframe> -->
					<div id="historyInfo_div_1">
					  <script type="text/javascript">
						  var postId=this.value;
						  var fiId=$("#curWiFiId").val();
						  var userId=$("#curWiParticipantId").val();
						  if(Browser.isIE6() || Browser.isIE7()){
								$('body').mask("正在操作，请稍侯！");
							}else{
								$('body',window.document).mask("正在操作，请稍侯！");
							}
							$.ajax({
								url : 'Form!rebuildFi.do',
								data : {postId : postId,fiId : fiId, userId : userId},
								dataType : "json",
								success :function(data){
									his=10;
									if (isNotEmpty(data.nextWpParticipantsName) && $("#participantsDisplayNameSpan")){
										$("#participantsDisplayNameSpan").html(data.nextWpParticipantsName);
									}
									$("#historyInfo_div_1").css('display','none');
									$("#historyInfo_div_2").css('display','block');
									$('#historyInfo_div_2_frameInfo').attr('src', $('#historyInfo_url').val() + (new Date().getTime()));


									var hisFrame = $('#historyInfo_div_2_frameInfo')[0];
									if (hisFrame.attachEvent){
										hisFrame.attachEvent("onload", function(){
											iframeChangeSize('historyInfo_div_2_frameInfo',10);
											if(Browser.isIE6() || Browser.isIE7()){
												$('body').unmask();
											}else{
												$('body',window.document).unmask();
											}
										});
									} else {
										hisFrame.onload = function(){
											iframeChangeSize('historyInfo_div_2_frameInfo',10);
											if(Browser.isIE6() || Browser.isIE7()){
												$('body').unmask();
											}else{
												$('body',window.document).unmask();
											}
										};
									}
									
//									if(Browser.isIE6() || Browser.isIE7()){
//										$('html').unmask();
//									}else{
//										$('html',window.document).unmask();
//									}
								},
								error : function(){
									if(Browser.isIE6() || Browser.isIE7()){
										$('body').unmask();
									}else{
										$('body',window.document).unmask();
									}
								}
							});
					  
					  </script>
					</div>
					<div id="historyInfo_div_2" style="display: none;"><iframe id="historyInfo_div_2_frameInfo" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="iframeChangeSize('historyInfo_div_2_frameInfo',10);dealUnmask('mask_1','historyInfo_div_2_frameInfo');"></iframe></div>
				</div>
				<div class="item display_none" id="mask_2">
					<iframe id="d2" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="iframeChangeSize('d2',10);dealUnmask('mask_2');"></iframe>
				</div>
				<div class="item display_none" id="mask_3">
					<iframe id="d3" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="iframeChangeSize('d3',10);dealUnmask('mask_3');"></iframe>
				</div>
				<div class="item display_none" id="mask_4">
					<iframe id="d4" allowTransparency="true" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="" onload="iframeChangeSize('d4',20);dealUnmask('mask_4');"></iframe>
				</div>
			</div>
		</td>
	</tr>
</table>
<input type="hidden" id="kp_OtherRegional" value="tabnav_new,li,cardarea_new,item,current_tabsr" title="这个必不可少" />
<script type="text/javascript" src="js/tabjs.js"></script>
<script type="text/javascript">
$("#d1").load(function(){
	try {
		iframeChangeSize('d1',10);
		if(isMaskClick){
			dealUnmask('mask_1','spFileView');
		}
	}catch(e){}
	var $body = $("#spFileView").contents().find("body");
	if($body.attr('isNull')){
		$("#spFileView").height($body.height());
	}
});
</script>