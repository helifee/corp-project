<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<meta http-equiv="X-UA-Compatible" content="IE=8;IE=10"/>
<title>审批信息</title>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/application.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<meta name="viewport" content="width=device-width" />
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="page/Form/Form-dealIndex.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<link href="css/mask.css" rel="stylesheet" type="text/css" />
<style>

.sptj{
	color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
}

.x-panel-body{
border-width:0px;
}

</style>
<script type="text/javascript">
Ext.onReady(function(){  
	  var flow_dealIndex=$("#flow_dealIndex").val();
	  var isDb_dealIndex=$("#isDb_dealIndex").val();
	  if(flow_dealIndex==isDb_dealIndex){
			  var viwreport=new Ext.Viewport({       
					layout:"border",
			        margins: "0 0 0 0", 
					collapsible : true,
					items:[{  
						region:"east",  //设置位置  
						width:330,    
						autoScroll: true ,
						contentEl:"sp_wrapper_right"  
				   },{ 
						region:"center",  //设置位置      
						autoScroll: true,  
						contentEl:"sp_wrapper_left"  
				   }] 
			});
	}else{
		var viwreport=new Ext.Viewport({       
			layout:"border",
	        margins: "0 0 0 0", 
			collapsible : true,
			items:[{ 
				region:"center",  //设置位置      
				autoScroll: true,  
				contentEl:"sp_wrapper_left"  
		   }] 
	   });
	}
});
   

</script>
<script type="text/javascript">
	$(function() {
		$('html').mask("正在操作，请稍侯！");
	});
	var his = 10;
	
	function changeHis(e) {
		his = e;
	}
	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			$('html').unmask();
		}
	}
</script>


<script language="javascript">

var PrintArea = {
        print : function( PAWindow ) {
            var paWindow = PAWindow.win;
            $(PAWindow.doc).ready(function(){
                paWindow.focus();
                paWindow.print();
                $("#iframe-print").remove();
            });
        },
        write : function ( PADocument, printContent ) {
            PADocument.open();
            //console.log("<html>" + PrintArea.getHead() + printContent + "</html>");
            PADocument.write("<html>" + PrintArea.getHead() + printContent + "</html>" );
            PADocument.close();
        },
        getHead : function() {
            var links = "";

            $(document).find("link")
                .filter(function(){
                        var relAttr = $(this).attr("rel");
                        return ($.type(relAttr) === 'undefined') == false && relAttr.toLowerCase() == 'stylesheet';
                    })
                .each(function(){
                        links += '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';
                    });
            
            return "<head>" + links + "</head>";
        },
        getPrintWindow : function () {
        	 var f = new PrintArea.Iframe();
             return { win : f.contentWindow || f, doc : f.doc };
        },
        Iframe : function () {
            var frameId = "iframe-print";
            var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;right:0px;top:0px;';
            var iframe;

            try
            {
                iframe = document.createElement('iframe');
                document.body.appendChild(iframe);
                $(iframe).attr({ style: iframeStyle, id: frameId, src: "#" + new Date().getTime() });
                iframe.doc = null;
                iframe.doc = iframe.contentDocument ? iframe.contentDocument : ( iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
            }
            catch( e ) { throw e + ". iframes may not be supported in this browser."; }

            if ( iframe.doc == null ) throw "Cannot find document.";

            return iframe;
        }
    };

function printArea(printContent){

    var PrintAreaWindow = PrintArea.getPrintWindow();

    PrintArea.write( PrintAreaWindow.doc, printContent );
    setTimeout( function () {
    	PrintArea.print( PrintAreaWindow );
    }, 1000 );
}

function cust_print(){
    var tab1Content = $('#tabTitle').prop('outerHTML');
	var contentWrapperStart = "<table width=\"99%\" border=\"0\" cellpadding=\"0\" class=\"table02\"><tr><td><div id=\"cardarea_new\"><div class=\"item\">";

	var $ParentIframe = $("#d1").contents(),
	$TempObj=$ParentIframe.find('body').clone();
// 	if($TempObj && $TempObj.find('iframe')){
// 		var $SubIframes = $TempObj.find('iframe'),subIFrameHtml;
// 		$SubIframes.each(function(i,elem){
// 			if($(this).css('display') !== 'none'){
// 				subIFrameHtml = $ParentIframe.find('iframe').eq(i).contents().find('body').html();
// 				$(this).before(subIFrameHtml);
// 				$(this).remove();
// 			}
// 		});
// 	}

	var approvalInfo=$TempObj.prop('outerHTML') || "";

	var approvalAttachment = $("#spFileView").contents().find("body").html();
	approvalAttachment = approvalAttachment || "";
	var approvalRelationAttachment = $("#spRelatioinFiView").contents().find("body").html();
	approvalRelationAttachment = approvalRelationAttachment || "";
	var approvalHistoryInfo = $("#historyInfo_div_2_frameInfo").contents().find("body").html();
	approvalHistoryInfo = approvalHistoryInfo || "";
	var contentWrapperEnd = "</div></td></tr></table>";

	var contentWrapper = contentWrapperStart + approvalInfo + approvalAttachment + approvalRelationAttachment + approvalHistoryInfo + contentWrapperEnd;

	var printContent = tab1Content + contentWrapper;
	printArea(printContent);
}
</script>  


</head>
<body onload="">
	<form id="frm" action="Form!dealIndex.do" method="post">
		<input type="hidden" name="spWiId" value="${spWiId}" /> 
		<input type="hidden" name="fiId" value="${fiId}" />
	</form>
		
	<input type="hidden" id="isDb_dealIndex" value="${isDb}"/>
	<input type="hidden" id="flow_dealIndex" value="<%=com.xinleju.erp.flow.utils.FlowConstant.INT_TRUE %>" />
	<input type="hidden" name="app" value="${app}" id="app" />
	<input type="hidden" name="curWi" value="${curWi}" id="curWi" />
	<input type="hidden" name="curWi" value="${curWi.fiId}" id="curWiFiId" />
	<input type="hidden" name="curWi" value="${curWi.participant}" id="curWiParticipantId" />
	<input type="hidden" value="Form!historyInfo.do?fiId=${fiId}&t=123" id="historyInfo_url" />
	<div class="wdtable_title_sp Noprn" style="width:100%;height: 36px" >
		<div class="wdtable_title_sp_t"></div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<s:if test="#request.isAdmin">
		    
				<input type="button" class="dfbtn" onclick="doAllWi('${fiId}');return false;" value="审结" />
				<input type="button" class="dfbtn" onclick="replaceParticipants('${fiId}');return false;" value="替换当前审批人" />
				<input type="button" class="dfbtn" onclick="jumpOverWi('${fiId}');return false;" value="跳过当前审批人" />
				<input type="button" class="dfbtn" onclick="rejectWi('${fiId}');return false;" value="驳回" />
				<input type="button" class="dfbtn" onclick="rejectFi('${fiId}');return false;" value="重新发起审批流" />
				<input type="button" class="dfbtn" onclick="updateNote('${fiId}');return false;" value="修改审批信息" />
				<input type="button" class="dfbtn" onclick="deleteFi('${fiId}');return false;" value="作废" />
			</s:if>
			<s:else>
				<s:if test="#request.isJbrOp && (#request.isStartWp != @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE || #request.isDb != @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE) && (null != #request.curFi && #request.curFi.status != @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE)">
					<input type="button" class="dfbtn" onclick="showWithDraw('${fiId}','');return false;" value="撤回流程" />
					<input type="button" class="dfbtn" onclick="showCuiBan('${fiId}');" value="催办" />
				</s:if>
			</s:else>
			<s:if test="#request.isStartWp == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
			    <input type="button" class="dfbtn" onclick="doBizEidt('${urlBizEdit}');return false;" value="业务表单编辑" />
			</s:if>
			<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE || #request.isAdmin">
			    <input type="button" class="dfbtn" onclick="changeWps('${fiId}','${spWiId}');" value="加签"/>
			</s:if>
			<s:if test="#request.isAdmin">
				<%-- <input type="button" class="dfbtn" onclick="tsqxDeal('${fiId}');" value="特殊权限操作"/> --%>
			</s:if>
			<s:if test="null != #request.curFi && #request.curFi.status == @com.xinleju.erp.flow.flowutils.utils.WsConstant@STATUS_COMPLETE">
				<input type="button" class="dfbtn" onclick="chuanYue('${fiId}');" value="传阅" />
			</s:if>
			<s:else>
				<s:if test="null != #request.spWiId && '' != #request.spWiId && #request.isDb != @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE && #request.fiId == #request.curWi.fiId">
					<input type="button" class="dfbtn" onclick="showWithDraw('${fiId}','${spWiId}');return false;" value="撤回工作" />
				</s:if>
			</s:else>
			<!--  去掉功能按钮
			<s:if test="null == #request.showType || #request.showType != 'showFiHistory'">
				<input type="button" class="dfbtn" onclick="openwindow('Form!fiHistory.do?fiId=${fiId}','showSp_win',1270,0);return false;" value="历史流程" />
			</s:if>
			<input type="button" class="dfbtn" onclick="fiStore('${fiId}');" value="收藏"/>
		    <input type="button" class="dfbtn" onclick="window.close();" value="关闭" />
			-->
				<input type="button" class="dfbtn" onclick="javascript:cust_print();" value="打印" /> 
		</div>
	</div>

	<div class="spttt" id="spttt" >
		
		<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE && #request.isStartWp && #request.curFi.fl.canChangeTitle == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
			<s:textfield type="hidden" id="flowName" name="flowName" value="%{#request.curFi.fiName}"></s:textfield>
		</s:if>
		<s:else>
			<input type="hidden" name="flowName" value="${curFi.fiName}" id="flowName" />${curFi.fiName}
		</s:else>
	</div>

	<!-- <div class="sp_wrapper" style="width:100%;"> -->
	<div class="sp_wrapper" id="sp_wrapper">
		<s:if test="#request.isDb == @com.xinleju.erp.flow.utils.FlowConstant@INT_TRUE">
			<div  id="sp_wrapper_left" class="sp_wrapper_left" style="float:none;padding-top:30px;">
				<!-- 审批历史 -->
				<jsp:include page="Form_history.jsp" flush="true" />
			</div>
			<div  id="sp_wrapper_right" style="padding-top:30px;">
				<!-- 审批操作 -->
				<jsp:include page="Form_op.jsp" flush="true" />
			</div>
			<script type="text/javascript">
				$(document).scroll(function() {
					//var x = $("#sp_wrapper_left").offset().left;
					//var z = $(document).scrollLeft();
					//$("#sp_wrapper_right").css("left", 910 - z);
				});
			</script>
		</s:if>
		<s:else>
			<!-- 审批历史 -->
			<div  id="sp_wrapper_left" class="sp_wrapper_left"  style="float:none;padding-top:30px;">
				<!-- 审批历史 -->
				<jsp:include page="Form_history.jsp" flush="true" />
			</div>
		</s:else>
	</div>
	<!-- 当非首页的内容时，出现返回顶部 -->
	<jsp:include page="/page/BackToTop/backToTop.jsp"></jsp:include>
</body>

<script type="text/javascript">
	$(function(){
		var isDone = "${isDb}",rightWidth=0;
		// 流程未完结
		if(isDone == 1){
			rightWidth = 354;
		}
		function resizeWidth(){
			var mainWidth = $(window).width() - rightWidth,subMainWidth = $('#sp_wrapper_left').width(),minMainWidth=900,minCientWidth=minMainWidth+rightWidth;
			$('#spttt').width(mainWidth);
			$('#sp_wrapper').width(mainWidth);
			$('#sp_wrapper_left').css('margin','auto');
			
			if($(window).width() <= minCientWidth){
				$('#spttt').width(minMainWidth);
				$('#sp_wrapper').width(minCientWidth);
				$('#sp_wrapper_left').css('margin-left','5px');
			}
		}
		resizeWidth();
		$(window).resize(function(){
			resizeWidth();
		});
	});
</script>
</html>

