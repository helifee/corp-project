<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
  	<meta http-equiv="X-UA-Compatible"content="IE=8;IE=10">
    <base href="<%=basePath%>"> 
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="upload file">
	<meta http-equiv="description" content="upload file">
	<s:if test="#parameters.isNewFlow == null">
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/mask.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery.js"></script>
	  	<script type="text/javascript" src="js/jquery.uploadify.js"></script>
	  	<script type="text/javascript" src="js/jquery.progressbar.min.js"></script>
	
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="js/application.js"></script>
	</s:if>
	<s:else>
		<style type="text/css">
			#fileQueue a,#fileQueue1 a{
				vertical-align:middle;
			}
		     .table_fj{
				border: 1px solid #ccc;
				border-collapse: collapse;
			 }
			 .table_fj td,.table_fj th{
				border:1px #ccc solid;
			 }
			 .table_fj th{
			 	height:16px;
			 	padding:8px 12px;
			 }
			 .table_fj td{
			 	height:16px;
			 	padding:4px 6px;
			 }
		</style>
	</s:else>

    <style type="text/css">

	 .jiequ{
          width:200px;
          white-space:nowrap;
          word-break:keep-all;
          overflow:hidden;
          text-overflow:ellipsis;
     }     
    
     table th{
        font-size:12px;
     }
     
  .table_fj  a {
		text-decoration:none;
		outline-style : none;
		color:#0078ce;
	}
 .table_fj	a:link {
		color: #0078ce;
		outline-style : none;
		text-decoration: none;
	}
.table_fj	a:visited {
		color: #0078ce;
		outline-style : none;
		text-decoration: none;
	}
.table_fj	a:hover {
		color:#d10013;
		text-decoration: underline;
		outline-style : none;
	}
.table_fj	a:active {
		color: #0078ce;
		text-decoration: none;
		outline-style : none;
	}
     #fileQueue td,#fileQueue1 td{
     	border:none;
     }
     
     #chkDraftBefore th,#chkDraftAfter th{
     	border:1px solid #ccc;
     }
     
     #fileQueue a,#fileQueue1 a{
     	display: inline-block;
		width:380px;/*对宽度的定义,根据情况修改*/
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
     }
     .clearfix:after{
		  content: ""; 
		  display: block;
		  height: 0;
		  clear: both;
		  visibility: hidden;
	  }
	
	.clearfix {
	  /* 触发 hasLayout */ 
	  zoom: 1; 
	  }
   </style>

<script type="text/javascript">
	function check_pagefile(){
		$("input[name='pagefile']").prop("checked",true);
	}
	

	function check_pagefile1(){
		$("input[name='pagefile1']").prop("checked",true);
	}
	
	//选择下载
	function down_pagefile(){
		 var str="";
         $("input[name='pagefile']:checkbox").each(function(){ 
             if(this.checked){
            	 if(str==""){
                     str += $(this).val();
            	 }else{
                     str += ","+$(this).val();
            	 }
             }
         });
        if(str==null||str==""){
        	alert("请选择要下载的文件!");
        }else{
        	window.location.href="File!downloadChooseZip.do?uids="+str;
        }
	}
	

	function down_pagefile1(){
		 var str="";
         $("input[name='pagefile1']:checkbox").each(function(){ 
             if(this.checked){
            	 if(str==""){
                     str += $(this).val();
            	 }else{
                     str += ","+$(this).val();
            	 }
             }
         });

         if(str==null||str==""){
         	alert("请选择要下载的文件!");
         }else{
         	window.location.href="File!downloadChooseZip.do?uids="+str;
         }
	}
	
	$(function(){
		var chkDraftBeforeCount = $('#fileQueue td').length;
		var chkDraftAfterCount = $('#fileQueue1 td').length;
		var differenceCount = chkDraftBeforeCount - chkDraftAfterCount;
		if(differenceCount !== 0){
			if(differenceCount > 0){
				for(var i =0 ;i<differenceCount;i++){
					$('#fileQueue1').append('<tr><td style="height:26px;"></td></tr>');
				}
				//$('#fileQueue1').height($('#fileQueue').height());
				//$('#chkDraftAfter').height($('#chkDraftBefore').height());
			}else{
				
				differenceCount = Math.abs(differenceCount);
				for(var i =0 ;i<differenceCount;i++){
					$('#fileQueue').append('<tr><td style="height:26px;"></td></tr>');
				}
				
				//$('#chkDraftBefore').height($('#chkDraftAfter').height());
			}
		}
	});
	
</script>

</head>

<body>
 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="javascript:viod(0);">附件</a>
				</div>
			</td>
		</tr>
	</table>
	<s:if test="#parameters.isNewFlow == null">
 <div style="min-height: 165px;  overflow-y:auto;" >
 </s:if>
 <s:else>
 	<div class="clearfix">
 </s:else>
 <form id="frm_downLoadZip" name="frm_downLoadZip" action="File!downloadZip.do" method="post" target="_top">
	
 	<div style="float: left;width: 50%">
	<table id="chkDraftBefore" width="100%" class="table_fj">
		<tr>
			<th width="40%" align="left">
				附件(校稿前)
				<s:if test="page.items !=null && page.items.size() > 0">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:void(0);" onclick="check_pagefile();">全选</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:void(0);" onclick="down_pagefile();">选择下载</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:void(0);" onclick="document.frm_downLoadZip.submit();return false;">打包下载</a>
				</s:if>
			</th>
		</tr>
		 <tbody id="fileQueue">
		 <s:if test="page.items !=null && page.items.size() > 0">
	       <s:iterator value="page.items" var="item" status="stat">
				<tr>
					<td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                        <div align="left">
                        <input type="hidden" name="zipUploadIds" value="${item.id }" />
		    	
                        <s:if test="'url' != #item.ext">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="pagefile" value="${item.id}"/>
							<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }
								<s:if test="#item.fileSize!=null && #item.fileSize!=''">
									(${item.fileSize})
								</s:if>
							</a>
						</s:if>
						<s:else>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						    <%--<a href="#" target="_blank" onclick="window.open('${item.userLabel}');return false;" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						    --%><a name="urlOpen" href="javascript:;" data-href="${item.userLabel}" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:else>
                        </div></div></td>
				</tr>
			</s:iterator>
			</s:if>
        </tbody>   
   </table>
   </div>
   </form>
   
    <form id="frm_downLoadZip1" name="frm_downLoadZip1" action="File!downloadZip.do" method="post" target="_top">
	
   <div style="float: right;width: 50%">
	<table id="chkDraftAfter" width="100%" class="table_fj">
		<tr>
			<th width="40%" align="left">附件（校稿后）
				<s:if test="page1.items !=null && page1.items.size() > 0">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" onclick="check_pagefile1();">全选</a>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" onclick="down_pagefile1();">选择下载</a>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:void(0);" onclick="document.frm_downLoadZip1.submit();return false;">打包下载</a>
				</s:if>
			</th>
		</tr>
		 <tbody id="fileQueue1">
		 <s:if test="page1.items !=null && page1.items.size() > 0">
	       <s:iterator value="page1.items" var="item" status="stat">
				<tr>
					<td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                        <div align="left">
                        <input type="hidden" name="zipUploadIds" value="${item.id }" />
		    	
                        <s:if test="'url' != #item.ext">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="pagefile1" value="${item.id}"/>
							<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }
								<s:if test="#item.fileSize!=null && #item.fileSize!=''">
									(${item.fileSize})
								</s:if>
							</a>
						</s:if>
						<s:else>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						    <%--<a href="#" target="_blank" onclick="window.open('${item.userLabel}');return false;" title="${item.fileName }" class="jiequ">${item.fileName }</a>
							--%><a name="urlOpen" href="javascript:;" data-href="${item.userLabel}" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:else>
                        </div></div></td>
				</tr>
			</s:iterator>
			</s:if>
        </tbody>   
   </table>
   </div>
   </form>
 </div>
 <script>
 	$(function(){
 		$("a[name='urlOpen']").click(function(){
 			  
 		 	var urlReg = new RegExp("(http|ftp|https):\/\/");
 		 	var href = $(this).data('href');
 		 	
 		 	if(urlReg.test(href)){
 		 		window.open(href); 
 		 	}else{
 		 		window.open("http://" + href); 
 		 	}
 		 	return false;
 		 });
 	});
 </script>
 
</body>
</html>
