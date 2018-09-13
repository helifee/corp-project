<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String isEdit = request.getParameter("isEdit");//用request得到 
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>"> 
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="upload file">
	<meta http-equiv="description" content="upload file">

	<script type="text/javascript" src="js/jquery.js"></script>
  	<script type="text/javascript" src="js/jquery.uploadify.js"></script>
  	<script type="text/javascript" src="js/jquery.progressbar.min.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<link rel="stylesheet" href="../../css/uploadify.css" type="text/css"></link>
    <style type="text/css">
	body {
			margin-left: 0px;
			margin-top: 0px;
			margin-right: 0px;
			margin-bottom: 0px;
	}

	.STYLE1 {font-size: 12px;}
	.STYLE3 {font-size: 12px; font-weight: bold; margin-left:14px; margin-top:0px; }
	.STYLE4 {
		color: #03515d;
		font-size: 12px;
	}
	
	 .jiequ{
          width:200px;
          white-space:nowrap;
          word-break:keep-all;
          overflow:hidden;
          text-overflow:ellipsis;
     }
     
     .fy_up{ display:inline-block;background:url(images/f_icon01.gif) no-repeat; 
     background-position:0 0;width:10px; height:9px;
    margin-left:13px;
     cursor:pointer; }
     
     .fy_down{background:url(images/f_icon01.gif) no-repeat;  
     background-position:0 -222px;}

   </style>

<script>
	var  highlightcolor='#F3F5F8';  //  margin:13 0 0 24px; 
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
	
	
	function check_pagefile(){
		$("input[name='pagefile']").attr("checked",true);
	}
	
	//选择下载
	function del_pagefile(){
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
        	alert("请选择要删除的文件!");
        }else{
        	if(confirm("确定要删除选中的文件吗?")){
	        	$.get("File!delete2.do",{uids:str, 'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},function(data){
		  			window.location.reload();
		  		});
        	}
        } 
	}
	
	
</script>

</head>

<body>
<form id="frm" name="frm" action="File!list2.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}&isEdit=<%=isEdit%>" method="post">
<table width="100%" border="0" cellspacing="0" cellpadding="0" id="fileshow">
  <tr>
    <td height="30" style="background-color:rgb(240, 247, 247);border:solid 1px #d0e6e6">
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
         <table width="98%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="80" valign="middle">
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr style="height:30px">
	               <td width="3%"><em class="fy_up"></em> </td>
	               <td><span class="STYLE3">附件</span></td>
	              </tr>
	            </table>
            </td>
            
              <td width="30" class="STYLE1">
                  		<a href="javascript:void(0);" onclick="check_pagefile();">全选</a>
              </td>
              
              <td width="30" class="STYLE1">
                  		<a href="javascript:void(0);" onclick="del_pagefile();">删除</a>
                 
              </td>
            <td width="54%">
                <table border="0" align="right" cellpadding="0" cellspacing="0">
                 <tr>
                <td width="60">
	                <table width="87%" border="0" cellpadding="0" cellspacing="0">
	                  <tr>
	                    <td class="STYLE1">
		                    <div align="center">
		                      <input type="text" name="name" id="name" placeholder="附件名称" value="${name}"  />
		                    </div>
		                 </td>
	                    <td class="STYLE1"><div align="center" onclick="javascript:doSearch();" style="cursor:pointer"><img id="search" style="margin-left: 3px" src="images/magnifier.png" /></div></td>
	                  </tr>
	                 </table>
                </td>
                <td width="60">
                <table width="90%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="cursor:pointer" class="STYLE1">
                      <input type="file" id="file_upload" />
                      <!--  
	                     <div align="center" style="cursor:pointer">
	                       <input type="file" id="file_upload" />
	                     </div>
	                   -->
                    </td>
                    <td class="STYLE1"><div align="center"></div></td>
                  </tr>
                </table>
                </td>
                <td width="20"></td>
                <td width="60"><table width="90%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="STYLE1"><div id="url_upload" align="center"><span style="cursor:pointer" size="15"  onclick="">URL上传</span>
                    </div></td>
                    <td class="STYLE1"><div align="center"></div></td>
                  </tr>
                </table>
                </td>
           
              </tr>
            </table></td>
          </tr>
         </table>
        </td>
      </tr>
    </table>
   </td>
  </tr>
 </table>
 <div style="min-height: 165px; max-height: 165px; overflow-y:auto;" id="fileshow1">
      <table  width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#C0C0C0" onmouseover="changeto()"  onmouseout="changeback()" >
        <!--  <thead>
          <tr>
            <td width="30%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件名称</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件类型</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">创建时间</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">创建人</span></div></td>
            <td width="15%" bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件状态</span></div></td>
            <td width="10%" height="26" id="handule" bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">操作</span></div></td>
          </tr>
        </thead>  -->
        <tbody id="fileQueue">
	       <s:iterator value="page.items" var="item" status="stat">
				<tr>
					<td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                        <div align="left">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="pagefile" value="${item.id}"/>
						
                        <s:if test="'url' != #item.ext">
							<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:if>
						<s:else>
						    <a href="#" target="_blank" onclick="window.open('${item.userLabel}');" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:else>
						<s:if test="#item.fileSize!=null && #item.fileSize!=''">
								(${item.fileSize})
							</s:if>
                        </div></div></td>
                   <%--  <td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
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
					    <span class="STYLE1">
					<s:bean id="time" name="java.util.Date"> 
						<s:param name="time" value="item.uploadTime" /> 
					</s:bean> 
					<s:date name="#time" format="yyyy-MM-dd HH:mm:ss" />
					   </span>
					  </div>
					</td>
					<td height="26" bgcolor="#FFFFFF">
					   <div align="center">
					     <span class="STYLE1">${item.userName }
					     </span>
					    </div>
					</td>
					<td bgcolor="#FFFFFF">
					   <div align="center">
					      <span class="STYLE1">已上传
					      </span>
					   </div>
					</td> --%>
					<td height="26" id="handuletd"   bgcolor="#FFFFFF">
					   <div align="center">
					    <span class="STYLE4" >
					      <img src="images/del.gif" style=" cursor:pointer;" onclick="deleteFile(${item.id})"  />
					    </span>
					   </div>
					</td>
				</tr>
			</s:iterator>
        </tbody>      
     </table>
 </div>
 
 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="display:none" id="filehide">
  <tr>
    <td height="30" style="background-color:rgb(240, 247, 247);border:solid 1px #d0e6e6">
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
         <table width="98%" border="0" cellspacing="0" cellpadding="0"  style="display:none"  id="filehide">
          <tr>
            <td width="46%" valign="middle">
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr style="height:30px">
	               <td width="3%"><em class="fy_up"></em> </td>
	               <td><span class="STYLE3">附件</span></td>
	              </tr>
	            </table>
            </td>
            <td width="54%">
                <table border="0" align="right" cellpadding="0" cellspacing="0">
                 <tr>
                <td width="60">
	                <table width="87%" border="0" cellpadding="0" cellspacing="0">
	                  <tr>
	                    <td class="STYLE1">
		                    <div align="center">
		                      <input type="text" name="name" id="name" placeholder="附件名称" value="${name}"  />
		                    </div>
		                 </td>
	                    <td class="STYLE1"><div align="center" onclick="javascript:doSearch();" style="cursor:pointer"><img id="search" style="margin-left: 3px" src="images/magnifier.png" /></div></td>
	                  </tr>
	                 </table>
                </td>
              </tr>
            </table></td>
          </tr>
         </table>
        </td>
      </tr>
    </table>
   </td>
  </tr>
  </table>
 <div style="min-height: 165px; max-height: 165px; overflow-y:auto;display:none;" id="filehide1">
     <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fy_toggle">
       <tr>
        <td>
         <table id="datatable" width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#C0C0C0" onmouseover="changeto()"  onmouseout="changeback()">
        <!--  <thead>
          <tr>
            <td width="30%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件名称</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件类型</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">创建时间</span></div></td>
            <td width="15%" height="26"  bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">创建人</span></div></td>
            <td width="15%" bgcolor="#FFFFFF"><div align="center"><span class="STYLE3">文件状态</span></div></td>
          </tr>
        </thead>  -->
        <tbody id="fileQueue">
	       <s:iterator value="page.items" var="item" status="stat">
				<tr>
					<td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
                        <div align="left">
                        
                       <%--   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" name="pagefile" value="${item.id}"/>
						 --%>
                       <s:if test="'url' != #item.ext">
							<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:if>
						<s:else>
						    <a href="#" target="_blank" onclick="window.open('${item.userLabel}');" title="${item.fileName }" class="jiequ">${item.fileName }</a>
						</s:else>
                        </div></div></td>
                   <%--  <td height="26" bgcolor="#FFFFFF"><div align="center" class="STYLE1">
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
					    <span class="STYLE1">
					<s:bean id="time" name="java.util.Date"> 
						<s:param name="time" value="item.uploadTime" /> 
					</s:bean> 
					<s:date name="#time" format="yyyy-MM-dd" />
					   </span>
					  </div>
					</td>
					<td height="26" bgcolor="#FFFFFF">
					   <div align="center">
					     <span class="STYLE1">${item.userName }
					     </span>
					    </div>
					</td>
					 
					<td bgcolor="#FFFFFF">
					   <div align="center">
					      <span class="STYLE1">已上传
					      </span>
					   </div>
					</td> --%>
				</tr>
			</s:iterator>
           </tbody>      
     </table>
 </div>

</form>
	
  	
  	<script type="text/javascript">
  	
  	
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
	  					  +	  "<td width='250' align='center'>\${fileName}</td><td><span class='progressbar'><!--Progress Bar--></span><span class='data'></span></td>"
	  					  +"</tr>";
	  					  
	  	    var upload = $("#file_upload").uploadify({
	  			formData      : {'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},
	  			swf           : 'js/uploadify.swf',
	  			uploader      : 'File!upload.do;jsessionid=<%=session.getId()%>?category=${requestScope.category}&ownerId=${requestScope.ownerId}',
	  			//width         : 80,
	  			auto          : true,
	  			multi         : true,
	  			cancelImg     : 'img/uploadify-cancel.png',
	  			queueID       : 'fileQueue',
	  			fileSizeLimit : '${fileSizeLimit}',
	  			removeCompleted : false,
	  			buttonText : '文件上传',
	  			itemTemplate : itemHtml,
	  			successTimeout : ${successTimeout},
	  			'uploadLimit' : ${uploadLimit},
	  			onUploadComplete: function(file) {
	  				$('#' + file.id).find(".progressbar").eq(0).fadeOut(${fadeOut});
	  			},
	  			onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
	  				$("#file_upload-button").hide();
	  				$("#SWFUpload_0").attr("width","1");
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
						if ( !window.confirm('待上传文件已存在，是否覆盖？') ) {
// 							alert("待上传文件已存在，请重新上传！");
							for (var n in this.queueData.files) {
			        			this.cancelUpload(this.queueData.files[n].id);
							}
	
		        			window.location.reload();
						}
					
					}
					
		        }
	  		});
	  	    
	  	    $(".uploadify").css("margin-left","50px");
	  		
	  		$("#url_upload").click(function() {
	  			openwindow('File!urlupload.do?category=${requestScope.category}&ownerId=${requestScope.ownerId}');
	  		});
	  		
	  		$('.fy_up').click(function(){
				if($('.fy_toggle').is(':visible')){
					$('.fy_toggle').slideUp()
					$(this).addClass('fy_down')
			    }
				else{
					$('.fy_toggle').slideDown()
					$(this).removeClass('fy_down')
			    }
	       });
	       
	        var isEdit = "<%=isEdit%>";
	  		if(isEdit == "yes")
	  		{
              $("#fileshow").hide();
              $("#fileshow1").hide();
              $("#filehide").show();
              $("#filehide1").show();
	  		}
	  	});
	  	
	  	function downloadFile(obj) {
	  		obj.href = "download.action?module=PT&func=flow&bizId=1&filename="+obj.innerHTML;
	  	}
	  	
	  	function deleteFile(fileId) {

        	if(confirm("确定要删除选中的文件吗?")){
		  		$.get("File!delete.do",{id:fileId, 'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},function(data){
		  			window.location.reload();
		  		});
        	}
	  	}
	  	
		function deleteUrl(urlId) {
        	if(confirm("确定要删除选中的文件吗?")){
		  		$.get("File!delete.do",{id:urlId, 'category' : '${requestScope.category}', 'ownerId': '${requestScope.ownerId}'},function(data){
		  			window.location.reload();
		  		});
        	}
	  	}
	  	
	  	function doSearch() {
			$('#frm').submit();
		}
  	</script>
  </body>
</html>
