<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String receive = request.getParameter("receive");//用request得到 
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>"> 
   
    <meta http-equiv="x-ua-compatible" content="ie=9" />
	<!--
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="upload file">
	<meta http-equiv="description" content="upload file">
    -->
    
    
	<script type="text/javascript" src="js/jquery.js"></script>
  	<script type="text/javascript" src="js/jquery.uploadify.js"></script>
  	<script type="text/javascript" src="js/jquery.progressbar.min.js"></script>

	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<link rel="stylesheet" href="css/uploadifynew.css" type="text/css"></link> 
	<link rel="stylesheet" href="css/uploadify.css" type="text/css"></link>
	

    <style type="text/css">
     .jiequ{
         /*
          width:200px;
          white-space:nowrap;
          word-break:keep-all;
          overflow:hidden;
          text-overflow:ellipsis;
          word-wrap:normal;
          */
           width:200px;
    height:24px;
    line-height:24px;
    overflow:hidden;
  
    
    margin:5px;
          
     }
     

    
     
   </style>

<script>
var temp=Math.floor(Math.random() * ( 1000 + 1));
	var  highlightcolor='#F3F5F8';  
	var  clickcolor='#51b2f6';
	function  changeto(){
		source=event.srcElement;
		if  (source.tagName=="TR"||source.tagName=="TABLE")
		return;
		while(source.tagName!="TD")
		source=source.parentElement;
		source=source.parentElement;
		cs  =  source.children;
		if  (cs[1].style.backgroundColor!=highlightcolor&&source.id!="nc"&&cs[1].style.backgroundColor!=clickcolor)
		for(i=0;i<cs.length;i++){
			cs[i].style.backgroundColor=highlightcolor;
		}
	}
		
	function  changeback(){
			if  (event.fromElement.contains(event.toElement)||source.contains(event.toElement)||source.id=="nc")
			return
			if  (event.toElement!=source&&cs[1].style.backgroundColor!=clickcolor)
			
			for(i=0;i<cs.length;i++){
				cs[i].style.backgroundColor="";
			}
	}
	
	function  clickto(){
		source=event.srcElement;
		if  (source.tagName=="TR"||source.tagName=="TABLE")
		return;
		while(source.tagName!="TD")
		source=source.parentElement;
		source=source.parentElement;
		cs  =  source.children;
		//alert(cs.length);
		if  (cs[1].style.backgroundColor!=clickcolor&&source.id!="nc")
		for(i=0;i<cs.length;i++){
			cs[i].style.backgroundColor=clickcolor;
		}
		else
		for(i=0;i<cs.length;i++){
			cs[i].style.backgroundColor="";
		}
	}
</script>

</head>

<body>
<form id="frm" name="frm" action="File!listptflowView.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}&receive=<%=receive %>" method="post">
<table width="100%" border="0" cellspacing="0" cellpadding="0" >
  <tr>
     <td width="70%">
		     <table width="100%"  border="0" cellspacing="0" cellpadding="0" class="divh3" style="border-right:0px">
			  <tr>
				<td>
					<div class="divh3_title">
					    <a href="javascript:;" data-checkItem="checkItem_Package" data-form="frm_Package" name="fileuploadPTFlowView_downloadAll_Package_">打包下载</a>
			            &nbsp;&nbsp;
			            	<script type='text/javascript'>
						     $("a[name^='fileuploadPTFlowView_downloadAll_Package_']").prop("name","fileuploadPTFlowView_downloadAll_Package_"+temp);
						   </script> 
						<a href="javascript:viod(0);">附件列表</a>
					
					    <input type="text" style="width:108px;margin-top:5px;margin-left:10px; " name="name" id="name" placeholder="附件名称" value="${name}" />
			            <img style="cursor:pointer;margin-left:2px;margin-top:8px;" src="images/magnifier.png" onclick="javascript:doSearch();" title="查询"/>
					</div>
				</td>
		    </tr>  
		    </table>
    </td>

    <td width="30%">
         <table width="100%"   border="0" cellspacing="0" cellpadding="0" class="divh4" style="display:none;border-left:0px">
           <tr>
             <td>
              &nbsp;
             </td>
             <td>
                  &nbsp;
             </td>
           </tr>
         </table> 
    </td> 
  
  </tr>
</table>
<div style="max-height: 300px;min-height: 200px overflow-y:no; border-left:solid 1px #C0C0C0;border-right:solid 1px #C0C0C0;border-bottom:solid 1px #C0C0C0;"  id="filediv" >
<table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#C0C0C0" onmouseover="changeto()"  onmouseout="changeback()">
      <thead>
        <tr>
           <td width="5%" height="34px" background="images/bg.gif" bgcolor="#FFFFFF"><div align="center"> <input name="fileuploadPTFlowView_checkAll_upload"  type="checkbox"/></div></td>
          <td width="70%" height="34px" background="images/bg.gif" bgcolor="#FFFFFF"><div align="center"><span class="STYLE1">文件名称</span></div></td>
          <td width="20%" height="34px" background="images/bg.gif" bgcolor="#FFFFFF"><div align="center"><span class="STYLE1">文件类型</span></div></td>
        <!--   <td width="10%" height="34px" background="images/bg.gif" bgcolor="#FFFFFF"><div align="center"><span class="STYLE1">操作</span></div></td>
         --></tr>
      </thead> 
      
      <tbody id="fileQueue">
      
	     <s:iterator value="page.items" var="item" status="stat">
			<tr>
			     <td height="26" bgcolor="#FFFFFF"><div align="center"><input name="fileuploadPTFlowView_checkItem_${item.id}" data-id="${item.id}" data-checkItem="fileuploadPTFlowView_checkItem_${item.id}" type="checkbox"/></div></td>
				<td height="26" bgcolor="#FFFFFF"><div align="left">
                       <div align="center">
                       <s:if test="'url' != #item.ext">
						<a href="File!download.do?id=${item.id}" class="jiequ" name="${item.fileName }"  title="${item.fileName }" >${item.fileName }</a>
					</s:if>
					<s:else>
					    <a href="#" target="_blank" class="jiequ" onclick="window.open('${item.userLabel}');return false;" title="${item.fileName }" >${item.fileName }</a>
					</s:else>
                       </div></div></td>
                   <td height="26" bgcolor="#FFFFFF">
                   <div align="center">
                   	<div align="center">
                       	<s:if test="'url' != #item.ext">
							附件
						</s:if>
						<s:else>
							地址
						</s:else>
                       </div></div></td>
				<%-- <td height="26" bgcolor="#FFFFFF">
				   <div align="center">
				    <span  style="cursor:pointer;">
				      <img src="images/del.gif" onclick="deleteFile(${item.id})"  />
				    </span>
				   </div>
				</td> --%>
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
  	
  	$(document).on('click',"a[name^='fileuploadPTFlowView_downloadAll_Package_']",function(){
		var arrUploadId = [];
		$("input[name^='fileuploadPTFlowView_checkItem_']:checked").each(function(index,obj){
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
	
	
	$(document).on('click',"input[name^='fileuploadPTFlowView_checkAll_upload']",function(){
		var chek=$(this).prop("checked");
		if($(this).prop("checked")==true){
			$("input[name^='fileuploadPTFlowView_checkItem_']").each(function(index,obj){
				$(obj).prop("checked",true);
			})
			
		}else{
			$("input[name^='fileuploadPTFlowView_checkItem_']").each(function(index,obj){
				$(obj).prop("checked",false);
			})
			
		}
	});
  	
  	
	  	 // 对Date的扩展，将 Date 转化为指定格式的String 
		 // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
		 // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
		 // 例子： 
		 // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
		 // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
		 Date.prototype.Format = function(fmt) 
		 { //author: meizz 
		   var o = { 
		     "M+" : this.getMonth()+1,                 //月份 
		     "d+" : this.getDate(),                    //日 
		     "h+" : this.getHours(),                   //小时 
		     "m+" : this.getMinutes(),                 //分 
		     "s+" : this.getSeconds(),                 //秒 
		     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
		     "S"  : this.getMilliseconds()             //毫秒 
		   }; 
		   if(/(y+)/.test(fmt)) 
		     fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		   for(var k in o) 
		     if(new RegExp("("+ k +")").test(fmt)) 
		   fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
		   return fmt; 
		 }	
  	
	  	$(function() {
	  		
	  		var date = (new Date()).Format("yyyy-MM-dd");
	  		var itemHtml = "<tr id='\${fileID}'>"
				  +	  "<td width='250' align='center'>\${fileName}</td><td colspan='2'><span class='progressbar'><!--Progress Bar--></span><span class='data'></span></td></td>"

	  					 // +	  "<td width='250' align='center'>\${fileName}</td><td width='250' align='center'>"+date+"</td><td width='250' align='center'>${sessionScope.LOGININFO.userDTO.realName}</td><td><span class='progressbar'><!--Progress Bar--></span><span class='data'></span></td><td width='100' align='center'></td>"
	  					  +"</tr>";
	  			
	  		$("#file_upload").uploadify({
	  			formData      : {'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},
	  			swf           : 'js/uploadify.swf',
	  			uploader      : 'File!upload.do;jsessionid=<%=session.getId()%>?category=${requestScope.category}&ownerId=${requestScope.ownerId}',
	  			width         : 17,
	  			height        :15,
	  			auto          : true,
	  			multi         : true,
	  			cancelImg     : 'img/uploadify-cancel.png',
	  			buttonImage   : 'images/clip.png' , //url(../images/divh3_hx.png) no-repeat right top
	  			queueID       : 'fileQueue',
	  			fileSizeLimit : '${fileSizeLimit}',
	  			removeCompleted : false,
	  			buttonText : '',
	  			itemTemplate : itemHtml,
	  			successTimeout : ${successTimeout},
	  			'uploadLimit' : ${uploadLimit},
	  			onUploadComplete: function(file) {
	  				$('#' + file.id).find(".progressbar").eq(0).fadeOut(${fadeOut});
	  			},
	  			onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
	  				var percentage = Math.round(bytesUploaded / bytesTotal * 100);
	  				$('#' + file.id).find('.progressbar').eq(0).progressBar(percentage, { barImage: 'images/progressbg_green.gif'});
	  	        },
		  	    onUploadError : function(file, errorCode, errorMsg, errorString) {
		  	    	$('#' + file.id).find('.progressbar').eq(0).stop().fadeOut();
		        },
		        onQueueComplete : function(queueData) {
		        	setTimeout("window.location.reload();",${fileUploadTimeout});
		        },
		        onDialogClose :  function(filesSelected, filesQueued, queueLength) {
	        		var isExist = false;
		        	for (var n in this.queueData.files) {
		        		if ($("a[name='" + this.queueData.files[n].name + "']").length > 0) {
		        			isExist = true;
		        			break;
		        			
		        		}
					}
					
					if (isExist) {
						alert("待上传文件已存在，请重新上传！");
						for (var n in this.queueData.files) {
		        			this.cancelUpload(this.queueData.files[n].id);
						}

	        			window.location.reload();
					}
					
		        }
	  		});
	  		
	  		
	  		$("#url_upload").click(function() {
	  			openwindow('File!urluploadPTFlow.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}');
	  		});
	  		
	  	    var receive = "<%=receive%>";
	  		if(receive == "yes")
	  		{
              $("#filediv").css("min-height","117px");
              $("#filediv").css("max-height","117px");
	  		}
	  	});
	  	
	  	function downloadFile(obj) {
	  		obj.href = "download.action?module=PT&func=flow&bizId=1&filename="+obj.innerHTML;
	  	}
	  	
	  
	  	function deleteFile(fileId) {
	  		$.get("File!delete.do",{id:fileId, 'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},function(data){
	  			window.location.reload();
	  		});
	  	}
	  	
		function deleteUrl(urlId) {
	  		$.get("File!delete.do",{id:urlId, 'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},function(data){
	  			window.location.reload();
	  		});
	  	}
	  	
	  	function doSearch() {
			$('#frm').submit();
		}
  	</script>
  </body>
</html>
