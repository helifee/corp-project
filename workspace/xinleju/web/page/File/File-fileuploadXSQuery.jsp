<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>"> 
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="upload file">
	<meta http-equiv="description" content="upload file">
	<script type="text/javascript" src="js/jquery.js"></script>
	<s:if test="#parameters.isNewFlow == null">
		<link href="css/mask.css" rel="stylesheet" type="text/css" />
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	  	<script type="text/javascript" src="js/jquery.uploadify.js"></script>
	  	<script type="text/javascript" src="js/jquery.progressbar.min.js"></script>
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="js/application.js"></script>
	</s:if>
	<s:else>
		<style type="text/css">
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
			 	padding:8px 12px;
			 }
		</style>
	</s:else>
    <style type="text/css">

	 .jiequ {
          width:300px;
          white-space:nowrap;
          word-break:keep-all;
          overflow:hidden;
          text-overflow:ellipsis;
     }
     table th{
        font-size:12px;
     }
     
     .table_fj th{
     	text-align:center !important;
     	font-weight:bold !important;
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
       var temp=Math.floor(Math.random() * ( 1000 + 1));
   
   
   </script>
</head>



<body>
<form id="frm" name="frm" action="File!list.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}" method="post">
   <table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
				 <a href="javascript:;" data-checkItem="checkItem_Package" data-form="frm_Package" name="fileuploadXSQuery_downloadAll_Package_">
				<script type='text/javascript'>
				$("a[name^='fileuploadXSQuery_downloadAll_Package_']").prop("name","fileuploadXSQuery_downloadAll_Package_"+temp);
				</script> 
				 
				 打包下载</a>
	            &nbsp;&nbsp;
                <a href="javascript:viod(0);">附件</a>
				</div>
			</td>
		</tr>
	</table>
	<s:if test="#parameters.isNewFlow == null">
	 <div style="overflow-y:auto;" >
	 </s:if>
	  <s:else>
	 	<div class="clearfix">
	 </s:else>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<tr>
		   <td width="5%" height="34px"  bgcolor="#FFFFFF"><div align="center"> <input name="fileuploadXSQuery_checkAll_upload"  type="checkbox"/></div></td>
			<th width="75%">附件名称</th>
			<th width="10%">附件类型</th>
			<th width="10%">创建用户</th>
		</tr>
		 <tbody id="fileQueue">
	       <s:iterator value="page.items" var="item" status="stat">
				<tr>
					 <td height="26" bgcolor="#FFFFFF"><div align="center"><input name="fileuploadXSQuery_checkItem_${item.id}" data-id="${item.id}" data-checkItem="checkItem_${item.id}" type="checkbox"/></div></td>
					
					<td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                        <div align="left">
                        <s:if test="'url' != #item.ext">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:if>
						<s:else>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						    <%--<a href="#" target="_blank" onclick="window.open('${item.userLabel}');return false;" title="${item.fileName }" class="jiequ">${item.fileName }</a>
							--%><a name="urlOpen" href="javascript:;" data-href="${item.userLabel}" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:else>
                        </div></div></td>
                    <td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                    	<div align="center">
                        	<s:if test="'url' != #item.ext">
								附件
							</s:if>
							<s:else>
								地址
							</s:else>
                        </div></div></td>
                    <td height="26" bgcolor="#FFFFFF">
					   <div align="center">
					     <span class="STYLE1">${item.userName }
					     </span>
					    </div>
					</td>
					
				</tr>
			</s:iterator>
        </tbody>   
   </table>
 </div>
</form>

	<!-- 下载请求 -->
<form action="File!downloadChooseZip.do" id="frm_Package" method="post">

</form>
<script type="text/javascript">


	$(document).on('click',"a[name^='fileuploadXSQuery_downloadAll_Package_"+temp+"']",function(){
		var arrUploadId = [];
		$("input[name^='fileuploadXSQuery_checkItem_']:checked").each(function(index,obj){
			arrUploadId.push($(this).data('id'));
		})
		if(arrUploadId.length === 0){
			alert('请选择下载的文件');
			return false;
		}
		var form = $("#"+$(this).data('form'));
		form.prop('action',"File!downloadChooseZip.do?uids="+arrUploadId.join());
		form.submit();
	});
	
	
	$(document).on('click',"input[name^='fileuploadXSQuery_checkAll_upload']",function(){
		if($(this).prop("checked")==true){
			$("input[name^='fileuploadXSQuery_checkItem_']").each(function(index,obj){
				$(obj).prop("checked",true);
			})
			
		}else{
			$("input[name^='fileuploadXSQuery_checkItem_']").each(function(index,obj){
				$(obj).prop("checked",false);
			})
			
		}
		
		
		
	});


 	$(function(){
 		
 		var isNewFlow = '${param.isNewFlow}';
 		if(!isNewFlow){
 			$('#att', window.parent.document).height($('#frm').height()+20);
 		}
 		
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
